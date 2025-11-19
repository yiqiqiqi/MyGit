import React from 'react';
// import Image from 'next/image';
import Link from 'next/link';
import { useAppContext } from '../context/AppContext';

/**
 * 备用页头组件 - 简化版本，与主Header组件功能类似
 */
const MyHeader = () => {
  // 使用AppContext
  const { appState, toggleMenu, setCurrentPage } = useAppContext();
  const { isMenuOpen, currentPage } = appState;

  // 导航项
  const navItems = [
    { name: '首页', index: 0 },
    { name: '关于我们', index: 1 },
    { name: '联系我们', index: 2 }
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex items-center">
          <Link href="/">
            <div className="relative w-32 h-10">
              {/* 替换Image组件为普通img标签 */}
              <img 
                src="https://via.placeholder.com/150x50?text=Logo" 
                alt="公司Logo" 
                width={130}
                height={40}
                style={{maxWidth: '100%', height: 'auto'}}
              />
            </div>
          </Link>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link 
              key={item.index} 
              href={`/${item.name.toLowerCase()}`}
              className={`text-gray-800 hover:text-blue-600 transition ${currentPage === item.index ? 'active' : ''}`}
              onClick={() => setCurrentPage(item.index)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        {/* 移动端菜单按钮 */}
        <div className="mobile-menu-button" onClick={toggleMenu}>
          <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      {/* 移动端菜单 */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg z-50">
          <div className="flex flex-col p-4">
            {navItems.map((item) => (
              <Link 
                key={item.index} 
                href={`/${item.name.toLowerCase()}`}
                className="py-2 text-gray-800 hover:text-blue-600 transition"
                onClick={() => {
                  setCurrentPage(item.index);
                  toggleMenu();
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .my-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          background-color: rgba(255, 255, 255, 0.9);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: bold;
        }

        .logo-ee {
          color: #0072fe;
        }

        .logo-nous {
          color: #4f58e5;
        }

        .main-nav {
          display: flex;
        }

        .nav-list {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-item {
          margin: 0 1rem;
          padding: 0.5rem 0;
          cursor: pointer;
          position: relative;
          transition: color 0.3s;
        }

        .nav-item:hover, .nav-item.active {
          color: #0072fe;
        }

        .nav-item.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: #0072fe;
        }

        .mobile-menu-button {
          display: none;
          cursor: pointer;
        }

        .menu-icon {
          width: 30px;
          height: 20px;
          position: relative;
        }

        .menu-icon span {
          display: block;
          position: absolute;
          height: 2px;
          width: 100%;
          background: #333;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .menu-icon span:nth-child(1) {
          top: 0;
        }

        .menu-icon span:nth-child(2) {
          top: 9px;
        }

        .menu-icon span:nth-child(3) {
          top: 18px;
        }

        .menu-icon.open span:nth-child(1) {
          transform: rotate(45deg);
          top: 9px;
        }

        .menu-icon.open span:nth-child(2) {
          opacity: 0;
        }

        .menu-icon.open span:nth-child(3) {
          transform: rotate(-45deg);
          top: 9px;
        }

        .mobile-menu {
          display: none;
          background-color: white;
          padding: 1rem;
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
        }

        .mobile-nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .mobile-nav-item {
          padding: 1rem;
          border-bottom: 1px solid #eee;
          cursor: pointer;
        }

        .mobile-nav-item.active {
          color: #0072fe;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .main-nav {
            display: none;
          }

          .mobile-menu-button {
            display: block;
          }

          .mobile-menu.open {
            display: block;
          }
        }
      `}</style>
    </header>
  );
};

export default MyHeader;