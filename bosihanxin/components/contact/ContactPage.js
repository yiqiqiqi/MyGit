import React, { useState } from 'react';
import { COMPANY_INFO, CONTACT_LOCATIONS } from '../../constants/appConstants';

/**
 * 联系表单组件 - 增强SpaceX风格
 */
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 模拟表单提交
    setFormStatus({
      submitted: true,
      success: true,
      message: '您的消息已成功发送，我们将尽快与您联系。'
    });
    
    // 重置表单
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // 5秒后重置状态
    setTimeout(() => {
      setFormStatus({
        submitted: false,
        success: false,
        message: ''
      });
    }, 5000);
  };
  
  return (
    <div className="contact-form animate-fadeIn animate-delay-200">
      <h3 className="form-title">发送消息</h3>
      
      {formStatus.submitted ? (
        <div className={`form-message ${formStatus.success ? 'success' : 'error'}`}>
          {formStatus.message}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">姓名</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="请输入您的姓名"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">邮箱</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="请输入您的邮箱"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="subject">主题</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="请输入消息主题"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">消息</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
              placeholder="请输入您的消息内容"
            ></textarea>
          </div>
          
          <button type="submit" className="btn btn-primary">发送消息</button>
        </form>
      )}
      
      <style jsx>{`
        .contact-form {
          width: 100%;
          max-width: 600px;
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2.5rem;
        }
        
        .form-title {
          font-size: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 2rem;
          position: relative;
          display: inline-block;
        }
        
        .form-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 40px;
          height: 1px;
          background-color: #fff;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        label {
          display: block;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.9rem;
          color: #aaa;
        }
        
        input, textarea {
          width: 100%;
          padding: 0.8rem;
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          font-family: inherit;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        
        input:focus, textarea:focus {
          outline: none;
          border-color: rgba(255, 255, 255, 0.3);
          background-color: rgba(255, 255, 255, 0.1);
        }
        
        ::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }
        
        .btn {
          margin-top: 1rem;
          width: 100%;
        }
        
        .form-message {
          padding: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 1.5rem;
          text-align: center;
        }
        
        .form-message.success {
          background-color: rgba(76, 175, 80, 0.1);
          border-color: rgba(76, 175, 80, 0.3);
        }
        
        .form-message.error {
          background-color: rgba(244, 67, 54, 0.1);
          border-color: rgba(244, 67, 54, 0.3);
        }
      `}</style>
    </div>
  );
};

/**
 * 联系信息组件 - 增强SpaceX风格
 */
const ContactInfo = () => (
  <div className="contact-info animate-fadeIn">
    <h3 className="info-title">联系方式</h3>
    
    <div className="info-item">
      <div className="info-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </div>
      <div className="info-content">
        <div className="info-label">总部地址</div>
        <div className="info-value">{COMPANY_INFO.ADDRESS}</div>
      </div>
    </div>
    
    <div className="info-item">
      <div className="info-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      </div>
      <div className="info-content">
        <div className="info-label">电话</div>
        <div className="info-value">{COMPANY_INFO.PHONE}</div>
      </div>
    </div>
    
    <div className="info-item">
      <div className="info-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      </div>
      <div className="info-content">
        <div className="info-label">邮箱</div>
        <div className="info-value">{COMPANY_INFO.EMAIL}</div>
      </div>
    </div>
    
    <div className="info-item">
      <div className="info-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      </div>
      <div className="info-content">
        <div className="info-label">工作时间</div>
        <div className="info-value">{COMPANY_INFO.WORKING_HOURS}</div>
      </div>
    </div>
    
    <style jsx>{`
      .contact-info {
        margin-bottom: 3rem;
      }
      
      .info-title {
        font-size: 1.5rem;
        margin-bottom: 2rem;
        text-transform: uppercase;
        letter-spacing: 2px;
        position: relative;
        display: inline-block;
      }
      
      .info-title::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 40px;
        height: 1px;
        background-color: #fff;
      }
      
      .info-item {
        display: flex;
        margin-bottom: 1.5rem;
        align-items: flex-start;
      }
      
      .info-icon {
        margin-right: 1rem;
        color: #fff;
        opacity: 0.8;
        padding-top: 0.2rem;
      }
      
      .info-content {
        flex: 1;
      }
      
      .info-label {
        color: #aaa;
        margin-bottom: 0.3rem;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      
      .info-value {
        font-size: 1.1rem;
      }
    `}</style>
  </div>
);

/**
 * 位置卡片组件 - 增强SpaceX风格
 */
const LocationCard = ({ name, address, phone, email }) => (
  <div className="location-card">
    <h3 className="location-name">{name}</h3>
    <div className="location-details">
      <div className="location-item">
        <div className="location-label">地址</div>
        <div className="location-value">{address}</div>
      </div>
      
      <div className="location-item">
        <div className="location-label">电话</div>
        <div className="location-value">{phone}</div>
      </div>
      
      <div className="location-item">
        <div className="location-label">邮箱</div>
        <div className="location-value">{email}</div>
      </div>
    </div>
    
    <style jsx>{`
      .location-card {
        background-color: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 1.5rem;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }
      
      .location-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 3px;
        height: 0;
        background-color: #fff;
        transition: height 0.3s ease;
      }
      
      .location-card:hover {
        background-color: rgba(255, 255, 255, 0.1);
        transform: translateY(-5px);
      }
      
      .location-card:hover::before {
        height: 100%;
      }
      
      .location-name {
        font-size: 1.2rem;
        margin-bottom: 1rem;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      
      .location-item {
        margin-bottom: 0.8rem;
      }
      
      .location-label {
        color: #aaa;
        font-size: 0.8rem;
        margin-bottom: 0.2rem;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      
      .location-value {
        font-size: 0.9rem;
      }
    `}</style>
  </div>
);

/**
 * 联系页面组件 - 增强SpaceX风格
 */
export const ContactPage = () => {
  return (
    <div className="contact-page">
      <div className="contact-bg">
        <video autoPlay muted loop className="bg-video">
          <source src="/videos/earth-view.mp4" type="video/mp4" />
        </video>
        <div className="bg-overlay"></div>
      </div>
      
      <div className="contact-content">
        <div className="contact-left">
          <h2 className="section-title animate-fadeIn">联系我们</h2>
          
          <div className="section-intro animate-fadeIn animate-delay-200">
            <p>我们期待与您沟通交流，无论是产品咨询、技术合作还是加入我们的团队，都欢迎您通过以下方式与我们联系。</p>
          </div>
          
          <ContactInfo />
          
          <div className="locations-section animate-fadeIn animate-delay-400">
            <h3 className="locations-title">办公地点</h3>
            <div className="locations-grid">
              {CONTACT_LOCATIONS.map((location, index) => (
                <LocationCard 
                  key={index}
                  name={location.name}
                  address={location.address}
                  phone={location.phone}
                  email={location.email}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="contact-right">
          <ContactForm />
        </div>
      </div>
      
      <style jsx>{`
        .contact-page {
          height: 100vh;
          position: relative;
          overflow: hidden;
        }
        
        .contact-bg {
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
        
        .contact-content {
          height: 100%;
          display: flex;
          padding: 0 10%;
          max-width: 1400px;
          margin: 0 auto;
          align-items: center;
        }
        
        .contact-left {
          flex: 1;
          padding-right: 3rem;
        }
        
        .contact-right {
          flex: 1;
        }
        
        .section-title {
          font-size: 2.5rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 1.5rem;
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
        
        .section-intro {
          max-width: 600px;
          margin-bottom: 2.5rem;
        }
        
        .section-intro p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #ccc;
        }
        
        .locations-title {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          position: relative;
          display: inline-block;
        }
        
        .locations-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 40px;
          height: 1px;
          background-color: #fff;
        }
        
        .locations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1.5rem;
        }
        
        @media (max-width: 992px) {
          .contact-content {
            flex-direction: column;
            padding: 5rem 5% 2rem;
            overflow-y: auto;
            justify-content: flex-start;
          }
          
          .contact-left, .contact-right {
            flex: none;
            width: 100%;
            padding-right: 0;
          }
          
          .contact-left {
            margin-bottom: 3rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .section-intro p {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactPage; 