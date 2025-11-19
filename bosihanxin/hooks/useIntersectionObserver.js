import { useState, useEffect, useRef } from 'react';

/**
 * 自定义Hook用于检测元素是否进入视口
 * @param {Object} options - IntersectionObserver的配置选项
 * @param {number} options.threshold - 触发回调的可见性阈值
 * @param {string} options.root - 观察的根元素
 * @param {string} options.rootMargin - 根元素的边距
 * @returns {Array} - [ref, isVisible, entry] 
 *   ref: 要附加到观察元素的ref
 *   isVisible: 元素是否可见
 *   entry: IntersectionObserverEntry对象
 */
const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [entry, setEntry] = useState(null);
  const elementRef = useRef(null);
  const observerRef = useRef(null);

  const { threshold = 0.1, root = null, rootMargin = '0px' } = options;

  useEffect(() => {
    // 清理之前的observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // 创建observer实例
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        setEntry(entry);
      },
      { threshold, root, rootMargin }
    );

    // 观察当前元素
    const currentElement = elementRef.current;
    if (currentElement) {
      observerRef.current.observe(currentElement);
    }

    // 清理函数
    return () => {
      if (observerRef.current && currentElement) {
        observerRef.current.unobserve(currentElement);
        observerRef.current.disconnect();
      }
    };
  }, [threshold, root, rootMargin]);

  return [elementRef, isVisible, entry];
};

export default useIntersectionObserver; 