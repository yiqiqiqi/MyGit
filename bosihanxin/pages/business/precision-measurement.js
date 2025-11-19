import React from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';

/**
 * 性能指标项组件
 */
const PerformanceItem = ({ label, value, index }) => {
  return (
    <div className={`performance-item animate-fadeIn`} style={{ animationDelay: `${index * 100 + 300}ms` }}>
      <div className="performance-label">{label}</div>
      <div className="performance-value">{value}</div>
      
      <style jsx>{`
        .performance-item {
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.5rem;
          border-radius: 4px;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .performance-item:hover {
          background-color: rgba(255, 255, 255, 0.08);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        
        .performance-label {
          font-size: 1rem;
          color: #aaa;
          margin-bottom: 0.8rem;
        }
        
        .performance-value {
          font-size: 1.6rem;
          color: #fff;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

/**
 * 核心特点项组件
 */
const FeatureItem = ({ title, description, icon, index }) => {
  return (
    <div className={`feature-item animate-fadeIn`} style={{ animationDelay: `${index * 100 + 400}ms` }}>
      <div className="feature-icon">{icon}</div>
      <div className="feature-content">
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description">{description}</p>
      </div>
      
      <style jsx>{`
        .feature-item {
          display: flex;
          margin-bottom: 2.5rem;
        }
        
        .feature-icon {
          font-size: 2.5rem;
          margin-right: 1.5rem;
          flex-shrink: 0;
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
 * 技术规格项组件
 */
const SpecItem = ({ category, items }) => {
  return (
    <div className="spec-category">
      <h3 className="category-title">{category}</h3>
      <ul className="spec-list">
        {items.map((item, index) => (
          <li key={index} className="spec-item">
            <span className="spec-name">{item.name}:</span>
            <span className="spec-value">{item.value}</span>
          </li>
        ))}
      </ul>
      
      <style jsx>{`
        .spec-category {
          margin-bottom: 2rem;
        }
        
        .category-title {
          font-size: 1.2rem;
          margin-bottom: 1rem;
          color: #fff;
          position: relative;
          padding-bottom: 0.5rem;
        }
        
        .category-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 30px;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.3);
        }
        
        .spec-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .spec-item {
          font-size: 1rem;
          color: #ccc;
          margin-bottom: 0.7rem;
          display: flex;
        }
        
        .spec-name {
          min-width: 160px;
          color: #aaa;
        }
        
        .spec-value {
          flex: 1;
          color: #fff;
        }
      `}</style>
    </div>
  );
};

/**
 * 应用案例组件
 */
const ApplicationCase = ({ title, description, benefits, bgClass }) => {
  return (
    <div className={`application-case ${bgClass}`}>
      <h3 className="case-title">{title}</h3>
      <p className="case-description">{description}</p>
      
      <div className="case-benefits">
        <h4 className="benefits-title">客户收益</h4>
        <ul className="benefits-list">
          {benefits.map((benefit, index) => (
            <li key={index} className="benefit-item">{benefit}</li>
          ))}
        </ul>
      </div>
      
      <style jsx>{`
        .application-case {
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 4px;
          margin-bottom: 2rem;
          position: relative;
          overflow: hidden;
        }
        
        .application-case::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background-color: #fff;
          opacity: 0.5;
        }
        
        .case-bg-1::before {
          background-color: #4caf50;
        }
        
        .case-bg-2::before {
          background-color: #2196f3;
        }
        
        .case-bg-3::before {
          background-color: #ff9800;
        }
        
        .case-title {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #fff;
        }
        
        .case-description {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #ccc;
          margin-bottom: 1.5rem;
        }
        
        .benefits-title {
          font-size: 1.1rem;
          margin-bottom: 1rem;
          color: #fff;
        }
        
        .benefits-list {
          padding-left: 1.5rem;
        }
        
        .benefit-item {
          font-size: 1rem;
          color: #ccc;
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
};

/**
 * 高精度多通道传感测量设备业务详情页面
 */
const PrecisionMeasurementPage = () => {
  // 核心性能指标
  const performanceMetrics = [
    { label: "测量通道", value: "128 通道" },
    { label: "测量精度", value: "0.01%" },
    { label: "线性度", value: "优于 0.1%" },
    { label: "工作温度", value: "-40℃ 至 85℃" },
    { label: "存储容量", value: "百万组数据" },
    { label: "电压测量范围", value: "±10V" }
  ];
  
  // 核心特点
  const coreFeatures = [
    {
      title: "模块化设计",
      description: "系统采用模块化设计，集成128个测量通道，可灵活配置扩展，满足不同规模的测量需求。",
      icon: "🔄"
    },
    {
      title: "宽温域稳定性",
      description: "在-40℃至85℃的宽温域环境下仍能稳定工作，适用于各种恶劣工况下的测量任务。",
      icon: "🌡️"
    },
    {
      title: "低噪声前置放大",
      description: "精心设计的低噪声前置放大电路，有效抑制了环境干扰，大幅提升信噪比。",
      icon: "📶"
    },
    {
      title: "高分辨率ADC",
      description: "搭载高分辨率24位ADC和多级数字滤波算法，确保测量数据的高精度和可靠性。",
      icon: "📊"
    },
    {
      title: "多种通信接口",
      description: "支持RS485总线、以太网或无线通信等多种方式上传数据，便于系统集成和远程监控。",
      icon: "🔌"
    },
    {
      title: "一体化坚固结构",
      description: "高强度铝制外壳确保在恶劣工况下仍能可靠工作，坚固耐用，便于携带和安装。",
      icon: "🛡️"
    }
  ];
  
  // 技术规格
  const technicalSpecs = [
    {
      category: "测量性能",
      items: [
        { name: "通道数量", value: "128通道" },
        { name: "AD分辨率", value: "24位" },
        { name: "测量精度", value: "0.01%" },
        { name: "线性度", value: "优于0.1%" },
        { name: "采样速率", value: "最高100kHz" },
        { name: "输入范围", value: "±10V / ±5V / ±2.5V 可配置" }
      ]
    },
    {
      category: "系统特性",
      items: [
        { name: "处理器", value: "高性能32位ARM处理器" },
        { name: "存储容量", value: "8GB内置闪存, 支持SD卡扩展" },
        { name: "数据记录", value: "可连续记录百万组测量数据" },
        { name: "通信接口", value: "RS485, 以太网, WiFi, 蓝牙" },
        { name: "工作温度", value: "-40℃ 至 85℃" },
        { name: "存储温度", value: "-50℃ 至 100℃" }
      ]
    },
    {
      category: "物理特性",
      items: [
        { name: "外壳材质", value: "高强度铝合金" },
        { name: "防护等级", value: "IP65" },
        { name: "尺寸大小", value: "280mm × 210mm × 65mm" },
        { name: "重量", value: "约2.5kg" },
        { name: "电源要求", value: "DC 9-36V, 功耗<15W" },
        { name: "电池续航", value: "内置电池可连续工作8小时" }
      ]
    }
  ];
  
  // 应用案例
  const applicationCases = [
    {
      title: "新能源电池测试",
      description: "为某新能源汽车电池制造商提供了128通道电池性能测试系统，用于同时监测多组电池的充放电性能、温度分布和内阻变化。",
      benefits: [
        "测试效率提升300%，大幅缩短产品开发周期",
        "0.01%的高精度测量保证了电池性能评估的准确性",
        "坚固耐用的设计适应生产线环境，减少维护成本"
      ],
      bgClass: "case-bg-1"
    },
    {
      title: "物联网传感器校准",
      description: "为物联网传感器制造商提供批量传感器校准解决方案，通过多通道同时测量，实现传感器的快速校准和精确分级。",
      benefits: [
        "校准效率提升500%，显著提高生产线产能",
        "改进产品一致性，不良率降低60%",
        "自动化校准流程减少人工干预，降低人为误差"
      ],
      bgClass: "case-bg-2"
    },
    {
      title: "工业设备状态监测",
      description: "为大型工业企业提供设备状态监测系统，实时采集关键设备的振动、温度、电流等多种参数，实现设备状态评估和预测性维护。",
      benefits: [
        "设备故障预警准确率达95%，避免意外停机损失",
        "维护成本降低40%，延长设备使用寿命",
        "多通道同时监测，全面了解设备运行状态"
      ],
      bgClass: "case-bg-3"
    }
  ];
  
  return (
    <Layout title="EEnous - 高精度多通道传感测量设备">
      <div className="business-detail-page">
        <div className="page-bg">
          <video autoPlay muted loop className="bg-video">
            <source src="/videos/precision-bg.mp4" type="video/mp4" />
          </video>
          <div className="bg-overlay"></div>
        </div>
        
        <div className="page-content">
          <div className="breadcrumb animate-fadeIn">
            <Link href="/businesses">
              <span className="breadcrumb-link">核心业务</span>
            </Link>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">高精度多通道传感测量设备</span>
          </div>
          
          <div className="hero-section">
            <h1 className="page-title animate-fadeIn animate-delay-100">高精度多通道传感测量设备</h1>
            <div className="title-separator animate-scaleX"></div>
            <p className="page-subtitle animate-fadeIn animate-delay-200">
              集成128个测量通道，提供0.01%高精度测量，适用于新能源电池、物联网传感器和工控设备等领域的精密电阻检测
            </p>
          </div>
          
          <div className="performance-metrics animate-fadeIn animate-delay-300">
            <div className="metrics-grid">
              {performanceMetrics.map((metric, index) => (
                <PerformanceItem 
                  key={index}
                  label={metric.label}
                  value={metric.value}
                  index={index}
                />
              ))}
            </div>
          </div>
          
          <div className="content-grid">
            <div className="main-content">
              <div className="product-intro animate-fadeIn animate-delay-400">
                <h2 className="section-title">产品概述</h2>
                <div className="intro-content">
                  <p>
                    我们的高精度多通道传感测量设备是一款集成了128个测量通道的高性能测量系统，采用模块化设计，可在-40℃至85℃的宽温域环境下稳定工作。该设备配备了精心设计的低噪声前置放大电路，有效抑制了环境干扰，大幅提升了信噪比，结合高分辨率24位ADC和多级数字滤波算法，整机测量精度可达0.01%，线性度优于0.1%，为高精尖科研和工业测控领域提供可靠的测量数据支撑。
                  </p>
                  
                  <p>
                    系统内置大容量存储单元，可连续记录多达百万组测量数据，并支持实时通过RS485总线、以太网或无线通信等多种方式上传至上位机，便于测量数据的云端管理和远程调用。板载MCU可根据用户需求灵活配置各通道测量参数，并实现测量过程的全自动控制。
                  </p>
                  
                  <p>
                    整机采用一体化结构，高强度铝制外壳确保在恶劣工况下仍能可靠工作，配有直观的状态指示和人性化的操作界面，坚固耐用，便于携带，可广泛应用于新能源电池、物联网传感器、工控设备等领域的精密电阻检测。凭借测量精度高、抗干扰能力强、适用范围广等优势，必将为企业的生产和研发提供强有力的测试手段，助力产品性能提升和品质控制。
                  </p>
                </div>
              </div>
              
              <div className="product-image animate-fadeIn animate-delay-500">
                <div className="image-placeholder">
                  <div className="placeholder-text">高精度多通道传感测量设备</div>
                </div>
              </div>
              
              <div className="core-features animate-fadeIn animate-delay-600">
                <h2 className="section-title">核心特点</h2>
                <div className="features-list">
                  {coreFeatures.map((feature, index) => (
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
            </div>
            
            <div className="side-content">
              <div className="tech-specs animate-fadeIn animate-delay-400">
                <h2 className="section-title">技术规格</h2>
                {technicalSpecs.map((category, index) => (
                  <SpecItem 
                    key={index}
                    category={category.category}
                    items={category.items}
                  />
                ))}
              </div>
              
              <div className="contact-card animate-fadeIn animate-delay-500">
                <h3 className="card-title">设备咨询</h3>
                <p className="card-text">
                  如需了解更多设备信息或定制化解决方案，请联系我们的技术团队。
                </p>
                <Link href="/contact">
                  <div className="contact-button">
                    联系我们
                  </div>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="applications-section animate-fadeIn animate-delay-700">
            <h2 className="section-title">应用案例</h2>
            <p className="section-desc">
              我们的高精度多通道传感测量设备已在多个行业成功应用，以下是部分典型案例：
            </p>
            
            {applicationCases.map((appCase, index) => (
              <ApplicationCase 
                key={index}
                title={appCase.title}
                description={appCase.description}
                benefits={appCase.benefits}
                bgClass={appCase.bgClass}
              />
            ))}
          </div>
          
          <div className="development-roadmap animate-fadeIn animate-delay-800">
            <h2 className="section-title">产品路线图</h2>
            <div className="roadmap-content">
              <div className="roadmap-item">
                <div className="roadmap-marker current"></div>
                <div className="roadmap-info">
                  <div className="roadmap-time">当前版本</div>
                  <div className="roadmap-title">MeasurePro 128X</div>
                  <div className="roadmap-desc">128通道高精度测量系统，0.01%精度</div>
                </div>
              </div>
              
              <div className="roadmap-item">
                <div className="roadmap-marker"></div>
                <div className="roadmap-info">
                  <div className="roadmap-time">2024年Q3</div>
                  <div className="roadmap-title">MeasurePro 256X</div>
                  <div className="roadmap-desc">256通道扩展版本，支持更多信号类型</div>
                </div>
              </div>
              
              <div className="roadmap-item">
                <div className="roadmap-marker"></div>
                <div className="roadmap-info">
                  <div className="roadmap-time">2025年Q1</div>
                  <div className="roadmap-title">MeasurePro 128X Pro</div>
                  <div className="roadmap-desc">集成AI分析引擎，智能数据处理</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="navigation-bottom animate-fadeIn animate-delay-900">
            <Link href="/business/lpwan-solutions">
              <div className="back-button">
                <span className="back-arrow">←</span>
                上一个业务：低功耗广域网解决方案
              </div>
            </Link>
            <Link href="/businesses">
              <div className="next-button">
                返回核心业务
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
          margin-bottom: 3rem;
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
        
        .performance-metrics {
          margin-bottom: 4rem;
        }
        
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 1.5rem;
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
        
        .product-intro, .core-features {
          margin-bottom: 3rem;
        }
        
        .intro-content p {
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
        
        .tech-specs {
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 4px;
          margin-bottom: 2rem;
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
        
        .development-roadmap {
          margin-bottom: 4rem;
        }
        
        .roadmap-content {
          position: relative;
          padding-left: 2.5rem;
        }
        
        .roadmap-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 8px;
          width: 2px;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.1);
        }
        
        .roadmap-item {
          position: relative;
          margin-bottom: 2.5rem;
        }
        
        .roadmap-marker {
          position: absolute;
          left: -2.5rem;
          top: 0;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.3);
        }
        
        .roadmap-marker.current {
          background-color: #fff;
        }
        
        .roadmap-time {
          font-size: 0.9rem;
          color: #aaa;
          margin-bottom: 0.5rem;
        }
        
        .roadmap-title {
          font-size: 1.3rem;
          color: #fff;
          margin-bottom: 0.5rem;
        }
        
        .roadmap-desc {
          font-size: 1rem;
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
        
        @media (max-width: 1200px) {
          .metrics-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        @media (max-width: 992px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 768px) {
          .page-title {
            font-size: 2.5rem;
          }
          
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .navigation-bottom {
            flex-direction: column;
            gap: 1rem;
          }
        }
        
        @media (max-width: 576px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </Layout>
  );
};

export default PrecisionMeasurementPage; 