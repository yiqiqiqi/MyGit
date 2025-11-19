import { useRef, useCallback } from 'react';

/**
 * 轮播图导航自定义Hook
 * 提供轮播图滚动、切换和导航功能
 * 
 * @param {Object} options - 配置选项
 * @param {React.RefObject} options.carouselRef - 轮播图组件引用
 * @param {Function} options.setActiveSlide - 设置当前活动幻灯片的函数
 * @param {number} options.throttleTime - 节流时间(毫秒)
 * @returns {Object} 轮播图导航相关方法
 */
export const useCarouselNavigation = ({ 
  carouselRef, 
  setActiveSlide, 
  throttleTime = 800 
}) => {
  // 使用ref跟踪节流状态
  const isThrottled = useRef(false);
  
  /**
   * 处理鼠标滚轮事件
   */
  const handleWheel = useCallback((event) => {
    event.preventDefault();
    
    if (isThrottled.current || !carouselRef.current) return;
    
    isThrottled.current = true;
    
    if (event.deltaY > 0) {
      carouselRef.current.next();
    } else {
      carouselRef.current.prev();
    }
    
    setTimeout(() => {
      isThrottled.current = false;
    }, throttleTime);
  }, [carouselRef, throttleTime]);
  
  /**
   * 处理轮播图切换事件
   */
  const handleSlideChange = useCallback((current) => {
    setActiveSlide(current);
  }, [setActiveSlide]);
  
  /**
   * 切换到指定幻灯片
   */
  const goToSlide = useCallback((index) => {
    if (carouselRef.current) {
      carouselRef.current.goTo(index);
    }
  }, [carouselRef]);
  
  return {
    handleWheel,
    handleSlideChange,
    goToSlide
  };
};

export default useCarouselNavigation; 