import React from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';

/**
 * 技术特点组件
 */
const TechFeatureItem = ({ title, description, index }) => {
  return (
    <div className={`tech-feature animate-fadeIn`} style={{ animationDelay: `${index * 100 + 300}ms` }}>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
      
      <style jsx>{`
        .tech-feature {
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.8rem;
          border-radius: 4px;
          transition: all 0.3s ease;
        }
        
        .tech-feature:hover {
          background-color: rgba(255, 255, 255, 0.08);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        
        .feature-title {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: #fff;
          position: relative;
          padding-bottom: 0.8rem;
        }
        
        .feature-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 30px;
          height: 2px;
          background-color: #fff;
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
 * 模块类型组件
 */
const ModuleTypeItem = ({ type, specs, icon }) => {
  return (
    <div className="module-type">
      <div className="module-icon">{icon}</div>
      <div className="module-content">
        <h3 className="module-title">{type}</h3>
        <ul className="module-specs">
          {specs.map((spec, index) => (
            <li key={index} className="spec-item">
              {spec}
            </li>
          ))}
        </ul>
      </div>
      
      <style jsx>{`
        .module-type {
          display: flex;
          margin-bottom: 2.5rem;
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.5rem;
          border-radius: 4px;
          transition: all 0.3s ease;
        }
        
        .module-type:hover {
          background-color: rgba(255, 255, 255, 0.08);
        }
        
        .module-icon {
          font-size: 2rem;
          margin-right: 1.5rem;
          flex-shrink: 0;
        }
        
        .module-content {
          flex: 1;
        }
        
        .module-title {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: #fff;
        }
        
        .module-specs {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .spec-item {
          font-size: 1rem;
          color: #ccc;
          margin-bottom: 0.5rem;
          position: relative;
          padding-left: 1.2rem;
        }
        
        .spec-item::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #fff;
        }
      `}</style>
    </div>
  );
};

/**
 * 应用场景组件
 */
const ScenarioCard = ({ title, description, icon, index }) => {
  return (
    <div className={`scenario-card animate-fadeIn`} style={{ animationDelay: `${index * 100 + 400}ms` }}>
      <div className="scenario-icon">{icon}</div>
      <h3 className="scenario-title">{title}</h3>
      <p className="scenario-description">{description}</p>
      
      <style jsx>{`
        .scenario-card {
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 4px;
          transition: all 0.3s ease;
          height: 100%;
        }
        
        .scenario-card:hover {
          transform: translateY(-5px);
          background-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        
        .scenario-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .scenario-title {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: #fff;
        }
        
        .scenario-description {
          font-size: 1rem;
          line-height: 1.6;
          color: #ccc;
        }
      `}</style>
    </div>
  );
};

/**
 * 低功耗广域网解决方案业务详情页面
 */
const LPWANSolutionsPage = () => {
  // 技术特点
  const techFeatures = [
    {
      title: "超长通信距离",
      description: "LPWAN技术可实现数公里甚至数十公里的通信覆盖，大幅减少部署成本。"
    },
    {
      title: "超低功耗",
      description: "设备可在电池供电的情况下工作数年，无需频繁更换电池，降低维护成本。"
    },
    {
      title: "大规模部署",
      description: "单一网关可支持数千甚至数万个设备连接，适合大规模物联网应用场景。"
    },
    {
      title: "强穿透能力",
      description: "信号穿透能力强，可以穿透墙壁、地下室等障碍物，实现全面覆盖。"
    }
  ];
  
  // 模块类型
  const moduleTypes = [
    {
      type: "LoRa模块",
      specs: [
        "频率范围: 433/868/915 MHz ISM频段",
        "通信距离: 城区2-5公里，郊区15公里以上",
        "数据传输率: 0.3 kbps - 50 kbps",
        "功耗: 发送10mA, 接收1.5mA, 休眠1µA"
      ],
      icon: "📡"
    },
    {
      type: "NB-IoT模块",
      specs: [
        "全球标准化: 3GPP标准支持",
        "通信距离: 基于蜂窝网络覆盖区域",
        "数据传输率: 最高250kbps",
        "功耗: 发送120mA, 接收50mA, 休眠5µA",
        "直接使用现有蜂窝网络基础设施"
      ],
      icon: "📶"
    },
    {
      type: "Sigfox模块",
      specs: [
        "频率范围: 区域性ISM频段",
        "通信距离: 城区3-10公里，郊区30-50公里",
        "数据传输率: 100bps",
        "功耗: 极低功耗，电池可用数年",
        "全球运营商网络覆盖"
      ],
      icon: "🌐"
    }
  ];
  
  // 应用场景
  const scenarios = [
    {
      title: "智慧农业",
      description: "通过LPWAN技术连接农田传感器，监测土壤湿度、温度和养分，实现精准灌溉和施肥，提高农作物产量和质量。",
      icon: "🌾"
    },
    {
      title: "环境监测",
      description: "利用低功耗传感器网络实时监测空气质量、水质、噪声等环境参数，为环境管理提供数据支持。",
      icon: "🌿"
    },
    {
      title: "智能计量",
      description: "实现水表、电表、燃气表的远程自动抄表，无需人工干预，大幅提高抄表效率和准确性。",
      icon: "📊"
    },
    {
      title: "资产追踪",
      description: "追踪物流、车辆、设备等移动资产的位置和状态，提高资产利用率和管理效率。",
      icon: "📍"
    }
  ];
  
  return (
    <Layout title="EEnous - 低功耗广域网解决方案">
      <div className="business-detail-page">
        <div className="page-bg">
          <video autoPlay muted loop className="bg-video">
            <source src="/videos/lpwan-bg.mp4" type="video/mp4" />
          </video>
          <div className="bg-overlay"></div>
        </div>
        
        <div className="page-content">
          <div className="breadcrumb animate-fadeIn">
            <Link href="/businesses">
              <span className="breadcrumb-link">核心业务</span>
            </Link>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">低功耗广域网解决方案</span>
          </div>
          
          <div className="hero-section">
            <h1 className="page-title animate-fadeIn animate-delay-100">低功耗广域网解决方案</h1>
            <div className="title-separator animate-scaleX"></div>
            <p className="page-subtitle animate-fadeIn animate-delay-200">
              基于LoRa、NB-IoT、Sigfox等技术，实现远距离低功耗的数据传输和设备管理，为智慧农业、环境监测等领域提供定制化服务
            </p>
          </div>
          
          <div className="content-grid">
            <div className="main-content">
              <div className="solution-intro animate-fadeIn animate-delay-300">
                <h2 className="section-title">解决方案概述</h2>
                <div className="intro-content">
                  <p>
                    我们的低功耗广域网（LPWAN）解决方案是一套基于LoRa、NB-IoT、Sigfox等先进通信技术的物联网连接解决方案，专为需要在远距离和低功耗条件下进行数据传输的应用场景设计。通过LPWAN技术，设备可以在电池供电的情况下工作数年，同时实现数公里甚至数十公里的通信覆盖，大幅降低物联网系统的部署和维护成本。
                  </p>
                  
                  <p>
                    我们提供从硬件模块到网络服务器再到应用平台的全栈解决方案，包括传感器节点、网关设备、网络服务器和应用开发接口等。根据不同应用场景的需求，我们可以灵活选择最适合的LPWAN技术，并提供定制化的开发和集成服务，帮助客户快速实现物联网应用。
                  </p>
                  
                  <p>
                    此外，我们的解决方案还提供了强大的安全机制，确保数据传输的安全性和可靠性，以及与云平台的无缝集成，实现数据的高效管理和分析。
                  </p>
                </div>
              </div>
              
              <div className="tech-features-section animate-fadeIn animate-delay-400">
                <h2 className="section-title">技术特点</h2>
                <div className="features-grid">
                  {techFeatures.map((feature, index) => (
                    <TechFeatureItem 
                      key={index}
                      title={feature.title}
                      description={feature.description}
                      index={index}
                    />
                  ))}
                </div>
              </div>
              
              <div className="solution-image animate-fadeIn animate-delay-500">
                <div className="image-placeholder">
                  <div className="placeholder-text">LPWAN网络拓扑图</div>
                </div>
              </div>
              
              <div className="module-types animate-fadeIn animate-delay-600">
                <h2 className="section-title">模块类型</h2>
                <div className="modules-list">
                  {moduleTypes.map((module, index) => (
                    <ModuleTypeItem 
                      key={index}
                      type={module.type}
                      specs={module.specs}
                      icon={module.icon}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="side-content">
              <div className="benefits-card animate-fadeIn animate-delay-300">
                <h2 className="section-title">方案优势</h2>
                <ul className="benefits-list">
                  <li className="benefit-item">节能降耗，单节点电池可工作数年</li>
                  <li className="benefit-item">覆盖范围广，减少网络基础设施投入</li>
                  <li className="benefit-item">部署简单，降低安装和维护成本</li>
                  <li className="benefit-item">支持大规模设备连接，轻松扩展</li>
                  <li className="benefit-item">灵活选择通信技术，满足不同需求</li>
                  <li className="benefit-item">与云平台无缝集成，实现数据价值</li>
                  <li className="benefit-item">定制化开发，适应各种应用场景</li>
                </ul>
              </div>
              
              <div className="comparison-card animate-fadeIn animate-delay-400">
                <h2 className="section-title">技术对比</h2>
                <div className="comparison-table">
                  <div className="table-row header">
                    <div className="table-cell">技术</div>
                    <div className="table-cell">距离</div>
                    <div className="table-cell">功耗</div>
                    <div className="table-cell">数据率</div>
                  </div>
                  
                  <div className="table-row">
                    <div className="table-cell">LoRa</div>
                    <div className="table-cell">2-15km</div>
                    <div className="table-cell">很低</div>
                    <div className="table-cell">0.3-50kbps</div>
                  </div>
                  
                  <div className="table-row">
                    <div className="table-cell">NB-IoT</div>
                    <div className="table-cell">1-10km</div>
                    <div className="table-cell">低</div>
                    <div className="table-cell">≤250kbps</div>
                  </div>
                  
                  <div className="table-row">
                    <div className="table-cell">Sigfox</div>
                    <div className="table-cell">3-50km</div>
                    <div className="table-cell">极低</div>
                    <div className="table-cell">100bps</div>
                  </div>
                  
                  <div className="table-row">
                    <div className="table-cell">WiFi</div>
                    <div className="table-cell">100m</div>
                    <div className="table-cell">高</div>
                    <div className="table-cell">≤600Mbps</div>
                  </div>
                  
                  <div className="table-row">
                    <div className="table-cell">蓝牙</div>
                    <div className="table-cell">10-100m</div>
                    <div className="table-cell">中</div>
                    <div className="table-cell">1-3Mbps</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="scenarios-section animate-fadeIn animate-delay-700">
            <h2 className="section-title">应用场景</h2>
            <p className="section-desc">
              我们的低功耗广域网解决方案广泛应用于以下场景，为各行业提供高效、可靠的物联网连接：
            </p>
            <div className="scenarios-grid">
              {scenarios.map((scenario, index) => (
                <ScenarioCard 
                  key={index}
                  title={scenario.title}
                  description={scenario.description}
                  icon={scenario.icon}
                  index={index}
                />
              ))}
            </div>
          </div>
          
          <div className="case-study animate-fadeIn animate-delay-800">
            <h2 className="section-title">成功案例</h2>
            <div className="case-content">
              <h3 className="case-title">某大型农业企业智慧农业项目</h3>
              <p className="case-description">
                我们为该企业部署了基于LoRa技术的智慧农业解决方案，覆盖1000亩农田，安装了200多个土壤湿度和温度传感器，实现了精准灌溉和施肥。该系统帮助客户节约了30%的水资源和20%的肥料使用量，同时提高了作物产量15%。传感器采用电池供电，可连续工作3年以上，极大地降低了维护成本。
              </p>
            </div>
          </div>
          
          <div className="navigation-bottom animate-fadeIn animate-delay-900">
            <Link href="/business/iot-platform">
              <div className="back-button">
                <span className="back-arrow">←</span>
                上一个业务：智能物联网运维平台
              </div>
            </Link>
            <Link href="/business/precision-measurement">
              <div className="next-button">
                下一个业务：高精度多通道传感测量设备
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
        
        .solution-intro, .tech-features-section, .module-types {
          margin-bottom: 3rem;
        }
        
        .intro-content p {
          margin-bottom: 1rem;
          font-size: 1.1rem;
          line-height: 1.8;
          color: #ccc;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        
        .solution-image {
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
        
        .benefits-card, .comparison-card {
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 4px;
          margin-bottom: 2rem;
        }
        
        .benefits-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .benefit-item {
          font-size: 1rem;
          color: #ccc;
          margin-bottom: 1rem;
          position: relative;
          padding-left: 1.5rem;
        }
        
        .benefit-item::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #fff;
        }
        
        .comparison-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .table-row {
          display: flex;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .table-row.header {
          font-weight: bold;
          color: #fff;
        }
        
        .table-cell {
          flex: 1;
          padding: 0.8rem 0.5rem;
          font-size: 0.9rem;
          color: #ccc;
        }
        
        .table-row.header .table-cell {
          color: #fff;
        }
        
        .scenarios-section {
          margin-bottom: 4rem;
        }
        
        .scenarios-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        
        .case-study {
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 4px;
          margin-bottom: 3rem;
        }
        
        .case-title {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: #fff;
        }
        
        .case-description {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #ccc;
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
          
          .features-grid, .scenarios-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .page-title {
            font-size: 2.5rem;
          }
          
          .features-grid, .scenarios-grid {
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

export default LPWANSolutionsPage; 