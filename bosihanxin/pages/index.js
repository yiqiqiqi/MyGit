import React, { useEffect, useState, useRef } from 'react';
import Layout from '../components/Layout';

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [clickParticles, setClickParticles] = useState([]);
  const videoRef = useRef(null);

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // 根据滚动位置设置活动区域
      const height = window.innerHeight;
      const section = Math.floor((window.scrollY + height / 2) / height);
      setActiveSection(section);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 处理标题点击粒子爆发
  const handleTitleClick = (e) => {
    const newParticles = [];
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // 生成30个粒子
    for (let i = 0; i < 30; i++) {
      const angle = (i / 30) * Math.PI * 2;
      const velocity = 3 + Math.random() * 4;
      const size = 4 + Math.random() * 8;
      
      newParticles.push({
        id: Date.now() + i,
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size: size,
        life: 1,
        decay: 0.02 + Math.random() * 0.02
      });
    }
    
    setClickParticles(prev => [...prev, ...newParticles]);
    
    // 1.5秒后清理粒子
    setTimeout(() => {
      setClickParticles(prev => prev.filter(p => !newParticles.includes(p)));
    }, 1500);
  };

  // 核心业务数据
  const businesses = [
    { 
      title: "保偏光纤熔接设备", 
      description: "高精度光纤熔接技术与设备", 
      link: "/business/fiber-fusion",
      image: "/images/business-1.jpg"
    },
    { 
      title: "智能物联网运维平台", 
      description: "工业级物联网管理系统", 
      link: "/business/iot-platform",
      image: "/images/business-2.jpg"
    },
    { 
      title: "低功耗广域网解决方案", 
      description: "高效节能的网络连接方案", 
      link: "/business/lpwan-solutions",
      image: "/images/business-3.jpg"
    },
    { 
      title: "高精度多通道传感测量", 
      description: "精密传感器与测量系统", 
      link: "/business/precision-measurement",
      image: "/images/business-4.jpg"
    }
  ];
  
  return (
    <Layout title="EEnous - 首页 | 南京玻丝焊芯科技有限公司">
      <div className="home-page">
        {/* 视频背景区域 */}
        <section className="hero-section">
          <video ref={videoRef} autoPlay muted loop className="bg-video">
            <source src="/videos/first.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>
          <div className="particle-overlay"></div>
          
          <div className="hero-content">
            <div className="hero-badge">EENOUS TECHNOLOGY</div>
            
            {/* 优化后的探索按钮 */}
            <div className="explore-button-container">
              <a href="/explore" className="explore-tech-button" onClick={handleTitleClick}>
                <div className="button-border-glow"></div>
                <div className="button-background"></div>
                <div className="button-content">
                  <div className="button-icon">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                      <path d="M9.5 3A6.5 6.5 0 1 1 3 9.5 6.5 6.5 0 0 1 9.5 3m0-1C4.26 2 0 6.26 0 11.5S4.26 21 9.5 21 19 16.74 19 11.5 14.74 2 9.5 2z"/>
                      <path d="M19.94 20.47l-4.44-4.44 1.06-1.06 4.44 4.44-1.06 1.06z"/>
                      <circle cx="9.5" cy="11.5" r="2.5"/>
                    </svg>
                    <div className="icon-orbit"></div>
                  </div>
                  <div className="button-text">
                    <span className="main-text">探索<span className="highlight-text">未来</span>科技</span>
                    <span className="sub-text">EXPLORE FUTURE TECHNOLOGY</span>
                  </div>
                  <div className="button-arrow">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                    </svg>
                  </div>
                </div>
                <div className="button-particles">
                  <div className="particle"></div>
                  <div className="particle"></div>
                  <div className="particle"></div>
                  <div className="particle"></div>
                </div>
                <div className="button-ripple"></div>
              </a>
            </div>
            
            <p className="hero-subtitle">以创新引领工业物联网和光通信发展</p>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-value">20+</div>
                <div className="stat-label">研发专利</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-value">4+</div>
                <div className="stat-label">核心技术</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-value">10+</div>
                <div className="stat-label">合作伙伴</div>
              </div>
            </div>
          </div>
          
          <div className="scroll-container">
            <div className="scroll-indicator" onClick={() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
              });
            }}>
              <div className="scroll-line"></div>
              <div className="scroll-text">向下探索</div>
              <div className="chevron"></div>
              <div className="chevron"></div>
              <div className="chevron"></div>
            </div>
          </div>
          
          <div className="floating-elements">
            <div className="floating-element" style={{left: '10%', top: '20%'}}></div>
            <div className="floating-element" style={{left: '80%', top: '15%'}}></div>
            <div className="floating-element" style={{left: '25%', top: '75%'}}></div>
            <div className="floating-element" style={{left: '70%', top: '60%'}}></div>
          </div>
          
          {/* 点击粒子特效 */}
          <div className="click-particles-container">
            {clickParticles.map(particle => (
              <div
                key={particle.id}
                className="click-particle"
                style={{
                  left: particle.x,
                  top: particle.y,
                  width: particle.size,
                  height: particle.size,
                  '--vx': particle.vx,
                  '--vy': particle.vy,
                  '--decay': particle.decay
                }}
              />
            ))}
          </div>
        </section>
        
        {/* 关于我们区域 */}
        <section className="about-section">
          <div className="section-bg"></div>
          <div className="about-particles">
            <div className="particle-dot" style={{left: '15%', top: '20%', animationDelay: '0s'}}></div>
            <div className="particle-dot" style={{left: '85%', top: '30%', animationDelay: '2s'}}></div>
            <div className="particle-dot" style={{left: '25%', top: '75%', animationDelay: '4s'}}></div>
            <div className="particle-dot" style={{left: '75%', top: '80%', animationDelay: '6s'}}></div>
          </div>
          <div className="container">
            <div className="section-header">
              <div className="section-line"></div>
              <h2 className="section-title">关于我们</h2>
              <div className="section-line"></div>
            </div>
            <div className="about-content">
              <div className="about-text-container" data-aos="fade-right">
                <div className="company-badge">
                  <span className="badge-icon">⚡</span>
                  <span className="badge-text">Technology Innovation</span>
                </div>
                <h3 className="about-heading">
                  <span className="heading-line">南京玻丝焊芯</span>
                  <span className="heading-highlight">科技有限公司</span>
                </h3>
                <div className="about-divider"></div>
                <p className="about-description">
                  我们专注于<span className="text-highlight">光纤通信</span>与<span className="text-highlight">工业物联网</span>领域的技术创新，致力于为客户提供高品质的国产化解决方案。
                </p>
                <div className="tech-grid">
                  <div className="tech-item">
                    <div className="tech-icon">🔗</div>
                    <span className="tech-name">光纤通信</span>
                  </div>
                  <div className="tech-item">
                    <div className="tech-icon">🌐</div>
                    <span className="tech-name">工业物联网</span>
                  </div>
                  <div className="tech-item">
                    <div className="tech-icon">📡</div>
                    <span className="tech-name">智能传感</span>
                  </div>
                  <div className="tech-item">
                    <div className="tech-icon">📏</div>
                    <span className="tech-name">高精度测量</span>
                  </div>
                </div>
                <div className="action-container">
                  <a href="/about" className="premium-button">
                    <span className="button-text">探索更多</span>
                    <svg className="button-icon" viewBox="0 0 24 24" width="20" height="20">
                      <path fill="currentColor" d="M5,13H16.17L11.29,17.88C10.9,18.27 10.9,18.91 11.29,19.29C11.68,19.68 12.31,19.68 12.7,19.29L19.29,12.7C19.68,12.31 19.68,11.68 19.29,11.29L12.7,4.7C12.31,4.31 11.68,4.31 11.29,4.7C10.9,5.09 10.9,5.72 11.29,6.11L16.17,11H5C4.45,11 4,11.45 4,12C4,12.55 4.45,13 5,13Z"></path>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="about-visual-container" data-aos="fade-left">
                <div className="visual-frame">
                  <div className="frame-decoration top-left"></div>
                  <div className="frame-decoration top-right"></div>
                  <div className="frame-decoration bottom-left"></div>
                  <div className="frame-decoration bottom-right"></div>
                  <div className="image-container">
                    <img src="/images/logo1.png" alt="科技形象" className="main-image" />
                    <div className="image-effects">
                      <div className="scan-line"></div>
                      <div className="data-points">
                        <div className="data-point" style={{top: '20%', left: '15%'}}></div>
                        <div className="data-point" style={{top: '60%', left: '80%'}}></div>
                        <div className="data-point" style={{top: '75%', left: '25%'}}></div>
                      </div>
                    </div>
                  </div>
                  <div className="frame-info">
                    <div className="info-panel">
                      <div className="panel-title">Tech Profile</div>
                      <div className="panel-data">
                        <div className="data-row">
                          <span className="data-label">Established</span>
                          <span className="data-value">2019</span>
                        </div>
                        <div className="data-row">
                          <span className="data-label">Innovation</span>
                          <span className="data-value">50+</span>
                        </div>
                        <div className="data-row">
                          <span className="data-label">Solutions</span>
                          <span className="data-value">∞</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* 核心业务区域 */}
        <section className="businesses-section">
          <div className="section-bg"></div>
          <div className="container">
            <div className="section-header">
              <div className="section-line"></div>
              <h2 className="section-title">核心业务</h2>
              <div className="section-line"></div>
            </div>
            <div className="businesses-grid">
              {businesses.map((business, index) => (
                <a href={business.link} className="business-card" key={index} 
                   style={{backgroundImage: `url(${business.image})`}}
                   data-aos="fade-up" data-aos-delay={index * 100}>
                  <div className="card-overlay"></div>
                  <div className="card-content">
                    <div className="card-number">0{index + 1}</div>
                    <h3 className="card-title">{business.title}</h3>
                    <div className="card-separator"></div>
                    <p className="card-description">{business.description}</p>
                    <div className="card-action">
                      <span className="card-link">查看详情</span>
                      <svg className="card-icon" viewBox="0 0 24 24" width="16" height="16">
                        <path fill="currentColor" d="M5,13H16.17L11.29,17.88C10.9,18.27 10.9,18.91 11.29,19.29C11.68,19.68 12.31,19.68 12.7,19.29L19.29,12.7C19.68,12.31 19.68,11.68 19.29,11.29L12.7,4.7C12.31,4.31 11.68,4.31 11.29,4.7C10.9,5.09 10.9,5.72 11.29,6.11L16.17,11H5C4.45,11 4,11.45 4,12C4,12.55 4.45,13 5,13Z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="card-frame"></div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        /* 基础样式 */
        .home-page {
          width: 100%;
          position: relative;
          overflow-x: hidden;
          background: linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%);
        }
        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 3rem;
          position: relative;
          z-index: 2;
        }
        
        /* 区域公共样式 */
        section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .section-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(147, 197, 253, 0.06) 0%, transparent 50%),
            linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(15, 23, 42, 0.8) 100%);
          z-index: 1;
        }
        .section-header {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 5rem;
          position: relative;
        }
        .section-line {
          width: 80px;
          height: 2px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(59, 130, 246, 0.8) 30%, 
            rgba(147, 197, 253, 1) 50%, 
            rgba(59, 130, 246, 0.8) 70%, 
            transparent 100%);
          margin: 0 30px;
          border-radius: 1px;
          position: relative;
        }
        .section-line::before {
          content: '';
          position: absolute;
          top: -1px;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(59, 130, 246, 0.3) 50%, 
            transparent 100%);
          filter: blur(1px);
        }
        .section-title {
          font-size: 2.5rem;
          text-transform: uppercase;
          letter-spacing: 6px;
          font-weight: 700;
          background: linear-gradient(135deg, 
            #ffffff 0%, 
            rgba(59, 130, 246, 1) 40%, 
            rgba(147, 197, 253, 1) 70%, 
            #ffffff 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
          position: relative;
          text-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
        }
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 50%, 
            rgba(59, 130, 246, 1) 100%);
          border-radius: 2px;
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
        }
        
        /* 高亮文本 */
        .text-highlight {
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 50%, 
            rgba(59, 130, 246, 1) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
          filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.8));
        }
        .text-highlight::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 8px;
          background: linear-gradient(90deg, 
            rgba(59, 130, 246, 0.3) 0%, 
            rgba(147, 197, 253, 0.5) 50%, 
            rgba(59, 130, 246, 0.3) 100%);
          filter: blur(3px);
          z-index: -1;
          animation: highlightPulse 3s ease-in-out infinite;
        }
        @keyframes highlightPulse {
          0%, 100% { opacity: 0.6; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.2); }
        }
        
        /* 按钮样式 */
        .text-button {
          display: inline-flex;
          align-items: center;
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #fff;
          text-decoration: none;
          margin-top: 2rem;
          font-weight: 600;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          padding: 15px 30px;
          overflow: hidden;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.1) 0%, 
            rgba(147, 197, 253, 0.05) 100%);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 8px;
          backdrop-filter: blur(15px);
        }
        .text-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(59, 130, 246, 0.4) 50%, 
            transparent 100%);
          transition: left 0.6s ease;
        }
        .text-button::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          transition: width 0.5s ease;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.6);
        }
        .text-button:hover {
          border-color: rgba(59, 130, 246, 0.6);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.2);
          transform: translateY(-2px);
        }
        .text-button:hover::before {
          left: 100%;
        }
        .text-button:hover::after {
          width: 100%;
        }
        .button-icon {
          margin-left: 12px;
          transition: all 0.3s ease;
          filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.6));
        }
        .text-button:hover .button-icon {
          transform: translateX(8px) rotate(10deg);
        }
        
        /* 技术标签 */
        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          margin-top: 2rem;
          gap: 15px;
        }
        .tech-tag {
          font-size: 0.85rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #fff;
          padding: 8px 16px;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.15) 0%, 
            rgba(147, 197, 253, 0.1) 100%);
          border: 1px solid rgba(59, 130, 246, 0.4);
          border-radius: 25px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .tech-tag::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(59, 130, 246, 0.3) 50%, 
            transparent 100%);
          transition: left 0.5s ease;
        }
        .tech-tag:hover {
          border-color: rgba(59, 130, 246, 0.8);
          box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
          transform: translateY(-2px);
        }
        .tech-tag:hover::before {
          left: 100%;
        }
        
        /* 增强粒子效果 */
        .particle-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 80% 20%, rgba(147, 197, 253, 0.08) 1px, transparent 1px),
            radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.05) 1px, transparent 1px);
          background-size: 100px 100px, 150px 150px, 80px 80px;
          background-position: 0 0, 30px 60px, 130px 270px;
          opacity: 0.6;
          z-index: 1;
          animation: particleMove 20s linear infinite;
        }
        @keyframes particleMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-100px, -100px); }
        }
        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }
        .floating-element {
          position: absolute;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, 
            rgba(59, 130, 246, 0.8) 0%, 
            rgba(147, 197, 253, 0.4) 70%, 
            transparent 100%);
          border-radius: 50%;
          filter: blur(0.5px);
          animation: float 15s infinite ease-in-out;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }
        .floating-element:nth-child(1) {
          animation-delay: 0s;
          animation-duration: 18s;
          width: 10px;
          height: 10px;
        }
        .floating-element:nth-child(2) {
          animation-delay: 3s;
          animation-duration: 22s;
          width: 6px;
          height: 6px;
        }
        .floating-element:nth-child(3) {
          animation-delay: 6s;
          animation-duration: 16s;
          width: 12px;
          height: 12px;
        }
        .floating-element:nth-child(4) {
          animation-delay: 9s;
          animation-duration: 25s;
          width: 8px;
          height: 8px;
        }
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.4;
          }
          25% {
            transform: translate(50px, -40px) rotate(90deg);
            opacity: 0.8;
          }
          50% {
            transform: translate(0, -80px) rotate(180deg);
            opacity: 1;
          }
          75% {
            transform: translate(-50px, -40px) rotate(270deg);
            opacity: 0.6;
          }
        }

        /* 点击粒子特效 */
        .click-particles-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1000;
        }

        .click-particle {
          position: absolute;
          background: radial-gradient(circle, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 0.8) 50%, 
            transparent 100%);
          border-radius: 50%;
          animation: particleExplosion 1.5s ease-out forwards;
          box-shadow: 
            0 0 10px rgba(59, 130, 246, 0.8),
            0 0 20px rgba(147, 197, 253, 0.6),
            0 0 30px rgba(59, 130, 246, 0.4);
        }

        @keyframes particleExplosion {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + var(--vx) * 150px), calc(-50% + var(--vy) * 150px)) scale(0);
            opacity: 0;
          }
        }
        
        /* 视频背景区域 */
        .hero-section {
          height: 100vh;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0;
          overflow: hidden;
        }
        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(147, 197, 253, 0.1) 0%, transparent 50%);
          z-index: 1;
          animation: backgroundPulse 8s ease-in-out infinite;
        }
        @keyframes backgroundPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .bg-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.4) contrast(1.2) saturate(0.8);
        }
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(15,23,42,0.6) 30%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.8) 100%),
            radial-gradient(ellipse at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
          z-index: 1;
        }
        .hero-content {
          position: relative;
          z-index: 3;
          text-align: center;
          padding: 0 2rem;
          max-width: 1200px;
          opacity: ${scrollY < 300 ? 1 - scrollY/300 : 0};
          transform: translateY(${scrollY < 300 ? scrollY/15 : 20}px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          padding: 12px 24px;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.15) 0%, 
            rgba(147, 197, 253, 0.1) 100%);
          border: 1px solid rgba(59, 130, 246, 0.4);
          color: #fff;
          font-size: 0.9rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 3rem;
          backdrop-filter: blur(15px);
          border-radius: 50px;
          font-weight: 600;
          position: relative;
          overflow: hidden;
          animation: badgeGlow 4s ease-in-out infinite;
        }
        @keyframes badgeGlow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
            border-color: rgba(59, 130, 246, 0.4);
          }
          50% { 
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.6);
            border-color: rgba(59, 130, 246, 0.8);
          }
        }
        /* 新的探索按钮容器 */
        .explore-button-container {
          margin: 3rem 0 4rem;
          display: flex;
          justify-content: center;
        }

        .explore-tech-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 4rem;
          text-decoration: none;
          cursor: pointer;
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        /* 边框发光效果 */
        .button-border-glow {
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, 
            rgba(0, 212, 255, 0.8) 0%,
            rgba(59, 130, 246, 1) 25%,
            rgba(147, 197, 253, 0.9) 50%,
            rgba(59, 130, 246, 1) 75%,
            rgba(0, 212, 255, 0.8) 100%);
          background-size: 400% 400%;
          border-radius: 22px;
          z-index: -2;
          animation: borderGlow 3s ease-in-out infinite;
          opacity: 0.7;
        }

        @keyframes borderGlow {
          0%, 100% { 
            background-position: 0% 50%;
            transform: scale(1);
          }
          50% { 
            background-position: 100% 50%;
            transform: scale(1.02);
          }
        }

        /* 按钮背景 */
        .button-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            rgba(0, 0, 0, 0.9) 0%,
            rgba(15, 23, 42, 0.8) 30%,
            rgba(30, 41, 59, 0.7) 70%,
            rgba(0, 0, 0, 0.9) 100%);
          backdrop-filter: blur(20px);
          border-radius: 18px;
          z-index: -1;
          transition: all 0.4s ease;
        }

        /* 按钮内容布局 */
        .button-content {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          z-index: 2;
          position: relative;
        }

        /* 按钮图标 */
        .button-icon {
          position: relative;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: linear-gradient(135deg, 
            rgba(0, 212, 255, 0.2) 0%,
            rgba(59, 130, 246, 0.3) 100%);
          border: 1px solid rgba(0, 212, 255, 0.5);
          color: rgba(0, 212, 255, 0.9);
          transition: all 0.3s ease;
        }

        .icon-orbit {
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border: 1px solid rgba(0, 212, 255, 0.3);
          border-radius: 50%;
          border-top-color: rgba(0, 212, 255, 0.8);
          animation: iconOrbit 3s linear infinite;
        }

        @keyframes iconOrbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* 按钮文字 */
        .button-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .main-text {
          font-size: 2.5rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 2px;
          line-height: 1.2;
          background: linear-gradient(135deg, 
            #ffffff 0%, 
            rgba(0, 212, 255, 1) 30%, 
            rgba(147, 197, 253, 1) 70%, 
            #ffffff 100%);
          background-size: 200% 200%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textShimmer 4s ease-in-out infinite;
          transition: all 0.3s ease;
        }

        .highlight-text {
          background: linear-gradient(135deg, 
            rgba(0, 212, 255, 1) 0%, 
            rgba(147, 197, 253, 1) 50%, 
            rgba(0, 212, 255, 1) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
        }

        .sub-text {
          font-size: 0.9rem;
          font-weight: 400;
          color: rgba(0, 212, 255, 0.8);
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-top: 0.3rem;
          transition: all 0.3s ease;
        }

        @keyframes textShimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* 按钮箭头 */
        .button-arrow {
          color: rgba(0, 212, 255, 0.8);
          transition: all 0.3s ease;
          transform: translateX(0);
        }

        /* 按钮粒子特效 */
        .button-particles {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1;
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: rgba(0, 212, 255, 0.6);
          border-radius: 50%;
          animation: particleFloat 6s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(0, 212, 255, 0.8);
        }

        .particle:nth-child(1) {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .particle:nth-child(2) {
          top: 80%;
          right: 15%;
          animation-delay: 1.5s;
        }

        .particle:nth-child(3) {
          bottom: 25%;
          left: 20%;
          animation-delay: 3s;
        }

        .particle:nth-child(4) {
          top: 40%;
          right: 10%;
          animation-delay: 4.5s;
        }

        @keyframes particleFloat {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) scale(1.2);
          opacity: 0.8;
          }
          50% {
            transform: translateY(-10px) scale(0.8);
            opacity: 1;
          }
          75% {
            transform: translateY(-30px) scale(1.1);
            opacity: 0.6;
          }
        }

        /* 点击波纹效果 */
        .button-ripple {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: radial-gradient(circle, 
            rgba(0, 212, 255, 0.4) 0%, 
            rgba(147, 197, 253, 0.2) 50%, 
            transparent 100%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 0;
        }

        /* 悬停效果 */
        .explore-tech-button:hover {
          transform: translateY(-8px) scale(1.05);
          filter: drop-shadow(0 20px 40px rgba(0, 212, 255, 0.3));
        }

        .explore-tech-button:hover .button-border-glow {
          animation-duration: 1.5s;
          opacity: 1;
          transform: scale(1.05);
        }

        .explore-tech-button:hover .button-background {
          background: linear-gradient(135deg, 
            rgba(0, 0, 0, 0.95) 0%,
            rgba(15, 23, 42, 0.9) 30%,
            rgba(30, 41, 59, 0.8) 70%,
            rgba(0, 0, 0, 0.95) 100%);
          backdrop-filter: blur(30px);
        }

        .explore-tech-button:hover .button-icon {
          background: linear-gradient(135deg, 
            rgba(0, 212, 255, 0.4) 0%,
            rgba(59, 130, 246, 0.5) 100%);
          color: #ffffff;
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.6);
        }

        .explore-tech-button:hover .main-text {
          font-size: 2.7rem;
          letter-spacing: 3px;
          text-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
          animation-duration: 2s;
        }

        .explore-tech-button:hover .sub-text {
          color: rgba(0, 212, 255, 1);
          letter-spacing: 4px;
          text-shadow: 0 0 20px rgba(0, 212, 255, 0.6);
        }

        .explore-tech-button:hover .button-arrow {
          color: #ffffff;
          transform: translateX(8px) scale(1.2);
          filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.8));
        }

        .explore-tech-button:hover .particle {
          animation-duration: 3s;
          box-shadow: 0 0 15px rgba(0, 212, 255, 1);
        }

        /* 点击效果 */
        .explore-tech-button:active {
          transform: translateY(-4px) scale(1.02);
          animation: buttonPulse 0.6s ease-out;
        }

        .explore-tech-button:active .button-ripple {
          width: 300px;
          height: 300px;
          animation: rippleExpand 0.8s ease-out;
        }

        @keyframes buttonPulse {
          0% { 
            transform: translateY(-4px) scale(1.02);
            filter: drop-shadow(0 15px 30px rgba(0, 212, 255, 0.2));
          }
          50% { 
            transform: translateY(-10px) scale(1.08);
            filter: drop-shadow(0 25px 50px rgba(0, 212, 255, 0.5));
          }
          100% { 
            transform: translateY(-8px) scale(1.05);
            filter: drop-shadow(0 20px 40px rgba(0, 212, 255, 0.3));
          }
        }

        @keyframes rippleExpand {
          0% {
            width: 0;
            height: 0;
            opacity: 0.8;
          }
          100% {
            width: 300px;
            height: 300px;
            opacity: 0;
          }
        }
        

        .hero-subtitle {
          font-size: 1.6rem;
          font-weight: 400;
          letter-spacing: 3px;
          color: rgba(255, 255, 255, 0.9);
          max-width: 900px;
          margin: 0 auto 4rem;
          line-height: 1.6;
          text-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
        }
        .hero-stats {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 4rem;
          gap: 2rem;
          position: relative;
        }
        .hero-stats::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse, rgba(59, 130, 246, 0.05) 0%, transparent 70%);
          border-radius: 50%;
          z-index: -1;
        }
        .stat-item {
          text-align: center;
          padding: 2rem 1.5rem;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.1) 0%, 
            rgba(147, 197, 253, 0.05) 100%);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 20px;
          backdrop-filter: blur(15px);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
          min-width: 140px;
        }
        .stat-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        .stat-item:hover {
          transform: translateY(-8px);
          border-color: rgba(59, 130, 246, 0.6);
          box-shadow: 0 15px 35px rgba(59, 130, 246, 0.2);
        }
        .stat-item:hover::before {
          transform: scaleX(1);
        }
        .stat-divider {
          width: 2px;
          height: 60px;
          background: linear-gradient(to bottom, 
            rgba(59, 130, 246, 0) 0%, 
            rgba(59, 130, 246, 0.8) 50%, 
            rgba(59, 130, 246, 0) 100%);
          border-radius: 1px;
          position: relative;
        }
        .stat-divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          background: rgba(59, 130, 246, 1);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.8);
        }
        .stat-value {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 0.8rem;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5));
        }
        .stat-label {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
        }
        
        /* 增强滚动指示器 */
        .scroll-container {
          position: absolute;
          bottom: 3rem;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          z-index: 3;
        }
        .scroll-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          padding: 1.5rem;
          transition: all 0.3s ease;
          position: relative;
        }
        .scroll-indicator:hover {
          transform: scale(1.1);
        }
        .scroll-line {
          width: 2px;
          height: 80px;
          background: linear-gradient(to bottom, 
            rgba(59, 130, 246, 0) 0%, 
            rgba(59, 130, 246, 0.8) 30%, 
            rgba(147, 197, 253, 1) 50%, 
            rgba(59, 130, 246, 0.8) 70%, 
            rgba(59, 130, 246, 0) 100%);
          margin-bottom: 20px;
          border-radius: 1px;
          position: relative;
          animation: scrollLinePulse 3s ease-in-out infinite;
        }
        @keyframes scrollLinePulse {
          0%, 100% { opacity: 0.7; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.1); }
        }
        .scroll-text {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          margin-bottom: 15px;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 600;
          text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }
        .chevron {
          position: relative;
          width: 28px;
          height: 8px;
          opacity: 0;
          transform: scale(0.3);
          animation: move-chevron 3s ease-out infinite;
        }
        .chevron:before,
        .chevron:after {
          content: '';
          position: absolute;
          top: 0;
          height: 100%;
          width: 50%;
          background: rgba(30, 144, 255, 0.9);
        }
        .chevron:before {
          left: 0;
          transform: skewY(30deg);
        }
        .chevron:after {
          right: 0;
          width: 50%;
          transform: skewY(-30deg);
        }
        .chevron:first-child {
          animation-delay: 0s;
        }
        .chevron:nth-child(2) {
          animation-delay: 0.5s;
        }
        .chevron:nth-child(3) {
          animation-delay: 1s;
        }
        @keyframes move-chevron {
          25% {
            opacity: 1;
          }
          33.3% {
            opacity: 1;
            transform: translateY(2.28px);
          }
          66.6% {
            opacity: 1;
            transform: translateY(3.12px);
          }
          100% {
            opacity: 0;
            transform: translateY(4.8px) scale(0.5);
          }
        }
        
        /* 关于我们区域 */
        .about-section {
          background: linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%);
          padding: 10rem 0;
          position: relative;
          overflow: hidden;
        }
        .about-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.08) 0%, transparent 60%),
            radial-gradient(circle at 75% 75%, rgba(147, 197, 253, 0.05) 0%, transparent 60%),
            linear-gradient(45deg, rgba(59, 130, 246, 0.02) 0%, transparent 100%);
          z-index: 1;
        }
        .about-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }
        .particle-dot {
          position: absolute;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, rgba(59, 130, 246, 1) 0%, transparent 70%);
          border-radius: 50%;
          animation: particlePulse 4s ease-in-out infinite;
        }
        @keyframes particlePulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        .about-content {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 6rem;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        
        /* 左侧文字区域 */
        .about-text-container {
          position: relative;
        }
        .company-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.15) 0%, 
            rgba(147, 197, 253, 0.1) 100%);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 25px;
          backdrop-filter: blur(10px);
          margin-bottom: 2rem;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.8);
          letter-spacing: 1px;
          text-transform: uppercase;
          font-weight: 600;
        }
        .badge-icon {
          font-size: 1rem;
          animation: iconRotate 3s linear infinite;
        }
        @keyframes iconRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .about-heading {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          letter-spacing: 3px;
          line-height: 1.3;
        }
        .heading-line {
          display: block;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 0.5rem;
        }
        .heading-highlight {
          display: block;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 70%, 
            rgba(59, 130, 246, 1) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.6));
        }
        .about-divider {
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          border-radius: 2px;
          margin-bottom: 2rem;
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
        }
        .about-description {
          font-size: 1.3rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 3rem;
          font-weight: 400;
          text-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
        }
        .tech-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        .tech-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px 20px;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.1) 0%, 
            rgba(147, 197, 253, 0.05) 100%);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 12px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .tech-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(59, 130, 246, 0.2) 50%, 
            transparent 100%);
          transition: left 0.5s ease;
        }
        .tech-item:hover {
          border-color: rgba(59, 130, 246, 0.6);
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.2);
        }
        .tech-item:hover::before {
          left: 100%;
        }
        .tech-icon {
          font-size: 1.2rem;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.3) 0%, 
            rgba(147, 197, 253, 0.2) 100%);
          border-radius: 50%;
          transition: transform 0.3s ease;
        }
        .tech-item:hover .tech-icon {
          transform: scale(1.1) rotate(10deg);
        }
        .tech-name {
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          font-size: 0.95rem;
          letter-spacing: 0.5px;
        }
        .action-container {
          position: relative;
        }
        .premium-button {
          display: inline-flex;
          align-items: center;
          gap: 15px;
          padding: 18px 35px;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.8) 0%, 
            rgba(147, 197, 253, 0.6) 100%);
          border: 2px solid rgba(59, 130, 246, 0.8);
          border-radius: 50px;
          color: #fff;
          text-decoration: none;
          font-weight: 700;
          font-size: 1.1rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(15px);
        }
        .premium-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.3) 50%, 
            transparent 100%);
          transition: left 0.6s ease;
        }
        .premium-button:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(59, 130, 246, 0.4);
          border-color: rgba(147, 197, 253, 1);
        }
        .premium-button:hover::before {
          left: 100%;
        }
        .premium-button:hover .button-icon {
          transform: translateX(5px) rotate(15deg);
        }
        .button-text {
          position: relative;
          z-index: 1;
        }
        /* 右侧视觉区域 */
        .about-visual-container {
          position: relative;
          height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .visual-frame {
          position: relative;
          width: 100%;
          height: 100%;
          max-width: 500px;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.05) 0%, 
            rgba(147, 197, 253, 0.03) 100%);
          border: 2px solid rgba(59, 130, 246, 0.3);
          border-radius: 25px;
          overflow: hidden;
          backdrop-filter: blur(20px);
          transition: all 0.5s ease;
        }
        .visual-frame:hover {
          border-color: rgba(59, 130, 246, 0.6);
          box-shadow: 
            0 20px 50px rgba(59, 130, 246, 0.15),
            inset 0 0 50px rgba(59, 130, 246, 0.05);
          transform: translateY(-10px);
        }
        .frame-decoration {
          position: absolute;
          width: 40px;
          height: 40px;
          border: 2px solid rgba(59, 130, 246, 0.8);
          z-index: 3;
        }
        .frame-decoration.top-left {
          top: 15px;
          left: 15px;
          border-right: none;
          border-bottom: none;
        }
        .frame-decoration.top-right {
          top: 15px;
          right: 15px;
          border-left: none;
          border-bottom: none;
        }
        .frame-decoration.bottom-left {
          bottom: 15px;
          left: 15px;
          border-right: none;
          border-top: none;
        }
        .frame-decoration.bottom-right {
          bottom: 15px;
          right: 15px;
          border-left: none;
          border-top: none;
        }
        .image-container {
          position: relative;
          width: 100%;
          height: 100%;
          padding: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .main-image {
          width: 90%;
          height: 90%;
          object-fit: contain;
          filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.3));
          transition: all 0.5s ease;
          z-index: 2;
          position: relative;
        }
        .visual-frame:hover .main-image {
          filter: drop-shadow(0 0 30px rgba(59, 130, 246, 0.6));
          transform: scale(1.05);
        }
        .image-effects {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }
        .scan-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(59, 130, 246, 0.8) 50%, 
            transparent 100%);
          animation: scanMove 3s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.6);
        }
        @keyframes scanMove {
          0%, 100% { top: 30px; opacity: 0; }
          10%, 90% { opacity: 1; }
          50% { top: calc(100% - 60px); }
        }
        .data-points {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .data-point {
          position: absolute;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 0.6) 70%, 
            transparent 100%);
          border-radius: 50%;
          animation: dataPointPulse 2s ease-in-out infinite;
        }
        .data-point::before {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          width: 16px;
          height: 16px;
          border: 1px solid rgba(59, 130, 246, 0.4);
          border-radius: 50%;
          animation: ripple 2s ease-in-out infinite;
        }
        @keyframes dataPointPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes ripple {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        .frame-info {
          position: absolute;
          bottom: 20px;
          right: 20px;
          z-index: 4;
        }
        .info-panel {
          background: linear-gradient(135deg, 
            rgba(0, 0, 0, 0.8) 0%, 
            rgba(15, 23, 42, 0.9) 100%);
          border: 1px solid rgba(59, 130, 246, 0.4);
          border-radius: 12px;
          padding: 15px 20px;
          backdrop-filter: blur(15px);
          min-width: 160px;
          transition: all 0.3s ease;
        }
        .visual-frame:hover .info-panel {
          border-color: rgba(59, 130, 246, 0.8);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.2);
        }
        .panel-title {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: rgba(59, 130, 246, 1);
          margin-bottom: 10px;
          text-align: center;
        }
        .panel-data {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .data-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
        }
        .data-label {
          color: rgba(255, 255, 255, 0.7);
          font-weight: 400;
        }
        .data-value {
          color: rgba(59, 130, 246, 1);
          font-weight: 700;
          font-family: 'Courier New', monospace;
        }
        
        /* 核心业务区域 */
        .businesses-section {
          background: linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%);
          padding: 10rem 0;
          position: relative;
        }
        .businesses-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, rgba(147, 197, 253, 0.05) 0%, transparent 50%);
          z-index: 1;
        }
        .businesses-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 3rem;
          position: relative;
          z-index: 2;
        }
        .business-card {
          height: 420px;
          position: relative;
          text-decoration: none;
          color: white;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: flex-end;
          border-radius: 20px;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          border: 2px solid rgba(59, 130, 246, 0.2);
        }
        .business-card::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, 
            rgba(59, 130, 246, 0.8) 0%, 
            rgba(147, 197, 253, 0.6) 50%, 
            rgba(59, 130, 246, 0.8) 100%);
          border-radius: 22px;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .business-card:hover {
          transform: translateY(-10px) scale(1.02);
          border-color: rgba(59, 130, 246, 0.6);
          box-shadow: 0 25px 50px rgba(59, 130, 246, 0.3);
        }
        .business-card:hover::before {
          opacity: 1;
        }
        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            linear-gradient(to top, 
              rgba(0,0,0,0.95) 0%, 
              rgba(15,23,42,0.6) 40%, 
              rgba(59, 130, 246, 0.1) 70%, 
              rgba(0,0,0,0.2) 100%);
          transition: all 0.5s ease;
          z-index: 1;
          border-radius: 18px;
        }
        .business-card:hover .card-overlay {
          background: 
            linear-gradient(to top, 
              rgba(0,0,0,0.98) 0%, 
              rgba(15,23,42,0.8) 30%, 
              rgba(59, 130, 246, 0.2) 60%, 
              rgba(0,0,0,0.4) 100%);
        }
        .card-content {
          position: relative;
          z-index: 2;
          padding: 3rem;
          width: 100%;
          transform: translateY(0);
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .business-card:hover .card-content {
          transform: translateY(-30px);
        }
        .card-number {
          font-size: 1rem;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1.2rem;
          letter-spacing: 3px;
          font-weight: 700;
          text-transform: uppercase;
        }
        .card-title {
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 1.5rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          background: linear-gradient(135deg, 
            #ffffff 0%, 
            rgba(59, 130, 246, 1) 70%, 
            rgba(147, 197, 253, 1) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
          line-height: 1.2;
        }
        .card-separator {
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          margin-bottom: 2rem;
          border-radius: 2px;
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
        }
        .card-description {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2rem;
          max-width: 90%;
          line-height: 1.7;
          font-weight: 400;
          opacity: 0;
          transform: translateY(25px);
          transition: all 0.6s ease;
          transition-delay: 0.1s;
          text-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
        }
        .business-card:hover .card-description {
          opacity: 1;
          transform: translateY(0);
        }
        .card-action {
          display: flex;
          align-items: center;
          opacity: 0;
          transform: translateY(25px);
          transition: all 0.6s ease;
          transition-delay: 0.2s;
        }
        .business-card:hover .card-action {
          opacity: 1;
          transform: translateY(0);
        }
        .card-link {
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          font-weight: 600;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.6));
        }
        .card-icon {
          margin-left: 15px;
          transition: all 0.3s ease;
          filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.8));
        }
        .business-card:hover .card-icon {
          transform: translateX(8px) rotate(15deg);
        }
        .card-frame {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 1px solid rgba(255, 255, 255, 0.1);
          pointer-events: none;
          z-index: 3;
          transition: all 0.3s ease;
        }
        .business-card:hover .card-frame {
          border-color: rgba(30, 144, 255, 0.3);
          transform: scale(0.98);
        }
        
        /* 增强响应式设计 */
        @media (max-width: 1200px) {
          .container {
            padding: 0 2rem;
          }
          .hero-title {
            font-size: 5rem;
            letter-spacing: 8px;
          }
          .hero-subtitle {
            font-size: 1.4rem;
          }
          .stat-item {
            padding: 1.8rem 1.2rem;
            min-width: 130px;
          }
          .stat-value {
            font-size: 2.8rem;
          }
          .about-content {
            gap: 6rem;
          }
          .businesses-grid {
            gap: 2.5rem;
          }
        }
        @media (max-width: 992px) {
          .container {
            padding: 0 1.8rem;
          }
          .explore-tech-button {
            padding: 1.5rem 3rem;
          }
          .button-icon {
            width: 40px;
            height: 40px;
          }
          .main-text {
            font-size: 2.2rem;
            letter-spacing: 1px;
          }
          .explore-tech-button:hover .main-text {
            font-size: 2.4rem;
            letter-spacing: 2px;
          }
          .sub-text {
            font-size: 0.8rem;
            letter-spacing: 2px;
          }
          .hero-subtitle {
            font-size: 1.3rem;
            letter-spacing: 2px;
          }
          .hero-stats {
            flex-direction: column;
            gap: 2rem;
          }
          .stat-item {
            min-width: 250px;
            margin: 0 auto;
          }
          .stat-divider {
            display: none;
          }
          .businesses-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .business-card {
            height: 380px;
          }
          .about-content {
            grid-template-columns: 1fr;
            gap: 4rem;
            text-align: center;
          }
          .about-heading {
            font-size: 2.5rem;
            letter-spacing: 2px;
          }
          .tech-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .about-visual-container {
            height: 450px;
          }
          .visual-frame {
            max-width: 400px;
          }
          .section-title {
            font-size: 2.2rem;
            letter-spacing: 4px;
          }
        }
        @media (max-width: 768px) {
          .container {
            padding: 0 1.5rem;
          }
          .explore-button-container {
            margin: 2rem 0 3rem;
          }
          .explore-tech-button {
            padding: 1.2rem 2rem;
            border-radius: 16px;
          }
          .button-content {
            gap: 1rem;
            flex-direction: column;
            text-align: center;
          }
          .button-icon {
            width: 36px;
            height: 36px;
          }
          .main-text {
            font-size: 1.8rem;
            letter-spacing: 1px;
          }
          .explore-tech-button:hover .main-text {
            font-size: 2rem;
            letter-spacing: 2px;
          }
          .sub-text {
            font-size: 0.7rem;
            letter-spacing: 1px;
          }
          .button-arrow {
            transform: rotate(90deg);
          }
          .explore-tech-button:hover .button-arrow {
            transform: rotate(90deg) translateY(8px) scale(1.2);
          }
          .hero-subtitle {
            font-size: 1.2rem;
            letter-spacing: 2px;
          }
          .hero-badge {
            font-size: 0.8rem;
            letter-spacing: 2px;
            padding: 10px 20px;
          }
          .stat-item {
            min-width: 100%;
            max-width: 280px;
            padding: 1.5rem 1rem;
          }
          .stat-value {
            font-size: 2.5rem;
          }
          .section-title {
            font-size: 2rem;
            letter-spacing: 4px;
          }
          .section-header {
            margin-bottom: 3rem;
          }
          .businesses-grid {
            gap: 1.5rem;
          }
          .business-card {
            height: 350px;
          }
          .card-content {
            padding: 2.5rem;
          }
          .card-title {
            font-size: 1.7rem;
            letter-spacing: 2px;
          }
          .card-description {
            font-size: 1.1rem;
          }
          .about-heading {
            font-size: 2rem;
            letter-spacing: 2px;
          }
          .about-description {
            font-size: 1.1rem;
          }
          .tech-item {
            padding: 12px 16px;
          }
          .tech-icon {
            width: 25px;
            height: 25px;
            font-size: 1rem;
          }
          .tech-name {
            font-size: 0.9rem;
          }
          .about-visual-container {
            height: 350px;
          }
          .visual-frame {
            max-width: 350px;
          }
          .premium-button {
            padding: 15px 30px;
            font-size: 1rem;
          }
          .text-button, .card-link {
            font-size: 0.95rem;
            letter-spacing: 2px;
          }
          .scroll-line {
            height: 60px;
          }
        }
        @media (max-width: 480px) {
          .explore-tech-button {
            padding: 1rem 1.5rem;
            border-radius: 12px;
          }
          .button-content {
            gap: 0.8rem;
          }
          .button-icon {
            width: 32px;
            height: 32px;
          }
          .main-text {
            font-size: 1.5rem;
            letter-spacing: 0px;
          }
          .explore-tech-button:hover .main-text {
            font-size: 1.6rem;
            letter-spacing: 1px;
          }
          .sub-text {
            font-size: 0.6rem;
            letter-spacing: 0px;
          }
          .particle {
            width: 2px;
            height: 2px;
          }
          .hero-subtitle {
            font-size: 1rem;
            letter-spacing: 1px;
          }
          .hero-badge {
            font-size: 0.75rem;
            letter-spacing: 1.5px;
            padding: 8px 16px;
          }
          .stat-value {
            font-size: 2.2rem;
          }
          .stat-label {
            font-size: 0.8rem;
          }
          .section-title {
            font-size: 1.8rem;
            letter-spacing: 3px;
          }
          .business-card {
            height: 320px;
          }
          .card-content {
            padding: 2rem;
          }
          .card-title {
            font-size: 1.5rem;
            letter-spacing: 2px;
          }
          .card-description {
            font-size: 1rem;
          }
          .about-heading {
            font-size: 1.8rem;
            letter-spacing: 2px;
          }
          .about-description {
            font-size: 1rem;
          }
          .company-badge {
            font-size: 0.75rem;
            padding: 6px 12px;
          }
          .tech-item {
            padding: 10px 12px;
          }
          .tech-icon {
            width: 22px;
            height: 22px;
            font-size: 0.9rem;
          }
          .tech-name {
            font-size: 0.85rem;
          }
          .about-visual-container {
            height: 300px;
          }
          .visual-frame {
            max-width: 280px;
          }
          .premium-button {
            padding: 12px 25px;
            font-size: 0.9rem;
            gap: 10px;
          }
          .info-panel {
            padding: 10px 15px;
            min-width: 120px;
          }
          .panel-title {
            font-size: 0.7rem;
          }
          .data-row {
            font-size: 0.75rem;
          }
          .text-button, .card-link {
            font-size: 0.85rem;
            letter-spacing: 1.5px;
          }
          .scroll-line {
            height: 50px;
          }
        }
      `}</style>
    </Layout>
  );
} 