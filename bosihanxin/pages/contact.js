import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

/**
 * 联系方式卡片组件 - 增强版
 */
const ContactCard = ({ title, info, icon, link, isExternal = false }) => {
  return (
    <div className="contact-card">
      <div className="card-icon-wrapper">
        <div className="card-icon">{icon}</div>
        <div className="icon-glow"></div>
      </div>
      <h3 className="card-title">{title}</h3>
      <div className="card-info">
        {link ? (
          isExternal ? (
            <a href={link} target="_blank" rel="noopener noreferrer" className="card-link">
              {info}
            </a>
          ) : (
            <Link href={link}>
              <div className="card-link">{info}</div>
            </Link>
          )
        ) : (
          info
        )}
      </div>
      
      <style jsx>{`
        .contact-card {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.03) 0%, 
            rgba(255, 255, 255, 0.08) 100%);
          border: 1px solid rgba(59, 130, 246, 0.2);
          padding: 2.5rem;
          border-radius: 12px;
          text-align: center;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          height: 100%;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }
        
        .contact-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(59, 130, 246, 0.1), 
            transparent);
          transition: left 0.6s ease;
        }
        
        .contact-card:hover::before {
          left: 100%;
        }
        
        .contact-card:hover {
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.1) 0%, 
            rgba(255, 255, 255, 0.1) 100%);
          border-color: rgba(59, 130, 246, 0.4);
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
        }
        
        .card-icon-wrapper {
          position: relative;
          display: inline-block;
          margin-bottom: 1.5rem;
        }
        
        .card-icon {
          font-size: 3rem;
          position: relative;
          z-index: 2;
          transition: transform 0.3s ease;
        }
        
        .contact-card:hover .card-icon {
          transform: scale(1.1) rotate(5deg);
        }
        
        .icon-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .contact-card:hover .icon-glow {
          opacity: 1;
        }
        
        .card-title {
          font-size: 1.4rem;
          margin-bottom: 1rem;
          position: relative;
          padding-bottom: 1rem;
          display: inline-block;
          background: linear-gradient(135deg, #fff 0%, rgba(59, 130, 246, 0.8) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 600;
        }
        
        .card-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.8), transparent);
          transition: width 0.3s ease;
        }
        
        .contact-card:hover .card-title::after {
          width: 100%;
        }
        
        .card-info {
          font-size: 1.1rem;
          color: #e2e8f0;
          line-height: 1.7;
          font-weight: 500;
        }
        
        .card-link {
          color: inherit;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
        }
        
        .card-link:hover {
          color: rgba(59, 130, 246, 0.9);
          text-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </div>
  );
};

/**
 * 新增：快速入口卡片组件
 */
const QuickAccessCard = ({ title, description, icon, link, color = "blue" }) => {
  const colors = {
    blue: {
      gradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 197, 253, 0.1) 100%)",
      border: "rgba(59, 130, 246, 0.3)",
      text: "rgba(59, 130, 246, 0.9)"
    },
    green: {
      gradient: "linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(134, 239, 172, 0.1) 100%)",
      border: "rgba(34, 197, 94, 0.3)",
      text: "rgba(34, 197, 94, 0.9)"
    },
    purple: {
      gradient: "linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(196, 181, 253, 0.1) 100%)",
      border: "rgba(168, 85, 247, 0.3)",
      text: "rgba(168, 85, 247, 0.9)"
    }
  };

  const currentColor = colors[color];

  return (
    <Link href={link}>
      <div className="quick-access-card">
        <div className="quick-card-content">
          <div className="quick-icon-wrapper">
            <div className="quick-icon">{icon}</div>
          </div>
          <div className="quick-info">
            <h3 className="quick-title">{title}</h3>
            <p className="quick-description">{description}</p>
          </div>
          <div className="quick-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        <style jsx>{`
          .quick-access-card {
            background: ${currentColor.gradient};
            border: 1px solid ${currentColor.border};
            border-radius: 16px;
            padding: 2rem;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(10px);
          }
          
          .quick-access-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: ${currentColor.gradient};
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          
          .quick-access-card:hover::before {
            opacity: 1;
          }
          
          .quick-access-card:hover {
            transform: translateY(-6px);
            border-color: ${currentColor.text};
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
          }
          
          .quick-card-content {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            position: relative;
            z-index: 2;
          }
          
          .quick-icon-wrapper {
            flex-shrink: 0;
          }
          
          .quick-icon {
            font-size: 2.5rem;
            transition: transform 0.3s ease;
          }
          
          .quick-access-card:hover .quick-icon {
            transform: scale(1.1);
          }
          
          .quick-info {
            flex: 1;
          }
          
          .quick-title {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #fff;
          }
          
          .quick-description {
            font-size: 0.95rem;
            color: #cbd5e1;
            margin: 0;
            line-height: 1.5;
          }
          
          .quick-arrow {
            flex-shrink: 0;
            color: ${currentColor.text};
            transition: transform 0.3s ease;
          }
          
          .quick-access-card:hover .quick-arrow {
            transform: translateX(4px);
          }
        `}</style>
      </div>
    </Link>
  );
};

/**
 * 办公地点卡片组件 - 增强版
 */
const OfficeCard = ({ city, address, phone, email }) => {
  return (
    <div className="office-card">
      <div className="office-header">
        <h3 className="office-city">{city}</h3>
        <div className="office-status">
          <div className="status-dot"></div>
          <span>营业中</span>
        </div>
      </div>
      <div className="office-info">
        <div className="info-item">
          <div className="info-icon">📍</div>
          <div className="info-text">{address}</div>
        </div>
        
        <div className="info-item">
          <div className="info-icon">📞</div>
          <div className="info-text">
            <a href={`tel:${phone}`} className="phone-link">{phone}</a>
          </div>
        </div>
        
        <div className="info-item">
          <div className="info-icon">✉️</div>
          <div className="info-text">
            <a href={`mailto:${email}`} className="email-link">{email}</a>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .office-card {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.03) 0%, 
            rgba(255, 255, 255, 0.08) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2.5rem;
          border-radius: 12px;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }
        
        .office-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, 
            rgba(59, 130, 246, 0.8) 0%, 
            rgba(147, 197, 253, 0.8) 50%, 
            rgba(59, 130, 246, 0.8) 100%);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        
        .office-card:hover::after {
          transform: scaleX(1);
        }
        
        .office-card:hover {
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.05) 0%, 
            rgba(255, 255, 255, 0.1) 100%);
          border-color: rgba(59, 130, 246, 0.3);
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        }
        
        .office-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .office-city {
          font-size: 1.6rem;
          margin: 0;
          background: linear-gradient(135deg, #fff 0%, rgba(59, 130, 246, 0.8) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 600;
        }
        
        .office-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: #10b981;
        }
        
        .status-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .office-info {
          margin-top: 1.5rem;
        }
        
        .info-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 1.2rem;
          transition: transform 0.2s ease;
        }
        
        .info-item:hover {
          transform: translateX(5px);
        }
        
        .info-icon {
          font-size: 1.2rem;
          margin-right: 1rem;
          flex-shrink: 0;
          filter: grayscale(0.3);
          transition: filter 0.3s ease;
        }
        
        .info-item:hover .info-icon {
          filter: grayscale(0);
        }
        
        .info-text {
          font-size: 1.1rem;
          color: #e2e8f0;
          line-height: 1.5;
        }
        
        .phone-link, .email-link {
          color: inherit;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .phone-link:hover, .email-link:hover {
          color: rgba(59, 130, 246, 0.9);
          text-shadow: 0 0 8px rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </div>
  );
};

/**
 * 常见问题项组件 - 增强版
 */
const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`} onClick={onClick}>
      <div className="faq-question">
        <div className="question-content">
          <div className="question-number">?</div>
          <div className="question-text">{question}</div>
        </div>
        <div className="question-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path 
              d={isOpen ? "M6 12H18" : "M12 6V18M6 12H18"} 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      
      <div className="faq-answer">
        <div className="answer-content">
          <div className="answer-icon">💡</div>
          <p>{answer}</p>
        </div>
      </div>
      
      <style jsx>{`
        .faq-item {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.03) 0%, 
            rgba(255, 255, 255, 0.08) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          margin-bottom: 1.5rem;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          backdrop-filter: blur(10px);
          position: relative;
        }
        
        .faq-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, 
            rgba(59, 130, 246, 0.8) 0%, 
            rgba(147, 197, 253, 0.8) 50%, 
            rgba(59, 130, 246, 0.8) 100%);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        
        .faq-item:hover::before {
          transform: scaleX(1);
        }
        
        .faq-item:hover {
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.05) 0%, 
            rgba(255, 255, 255, 0.12) 100%);
          border-color: rgba(59, 130, 246, 0.3);
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        }
        
        .faq-item.open {
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.08) 0%, 
            rgba(255, 255, 255, 0.12) 100%);
          border-color: rgba(59, 130, 246, 0.4);
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(59, 130, 246, 0.15);
        }
        
        .faq-item.open::before {
          transform: scaleX(1);
          background: linear-gradient(90deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 50%, 
            rgba(59, 130, 246, 1) 100%);
        }
        
        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem 2.5rem;
        }
        
        .question-content {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex: 1;
        }
        
        .question-number {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.8) 0%, 
            rgba(147, 197, 253, 0.8) 100%);
          color: #000;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          font-weight: 700;
          flex-shrink: 0;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
        }
        
        .faq-item:hover .question-number {
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
        }
        
        .question-text {
          font-size: 1.2rem;
          font-weight: 600;
          color: #fff;
          line-height: 1.4;
          transition: color 0.3s ease;
        }
        
        .faq-item:hover .question-text {
          color: rgba(147, 197, 253, 1);
        }
        
        .question-icon {
          color: rgba(59, 130, 246, 0.8);
          transition: all 0.4s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
        }
        
        .faq-item:hover .question-icon {
          color: rgba(59, 130, 246, 1);
          background: rgba(59, 130, 246, 0.15);
          border-color: rgba(59, 130, 246, 0.4);
          transform: rotate(90deg);
        }
        
        .faq-item.open .question-icon {
          transform: rotate(45deg);
          color: rgba(59, 130, 246, 1);
          background: rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.5);
        }
        
        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          background: rgba(0, 0, 0, 0.1);
        }
        
        .faq-item.open .faq-answer {
          max-height: 600px;
        }
        
        .answer-content {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 0 2.5rem 2.5rem;
          margin-top: 1rem;
        }
        
        .answer-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
          margin-top: 0.2rem;
          filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.3));
        }
        
        .answer-content p {
          font-size: 1rem;
          line-height: 1.7;
          color: #cbd5e1;
          margin: 0;
          padding-left: 1rem;
          border-left: 3px solid rgba(59, 130, 246, 0.3);
          background: rgba(59, 130, 246, 0.03);
          padding: 1rem 1.5rem;
          border-radius: 8px;
          flex: 1;
        }
        
        /* 响应式设计 */
        @media (max-width: 768px) {
          .faq-question {
            padding: 1.5rem 1.5rem;
          }
          
          .question-content {
            gap: 1rem;
          }
          
          .question-number {
            width: 35px;
            height: 35px;
            font-size: 1rem;
          }
          
          .question-text {
            font-size: 1.1rem;
          }
          
          .answer-content {
            padding: 0 1.5rem 2rem;
            gap: 0.8rem;
          }
          
          .answer-icon {
            font-size: 1.3rem;
          }
          
          .answer-content p {
            font-size: 0.95rem;
            padding: 0.8rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};

/**
 * 联系我们页面 - 增强版
 */
const ContactPage = () => {
  // 表单状态
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [submitStatus, setSubmitStatus] = useState(null);
  
  // 常见问题列表
  const [faqList, setFaqList] = useState([
    {
      question: "贵公司的产品是否支持定制化开发？",
      answer: "是的，我们提供定制化开发服务，可以根据客户的具体需求调整产品功能和参数，为客户提供最适合的解决方案。欢迎与我们的技术团队联系，详细讨论您的需求。",
      isOpen: false
    },
    {
      question: "如何获取产品的技术支持？",
      answer: "我们为所有产品提供全面的技术支持，包括产品使用培训、故障排除和定期维护等。您可以通过电话、邮件或在线表单联系我们的技术支持团队，我们将在24小时内响应您的问题。",
      isOpen: false
    },
    {
      question: "产品是否有保修期？",
      answer: "是的，我们的所有产品均提供至少一年的保修期，在此期间因产品质量问题导致的故障，我们将免费提供维修或更换服务。部分高端产品可提供更长的保修期，具体以产品说明为准。",
      isOpen: false
    },
    {
      question: "如何成为贵公司的合作伙伴？",
      answer: "我们欢迎与各行业的企业建立合作关系。如果您对我们的产品和技术感兴趣，希望成为我们的经销商、集成商或技术合作伙伴，请通过邮件或电话与我们的商务团队联系，详细说明您的合作意向。",
      isOpen: false
    },
    {
      question: "贵公司是否提供产品样品或演示？",
      answer: "是的，对于有意向的客户，我们可以提供产品样品测试或现场演示服务，帮助您更好地了解产品性能和功能。请提前与我们的销售团队预约，我们将安排专业人员为您服务。",
      isOpen: false
    }
  ]);
  
  // 处理表单输入变化
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 模拟表单提交
    setSubmitStatus('submitting');
    
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // 3秒后重置状态
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }, 1500);
  };
  
  // 切换FAQ项的展开/收起状态
  const toggleFAQ = (index) => {
    const updatedFAQList = [...faqList];
    updatedFAQList[index].isOpen = !updatedFAQList[index].isOpen;
    setFaqList(updatedFAQList);
  };
  
  return (
    <Layout title="EEnous - 联系我们">
      <div className="contact-page">
        <div className="page-bg">
          <video autoPlay muted loop className="bg-video">
            <source src="/videos/contact-bg.mp4" type="video/mp4" />
          </video>
          <div className="bg-overlay"></div>
          <div className="bg-particles"></div>
        </div>
        
        <div className="page-content">
          {/* 英雄区域 - 增强版 */}
          <div className="hero-section">
            <div className="hero-badge animate-fadeIn">
              <span className="badge-icon">📞</span>
              <span>CONTACT US</span>
            </div>
            <h1 className="page-title animate-fadeIn animate-delay-100">
              联系<span className="title-highlight">我们</span>
            </h1>
            <div className="title-separator animate-scaleX animate-delay-200"></div>
            <p className="page-subtitle animate-fadeIn animate-delay-300">
              如果您对我们的产品和解决方案感兴趣，或有任何疑问，欢迎随时联系我们
            </p>
          </div>
          
          {/* 联系方式卡片区域 */}
          <div className="contact-cards animate-fadeIn animate-delay-400">
            <div className="card-grid">
              <ContactCard 
                title="电话咨询"
                info="13951791713"
                icon="📞"
                link="tel:13951791713"
                isExternal={true}
              />
              
              <ContactCard 
                title="电子邮件"
                info="contact@eenous.com"
                icon="✉️"
                link="mailto:contact@eenous.com"
                isExternal={true}
              />
              
              <ContactCard 
                title="工作时间"
                info="周一至周五: 9:00 - 18:00"
                icon="🕒"
              />
            </div>
          </div>
          
          {/* 新增：快速入口区域 */}
          <div className="quick-access-section animate-fadeIn animate-delay-500">
            <h2 className="section-title">
              <span className="title-icon">🚀</span>
              快速通道
            </h2>
            <div className="quick-access-grid">
              <QuickAccessCard 
                title="招聘信息"
                description="加入我们的团队，共同推动科技创新"
                icon="👥"
                link="/join-us"
                color="green"
              />
              
              <QuickAccessCard 
                title="技术合作站"
                description="寻求技术合作，共创美好未来"
                icon="🤝"
                link="/tech-cooperation"
                color="purple"
              />
            </div>
          </div>
          
          {/* 主要内容区域 */}
          <div className="contact-main animate-fadeIn animate-delay-600">
            <div className="form-section">
              <h2 className="section-title">
                <span className="title-icon">💬</span>
                发送消息
              </h2>
              <p className="section-subtitle">
                填写下面的表单，我们将尽快与您联系
              </p>
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">姓名 <span className="required">*</span></label>
                    <input 
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="请输入您的姓名"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">电子邮箱 <span className="required">*</span></label>
                    <input 
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">电话</label>
                    <input 
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="请输入您的电话号码"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">主题 <span className="required">*</span></label>
                    <input 
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="请输入咨询主题"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">消息 <span className="required">*</span></label>
                  <textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    placeholder="请详细描述您的问题或需求..."
                  ></textarea>
                </div>
                
                <div className="form-actions">
                  <button 
                    type="submit" 
                    className={`submit-button ${submitStatus === 'submitting' ? 'submitting' : ''}`}
                    disabled={submitStatus === 'submitting'}
                  >
                    <span className="button-text">
                      {submitStatus === 'submitting' ? '发送中...' : '发送消息'}
                    </span>
                    <span className="button-icon">
                      {submitStatus === 'submitting' ? '⏳' : '🚀'}
                    </span>
                  </button>
                </div>
                
                {submitStatus === 'success' && (
                  <div className="success-message animate-fadeIn">
                    <div className="success-icon">✅</div>
                    <div className="success-text">
                      <strong>发送成功！</strong>
                      <p>您的消息已成功发送，我们将尽快与您联系。</p>
                    </div>
                  </div>
                )}
              </form>
            </div>
            
            <div className="map-section">
              <h2 className="section-title">
                <span className="title-icon">📍</span>
                公司地址
              </h2>
              <div className="map-container">
                <div className="map-placeholder">
                  <div className="map-icon">🗺️</div>
                  <p className="map-text">地图加载中...</p>
                  <p className="map-address">南京市江宁区东南大学路9号江宁开发区</p>
                  <div className="map-actions">
                    <button className="map-button">
                      <span>📱</span>
                      打开地图
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 办公地点区域 */}
          <div className="offices-section animate-fadeIn animate-delay-700">
            <h2 className="section-title">
              <span className="title-icon">🏢</span>
              我们的办公地点
            </h2>
            <div className="offices-grid">
              <OfficeCard 
                city="南京总部"
                address="南京市江宁区东南大学路9号江宁开发区"
                phone="13951791713"
                email="nanjing@eenous.com"
              />
              
              <OfficeCard 
                city="西安研发中心"
                address="西安市高新区科技路50号科技企业加速器"
                phone="18535609150"
                email="xian@eenous.com"
              />
            </div>
          </div>
          
          {/* 常见问题区域 */}
          <div className="faq-section animate-fadeIn animate-delay-800">
            <div className="faq-header">
              <h2 className="section-title">
                <span className="title-icon">❓</span>
                常见问题
              </h2>
              <p className="section-subtitle">
                这里汇总了客户最关心的问题和解答，如果您有其他疑问，请随时联系我们
              </p>
            </div>
            
            <div className="faq-stats">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">客户咨询</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24h</div>
                <div className="stat-label">响应时间</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">99%</div>
                <div className="stat-label">问题解决率</div>
              </div>
            </div>
            
            <div className="faq-list">
              {faqList.map((faq, index) => (
                <FAQItem 
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={faq.isOpen}
                  onClick={() => toggleFAQ(index)}
                />
              ))}
            </div>
            
            <div className="faq-cta">
              <div className="cta-content">
                <h3>没有找到您的问题？</h3>
                <p>我们的专业团队随时为您解答任何疑问</p>
                <div className="cta-buttons">
                  <button className="cta-button primary">
                    <span>📞</span>
                    联系我们
                  </button>
                  <button className="cta-button secondary">
                    <span>💬</span>
                    在线咨询
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        /* 页面基础样式 */
        .contact-page {
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }
        
        /* 背景样式 - 增强版 */
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
            rgba(0, 0, 0, 0.8) 25%,
            rgba(15, 23, 42, 0.9) 50%,
            rgba(0, 0, 0, 0.8) 75%,
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
            radial-gradient(2px 2px at 20% 30%, rgba(59, 130, 246, 0.3), transparent),
            radial-gradient(2px 2px at 40% 70%, rgba(147, 197, 253, 0.2), transparent),
            radial-gradient(1px 1px at 90% 40%, rgba(59, 130, 246, 0.4), transparent),
            radial-gradient(1px 1px at 10% 80%, rgba(147, 197, 253, 0.3), transparent);
          background-repeat: repeat;
          background-size: 100px 100px, 150px 150px, 200px 200px, 120px 120px;
          animation: particlesFloat 20s linear infinite;
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
        
        /* 英雄区域样式 - 增强版 */
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
            rgba(59, 130, 246, 0.1) 0%, 
            rgba(147, 197, 253, 0.1) 100%);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 50px;
          color: rgba(59, 130, 246, 0.9);
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.1);
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
            rgba(59, 130, 246, 0.8) 50%,
            #ffffff 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 40px rgba(59, 130, 246, 0.3);
        }
        
        .title-highlight {
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
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
          margin: 0 auto 2rem;
          border-radius: 2px;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
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
        
        /* 联系卡片区域样式 */
        .contact-cards {
          margin-bottom: 6rem;
        }
        
        .card-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
        }
        
        /* 快速入口区域样式 */
        .quick-access-section {
          margin-bottom: 6rem;
          padding: 3rem 0;
        }
        
        .quick-access-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin-top: 3rem;
        }
        
        /* 区域标题样式 */
        .section-title {
          font-size: 2.2rem;
          font-weight: 600;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          background: linear-gradient(135deg, #fff 0%, rgba(59, 130, 246, 0.8) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .title-icon {
          font-size: 2rem;
          filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.3));
        }
        
        .section-subtitle {
          font-size: 1.2rem;
          color: #94a3b8;
          margin-bottom: 2.5rem;
          line-height: 1.7;
          font-weight: 300;
        }
        
        /* 主要内容区域样式 */
        .contact-main {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 4rem;
          margin-bottom: 6rem;
        }
        
        /* 表单样式 - 增强版 */
        .contact-form {
          margin-top: 3rem;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }
        
        .form-group {
          margin-bottom: 2rem;
        }
        
        label {
          display: block;
          margin-bottom: 0.8rem;
          font-size: 1rem;
          color: #e2e8f0;
          font-weight: 500;
          letter-spacing: 0.5px;
        }
        
        .required {
          color: rgba(239, 68, 68, 0.8);
          font-weight: 600;
        }
        
        input, textarea {
          width: 100%;
          padding: 1.2rem 1.5rem;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.05) 0%, 
            rgba(255, 255, 255, 0.08) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: #fff;
          font-size: 1rem;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          backdrop-filter: blur(10px);
          font-family: inherit;
        }
        
        input::placeholder, textarea::placeholder {
          color: #64748b;
          font-style: italic;
        }
        
        input:focus, textarea:focus {
          outline: none;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.1) 0%, 
            rgba(255, 255, 255, 0.1) 100%);
          border-color: rgba(59, 130, 246, 0.5);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          transform: translateY(-2px);
        }
        
        textarea {
          resize: vertical;
          min-height: 120px;
        }
        
        /* 提交按钮样式 - 增强版 */
        .form-actions {
          margin-top: 3rem;
        }
        
        .submit-button {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          padding: 1.2rem 3rem;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(147, 197, 253, 1) 100%);
          color: #000;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
        }
        
        .submit-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.3), 
            transparent);
          transition: left 0.6s ease;
        }
        
        .submit-button:hover::before {
          left: 100%;
        }
        
        .submit-button:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 15px 40px rgba(59, 130, 246, 0.4);
        }
        
        .submit-button.submitting {
          opacity: 0.8;
          cursor: not-allowed;
          transform: none;
        }
        
        .button-text {
          position: relative;
          z-index: 2;
        }
        
        .button-icon {
          font-size: 1.1rem;
          transition: transform 0.3s ease;
        }
        
        .submit-button:hover .button-icon {
          transform: scale(1.2);
        }
        
        /* 成功消息样式 - 增强版 */
        .success-message {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
          padding: 1.5rem 2rem;
          background: linear-gradient(135deg, 
            rgba(34, 197, 94, 0.1) 0%, 
            rgba(134, 239, 172, 0.1) 100%);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: 12px;
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 25px rgba(34, 197, 94, 0.1);
        }
        
        .success-icon {
          font-size: 1.5rem;
        }
        
        .success-text strong {
          color: #10b981;
          display: block;
          margin-bottom: 0.5rem;
        }
        
        .success-text p {
          color: #cbd5e1;
          margin: 0;
          font-size: 0.95rem;
        }
        
        /* 地图区域样式 - 增强版 */
        .map-container {
          margin-top: 3rem;
          height: 100%;
        }
        
        .map-placeholder {
          width: 100%;
          height: 100%;
          min-height: 350px;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.05) 0%, 
            rgba(255, 255, 255, 0.08) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 3rem;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        
        .map-placeholder:hover {
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.05) 0%, 
            rgba(255, 255, 255, 0.1) 100%);
          border-color: rgba(59, 130, 246, 0.2);
        }
        
        .map-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          filter: grayscale(0.3);
        }
        
        .map-text {
          font-size: 1.1rem;
          color: #94a3b8;
          margin-bottom: 0.5rem;
        }
        
        .map-address {
          font-size: 1rem;
          color: #cbd5e1;
          margin-bottom: 2rem;
          line-height: 1.5;
        }
        
        .map-actions {
          margin-top: 1.5rem;
        }
        
        .map-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem 1.5rem;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 25px;
          color: rgba(59, 130, 246, 0.9);
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .map-button:hover {
          background: rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.5);
          transform: translateY(-2px);
        }
        
        /* 办公地点区域样式 */
        .offices-section {
          margin-bottom: 6rem;
          padding: 3rem 0;
        }
        
        .offices-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          margin-top: 3rem;
        }
        
        /* FAQ区域样式 - 增强版 */
        .faq-section {
          margin-bottom: 6rem;
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
        
        .faq-section::before {
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
        
        .faq-header {
          text-align: center;
          margin-bottom: 4rem;
          position: relative;
          z-index: 1;
        }
        
        .faq-header .section-title {
          font-size: 2.8rem;
          margin-bottom: 1.5rem;
          justify-content: center;
        }
        
        .faq-header .section-subtitle {
          font-size: 1.3rem;
          color: #94a3b8;
          max-width: 600px;
          margin: 0 auto 3rem;
          line-height: 1.8;
        }
        
        .faq-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 4rem;
          position: relative;
          z-index: 1;
        }
        
        .stat-item {
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
        
        .stat-item::before {
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
        
        .stat-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(59, 130, 246, 0.2);
        }
        
        .stat-item:hover::before {
          transform: scaleX(1);
        }
        
        .stat-number {
          font-size: 2.5rem;
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
        }
        
        .faq-list {
          margin: 3rem 0;
          position: relative;
          z-index: 1;
        }
        
        .faq-cta {
          margin-top: 4rem;
          padding: 3rem;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.1) 0%, 
            rgba(255, 255, 255, 0.05) 100%);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 20px;
          text-align: center;
          backdrop-filter: blur(15px);
          position: relative;
          z-index: 1;
        }
        
        .cta-content h3 {
          font-size: 1.8rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 1rem;
        }
        
        .cta-content p {
          font-size: 1.1rem;
          color: #94a3b8;
          margin-bottom: 2.5rem;
          line-height: 1.6;
        }
        
        .cta-buttons {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          padding: 1rem 2rem;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          letter-spacing: 0.5px;
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
        .animate-delay-800 { animation-delay: 800ms; }
        
        /* 响应式设计 */
        @media (max-width: 1200px) {
          .page-content {
            max-width: 1100px;
            padding: 130px 1.5rem 4rem;
          }
          
          .contact-main {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          
          .card-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
        }
        
        @media (max-width: 992px) {
          .page-title {
            font-size: 3rem;
            letter-spacing: 2px;
          }
          
          .offices-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .quick-access-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .faq-stats {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .stat-item {
            padding: 1.5rem 1rem;
          }
          
          .stat-number {
            font-size: 2rem;
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
          
          .card-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
          
          .hero-section {
            margin-bottom: 4rem;
            padding: 2rem 0;
          }
          
          .contact-cards, 
          .quick-access-section, 
          .contact-main, 
          .offices-section {
            margin-bottom: 4rem;
          }
          
          .faq-section {
            padding: 2.5rem 1rem;
          }
          
          .faq-header .section-title {
            font-size: 2rem;
          }
          
          .faq-header .section-subtitle {
            font-size: 1.1rem;
          }
          
          .faq-cta {
            padding: 2rem 1.5rem;
          }
          
          .cta-content h3 {
            font-size: 1.5rem;
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .cta-button {
            width: 100%;
            max-width: 280px;
            justify-content: center;
          }
        }
        
        @media (max-width: 480px) {
          .page-title {
            font-size: 2rem;
          }
          
          .submit-button {
            width: 100%;
            justify-content: center;
          }
          
          .map-placeholder {
            min-height: 250px;
            padding: 2rem;
          }
        }
      `}</style>
    </Layout>
  );
};

export default ContactPage; 