import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function ExplorePage() {
  const [selectedSide, setSelectedSide] = useState(null);
  const [showRipple, setShowRipple] = useState(false);
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 });

  const handleSideHover = (side) => {
    setSelectedSide(side);
  };

  const handleSideLeave = () => {
    setSelectedSide(null);
  };

  const handleSideClick = (side, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setRipplePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
    setShowRipple(true);
    
    setTimeout(() => {
      if (side === 'hardware') {
        window.location.href = '/hardware-dao';
      } else {
        window.location.href = '/software-path';
      }
    }, 800);
    
    setTimeout(() => setShowRipple(false), 1000);
  };

  return (
    <Layout title="EEnous - 择道">
      <div className="future-dao">
        {/* 极简背景粒子 */}
        <div className="quantum-field">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="quantum-particle"
              style={{
                left: `${20 + i * 10}%`,
                animationDelay: `${i * 0.8}s`
              }}
            />
          ))}
        </div>

        {/* 纯净双选区域 */}
        <div className="choice-realm">
          {/* 左侧 - 硬件武林 */}
          <div 
            className={`realm hardware-realm ${selectedSide === 'hardware' ? 'chosen' : selectedSide === 'software' ? 'faded' : ''}`}
            onMouseEnter={() => handleSideHover('hardware')}
            onMouseLeave={handleSideLeave}
            onClick={(e) => handleSideClick('hardware', e)}
          >
            <div className="realm-core">
              <div className="dao-title">硬件武林</div>
            </div>
            
            {showRipple && selectedSide === 'hardware' && (
              <div 
                className="energy-burst"
                style={{
                  left: ripplePosition.x,
                  top: ripplePosition.y
                }}
              />
            )}
          </div>

          {/* 中央能量核心 */}
          <div className="energy-core">
            <div className="core-ring"></div>
            <div className="core-pulse"></div>
          </div>

          {/* 右侧 - 软件江湖 */}
          <div 
            className={`realm software-realm ${selectedSide === 'software' ? 'chosen' : selectedSide === 'hardware' ? 'faded' : ''}`}
            onMouseEnter={() => handleSideHover('software')}
            onMouseLeave={handleSideLeave}
            onClick={(e) => handleSideClick('software', e)}
          >
            <div className="realm-core">
              <div className="dao-title">软件江湖</div>
            </div>
            
            {showRipple && selectedSide === 'software' && (
              <div 
                className="energy-burst"
                style={{
                  left: ripplePosition.x,
                  top: ripplePosition.y
                }}
              />
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .future-dao {
          width: 100vw;
          height: 100vh;
          background: #000000;
          position: relative;
          overflow: hidden;
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* 量子场背景 */
        .quantum-field {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .quantum-particle {
          position: absolute;
          width: 2px;
          height: 120px;
          background: linear-gradient(to bottom, 
            transparent 0%, 
            rgba(0, 212, 255, 0.2) 30%, 
            rgba(0, 212, 255, 0.6) 50%, 
            rgba(0, 212, 255, 0.2) 70%, 
            transparent 100%);
          top: -60px;
          animation: quantumFlow 6s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
        }

        @keyframes quantumFlow {
          0%, 100% {
            transform: translateY(0) scaleY(0);
            opacity: 0;
          }
          50% {
            transform: translateY(calc(100vh + 60px)) scaleY(1);
            opacity: 1;
          }
        }

        /* 纯净双选区域 */
        .choice-realm {
          position: relative;
          width: 100%;
          height: 100vh;
          display: flex;
          z-index: 10;
        }

        /* 领域选择 */
        .realm {
          flex: 1;
          position: relative;
          cursor: pointer;
          transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .realm::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 212, 255, 0.02);
          transition: all 1s ease;
          z-index: 1;
        }

        .realm:hover::before {
          background: rgba(0, 212, 255, 0.08);
          box-shadow: inset 0 0 100px rgba(0, 212, 255, 0.1);
        }

        .realm.chosen {
          flex: 1.1;
        }

        .realm.chosen::before {
          background: rgba(0, 212, 255, 0.12);
          box-shadow: inset 0 0 120px rgba(0, 212, 255, 0.15);
        }

        .realm.faded {
          flex: 0.9;
          opacity: 0.4;
        }

        /* 硬件领域 */
        .hardware-realm {
          border-right: 1px solid rgba(0, 212, 255, 0.15);
        }

        .hardware-realm::after {
          content: '';
          position: absolute;
          left: 0;
          top: 20%;
          width: 2px;
          height: 60%;
          background: linear-gradient(to bottom, 
            transparent 0%, 
            rgba(0, 212, 255, 0.4) 50%, 
            transparent 100%);
          transition: all 0.8s ease;
          opacity: 0;
        }

        .hardware-realm:hover::after {
          opacity: 1;
          box-shadow: 0 0 30px rgba(0, 212, 255, 0.6);
        }

        /* 软件领域 */
        .software-realm {
          border-left: 1px solid rgba(0, 212, 255, 0.15);
        }

        .software-realm::after {
          content: '';
          position: absolute;
          right: 0;
          top: 20%;
          width: 2px;
          height: 60%;
          background: linear-gradient(to bottom, 
            transparent 0%, 
            rgba(0, 212, 255, 0.4) 50%, 
            transparent 100%);
          transition: all 0.8s ease;
          opacity: 0;
        }

        .software-realm:hover::after {
          opacity: 1;
          box-shadow: 0 0 30px rgba(0, 212, 255, 0.6);
        }

        /* 领域核心 */
        .realm-core {
          position: relative;
          z-index: 2;
          text-align: center;
        }

        .dao-title {
          font-size: 4.5rem;
          font-family: 'JetBrains Mono', 'SF Mono', 'Monaco', 'Courier New', monospace;
          font-weight: 600;
          letter-spacing: 18px;
          color: rgba(255, 255, 255, 0.9);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          margin: 0;
          text-shadow: 0 0 50px rgba(0, 212, 255, 0.3);
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.95) 0%, 
            rgba(0, 212, 255, 0.9) 50%, 
            rgba(255, 255, 255, 0.95) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%, 100% { background-position: 200% 0; }
          50% { background-position: -200% 0; }
        }

        .realm:hover .dao-title {
          font-size: 5.2rem;
          letter-spacing: 24px;
          font-weight: 700;
          text-shadow: 
            0 0 100px rgba(0, 212, 255, 0.9),
            0 0 150px rgba(0, 212, 255, 0.6),
            0 0 200px rgba(0, 212, 255, 0.4);
          transform: translateY(-25px) scale(1.05);
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 1) 0%, 
            rgba(0, 212, 255, 1) 50%, 
            rgba(255, 255, 255, 1) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 100%;
          animation: shimmerFast 1.5s ease-in-out infinite;
        }

        @keyframes shimmerFast {
          0%, 100% { background-position: 200% 0; }
          50% { background-position: -200% 0; }
        }

        /* 硬件领域字体特化 */
        .hardware-realm .dao-title {
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 600;
          font-size: 4.8rem;
          letter-spacing: 20px;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.95) 0%, 
            rgba(0, 212, 255, 0.95) 30%,
            rgba(0, 255, 200, 0.9) 70%, 
            rgba(255, 255, 255, 0.95) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-transform: uppercase;
          position: relative;
        }

        .hardware-realm .dao-title::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(0, 212, 255, 0.3) 50%, 
            transparent 100%);
          animation: scanLine 2s linear infinite;
          z-index: -1;
        }

        @keyframes scanLine {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }

        .hardware-realm:hover .dao-title {
          font-size: 5.5rem;
          letter-spacing: 26px;
          font-weight: 700;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 1) 0%, 
            rgba(0, 212, 255, 1) 30%,
            rgba(0, 255, 200, 1) 70%, 
            rgba(255, 255, 255, 1) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* 软件领域字体特化 */
        .software-realm .dao-title {
          font-family: 'JetBrains Mono', 'SF Mono', 'Monaco', monospace;
          font-weight: 600;
          font-size: 4.8rem;
          letter-spacing: 20px;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.95) 0%, 
            rgba(0, 212, 255, 0.9) 50%, 
            rgba(138, 43, 226, 0.8) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
        }

        .software-realm .dao-title::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(0, 212, 255, 0.8) 20%, 
            rgba(138, 43, 226, 0.6) 80%, 
            transparent 100%);
          animation: dataStream 3s ease-in-out infinite;
          transform: translateY(-50%);
        }

        @keyframes dataStream {
          0%, 100% { 
            opacity: 0;
            transform: translateY(-50%) scaleX(0);
          }
          50% { 
            opacity: 1;
            transform: translateY(-50%) scaleX(1);
          }
        }

        .software-realm:hover .dao-title {
          font-size: 5.5rem;
          letter-spacing: 26px;
          font-weight: 700;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 1) 0%, 
            rgba(0, 212, 255, 1) 50%, 
            rgba(138, 43, 226, 0.95) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* 中央能量核心 */
        .energy-core {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 20;
          width: 80px;
          height: 80px;
        }

        .core-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 1px solid rgba(0, 212, 255, 0.3);
          border-radius: 50%;
          animation: coreRotate 20s linear infinite;
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
        }

        .core-ring::before {
          content: '';
          position: absolute;
          top: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          background: rgba(0, 212, 255, 0.8);
          border-radius: 50%;
          box-shadow: 
            0 0 15px rgba(0, 212, 255, 1),
            0 0 30px rgba(0, 212, 255, 0.6);
        }

        @keyframes coreRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .core-pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          background: rgba(0, 212, 255, 0.9);
          border-radius: 50%;
          box-shadow: 
            0 0 25px rgba(0, 212, 255, 0.8),
            0 0 50px rgba(0, 212, 255, 0.4);
          animation: corePulse 3s ease-in-out infinite;
        }

        @keyframes corePulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 1;
          }
        }

        /* 能量爆发效果 */
        .energy-burst {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(0, 212, 255, 0.9);
          border-radius: 50%;
          animation: energyExplosion 1s ease-out;
          pointer-events: none;
          z-index: 30;
        }

        @keyframes energyExplosion {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
            box-shadow: 0 0 0 rgba(0, 212, 255, 0.8);
          }
          70% {
            transform: translate(-50%, -50%) scale(10);
            opacity: 0.3;
            box-shadow: 
              0 0 120px rgba(0, 212, 255, 0.6),
              0 0 200px rgba(0, 212, 255, 0.3);
          }
          100% {
            transform: translate(-50%, -50%) scale(25);
            opacity: 0;
            box-shadow: 
              0 0 300px rgba(0, 212, 255, 0.2),
              0 0 500px rgba(0, 212, 255, 0);
          }
        }

        /* 响应式设计 */
        @media (max-width: 1024px) {
          .choice-realm {
            flex-direction: column;
          }

                     .hardware-realm {
             border-right: none;
             border-bottom: 1px solid rgba(0, 212, 255, 0.15);
           }

           .software-realm {
             border-left: none;
             border-top: 1px solid rgba(0, 212, 255, 0.15);
           }

          .energy-core {
            left: 50%;
            top: 50%;
          }

                     .dao-title {
             font-size: 3.5rem;
             letter-spacing: 12px;
             font-weight: 600;
           }

           .realm:hover .dao-title {
             font-size: 4.2rem;
             letter-spacing: 16px;
             font-weight: 700;
           }

           .hardware-realm .dao-title {
             font-size: 3.5rem;
             letter-spacing: 12px;
             font-weight: 600;
           }

                       .software-realm .dao-title {
              font-size: 3.5rem;
              letter-spacing: 12px;
              font-weight: 600;
            }

            .hardware-realm:hover .dao-title,
            .software-realm:hover .dao-title {
              font-size: 4.2rem;
              letter-spacing: 16px;
              font-weight: 700;
            }

           .hardware-realm .dao-title::before,
           .software-realm .dao-title::after {
             animation-duration: 1.5s;
           }
        }

        @media (max-width: 768px) {
                     .dao-title {
             font-size: 2.8rem;
             letter-spacing: 10px;
             font-weight: 600;
           }

           .realm:hover .dao-title {
             font-size: 3.5rem;
             letter-spacing: 14px;
             font-weight: 700;
           }

           .hardware-realm .dao-title {
             font-size: 2.8rem;
             letter-spacing: 10px;
             font-weight: 600;
           }

           .software-realm .dao-title {
             font-size: 2.8rem;
             letter-spacing: 10px;
             font-weight: 600;
           }

           .hardware-realm:hover .dao-title,
           .software-realm:hover .dao-title {
             font-size: 3.5rem;
             letter-spacing: 14px;
             font-weight: 700;
           }

           .hardware-realm .dao-title::before,
           .software-realm .dao-title::after {
             animation-duration: 1.2s;
           }

          .energy-core {
            width: 60px;
            height: 60px;
          }
        }
      `}</style>
    </Layout>
  );
} 