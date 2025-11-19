import React, { useState } from 'react';
import Head from 'next/head';
import { Tabs } from 'antd';
import { COMPANY_INFO, COMPANY_BUSINESSES, RESEARCH_DEPARTMENTS } from '../constants/appConstants';

// 注意：由于组件未正确导出，我们将创建模拟组件
// 创建模拟组件
const MockBrandTitle = () => (
  <div className="content_title" style={{textAlign: 'center'}}>
    <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>
      <span style={{color: '#0072fe', fontWeight: 'bold'}}>EE</span>
      <span style={{color: '#4f58e5'}}>NOUS</span>
    </div>
    <div style={{fontSize: '2rem', marginBottom: '2rem'}}>
      <span>玻丝焊</span><span style={{color: '#0072fe'}}>芯</span>
    </div>
    <div style={{marginTop: '1rem', color: '#666'}}>
      {COMPANY_INFO.SLOGAN || "专注光纤通信与工业物联网解决方案"}
    </div>
  </div>
);

const MockProductDisplay = () => (
  <div style={{display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '2rem'}}>
    <div style={{width: '150px', height: '120px', backgroundColor: '#eee', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>产品预览 1</div>
    <div style={{width: '150px', height: '120px', backgroundColor: '#eee', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>产品预览 2</div>
    <div style={{width: '150px', height: '120px', backgroundColor: '#eee', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>产品预览 3</div>
  </div>
);

const MockBusinessPreview = () => (
  <div style={{textAlign: 'center', marginTop: '2rem'}}>
    <h3 style={{color: '#0072fe', marginBottom: '1rem'}}>主营业务</h3>
    <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px'}}>
      {COMPANY_BUSINESSES.map((business) => (
        <div key={business.id} style={{padding: '10px 15px', background: 'rgba(0,114,254,0.1)', borderRadius: '4px', margin: '5px'}}>
          {business.title}
        </div>
      ))}
    </div>
  </div>
);

const MockTimelineItem = ({ year, children, delay = 0 }) => (
  <div style={{display: 'flex', marginBottom: '1rem'}}>
    <div style={{minWidth: '100px', fontWeight: 'bold', color: '#0072fe'}}>{year}</div>
    <div>{children}</div>
  </div>
);

const MockDepartmentItem = ({ name, location, description }) => (
  <div style={{padding: '15px', border: '1px solid #eee', borderRadius: '8px', margin: '10px 0'}}>
    <h4 style={{color: '#0072fe'}}>
      {name}
      <span style={{fontSize: '0.9rem', fontWeight: 'normal', marginLeft: '0.5rem', color: '#666'}}>（{location}）</span>
    </h4>
    <p style={{color: '#555'}}>{description}</p>
  </div>
);

const MockBusinessCard = ({ title, shortDesc, features, onClick }) => (
  <div style={{padding: '20px', border: '1px solid #eee', borderRadius: '8px', cursor: 'pointer'}} onClick={onClick}>
    <h3 style={{color: '#0072fe', marginBottom: '10px'}}>{title}</h3>
    <p style={{marginBottom: '15px'}}>{shortDesc}</p>
    <ul style={{paddingLeft: '20px'}}>
      {features.slice(0, 2).map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
    <div style={{textAlign: 'right', color: '#0072fe', marginTop: '10px'}}>了解更多</div>
  </div>
);

const MockContactInfo = ({ title, address, phone, email }) => (
  <div style={{padding: '20px', border: '1px solid #eee', borderRadius: '8px', marginBottom: '15px'}}>
    <h3 style={{color: '#0072fe', marginBottom: '10px'}}>{title}</h3>
    <p><strong>地址：</strong>{address}</p>
    <p><strong>电话：</strong>{phone}</p>
    <p><strong>邮箱：</strong>{email}</p>
  </div>
);

const { TabPane } = Tabs;

/**
 * 颜色展示组件
 */
const ColorPalette = () => {
  const colors = [
    { name: '主色调', value: '#0072fe' },
    { name: '主色调-浅色', value: '#4e95ff' },
    { name: '主色调-深色', value: '#0050b3' },
    { name: '辅助色', value: '#4f58e5' },
    { name: '成功色', value: '#4caf50' },
    { name: '警告色', value: '#ff9800' },
    { name: '错误色', value: '#f44336' },
    { name: '信息色', value: '#2196f3' },
  ];

  return (
    <div className="design-section">
      <h2>颜色系统</h2>
      <div className="color-grid">
        {colors.map((color) => (
          <div key={color.value} className="color-item">
            <div 
              className="color-box" 
              style={{ backgroundColor: color.value }}
            ></div>
            <div className="color-info">
              <div className="color-name">{color.name}</div>
              <div className="color-value">{color.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * 排版展示组件
 */
const Typography = () => {
  return (
    <div className="design-section">
      <h2>排版系统</h2>
      
      <div className="typography-item">
        <h1>标题 1 (H1)</h1>
        <p className="typography-desc">用于页面主标题，2.5rem/40px</p>
      </div>
      
      <div className="typography-item">
        <h2>标题 2 (H2)</h2>
        <p className="typography-desc">用于主要区块标题，2rem/32px</p>
      </div>
      
      <div className="typography-item">
        <h3>标题 3 (H3)</h3>
        <p className="typography-desc">用于次要区块标题，1.5rem/24px</p>
      </div>
      
      <div className="typography-item">
        <h4>标题 4 (H4)</h4>
        <p className="typography-desc">用于小区块标题，1.25rem/20px</p>
      </div>
      
      <div className="typography-item">
        <p className="text-body">正文文本</p>
        <p className="typography-desc">用于主要内容，1rem/16px</p>
      </div>
      
      <div className="typography-item">
        <p className="text-small">小号文本</p>
        <p className="typography-desc">用于辅助信息，0.875rem/14px</p>
      </div>
    </div>
  );
};

/**
 * 组件展示 - 首页组件
 */
const HomeComponents = () => {
  return (
    <div className="design-section">
      <h2>首页组件</h2>
      
      <div className="component-demo">
        <h3>品牌标题</h3>
        <div className="component-preview">
          <MockBrandTitle />
        </div>
      </div>
      
      <div className="component-demo">
        <h3>产品展示</h3>
        <div className="component-preview">
          <MockProductDisplay />
        </div>
      </div>
      
      <div className="component-demo">
        <h3>业务概览</h3>
        <div className="component-preview">
          <MockBusinessPreview />
        </div>
      </div>
    </div>
  );
};

/**
 * 组件展示 - 关于页面组件
 */
const AboutComponents = () => {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  
  return (
    <div className="design-section">
      <h2>关于页面组件</h2>
      
      <div className="component-demo">
        <h3>时间线项</h3>
        <div className="component-preview">
          <MockTimelineItem year="2022年8月" delay={0}>
            公司成立，开始研发三相放电光纤熔接系统
          </MockTimelineItem>
          <MockTimelineItem year="2022年底" delay={200}>
            获得首轮融资，成立西安研发中心
          </MockTimelineItem>
        </div>
      </div>
      
      <div className="component-demo">
        <h3>研发部门项</h3>
        <div className="component-preview">
          <div className="departments-container" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px'}}>
            {RESEARCH_DEPARTMENTS.slice(0, 2).map((department, index) => (
              <MockDepartmentItem 
                key={index}
                {...department}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="component-demo">
        <h3>业务卡片</h3>
        <div className="component-preview">
          <div className="business-cards-container" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px'}}>
            {COMPANY_BUSINESSES.slice(0, 2).map((business) => (
              <MockBusinessCard 
                key={business.id}
                title={business.title}
                shortDesc={business.shortDesc}
                features={business.features}
                onClick={() => setSelectedBusiness(business)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 组件展示 - 联系页面组件
 */
const ContactComponents = () => {
  return (
    <div className="design-section">
      <h2>联系页面组件</h2>
      
      <div className="component-demo">
        <h3>联系信息</h3>
        <div className="component-preview">
          <MockContactInfo 
            title="南京总部"
            address="南京市江宁区东南大学路9号江宁开发区"
            phone="13951791713"
            email="contact@eenous.com"
          />
        </div>
      </div>
    </div>
  );
};

/**
 * 响应式设计预览
 */
const ResponsivePreview = () => {
  const [width, setWidth] = useState('100%');
  
  const devices = [
    { name: '手机', width: '375px' },
    { name: '平板', width: '768px' },
    { name: '笔记本', width: '1024px' },
    { name: '桌面', width: '1440px' },
    { name: '全屏', width: '100%' },
  ];
  
  return (
    <div className="design-section">
      <h2>响应式设计预览</h2>
      
      <div className="device-buttons">
        {devices.map((device) => (
          <button 
            key={device.name}
            className="device-button"
            onClick={() => setWidth(device.width)}
          >
            {device.name}
          </button>
        ))}
      </div>
      
      <div className="responsive-container" style={{ width }}>
        <div className="responsive-frame">
          <div className="responsive-content">
            <MockBrandTitle />
            <MockBusinessPreview />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 设计预览页面
 */
const DesignPreview = () => {
  return (
    <>
      <Head>
        <title>EEnous - 设计系统预览</title>
        <meta name="description" content="EEnous 设计系统和组件预览" />
        <link href="/styles/design-preview.css" rel="stylesheet" />
      </Head>
      
      <div className="design-preview-container">
        <header className="design-header">
          <h1>EEnous 设计系统</h1>
          <p>组件和设计元素预览</p>
        </header>
        
        <main className="design-content">
          <Tabs defaultActiveKey="1">
            <TabPane tab="颜色系统" key="1">
              <ColorPalette />
            </TabPane>
            <TabPane tab="排版" key="2">
              <Typography />
            </TabPane>
            <TabPane tab="首页组件" key="3">
              <HomeComponents />
            </TabPane>
            <TabPane tab="关于页面组件" key="4">
              <AboutComponents />
            </TabPane>
            <TabPane tab="联系页面组件" key="5">
              <ContactComponents />
            </TabPane>
            <TabPane tab="响应式设计" key="6">
              <ResponsivePreview />
            </TabPane>
          </Tabs>
        </main>
        
        <footer className="design-footer">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.NAME_EN} - 设计系统预览</p>
        </footer>
      </div>
      
      <style jsx global>{`
        .design-preview-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }
        
        .design-header {
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #eee;
        }
        
        .design-header h1 {
          color: #0072fe;
          margin-bottom: 0.5rem;
        }
        
        .design-content {
          margin-bottom: 3rem;
        }
        
        .design-footer {
          margin-top: 3rem;
          padding-top: 1rem;
          border-top: 1px solid #eee;
          text-align: center;
          color: #666;
        }
        
        .design-section {
          margin-bottom: 3rem;
        }
        
        .design-section h2 {
          color: #0072fe;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #eee;
        }
        
        .color-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1.5rem;
        }
        
        .color-item {
          display: flex;
          align-items: center;
        }
        
        .color-box {
          width: 50px;
          height: 50px;
          border-radius: 8px;
          margin-right: 1rem;
        }
        
        .color-name {
          font-weight: bold;
          margin-bottom: 0.25rem;
        }
        
        .color-value {
          font-family: monospace;
          color: #666;
        }
        
        .typography-item {
          margin-bottom: 2rem;
        }
        
        .typography-desc {
          color: #666;
          margin-top: 0.5rem;
        }
        
        .component-demo {
          margin-bottom: 2.5rem;
        }
        
        .component-demo h3 {
          margin-bottom: 1rem;
          color: #333;
        }
        
        .component-preview {
          padding: 2rem;
          border: 1px solid #eee;
          border-radius: 8px;
          background-color: #f9f9f9;
        }
        
        .device-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        
        .device-button {
          padding: 0.5rem 1rem;
          background-color: #0072fe;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .device-button:hover {
          background-color: #0050b3;
        }
        
        .responsive-container {
          margin: 0 auto;
          transition: width 0.3s ease;
        }
        
        .responsive-frame {
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          height: 500px;
        }
        
        .responsive-content {
          padding: 1.5rem;
          height: 100%;
          overflow: auto;
        }
      `}</style>
    </>
  );
};

export default DesignPreview; 