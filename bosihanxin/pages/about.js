import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

/**
 * 高科技统计卡片组件 - SpaceX风格
 */
const TechStatsCard = ({ icon, number, label, description, index }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  const animationRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const target = parseInt(number);
    const duration = 2000;
    const startTime = performance.now();

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentValue = Math.floor(target * easedProgress);

      setCount(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, number]);
  
  return (
    <div 
      ref={cardRef}
      className={`tech-stats-card animate-fadeIn animate-delay-${index * 100}`}
    >
      <div className="card-glow"></div>
      <div className="card-border"></div>
      
      <div className="stats-header">
        <div className="stats-icon-container">
          <div className="icon-glow"></div>
      <div className="stats-icon">{icon}</div>
        </div>
        <div className="stats-pulse"></div>
      </div>
      
      <div className="stats-content">
        <div className="stats-number-container">
        <div className="stats-number">{count}{number.includes('+') ? '+' : ''}</div>
          <div className="number-trail"></div>
        </div>
        <div className="stats-label">{label}</div>
        <div className="stats-desc">{description}</div>
      </div>
      
      <div className="card-footer">
        <div className="progress-line"></div>
        <div className="status-indicator"></div>
      </div>
      
      <style jsx>{`
        .tech-stats-card {
          background: linear-gradient(135deg, 
            rgba(0, 0, 0, 0.8) 0%, 
            rgba(15, 23, 42, 0.9) 50%,
            rgba(0, 0, 0, 0.8) 100%);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 24px;
          padding: 2.5rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          transform: translateZ(0);
          backface-visibility: hidden;
          will-change: transform;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, 
            rgba(59, 130, 246, 0.1) 0%, 
            transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        
        .card-border {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 24px;
          padding: 2px;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.4) 0%, 
            transparent 50%, 
            rgba(147, 197, 253, 0.4) 100%);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: subtract;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        
        .tech-stats-card:hover {
          transform: translateY(-12px) translateZ(0);
          border-color: rgba(59, 130, 246, 0.6);
          box-shadow: 
            0 25px 50px rgba(59, 130, 246, 0.15),
            0 0 0 1px rgba(59, 130, 246, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .tech-stats-card:hover .card-glow {
          opacity: 1;
        }
        
        .tech-stats-card:hover .card-border {
          opacity: 1;
        }
        
        .stats-header {
          position: relative;
          margin-bottom: 2rem;
        }
        
        .stats-icon-container {
          position: relative;
          display: inline-block;
        }
        
        .icon-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, 
            rgba(59, 130, 246, 0.3) 0%, 
            transparent 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: iconPulse 3s ease-in-out infinite;
        }
        
        @keyframes iconPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        }
        
        .stats-icon {
          font-size: 3.5rem;
          position: relative;
          z-index: 2;
          filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.5));
        }
        
        .stats-pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100px;
          height: 100px;
          border: 2px solid rgba(59, 130, 246, 0.3);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: pulse 4s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1); 
            opacity: 1;
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.5); 
            opacity: 0;
          }
        }
        
        .stats-number-container {
          position: relative;
          margin-bottom: 1rem;
        }
        
        .stats-number {
          font-size: 4rem;
          font-weight: 800;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 50%,
            rgba(59, 130, 246, 1) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
          position: relative;
          z-index: 2;
        }
        
        .number-trail {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.2) 0%, 
            transparent 100%);
          border-radius: 12px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .tech-stats-card:hover .number-trail {
          opacity: 1;
        }
        
        .stats-label {
          font-size: 1.3rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }
        
        .stats-desc {
          font-size: 1rem;
          color: #94a3b8;
          line-height: 1.6;
          font-weight: 400;
        }
        
        .card-footer {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
          overflow: hidden;
          border-radius: 0 0 24px 24px;
        }
        
        .progress-line {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 100%;
          background: linear-gradient(90deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          width: 0%;
          transition: width 2s cubic-bezier(0.4, 0, 0.2, 1) 0.5s;
        }
        
        .tech-stats-card:hover .progress-line {
          width: 100%;
        }
        
        .status-indicator {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 12px;
          height: 12px;
          background: rgba(34, 197, 94, 1);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
          animation: statusBlink 2s ease-in-out infinite;
        }
        
        @keyframes statusBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .tech-stats-card,
          .icon-glow,
          .stats-pulse,
          .progress-line,
          .status-indicator {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </div>
  );
};

/**
 * 科技价值观卡片 - 未来风格
 */
const TechValueCard = ({ title, description, icon, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`tech-value-card animate-fadeIn animate-delay-${index * 150}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="value-bg-grid"></div>
      <div className="value-border-glow"></div>
      
      <div className="value-header">
        <div className="value-icon-wrapper">
          <div className="icon-orbit"></div>
        <div className="value-icon">{icon}</div>
      </div>
        <div className="value-signal"></div>
      </div>
      
      <div className="value-content">
        <h3 className="value-title">{title}</h3>
        <div className="value-divider">
          <div className="divider-line"></div>
          <div className="divider-dot"></div>
          <div className="divider-line"></div>
        </div>
        <p className="value-description">{description}</p>
      </div>
      
      <div className="value-footer">
        <div className="tech-pattern"></div>
      </div>
      
      <style jsx>{`
        .tech-value-card {
          background: linear-gradient(135deg, 
            rgba(0, 0, 0, 0.9) 0%, 
            rgba(15, 23, 42, 0.8) 50%,
            rgba(0, 0, 0, 0.9) 100%);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 24px;
          padding: 3rem 2.5rem;
          position: relative;
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
          transform: translateZ(0);
          backface-visibility: hidden;
          will-change: transform;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .value-bg-grid {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px);
          background-size: 20px 20px;
          opacity: ${isHovered ? '1' : '0'};
          transition: opacity 0.4s ease;
        }
        
        .value-border-glow {
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.6) 0%, 
            rgba(147, 197, 253, 0.6) 50%,
            rgba(59, 130, 246, 0.6) 100%);
          border-radius: 26px;
          opacity: ${isHovered ? '1' : '0'};
          filter: blur(8px);
          transition: opacity 0.4s ease;
          z-index: -1;
        }
        
        .tech-value-card:hover {
          transform: translateY(-16px) translateZ(0);
          border-color: rgba(59, 130, 246, 0.6);
          box-shadow: 
            0 32px 64px rgba(59, 130, 246, 0.15),
            0 0 0 1px rgba(59, 130, 246, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .value-header {
          position: relative;
          text-align: center;
          margin-bottom: 2.5rem;
        }
        
        .value-icon-wrapper {
          position: relative;
          display: inline-block;
        }
        
        .icon-orbit {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 120px;
          height: 120px;
          border: 2px solid rgba(59, 130, 246, 0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: orbit 8s linear infinite;
        }
        
        .icon-orbit::before {
          content: '';
          position: absolute;
          top: -4px;
          left: 50%;
          width: 8px;
          height: 8px;
          background: rgba(59, 130, 246, 1);
          border-radius: 50%;
          transform: translateX(-50%);
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.8);
        }
        
        @keyframes orbit {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        .value-icon {
          font-size: 4rem;
          position: relative;
          z-index: 2;
          filter: drop-shadow(0 0 25px rgba(59, 130, 246, 0.6));
          animation: float 4s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        .value-signal {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 20px;
          height: 20px;
        }
        
        .value-signal::before,
        .value-signal::after {
          content: '';
          position: absolute;
          border: 2px solid rgba(34, 197, 94, 0.8);
          border-radius: 50%;
          animation: signal 2s ease-in-out infinite;
        }
        
        .value-signal::before {
          width: 100%;
          height: 100%;
        }
        
        .value-signal::after {
          width: 140%;
          height: 140%;
          top: -20%;
          left: -20%;
          animation-delay: 0.5s;
        }
        
        @keyframes signal {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        
        .value-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          text-align: center;
        }
        
        .value-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: #fff;
          margin: 0 0 1.5rem 0;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        }
        
        .value-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
          gap: 1rem;
        }
        
        .divider-line {
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(59, 130, 246, 0.8) 50%, 
            transparent 100%);
        }
        
        .divider-dot {
          width: 8px;
          height: 8px;
          background: rgba(59, 130, 246, 1);
          border-radius: 50%;
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.8);
          animation: dotPulse 3s ease-in-out infinite;
        }
        
        @keyframes dotPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.5); }
        }
        
        .value-description {
          color: #94a3b8;
          line-height: 1.8;
          margin: 0;
          flex: 1;
          font-size: 1.1rem;
          font-weight: 400;
        }
        
        .value-footer {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60px;
          overflow: hidden;
        }
        
        .tech-pattern {
          position: absolute;
          bottom: -30px;
          left: -50px;
          right: -50px;
          height: 100px;
          background: linear-gradient(45deg, 
            transparent 30%, 
            rgba(59, 130, 246, 0.1) 50%, 
            transparent 70%);
          transform: skew(-12deg);
          opacity: ${isHovered ? '1' : '0'};
          transition: opacity 0.4s ease;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .tech-value-card,
          .icon-orbit,
          .value-icon,
          .value-signal,
          .divider-dot {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </div>
  );
};

/**
 * 科技时间线组件 - 未来风格
 */
const TechTimelineItem = ({ year, title, description, icon, index, isLast }) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={itemRef}
      className={`tech-timeline-item ${isVisible ? 'visible' : ''}`}
    >
      <div className="timeline-connector">
        <div className="year-badge">
          <div className="year-glow"></div>
          <span className="year-text">{year}</span>
        </div>
        
        <div className="timeline-node">
          <div className="node-rings">
            <div className="ring ring-1"></div>
            <div className="ring ring-2"></div>
            <div className="ring ring-3"></div>
          </div>
          <div className="node-icon">{icon}</div>
      </div>
      
        {!isLast && (
          <div className="timeline-line">
            <div className="line-progress"></div>
            <div className="line-particles">
              <div className="particle particle-1"></div>
              <div className="particle particle-2"></div>
              <div className="particle particle-3"></div>
            </div>
          </div>
        )}
      </div>
      
      <div className="timeline-content">
        <div className="content-card">
          <div className="card-header">
            <h3 className="timeline-title">{title}</h3>
            <div className="status-indicator">
              <div className="status-dot"></div>
              <span className="status-text">完成</span>
            </div>
          </div>
          
          <div className="content-divider"></div>
          
          <p className="timeline-description">{description}</p>
          
          <div className="card-footer">
            <div className="tech-lines">
              <div className="tech-line"></div>
              <div className="tech-line"></div>
              <div className="tech-line"></div>
          </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .tech-timeline-item {
          display: flex;
          margin-bottom: 4rem;
          position: relative;
          opacity: 0;
          transform: translateX(-50px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, opacity;
        }
        
        .tech-timeline-item.visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        .tech-timeline-item:nth-child(even) {
          flex-direction: row-reverse;
        }
        
        .tech-timeline-item:nth-child(even) .timeline-content {
          padding-right: 0;
          padding-left: 3rem;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .tech-timeline-item {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
        
        .timeline-connector {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          min-width: 200px;
        }
        
        .year-badge {
          position: relative;
          background: linear-gradient(135deg, 
            rgba(0, 0, 0, 0.9) 0%, 
            rgba(15, 23, 42, 0.9) 100%);
          border: 2px solid rgba(59, 130, 246, 0.5);
          border-radius: 20px;
          padding: 0.8rem 1.5rem;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
          overflow: hidden;
        }
        
        .year-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.1) 0%, 
            rgba(147, 197, 253, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .year-badge:hover .year-glow {
          opacity: 1;
        }
        
        .year-text {
          position: relative;
          z-index: 2;
          font-size: 1.2rem;
          font-weight: 800;
          color: rgba(59, 130, 246, 1);
          text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }
        
        .timeline-node {
          position: relative;
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, 
            rgba(0, 0, 0, 0.9) 0%, 
            rgba(15, 23, 42, 0.9) 100%);
          border: 3px solid rgba(59, 130, 246, 0.6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
          box-shadow: 
            0 0 30px rgba(59, 130, 246, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .node-rings {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        .ring {
          position: absolute;
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 50%;
          animation: ripple 4s ease-in-out infinite;
        }
        
        .ring-1 {
          width: 100px;
          height: 100px;
          top: -50px;
          left: -50px;
          animation-delay: 0s;
        }
        
        .ring-2 {
          width: 120px;
          height: 120px;
          top: -60px;
          left: -60px;
          animation-delay: 1s;
        }
        
        .ring-3 {
          width: 140px;
          height: 140px;
          top: -70px;
          left: -70px;
          animation-delay: 2s;
        }
        
        @keyframes ripple {
          0%, 100% { 
            transform: scale(1); 
            opacity: 1; 
          }
          50% { 
            transform: scale(1.5); 
            opacity: 0; 
          }
        }
        
        .node-icon {
          font-size: 2rem;
          z-index: 2;
          filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.8));
          animation: iconRotate 6s ease-in-out infinite;
        }
        
        @keyframes iconRotate {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
        }
        
        .timeline-line {
          position: relative;
          width: 4px;
          height: 120px;
          background: linear-gradient(180deg, 
            rgba(59, 130, 246, 0.8) 0%, 
            rgba(59, 130, 246, 0.3) 100%);
          border-radius: 2px;
          overflow: hidden;
        }
        
        .line-progress {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 0%;
          background: linear-gradient(180deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          animation: lineProgress 3s ease-out forwards;
          animation-delay: 1s;
        }
        
        @keyframes lineProgress {
          from { height: 0%; }
          to { height: 100%; }
        }
        
        .line-particles {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 100%;
        }
        
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(59, 130, 246, 1);
          border-radius: 50%;
          animation: particleMove 3s ease-in-out infinite;
        }
        
        .particle-1 {
          animation-delay: 0s;
        }
        
        .particle-2 {
          animation-delay: 1s;
        }
        
        .particle-3 {
          animation-delay: 2s;
        }
        
        @keyframes particleMove {
          0% { 
            top: 0%; 
          opacity: 0;
            transform: translateX(-50%) scale(0);
        }
          20% { 
            opacity: 1; 
            transform: translateX(-50%) scale(1);
          }
          80% { 
            opacity: 1;
            transform: translateX(-50%) scale(1);
          }
          100% { 
            top: 100%; 
            opacity: 0; 
            transform: translateX(-50%) scale(0);
          }
        }
        
        .timeline-content {
          flex: 1;
          padding-right: 3rem;
        }
        
        .content-card {
          background: linear-gradient(135deg, 
            rgba(0, 0, 0, 0.8) 0%, 
            rgba(15, 23, 42, 0.9) 50%,
            rgba(0, 0, 0, 0.8) 100%);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 20px;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .content-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(180deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          transform: scaleY(0);
          transition: transform 0.5s ease;
          transform-origin: top;
        }
        
        .content-card:hover {
          border-color: rgba(59, 130, 246, 0.5);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.1);
        }
        
        .content-card:hover::before {
          transform: scaleY(1);
        }
        
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }
        
        .timeline-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: #fff;
          margin: 0;
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
        }
        
        .status-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: 20px;
          padding: 0.4rem 1rem;
        }
        
        .status-dot {
          width: 8px;
          height: 8px;
          background: rgba(34, 197, 94, 1);
          border-radius: 50%;
          animation: statusPulse 2s ease-in-out infinite;
        }
        
        @keyframes statusPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
          50% { box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
        }
        
        .status-text {
          font-size: 0.8rem;
          color: rgba(34, 197, 94, 1);
          font-weight: 600;
        }
        
        .content-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, 
            rgba(59, 130, 246, 0.8) 0%, 
            transparent 50%,
            rgba(59, 130, 246, 0.8) 100%);
          margin-bottom: 1.5rem;
        }
        
        .timeline-description {
          color: #94a3b8;
          line-height: 1.8;
          margin: 0 0 2rem 0;
          font-size: 1.1rem;
        }
        
        .card-footer {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 40px;
          overflow: hidden;
        }
        
        .tech-lines {
          position: relative;
          height: 100%;
          display: flex;
          gap: 8px;
          align-items: flex-end;
          padding: 0 2.5rem 1rem;
        }
        
        .tech-line {
          flex: 1;
          height: 2px;
          background: linear-gradient(90deg, 
            rgba(59, 130, 246, 0.3) 0%, 
            rgba(59, 130, 246, 0.8) 50%,
            rgba(59, 130, 246, 0.3) 100%);
          animation: techLineGlow 3s ease-in-out infinite;
        }
        
        .tech-line:nth-child(2) {
          animation-delay: 1s;
        }
        
        .tech-line:nth-child(3) {
          animation-delay: 2s;
        }
        
        @keyframes techLineGlow {
          0%, 100% { opacity: 0.3; transform: scaleX(0.8); }
          50% { opacity: 1; transform: scaleX(1.2); }
        }
        
        @media (max-width: 1024px) {
          .tech-timeline-item {
            flex-direction: column !important;
            align-items: center;
            text-align: center;
          }
          
          .tech-timeline-item:nth-child(even) .timeline-content {
            padding-left: 0;
            padding-right: 0;
          }
          
          .timeline-content {
            padding-right: 0;
            margin-top: 2rem;
            width: 100%;
          }
          
          .timeline-line {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

/**
 * 关于我们页面主组件
 */
const AboutPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const videoRef = useRef(null);

  // 监听滚动和鼠标移动
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // 企业数据
  const companyStats = [
    {
      icon: "🏢",
      number: "2019",
      label: "成立年份",
      description: "从初创到行业领先的征程"
    },
    {
      icon: "🔬",
      number: "4+",
      label: "核心业务",
      description: "多元化创新技术矩阵"
    },
    {
      icon: "📈",
      number: "50+",
      label: "专利技术",
      description: "持续突破技术边界"
    },
    {
      icon: "🌟",
      number: "500+",
      label: "全球客户",
      description: "遍布世界的信任网络"
    }
  ];

  // 核心价值观
  const values = [
    {
      title: "创新驱动",
      description: "持续投入前沿技术研发，引领光纤通信和物联网技术革命，用突破性创新重新定义行业标准",
      icon: "⚡"
    },
    {
      title: "品质至上",
      description: "建立严格的质量管控体系，秉承精益求精的工匠精神，确保每一个产品都达到完美品质",
      icon: "💎"
    },
    {
      title: "客户导向",
      description: "深度洞察客户真实需求，提供定制化智能解决方案，成就客户商业价值的最大化释放",
      icon: "🎯"
    },
    {
      title: "未来思维",
      description: "前瞻性布局下一代技术，构建可持续发展的技术生态，引领行业向智能化未来演进",
      icon: "🚀"
    }
  ];
  
  // 发展历程 - 精简版
  const milestones = [
    {
      year: "2019",
      title: "创新起航",
      icon: "🌱",
      description: "南京玻丝焊芯科技有限公司正式成立，汇聚华为、中兴等顶尖企业精英团队，确立光纤通信和工业物联网双引擎发展战略。"
    },
    {
      year: "2020",
      title: "技术突破",
      icon: "🔬",
      description: "核心技术研发全面启动，建立世界级光学实验室，在保偏光纤熔接技术上取得关键性突破，申请首批核心发明专利。"
    },
    {
      year: "2021",
      title: "产品问世",
      icon: "⚡",
      description: "首款EF-100原型机成功研发，实现±0.3°超高精度对准。完成A轮融资2000万元，技术指标全面超越国际先进水平。"
    },
    {
      year: "2022",
      title: "市场征服",
      icon: "🚀",
      description: "EF-200正式商业化量产，成功打破日本技术垄断。EEnous IoT智能运维平台震撼发布，获得国家高新技术企业认证。"
    },
    {
      year: "2023",
      title: "AI赋能",
      icon: "🤖",
      description: "AI技术全面融入产品矩阵，EF-300引入深度学习算法。IoT平台2.0版本发布，集成数字孪生、边缘计算等前沿技术。"
    },
    {
      year: "2024",
      title: "全球扩张",
      icon: "🌍",
      description: "年销售收入突破8000万元，启动5000万元B轮融资。全面进军欧美高端市场，向全球光纤通信领域领导者迈进。"
    }
  ];
  
  return (
    <Layout title="EEnous - 关于我们">
      <div className="about-page">
        {/* 高科技背景系统 */}
        <div className="tech-background">
          <div className="grid-overlay"></div>
          <div className="floating-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          </div>
          <div 
            className="mouse-glow"
            style={{
              left: mousePosition.x - 150,
              top: mousePosition.y - 150
            }}
          ></div>
        </div>
        
        {/* 超级英雄区域 */}
        <section className="hero-section">
          <div className="container">
            <div className="hero-badge">
              <div className="badge-pulse"></div>
              <span className="badge-icon">⚡</span>
              <span>引领光纤通信与物联网技术革命</span>
            </div>
            
            <div className="section-header">
              <div className="section-line"></div>
              <h1 className="hero-title">关于我们</h1>
            <p className="hero-subtitle">
                南京玻丝焊芯科技有限公司 · TECHNOLOGY DRIVES THE FUTURE
            </p>
            </div>
            
            <div className="hero-content">
              <div className="company-showcase">
                <div className="showcase-header">
                  <div className="header-text">企业简介</div>
                </div>
                
                <div className="showcase-content">
                <p className="intro-text">
                    南京玻丝焊芯科技有限公司是一家专注于<span className="text-highlight">光纤通信</span>、
                    <span className="text-highlight">工业物联网</span>和<span className="text-highlight">精密仪器仪表</span>
                    领域的国家高新技术企业。我们致力于通过持续的技术创新突破，为全球客户提供世界级的产品和解决方案，
                    引领行业向智能化未来演进。
                </p>
                
                  <div className="tech-metrics">
                    <div className="metric-item">
                      <div className="metric-icon">🏆</div>
                      <div className="metric-content">
                        <div className="metric-label">国家高新技术企业</div>
                        <div className="metric-desc">技术创新领导者</div>
                  </div>
                  </div>
                    <div className="metric-item">
                      <div className="metric-icon">🔬</div>
                      <div className="metric-content">
                        <div className="metric-label">50+核心技术专利</div>
                        <div className="metric-desc">持续技术突破</div>
                      </div>
                    </div>
                    <div className="metric-item">
                      <div className="metric-icon">🌍</div>
                      <div className="metric-content">
                        <div className="metric-label">全球市场布局</div>
                        <div className="metric-desc">国际化战略</div>
                      </div>
                  </div>
                </div>
                
                  <div className="action-panel">
                    <Link href="/businesses" className="action-btn action-primary">
                      <span className="btn-text">探索业务矩阵</span>
                      <div className="btn-arrow">→</div>
                  </Link>
                    <Link href="/contact" className="action-btn action-secondary">
                      <span className="btn-text">联系我们</span>
                      <div className="btn-icon">📱</div>
                  </Link>
                  </div>
                </div>
              </div>
              
              <div className="video-showcase">
              <div className="video-container">
                <video ref={videoRef} autoPlay muted loop className="about-video">
                  <source src="/videos/second.mp4" type="video/mp4" />
                </video>
                <div className="video-overlay"></div>
                <div className="video-frame"></div>
                <div className="video-play-indicator">
                  <div className="play-icon">▶</div>
                </div>
                  
                  {/* 科技装饰元素 */}
                  <div className="video-tech-overlay">
                    <div className="tech-corner tech-corner-tl"></div>
                    <div className="tech-corner tech-corner-tr"></div>
                    <div className="tech-corner tech-corner-bl"></div>
                    <div className="tech-corner tech-corner-br"></div>
                  </div>
                </div>
                
                <div className="video-info">
                  <div className="info-header">
                    <h3 className="video-title">企业宣传片</h3>
                    <p className="video-description">
                      了解我们的技术实力与企业文化
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* 统计数据区域 */}
        <section className="stats-section">
          <div className="container">
            <div className="section-header">
              <div className="section-badge">核心数据</div>
              <h2 className="section-title">企业实力展示</h2>
              <p className="section-subtitle">用数据说话，见证我们的成长与实力</p>
            </div>
            
            <div className="stats-grid">
              {companyStats.map((stat, index) => (
                <TechStatsCard 
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
        </section>
        
        {/* 企业价值观 */}
        <section className="values-section">
          <div className="container">
            <div className="section-header">
              <div className="section-badge">企业文化</div>
              <h2 className="section-title">核心价值观</h2>
              <p className="section-subtitle">指导我们前行的核心理念与价值准则</p>
            </div>
            
            <div className="values-grid">
              {values.map((value, index) => (
                <TechValueCard 
                  key={index}
                  title={value.title}
                  description={value.description}
                  icon={value.icon}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 发展历程 */}
        <section className="timeline-section">
          <div className="container">
            <div className="section-header">
              <div className="section-badge">企业历程</div>
              <h2 className="section-title">发展历程</h2>
              <p className="section-subtitle">见证我们从初创企业到行业领军者的成长之路</p>
            </div>
            
            <div className="timeline-container">
              {milestones.map((milestone, index) => (
                <TechTimelineItem 
                  key={index}
                  year={milestone.year}
                  title={milestone.title}
                  description={milestone.description}
                  icon={milestone.icon}
                  index={index}
                  isLast={index === milestones.length - 1}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        /* 基础样式 */
        .about-page {
          width: 100%;
          min-height: 100vh;
          background: #000;
          position: relative;
          overflow-x: hidden;
        }
        
        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 3rem;
          position: relative;
          z-index: 2;
        }
        
        /* 高科技背景系统 */
        .tech-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
        }
        
        .grid-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(rgba(0, 0, 0, 0.5) 1px, transparent 1px),
                      radial-gradient(rgba(0, 0, 0, 0.5) 1px, transparent 1px);
          background-size: 20px 20px;
          opacity: 0.1;
          pointer-events: none;
        }
        
        .floating-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          overflow: hidden;
        }
        
        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: rgba(59, 130, 246, 0.4);
          border-radius: 50%;
          animation: float 30s infinite linear;
          will-change: transform;
          transform: translateZ(0);
        }
        
        @keyframes float {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
            opacity: 0.4;
          }
          33% {
            transform: translate3d(-10px, -15px, 0) rotate(120deg);
            opacity: 0.8;
          }
          66% {
            transform: translate3d(10px, -10px, 0) rotate(240deg);
            opacity: 0.6;
          }
        }
        
        .mouse-glow {
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        
        /* 通用动画优化 */
        .animate-fadeIn {
          opacity: 0;
          animation: fadeIn 0.6s ease forwards;
          will-change: opacity, transform;
        }
        
        .animate-delay-100 { animation-delay: 100ms; }
        .animate-delay-200 { animation-delay: 200ms; }
        .animate-delay-300 { animation-delay: 300ms; }
        .animate-delay-400 { animation-delay: 400ms; }
        .animate-delay-500 { animation-delay: 500ms; }
        .animate-delay-600 { animation-delay: 600ms; }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-fadeIn,
          .animate-delay-100,
          .animate-delay-200,
          .animate-delay-300,
          .animate-delay-400,
          .animate-delay-500,
          .animate-delay-600 {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
        
        /* 通用区域样式 */
        section {
          position: relative;
          padding: 8rem 0;
          overflow: hidden;
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
          padding: 0.6rem 1.5rem;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          border: 1px solid rgba(59, 130, 246, 0.3);
          margin-bottom: 1.5rem;
        }
        
        .section-line {
          width: 80px;
          height: 1px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(59, 130, 246, 0.8) 50%, 
            transparent 100%);
          margin: 0 2rem;
        }
        
        .section-title {
          font-size: 2.8rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
          background: linear-gradient(135deg, 
            #fff 0%, 
            rgba(147, 197, 253, 1) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-align: center;
        }
        
        .section-subtitle {
          font-size: 1.2rem;
          color: #94a3b8;
          font-weight: 400;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
        }
        
        /* 英雄区域 */
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 6rem 0;
          position: relative;
          background: linear-gradient(135deg, #000 0%, #0f172a 100%);
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
            radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(147, 197, 253, 0.06) 0%, transparent 50%);
          z-index: 1;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 3rem;
          position: relative;
          z-index: 2;
        }
        
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.1) 0%, 
            rgba(147, 197, 253, 0.05) 100%);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 50px;
          padding: 0.8rem 2rem;
          margin-bottom: 3rem;
          backdrop-filter: blur(15px);
          color: #fff;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .hero-badge:hover {
          border-color: rgba(59, 130, 246, 0.5);
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.15) 0%, 
            rgba(147, 197, 253, 0.08) 100%);
          transform: translateY(-2px);
        }
        
        .badge-icon {
          font-size: 1.2rem;
          filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.6));
        }
        
        .section-line {
          height: 2px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(59, 130, 246, 0.7) 30%, 
            rgba(147, 197, 253, 1) 50%, 
            rgba(59, 130, 246, 0.7) 70%, 
            transparent 100%);
          margin: 0 auto 2rem;
          width: 120px;
          border-radius: 1px;
        }
        
        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          margin: 0 0 1.5rem 0;
          background: linear-gradient(135deg, 
            #fff 0%, 
            rgba(59, 130, 246, 1) 40%, 
            rgba(147, 197, 253, 1) 70%, 
            #fff 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-align: center;
          letter-spacing: -1px;
          line-height: 1.1;
        }
        
        .hero-subtitle {
          font-size: 1.2rem;
          color: #94a3b8;
          text-align: center;
          margin-bottom: 4rem;
          font-weight: 400;
          line-height: 1.6;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
          position: relative;
          z-index: 2;
        }
        
        /* 公司展示区域 */
        .company-showcase {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 16px;
          padding: 2rem;
          backdrop-filter: blur(10px);
        }
        
        .showcase-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .header-text {
          color: rgba(59, 130, 246, 1);
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        
        .showcase-content {
          position: relative;
        }
        
        .intro-text {
          font-size: 1.2rem;
          line-height: 1.8;
          color: #cbd5e1;
          margin-bottom: 2.5rem;
          font-weight: 400;
        }
        
        .text-highlight {
          color: rgba(59, 130, 246, 1);
          font-weight: 600;
          text-shadow: 0 0 8px rgba(59, 130, 246, 0.3);
        }
        
        .tech-metrics {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .metric-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(59, 130, 246, 0.05);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        
        .metric-item:hover {
          border-color: rgba(59, 130, 246, 0.4);
          background: rgba(59, 130, 246, 0.1);
        }
        
        .metric-icon {
          font-size: 1.5rem;
        }
        
        .metric-content {
          flex: 1;
        }
        
        .metric-label {
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.3rem;
        }
        
        .metric-desc {
          font-size: 0.9rem;
          color: #94a3b8;
          font-weight: 400;
        }
        
        .action-panel {
          display: flex;
          gap: 1rem;
          padding: 1.5rem;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }
        
        .action-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .action-primary {
          background: rgba(59, 130, 246, 1);
          color: #fff;
        }
        
        .action-primary:hover {
          background: rgba(59, 130, 246, 0.8);
        }
        
        .action-secondary {
          background: transparent;
          color: #fff;
          border: 1px solid rgba(59, 130, 246, 0.5);
        }
        
        .action-secondary:hover {
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.8);
        }
        
        .btn-text {
          font-size: 1rem;
        }
        
        .btn-arrow {
          font-size: 1.2rem;
          transition: transform 0.3s ease;
        }
        
        .action-primary:hover .btn-arrow {
          transform: translateX(4px);
        }
        
        .btn-icon {
          font-size: 1.1rem;
        }
        
        /* 视频展示区域 */
        .video-showcase {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .video-container {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 56.25%;
          overflow: hidden;
          border-radius: 16px;
          background: rgba(0, 0, 0, 0.8);
          border: 1px solid rgba(59, 130, 246, 0.3);
          transition: all 0.3s ease;
        }
        
        .video-container:hover {
          border-color: rgba(59, 130, 246, 0.5);
        }
        
        .about-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 14px;
        }
        
        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(0,0,0,0.2) 0%,
            rgba(59, 130, 246, 0.1) 50%,
            rgba(0,0,0,0.2) 100%
          );
          border-radius: 14px;
          z-index: 2;
        }
        
        .video-play-indicator {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          background: rgba(59, 130, 246, 0.9);
          border: 2px solid rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 4;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .video-play-indicator:hover {
          transform: translate(-50%, -50%) scale(1.1);
          background: rgba(59, 130, 246, 1);
        }
        
        .play-icon {
          color: #fff;
          font-size: 1.5rem;
          margin-left: 3px;
        }
        
        /* 科技装饰覆盖层 */
        .video-tech-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 3;
          border-radius: 14px;
          overflow: hidden;
        }
        
        .tech-corner {
          position: absolute;
          width: 20px;
          height: 20px;
          border: 1px solid rgba(59, 130, 246, 0.5);
          transition: all 0.3s ease;
        }
        
        .tech-corner-tl {
          top: 15px;
          left: 15px;
          border-right: none;
          border-bottom: none;
          border-top-left-radius: 4px;
        }
        
        .tech-corner-tr {
          top: 15px;
          right: 15px;
          border-left: none;
          border-bottom: none;
          border-top-right-radius: 4px;
        }
        
        .tech-corner-bl {
          bottom: 15px;
          left: 15px;
          border-right: none;
          border-top: none;
          border-bottom-left-radius: 4px;
        }
        
        .tech-corner-br {
          bottom: 15px;
          right: 15px;
          border-left: none;
          border-top: none;
          border-bottom-right-radius: 4px;
        }
        
        .video-container:hover .tech-corner {
          border-color: rgba(59, 130, 246, 0.8);
        }
            opacity: 0;
          }
          50% { 
            top: 50%;
            opacity: 1;
          }
          100% { 
            top: 100%;
            opacity: 0;
          }
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
          background: rgba(59, 130, 246, 1);
          border-radius: 50%;
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.8);
          animation: pointPulse 2s ease-in-out infinite;
        }
        
        @keyframes pointPulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.7;
          }
          50% { 
            transform: scale(1.5);
            opacity: 1;
          }
        }
        
        .point-1 {
          top: 20%;
          left: 20%;
          animation-delay: 0s;
        }
        
        .point-2 {
          top: 20%;
          right: 20%;
          animation-delay: 0.7s;
        }
        
        .point-3 {
          bottom: 20%;
          left: 50%;
          animation-delay: 1.4s;
        }
        
        /* 视频信息区域 */
        .video-info {
          margin-top: 1.5rem;
        }
        
        .info-header {
          text-align: center;
        }
        
        .video-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #fff;
          margin: 0 0 0.8rem 0;
        }
        
        .video-description {
          font-size: 1rem;
          color: #94a3b8;
          margin: 0;
          line-height: 1.5;
        }
        
        .company-intro {
          display: flex;
          flex-direction: column;
        }
        
        .intro-badge {
          display: inline-block;
          background: rgba(59, 130, 246, 0.1);
          color: rgba(59, 130, 246, 1);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 1.5rem;
          align-self: flex-start;
        }
        
        .intro-text {
          font-size: 1.3rem;
          line-height: 1.8;
          color: #cbd5e1;
          margin-bottom: 2.5rem;
          font-weight: 400;
        }
        
        .intro-highlights {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 3rem;
        }
        
        .highlight-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          transition: all 0.3s ease;
          transform: translateZ(0);
          backface-visibility: hidden;
          will-change: transform;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .highlight-item {
            transition: none;
          }
        }
        
        .highlight-item:hover {
          background: rgba(59, 130, 246, 0.05);
          border-color: rgba(59, 130, 246, 0.2);
          transform: translateX(5px) translateZ(0);
        }
        
        .highlight-icon {
          font-size: 1.5rem;
          filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.3));
        }
        
        .highlight-text {
          font-size: 1rem;
          color: #fff;
          font-weight: 500;
        }
        
        .cta-buttons {
          display: flex;
          gap: 1.5rem;
          margin-top: 2rem;
        }
        
        .cta-primary {
          padding: 1rem 2rem;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          color: #000;
          text-decoration: none;
          border-radius: 50px;
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          transform: translateZ(0);
          backface-visibility: hidden;
          will-change: transform;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .cta-primary,
          .cta-secondary {
            transition: none;
          }
        }
        
        .cta-primary:hover {
          transform: translateY(-2px) translateZ(0);
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
        }
        
        .cta-secondary {
          padding: 1rem 2rem;
          background: transparent;
          color: #fff;
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 50px;
          font-weight: 600;
          transition: all 0.3s ease;
          transform: translateZ(0);
          backface-visibility: hidden;
          will-change: transform;
        }
        
        .cta-secondary:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(59, 130, 246, 0.5);
        }
        
        /* 优化的视频容器 */
        .video-container {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 56.25%;
          overflow: hidden;
          border-radius: 20px;
          transform: translateZ(0);
          backface-visibility: hidden;
          will-change: transform;
        }
        
        .about-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: translateZ(0);
        }
        
        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 100%);
          transform: translateZ(0);
        }
        
        .video-frame {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 20px;
          pointer-events: none;
          z-index: 3;
          transform: translateZ(0);
        }
        
        .video-play-indicator {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) translateZ(0);
          width: 60px;
          height: 60px;
          background: rgba(59, 130, 246, 0.2);
          border: 2px solid rgba(59, 130, 246, 0.6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 4;
          backdrop-filter: blur(8px);
          backface-visibility: hidden;
          will-change: transform;
          transition: all 0.3s ease;
        }
        
        .video-play-indicator:hover {
          transform: translate(-50%, -50%) scale(1.1) translateZ(0);
          background: rgba(59, 130, 246, 0.3);
          border-color: rgba(59, 130, 246, 0.8);
        }
        
        @media (prefers-reduced-motion: reduce) {
          .video-play-indicator {
            transition: none;
          }
        }
        
        .play-icon {
          color: #fff;
          font-size: 1.2rem;
          margin-left: 3px;
        }
        
        /* 统计数据区域 */
        .stats-section {
          background: linear-gradient(180deg, 
            rgba(0, 0, 0, 0.8) 0%, 
            rgba(3, 7, 18, 0.9) 100%);
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        
        /* 价值观区域 */
        .values-section {
          background: linear-gradient(180deg, 
            rgba(3, 7, 18, 0.9) 0%, 
            rgba(0, 0, 0, 0.95) 100%);
        }
        
        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
        
        /* 发展历程区域 */
        .timeline-section {
          background: linear-gradient(180deg, 
            rgba(0, 0, 0, 0.95) 0%, 
            rgba(3, 7, 18, 1) 100%);
        }
        
        .timeline-container {
          max-width: 900px;
          margin: 0 auto;
        }
        
        /* 响应式设计 */
        @media (max-width: 1200px) {
          .container {
            padding: 0 2rem;
          }
          
          .hero-content {
            gap: 4rem;
          }
          
          .video-showcase {
            gap: 1.5rem;
          }
        }
        
        @media (max-width: 992px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          
          .hero-title {
            font-size: 3rem;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .video-play-indicator {
            width: 50px;
            height: 50px;
          }
          
          .play-icon {
            font-size: 1.3rem;
          }
        }
        
        @media (max-width: 768px) {
          .hero-section {
            padding: 4rem 0;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
          }
          
          .hero-badge {
            padding: 0.6rem 1.5rem;
            font-size: 0.8rem;
          }
          
          .company-showcase {
            padding: 1.5rem;
          }
          
          .intro-text {
            font-size: 1.1rem;
          }
          
          .tech-metrics {
            gap: 0.8rem;
          }
          
          .metric-item {
            padding: 0.8rem;
            flex-direction: column;
            text-align: center;
            gap: 0.8rem;
          }
          
          .action-panel {
            flex-direction: column;
            gap: 1rem;
          }
          
          .video-container {
            border-radius: 12px;
          }
          
          .about-video {
            border-radius: 10px;
          }
          
          .video-overlay {
            border-radius: 10px;
          }
          
          .video-play-indicator {
            width: 50px;
            height: 50px;
          }
          
          .play-icon {
            font-size: 1.2rem;
          }
          
          .tech-corner {
            width: 15px;
            height: 15px;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .values-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
        
        @media (max-width: 480px) {
          .container {
            padding: 0 1rem;
          }
          
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-subtitle {
            font-size: 1rem;
          }
          
          .hero-badge {
            padding: 0.5rem 1.2rem;
            font-size: 0.8rem;
          }
          
          .intro-text {
            font-size: 1rem;
          }
          
          .company-showcase {
            padding: 1rem;
          }
          
          .video-container {
            border-radius: 10px;
          }
          
          .about-video {
            border-radius: 8px;
          }
          
          .video-overlay {
            border-radius: 8px;
          }
          
          .video-play-indicator {
            width: 40px;
            height: 40px;
          }
          
          .play-icon {
            font-size: 1rem;
          }
          
          .tech-corner {
            width: 12px;
            height: 15px;
          }
        }
        
        /* 减少动画效果（无障碍优化） */
        @media (prefers-reduced-motion: reduce) {
          .tech-background,
          .floating-particles,
          .mouse-glow,
          .badge-pulse,
          .badge-icon,
          .title-line,
          .effect-line,
          .effect-dot,
          .video-play-indicator,
          .scan-line,
          .data-point,
          .badge-dot {
            animation: none !important;
            transition: none !important;
          }
          
          .particle {
            display: none;
          }
          
          .tech-stats-card,
          .tech-value-card,
          .tech-timeline-item,
          .video-container,
          .stat-item {
            animation: none !important;
            transition: all 0.2s ease !important;
          }
        }
      `}</style>
    </Layout>
  );
};

export default AboutPage; 