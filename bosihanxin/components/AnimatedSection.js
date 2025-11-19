import React, { useEffect, useState } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

/**
 * 动画类型枚举
 */
const ANIMATION_TYPES = {
  FADE_IN: 'fade-in',
  SLIDE_UP: 'slide-up',
  SLIDE_LEFT: 'slide-left',
  SLIDE_RIGHT: 'slide-right',
  ZOOM_IN: 'zoom-in',
  BOUNCE: 'bounce',
};

/**
 * 动画区域组件，当元素进入视口时添加动画效果
 * @param {Object} props
 * @param {ReactNode} props.children - 子元素
 * @param {string} props.animation - 动画类型，参考ANIMATION_TYPES
 * @param {number} props.delay - 动画延迟(毫秒)
 * @param {number} props.duration - 动画持续时间(毫秒)
 * @param {Object} props.threshold - 触发动画的可见性阈值
 * @param {Object} props.className - 附加的CSS类名
 */
const AnimatedSection = ({
  children,
  animation = ANIMATION_TYPES.FADE_IN,
  delay = 0,
  duration = 800,
  threshold = 0.1,
  className = '',
  ...props
}) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold });
  const [hasAnimated, setHasAnimated] = useState(false);

  // 当元素可见时，标记已经动画过
  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isVisible, hasAnimated]);

  // 创建基础CSS类
  const baseClasses = `transition-all ${className}`;
  
  // 根据动画类型创建初始和动画后的样式
  const getAnimationClasses = () => {
    switch (animation) {
      case ANIMATION_TYPES.FADE_IN:
        return {
          initial: 'opacity-0',
          animated: 'opacity-100',
        };
      case ANIMATION_TYPES.SLIDE_UP:
        return {
          initial: 'opacity-0 translate-y-10',
          animated: 'opacity-100 translate-y-0',
        };
      case ANIMATION_TYPES.SLIDE_LEFT:
        return {
          initial: 'opacity-0 -translate-x-10',
          animated: 'opacity-100 translate-x-0',
        };
      case ANIMATION_TYPES.SLIDE_RIGHT:
        return {
          initial: 'opacity-0 translate-x-10',
          animated: 'opacity-100 translate-x-0',
        };
      case ANIMATION_TYPES.ZOOM_IN:
        return {
          initial: 'opacity-0 scale-95',
          animated: 'opacity-100 scale-100',
        };
      case ANIMATION_TYPES.BOUNCE:
        return {
          initial: 'opacity-0 -translate-y-4',
          animated: 'opacity-100 translate-y-0 animate-bounce',
        };
      default:
        return {
          initial: 'opacity-0',
          animated: 'opacity-100',
        };
    }
  };

  const { initial, animated } = getAnimationClasses();

  return (
    <div
      ref={ref}
      className={`${baseClasses} ${hasAnimated ? animated : initial}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

// 导出动画类型以供使用
AnimatedSection.ANIMATION_TYPES = ANIMATION_TYPES;

export default AnimatedSection; 