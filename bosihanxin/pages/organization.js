import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import { RESEARCH_DEPARTMENTS, TECH_ACHIEVEMENTS } from '../constants/appConstants';

/**
 * 动态统计卡片组件 - 性能优化版本
 */
const AnimatedStatsCard = ({ icon, number, label, description, index }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  
  // 使用Intersection Observer优化动画触发
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [isVisible]);
  
  // 优化数字动画 - 使用requestAnimationFrame
  useEffect(() => {
    if (!isVisible) return;
    
    const target = parseInt(number);
    const duration = 2000;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // 使用easeOutQuart缓动函数
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(target * easeOutQuart);
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };
    
    requestAnimationFrame(animate);
  }, [number, isVisible]);
  
  return (
    <div 
      ref={cardRef}
      className={`stats-card ${isVisible ? 'animate-fadeIn' : ''} animate-delay-${index * 100}`}
    >
      <div className="stats-icon">{icon}</div>
      <div className="stats-content">
        <div className="stats-number">{count}{number.includes('+') ? '+' : ''}</div>
        <div className="stats-label">{label}</div>
        <div className="stats-desc">{description}</div>
      </div>
      
      <style jsx>{`
        .stats-card {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.05) 0%, 
            rgba(255, 255, 255, 0.08) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
          transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
          will-change: transform;
        }
        
        .stats-card::before {
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
        
        .stats-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.3);
        }
        
        .stats-card:hover::before {
          transform: scaleX(1);
        }
        
        .stats-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
          filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.3));
        }
        
        .stats-number {
          font-size: 3rem;
          font-weight: 700;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }
        
        .stats-label {
          font-size: 1.2rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .stats-desc {
          font-size: 0.9rem;
          color: #94a3b8;
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
};

/**
 * 研发团队成员卡片
 */
const TeamMemberCard = ({ name, position, department, expertise, avatar, index }) => {
  return (
    <div className={`team-member-card animate-fadeIn animate-delay-${index * 150}`}>
      <div className="member-avatar">
        <div className="avatar-placeholder">{avatar}</div>
        <div className="avatar-glow"></div>
      </div>
      <div className="member-info">
        <h3 className="member-name">{name}</h3>
        <div className="member-position">{position}</div>
        <div className="member-department">{department}</div>
        <div className="member-expertise">
          {expertise.map((skill, idx) => (
            <span key={idx} className="expertise-tag">{skill}</span>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .team-member-card {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.05) 0%, 
            rgba(255, 255, 255, 0.08) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        
        .team-member-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(59, 130, 246, 0.15);
          border-color: rgba(59, 130, 246, 0.2);
        }
        
        .member-avatar {
          position: relative;
          display: inline-block;
          margin-bottom: 1.5rem;
        }
        
        .avatar-placeholder {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.2) 0%, 
            rgba(147, 197, 253, 0.2) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          border: 2px solid rgba(59, 130, 246, 0.3);
          position: relative;
          z-index: 2;
        }
        
        .avatar-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, 
            rgba(59, 130, 246, 0.2) 0%, 
            transparent 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: pulse 3s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
        }
        
        .member-name {
          font-size: 1.3rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 0.5rem;
        }
        
        .member-position {
          font-size: 1rem;
          color: rgba(59, 130, 246, 1);
          font-weight: 500;
          margin-bottom: 0.3rem;
        }
        
        .member-department {
          font-size: 0.9rem;
          color: #94a3b8;
          margin-bottom: 1rem;
        }
        
        .member-expertise {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
        }
        
        .expertise-tag {
          background: rgba(59, 130, 246, 0.1);
          color: rgba(59, 130, 246, 0.9);
          padding: 0.3rem 0.6rem;
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
 * 研发部门卡片组件 - 增强版
 */
const DepartmentCard = ({ name, location, description, icon, teamSize, keyProjects, index }) => {
  return (
    <div className={`department-card animate-fadeIn animate-delay-${index * 100}`}>
      <div className="department-header">
        <div className="department-icon">{icon}</div>
        <div className="department-info">
          <h3 className="department-name">{name}</h3>
          <div className="department-location">{location}</div>
        </div>
        <div className="department-badge">核心部门</div>
      </div>
      
      <p className="department-desc">{description}</p>
      
      <div className="department-stats">
        <div className="stat-item">
          <span className="stat-value">{teamSize}</span>
          <span className="stat-label">团队规模</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{keyProjects}</span>
          <span className="stat-label">核心项目</span>
        </div>
      </div>
      
      <div className="department-technologies">
        <div className="tech-label">主要技术栈</div>
        <div className="tech-tags">
          {getTechStackByDepartment(name).map((tech, idx) => (
            <span key={idx} className="tech-tag">{tech}</span>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .department-card {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.05) 0%, 
            rgba(255, 255, 255, 0.08) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2.5rem;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .department-card::before {
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
        
        .department-card:hover {
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.08) 0%, 
            rgba(255, 255, 255, 0.12) 100%);
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.3);
        }
        
        .department-card:hover::before {
          height: 100%;
        }
        
        .department-header {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .department-icon {
          font-size: 2.5rem;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.2) 0%, 
            rgba(147, 197, 253, 0.2) 100%);
          border-radius: 50%;
          border: 2px solid rgba(59, 130, 246, 0.3);
          filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.3));
          flex-shrink: 0;
        }
        
        .department-info {
          flex: 1;
        }
        
        .department-name {
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #fff;
        }
        
        .department-location {
          font-size: 0.9rem;
          color: rgba(59, 130, 246, 0.9);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 500;
        }
        
        .department-badge {
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.8) 0%, 
            rgba(147, 197, 253, 0.8) 100%);
          color: #000;
          padding: 0.3rem 0.8rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }
        
        .department-desc {
          font-size: 1rem;
          line-height: 1.6;
          color: #cbd5e1;
          margin-bottom: 1.5rem;
          flex: 1;
        }
        
        .department-stats {
          display: flex;
          gap: 2rem;
          margin-bottom: 1.5rem;
          padding: 1rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .stat-item {
          text-align: center;
        }
        
        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: rgba(59, 130, 246, 1);
          display: block;
          margin-bottom: 0.3rem;
        }
        
        .stat-label {
          font-size: 0.8rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .department-technologies {
          margin-top: auto;
        }
        
        .tech-label {
          font-size: 0.9rem;
          color: #94a3b8;
          margin-bottom: 0.8rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .tech-tag {
          background: rgba(59, 130, 246, 0.1);
          color: rgba(59, 130, 246, 0.9);
          padding: 0.3rem 0.6rem;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 500;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }
      `}</style>
    </div>
  );
};

// 根据部门获取技术栈的辅助函数
const getTechStackByDepartment = (departmentName) => {
  const techStacks = {
    "电子硬件部门": ["Altium Designer", "KiCad", "Proteus", "ModelSim", "FPGA"],
    "嵌入式软件部门": ["C/C++", "FreeRTOS", "STM32", "Linux", "ARM"],
    "应用软件部门": ["React", "Node.js", "Python", "Qt", "云平台"],
    "结构与热仿真部门": ["SolidWorks", "ANSYS", "CATIA", "AutoCAD", "有限元"],
    "光学设计部门": ["Zemax", "CODE V", "ASAP", "LightTools", "光学仿真"]
  };
  return techStacks[departmentName] || ["专业技术", "创新研发"];
};

/**
 * 技术成果组件 - 增强版
 */
const TechAchievements = () => {
  return (
    <div className="tech-achievements animate-fadeIn animate-delay-300">
      <div className="achievements-header">
        <div className="section-badge">🏆 核心实力</div>
        <h2 className="section-title">技术成果与专利</h2>
        <div className="section-divider"></div>
        <p className="section-desc">凭借持续的技术创新，我们在光纤通信和工业物联网领域取得了一系列重要突破</p>
      </div>
      
      <div className="achievements-stats">
        <AnimatedStatsCard 
          icon="🔬" 
          number="4" 
          label="发明专利" 
          description="核心技术专利保护"
          index={0}
        />
        <AnimatedStatsCard 
          icon="⚙️" 
          number="2" 
          label="实用新型专利" 
          description="产品结构优化"
          index={1}
        />
        <AnimatedStatsCard 
          icon="💻" 
          number="2" 
          label="软件著作权" 
          description="自主开发软件系统"
          index={2}
        />
        <AnimatedStatsCard 
          icon="🎯" 
          number="50+" 
          label="技术方案" 
          description="行业解决方案"
          index={3}
        />
      </div>
      
      <div className="achievements-content">
        <div className="achievement-highlight">
          <div className="highlight-icon">💡</div>
          <div className="highlight-text">
            <h3>技术创新成果</h3>
            <p>在光纤熔接技术、精密测量、工业物联网等核心领域实现关键技术突破，形成了完整的知识产权保护体系，为公司的持续发展奠定了坚实的技术基础。</p>
          </div>
        </div>
        
        <div className="core-technologies">
          <h3 className="tech-subtitle">
            <span className="subtitle-icon">🚀</span>
            核心技术能力
          </h3>
          <div className="tech-grid">
            {TECH_ACHIEVEMENTS.CORE_TECHNOLOGIES.map((tech, index) => (
              <div key={index} className={`tech-card animate-fadeIn animate-delay-${index * 100 + 400}`}>
                <div className="tech-icon">⚡</div>
                <div className="tech-content">
                  <div className="tech-name">{tech}</div>
                  <div className="tech-progress">
                    <div className="progress-bar" style={{ width: `${90 + Math.random() * 10}%` }}></div>
                  </div>
                  <div className="tech-level">专家级</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="research-highlights">
          <h3 className="tech-subtitle">
            <span className="subtitle-icon">🎖️</span>
            研发亮点
          </h3>
          <div className="highlights-grid">
            <div className="highlight-item">
              <div className="highlight-number">2022</div>
              <div className="highlight-title">技术起航</div>
              <div className="highlight-desc">开始核心技术研发，建立技术团队</div>
            </div>
            <div className="highlight-item">
              <div className="highlight-number">8+</div>
              <div className="highlight-title">专利申请</div>
              <div className="highlight-desc">累计申请发明专利和实用新型专利</div>
            </div>
            <div className="highlight-item">
              <div className="highlight-number">5</div>
              <div className="highlight-title">核心技术</div>
              <div className="highlight-desc">在关键技术领域取得重大突破</div>
            </div>
            <div className="highlight-item">
              <div className="highlight-number">2</div>
              <div className="highlight-title">研发中心</div>
              <div className="highlight-desc">西安、南京双城研发布局</div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .tech-achievements {
          margin: 5rem 0;
        }
        
        .achievements-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        
        .section-badge {
          display: inline-block;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.2) 0%, 
            rgba(147, 197, 253, 0.2) 100%);
          color: rgba(59, 130, 246, 1);
          padding: 0.5rem 1.5rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          border: 1px solid rgba(59, 130, 246, 0.3);
          margin-bottom: 1.5rem;
        }
        
        .section-title {
          font-size: 3rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 1) 0%, 
            rgba(59, 130, 246, 1) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .section-divider {
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          margin: 0 auto 1.5rem;
          border-radius: 2px;
        }
        
        .section-desc {
          font-size: 1.1rem;
          color: #94a3b8;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }
        
        .achievements-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }
        
        .achievements-content {
          display: grid;
          gap: 4rem;
        }
        
        .achievement-highlight {
          display: flex;
          align-items: flex-start;
          gap: 2rem;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.05) 0%, 
            rgba(59, 130, 246, 0.05) 100%);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 20px;
          padding: 2.5rem;
          backdrop-filter: blur(10px);
        }
        
        .highlight-icon {
          font-size: 3rem;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.2) 0%, 
            rgba(147, 197, 253, 0.2) 100%);
          padding: 1rem;
          border-radius: 50%;
          border: 2px solid rgba(59, 130, 246, 0.3);
          flex-shrink: 0;
        }
        
        .highlight-text h3 {
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #fff;
        }
        
        .highlight-text p {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #cbd5e1;
        }
        
        .tech-subtitle {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          color: #fff;
        }
        
        .subtitle-icon {
          font-size: 2.2rem;
        }
        
        .tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        
        .tech-card {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.05) 0%, 
            rgba(255, 255, 255, 0.08) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        
        .tech-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.15);
          border-color: rgba(59, 130, 246, 0.3);
        }
        
        .tech-icon {
          font-size: 2rem;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.2) 0%, 
            rgba(147, 197, 253, 0.2) 100%);
          padding: 0.8rem;
          border-radius: 50%;
          border: 2px solid rgba(59, 130, 246, 0.3);
          flex-shrink: 0;
        }
        
        .tech-content {
          flex: 1;
        }
        
        .tech-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 0.5rem;
        }
        
        .tech-progress {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }
        
        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          border-radius: 3px;
          transition: width 2s ease;
        }
        
        .tech-level {
          font-size: 0.85rem;
          color: rgba(59, 130, 246, 0.9);
          font-weight: 500;
        }
        
        .highlights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }
        
        .highlight-item {
          text-align: center;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.05) 0%, 
            rgba(255, 255, 255, 0.08) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 2rem 1.5rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        
        .highlight-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(59, 130, 246, 0.15);
          border-color: rgba(59, 130, 246, 0.3);
        }
        
        .highlight-number {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.8rem;
        }
        
        .highlight-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 0.5rem;
        }
        
        .highlight-desc {
          font-size: 0.9rem;
          color: #94a3b8;
          line-height: 1.5;
        }
        
        @media (max-width: 768px) {
          .section-title {
            font-size: 2.2rem;
          }
          
          .achievements-stats {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
          }
          
          .achievement-highlight {
            flex-direction: column;
            text-align: center;
          }
          
          .tech-grid {
            grid-template-columns: 1fr;
          }
          
          .highlights-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

/**
 * 研发体系图组件 - 高性能优化版
 */
const ResearchSystemDiagram = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  
  useEffect(() => {
    // 检测用户是否偏好减少动画
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return (
    <div className="research-system-diagram animate-fadeIn animate-delay-200">
      <div className="diagram-container">
        {/* 简化的研发体系布局 */}
        <div className="diagram-grid">
          {/* 西安研发中心 */}
          <div className="research-center xian-center">
            <div className="center-header">
              <div className="center-icon">🏗️</div>
              <div className="center-info">
                                 <h3 className="center-title">西安研发中心</h3>
                 <div className="center-count">36+ 人员</div>
              </div>
            </div>
            <div className="departments-list">
              <div className="dept-item">
                <span className="dept-icon">🔧</span>
                <span className="dept-name">电子硬件部门</span>
                <span className="dept-count">8人</span>
              </div>
              <div className="dept-item">
                <span className="dept-icon">💻</span>
                <span className="dept-name">嵌入式软件部门</span>
                <span className="dept-count">12人</span>
              </div>
              <div className="dept-item">
                <span className="dept-icon">📱</span>
                <span className="dept-name">应用软件部门</span>
                <span className="dept-count">10人</span>
              </div>
            </div>
          </div>
          
          {/* 连接线 */}
          <div className="connection-bridge">
            <div className="bridge-line"></div>
            <div className="bridge-center">
              <div className="bridge-icon">🔗</div>
              <div className="bridge-text">协同研发</div>
            </div>
          </div>
          
          {/* 南京研发中心 */}
          <div className="research-center nanjing-center">
            <div className="center-header">
              <div className="center-icon">🔬</div>
              <div className="center-info">
                <h3 className="center-title">南京研发中心</h3>
                <div className="center-count">14+ 人员</div>
              </div>
            </div>
            <div className="departments-list">
              <div className="dept-item">
                <span className="dept-icon">🏗️</span>
                <span className="dept-name">结构与热仿真部门</span>
                <span className="dept-count">6人</span>
              </div>
              <div className="dept-item">
                <span className="dept-icon">🔬</span>
                <span className="dept-name">光学设计部门</span>
                <span className="dept-count">8人</span>
              </div>
            </div>
          </div>
        </div>
        
                 {/* 统计概览 */}
         <div className="diagram-summary">
           <div className="summary-item">
             <div className="summary-number">50+</div>
             <div className="summary-label">研发人员</div>
           </div>
          <div className="summary-divider"></div>
          <div className="summary-item">
            <div className="summary-number">5</div>
            <div className="summary-label">核心部门</div>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-item">
            <div className="summary-number">2</div>
            <div className="summary-label">研发中心</div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .research-system-diagram {
          margin: 4rem 0;
          position: relative;
        }
        
        .diagram-container {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(59, 130, 246, 0.15);
          border-radius: 20px;
          padding: 2.5rem;
          /* 移除 backdrop-filter 以提升性能 */
          /* backdrop-filter: blur(10px); */
        }
        
        /* 高性能网格布局 */
        .diagram-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 2rem;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .research-center {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.05) 0%, 
            rgba(59, 130, 246, 0.08) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
          transition: transform 0.3s ease, border-color 0.3s ease;
          will-change: transform;
        }
        
        .research-center:hover {
          transform: translateY(-3px);
          border-color: rgba(59, 130, 246, 0.3);
        }
        
        .center-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .center-icon {
          font-size: 2.5rem;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.2) 0%, 
            rgba(147, 197, 253, 0.2) 100%);
          padding: 0.8rem;
          border-radius: 50%;
          border: 2px solid rgba(59, 130, 246, 0.3);
        }
        
        .center-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 0.3rem;
        }
        
        .center-count {
          font-size: 0.9rem;
          color: rgba(59, 130, 246, 0.9);
          font-weight: 500;
        }
        
        .departments-list {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        
        .dept-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.8rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          transition: all 0.2s ease;
        }
        
        .dept-item:hover {
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.2);
        }
        
        .dept-icon {
          font-size: 1.2rem;
          flex-shrink: 0;
        }
        
        .dept-name {
          flex: 1;
          color: #fff;
          font-size: 0.9rem;
          font-weight: 500;
        }
        
        .dept-count {
          color: rgba(59, 130, 246, 1);
          font-weight: 600;
          font-size: 0.8rem;
          background: rgba(59, 130, 246, 0.2);
          padding: 0.2rem 0.6rem;
          border-radius: 12px;
        }
        
        /* 连接桥样式 */
        .connection-bridge {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        
        .bridge-line {
          width: 2px;
          height: 60px;
          background: linear-gradient(180deg, 
            rgba(59, 130, 246, 0.8) 0%, 
            rgba(147, 197, 253, 1) 50%, 
            rgba(59, 130, 246, 0.8) 100%);
          border-radius: 1px;
          margin: 0.5rem 0;
        }
        
        .bridge-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 20px;
          padding: 0.8rem 1.2rem;
        }
        
        .bridge-icon {
          font-size: 1.5rem;
        }
        
        .bridge-text {
          font-size: 0.8rem;
          color: rgba(59, 130, 246, 1);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        /* 统计概览 */
        .diagram-summary {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          margin-top: 1rem;
        }
        
        .summary-item {
          text-align: center;
        }
        
        .summary-number {
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.3rem;
        }
        
        .summary-label {
          font-size: 0.8rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 500;
        }
        
        .summary-divider {
          width: 1px;
          height: 40px;
          background: rgba(255, 255, 255, 0.2);
        }
        
        /* 响应式设计 - 移动端优化 */
        @media (max-width: 992px) {
          .diagram-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .connection-bridge {
            order: 2;
            transform: rotate(90deg);
            margin: 1rem 0;
          }
          
          .bridge-line {
            width: 60px;
            height: 2px;
          }
          
          .research-center {
            order: 1;
          }
          
          .nanjing-center {
            order: 3;
          }
        }
        
        @media (max-width: 768px) {
          .diagram-container {
            padding: 1.5rem;
          }
          
          .center-header {
            flex-direction: column;
            text-align: center;
            gap: 0.8rem;
          }
          
          .center-icon {
            font-size: 2rem;
          }
          
          .center-title {
            font-size: 1.1rem;
          }
          
          .dept-item {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
          }
          
          .dept-name {
            text-align: center;
          }
          
          .diagram-summary {
            flex-direction: column;
            gap: 1rem;
          }
          
          .summary-divider {
            width: 40px;
            height: 1px;
          }
        }
        
        /* 减少动画偏好的用户优化 */
        @media (prefers-reduced-motion: reduce) {
          .research-center {
            transition: none;
          }
          
          .research-center:hover {
            transform: none;
          }
          
          .dept-item {
            transition: none;
          }
        }
        
        .center-icon {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }
        
        .center-text {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .center-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .center-subtitle {
          font-size: 0.9rem;
          color: rgba(59, 130, 246, 1);
          font-weight: 500;
          margin-top: 0.2rem;
        }
        
        .center-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, 
            rgba(59, 130, 246, 0.2) 0%, 
            transparent 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: glow 4s ease-in-out infinite;
          z-index: -1;
        }
        
        @keyframes glow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        }
        
        /* 连接线 */
        .connection-lines {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 2px;
          z-index: 5;
        }
        
        .connection-line {
          position: absolute;
          height: 3px;
          background: linear-gradient(90deg, 
            rgba(59, 130, 246, 0.8) 0%, 
            rgba(147, 197, 253, 1) 50%, 
            rgba(59, 130, 246, 0.8) 100%);
          border-radius: 2px;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }
        
        .left-line {
          left: 0;
          width: calc(50% - 70px);
          transform-origin: right;
        }
        
        .right-line {
          right: 0;
          width: calc(50% - 70px);
          transform-origin: left;
        }
        
        .pulse-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          background: rgba(147, 197, 253, 1);
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
          box-shadow: 0 0 15px rgba(147, 197, 253, 0.8);
          animation: pulse 2s ease-in-out infinite;
        }
        
        .left-pulse {
          animation: pulseLeft 3s ease-in-out infinite;
        }
        
        .right-pulse {
          animation: pulseRight 3s ease-in-out infinite;
        }
        
        @keyframes pulseLeft {
          0% { left: 100%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 0%; opacity: 0; }
        }
        
        @keyframes pulseRight {
          0% { right: 100%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { right: 0%; opacity: 0; }
        }
        
        /* 研发中心分支 */
        .diagram-branches {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .branch {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
        
        .branch-xian {
          left: 0;
        }
        
        .branch-nanjing {
          right: 0;
        }
        
        .branch-circle {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.08) 0%, 
            rgba(59, 130, 246, 0.15) 100%);
          border: 2px solid rgba(59, 130, 246, 0.3);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          position: relative;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        
        .branch-circle:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
          border-color: rgba(59, 130, 246, 0.5);
        }
        
        .branch-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        
        .branch-text {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .branch-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .branch-subtitle {
          font-size: 0.8rem;
          color: rgba(59, 130, 246, 1);
          font-weight: 500;
          margin-top: 0.2rem;
        }
        
        .branch-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          z-index: -1;
          animation: branchGlow 5s ease-in-out infinite;
        }
        
        .xian-glow {
          background: radial-gradient(circle, 
            rgba(34, 197, 94, 0.15) 0%, 
            transparent 70%);
        }
        
        .nanjing-glow {
          background: radial-gradient(circle, 
            rgba(168, 85, 247, 0.15) 0%, 
            transparent 70%);
        }
        
        @keyframes branchGlow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
        }
        
        /* 部门卡片 */
        .branch-departments {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        
        .branch-xian .branch-departments {
          right: 140px;
          align-items: flex-end;
        }
        
        .branch-nanjing .branch-departments {
          left: 140px;
          align-items: flex-start;
        }
        
        .department-card {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.08) 0%, 
            rgba(255, 255, 255, 0.12) 100%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 0.8rem 1.2rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 0.85rem;
          white-space: nowrap;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          min-width: 160px;
        }
        
        .department-card:hover {
          transform: translateX(${() => Math.random() > 0.5 ? '5px' : '-5px'});
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.15) 0%, 
            rgba(255, 255, 255, 0.15) 100%);
          border-color: rgba(59, 130, 246, 0.4);
        }
        
        .dept-icon {
          font-size: 1.2rem;
          flex-shrink: 0;
        }
        
        .dept-name {
          flex: 1;
          color: #fff;
          font-weight: 500;
        }
        
        .dept-count {
          color: rgba(59, 130, 246, 1);
          font-weight: 600;
          font-size: 0.8rem;
          background: rgba(59, 130, 246, 0.2);
          padding: 0.2rem 0.5rem;
          border-radius: 8px;
        }
        
        /* 统计气泡 */
        .diagram-stats {
          position: absolute;
          top: 10px;
          right: 10px;
          display: flex;
          gap: 1rem;
        }
        
        .stat-bubble {
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.2) 0%, 
            rgba(147, 197, 253, 0.2) 100%);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 20px;
          padding: 0.8rem 1.2rem;
          text-align: center;
          backdrop-filter: blur(10px);
          animation: float 6s ease-in-out infinite;
        }
        
        .stat-1 {
          animation-delay: 0s;
        }
        
        .stat-2 {
          animation-delay: 3s;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .stat-number {
          font-size: 1.2rem;
          font-weight: 700;
          color: rgba(59, 130, 246, 1);
          margin-bottom: 0.2rem;
        }
        
        .stat-label {
          font-size: 0.7rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        /* 响应式设计 */
        @media (max-width: 992px) {
          .diagram-container {
            height: 700px;
            padding: 1.5rem;
          }
          
          .branch {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }
          
          .branch-xian {
            top: 20%;
          }
          
          .branch-nanjing {
            top: 80%;
          }
          
          .connection-lines {
            transform: translate(-50%, -50%) rotate(90deg);
          }
          
          .branch-departments {
            position: absolute;
            top: 140px;
            left: 50%;
            transform: translateX(-50%);
            align-items: center !important;
            width: 100%;
            max-width: 300px;
          }
          
          .branch-xian .branch-departments,
          .branch-nanjing .branch-departments {
            left: 50%;
            right: auto;
          }
          
          .diagram-stats {
            position: relative;
            top: auto;
            right: auto;
            justify-content: center;
            margin-top: 2rem;
          }
        }
        
        @media (max-width: 768px) {
          .diagram-container {
            height: 600px;
            padding: 1rem;
          }
          
          .center-circle {
            width: 100px;
            height: 100px;
          }
          
          .center-icon {
            font-size: 2rem;
          }
          
          .center-title {
            font-size: 1rem;
          }
          
          .branch-circle {
            width: 90px;
            height: 90px;
          }
          
          .branch-icon {
            font-size: 1.5rem;
          }
          
          .branch-title {
            font-size: 0.9rem;
          }
          
          .department-card {
            font-size: 0.8rem;
            padding: 0.6rem 1rem;
            min-width: 140px;
          }
        }
      `}</style>
    </div>
  );
};

/**
 * 公司组织页面 - 全面升级版
 */
const OrganizationPage = () => {
  // 研发统计数据
  const researchStats = [
    { icon: "🏢", number: "2", label: "研发中心", description: "西安·南京双城布局" },
    { icon: "👥", number: "50+", label: "研发团队", description: "专业技术人员" },
    { icon: "🔬", number: "5", label: "核心部门", description: "专业技术团队" },
    { icon: "📊", number: "100+", label: "研发项目", description: "累计技术项目" }
  ];

  // 核心团队成员数据
  const teamMembers = [
    {
      name: "张博士",
      position: "技术总监",
      department: "研发中心",
      expertise: ["光纤通信", "系统架构", "团队管理"],
      avatar: "👨‍💼"
    },
    {
      name: "李工程师",
      position: "硬件总工",
      department: "电子硬件部门",
      expertise: ["电路设计", "FPGA", "嵌入式"],
      avatar: "👨‍💻"
    },
    {
      name: "王研究员",
      position: "算法专家",
      department: "应用软件部门",
      expertise: ["机器学习", "算法优化", "数据分析"],
      avatar: "👩‍🔬"
    },
    {
      name: "陈工程师",
      position: "光学专家",
      department: "光学设计部门",
      expertise: ["光学仿真", "精密光学", "系统设计"],
      avatar: "👨‍🔬"
    }
  ];

  // 部门数据增强
  const enhancedDepartments = RESEARCH_DEPARTMENTS.map((dept, index) => ({
    ...dept,
    icon: ["🔧", "💻", "📱", "🏗️", "🔬"][index],
    teamSize: ["8人", "12人", "10人", "6人", "8人"][index],
    keyProjects: ["3个", "5个", "4个", "2个", "3个"][index]
  }));

  return (
    <Layout title="EEnous - 研发体系与技术成果">
      <div className="organization-page">
        {/* 优化的粒子背景 - 减少粒子数量 */}
        <div className="particles-bg">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        
        {/* 渐变叠加层 */}
        <div className="gradient-overlay"></div>
        
        <div className="page-content">
          {/* 英雄区域 */}
          <div className="hero-section">
            <div className="hero-badge animate-fadeIn">🚀 创新驱动</div>
            <h1 className="page-title animate-fadeIn animate-delay-100">
              研发体系与技术成果
            </h1>
            <div className="title-divider animate-fadeIn animate-delay-200"></div>
            <p className="page-subtitle animate-fadeIn animate-delay-300">
              以双城研发中心为核心，构建了完整的技术创新体系。汇聚顶尖人才，专注前沿技术突破，
              在光纤通信、工业物联网、精密测量等关键领域实现了重要技术突破和产业化应用。
            </p>
          </div>

          {/* 研发统计数据 */}
          <div className="research-stats-section">
            <div className="stats-grid">
              {researchStats.map((stat, index) => (
                <AnimatedStatsCard
                  key={index}
                  icon={stat.icon}
                  number={stat.number}
                  label={stat.label}
                  description={stat.description}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* 研发体系图 */}
          <div className="system-diagram-section">
            <div className="section-header">
              <div className="section-badge">🏗️ 组织架构</div>
              <h2 className="section-title">研发体系布局</h2>
              <div className="section-divider"></div>
            </div>
            <ResearchSystemDiagram />
          </div>

          {/* 研发部门详情 */}
          <div className="departments-section">
            <div className="section-header">
              <div className="section-badge">🎯 专业团队</div>
              <h2 className="section-title">五大核心部门</h2>
              <div className="section-divider"></div>
              <p className="section-desc">
                建立了覆盖硬件、软件、结构、光学等全技术链的专业研发团队，
                为产品创新和技术突破提供强有力的支撑。
              </p>
            </div>
            <div className="departments-grid">
              {enhancedDepartments.map((department, index) => (
                <DepartmentCard 
                  key={index}
                  name={department.name}
                  location={department.location}
                  description={department.description}
                  icon={department.icon}
                  teamSize={department.teamSize}
                  keyProjects={department.keyProjects}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* 核心团队 */}
          <div className="team-section">
            <div className="section-header">
              <div className="section-badge">👑 核心力量</div>
              <h2 className="section-title">技术领军人才</h2>
              <div className="section-divider"></div>
              <p className="section-desc">
                汇聚行业资深专家和技术领军人才，在各自专业领域具有深厚造诣和丰富经验。
              </p>
            </div>
            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <TeamMemberCard
                  key={index}
                  name={member.name}
                  position={member.position}
                  department={member.department}
                  expertise={member.expertise}
                  avatar={member.avatar}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* 技术成果 */}
          <TechAchievements />

          {/* CTA区域 */}
          <div className="cta-section">
            <div className="cta-content">
              <div className="cta-icon">🤝</div>
              <h3 className="cta-title">加入我们的技术团队</h3>
              <p className="cta-desc">
                我们正在寻找具有创新精神的技术人才，共同推动光纤通信和工业物联网技术的发展
              </p>
              <div className="cta-buttons">
                <Link href="/join-us" className="cta-btn primary">
                  查看职位
                </Link>
                <Link href="/tech-cooperation" className="cta-btn secondary">
                  技术合作
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .organization-page {
          min-height: 100vh;
          position: relative;
          background: radial-gradient(ellipse at center, 
            rgba(0, 0, 0, 0.9) 0%, 
            rgba(0, 0, 0, 1) 100%);
          /* 启用硬件加速 */
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        
        .particles-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -2;
          overflow: hidden;
        }
        
        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(59, 130, 246, 0.4);
          border-radius: 50%;
          animation: float 30s infinite linear;
          will-change: transform;
        }
        
        .particle:nth-child(1) {
          left: 20%;
          animation-delay: 0s;
          animation-duration: 25s;
        }
        
        .particle:nth-child(2) {
          left: 50%;
          animation-delay: 10s;
          animation-duration: 30s;
        }
        
        .particle:nth-child(3) {
          left: 80%;
          animation-delay: 20s;
          animation-duration: 35s;
        }
        
        @keyframes float {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) scale(1);
            opacity: 0;
          }
        }
        
        .gradient-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, 
            rgba(59, 130, 246, 0.03) 0%, 
            rgba(0, 0, 0, 0.7) 50%, 
            rgba(59, 130, 246, 0.03) 100%);
          z-index: -1;
        }
        
        .page-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 120px 2rem 5rem;
        }
        
        .hero-section {
          text-align: center;
          margin-bottom: 6rem;
          padding: 0 2rem;
        }
        
        .hero-badge {
          display: inline-block;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.2) 0%, 
            rgba(147, 197, 253, 0.2) 100%);
          color: rgba(59, 130, 246, 1);
          padding: 0.8rem 2rem;
          border-radius: 25px;
          font-size: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          border: 2px solid rgba(59, 130, 246, 0.3);
          margin-bottom: 2rem;
        }
        
        .page-title {
          font-size: 4rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 3px;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 1) 0%, 
            rgba(59, 130, 246, 1) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .title-divider {
          width: 120px;
          height: 4px;
          background: linear-gradient(90deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          margin: 0 auto 2rem;
          border-radius: 2px;
        }
        
        .page-subtitle {
          font-size: 1.3rem;
          line-height: 1.8;
          color: #cbd5e1;
          max-width: 900px;
          margin: 0 auto;
        }
        
        .research-stats-section {
          margin-bottom: 6rem;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        
        .section-badge {
          display: inline-block;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.2) 0%, 
            rgba(147, 197, 253, 0.2) 100%);
          color: rgba(59, 130, 246, 1);
          padding: 0.5rem 1.5rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          border: 1px solid rgba(59, 130, 246, 0.3);
          margin-bottom: 1.5rem;
        }
        
        .section-title {
          font-size: 2.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 1) 0%, 
            rgba(59, 130, 246, 1) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .section-divider {
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          margin: 0 auto 1.5rem;
          border-radius: 2px;
        }
        
        .section-desc {
          font-size: 1.1rem;
          color: #94a3b8;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }
        
        .system-diagram-section {
          margin-bottom: 6rem;
        }
        
        .departments-section {
          margin-bottom: 6rem;
        }
        
        .departments-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 2.5rem;
        }
        
        .team-section {
          margin-bottom: 6rem;
        }
        
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
        
        .cta-section {
          margin-top: 6rem;
          text-align: center;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.05) 0%, 
            rgba(147, 197, 253, 0.05) 100%);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 30px;
          padding: 4rem 2rem;
          backdrop-filter: blur(20px);
        }
        
        .cta-content {
          max-width: 600px;
          margin: 0 auto;
        }
        
        .cta-icon {
          font-size: 4rem;
          margin-bottom: 1.5rem;
        }
        
        .cta-title {
          font-size: 2.2rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 1rem;
        }
        
        .cta-desc {
          font-size: 1.1rem;
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 2.5rem;
        }
        
        .cta-buttons {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .cta-btn {
          padding: 1rem 2.5rem;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          position: relative;
          overflow: hidden;
        }
        
        .cta-btn.primary {
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          color: #000;
        }
        
        .cta-btn.primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(59, 130, 246, 0.4);
        }
        
        .cta-btn.secondary {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          border-color: rgba(59, 130, 246, 0.5);
        }
        
        .cta-btn.secondary:hover {
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 1);
          transform: translateY(-3px);
        }
        
        @media (max-width: 768px) {
          .page-title {
            font-size: 2.8rem;
          }
          
          .page-subtitle {
            font-size: 1.1rem;
          }
          
          .section-title {
            font-size: 2.2rem;
          }
          
          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }
          
          .departments-grid {
            grid-template-columns: 1fr;
          }
          
          .team-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .cta-btn {
            width: 200px;
          }
        }
      `}</style>
    </Layout>
  );
};

export default OrganizationPage; 