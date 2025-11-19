import React, { useRef, useState, useEffect } from "react";
import { Carousel } from 'antd';
import Layout from "../components/Layout";

// 导入组件
import { HomePage } from "../components/home/HomePage";
import { AboutPage } from "../components/about/AboutPage";
import { ContactPage } from "../components/contact/ContactPage";

// 导入自定义hook
import { useCarouselNavigation } from "../hooks/useCarouselNavigation";

// 导入常量
import { UI_CONFIG } from "../constants/appConstants";

// 导入样式
import "../styles/about.css";

/**
 * 页面指示器组件 - SpaceX风格
 */
const PageIndicator = ({ activeSlide, totalSlides, onIndicatorClick }) => {
  return (
    <div className="page-indicator">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <div
          key={index}
          className={`indicator ${activeSlide === index ? 'active' : ''}`}
          onClick={() => onIndicatorClick(index)}
        ></div>
      ))}
    </div>
  );
};

/**
 * 主页面组件 - SpaceX风格
 */
const Index1 = () => {
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = UI_CONFIG?.CAROUSEL?.TOTAL_SLIDES || 3;
  
  // 使用自定义hook处理轮播图导航
  const { handleWheel, handleSlideChange, goToSlide } = useCarouselNavigation({
    carouselRef,
    setActiveSlide,
    throttleTime: UI_CONFIG?.CAROUSEL?.THROTTLE_TIME || 800
  });
  
  // 添加事件监听器
  useEffect(() => {
    const carouselElement = document.querySelector('.ant-carousel');
    
    if (carouselElement) {
      carouselElement.addEventListener('wheel', handleWheel, { passive: false });
    }
    
    // 键盘导航处理
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' && carouselRef.current) {
        carouselRef.current.next();
      } else if (e.key === 'ArrowUp' && carouselRef.current) {
        carouselRef.current.prev();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener('wheel', handleWheel);
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleWheel]);

  return (
    <Layout
      title="EEnous 玻丝焊芯 - 南京光纤通信和工业物联网解决方案"
      description="南京玻丝焊芯科技有限公司 (EEnous) 专注于光纤通信、工业物联网和精密仪器仪表领域研发，提供三相放电光纤熔接系统和高精度数据采集器。"
    >
      <div className="fullpage-container">
        <Carousel 
          ref={carouselRef}
          dots={false}
          infinite={false}
          effect={UI_CONFIG?.CAROUSEL?.EFFECT || "fade"}
          afterChange={handleSlideChange}
        >
          <HomePage />
          <AboutPage />
          <ContactPage />
        </Carousel>
        
        <PageIndicator 
          activeSlide={activeSlide} 
          totalSlides={totalSlides} 
          onIndicatorClick={goToSlide} 
        />
      </div>
      
      <style jsx global>{`
        .ant-carousel {
          height: 100vh;
        }
        
        .ant-carousel .slick-slide {
          height: 100vh;
          overflow: hidden;
        }
        
        .ant-carousel .slick-dots {
          bottom: 20px;
        }
        
        .ant-carousel .slick-dots li button {
          background: #fff;
          opacity: 0.5;
        }
        
        .ant-carousel .slick-dots li.slick-active button {
          opacity: 1;
        }
      `}</style>
    </Layout>
  );
};

export default Index1;