import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

/**
 * 合作方式卡片组件
 */
const CooperationCard = ({ icon, title, description, features, color = "blue" }) => {
  const colors = {
    blue: "rgba(59, 130, 246, 0.1)",
    green: "rgba(34, 197, 94, 0.1)",
    purple: "rgba(168, 85, 247, 0.1)",
    orange: "rgba(249, 115, 22, 0.1)"
  };

  return (
    <div className="cooperation-card">
      <div className="card-header">
        <div className="card-icon">{icon}</div>
        <h3 className="card-title">{title}</h3>
      </div>
      <p className="card-description">{description}</p>
      <ul className="card-features">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      
      <style jsx>{`
        .cooperation-card {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.03) 0%, 
            rgba(255, 255, 255, 0.08) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 2.5rem;
          height: 100%;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }
        
        .cooperation-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, 
            ${colors[color]} 0%, 
            rgba(255, 255, 255, 0.3) 50%, 
            ${colors[color]} 100%);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        
        .cooperation-card:hover::before {
          transform: scaleX(1);
        }
        
        .cooperation-card:hover {
          background: linear-gradient(135deg, 
            ${colors[color]} 0%, 
            rgba(255, 255, 255, 0.1) 100%);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .card-icon {
          font-size: 2.5rem;
          filter: drop-shadow(0 0 10px ${colors[color]});
        }
        
        .card-title {
          font-size: 1.4rem;
          font-weight: 600;
          color: #fff;
          margin: 0;
        }
        
        .card-description {
          color: #cbd5e1;
          line-height: 1.6;
          margin-bottom: 2rem;
          font-size: 1rem;
        }
        
        .card-features {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .card-features li {
          color: #94a3b8;
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 0.8rem;
          padding-left: 1.5rem;
          position: relative;
        }
        
        .card-features li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #10b981;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

/**
 * 技术能力卡片组件
 */
const TechCapabilityCard = ({ title, description, technologies, progress }) => {
  return (
    <div className="tech-card">
      <h3 className="tech-title">{title}</h3>
      <p className="tech-description">{description}</p>
      <div className="tech-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{width: `${progress}%`}}></div>
        </div>
        <span className="progress-text">{progress}%</span>
      </div>
      <div className="tech-list">
        {technologies.map((tech, index) => (
          <span key={index} className="tech-tag">{tech}</span>
        ))}
      </div>
      
      <style jsx>{`
        .tech-card {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.03) 0%, 
            rgba(255, 255, 255, 0.08) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        
        .tech-card:hover {
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.05) 0%, 
            rgba(255, 255, 255, 0.1) 100%);
          border-color: rgba(59, 130, 246, 0.3);
          transform: translateY(-3px);
        }
        
        .tech-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 1rem;
        }
        
        .tech-description {
          color: #cbd5e1;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }
        
        .tech-progress {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .progress-bar {
          flex: 1;
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          border-radius: 4px;
          transition: width 0.8s ease;
        }
        
        .progress-text {
          font-size: 0.9rem;
          color: #10b981;
          font-weight: 600;
          min-width: 40px;
        }
        
        .tech-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .tech-tag {
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3);
          color: rgba(59, 130, 246, 0.9);
          padding: 0.3rem 0.8rem;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

/**
 * 技术合作站页面
 */
const TechCooperationPage = () => {
  const cooperationTypes = [
    {
      icon: "🔬",
      title: "联合研发",
      description: "与高校、科研院所共同开展前沿技术研究，推动行业技术创新",
      color: "blue",
      features: [
        "光纤传感技术研究",
        "工业物联网应用开发",
        "AI算法优化合作",
        "专利共享机制",
        "人才交流培养"
      ]
    },
    {
      icon: "🏭",
      title: "产业合作",
      description: "与产业链上下游企业建立战略合作，实现优势互补",
      color: "green",
      features: [
        "供应链深度合作",
        "产品技术互补",
        "市场渠道共享",
        "标准制定参与",
        "生态体系建设"
      ]
    },
    {
      icon: "💡",
      title: "技术转移",
      description: "提供技术授权、技术咨询等服务，加速技术产业化",
      color: "purple",
      features: [
        "核心技术授权",
        "定制化解决方案",
        "技术培训服务",
        "工程化支持",
        "持续技术升级"
      ]
    },
    {
      icon: "🌐",
      title: "国际合作",
      description: "与国际先进企业开展技术交流，引进先进技术和管理经验",
      color: "orange",
      features: [
        "国际技术引进",
        "海外市场拓展",
        "标准对接合作",
        "人才国际化",
        "品牌全球化"
      ]
    }
  ];

  const techCapabilities = [
    {
      title: "光纤熔接技术",
      description: "掌握保偏光纤、大芯径光纤等特种光纤的高精度熔接技术",
      progress: 95,
      technologies: ["保偏光纤", "大芯径光纤", "熔接算法", "三相放电"]
    },
    {
      title: "精密光学设计",
      description: "具备光学系统设计、仿真优化和工程实现的完整能力",
      progress: 90,
      technologies: ["光路设计", "Zemax仿真", "光学器件", "系统集成"]
    },
    {
      title: "工业物联网",
      description: "提供从传感器到云平台的完整物联网解决方案",
      progress: 88,
      technologies: ["LoRa通信", "边缘计算", "云平台", "数据分析"]
    },
    {
      title: "AI智能算法",
      description: "开发基于深度学习的工业设备故障诊断和预测算法",
      progress: 85,
      technologies: ["深度学习", "信号处理", "故障诊断", "预测维护"]
    }
  ];

  const partners = [
    { name: "东南大学", type: "科研院所", cooperation: "光纤传感技术研究" },
    { name: "中科院光电技术研究所", type: "科研院所", cooperation: "精密光学技术" },
    { name: "华为技术有限公司", type: "产业合作", cooperation: "5G通信设备" },
    { name: "中兴通讯股份有限公司", type: "产业合作", cooperation: "光通信产品" },
    { name: "富士康科技集团", type: "产业合作", cooperation: "智能制造" },
    { name: "德国莱茵TÜV", type: "国际合作", cooperation: "产品认证服务" }
  ];

  return (
    <Layout title="EEnous - 技术合作站 | 共创未来">
      <div className="tech-cooperation-page">
        <div className="page-bg">
          <video autoPlay muted loop className="bg-video">
            <source src="/videos/tech-cooperation-bg.mp4" type="video/mp4" />
          </video>
          <div className="bg-overlay"></div>
          <div className="bg-particles"></div>
        </div>
        
        <div className="page-content">
          {/* 英雄区域 */}
          <div className="hero-section">
            <div className="hero-badge animate-fadeIn">
              <span className="badge-icon">🤝</span>
              <span>TECH COOPERATION</span>
            </div>
            <h1 className="page-title animate-fadeIn animate-delay-100">
              技术<span className="title-highlight">合作站</span>
            </h1>
            <div className="title-separator animate-scaleX animate-delay-200"></div>
            <p className="page-subtitle animate-fadeIn animate-delay-300">
              携手共创技术创新生态，推动光纤通信与工业物联网技术发展
            </p>
          </div>
          
          {/* 合作方式区域 */}
          <div className="cooperation-section animate-fadeIn animate-delay-400">
            <h2 className="section-title">
              <span className="title-icon">🚀</span>
              合作方式
            </h2>
            <div className="cooperation-grid">
              {cooperationTypes.map((type, index) => (
                <CooperationCard key={index} {...type} />
              ))}
            </div>
          </div>
          
          {/* 技术能力区域 */}
          <div className="capabilities-section animate-fadeIn animate-delay-500">
            <h2 className="section-title">
              <span className="title-icon">⚡</span>
              核心技术能力
            </h2>
            <div className="capabilities-content">
              <div className="capabilities-text">
                <p>
                  南京玻丝焊芯科技有限公司在光纤通信与工业物联网领域积累了深厚的技术实力，
                  我们愿意与合作伙伴分享技术成果，共同推动行业发展。
                </p>
              </div>
              <div className="capabilities-list">
                {techCapabilities.map((capability, index) => (
                  <TechCapabilityCard key={index} {...capability} />
                ))}
              </div>
            </div>
          </div>
          
          {/* 合作伙伴区域 */}
          <div className="partners-section animate-fadeIn animate-delay-600">
            <h2 className="section-title">
              <span className="title-icon">🏢</span>
              合作伙伴
            </h2>
            <div className="partners-grid">
              {partners.map((partner, index) => (
                <div key={index} className="partner-card">
                  <h3 className="partner-name">{partner.name}</h3>
                  <div className="partner-type">{partner.type}</div>
                  <div className="partner-cooperation">{partner.cooperation}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 联系合作区域 */}
          <div className="contact-cooperation-section animate-fadeIn animate-delay-700">
            <div className="contact-content">
              <h2 className="section-title">
                <span className="title-icon">📞</span>
                开启合作
              </h2>
              <p className="contact-description">
                如果您有技术合作意向，欢迎与我们联系，共同探讨合作可能性
              </p>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-label">合作邮箱:</span>
                  <a href="mailto:cooperation@eenous.com" className="contact-link">cooperation@eenous.com</a>
                </div>
                <div className="contact-item">
                  <span className="contact-label">联系电话:</span>
                  <a href="tel:13951791713" className="contact-link">13951791713</a>
                </div>
              </div>
              <Link href="/contact">
                <div className="back-to-contact">
                  <span>返回联系页面</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        /* 页面基础样式 */
        .tech-cooperation-page {
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }
        
        /* 背景样式 */
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
          filter: blur(1px);
        }
        
        .bg-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.9) 0%,
            rgba(15, 23, 42, 0.9) 50%,
            rgba(0, 0, 0, 0.9) 100%
          );
        }
        
        .bg-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(2px 2px at 20% 30%, rgba(168, 85, 247, 0.3), transparent),
            radial-gradient(2px 2px at 40% 70%, rgba(196, 181, 253, 0.2), transparent),
            radial-gradient(1px 1px at 90% 40%, rgba(168, 85, 247, 0.4), transparent);
          background-repeat: repeat;
          background-size: 100px 100px, 150px 150px, 200px 200px;
          animation: particlesFloat 30s linear infinite;
          opacity: 0.6;
        }
        
        @keyframes particlesFloat {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-100px); }
        }
        
        /* 页面内容样式 */
        .page-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 140px 2rem 5rem;
          position: relative;
          z-index: 1;
        }
        
        /* 英雄区域样式 */
        .hero-section {
          text-align: center;
          margin-bottom: 6rem;
          padding: 3rem 0;
        }
        
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem 1.5rem;
          background: linear-gradient(135deg, 
            rgba(168, 85, 247, 0.1) 0%, 
            rgba(196, 181, 253, 0.1) 100%);
          border: 1px solid rgba(168, 85, 247, 0.3);
          border-radius: 50px;
          color: rgba(168, 85, 247, 0.9);
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(168, 85, 247, 0.1);
        }
        
        .badge-icon {
          font-size: 1rem;
        }
        
        .page-title {
          font-size: 4rem;
          font-weight: 300;
          text-transform: uppercase;
          letter-spacing: 4px;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, 
            #ffffff 0%, 
            rgba(168, 85, 247, 0.8) 50%,
            #ffffff 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 40px rgba(168, 85, 247, 0.3);
        }
        
        .title-highlight {
          background: linear-gradient(135deg, 
            rgba(168, 85, 247, 1) 0%, 
            rgba(196, 181, 253, 1) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
        }
        
        .title-separator {
          width: 120px;
          height: 4px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(168, 85, 247, 0.8) 20%,
            rgba(196, 181, 253, 1) 50%,
            rgba(168, 85, 247, 0.8) 80%,
            transparent 100%);
          margin: 0 auto 2rem;
          border-radius: 2px;
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
        }
        
        .page-subtitle {
          font-size: 1.4rem;
          color: #cbd5e1;
          max-width: 900px;
          margin: 0 auto;
          line-height: 1.8;
          font-weight: 300;
          letter-spacing: 0.5px;
        }
        
        /* 区域标题样式 */
        .section-title {
          font-size: 2.2rem;
          font-weight: 600;
          margin-bottom: 3rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          background: linear-gradient(135deg, #fff 0%, rgba(168, 85, 247, 0.8) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .title-icon {
          font-size: 2rem;
          filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.3));
        }
        
        /* 合作方式区域样式 */
        .cooperation-section {
          margin-bottom: 6rem;
          padding: 3rem 0;
        }
        
        .cooperation-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2.5rem;
          margin-top: 3rem;
        }
        
        /* 技术能力区域样式 */
        .capabilities-section {
          margin-bottom: 6rem;
          padding: 3rem 0;
        }
        
        .capabilities-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
          margin-top: 3rem;
        }
        
        .capabilities-text {
          font-size: 1.1rem;
          color: #cbd5e1;
          line-height: 1.7;
          display: flex;
          align-items: flex-start;
          padding-top: 1rem;
        }
        
        /* 合作伙伴区域样式 */
        .partners-section {
          margin-bottom: 6rem;
          padding: 3rem 0;
        }
        
        .partners-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 3rem;
        }
        
        .partner-card {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.03) 0%, 
            rgba(255, 255, 255, 0.08) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        
        .partner-card:hover {
          background: linear-gradient(135deg, 
            rgba(168, 85, 247, 0.05) 0%, 
            rgba(255, 255, 255, 0.1) 100%);
          border-color: rgba(168, 85, 247, 0.3);
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        }
        
        .partner-name {
          font-size: 1.2rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 1rem;
        }
        
        .partner-type {
          background: rgba(168, 85, 247, 0.1);
          border: 1px solid rgba(168, 85, 247, 0.3);
          color: rgba(168, 85, 247, 0.9);
          padding: 0.3rem 0.8rem;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 500;
          display: inline-block;
          margin-bottom: 1rem;
        }
        
        .partner-cooperation {
          color: #94a3b8;
          font-size: 0.9rem;
          line-height: 1.4;
        }
        
        /* 联系合作区域样式 */
        .contact-cooperation-section {
          margin-bottom: 4rem;
          padding: 3rem 0;
        }
        
        .contact-content {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }
        
        .contact-description {
          font-size: 1.1rem;
          color: #cbd5e1;
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        
        .contact-info {
          margin-bottom: 2rem;
        }
        
        .contact-item {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        
        .contact-label {
          color: #94a3b8;
          font-size: 0.95rem;
        }
        
        .contact-link {
          color: #a855f7;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .contact-link:hover {
          color: #9333ea;
          text-shadow: 0 0 8px rgba(168, 85, 247, 0.3);
        }
        
        .back-to-contact {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 25px;
          color: rgba(59, 130, 246, 0.9);
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .back-to-contact:hover {
          background: rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.5);
          transform: translateY(-2px);
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
        
        /* 响应式设计 */
        @media (max-width: 1200px) {
          .cooperation-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .capabilities-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
        
        @media (max-width: 992px) {
          .page-title {
            font-size: 3rem;
            letter-spacing: 2px;
          }
          
          .partners-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .page-content {
            padding: 120px 1rem 3rem;
          }
          
          .page-title {
            font-size: 2.5rem;
            letter-spacing: 1px;
          }
          
          .section-title {
            font-size: 1.8rem;
          }
          
          .partners-grid {
            grid-template-columns: 1fr;
          }
          
          .hero-section {
            margin-bottom: 4rem;
            padding: 2rem 0;
          }
          
          .cooperation-section,
          .capabilities-section,
          .partners-section,
          .contact-cooperation-section {
            margin-bottom: 4rem;
          }
          
          .contact-item {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
        
        @media (max-width: 480px) {
          .page-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </Layout>
  );
};

export default TechCooperationPage; 