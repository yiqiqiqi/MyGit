import React from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';

/**
 * 功能特点组件
 */
const FeatureItem = ({ title, description, icon, index }) => {
  return (
    <div className={`feature-item animate-fadeIn`} style={{ animationDelay: `${index * 100 + 300}ms` }}>
      <div className="feature-icon">{icon}</div>
      <div className="feature-content">
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description">{description}</p>
      </div>
      
      <style jsx>{`
        .feature-item {
          display: flex;
          margin-bottom: 2rem;
        }
        
        .feature-icon {
          font-size: 2rem;
          margin-right: 1.5rem;
          color: #fff;
        }
        
        .feature-content {
          flex: 1;
        }
        
        .feature-title {
          font-size: 1.3rem;
          margin-bottom: 0.8rem;
          color: #fff;
        }
        
        .feature-description {
          font-size: 1rem;
          line-height: 1.7;
          color: #ccc;
        }
      `}</style>
    </div>
  );
};

/**
 * AI能力卡片组件
 */
const AICapabilityCard = ({ title, description, index }) => {
  return (
    <div className="ai-card animate-fadeIn" style={{ animationDelay: `${index * 100 + 400}ms` }}>
      <h3 className="ai-title">{title}</h3>
      <p className="ai-description">{description}</p>
      
      <style jsx>{`
        .ai-card {
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 4px;
          transition: all 0.3s ease;
        }
        
        .ai-card:hover {
          background-color: rgba(255, 255, 255, 0.08);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        
        .ai-title {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: #fff;
          position: relative;
          padding-bottom: 0.8rem;
        }
        
        .ai-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 30px;
          height: 2px;
          background-color: #fff;
        }
        
        .ai-description {
          font-size: 1rem;
          line-height: 1.7;
          color: #ccc;
        }
      `}</style>
    </div>
  );
};

/**
 * 行业应用卡片组件
 */
const IndustryCard = ({ industry, description, icon }) => {
  return (
    <div className="industry-card">
      <div className="industry-icon">{icon}</div>
      <h3 className="industry-name">{industry}</h3>
      <p className="industry-description">{description}</p>
      
      <style jsx>{`
        .industry-card {
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 4px;
          transition: all 0.3s ease;
          height: 100%;
        }
        
        .industry-card:hover {
          transform: translateY(-5px);
          background-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        
        .industry-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .industry-name {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: #fff;
        }
        
        .industry-description {
          font-size: 1rem;
          line-height: 1.6;
          color: #ccc;
        }
      `}</style>
    </div>
  );
};

/**
 * 智能物联网运维平台业务详情页面
 */
const IoTPlatformPage = () => {
  // 功能特点
  const features = [
    {
      title: "设备管理",
      description: "支持设备注册、配置、状态监控、固件更新等功能，实现设备全生命周期管理。",
      icon: "📱"
    },
    {
      title: "数据分析",
      description: "提供实时数据采集、存储、处理和可视化分析功能，帮助用户快速理解数据价值。",
      icon: "📊"
    },
    {
      title: "应用开发",
      description: "低代码开发平台，支持快速构建物联网应用，满足不同行业的定制化需求。",
      icon: "🔧"
    },
    {
      title: "多协议支持",
      description: "支持MQTT、HTTP、CoAP等多种通信协议，兼容不同厂商的设备接入。",
      icon: "🔌"
    },
    {
      title: "安全机制",
      description: "提供设备认证、数据加密、访问控制等多层次安全保障，确保系统安全可靠。",
      icon: "🔒"
    }
  ];
  
  // AI能力
  const aiCapabilities = [
    {
      title: "预测性维护",
      description: "基于历史数据和AI模型，预测设备潜在故障，提前安排维护，减少停机时间。"
    },
    {
      title: "异常检测",
      description: "实时监控设备运行数据，自动识别异常模式，及时发现设备运行问题。"
    },
    {
      title: "智能诊断",
      description: "结合专家知识库和AI模型，对故障进行智能诊断，提供解决方案建议。"
    },
    {
      title: "自然语言交互",
      description: "通过大语言模型实现自然语言交互，使用户可以直接用语言进行查询和操作。"
    }
  ];
  
  // 行业应用
  const industries = [
    {
      industry: "智能制造",
      description: "实时监控生产设备状态，提高生产效率，降低维护成本。",
      icon: "🏭"
    },
    {
      industry: "智慧城市",
      description: "管理城市基础设施，如路灯、垃圾桶、停车场等，提升城市管理效率。",
      icon: "🏙️"
    },
    {
      industry: "能源管理",
      description: "监控电力、水、燃气等能源设备，优化能源使用，降低能耗。",
      icon: "⚡"
    },
    {
      industry: "农业监测",
      description: "监测农田环境、灌溉系统、农机设备等，实现农业智能化管理。",
      icon: "🌾"
    }
  ];
  
  return (
    <Layout title="EEnous - 智能物联网运维平台">
      <div className="business-detail-page">
        <div className="page-bg">
          <video autoPlay muted loop className="bg-video">
            <source src="/videos/iot-bg.mp4" type="video/mp4" />
          </video>
          <div className="bg-overlay"></div>
        </div>
        
        <div className="page-content">
          <div className="breadcrumb animate-fadeIn">
            <Link href="/businesses">
              <span className="breadcrumb-link">核心业务</span>
            </Link>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">智能物联网运维平台</span>
          </div>
          
          <div className="hero-section">
            <h1 className="page-title animate-fadeIn animate-delay-100">智能物联网运维平台</h1>
            <div className="title-separator animate-scaleX"></div>
            <p className="page-subtitle animate-fadeIn animate-delay-200">
              基于4G/5G模块和LLM大语言模型，打造综合性的物联网平台，提供设备管理、数据分析、应用开发和智能决策功能
            </p>
          </div>
          
          <div className="content-grid">
            <div className="main-content">
              <div className="platform-intro animate-fadeIn animate-delay-300">
                <h2 className="section-title">平台概述</h2>
                <div className="intro-content">
                  <p>
                    我们的智能物联网运维平台是一个基于4G/5G通信技术和大语言模型的综合性物联网解决方案，旨在帮助企业高效构建和管理物联网应用。该平台不仅提供传统的设备管理、数据分析和应用开发功能，还融合了先进的人工智能技术，特别是工业大语言模型，实现了预测性维护、异常检测和智能决策等高级功能。
                  </p>
                  
                  <p>
                    平台采用微服务架构设计，具有高度的可扩展性和灵活性，可以根据企业需求进行定制化部署。强大的数据处理能力和AI分析引擎，使平台能够从海量物联网数据中挖掘有价值的信息，为企业决策提供支持。
                  </p>
                  
                  <p>
                    此外，平台还提供了友好的用户界面和丰富的API接口，方便企业快速集成和二次开发，构建适合自身业务需求的物联网应用。
                  </p>
                </div>
              </div>
              
              <div className="features-section animate-fadeIn animate-delay-400">
                <h2 className="section-title">功能特点</h2>
                <div className="features-list">
                  {features.map((feature, index) => (
                    <FeatureItem 
                      key={index}
                      title={feature.title}
                      description={feature.description}
                      icon={feature.icon}
                      index={index}
                    />
                  ))}
                </div>
              </div>
              
              <div className="platform-image animate-fadeIn animate-delay-500">
                <div className="image-placeholder">
                  <div className="placeholder-text">物联网平台架构图</div>
                </div>
              </div>
            </div>
            
            <div className="side-content">
              <div className="technical-specs animate-fadeIn animate-delay-300">
                <h2 className="section-title">技术规格</h2>
                <div className="specs-list">
                  <div className="spec-item">
                    <div className="spec-label">通信技术</div>
                    <div className="spec-value">4G/5G, WiFi, Bluetooth, LoRa, NB-IoT</div>
                  </div>
                  
                  <div className="spec-item">
                    <div className="spec-label">云平台</div>
                    <div className="spec-value">支持公有云、私有云、混合云部署</div>
                  </div>
                  
                  <div className="spec-item">
                    <div className="spec-label">支持协议</div>
                    <div className="spec-value">MQTT, HTTP, CoAP, TCP/IP</div>
                  </div>
                  
                  <div className="spec-item">
                    <div className="spec-label">数据处理</div>
                    <div className="spec-value">实时/批处理, 时序数据库</div>
                  </div>
                  
                  <div className="spec-item">
                    <div className="spec-label">AI模型</div>
                    <div className="spec-value">基于工业场景微调的LLM模型</div>
                  </div>
                  
                  <div className="spec-item">
                    <div className="spec-label">扩展能力</div>
                    <div className="spec-value">支持百万级设备接入</div>
                  </div>
                  
                  <div className="spec-item">
                    <div className="spec-label">API接口</div>
                    <div className="spec-value">RESTful API, WebSocket</div>
                  </div>
                  
                  <div className="spec-item">
                    <div className="spec-label">安全认证</div>
                    <div className="spec-value">设备认证, 传输加密, 数据权限管理</div>
                  </div>
                </div>
              </div>
              
              <div className="demo-card animate-fadeIn animate-delay-400">
                <h3 className="card-title">平台演示</h3>
                <p className="card-text">
                  立即体验我们的智能物联网运维平台，了解更多功能和优势。
                </p>
                <Link href="/contact">
                  <div className="demo-button">
                    申请演示
                  </div>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="ai-capabilities animate-fadeIn animate-delay-600">
            <h2 className="section-title">大语言模型能力</h2>
            <p className="section-desc">
              我们的平台集成了专为工业场景微调的大语言模型，为物联网运维带来了全新的智能化体验：
            </p>
            <div className="ai-grid">
              {aiCapabilities.map((capability, index) => (
                <AICapabilityCard 
                  key={index}
                  title={capability.title}
                  description={capability.description}
                  index={index}
                />
              ))}
            </div>
          </div>
          
          <div className="industry-applications animate-fadeIn animate-delay-700">
            <h2 className="section-title">行业应用</h2>
            <p className="section-desc">
              我们的智能物联网运维平台已广泛应用于以下行业，为企业提供定制化的物联网解决方案：
            </p>
            <div className="industries-grid">
              {industries.map((industry, index) => (
                <IndustryCard 
                  key={index}
                  industry={industry.industry}
                  description={industry.description}
                  icon={industry.icon}
                />
              ))}
            </div>
          </div>
          
          <div className="navigation-bottom animate-fadeIn animate-delay-800">
            <Link href="/business/fiber-fusion">
              <div className="back-button">
                <span className="back-arrow">←</span>
                上一个业务：保偏光纤熔接设备
              </div>
            </Link>
            <Link href="/business/lpwan-solutions">
              <div className="next-button">
                下一个业务：低功耗广域网解决方案
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
        
        .section-desc {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #ccc;
          margin-bottom: 2rem;
        }
        
        .platform-intro, .features-section {
          margin-bottom: 3rem;
        }
        
        .intro-content p {
          margin-bottom: 1rem;
          font-size: 1.1rem;
          line-height: 1.8;
          color: #ccc;
        }
        
        .platform-image {
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
        
        .technical-specs {
          margin-bottom: 2rem;
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 4px;
        }
        
        .spec-item {
          display: flex;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .spec-item:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
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
        
        .demo-card {
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
        
        .demo-button {
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
        
        .demo-button:hover {
          background-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }
        
        .ai-capabilities, .industry-applications {
          margin-bottom: 4rem;
        }
        
        .ai-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        
        .industries-grid {
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
          
          .ai-grid {
            grid-template-columns: 1fr;
          }
          
          .industries-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .page-title {
            font-size: 2.5rem;
          }
          
          .industries-grid {
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

export default IoTPlatformPage; 