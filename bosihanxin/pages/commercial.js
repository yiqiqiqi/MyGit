import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import { COMMERCIAL_PROJECTS, BUSINESS_PARTNERS } from '../constants/appConstants';

/**
 * 动态统计数据组件
 */
const AnimatedStatCard = ({ number, label, suffix = "", icon, index }) => {
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
    <div className={`animated-stat-card animate-fadeIn animate-delay-${index * 100}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-number">
        {count}{suffix}
      </div>
      <div className="stat-label">{label}</div>
      
      <style jsx>{`
        .animated-stat-card {
          text-align: center;
          padding: 2.5rem 2rem;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.05) 0%, 
            rgba(255, 255, 255, 0.1) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        
        .animated-stat-card::before {
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
        
        .animated-stat-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.3);
        }
        
        .animated-stat-card:hover::before {
          transform: scaleX(1);
        }
        
        .stat-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.3));
        }
        
        .stat-number {
          font-size: 3.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.8rem;
          text-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
        }
        
        .stat-label {
          font-size: 1.1rem;
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
 * 成就里程碑组件
 */
const MilestoneCard = ({ year, title, description, icon, index }) => {
  return (
    <div className={`milestone-card animate-fadeIn animate-delay-${index * 150}`}>
      <div className="milestone-year">{year}</div>
      <div className="milestone-content">
        <div className="milestone-icon">{icon}</div>
        <h3 className="milestone-title">{title}</h3>
        <p className="milestone-desc">{description}</p>
      </div>
      
      <style jsx>{`
        .milestone-card {
          position: relative;
          padding: 2rem;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.05) 0%, 
            rgba(255, 255, 255, 0.05) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        
        .milestone-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(59, 130, 246, 0.15);
          border-color: rgba(59, 130, 246, 0.2);
        }
        
        .milestone-year {
          position: absolute;
          top: -15px;
          left: 2rem;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          color: #000;
          padding: 0.5rem 1.5rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.5px;
        }
        
        .milestone-content {
          margin-top: 1rem;
        }
        
        .milestone-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.3));
        }
        
        .milestone-title {
          font-size: 1.4rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 0.8rem;
        }
        
        .milestone-desc {
          font-size: 1rem;
          line-height: 1.6;
          color: #94a3b8;
        }
      `}</style>
    </div>
  );
};

/**
 * 区域项目卡片组件 - 增强版
 */
const RegionProjectCard = ({ city, projects, index, cityIcon, stats }) => {
  return (
    <div className={`region-card animate-fadeIn animate-delay-${index * 100}`}>
      <div className="region-header">
        <div className="city-info">
          <div className="city-icon">{cityIcon}</div>
          <div className="city-details">
            <h3 className="region-name">{city}</h3>
            <div className="project-count">{projects.length} 个落地项目</div>
          </div>
        </div>
        <div className="city-badge">核心城市</div>
      </div>
      
      {stats && (
        <div className="city-stats">
          <div className="stat-item">
            <span className="stat-value">{stats.revenue}</span>
            <span className="stat-label">营收贡献</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats.partners}</span>
            <span className="stat-label">合作伙伴</span>
          </div>
        </div>
      )}
      
      <ul className="project-list">
        {projects.map((project, idx) => (
          <li key={idx} className="project-item">
            <div className="project-header">
              <div className="project-title">{project.name}</div>
              <div className="project-status">{project.status || '运营中'}</div>
            </div>
            <div className="project-desc">{project.description}</div>
            {project.tech && (
              <div className="project-tech">
                {project.tech.map((tech, techIdx) => (
                  <span key={techIdx} className="tech-tag">{tech}</span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
      
      <style jsx>{`
        .region-card {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.05) 0%, 
            rgba(255, 255, 255, 0.08) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2.5rem;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
          height: 100%;
          backdrop-filter: blur(10px);
        }
        
        .region-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 0;
          background: linear-gradient(180deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          transition: height 0.4s ease;
        }
        
        .region-card:hover {
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.08) 0%, 
            rgba(255, 255, 255, 0.12) 100%);
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.3);
        }
        
        .region-card:hover::before {
          height: 100%;
        }
        
        .region-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
        }
        
        .city-info {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        
        .city-icon {
          font-size: 3rem;
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.2) 0%, 
            rgba(147, 197, 253, 0.2) 100%);
          border-radius: 50%;
          border: 2px solid rgba(59, 130, 246, 0.3);
          filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.3));
        }
        
        .city-details h3 {
          margin: 0;
        }
        
        .region-name {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          letter-spacing: 1px;
          background: linear-gradient(135deg, #fff 0%, rgba(59, 130, 246, 0.8) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .project-count {
          font-size: 1rem;
          color: #94a3b8;
          font-weight: 500;
          letter-spacing: 0.5px;
        }
        
        .city-badge {
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.8) 0%, 
            rgba(147, 197, 253, 0.8) 100%);
          color: #000;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .city-stats {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
          padding: 1.5rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
        .stat-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: rgba(59, 130, 246, 1);
          margin-bottom: 0.3rem;
        }
        
        .stat-label {
          font-size: 0.9rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .project-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .project-item {
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        
        .project-item:last-child {
          margin-bottom: 0;
        }
        
        .project-item:hover {
          background: rgba(59, 130, 246, 0.05);
          border-color: rgba(59, 130, 246, 0.2);
          transform: translateY(-2px);
        }
        
        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.8rem;
        }
        
        .project-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #fff;
          flex: 1;
          margin-right: 1rem;
        }
        
        .project-status {
          background: rgba(34, 197, 94, 0.2);
          color: rgb(34, 197, 94);
          padding: 0.3rem 0.8rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
          border: 1px solid rgba(34, 197, 94, 0.3);
        }
        
        .project-desc {
          font-size: 1rem;
          line-height: 1.6;
          color: #cbd5e1;
          margin-bottom: 1rem;
        }
        
        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .tech-tag {
          background: rgba(59, 130, 246, 0.1);
          color: rgba(59, 130, 246, 0.9);
          padding: 0.3rem 0.8rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }
      `}</style>
    </div>
  );
};

/**
 * 业务数据统计组件 - 增强版
 */
const BusinessMetrics = () => {
  const metrics = [
    { number: "4", label: "核心城市", suffix: "", icon: "🏙️" },
    { number: "2", label: "合作年限", suffix: "+年", icon: "🤝" },
    { number: "12", label: "研发订单", suffix: "+项", icon: "🔬" },
    { number: "8", label: "批量产品", suffix: "+款", icon: "📦" }
  ];

  return (
    <div className="business-metrics animate-fadeIn animate-delay-200">
      <div className="metrics-header">
        <h2 className="metrics-title">商业化成果</h2>
        <p className="metrics-subtitle">
          两年来，我们在多个核心城市实现商业落地，与行业领先企业建立深度合作关系
        </p>
      </div>
      
      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <AnimatedStatCard 
            key={index}
            number={metric.number}
            label={metric.label}
            suffix={metric.suffix}
            icon={metric.icon}
            index={index}
          />
        ))}
      </div>
      
      <style jsx>{`
        .business-metrics {
          margin: 6rem 0;
          padding: 4rem 0;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.03) 0%, 
            rgba(255, 255, 255, 0.03) 50%,
            rgba(59, 130, 246, 0.03) 100%);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }
        
        .business-metrics::before {
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
        
        .metrics-header {
          text-align: center;
          margin-bottom: 4rem;
          position: relative;
          z-index: 1;
        }
        
        .metrics-title {
          font-size: 2.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #fff 0%, rgba(59, 130, 246, 0.8) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .metrics-subtitle {
          font-size: 1.2rem;
          color: #94a3b8;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }
        
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          position: relative;
          z-index: 1;
        }
        
        @media (max-width: 992px) {
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 576px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

/**
 * 增强版产品卡片组件
 */
const ProductCard = ({ product, index }) => {
  return (
    <div className={`product-card animate-fadeIn animate-delay-${index * 100}`}>
      <div className="product-image">
        <div className="product-icon">{product.icon}</div>
        <div className="image-glow"></div>
      </div>
      <div className="product-content">
        <div className="product-header">
          <h3 className="product-name">{product.name}</h3>
          <div className="product-badge">{product.category}</div>
        </div>
        <p className="product-desc">{product.description}</p>
        <div className="product-features">
          {product.features.map((feature, idx) => (
            <span key={idx} className="feature-tag">{feature}</span>
          ))}
        </div>
        <div className="product-stats">
          <div className="stat">
            <span className="stat-value">{product.sales}</span>
            <span className="stat-label">销量</span>
          </div>
          <div className="stat">
            <span className="stat-value">{product.satisfaction}</span>
            <span className="stat-label">满意度</span>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .product-card {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.05) 0%, 
            rgba(255, 255, 255, 0.08) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          backdrop-filter: blur(10px);
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.3);
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.08) 0%, 
            rgba(255, 255, 255, 0.12) 100%);
        }
        
        .product-image {
          height: 200px;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.1) 0%, 
            rgba(147, 197, 253, 0.1) 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        
        .product-icon {
          font-size: 4rem;
          z-index: 2;
          position: relative;
          filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.5));
        }
        
        .image-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, 
            rgba(59, 130, 246, 0.3) 0%, 
            transparent 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: pulse 3s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
        }
        
        .product-content {
          padding: 2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .product-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }
        
        .product-name {
          font-size: 1.3rem;
          font-weight: 600;
          color: #fff;
          margin: 0;
          flex: 1;
          margin-right: 1rem;
        }
        
        .product-badge {
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.8) 0%, 
            rgba(147, 197, 253, 0.8) 100%);
          color: #000;
          padding: 0.3rem 0.8rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
          white-space: nowrap;
        }
        
        .product-desc {
          font-size: 1rem;
          line-height: 1.6;
          color: #cbd5e1;
          margin-bottom: 1.5rem;
          flex: 1;
        }
        
        .product-features {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        
        .feature-tag {
          background: rgba(59, 130, 246, 0.1);
          color: rgba(59, 130, 246, 0.9);
          padding: 0.3rem 0.8rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }
        
        .product-stats {
          display: flex;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .stat {
          text-align: center;
        }
        
        .stat-value {
          display: block;
          font-size: 1.2rem;
          font-weight: 700;
          color: rgba(59, 130, 246, 1);
          margin-bottom: 0.2rem;
        }
        
        .stat-label {
          font-size: 0.8rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      `}</style>
    </div>
  );
};

/**
 * 核心产品展示组件 - 增强版
 */
const CoreProducts = () => {
  const products = [
    {
      name: "光纤传感器系列",
      icon: "🔬",
      category: "核心产品",
      description: "应用于高压、强电磁干扰环境的光纤传感器，可用于电力、能源领域的温度、压力、电流等参数监测。",
      features: ["高精度", "抗干扰", "长寿命"],
      sales: "500+",
      satisfaction: "98%"
    },
    {
      name: "物联网网关设备",
      icon: "🌐",
      category: "物联网",
      description: "支持多种通信协议的工业物联网网关，实现设备互联互通和数据采集分析。",
      features: ["多协议", "云接入", "边缘计算"],
      sales: "300+",
      satisfaction: "96%"
    },
    {
      name: "卫星通信终端",
      icon: "📡",
      category: "通信设备", 
      description: "适用于偏远地区的卫星通信终端，提供稳定可靠的数据传输和通信服务。",
      features: ["全覆盖", "低延迟", "高稳定"],
      sales: "200+",
      satisfaction: "97%"
    },
    {
      name: "智能检测仪器",
      icon: "🤖",
      category: "AI设备",
      description: "结合AI技术的自动化检测仪器，用于工业产线的质量控制和异常检测。",
      features: ["AI算法", "自动化", "实时监控"],
      sales: "800+",
      satisfaction: "99%"
    }
  ];
  
  return (
    <div className="core-products animate-fadeIn animate-delay-300">
      <div className="products-header">
        <h2 className="section-title">核心产品矩阵</h2>
        <p className="section-subtitle">
          经过两年商业化运营，我们的核心产品在市场上获得了广泛认可，累计服务客户超过1000家
        </p>
      </div>
      
      <div className="products-grid">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} index={index} />
        ))}
      </div>
      
      <style jsx>{`
        .core-products {
          margin: 6rem 0;
        }
        
        .products-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        
        .section-title {
          font-size: 2.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          background: linear-gradient(135deg, #fff 0%, rgba(59, 130, 246, 0.8) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
          display: inline-block;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
        }
        
        .section-subtitle {
          font-size: 1.2rem;
          color: #94a3b8;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }
        
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2.5rem;
        }
        
        @media (max-width: 768px) {
          .products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

/**
 * 合作伙伴卡片组件
 */
const PartnerCard = ({ category, icon, count, description, partners, index }) => {
  return (
    <div className={`partner-card animate-fadeIn animate-delay-${index * 100}`}>
      <div className="partner-icon">{icon}</div>
      <div className="partner-content">
        <h3 className="category-name">{category}</h3>
        <p className="category-desc">{description}</p>
        <div className="partners-count">
          <span className="count-number">{count}</span>
          <span className="count-label">家合作伙伴</span>
        </div>
        <div className="partner-examples">
          {partners.map((partner, idx) => (
            <span key={idx} className="partner-tag">{partner}</span>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .partner-card {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.05) 0%, 
            rgba(255, 255, 255, 0.08) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2.5rem;
          text-align: center;
          transition: all 0.4s ease;
          backdrop-filter: blur(10px);
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .partner-card:hover {
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.08) 0%, 
            rgba(255, 255, 255, 0.12) 100%);
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.3);
        }
        
        .partner-icon {
          font-size: 3.5rem;
          margin-bottom: 1.5rem;
          filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.3));
        }
        
        .partner-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .category-name {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #fff;
        }
        
        .category-desc {
          font-size: 1rem;
          line-height: 1.6;
          color: #94a3b8;
          margin-bottom: 1.5rem;
          flex: 1;
        }
        
        .partners-count {
          margin-bottom: 1.5rem;
        }
        
        .count-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: rgba(59, 130, 246, 1);
          display: block;
          margin-bottom: 0.3rem;
        }
        
        .count-label {
          font-size: 0.9rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .partner-examples {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
        }
        
        .partner-tag {
          background: rgba(59, 130, 246, 0.1);
          color: rgba(59, 130, 246, 0.9);
          padding: 0.3rem 0.8rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }
      `}</style>
    </div>
  );
};

/**
 * 合作伙伴展示组件 - 增强版
 */
const BusinessPartners = () => {
  const partnerCategories = [
    {
      category: "工业物联网",
      icon: "🏭",
      count: "15",
      description: "与领先制造企业合作，提供智能化工厂解决方案",
      partners: ["富士康", "海尔", "美的"]
    },
    {
      category: "卫星互联网",
      icon: "🛰️",
      count: "8",
      description: "参与卫星通信网络建设，提供地面终端设备",
      partners: ["航天科技", "中星通信", "银河航天"]
    },
    {
      category: "智能制造",
      icon: "⚙️",
      count: "12",
      description: "为制造业提供精密测量和质量检测设备",
      partners: ["三一重工", "徐工集团", "中联重科"]
    },
    {
      category: "能源电力",
      icon: "⚡",
      count: "20",
      description: "为电力系统提供光纤传感监测解决方案",
      partners: ["国家电网", "南方电网", "华能集团"]
    },
    {
      category: "通信技术",
      icon: "📱",
      description: "与通信运营商合作部署物联网基础设施",
      count: "10",
      partners: ["中国移动", "中国联通", "中国电信"]
    }
  ];

  return (
    <div className="business-partners animate-fadeIn animate-delay-400">
      <div className="partners-header">
        <h2 className="section-title">战略合作伙伴</h2>
        <div className="partners-desc">
          <p>
            我们与行业领先的企业建立了长期稳定的合作关系，共同推动技术创新和产业发展。
            通过整合各方优势资源，我们能够为客户提供更加全面和完善的解决方案。
          </p>
        </div>
      </div>
      
      <div className="partners-stats">
        <div className="stat-item">
          <span className="stat-number">65+</span>
          <span className="stat-label">合作伙伴</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">5</span>
          <span className="stat-label">行业领域</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">24</span>
          <span className="stat-label">合作月数</span>
        </div>
      </div>
      
      <div className="partners-grid">
        {partnerCategories.map((partner, index) => (
          <PartnerCard 
            key={index}
            category={partner.category}
            icon={partner.icon}
            count={partner.count}
            description={partner.description}
            partners={partner.partners}
            index={index}
          />
        ))}
      </div>
      
      <style jsx>{`
        .business-partners {
          margin: 6rem 0;
        }
        
        .partners-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        
        .section-title {
          font-size: 2.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          background: linear-gradient(135deg, #fff 0%, rgba(59, 130, 246, 0.8) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
          display: inline-block;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
        }
        
        .partners-desc {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .partners-desc p {
          font-size: 1.2rem;
          line-height: 1.8;
          color: #94a3b8;
        }
        
        .partners-stats {
          display: flex;
          justify-content: center;
          gap: 4rem;
          margin-bottom: 4rem;
          padding: 2rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .stat-item {
          text-align: center;
        }
        
        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: rgba(59, 130, 246, 1);
          display: block;
          margin-bottom: 0.5rem;
        }
        
        .stat-label {
          font-size: 1rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .partners-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2.5rem;
        }
        
        @media (max-width: 768px) {
          .partners-stats {
            gap: 2rem;
          }
          
          .partners-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

/**
 * 商业落地地图组件 - 增强版
 */
const BusinessMap = () => {
  const cities = [
    { name: "上海", x: "78%", y: "58%", projects: 2, revenue: "35%" },
    { name: "西安", x: "45%", y: "55%", projects: 2, revenue: "25%" },
    { name: "南京", x: "68%", y: "54%", projects: 2, revenue: "25%" },
    { name: "杭州", x: "73%", y: "68%", projects: 2, revenue: "15%" }
  ];

  return (
    <div className="business-map animate-fadeIn animate-delay-200">
      <div className="map-header">
        <h2 className="map-title">商业落地分布</h2>
        <p className="map-subtitle">覆盖四大核心城市，形成完整的商业化网络布局</p>
      </div>
      
      <div className="map-container">
        <div className="china-map">
          {cities.map((city, index) => (
            <div 
              key={index}
              className={`map-city animate-fadeIn animate-delay-${300 + index * 100}`}
              style={{ left: city.x, top: city.y }}
            >
              <div className="city-marker">
                <div className="city-dot">
                  <div className="dot-pulse"></div>
                  <div className="dot-core"></div>
                </div>
                <div className="city-label">{city.name}</div>
              </div>
              
              <div className="city-tooltip">
                <div className="tooltip-content">
                  <div className="tooltip-title">{city.name}</div>
                  <div className="tooltip-stats">
                    <div className="tooltip-stat">
                      <span className="stat-value">{city.projects}</span>
                      <span className="stat-label">个项目</span>
                    </div>
                    <div className="tooltip-stat">
                      <span className="stat-value">{city.revenue}</span>
                      <span className="stat-label">营收占比</span>
                    </div>
                  </div>
                </div>
                <div className="tooltip-arrow"></div>
              </div>
            </div>
          ))}
          
          {/* 连接线动画 */}
          <svg className="connection-lines" width="100%" height="100%">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
                <stop offset="50%" stopColor="rgba(147, 197, 253, 1)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.8)" />
              </linearGradient>
            </defs>
                         <path d="M 45% 55% Q 60% 45% 78% 58%" stroke="url(#lineGradient)" strokeWidth="2" fill="none" strokeDasharray="5,5">
               <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" />
             </path>
             <path d="M 68% 54% Q 70% 61% 73% 68%" stroke="url(#lineGradient)" strokeWidth="2" fill="none" strokeDasharray="5,5">
               <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" />
             </path>
             <path d="M 68% 54% Q 73% 56% 78% 58%" stroke="url(#lineGradient)" strokeWidth="1.5" fill="none" strokeDasharray="3,3">
               <animate attributeName="stroke-dashoffset" values="0;6" dur="1.5s" repeatCount="indefinite" />
             </path>
          </svg>
        </div>
        
        <div className="map-overlay"></div>
      </div>
      
      <div className="map-legend">
        <div className="legend-item">
          <div className="legend-dot active"></div>
          <span>已落地城市</span>
        </div>
        <div className="legend-item">
          <div className="legend-line"></div>
          <span>合作网络</span>
        </div>
      </div>
      
      <style jsx>{`
        .business-map {
          margin: 6rem 0;
          position: relative;
        }
        
        .map-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .map-title {
          font-size: 2.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #fff 0%, rgba(59, 130, 246, 0.8) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .map-subtitle {
          font-size: 1.2rem;
          color: #94a3b8;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }
        
        .map-container {
          height: 500px;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.03) 0%, 
            rgba(255, 255, 255, 0.05) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }
        
        .china-map {
          width: 100%;
          height: 100%;
          position: relative;
          background-image: 
            radial-gradient(circle at 60% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(147, 197, 253, 0.05) 0%, transparent 50%);
        }
        
        .connection-lines {
          position: absolute;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 1;
        }
        
        .map-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.4) 100%);
          pointer-events: none;
        }
        
        .map-city {
          position: absolute;
          cursor: pointer;
          z-index: 2;
          transform: translate(-50%, -50%);
        }
        
        .city-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: transform 0.3s ease;
        }
        
        .map-city:hover .city-marker {
          transform: scale(1.1);
        }
        
        .city-dot {
          position: relative;
          width: 24px;
          height: 24px;
          margin-bottom: 0.5rem;
        }
        
        .dot-pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 48px;
          height: 48px;
          background: rgba(59, 130, 246, 0.3);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: pulse 2s ease-in-out infinite;
        }
        
        .dot-core {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.8);
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
        }
        
        .city-label {
          background: rgba(0, 0, 0, 0.8);
          color: #fff;
          padding: 0.4rem 0.8rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          white-space: nowrap;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }
        
        .city-tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 15px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          pointer-events: none;
          z-index: 10;
        }
        
        .map-city:hover .city-tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(-10px);
        }
        
        .tooltip-content {
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 12px;
          padding: 1rem 1.2rem;
          min-width: 140px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        
        .tooltip-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 0.8rem;
          text-align: center;
        }
        
        .tooltip-stats {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
        
        .tooltip-stat {
          text-align: center;
        }
        
        .tooltip-stat .stat-value {
          display: block;
          font-size: 1.2rem;
          font-weight: 700;
          color: rgba(59, 130, 246, 1);
          margin-bottom: 0.2rem;
        }
        
        .tooltip-stat .stat-label {
          font-size: 0.8rem;
          color: #94a3b8;
        }
        
        .tooltip-arrow {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid rgba(0, 0, 0, 0.9);
        }
        
        .map-legend {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-top: 2rem;
        }
        
        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 1rem;
          color: #94a3b8;
        }
        
        .legend-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          box-shadow: 0 0 8px rgba(59, 130, 246, 0.6);
        }
        
                 .legend-line {
           width: 30px;
           height: 2px;
           background: linear-gradient(90deg, 
             rgba(59, 130, 246, 0.8) 0%, 
             rgba(147, 197, 253, 1) 50%, 
             rgba(59, 130, 246, 0.8) 100%);
         }
        
        .city-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #fff;
          position: relative;
        }
        
        .city-dot::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.3);
          animation: pulse 2s infinite;
        }
        
        .city-name {
          margin-top: 0.5rem;
          font-size: 0.9rem;
          font-weight: 500;
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
        }
        
        .map-shanghai {
          top: 46%;
          right: 28%;
        }
        
        .map-xian {
          top: 40%;
          left: 40%;
        }
        
        .map-nanjing {
          top: 44%;
          right: 33%;
        }
        
        .map-hangzhou {
          top: 48%;
          right: 30%;
        }
        
        @keyframes pulse {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        
        @media (max-width: 768px) {
          .map-container {
            height: 300px;
          }
        }
      `}</style>
    </div>
  );
};

/**
 * 商业落地页面
 */
const CommercialPage = () => {
  // 示例项目数据 - 增强版
  const regionProjects = [
    {
      city: "上海",
      cityIcon: "🏙️", 
      stats: { revenue: "35%", partners: "8家" },
      projects: [
        { 
          name: "智能电网监控系统", 
          description: "为电力企业提供基于光纤传感技术的智能电网监控系统，实现电力设备的实时监控和预警。",
          status: "运营中",
          tech: ["光纤传感", "实时监控", "预警系统"]
        },
        { 
          name: "工业数据采集平台", 
          description: "为制造企业开发工业数据采集和分析平台，提高生产效率和质量管理水平。",
          status: "已交付",
          tech: ["数据采集", "智能分析", "效率优化"]
        }
      ]
    },
    {
      city: "西安",
      cityIcon: "🏛️",
      stats: { revenue: "25%", partners: "6家" },
      projects: [
        { 
          name: "航天器测试设备", 
          description: "为航天领域提供高精度测试仪器，用于航天器组件的性能验证和质量控制。",
          status: "研发中",
          tech: ["高精度测试", "航天级", "质量控制"]
        },
        { 
          name: "军工通信系统", 
          description: "为军工企业开发安全可靠的通信系统，满足特殊环境下的通信需求。",
          status: "运营中",
          tech: ["军工级", "安全通信", "抗干扰"]
        }
      ]
    },
    {
      city: "南京",
      cityIcon: "🌸",
      stats: { revenue: "25%", partners: "7家" },
      projects: [
        { 
          name: "智慧园区系统", 
          description: "为科技园区提供一体化的物联网解决方案，实现园区的智能化管理和运营。",
          status: "运营中",
          tech: ["物联网", "智慧管理", "一体化"]
        },
        { 
          name: "新能源监测系统", 
          description: "为新能源企业开发分布式能源监测系统，提高能源利用效率和管理水平。",
          status: "已交付",
          tech: ["新能源", "分布式", "效率监测"]
        }
      ]
    },
    {
      city: "杭州",
      cityIcon: "🌊",
      stats: { revenue: "15%", partners: "5家" },
      projects: [
        { 
          name: "智能交通系统", 
          description: "为城市交通管理部门提供基于物联网的智能交通监控和管理系统。",
          status: "运营中",
          tech: ["智能交通", "物联网", "城市管理"]
        },
        { 
          name: "环境监测网络", 
          description: "为环保部门开发环境参数监测网络，实现空气质量、水质等环境数据的实时监测和分析。",
          status: "已交付",
          tech: ["环境监测", "实时分析", "数据网络"]
        }
      ]
    }
  ];

  // 成就里程碑数据
  const milestones = [
    {
      year: "2022",
      title: "商业化启动",
      description: "开始在上海、西安等城市进行产品商业化落地，建立初步的市场渠道",
      icon: "🚀"
    },
    {
      year: "2023",
      title: "规模扩展", 
      description: "业务扩展至南京、杭州，合作伙伴网络覆盖5大行业领域",
      icon: "📈"
    },
    {
      year: "2024",
      title: "技术突破",
      description: "核心产品技术迭代升级，客户满意度达到98%以上",
      icon: "⚡"
    }
  ];
  
  return (
    <Layout title="EEnous - 商业落地情况">
      <div className="commercial-page">
        <div className="page-bg">
          <video autoPlay muted loop className="bg-video">
            <source src="/videos/business-bg.mp4" type="video/mp4" />
          </video>
          <div className="bg-overlay"></div>
        </div>
        
        <div className="page-content">
          <div className="hero-section">
            <div className="hero-badge animate-fadeIn">🎯 商业化成果展示</div>
            <h1 className="page-title animate-fadeIn animate-delay-100">商业落地情况</h1>
            <div className="title-divider animate-fadeIn animate-delay-200"></div>
            <p className="page-subtitle animate-fadeIn animate-delay-300">
              在商业方面，公司与工业物联网、卫星互联网等领域的多家企业进行密切合作，
              在上海、西安、南京、杭州等多地实现产品的商业化落地，并在两年的时间里，
              共同合作完成了多项研发订单，同时实现了核心产品的批量生产。
            </p>
          </div>
          
          <BusinessMetrics />
          
          <BusinessMap />
          
          <div className="regions-section">
            <div className="section-header">
              <h2 className="section-title">区域项目布局</h2>
              <p className="section-subtitle">深耕四大核心城市，构建全方位商业化网络</p>
            </div>
            <div className="regions-grid">
              {regionProjects.map((region, index) => (
                <RegionProjectCard 
                  key={index}
                  city={region.city}
                  cityIcon={region.cityIcon}
                  stats={region.stats}
                  projects={region.projects}
                  index={index}
                />
              ))}
            </div>
          </div>
          
          <CoreProducts />
          
          <div className="milestones-section">
            <div className="section-header">
              <h2 className="section-title">发展里程碑</h2>
              <p className="section-subtitle">见证我们从启动到腾飞的每一个重要时刻</p>
            </div>
            <div className="milestones-grid">
              {milestones.map((milestone, index) => (
                <MilestoneCard 
                  key={index}
                  year={milestone.year}
                  title={milestone.title}
                  description={milestone.description}
                  icon={milestone.icon}
                  index={index}
                />
              ))}
            </div>
          </div>
          
          <BusinessPartners />
          
          <div className="cta-section animate-fadeIn animate-delay-400">
            <div className="cta-content">
              <h2 className="cta-title">开启合作新篇章</h2>
              <p className="cta-subtitle">
                加入我们的合作伙伴网络，共同推动技术创新与商业发展
              </p>
              <div className="cta-buttons">
                <Link href="/contact" className="cta-primary">
                  立即合作
                </Link>
                <Link href="/businesses" className="cta-secondary">
                  了解更多
                </Link>
              </div>
            </div>
            <div className="cta-stats">
              <div className="stat-item">
                <span className="stat-number">1000+</span>
                <span className="stat-text">服务客户</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24</span>
                <span className="stat-text">个月合作</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">99%</span>
                <span className="stat-text">客户满意度</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .commercial-page {
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
        
        .hero-section {
          text-align: center;
          margin-bottom: 6rem;
          position: relative;
        }
        
        .hero-badge {
          display: inline-block;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.2) 0%, 
            rgba(147, 197, 253, 0.2) 100%);
          border: 1px solid rgba(59, 130, 246, 0.3);
          color: rgba(59, 130, 246, 1);
          padding: 0.8rem 2rem;
          border-radius: 25px;
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
        }
        
        .page-title {
          font-size: 4rem;
          text-transform: uppercase;
          letter-spacing: 4px;
          margin-bottom: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #fff 0%, rgba(59, 130, 246, 0.8) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 40px rgba(59, 130, 246, 0.3);
        }
        
        .title-divider {
          width: 100px;
          height: 3px;
          background: linear-gradient(90deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          margin: 0 auto 2rem;
          border-radius: 2px;
        }
        
        .page-subtitle {
          font-size: 1.3rem;
          line-height: 1.8;
          color: #94a3b8;
          max-width: 900px;
          margin: 0 auto;
          font-weight: 300;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        
        .section-title {
          font-size: 2.8rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 1.5rem;
          font-weight: 600;
          background: linear-gradient(135deg, #fff 0%, rgba(59, 130, 246, 0.8) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
          display: inline-block;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          border-radius: 2px;
        }
        
        .section-subtitle {
          font-size: 1.2rem;
          color: #94a3b8;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }
        
        .regions-section {
          margin: 6rem 0;
        }
        
        .milestones-section {
          margin: 6rem 0;
        }
        
        .milestones-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2.5rem;
        }
        
        .regions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        
        @media (max-width: 992px) {
          .regions-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .cta-section {
          margin: 8rem 0 6rem;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.1) 0%, 
            rgba(255, 255, 255, 0.05) 50%,
            rgba(59, 130, 246, 0.1) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 4rem 3rem;
          text-align: center;
          backdrop-filter: blur(10px);
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
            rgba(59, 130, 246, 0.03) 0%, 
            transparent 70%);
          animation: slowRotate 15s linear infinite;
          pointer-events: none;
        }
        
        .cta-content {
          position: relative;
          z-index: 1;
          margin-bottom: 3rem;
        }
        
        .cta-title {
          font-size: 2.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #fff 0%, rgba(59, 130, 246, 0.8) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .cta-subtitle {
          font-size: 1.2rem;
          color: #94a3b8;
          margin-bottom: 2.5rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }
        
        .cta-buttons {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .cta-primary, .cta-secondary {
          padding: 1rem 2.5rem;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .cta-primary {
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          color: #000;
          border: none;
        }
        
        .cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(59, 130, 246, 0.4);
        }
        
        .cta-secondary {
          background: transparent;
          color: #fff;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }
        
        .cta-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-3px);
        }
        
        .cta-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          position: relative;
          z-index: 1;
        }
        
        .cta-stats .stat-item {
          text-align: center;
        }
        
        .cta-stats .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: rgba(59, 130, 246, 1);
          display: block;
          margin-bottom: 0.5rem;
        }
        
        .cta-stats .stat-text {
          font-size: 1rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        @media (max-width: 768px) {
          .page-title {
            font-size: 2.8rem;
          }
          
          .page-subtitle {
            font-size: 1.1rem;
          }
          
          .cta-section {
            padding: 3rem 1.5rem;
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .cta-stats {
            gap: 1.5rem;
            flex-wrap: wrap;
          }
        }
      `}</style>
    </Layout>
  );
};

export default CommercialPage; 