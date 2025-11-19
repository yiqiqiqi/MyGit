import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppContext } from '../context/AppContext';

/**
 * SpaceX风格的通用布局组件
 * 为所有页面提供一致的布局结构
 * 
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 子组件
 * @param {string} props.title - 页面标题
 * @param {string} props.description - 页面描述（用于SEO）
 */
const Layout = ({ 
  children, 
  title = 'EEnous - 南京玻丝焊芯科技有限公司', 
  description = '南京玻丝焊芯科技有限公司专注于光纤通信、工业物联网和精密仪器仪表领域的研发' 
}) => {
  const { appState } = useAppContext();
  const { theme } = appState;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`app-container ${theme} ${isScrolled ? 'scrolled' : ''}`}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* 
          图片建议: 
          - 创建一个公司logo的favicon图标
          - 标准尺寸为32x32或16x16像素
          - 格式为.ico或.png
          - 设计简洁明了，能在小尺寸下清晰辨识
          - 配色应与公司品牌一致
        */}
      </Head>

      <header className="site-header">
        <div className="logo">
          <Link href="/">
            <div className="logo-link">
              <div className="logo-image-container">
                <img src="/images/logo.png" alt="Logo" className="logo-image" />
              </div>
              <span className="logo-text">EENOUS</span>
            </div>
          </Link>
        </div>
        
        <div className="header-right">
          <div className="icp-info">
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
              <span className="icp-icon">🛡️</span>
              <span className="icp-text">苏ICP备2024089129号</span>
            </a>
          </div>
          
          <button className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <div className="menu-icon">
              <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
              <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
              <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
            </div>
          </button>
          
          <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
            <ul className="nav-links">
              <li className="nav-item">
                <Link href="/">
                  <div className="nav-link">首页</div>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/about">
                  <div className="nav-link">关于我们</div>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/organization">
                  <div className="nav-link">研发体系</div>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/businesses">
                  <div className="nav-link">核心业务</div>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/commercial">
                  <div className="nav-link">商业落地</div>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/contact">
                  <div className="nav-link">联系我们</div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className={`main-content ${isMenuOpen ? 'no-scroll' : ''}`}>
        {children}
      </main>

      <style jsx global>{`
        /* 全局样式 - 隐藏滚动条但保持可滚动 */
        html {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        
        html::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }
        
        body {
          overflow-y: scroll;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        body::-webkit-scrollbar {
          width: 0;
          height: 0;
          display: none;
        }
      `}</style>

      <style jsx>{`
        .app-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #000;
          color: #fff;
        }
        
        .site-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 120px;
        }
        
        .header-right {
          display: flex;
          align-items: center;
          position: relative;
        }
        
        .icp-info {
          position: absolute;
          top: 10px;
          right: 40px;
          z-index: 1001;
        }
        
        .icp-info a {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          letter-spacing: 0.8px;
          transition: all 0.3s ease;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.1) 0%, 
            rgba(0, 0, 0, 0.4) 100%);
          padding: 6px 12px;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(59, 130, 246, 0.2);
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        
        .icp-info a:hover {
          color: rgba(255, 255, 255, 0.9);
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.2) 0%, 
            rgba(0, 0, 0, 0.6) 100%);
          border-color: rgba(59, 130, 246, 0.4);
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.15);
        }
        
        .icp-icon {
          font-size: 0.8rem;
          opacity: 0.8;
        }
        
        .icp-text {
          font-family: 'Courier New', monospace;
          font-weight: 500;
        }
        
        .logo {
          cursor: pointer;
          padding: 0;
          margin-left: 0;
        }
        
        .logo-link {
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        
        .logo-image-container {
          height: 120px;
          width: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 15px;
        }
        
        .logo-image {
          max-width: 100%;
          max-height: 100%;
          display: block;
        }
        
        .logo-text {
          font-size: 3rem;
          font-weight: 500;
          letter-spacing: 4px;
          text-transform: uppercase;
          margin-left: 30px;
          padding-right: 40px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
        }
        
        .menu-toggle {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0 40px;
          display: none;
          height: 120px;
          z-index: 1001;
        }
        
        .menu-icon {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 40px;
          height: 30px;
        }
        
        .bar {
          width: 100%;
          height: 4px;
          background-color: #fff;
          transition: all 0.3s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
        }
        
        .bar.open:nth-child(1) {
          transform: translateY(13px) rotate(45deg);
        }
        
        .bar.open:nth-child(2) {
          opacity: 0;
        }
        
        .bar.open:nth-child(3) {
          transform: translateY(-13px) rotate(-45deg);
        }
        
        .main-nav {
          margin-right: 0;
        }
        
        .nav-links {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          height: 120px;
          align-items: center;
        }
        
        .nav-item {
          margin: 0 30px;
        }
        
        .nav-link {
          font-size: 1.8rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          position: relative;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 40px 0;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
        }
        
        .nav-link:hover {
          opacity: 0.7;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 30px;
          left: 0;
          width: 0;
          height: 3px;
          background-color: #fff;
          transition: width 0.3s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        .main-content {
          flex: 1;
          width: 100%;
          margin-top: 120px;
        }
        
        .site-footer {
          background-color: #111;
          padding: 3rem 0 1.5rem;
          margin-top: 3rem;
        }
        
        .footer-content {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin-bottom: 2rem;
        }
        
        .footer-logo {
          flex: 1;
          min-width: 250px;
          margin-bottom: 1.5rem;
        }
        
        .company-name {
          font-size: 0.9rem;
          color: #aaa;
          margin-top: 0.5rem;
        }
        
        .footer-links {
          display: flex;
          flex-wrap: wrap;
          flex: 2;
        }
        
        .footer-section {
          flex: 1;
          min-width: 200px;
          margin-bottom: 1.5rem;
          padding-right: 1rem;
        }
        
        .footer-section h3 {
          font-size: 1.1rem;
          margin-bottom: 1rem;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
          display: inline-block;
        }
        
        .footer-section h3::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 30px;
          height: 1px;
          background-color: #fff;
        }
        
        .footer-section ul {
          padding: 0;
          list-style: none;
        }
        
        .footer-section li {
          margin-bottom: 0.5rem;
        }
        
        .footer-section a {
          color: #aaa;
          text-decoration: none;
          transition: color 0.3s;
        }
        
        .footer-section a:hover {
          color: #fff;
        }
        
        .footer-section p {
          color: #aaa;
          margin-bottom: 0.5rem;
        }
        
        .footer-bottom {
          padding-top: 1.5rem;
          border-top: 1px solid #333;
          text-align: center;
          font-size: 0.9rem;
          color: #777;
        }
        
        @media (max-width: 1200px) {
          .logo-text {
            font-size: 2.5rem;
          }
          
          .icp-info {
            right: 30px;
          }
          
          .nav-link {
            font-size: 1.5rem;
          }
          
          .nav-item {
            margin: 0 20px;
          }
        }
        
        @media (max-width: 992px) {
          .logo-image-container {
            height: 100px;
            width: 100px;
          }
          
          .logo-text {
            font-size: 2.2rem;
            margin-left: 20px;
          }
          
          .icp-info {
            top: 8px;
            right: 30px;
          }
          
          .nav-links {
            height: 100px;
          }
          
          .nav-link {
            font-size: 1.3rem;
            padding: 30px 0;
          }
          
          .nav-link::after {
            bottom: 20px;
          }
          
          .main-content {
            margin-top: 100px;
          }
          
          .site-header {
            height: 100px;
          }
        }
        
        @media (max-width: 768px) {
          .site-header {
            height: 80px;
          }
          
          .icp-info {
            position: absolute;
            top: 5px;
            right: 20px;
            z-index: 1001;
          }
          
          .icp-info a {
            font-size: 0.7rem;
            padding: 3px 6px;
          }
          
          .menu-toggle {
            display: flex;
            align-items: center;
            height: 80px;
            padding: 0 20px;
          }
          
          .logo-image-container {
            height: 80px;
            width: 80px;
            padding: 10px;
          }
          
          .logo-text {
            font-size: 2rem;
            letter-spacing: 2px;
          }
          
          .main-nav {
            position: fixed;
            top: 0;
            right: -100%;
            width: 100%;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.95);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transition: right 0.3s ease;
            margin-right: 0;
          }
          
          .main-nav.open {
            right: 0;
          }
          
          .nav-links {
            flex-direction: column;
            align-items: center;
            height: auto;
          }
          
          .nav-item {
            margin: 25px 0;
          }
          
          .nav-link {
            font-size: 2.2rem;
            padding: 15px 0;
          }
          
          .nav-link::after {
            bottom: 5px;
          }
          
          .main-content {
            margin-top: 80px;
          }
        }
        
        @media (max-width: 480px) {
          .icp-info {
            top: 3px;
            right: 15px;
          }
          
          .icp-info a {
            font-size: 0.6rem;
            padding: 2px 4px;
            gap: 4px;
            border-radius: 15px;
          }
          
          .icp-icon {
            font-size: 0.7rem;
          }
          
          .logo-text {
            font-size: 1.8rem;
            letter-spacing: 1px;
          }
          
          .site-header {
            height: 70px;
          }
          
          .main-content {
            margin-top: 70px;
          }
          
          .menu-toggle {
            height: 70px;
            padding: 0 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout; 