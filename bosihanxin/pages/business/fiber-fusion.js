import React from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';

/**
 * 核心技术列表项组件
 */
const TechListItem = ({ text, index }) => {
  return (
    <div className={`tech-item animate-fadeIn`} style={{ animationDelay: `${index * 100 + 300}ms` }}>
      <div className="item-indicator"></div>
      <div className="item-content">{text}</div>
      
      <style jsx>{`
        .tech-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }
        
        .item-indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #fff;
          margin-top: 8px;
          margin-right: 1rem;
          flex-shrink: 0;
        }
        
        .item-content {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #ccc;
        }
      `}</style>
    </div>
  );
};

/**
 * 技术规格项组件
 */
const SpecItem = ({ label, value }) => {
  return (
    <div className="spec-item">
      <div className="spec-label">{label}</div>
      <div className="spec-value">{value}</div>
      
      <style jsx>{`
        .spec-item {
          display: flex;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .spec-label {
          width: 40%;
          font-size: 1rem;
          color: #aaa;
          padding-right: 1rem;
        }
        
        .spec-value {
          width: 60%;
          font-size: 1rem;
          color: #fff;
        }
      `}</style>
    </div>
  );
};

/**
 * 应用场景组件
 */
const ApplicationCard = ({ title, description, icon }) => {
  return (
    <div className="application-card">
      <div className="app-icon">{icon}</div>
      <h3 className="app-title">{title}</h3>
      <p className="app-description">{description}</p>
      
      <style jsx>{`
        .application-card {
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 4px;
          transition: all 0.3s ease;
        }
        
        .application-card:hover {
          transform: translateY(-5px);
          background-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        
        .app-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .app-title {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: #fff;
        }
        
        .app-description {
          font-size: 1rem;
          line-height: 1.6;
          color: #ccc;
        }
      `}</style>
    </div>
  );
};

/**
 * 保偏光纤熔接设备业务详情页面
 */
const FiberFusionPage = () => {
  // 技术特点列表
  const techFeatures = [
    "针对80、125μm芯径保偏光纤，实现低损耗熔接，对接角度误差小于0.08°",
    "自主研发的三相放电熔接技术，支持大芯径光纤的熔接",
    "智能图像识别算法，自动识别光纤类型和对准光纤轴向",
    "高精度六轴调节机构，确保熔接精度和稳定性",
    "智能化操作界面，简化操作流程，提高工作效率",
    "多种熔接模式可选，适应不同类型光纤的熔接需求"
  ];
  
  // 核心技术规格
  const specifications = [
    { label: "适用光纤类型", value: "保偏光纤、单模光纤、多模光纤、大芯径光纤" },
    { label: "光纤直径范围", value: "80μm ~ 125μm" },
    { label: "对接角度误差", value: "< 0.08°" },
    { label: "熔接损耗", value: "SM: 0.02dB, PM: 0.05dB" },
    { label: "放电技术", value: "三相放电技术" },
    { label: "调节机构", value: "六轴高精度调节" },
    { label: "操作界面", value: "7英寸高分辨率触控屏" },
    { label: "电池续航", value: "可连续熔接200次" },
    { label: "工作温度", value: "-10°C ~ 50°C" },
    { label: "存储温度", value: "-40°C ~ 80°C" }
  ];
  
  // 应用场景
  const applications = [
    {
      title: "宇航级光纤陀螺仪",
      description: "为航天器提供高精度的姿态和导航参考，要求光纤连接极高的精度和稳定性。",
      icon: "🛰️"
    },
    {
      title: "宇航级EDFA",
      description: "用于卫星通信系统的光信号放大，需要可靠的光纤连接以确保信号质量。",
      icon: "📡"
    },
    {
      title: "宇航级光模块",
      description: "卫星激光通信载荷的核心组件，对光纤连接的精度和可靠性有极高要求。",
      icon: "🔭"
    },
    {
      title: "科研实验室",
      description: "为光学实验和光纤传感器研发提供可靠的光纤熔接工具。",
      icon: "🔬"
    }
  ];
  
  return (
    <Layout title="EEnous - 保偏光纤熔接设备">
      <div className="business-detail-page">
        <div className="page-bg">
          <video autoPlay muted loop className="bg-video">
            <source src="/videos/fiber-tech.mp4" type="video/mp4" />
          </video>
          <div className="bg-overlay"></div>
        </div>
        
        <div className="page-content">
          <div className="breadcrumb animate-fadeIn">
            <Link href="/businesses">
              <span className="breadcrumb-link">核心业务</span>
            </Link>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">保偏光纤熔接设备</span>
          </div>
          
          <div className="hero-section">
            <h1 className="page-title animate-fadeIn animate-delay-100">保偏光纤熔接设备</h1>
            <div className="title-separator animate-scaleX"></div>
            <p className="page-subtitle animate-fadeIn animate-delay-200">
              对标藤仓FSM-100P系列，为宇航级光纤通信载荷组件的研发生产提供高效、可靠的光纤熔接国产化方案
            </p>
          </div>
          
          <div className="content-grid">
            <div className="main-content">
              <div className="product-intro animate-fadeIn animate-delay-300">
                <h2 className="section-title">产品概述</h2>
                <div className="intro-content">
                  <p>
                    我们自主研发的保偏光纤熔接设备，能够实现80、125μm芯径保偏光纤的低损耗熔接，对接角度误差小于0.08°，是国内领先的宇航级光纤连接解决方案。该设备对标国际知名品牌藤仓FSM-100P系列，不仅性能参数相当，而且具有更好的本地化支持和更低的维护成本。
                  </p>
                  
                  <p>
                    除了常规的保偏光纤熔接功能外，我们还创新性地开发了三相放电熔接技术，支持大芯径光纤的熔接，进一步拓展了设备的应用领域。高精度的六轴调节机构和智能化的图像识别算法，确保了熔接过程的精确性和稳定性。
                  </p>
                  
                  <p>
                    该设备已广泛应用于宇航级光纤陀螺仪、宇航级EDFA、宇航级光模块等卫星激光通信载荷组件的研发生产，为我国航天事业的发展提供了重要的技术支持。
                  </p>
                </div>
              </div>
              
              <div className="tech-features animate-fadeIn animate-delay-400">
                <h2 className="section-title">技术特点</h2>
                <div className="features-list">
                  {techFeatures.map((feature, index) => (
                    <TechListItem key={index} text={feature} index={index} />
                  ))}
                </div>
              </div>
              
              <div className="product-image animate-fadeIn animate-delay-500">
                <div className="image-placeholder">
                  <div className="placeholder-text">保偏光纤熔接设备</div>
                </div>
              </div>
            </div>
            
            <div className="side-content">
              <div className="specifications animate-fadeIn animate-delay-300">
                <h2 className="section-title">技术规格</h2>
                <div className="specs-list">
                  {specifications.map((spec, index) => (
                    <SpecItem key={index} label={spec.label} value={spec.value} />
                  ))}
                </div>
              </div>
              
              <div className="contact-card animate-fadeIn animate-delay-400">
                <h3 className="card-title">技术咨询</h3>
                <p className="card-text">
                  如需了解更多产品信息或技术支持，请联系我们的技术团队。
                </p>
                <Link href="/contact">
                  <div className="contact-button">
                    联系我们
                  </div>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="applications-section animate-fadeIn animate-delay-600">
            <h2 className="section-title">应用场景</h2>
            <div className="applications-grid">
              {applications.map((app, index) => (
                <ApplicationCard 
                  key={index}
                  title={app.title}
                  description={app.description}
                  icon={app.icon}
                />
              ))}
            </div>
          </div>
          
          <div className="navigation-bottom animate-fadeIn animate-delay-700">
            <Link href="/businesses">
              <div className="back-button">
                <span className="back-arrow">←</span>
                返回核心业务
              </div>
            </Link>
            <Link href="/business/iot-platform">
              <div className="next-button">
                下一个业务：智能物联网运维平台
                <span className="next-arrow">→</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .business-detail-page {
          min-height: 100vh;
          position: relative;
        }
        
        .page-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
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
          background: linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 100%);
        }
        
        .page-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 120px 2rem 5rem;
        }
        
        .breadcrumb {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
          font-size: 0.9rem;
          color: #aaa;
        }
        
        .breadcrumb-link {
          color: #aaa;
          text-decoration: none;
          transition: color 0.3s;
          cursor: pointer;
        }
        
        .breadcrumb-link:hover {
          color: #fff;
        }
        
        .breadcrumb-separator {
          margin: 0 0.5rem;
        }
        
        .breadcrumb-current {
          color: #fff;
        }
        
        .hero-section {
          margin-bottom: 4rem;
        }
        
        .page-title {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          letter-spacing: 1px;
        }
        
        .title-separator {
          width: 100px;
          height: 3px;
          background-color: #fff;
          margin-bottom: 1.5rem;
        }
        
        .page-subtitle {
          font-size: 1.3rem;
          color: #ccc;
          max-width: 800px;
          line-height: 1.8;
        }
        
        .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
          margin-bottom: 4rem;
        }
        
        .section-title {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          position: relative;
          display: inline-block;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 40px;
          height: 2px;
          background-color: #fff;
        }
        
        .product-intro, .tech-features {
          margin-bottom: 3rem;
        }
        
        .intro-content p, .features-content p {
          margin-bottom: 1rem;
          font-size: 1.1rem;
          line-height: 1.8;
          color: #ccc;
        }
        
        .product-image {
          margin-bottom: 3rem;
        }
        
        .image-placeholder {
          width: 100%;
          height: 300px;
          background-color: rgba(255, 255, 255, 0.05);
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .placeholder-text {
          font-size: 1.2rem;
          color: #aaa;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .specifications {
          margin-bottom: 2rem;
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 4px;
        }
        
        .contact-card {
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 4px;
        }
        
        .card-title {
          font-size: 1.3rem;
          margin-bottom: 1rem;
        }
        
        .card-text {
          font-size: 1rem;
          color: #ccc;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }
        
        .contact-button {
          display: inline-block;
          padding: 0.8rem 1.5rem;
          background-color: rgba(255, 255, 255, 0.1);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 4px;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .contact-button:hover {
          background-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }
        
        .applications-section {
          margin-bottom: 4rem;
        }
        
        .applications-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        
        .navigation-bottom {
          display: flex;
          justify-content: space-between;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .back-button, .next-button {
          display: inline-flex;
          align-items: center;
          color: #fff;
          font-size: 1rem;
          cursor: pointer;
          transition: opacity 0.3s;
        }
        
        .back-button:hover, .next-button:hover {
          opacity: 0.7;
        }
        
        .back-arrow {
          margin-right: 0.5rem;
        }
        
        .next-arrow {
          margin-left: 0.5rem;
        }
        
        @keyframes scaleX {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        
        .animate-scaleX {
          animation: scaleX 0.5s ease-out forwards;
          transform-origin: left;
        }
        
        @media (max-width: 992px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
          
          .applications-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .page-title {
            font-size: 2.5rem;
          }
          
          .applications-grid {
            grid-template-columns: 1fr;
          }
          
          .navigation-bottom {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </Layout>
  );
};

export default FiberFusionPage; 