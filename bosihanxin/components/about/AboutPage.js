import React, { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import { COMPANY_INFO, COMPANY_MILESTONES, CAROUSEL_CONFIG, RESEARCH_DEPARTMENTS } from '../../constants/appConstants';

// 导入Swiper样式
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

/**
 * 时间线项组件 - SpaceX风格
 */
const TimelineItem = ({ year, children, delay = 0 }) => (
  <div className="timeline-item animate-fadeIn" style={{ animationDelay: `${delay}ms` }}>
    <div className="timeline-year">{year}</div>
    <div className="timeline-content">
      <div className="timeline-dot"></div>
      <div className="timeline-text">{children}</div>
    </div>
    
    <style jsx>{`
      .timeline-item {
        display: flex;
        margin-bottom: 2rem;
        position: relative;
      }
      
      .timeline-year {
        min-width: 120px;
        font-weight: bold;
        color: #fff;
        font-size: 1.2rem;
        padding-top: 0.25rem;
      }
      
      .timeline-content {
        position: relative;
        padding-left: 2rem;
        flex: 1;
      }
      
      .timeline-dot {
        position: absolute;
        left: 0;
        top: 0.5rem;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #fff;
      }
      
      .timeline-content::before {
        content: '';
        position: absolute;
        left: 5px;
        top: 0.5rem;
        width: 2px;
        height: calc(100% + 2rem);
        background-color: rgba(255, 255, 255, 0.2);
        transform: translateY(12px);
      }
      
      .timeline-item:last-child .timeline-content::before {
        display: none;
      }
      
      .timeline-text {
        color: #aaa;
        line-height: 1.6;
      }
      
      @media (max-width: 768px) {
        .timeline-item {
          flex-direction: column;
        }
        
        .timeline-year {
          margin-bottom: 0.5rem;
        }
      }
    `}</style>
  </div>
);

/**
 * 公司简介组件 - 增强SpaceX风格
 */
const AboutCompany = () => (
  <div className="about-company">
    <div className="about-bg">
      <video autoPlay muted loop className="bg-video">
        <source src="/videos/fiber-optic.mp4" type="video/mp4" />
      </video>
      <div className="bg-overlay"></div>
    </div>
    
    <div className="about-content">
      <h2 className="section-title animate-fadeIn">关于我们</h2>
      
      <div className="company-intro animate-fadeIn animate-delay-200">
        <p className="intro-highlight">南京玻丝焊芯科技有限公司，成立于2022年8月，是一家在光纤通信、工业物联网和精密仪器仪表等领域进行深入研发的高新技术企业。</p>
        
        <p>公司依托南京邮电大学物联网大学科技园孵化成长，凭借自主研发的三相放电光纤熔接系统以及工业级物联网高精度数据采集器，赢得了业界的广泛认可。</p>
        
        <p>公司已成立西安研发中心和南京研发中心，研发体系由电子硬件部门（西安）、嵌入式软件部门（西安）、应用软件部门（西安）、结构与热仿真部门（南京）、光学设计部门（南京）五大部分构成，各部门领导成员具有丰富的行业经验，曾在多项全国技术类赛事中斩获大奖，拥有非凡的技术实力和创新能力。</p>
      </div>
      
      <div className="about-stats animate-fadeIn animate-delay-400">
        <div className="stat-item">
          <div className="stat-value">{COMPANY_INFO.FOUNDED_YEAR}</div>
          <div className="stat-label">成立年份</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value">4+</div>
          <div className="stat-label">发明专利</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value">2+</div>
          <div className="stat-label">实用新型专利</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value">2+</div>
          <div className="stat-label">软件著作权</div>
        </div>
      </div>
      
      <div className="tech-badges animate-fadeIn animate-delay-600">
        <div className="badge">光纤通信</div>
        <div className="badge">工业物联网</div>
        <div className="badge">精密仪器仪表</div>
        <div className="badge">三相放电技术</div>
        <div className="badge">高精度数据采集</div>
      </div>
    </div>
    
    <style jsx>{`
      .about-company {
        height: 100vh;
        position: relative;
        overflow: hidden;
      }
      
      .about-bg {
        position: absolute;
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
        background: linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%);
      }
      
      .about-bg::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
      }
      
      .about-content {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 10%;
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .section-title {
        font-size: 2.5rem;
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 2rem;
        position: relative;
        display: inline-block;
      }
      
      .section-title::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 60px;
        height: 1px;
        background-color: #fff;
      }
      
      .company-intro {
        max-width: 800px;
        margin-bottom: 3rem;
      }
      
      .intro-highlight {
        font-size: 1.3rem;
        font-weight: 300;
        margin-bottom: 1.5rem;
        line-height: 1.6;
        color: #fff;
      }
      
      .company-intro p {
        margin-bottom: 1.5rem;
        line-height: 1.8;
        color: #ccc;
        font-size: 1.1rem;
      }
      
      .about-stats {
        display: flex;
        flex-wrap: wrap;
        gap: 3rem;
        margin-bottom: 3rem;
      }
      
      .stat-item {
        min-width: 150px;
      }
      
      .stat-value {
        font-size: 3rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
      }
      
      .stat-label {
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #aaa;
      }
      
      .tech-badges {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }
      
      .badge {
        padding: 0.5rem 1rem;
        background-color: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 2px;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      
      @media (max-width: 768px) {
        .about-content {
          padding: 0 5%;
        }
        
        .section-title {
          font-size: 2rem;
        }
        
        .intro-highlight {
          font-size: 1.2rem;
        }
        
        .company-intro p {
          font-size: 1rem;
        }
        
        .about-stats {
          gap: 2rem;
        }
        
        .stat-value {
          font-size: 2.5rem;
        }
      }
    `}</style>
  </div>
);

/**
 * 公司历史组件 - 增强SpaceX风格
 */
const CompanyHistory = () => (
  <div className="company-history">
    <div className="history-bg">
      <img src="/images/history-bg.jpg" alt="History Background" />
      <div className="bg-overlay"></div>
    </div>
    
    <div className="history-content">
      <h2 className="section-title animate-fadeIn">发展历程</h2>
      
      <div className="history-intro animate-fadeIn animate-delay-200">
        <p>公司在短短两年内取得了显著的发展，在技术研发和商业合作方面均取得了重要突破。</p>
      </div>
      
      <div className="timeline animate-fadeIn animate-delay-300">
        <TimelineItem year="2022年8月" delay={0}>
          公司成立，开始研发三相放电光纤熔接系统
        </TimelineItem>
        
        <TimelineItem year="2022年底" delay={200}>
          获得首轮融资，成立西安研发中心
        </TimelineItem>
        
        <TimelineItem year="2023年初" delay={400}>
          完成核心技术攻关，申请多项专利
        </TimelineItem>
        
        <TimelineItem year="2023年中" delay={600}>
          产品进入测试阶段，与多家企业建立合作关系
        </TimelineItem>
        
        <TimelineItem year="2023年底" delay={800}>
          核心产品实现商业化，在上海、西安、南京、杭州等地落地
        </TimelineItem>
        
        <TimelineItem year="2024年" delay={1000}>
          实现核心产品批量生产，持续拓展市场
        </TimelineItem>
      </div>
    </div>
    
    <style jsx>{`
      .company-history {
        height: 100vh;
        position: relative;
        overflow: hidden;
      }
      
      .history-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
      }
      
      .bg-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%);
      }
      
      .history-bg img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .history-content {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 10%;
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .section-title {
        font-size: 2.5rem;
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 2rem;
        position: relative;
        display: inline-block;
      }
      
      .section-title::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 60px;
        height: 1px;
        background-color: #fff;
      }
      
      .history-intro {
        max-width: 800px;
        margin-bottom: 3rem;
      }
      
      .history-intro p {
        font-size: 1.1rem;
        line-height: 1.8;
        color: #ccc;
      }
      
      .timeline {
        max-width: 800px;
      }
      
      @media (max-width: 768px) {
        .history-content {
          padding: 0 5%;
        }
        
        .section-title {
          font-size: 2rem;
        }
        
        .history-intro p {
          font-size: 1rem;
        }
      }
    `}</style>
  </div>
);

/**
 * 研发中心组件 - 增强SpaceX风格
 */
const ResearchCenters = () => (
  <div className="research-centers">
    <div className="research-bg">
      <img src="/images/research-bg.jpg" alt="Research Background" />
      <div className="bg-overlay"></div>
    </div>
    
    <div className="research-content">
      <h2 className="section-title animate-fadeIn">研发体系</h2>
      
      <div className="research-intro animate-fadeIn animate-delay-200">
        <p>公司已成立西安研发中心和南京研发中心，研发体系由五大部门构成，各部门领导成员具有丰富的行业经验，曾在多项全国技术类赛事中斩获大奖，拥有非凡的技术实力和创新能力。</p>
      </div>
      
      <div className="centers-grid animate-fadeIn animate-delay-300">
        <div className="center-card">
          <h3 className="center-name">电子硬件部门</h3>
          <div className="center-location">西安研发中心</div>
          <p className="center-desc">负责电子硬件设计与开发，包括电路设计、PCB布局、元器件选型等工作。</p>
        </div>
        
        <div className="center-card">
          <h3 className="center-name">嵌入式软件部门</h3>
          <div className="center-location">西安研发中心</div>
          <p className="center-desc">负责嵌入式系统软件开发，包括底层驱动、实时操作系统应用等。</p>
        </div>
        
        <div className="center-card">
          <h3 className="center-name">应用软件部门</h3>
          <div className="center-location">西安研发中心</div>
          <p className="center-desc">负责上位机软件、移动应用、云平台等应用软件的设计与开发。</p>
        </div>
        
        <div className="center-card">
          <h3 className="center-name">结构与热仿真部门</h3>
          <div className="center-location">南京研发中心</div>
          <p className="center-desc">负责产品结构设计、热分析与仿真，确保产品结构合理、散热良好。</p>
        </div>
        
        <div className="center-card">
          <h3 className="center-name">光学设计部门</h3>
          <div className="center-location">南京研发中心</div>
          <p className="center-desc">负责光学系统设计，包括光路设计、光学元件选型、光学性能优化等。</p>
        </div>
      </div>
    </div>
    
    <style jsx>{`
      .research-centers {
        height: 100vh;
        position: relative;
        overflow: hidden;
      }
      
      .research-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
      }
      
      .bg-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%);
      }
      
      .research-bg img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .research-content {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 10%;
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .section-title {
        font-size: 2.5rem;
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 2rem;
        position: relative;
        display: inline-block;
      }
      
      .section-title::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 60px;
        height: 1px;
        background-color: #fff;
      }
      
      .research-intro {
        max-width: 800px;
        margin-bottom: 3rem;
      }
      
      .research-intro p {
        font-size: 1.1rem;
        line-height: 1.8;
        color: #ccc;
      }
      
      .centers-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1.5rem;
      }
      
      .center-card {
        background-color: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 2rem;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }
      
      .center-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 0;
        background-color: #fff;
        transition: height 0.3s ease;
      }
      
      .center-card:hover {
        background-color: rgba(255, 255, 255, 0.1);
        transform: translateY(-5px);
      }
      
      .center-card:hover::before {
        height: 100%;
      }
      
      .center-name {
        font-size: 1.3rem;
        margin-bottom: 0.5rem;
      }
      
      .center-location {
        color: #aaa;
        margin-bottom: 1.5rem;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      
      .center-desc {
        color: #ccc;
        line-height: 1.6;
      }
      
      @media (max-width: 768px) {
        .research-content {
          padding: 0 5%;
        }
        
        .section-title {
          font-size: 2rem;
        }
        
        .research-intro p {
          font-size: 1rem;
        }
        
        .centers-grid {
          grid-template-columns: 1fr;
        }
      }
    `}</style>
  </div>
);

/**
 * 关于页面组件 - 增强SpaceX风格
 */
export const AboutPage = () => {
  // 使用useMemo缓存Swiper配置
  const swiperParams = useMemo(() => ({
    modules: [Navigation, Pagination, EffectFade],
    spaceBetween: 0,
    slidesPerView: 1,
    navigation: CAROUSEL_CONFIG?.NAVIGATION || true,
    pagination: CAROUSEL_CONFIG?.PAGINATION || { clickable: true },
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 1000,
    autoHeight: true,
  }), []);

  return (
    <div className="about-page">
      <Swiper {...swiperParams} className="about-swiper">
        <SwiperSlide>
          <AboutCompany />
        </SwiperSlide>
        <SwiperSlide>
          <ResearchCenters />
        </SwiperSlide>
        <SwiperSlide>
          <CompanyHistory />
        </SwiperSlide>
      </Swiper>
      
      <style jsx global>{`
        .about-page {
          height: 100vh;
          width: 100%;
        }
        
        .about-swiper {
          height: 100%;
        }
        
        .swiper-slide {
          height: 100%;
        }
        
        .swiper-button-next,
        .swiper-button-prev {
          color: #fff;
        }
        
        .swiper-pagination-bullet {
          background: #fff;
          opacity: 0.5;
        }
        
        .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default AboutPage; 