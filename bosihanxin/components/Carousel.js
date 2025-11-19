import React, { useState, useEffect, useRef, Children, cloneElement } from 'react';
import { useSwipeable } from 'react-swipeable';

/**
 * 全屏轮播组件
 * @param {Object} props
 * @param {ReactNode} props.children - 轮播项
 * @param {boolean} props.autoplay - 是否自动播放
 * @param {number} props.speed - 切换速度(毫秒)
 * @param {boolean} props.dots - 是否显示指示点
 * @param {boolean} props.infinite - 是否循环播放
 * @param {Function} props.beforeChange - 切换前的回调
 * @param {Function} props.afterChange - 切换后的回调
 */
const Carousel = ({
  children,
  autoplay = false,
  speed = 500,
  dots = true,
  infinite = true,
  beforeChange,
  afterChange,
  ...props
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const autoplayTimerRef = useRef(null);
  const childrenCount = Children.count(children);
  
  // 清除自动播放计时器
  const clearAutoplayTimer = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  };
  
  // 设置自动播放
  useEffect(() => {
    clearAutoplayTimer();
    
    if (autoplay && childrenCount > 1) {
      autoplayTimerRef.current = setInterval(() => {
        goToSlide((activeIndex + 1) % childrenCount);
      }, 5000); // 5秒切换一次
    }
    
    return clearAutoplayTimer;
  }, [autoplay, activeIndex, childrenCount]);
  
  // 切换到指定页
  const goToSlide = (index) => {
    if (transitioning) return;
    
    // 确保index在有效范围内
    let targetIndex = index;
    if (index < 0) {
      targetIndex = infinite ? childrenCount - 1 : 0;
    } else if (index >= childrenCount) {
      targetIndex = infinite ? 0 : childrenCount - 1;
    }
    
    if (targetIndex !== activeIndex) {
      if (beforeChange) {
        beforeChange(activeIndex, targetIndex);
      }
      
      setTransitioning(true);
      setActiveIndex(targetIndex);
      
      // 转场动画完成后的处理
      setTimeout(() => {
        setTransitioning(false);
        if (afterChange) {
          afterChange(targetIndex);
        }
      }, speed);
    }
  };
  
  // 上一页
  const prev = () => {
    goToSlide(activeIndex - 1);
  };
  
  // 下一页
  const next = () => {
    goToSlide(activeIndex + 1);
  };
  
  // 滑动处理
  const handlers = useSwipeable({
    onSwipedLeft: () => next(),
    onSwipedRight: () => prev(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });
  
  return (
    <div className="relative h-full w-full overflow-hidden" {...handlers}>
      <div 
        className="h-full flex transition-transform"
        style={{
          transform: `translateY(-${activeIndex * 100}%)`,
          transitionDuration: `${speed}ms`,
        }}
      >
        {Children.map(children, (child, index) => (
          <div className="h-full min-h-full w-full flex-shrink-0">
            {cloneElement(child, {
              isActive: index === activeIndex,
            })}
          </div>
        ))}
      </div>
      
      {/* 指示点 */}
      {dots && childrenCount > 1 && (
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-10">
          {Array.from({ length: childrenCount }).map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 my-2 rounded-full cursor-pointer transition-all ${
                index === activeIndex ? 'bg-blue-600 scale-125' : 'bg-gray-400'
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
      
      {/* 左右箭头 - 可根据需要启用 */}
      {/* <button 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/50 rounded-full p-2"
        onClick={prev}
      >
        &lt;
      </button>
      <button 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/50 rounded-full p-2"
        onClick={next}
      >
        &gt;
      </button> */}
    </div>
  );
};

export default Carousel; 