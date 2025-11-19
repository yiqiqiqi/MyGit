import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

/**
 * 职位卡片组件
 */
const JobCard = ({ title, department, location, type, experience, salary, description, requirements, onClick }) => {
  return (
    <div className="job-card" onClick={onClick}>
      <div className="job-header">
        <div className="job-main-info">
          <h3 className="job-title">{title}</h3>
          <div className="job-meta">
            <span className="job-department">{department}</span>
            <span className="job-location">📍 {location}</span>
            <span className="job-type">{type}</span>
          </div>
        </div>
        <div className="job-salary">{salary}</div>
      </div>
      
      <div className="job-content">
        <p className="job-description">{description}</p>
        <div className="job-requirements">
          <strong>任职要求：</strong>
          <ul>
            {requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="job-footer">
        <div className="job-experience">经验要求: {experience}</div>
        <button className="apply-button">
          <span>立即申请</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      
      <style jsx>{`
        .job-card {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.03) 0%, 
            rgba(255, 255, 255, 0.08) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 1.5rem;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }
        
        .job-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, 
            rgba(34, 197, 94, 0.8) 0%, 
            rgba(134, 239, 172, 0.8) 50%, 
            rgba(34, 197, 94, 0.8) 100%);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        
        .job-card:hover::before {
          transform: scaleX(1);
        }
        
        .job-card:hover {
          background: linear-gradient(135deg, 
            rgba(34, 197, 94, 0.05) 0%, 
            rgba(255, 255, 255, 0.1) 100%);
          border-color: rgba(34, 197, 94, 0.3);
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        }
        
        .job-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }
        
        .job-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 0.8rem;
        }
        
        .job-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .job-meta span {
          font-size: 0.9rem;
          color: #94a3b8;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
        }
        
        .job-salary {
          font-size: 1.2rem;
          font-weight: 600;
          color: #10b981;
          background: rgba(16, 185, 129, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 8px;
        }
        
        .job-description {
          color: #cbd5e1;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        
        .job-requirements {
          margin-bottom: 1.5rem;
        }
        
        .job-requirements strong {
          color: #e2e8f0;
          font-size: 0.95rem;
        }
        
        .job-requirements ul {
          margin-top: 0.8rem;
          padding-left: 1.2rem;
        }
        
        .job-requirements li {
          color: #94a3b8;
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 0.5rem;
        }
        
        .job-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .job-experience {
          font-size: 0.9rem;
          color: #64748b;
        }
        
        .apply-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem 1.5rem;
          background: linear-gradient(135deg, 
            rgba(34, 197, 94, 1) 0%, 
            rgba(134, 239, 172, 1) 100%);
          color: #000;
          border: none;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .apply-button:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 8px 20px rgba(34, 197, 94, 0.3);
        }
        
        @media (max-width: 768px) {
          .job-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .job-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .apply-button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

/**
 * 福利卡片组件
 */
const BenefitCard = ({ icon, title, description }) => {
  return (
    <div className="benefit-card">
      <div className="benefit-icon">{icon}</div>
      <h3 className="benefit-title">{title}</h3>
      <p className="benefit-description">{description}</p>
      
      <style jsx>{`
        .benefit-card {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.03) 0%, 
            rgba(255, 255, 255, 0.08) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 2rem;
          text-align: center;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          backdrop-filter: blur(10px);
          height: 100%;
        }
        
        .benefit-card:hover {
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.05) 0%, 
            rgba(255, 255, 255, 0.1) 100%);
          border-color: rgba(59, 130, 246, 0.3);
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        }
        
        .benefit-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
          filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.3));
        }
        
        .benefit-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 1rem;
        }
        
        .benefit-description {
          color: #cbd5e1;
          line-height: 1.6;
          font-size: 0.95rem;
        }
      `}</style>
    </div>
  );
};

/**
 * 招聘流程步骤组件
 */
const ProcessStep = ({ number, title, description, isLast }) => {
  return (
    <div className="process-step">
      <div className="step-number">{number}</div>
      <div className="step-content">
        <h3 className="step-title">{title}</h3>
        <p className="step-description">{description}</p>
      </div>
      {!isLast && <div className="step-connector"></div>}
      
      <style jsx>{`
        .process-step {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          position: relative;
          margin-bottom: 2rem;
        }
        
        .step-number {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          color: #000;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          font-weight: 700;
          flex-shrink: 0;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        }
        
        .step-content {
          flex: 1;
          padding-top: 0.5rem;
        }
        
        .step-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 0.5rem;
        }
        
        .step-description {
          color: #cbd5e1;
          line-height: 1.6;
          font-size: 0.95rem;
        }
        
        .step-connector {
          position: absolute;
          left: 25px;
          top: 50px;
          bottom: -20px;
          width: 2px;
          background: linear-gradient(180deg, 
            rgba(59, 130, 246, 0.8) 0%, 
            rgba(59, 130, 246, 0.3) 100%);
        }
        
        @media (max-width: 768px) {
          .process-step {
            gap: 1rem;
          }
          
          .step-number {
            width: 40px;
            height: 40px;
            font-size: 1rem;
          }
          
          .step-connector {
            left: 20px;
          }
        }
      `}</style>
    </div>
  );
};

/**
 * 招聘信息页面
 */
const JoinUsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const jobCategories = [
    { id: 'all', name: '全部职位' },
    { id: 'rd', name: '研发部门' },
    { id: 'engineering', name: '工程技术' },
    { id: 'management', name: '管理岗位' },
    { id: 'support', name: '支持部门' }
  ];
  
  const jobList = [
    {
      id: 1,
      title: "高级光学工程师",
      department: "光学设计部门",
      location: "南京",
      type: "全职",
      experience: "3-5年",
      salary: "20-35K",
      category: "rd",
      description: "负责光纤熔接设备的光学系统设计与优化，包括光路设计、光学元件选型、光学性能测试等工作。",
      requirements: [
        "光学工程、应用物理等相关专业本科及以上学历",
        "熟悉光纤通信原理，具备光纤熔接技术相关经验",
        "熟练使用Zemax、CodeV等光学设计软件",
        "具有激光器、光纤耦合器等光学器件使用经验",
        "良好的英语读写能力，能够阅读英文技术资料"
      ]
    },
    {
      id: 2,
      title: "嵌入式软件工程师",
      department: "嵌入式软件部门",
      location: "西安",
      type: "全职",
      experience: "2-4年",
      salary: "18-30K",
      category: "rd",
      description: "参与工业物联网设备的嵌入式软件开发，包括底层驱动、实时操作系统应用、通信协议栈等。",
      requirements: [
        "计算机、电子工程等相关专业本科及以上学历",
        "熟练掌握C/C++编程，具备ARM、STM32等平台开发经验",
        "熟悉FreeRTOS、μC/OS等实时操作系统",
        "了解LoRa、NB-IoT、4G/5G等无线通信技术",
        "具备良好的调试能力和问题解决能力"
      ]
    },
    {
      id: 3,
      title: "机械结构工程师",
      department: "结构设计部门",
      location: "南京",
      type: "全职",
      experience: "3-6年",
      salary: "22-32K",
      category: "engineering",
      description: "负责精密测量设备的机械结构设计，包括产品外观设计、内部结构布局、热管理方案等。",
      requirements: [
        "机械设计、机械工程等相关专业本科及以上学历",
        "熟练使用SolidWorks、AutoCAD等设计软件",
        "具备精密机械设计经验，了解公差分析",
        "熟悉金属加工工艺，具备供应商管理经验",
        "良好的沟通协调能力和团队合作精神"
      ]
    },
    {
      id: 4,
      title: "产品经理",
      department: "产品部门",
      location: "南京",
      type: "全职",
      experience: "5-8年",
      salary: "25-40K",
      category: "management",
      description: "负责公司产品规划和市场策略制定，协调跨部门资源，推动产品从概念到量产的全生命周期管理。",
      requirements: [
        "市场营销、工商管理等相关专业本科及以上学历",
        "具备B2B产品管理经验，了解工业物联网行业",
        "优秀的市场分析和产品规划能力",
        "良好的项目管理和跨部门协调能力",
        "英语听说读写流利，能够与海外客户沟通"
      ]
    },
    {
      id: 5,
      title: "销售工程师",
      department: "销售部门",
      location: "上海/杭州",
      type: "全职",
      experience: "2-5年",
      salary: "15-25K + 提成",
      category: "support",
      description: "负责华东地区的市场开拓和客户维护，向客户介绍公司产品技术优势，完成销售目标。",
      requirements: [
        "市场营销、电子工程等相关专业本科及以上学历",
        "具备技术产品销售经验，了解B2B销售流程",
        "良好的沟通表达能力和客户服务意识",
        "能够接受出差，具备较强的抗压能力",
        "熟悉华东地区市场，有相关客户资源者优先"
      ]
    }
  ];
  
  const benefits = [
    {
      icon: "💰",
      title: "有竞争力的薪酬",
      description: "提供行业内有竞争力的薪资待遇，年终奖金丰厚，让您的付出得到应有回报"
    },
    {
      icon: "🏥",
      title: "完善的福利保障",
      description: "五险一金、补充医疗保险、年度体检，为您和家人提供全方位保障"
    },
    {
      icon: "📚",
      title: "学习发展机会",
      description: "技术培训、行业会议、学历提升支持，助力您的职业发展"
    },
    {
      icon: "🌴",
      title: "灵活工作安排",
      description: "弹性工作时间、带薪年假、节假日福利，工作生活平衡"
    },
    {
      icon: "🚀",
      title: "广阔发展平台",
      description: "公司快速发展期，提供广阔的职业发展空间和晋升机会"
    },
    {
      icon: "🏢",
      title: "优越办公环境",
      description: "现代化办公环境、免费咖啡茶饮、团建活动，营造良好工作氛围"
    }
  ];
  
  const recruitmentProcess = [
    {
      number: 1,
      title: "简历投递",
      description: "通过邮件或招聘平台投递简历，我们会在3个工作日内回复"
    },
    {
      number: 2,
      title: "初步筛选",
      description: "HR进行简历筛选和电话初步沟通，了解基本情况和求职意向"
    },
    {
      number: 3,
      title: "技术面试",
      description: "技术负责人进行专业技能面试，考察技术能力和项目经验"
    },
    {
      number: 4,
      title: "综合面试",
      description: "部门领导和HR进行综合面试，评估综合素质和团队适应性"
    },
    {
      number: 5,
      title: "入职办理",
      description: "发放offer确认入职意向，协助办理入职手续，安排新人培训"
    }
  ];
  
  const filteredJobs = selectedCategory === 'all' 
    ? jobList 
    : jobList.filter(job => job.category === selectedCategory);
  
  return (
    <Layout title="EEnous - 招聘信息 | 加入我们的团队">
      <div className="join-us-page">
        <div className="page-bg">
          <video autoPlay muted loop className="bg-video">
            <source src="/videos/career-bg.mp4" type="video/mp4" />
          </video>
          <div className="bg-overlay"></div>
          <div className="bg-particles"></div>
        </div>
        
        <div className="page-content">
          {/* 英雄区域 */}
          <div className="hero-section">
            <div className="hero-badge animate-fadeIn">
              <span className="badge-icon">🚀</span>
              <span>JOIN OUR TEAM</span>
            </div>
            <h1 className="page-title animate-fadeIn animate-delay-100">
              加入<span className="title-highlight">我们</span>
            </h1>
            <div className="title-separator animate-scaleX animate-delay-200"></div>
            <p className="page-subtitle animate-fadeIn animate-delay-300">
              与我们一起推动科技创新，在光纤通信与工业物联网领域创造更美好的未来
            </p>
          </div>
          
          {/* 招聘职位区域 */}
          <div className="jobs-section animate-fadeIn animate-delay-400">
            <h2 className="section-title">
              <span className="title-icon">💼</span>
              热招职位
            </h2>
            
            {/* 职位分类筛选 */}
            <div className="job-categories">
              {jobCategories.map(category => (
                <button
                  key={category.id}
                  className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            {/* 职位列表 */}
            <div className="jobs-list">
              {filteredJobs.map(job => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          </div>
          
          {/* 福利待遇区域 */}
          <div className="benefits-section animate-fadeIn animate-delay-500">
            <h2 className="section-title">
              <span className="title-icon">🎁</span>
              福利待遇
            </h2>
            <div className="benefits-grid">
              {benefits.map((benefit, index) => (
                <BenefitCard key={index} {...benefit} />
              ))}
            </div>
          </div>
          
          {/* 招聘流程区域 */}
          <div className="process-section animate-fadeIn animate-delay-600">
            <h2 className="section-title">
              <span className="title-icon">📋</span>
              招聘流程
            </h2>
            <div className="process-steps">
              {recruitmentProcess.map((step, index) => (
                <ProcessStep 
                  key={index} 
                  {...step} 
                  isLast={index === recruitmentProcess.length - 1}
                />
              ))}
            </div>
          </div>
          
          {/* 联系方式区域 */}
          <div className="contact-section animate-fadeIn animate-delay-700">
            <div className="contact-content">
              <h2 className="section-title">
                <span className="title-icon">📧</span>
                投递简历
              </h2>
              <p className="contact-description">
                如果您对我们的职位感兴趣，请将简历发送至我们的招聘邮箱，我们会尽快与您联系。
              </p>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-label">招聘邮箱:</span>
                  <a href="mailto:hr@eenous.com" className="contact-link">hr@eenous.com</a>
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
        .join-us-page {
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
            radial-gradient(2px 2px at 20% 30%, rgba(34, 197, 94, 0.3), transparent),
            radial-gradient(2px 2px at 40% 70%, rgba(134, 239, 172, 0.2), transparent),
            radial-gradient(1px 1px at 90% 40%, rgba(34, 197, 94, 0.4), transparent);
          background-repeat: repeat;
          background-size: 100px 100px, 150px 150px, 200px 200px;
          animation: particlesFloat 25s linear infinite;
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
            rgba(34, 197, 94, 0.1) 0%, 
            rgba(134, 239, 172, 0.1) 100%);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: 50px;
          color: rgba(34, 197, 94, 0.9);
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(34, 197, 94, 0.1);
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
            rgba(34, 197, 94, 0.8) 50%,
            #ffffff 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 40px rgba(34, 197, 94, 0.3);
        }
        
        .title-highlight {
          background: linear-gradient(135deg, 
            rgba(34, 197, 94, 1) 0%, 
            rgba(134, 239, 172, 1) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 20px rgba(34, 197, 94, 0.5);
        }
        
        .title-separator {
          width: 120px;
          height: 4px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(34, 197, 94, 0.8) 20%,
            rgba(134, 239, 172, 1) 50%,
            rgba(34, 197, 94, 0.8) 80%,
            transparent 100%);
          margin: 0 auto 2rem;
          border-radius: 2px;
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
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
          background: linear-gradient(135deg, #fff 0%, rgba(34, 197, 94, 0.8) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .title-icon {
          font-size: 2rem;
          filter: drop-shadow(0 0 10px rgba(34, 197, 94, 0.3));
        }
        
        /* 职位区域样式 */
        .jobs-section {
          margin-bottom: 6rem;
          padding: 3rem 0;
        }
        
        .job-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 3rem;
          justify-content: center;
        }
        
        .category-button {
          padding: 0.8rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 25px;
          color: #cbd5e1;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        
        .category-button:hover {
          background: rgba(34, 197, 94, 0.1);
          border-color: rgba(34, 197, 94, 0.3);
          color: #10b981;
        }
        
        .category-button.active {
          background: linear-gradient(135deg, 
            rgba(34, 197, 94, 1) 0%, 
            rgba(134, 239, 172, 1) 100%);
          border-color: rgba(34, 197, 94, 0.5);
          color: #000;
          font-weight: 600;
        }
        
        .jobs-list {
          max-width: 1000px;
          margin: 0 auto;
        }
        
        /* 福利区域样式 */
        .benefits-section {
          margin-bottom: 6rem;
          padding: 3rem 0;
        }
        
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 3rem;
        }
        
        /* 流程区域样式 */
        .process-section {
          margin-bottom: 6rem;
          padding: 3rem 0;
        }
        
        .process-steps {
          max-width: 800px;
          margin: 3rem auto 0;
        }
        
        /* 联系区域样式 */
        .contact-section {
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
          color: #10b981;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .contact-link:hover {
          color: #059669;
          text-shadow: 0 0 8px rgba(16, 185, 129, 0.3);
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
          .benefits-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 992px) {
          .page-title {
            font-size: 3rem;
            letter-spacing: 2px;
          }
          
          .benefits-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
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
          
          .hero-section {
            margin-bottom: 4rem;
            padding: 2rem 0;
          }
          
          .jobs-section,
          .benefits-section,
          .process-section,
          .contact-section {
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
          
          .job-categories {
            justify-content: flex-start;
          }
        }
      `}</style>
    </Layout>
  );
};

export default JoinUsPage; 