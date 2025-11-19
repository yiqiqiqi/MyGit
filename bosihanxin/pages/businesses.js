import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

/**
 * 统计数据组件
 */
const StatCard = ({ number, label, suffix = "", index }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const target = parseInt(number);
    const duration = 2000;
    const step = target / (duration / 16);
    
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [number]);
  
  return (
    <div className={`stat-card animate-fadeIn animate-delay-${index * 100}`}>
      <div className="stat-number">
        {count}{suffix}
      </div>
      <div className="stat-label">{label}</div>
      
      <style jsx>{`
        .stat-card {
          text-align: center;
          padding: 2rem 1.5rem;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.05) 0%, 
            rgba(255, 255, 255, 0.1) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, 
            rgba(59, 130, 246, 0.8) 0%, 
            rgba(147, 197, 253, 1) 50%, 
            rgba(59, 130, 246, 0.8) 100%);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(59, 130, 246, 0.2);
        }
        
        .stat-card:hover::before {
          transform: scaleX(1);
        }
        
        .stat-number {
          font-size: 3rem;
          font-weight: 700;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
          text-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
        }
        
        .stat-label {
          font-size: 1rem;
          color: #cbd5e1;
          font-weight: 500;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  );
};

/**
 * 技术能力进度条组件
 */
const TechCapability = ({ name, percentage, index }) => {
  return (
    <div className={`tech-capability animate-fadeIn animate-delay-${index * 100 + 600}`}>
      <div className="capability-header">
        <span className="capability-name">{name}</span>
        <span className="capability-percentage">{percentage}%</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
      </div>
      
      <style jsx>{`
        .tech-capability {
          margin-bottom: 2rem;
        }
        
        .capability-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.8rem;
        }
        
        .capability-name {
          font-size: 1rem;
          color: #fff;
          font-weight: 500;
        }
        
        .capability-percentage {
          font-size: 1rem;
          color: rgba(59, 130, 246, 1);
          font-weight: 600;
        }
        
        .progress-bar {
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, 
            rgba(59, 130, 246, 0.8) 0%, 
            rgba(147, 197, 253, 1) 100%);
          border-radius: 4px;
          transition: width 2s ease-in-out;
          position: relative;
        }
        
        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.3) 50%, 
            transparent 100%);
          animation: shimmer 2s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

/**
 * 业务卡片组件 - 增强版
 */
const BusinessCard = ({ id, title, description, icon, index, metrics, tags }) => {
  return (
    <div className={`business-card animate-fadeIn animate-delay-${index * 100}`}>
      <div className="card-header">
        <div className="business-icon">
          <span className="icon-content">{icon}</span>
          <div className="icon-glow"></div>
        </div>
        <div className="card-badge">核心业务</div>
      </div>
      
      <div className="card-content">
        <h3 className="business-title">{title}</h3>
        <p className="business-description">{description}</p>
        
        {metrics && (
          <div className="metrics-section">
            <div className="metric-item">
              <span className="metric-value">{metrics.precision}</span>
              <span className="metric-label">精度</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">{metrics.performance}</span>
              <span className="metric-label">性能</span>
            </div>
          </div>
        )}
        
        {tags && (
          <div className="tags-section">
            {tags.map((tag, idx) => (
              <span key={idx} className="tag">{tag}</span>
            ))}
          </div>
        )}
        
        <Link href={`/business/${id}`}>
          <div className="read-more">
            <span className="read-more-text">深入了解</span>
            <div className="read-more-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 10H15M15 10L10 5M15 10L10 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </Link>
      </div>
      
      <style jsx>{`
        .business-card {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.03) 0%, 
            rgba(255, 255, 255, 0.08) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          height: 100%;
          display: flex;
          flex-direction: column;
          backdrop-filter: blur(10px);
          position: relative;
        }
        
        .business-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, 
            rgba(59, 130, 246, 0.8) 0%, 
            rgba(147, 197, 253, 1) 50%, 
            rgba(59, 130, 246, 0.8) 100%);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        
        .business-card:hover::before {
          transform: scaleX(1);
        }
        
        .business-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 25px 50px rgba(59, 130, 246, 0.2);
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.05) 0%, 
            rgba(255, 255, 255, 0.12) 100%);
          border-color: rgba(59, 130, 246, 0.3);
        }
        
        .card-header {
          padding: 2rem 2rem 0;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        
        .business-icon {
          position: relative;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }
        
        .icon-content {
          font-size: 2.5rem;
          position: relative;
          z-index: 2;
          filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.3));
        }
        
        .icon-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle, 
            rgba(59, 130, 246, 0.2) 0%, 
            transparent 70%);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        
        .card-badge {
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.8) 0%, 
            rgba(147, 197, 253, 0.8) 100%);
          color: #000;
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .card-content {
          padding: 0 2rem 2rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        
        .business-title {
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #fff;
          line-height: 1.3;
          background: linear-gradient(135deg, #fff 0%, rgba(59, 130, 246, 0.8) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .business-description {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #cbd5e1;
          margin-bottom: 1.5rem;
          flex: 1;
        }
        
        .metrics-section {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          padding: 1rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .metric-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
        .metric-value {
          font-size: 1.4rem;
          font-weight: 700;
          color: rgba(59, 130, 246, 1);
          margin-bottom: 0.3rem;
        }
        
        .metric-label {
          font-size: 0.8rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .tags-section {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        
        .tag {
          background: rgba(59, 130, 246, 0.1);
          color: rgba(59, 130, 246, 0.9);
          padding: 0.3rem 0.8rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }
        
        .read-more {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.1) 0%, 
            rgba(255, 255, 255, 0.05) 100%);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: auto;
        }
        
        .read-more:hover {
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.2) 0%, 
            rgba(255, 255, 255, 0.1) 100%);
          border-color: rgba(59, 130, 246, 0.4);
          transform: translateY(-2px);
        }
        
        .read-more-text {
          color: #fff;
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        
        .read-more-icon {
          color: rgba(59, 130, 246, 0.8);
          transition: all 0.3s ease;
        }
        
        .read-more:hover .read-more-icon {
          color: rgba(59, 130, 246, 1);
          transform: translateX(3px);
        }
      `}</style>
    </div>
  );
};

/**
 * 核心业务页面
 */
const BusinessesPage = () => {
  // 四大核心业务数据 - 增强版
  const businesses = [
    {
      id: "fiber-fusion",
      title: "保偏光纤熔接设备",
      icon: "🔬",
      description: "对标藤仓FSM-100P系列，实现80、125μm芯径保偏光纤的低损耗熔接，对接角度误差小于0.08°，为宇航级光纤组件提供国产化解决方案。采用三相放电熔接技术，支持大芯径光纤熔接。",
      metrics: {
        precision: "0.08°",
        performance: "99.9%"
      },
      tags: ["宇航级", "高精度", "国产化", "三相放电"]
    },
    {
      id: "iot-platform",
      title: "智能物联网运维平台",
      icon: "🌐",
      description: "基于4G/5G模块和LLM大语言模型打造的综合物联网平台，提供设备管理、数据分析、应用开发，结合微调后的工业大语言模型实现预测性维护、异常检测和智能决策。",
      metrics: {
        precision: "AI驱动",
        performance: "24/7"
      },
      tags: ["大语言模型", "预测维护", "智能决策", "5G"]
    },
    {
      id: "lpwan-solutions",
      title: "低功耗广域网解决方案",
      icon: "📡",
      description: "基于LoRa、NB-IoT、Sigfox等模块，针对智慧农业、环境检测、智能计量、资产追踪等场景，实现远距离低功耗条件下的高效数据传输和设备管理，提供定制化技术服务。",
      metrics: {
        precision: "15km",
        performance: "10年"
      },
      tags: ["LoRa", "NB-IoT", "超低功耗", "远距离"]
    },
    {
      id: "precision-measurement",
      title: "高精度多通道传感测量设备",
      icon: "📊",
      description: "集成128个测量通道，-40℃至85℃宽温域稳定工作。采用低噪声前置放大和多级滤波，测量精度达0.01%，线性度优于0.1%。支持多种通信方式，适用于新能源电池、物联网传感器、工控设备等领域。",
      metrics: {
        precision: "0.01%",
        performance: "128通道"
      },
      tags: ["多通道", "宽温域", "高精度", "低噪声"]
    }
  ];

  // 统计数据
  const stats = [
    { number: "4", label: "核心业务", suffix: "个" },
    { number: "50", label: "专利技术", suffix: "+" },
    { number: "100", label: "合作伙伴", suffix: "+" },
    { number: "99", label: "客户满意度", suffix: "%" }
  ];

  // 技术能力数据
  const techCapabilities = [
    { name: "光纤熔接技术", percentage: 95 },
    { name: "物联网平台开发", percentage: 92 },
    { name: "低功耗通信", percentage: 88 },
    { name: "精密测量技术", percentage: 90 },
    { name: "AI算法优化", percentage: 85 },
    { name: "系统集成能力", percentage: 93 }
  ];
  
  return (
    <Layout title="EEnous - 核心业务">
      <div className="businesses-page">
        <div className="page-bg">
          <video autoPlay muted loop className="bg-video">
            <source src="/videos/business-tech.mp4" type="video/mp4" />
          </video>
          <div className="bg-overlay"></div>
        </div>
        
        <div className="page-content">
          {/* 英雄区域 - 增强版 */}
          <div className="hero-section">
            <div className="hero-badge animate-fadeIn">
              <span className="badge-icon">🚀</span>
              <span>CORE BUSINESS</span>
            </div>
            <h1 className="page-title animate-fadeIn animate-delay-100">核心业务矩阵</h1>
            <div className="title-separator animate-scaleX animate-delay-200"></div>
            <p className="page-subtitle animate-fadeIn animate-delay-300">
              南京玻丝焊芯科技有限公司专注于高科技领域，构建四大核心业务生态，覆盖光纤通信、智能物联、低功耗通信和精密测量等前沿技术领域，为全球客户提供世界级的专业技术解决方案。
            </p>
          </div>

          {/* 统计数据区域 */}
          <div className="stats-section animate-fadeIn animate-delay-400">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <StatCard 
                  key={index}
                  number={stat.number}
                  label={stat.label}
                  suffix={stat.suffix}
                  index={index}
                />
              ))}
            </div>
          </div>
          
          {/* 核心业务网格 */}
          <div className="businesses-section">
            <h2 className="section-title animate-fadeIn animate-delay-500">
              <span className="title-icon">⚡</span>
              四大核心业务
            </h2>
            <div className="businesses-grid">
              {businesses.map((business, index) => (
                <BusinessCard 
                  key={index}
                  id={business.id}
                  title={business.title}
                  description={business.description}
                  icon={business.icon}
                  metrics={business.metrics}
                  tags={business.tags}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* 技术能力展示区域 */}
          <div className="capabilities-section animate-fadeIn animate-delay-600">
            <div className="capabilities-content">
              <div className="capabilities-text">
                <h2 className="section-title">
                  <span className="title-icon">🔧</span>
                  核心技术能力
                </h2>
                <p className="section-description">
                  我们在多个技术领域拥有深厚的积累和领先优势，通过持续的研发投入和技术创新，不断提升核心竞争力，为客户提供最可靠的技术保障。
                </p>
                <div className="capabilities-stats">
                  <div className="stat-highlight">
                    <span className="stat-value">95%</span>
                    <span className="stat-desc">平均技术成熟度</span>
                  </div>
                  <div className="stat-highlight">
                    <span className="stat-value">50+</span>
                    <span className="stat-desc">核心专利技术</span>
                  </div>
                </div>
              </div>
              
              <div className="capabilities-chart">
                <h3 className="chart-title">技术能力雷达图</h3>
                <div className="capabilities-list">
                  {techCapabilities.map((capability, index) => (
                    <TechCapability 
                      key={index}
                      name={capability.name}
                      percentage={capability.percentage}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* 技术生态系统 */}
          <div className="ecosystem-section animate-fadeIn animate-delay-700">
            <h2 className="section-title">
              <span className="title-icon">🌐</span>
              技术生态系统
            </h2>
            <div className="ecosystem-content">
              <div className="ecosystem-description">
                <p>
                  我们的四大核心业务构成了一个完整的技术生态系统，从基础的光纤连接技术，到智能化的物联网平台，再到高效的传输网络和精密的测量设备，形成了从底层硬件到上层应用的全栈技术能力。
                </p>
                <p>
                  这些业务模块不仅各自在细分领域具有领先优势，更能相互协同增效，为客户提供一站式的集成化解决方案。例如，我们可以将高精度传感设备通过低功耗广域网连接至智能物联网平台，实现数据的全链路采集、传输、分析和智能决策。
                </p>
              </div>
              
              <div className="ecosystem-features">
                <div className="feature-item">
                  <div className="feature-icon">🔄</div>
                  <div className="feature-content">
                    <h4>技术协同</h4>
                    <p>各业务线深度融合，技术能力相互补强</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">⚡</div>
                  <div className="feature-content">
                    <h4>快速响应</h4>
                    <p>全栈技术能力，快速响应客户需求</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">🎯</div>
                  <div className="feature-content">
                    <h4>定制化服务</h4>
                    <p>针对性解决方案，满足特定行业需求</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">🚀</div>
                  <div className="feature-content">
                    <h4>持续创新</h4>
                    <p>技术持续迭代，保持行业领先地位</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 行动呼吁区域 */}
          <div className="cta-section animate-fadeIn animate-delay-800">
            <div className="cta-content">
              <h2 className="cta-title">准备开始您的技术创新之旅？</h2>
              <p className="cta-description">
                联系我们的专业团队，获取定制化的技术解决方案
              </p>
              <div className="cta-buttons">
                <Link href="/contact">
                  <div className="cta-button primary">
                    <span>🚀</span>
                    立即咨询
                  </div>
                </Link>
                <Link href="/tech-cooperation">
                  <div className="cta-button secondary">
                    <span>🤝</span>
                    技术合作
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        /* 页面基础样式 */
        .businesses-page {
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
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
          background: linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.95) 100%);
        }
        
        .page-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 140px 2rem 6rem;
          position: relative;
        }
        
        /* 英雄区域样式 - 增强版 */
        .hero-section {
          text-align: center;
          margin-bottom: 8rem;
          position: relative;
        }
        
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.8rem 2rem;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.8) 0%, 
            rgba(147, 197, 253, 0.8) 100%);
          color: #000;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 2rem;
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
        }
        
        .badge-icon {
          font-size: 1.2rem;
        }
        
        .page-title {
          font-size: 4.5rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 4px;
          margin-bottom: 2rem;
          background: linear-gradient(135deg, 
            #fff 0%, 
            rgba(59, 130, 246, 0.8) 50%,
            rgba(147, 197, 253, 1) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
        }
        
        .title-separator {
          width: 120px;
          height: 4px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(59, 130, 246, 0.8) 20%,
            rgba(147, 197, 253, 1) 50%,
            rgba(59, 130, 246, 0.8) 80%,
            transparent 100%);
          margin: 0 auto 3rem;
          border-radius: 2px;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
        }
        
        .page-subtitle {
          font-size: 1.4rem;
          line-height: 1.8;
          color: #cbd5e1;
          max-width: 900px;
          margin: 0 auto;
          font-weight: 300;
          letter-spacing: 0.5px;
        }
        
        /* 统计数据区域样式 */
        .stats-section {
          margin-bottom: 8rem;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }
        
        /* 核心业务区域样式 */
        .businesses-section {
          margin-bottom: 8rem;
        }
        
        .businesses-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 3rem;
          margin-top: 4rem;
        }
        
        /* 区域标题样式 */
        .section-title {
          font-size: 2.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          background: linear-gradient(135deg, #fff 0%, rgba(59, 130, 246, 0.8) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .title-icon {
          font-size: 2.5rem;
          filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.3));
        }
        
        /* 技术能力展示区域样式 */
        .capabilities-section {
          margin-bottom: 8rem;
          padding: 4rem 0;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.03) 0%, 
            rgba(255, 255, 255, 0.03) 50%,
            rgba(59, 130, 246, 0.03) 100%);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }
        
        .capabilities-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }
        
        .capabilities-text {
          padding: 2rem;
        }
        
        .section-description {
          font-size: 1.2rem;
          line-height: 1.8;
          color: #94a3b8;
          margin-bottom: 3rem;
        }
        
        .capabilities-stats {
          display: flex;
          gap: 3rem;
          margin-top: 2rem;
        }
        
        .stat-highlight {
          text-align: center;
        }
        
        .stat-value {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          color: rgba(59, 130, 246, 1);
          margin-bottom: 0.5rem;
        }
        
        .stat-desc {
          font-size: 0.9rem;
          color: #cbd5e1;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .capabilities-chart {
          padding: 2rem;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.05) 0%, 
            rgba(255, 255, 255, 0.1) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          backdrop-filter: blur(10px);
        }
        
        .chart-title {
          font-size: 1.5rem;
          color: #fff;
          margin-bottom: 2rem;
          text-align: center;
        }
        
        .capabilities-list {
          margin-top: 1.5rem;
        }
        
        /* 技术生态系统样式 */
        .ecosystem-section {
          margin-bottom: 8rem;
        }
        
        .ecosystem-content {
          margin-top: 4rem;
        }
        
        .ecosystem-description {
          margin-bottom: 4rem;
        }
        
        .ecosystem-description p {
          font-size: 1.2rem;
          line-height: 1.8;
          color: #cbd5e1;
          margin-bottom: 1.5rem;
        }
        
        .ecosystem-features {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        
        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          padding: 2rem;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.05) 0%, 
            rgba(255, 255, 255, 0.1) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        
        .feature-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.2);
        }
        
        .feature-icon {
          font-size: 2rem;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.2) 0%, 
            rgba(147, 197, 253, 0.2) 100%);
          border-radius: 50%;
          flex-shrink: 0;
        }
        
        .feature-content h4 {
          font-size: 1.3rem;
          color: #fff;
          margin-bottom: 0.8rem;
          font-weight: 600;
        }
        
        .feature-content p {
          font-size: 1rem;
          color: #94a3b8;
          line-height: 1.6;
        }
        
        /* 行动呼吁区域样式 */
        .cta-section {
          margin-bottom: 4rem;
          padding: 4rem;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.1) 0%, 
            rgba(255, 255, 255, 0.05) 100%);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 24px;
          text-align: center;
          backdrop-filter: blur(15px);
          position: relative;
          overflow: hidden;
        }
        
        .cta-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, 
            rgba(59, 130, 246, 0.05) 0%, 
            transparent 70%);
          animation: slowRotate 20s linear infinite;
          pointer-events: none;
        }
        
        @keyframes slowRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .cta-content {
          position: relative;
          z-index: 1;
        }
        
        .cta-title {
          font-size: 2.5rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, 
            #fff 0%, 
            rgba(59, 130, 246, 0.8) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .cta-description {
          font-size: 1.3rem;
          color: #94a3b8;
          margin-bottom: 3rem;
          line-height: 1.6;
        }
        
        .cta-buttons {
          display: flex;
          gap: 2rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          padding: 1.2rem 2.5rem;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        
        .cta-button.primary {
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          color: #000;
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
        }
        
        .cta-button.primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(59, 130, 246, 0.4);
        }
        
        .cta-button.secondary {
          background: transparent;
          color: #fff;
          border: 2px solid rgba(59, 130, 246, 0.5);
        }
        
        .cta-button.secondary:hover {
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.8);
          transform: translateY(-3px);
        }
        
        /* 动画样式 */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleX {
          from { 
            transform: scaleX(0); 
            opacity: 0;
          }
          to { 
            transform: scaleX(1); 
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-scaleX {
          animation: scaleX 0.8s ease-out forwards;
          transform-origin: center;
        }
        
        .animate-delay-100 { animation-delay: 100ms; }
        .animate-delay-200 { animation-delay: 200ms; }
        .animate-delay-300 { animation-delay: 300ms; }
        .animate-delay-400 { animation-delay: 400ms; }
        .animate-delay-500 { animation-delay: 500ms; }
        .animate-delay-600 { animation-delay: 600ms; }
        .animate-delay-700 { animation-delay: 700ms; }
        .animate-delay-800 { animation-delay: 800ms; }
        
        /* 响应式设计 */
        @media (max-width: 1200px) {
          .page-content {
            max-width: 1100px;
            padding: 130px 1.5rem 5rem;
          }
          
          .capabilities-content {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }
        
        @media (max-width: 992px) {
          .page-title {
            font-size: 3.5rem;
            letter-spacing: 2px;
          }
          
          .businesses-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .ecosystem-features {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .capabilities-stats {
            gap: 2rem;
          }
        }
        
        @media (max-width: 768px) {
          .page-content {
            padding: 120px 1rem 4rem;
          }
          
          .page-title {
            font-size: 2.8rem;
            letter-spacing: 1px;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .hero-section {
            margin-bottom: 5rem;
          }
          
          .cta-section {
            padding: 2.5rem 1.5rem;
          }
          
          .cta-title {
            font-size: 2rem;
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .cta-button {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }
          
          .capabilities-stats {
            flex-direction: column;
            gap: 1.5rem;
          }
        }
        
        @media (max-width: 480px) {
          .page-title {
            font-size: 2.2rem;
          }
          
          .page-subtitle {
            font-size: 1.1rem;
          }
          
          .cta-title {
            font-size: 1.6rem;
          }
        }
      `}</style>
    </Layout>
  );
};

export default BusinessesPage; 