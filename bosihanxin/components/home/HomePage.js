import React from "react";
import { COMPANY_INFO, COMPANY_BUSINESSES } from "../../constants/appConstants";

/**
 * 品牌标题组件 - 增强SpaceX风格
 */
const BrandTitle = () => (
  <div className="brand-title">
    <div className="brand-name animate-fadeIn">
      <span className="brand-name-ee">EE</span>
      <span className="brand-name-nous">NOUS</span>
    </div>
    <div className="brand-chinese animate-fadeIn animate-delay-200">
      <span className="brand-chinese-text">玻丝焊芯</span>
    </div>
    <div className="brand-slogan animate-fadeIn animate-delay-400">
      {COMPANY_INFO.SLOGAN}
    </div>
    <div className="brand-description animate-fadeIn animate-delay-500">
      依托南京邮电大学物联网大学科技园孵化成长，专注光纤通信与工业物联网解决方案
    </div>
    <div className="brand-cta animate-fadeIn animate-delay-600">
      <button className="btn">探索技术</button>
      <button className="btn btn-primary">了解产品</button>
    </div>
  </div>
);

/**
 * 技术亮点组件 - SpaceX风格
 */
const TechHighlights = () => (
  <div className="tech-highlights animate-fadeIn animate-delay-700">
    <div className="tech-item">
      <div className="tech-number">6+</div>
      <div className="tech-label">专利技术</div>
    </div>
    <div className="tech-divider"></div>
    <div className="tech-item">
      <div className="tech-number">5</div>
      <div className="tech-label">研发部门</div>
    </div>
    <div className="tech-divider"></div>
    <div className="tech-item">
      <div className="tech-number">2</div>
      <div className="tech-label">研发中心</div>
    </div>
    <div className="tech-divider"></div>
    <div className="tech-item">
      <div className="tech-number">0.01%</div>
      <div className="tech-label">测量精度</div>
    </div>
  </div>
);

/**
 * 产品展示组件
 */
const ProductDisplay = () => (
  <div className="page1_carousel">
    <div className="carousel_content">
      <div className="machine_display1 animate-slideIn"></div>
    </div>
    <div className="carousel_content">
      <div className="machine_display2 animate-slideIn animate-delay-200"></div>
    </div>
    <div className="carousel_content">
      <div className="machine_display3 animate-slideIn animate-delay-400"></div>
    </div>
  </div>
);

/**
 * 业务概览组件 - 增强SpaceX风格
 */
const BusinessPreview = () => (
  <div className="business-section animate-fadeIn animate-delay-800">
    <h2 className="section-title">核心业务</h2>
    <div className="business-grid">
      {COMPANY_BUSINESSES.map((business) => (
        <div key={business.id} className="business-card">
          <div className="business-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
              {business.id === "fiber_fusion" && (
                <>
                  <path d="M6 18h8"></path>
                  <path d="M3 22h18"></path>
                  <path d="M14 22a7 7 0 1 0 0-14h-1"></path>
                  <path d="M9 14h2"></path>
                  <path d="M9 12a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-6z"></path>
                </>
              )}
              {business.id === "iot_platform" && (
                <>
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                  <line x1="6" y1="6" x2="6.01" y2="6"></line>
                  <line x1="6" y1="18" x2="6.01" y2="18"></line>
                </>
              )}
              {business.id === "lpwan_solution" && (
                <>
                  <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                  <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                  <line x1="12" y1="20" x2="12.01" y2="20"></line>
                </>
              )}
              {business.id === "precision_measurement" && (
                <>
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </>
              )}
            </svg>
          </div>
          <h3 className="business-title">{business.title}</h3>
          <p className="business-desc">{business.shortDesc}</p>
          <div className="business-features">
            {business.features.slice(0, 2).map((feature, index) => (
              <div key={index} className="feature-item">
                <span className="feature-dot"></span>
                <span className="feature-text">{feature}</span>
              </div>
            ))}
          </div>
          <a href="#" className="business-link">了解详情</a>
        </div>
      ))}
    </div>
  </div>
);

/**
 * 滚动提示组件 - SpaceX风格
 */
const ScrollIndicator = () => (
  <div className="scroll-indicator">
    <div className="scroll-arrow"></div>
    <p>向下滚动了解更多</p>
  </div>
);

/**
 * 首页主组件 - 增强SpaceX风格
 */
export const HomePage = () => (
  <div className="home-page">
    <div className="fullscreen-bg">
      <video autoPlay muted loop className="bg-video">
        <source src="/videos/tech-bg.mp4" type="video/mp4" />
      </video>
      <div className="bg-overlay"></div>
    </div>
    
    <div className="content-overlay">
      <div className="hero-section">
        <BrandTitle />
        <TechHighlights />
      </div>
      
      <ProductDisplay />
      
      <BusinessPreview />
      
      <ScrollIndicator />
    </div>
    
    <style jsx>{`
      .home-page {
        height: 100vh;
        width: 100%;
        position: relative;
        overflow: hidden;
        color: #fff;
      }
      
      .bg-video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .bg-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%);
      }
      
      .hero-section {
        height: 65vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 0 10%;
      }
      
      .brand-title {
        max-width: 800px;
      }
      
      .brand-name {
        font-size: 6rem;
        font-weight: bold;
        line-height: 1;
        margin-bottom: 1rem;
        letter-spacing: -1px;
      }
      
      .brand-name-ee {
        color: #fff;
      }
      
      .brand-name-nous {
        opacity: 0.9;
      }
      
      .brand-chinese {
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
      }
      
      .brand-chinese-text {
        position: relative;
      }
      
      .brand-chinese-text::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 60px;
        height: 1px;
        background-color: #fff;
      }
      
      .brand-slogan {
        font-size: 1.4rem;
        margin-bottom: 1rem;
        max-width: 600px;
        opacity: 0.9;
      }
      
      .brand-description {
        font-size: 1rem;
        margin-bottom: 2.5rem;
        max-width: 600px;
        opacity: 0.7;
        line-height: 1.6;
      }
      
      .brand-cta {
        display: flex;
        gap: 1rem;
      }
      
      .tech-highlights {
        display: flex;
        align-items: center;
        margin-top: 3rem;
        padding: 1.5rem 0;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        width: 100%;
        max-width: 800px;
      }
      
      .tech-item {
        text-align: center;
      }
      
      .tech-number {
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
      }
      
      .tech-label {
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        opacity: 0.7;
      }
      
      .tech-divider {
        width: 1px;
        height: 50px;
        background-color: rgba(255, 255, 255, 0.2);
        margin: 0 2rem;
      }
      
      .business-section {
        padding: 0 10%;
      }
      
      .section-title {
        font-size: 1.8rem;
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 2.5rem;
        position: relative;
        display: inline-block;
      }
      
      .section-title::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 60px;
        height: 1px;
        background-color: #fff;
      }
      
      .business-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
      }
      
      .business-card {
        background-color: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 2rem;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      
      .business-card:hover {
        background-color: rgba(255, 255, 255, 0.1);
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      }
      
      .business-icon {
        margin-bottom: 1.5rem;
        color: #fff;
      }
      
      .business-title {
        font-size: 1.2rem;
        margin-bottom: 1rem;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      
      .business-desc {
        font-size: 0.9rem;
        margin-bottom: 1.5rem;
        opacity: 0.7;
        line-height: 1.6;
        flex-grow: 1;
      }
      
      .business-features {
        margin-bottom: 1.5rem;
      }
      
      .feature-item {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
      }
      
      .feature-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #fff;
        margin-right: 10px;
      }
      
      .feature-text {
        font-size: 0.85rem;
        opacity: 0.8;
      }
      
      .business-link {
        text-transform: uppercase;
        font-size: 0.8rem;
        letter-spacing: 1px;
        position: relative;
        display: inline-block;
        align-self: flex-start;
        margin-top: auto;
      }
      
      .business-link::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: #fff;
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.3s ease;
      }
      
      .business-link:hover::after {
        transform: scaleX(1);
        transform-origin: left;
      }
      
      @media (max-width: 992px) {
        .brand-name {
          font-size: 4.5rem;
        }
        
        .tech-highlights {
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
        }
        
        .tech-divider {
          display: none;
        }
        
        .tech-item {
          width: 45%;
          margin-bottom: 1rem;
        }
      }
      
      @media (max-width: 768px) {
        .hero-section {
          padding: 0 5%;
        }
        
        .brand-name {
          font-size: 3.5rem;
        }
        
        .brand-chinese {
          font-size: 2rem;
        }
        
        .brand-slogan {
          font-size: 1.2rem;
        }
        
        .business-section {
          padding: 0 5%;
        }
        
        .business-grid {
          grid-template-columns: 1fr;
        }
      }
      
      @media (max-width: 480px) {
        .brand-name {
          font-size: 2.5rem;
        }
        
        .brand-chinese {
          font-size: 1.5rem;
        }
        
        .brand-cta {
          flex-direction: column;
          width: 100%;
        }
        
        .btn {
          width: 100%;
          text-align: center;
        }
        
        .tech-item {
          width: 100%;
        }
      }
    `}</style>
  </div>
);

export default HomePage; 