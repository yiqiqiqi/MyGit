import Layout from '../components/Layout';

export default function SoftwarePage() {
  return (
    <Layout title="EEnous - 智能软件平台">
      <div className="software-page">
        <div className="page-header">
          <div className="container">
            <div className="breadcrumb">
              <a href="/">首页</a> → <a href="/explore">探索</a> → <span>软件</span>
            </div>
            <h1 className="page-title">
              <span className="title-accent">💻</span>
              智能软件平台
            </h1>
            <p className="page-subtitle">
              构建数据驱动的智能管理与分析系统
            </p>
          </div>
        </div>

        <div className="software-content">
          <div className="container">
            <div className="coming-soon">
              <div className="cs-icon">⚡</div>
              <h2 className="cs-title">软件平台展示</h2>
              <p className="cs-description">
                我们正在精心准备软件平台的详细展示页面<br/>
                敬请期待更多精彩内容...
              </p>
              <div className="cs-actions">
                <a href="/explore" className="btn-back">返回选择</a>
                <a href="/contact" className="btn-contact">联系我们</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .software-page {
          background: #000;
          min-height: 100vh;
          color: #fff;
          font-family: 'Inter', sans-serif;
        }

        .page-header {
          padding: 6rem 0 4rem;
          background: linear-gradient(135deg, 
            rgba(12, 10, 32, 0.9) 0%, 
            rgba(30, 27, 75, 0.8) 100%);
          position: relative;
          overflow: hidden;
        }

        .page-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 20%, rgba(147, 197, 253, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 2;
        }

        .breadcrumb {
          margin-bottom: 2rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .breadcrumb a {
          color: rgba(147, 197, 253, 0.8);
          text-decoration: none;
        }

        .breadcrumb a:hover {
          color: rgba(147, 197, 253, 1);
        }

        .page-title {
          font-size: 4rem;
          font-weight: 800;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .title-accent {
          font-size: 3rem;
          filter: drop-shadow(0 0 20px rgba(147, 197, 253, 0.8));
        }

        .page-subtitle {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 0;
        }

        .software-content {
          padding: 8rem 0;
        }

        .coming-soon {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
          padding: 4rem 2rem;
          background: linear-gradient(135deg, 
            rgba(147, 197, 253, 0.1) 0%, 
            rgba(59, 130, 246, 0.05) 100%);
          border: 1px solid rgba(147, 197, 253, 0.3);
          border-radius: 20px;
          backdrop-filter: blur(15px);
        }

        .cs-icon {
          font-size: 4rem;
          margin-bottom: 2rem;
          animation: glow 3s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% { 
            transform: scale(1);
            filter: drop-shadow(0 0 10px rgba(147, 197, 253, 0.5));
          }
          50% { 
            transform: scale(1.1);
            filter: drop-shadow(0 0 20px rgba(147, 197, 253, 0.8));
          }
        }

        .cs-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, 
            rgba(147, 197, 253, 1) 0%, 
            rgba(59, 130, 246, 1) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .cs-description {
          font-size: 1.2rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 3rem;
        }

        .cs-actions {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
        }

        .btn-back, .btn-contact {
          padding: 12px 32px;
          border: 1px solid rgba(147, 197, 253, 0.5);
          border-radius: 25px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .btn-back {
          color: rgba(255, 255, 255, 0.9);
          background: rgba(147, 197, 253, 0.1);
        }

        .btn-back:hover {
          border-color: rgba(147, 197, 253, 0.8);
          transform: translateY(-2px);
        }

        .btn-contact {
          color: #fff;
          background: linear-gradient(135deg, 
            rgba(147, 197, 253, 0.8) 0%, 
            rgba(59, 130, 246, 0.6) 100%);
        }

        .btn-contact:hover {
          background: linear-gradient(135deg, 
            rgba(147, 197, 253, 1) 0%, 
            rgba(59, 130, 246, 0.8) 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(147, 197, 253, 0.3);
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 2.5rem;
          }
          
          .cs-actions {
            flex-direction: column;
            align-items: center;
          }
          
          .btn-back, .btn-contact {
            width: 200px;
          }
        }
      `}</style>
    </Layout>
  );
} 