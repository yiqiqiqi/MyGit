import React from "react";

/**
 * 页面指示器组件
 * 显示当前页面位置并允许点击导航
 * 
 * @param {Object} props - 组件属性
 * @param {number} props.activeSlide - 当前活动的幻灯片索引
 * @param {number} props.totalSlides - 总幻灯片数量
 * @param {Function} props.onIndicatorClick - 指示器点击事件处理函数
 */
export const PageIndicator = ({ activeSlide, totalSlides, onIndicatorClick }) => (
  <div className="page-indicator" role="navigation" aria-label="页面导航">
    {Array.from({ length: totalSlides }).map((_, index) => (
      <div 
        key={index}
        className={`indicator ${activeSlide === index ? 'active' : ''}`}
        onClick={() => onIndicatorClick(index)}
        role="button"
        aria-label={`导航到第${index + 1}页`}
        aria-current={activeSlide === index ? 'page' : false}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onIndicatorClick(index);
          }
        }}
      />
    ))}
  </div>
);

export default PageIndicator; 