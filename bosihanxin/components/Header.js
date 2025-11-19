import "./Header.css"
// import Image from "next/image";
import React, { useState, useEffect , useRef} from 'react';
import Link from 'next/link';

// 创建自定义Hook管理菜单状态
const useMenuState = () => {
    const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);
  
  const toggleMenu = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };
  
  useEffect(() => {
const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
      setActiveMenu(null);
    }
  };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);
  
  return { activeMenu, toggleMenu, menuRef };
};

// 提取菜单项组件
const MenuItem = ({ label, isActive, onClick, children }) => (
  <div className="relative group">
    <div 
      className={`cursor-pointer px-4 py-2 hover:text-blue-600 transition-all ${isActive ? 'text-blue-600' : ''}`}
      onClick={onClick}
    >
      {label}
    </div>
    {isActive && children}
                </div>
);

// 提取子菜单组件
const SubMenu = ({ items, className }) => (
  <div className={`absolute top-full bg-white shadow-lg rounded-md p-4 z-10 ${className}`}>
    {items.map((item, index) => (
      <div key={index} className="whitespace-nowrap py-2 hover:text-blue-600 transition-all">
        <Link href={item.link || '#'}>
          {item.label}
        </Link>
                </div>
    ))}
                </div>
);

const Header = () => {
  const { activeMenu, toggleMenu, menuRef } = useMenuState();
  
  // 菜单配置 - 可以移到单独的配置文件中
  const menuItems = [
    {
      label: '主营业务',
      key: 'business',
      submenu: [
        { label: '业务一', link: '/business/1' },
        { label: '业务二', link: '/business/2' },
        // ... existing code ...
      ]
    },
    // 其他菜单项...
  ];

  return (
    <header className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/70 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-20" ref={menuRef}>
        <div className="flex items-center">
          <Link href="/">
            <img 
              src="https://via.placeholder.com/150x50?text=Logo" 
              alt="Logo" 
              width={150} 
              height={50} 
              style={{maxWidth: '150px', height: 'auto'}}
            />
          </Link>
        </div>
        
        <nav className="flex items-center space-x-6">
          {menuItems.map((item) => (
            <MenuItem
              key={item.key}
              label={item.label}
              isActive={activeMenu === item.key}
              onClick={() => toggleMenu(item.key)}
            >
              {item.submenu && (
                <SubMenu items={item.submenu} className={item.className} />
              )}
            </MenuItem>
          ))}
        </nav>
</div>
    </header>
);
};

export default Header;