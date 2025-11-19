import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function HardwareDaoPage() {
  const router = useRouter();
  const [selectedSect, setSelectedSect] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    // 页面加载后开始游戏序章
    const timer = setTimeout(() => setGameStarted(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const hardwareSects = [
    {
      id: 'sensor',
      name: '天眼门',
      title: '感知天下宗',
      masterName: '察微真人',
      element: '灵',
      weapon: '慧眼神珠',
      technique: '万物感知术',
      description: '天眼门弟子修炼感知之道，精通MEMS传感器设计、多传感器融合算法、边缘AI感知。掌握温湿度、压力、加速度、磁场等物理量检测，修炼LoRa/NB-IoT无线传输，参悟时序数据库与边缘计算架构。',
      cultivation: [
        '入门：传感境（MEMS器件设计、模拟电路调理）',
        '小成：融合境（多传感器数据融合、Kalman滤波）', 
        '大成：智感境（边缘AI推理、TinyML算法优化）',
        '圆满：天眼境（分布式感知网络、数字孪生建模）'
      ],
      secretArt: 'MEMS工艺心法 • 传感器标定秘术 • LoRaWAN组网神功',
      difficulty: '★★★☆☆',
      route: '/sects/hardware/tianyan-men'
    },
    {
      id: 'communication',
      name: '千里门',
      title: '传音达意宗',
      masterName: '瞬息真人',
      element: '风',
      weapon: '光纤神鞭',
      technique: '千里传音术',
      description: '千里门弟子修炼传讯之道，精通光纤熔接、DWDM波分复用、5G毫米波技术。掌握以太网交换、TCP/IP协议栈、工业现场总线，修炼Modbus/Profinet工业通信，参悟SDN软件定义网络与边缘MEC架构。',
      cultivation: [
        '入门：接入境（光纤熔接、以太网交换）',
        '小成：传输境（DWDM/OTN、MPLS-VPN）',
        '大成：无线境（5G NR、毫米波beamforming）',
        '圆满：天涯境（卫星通信、6G太赫兹技术）'
      ],
      secretArt: '光时域反射秘法 • 5G切片神通 • 工业TSN心诀',
      difficulty: '★★★★☆',
      route: '/sects/hardware/qianli-men'
    },
    {
      id: 'computing',
      name: '算天门',
      title: '神机妙算宗',
      masterName: '运筹真人',
      element: '智',
      weapon: '算经宝典',
      technique: '神机妙算术',
      description: '算天门弟子修炼计算之道，精通ARM Cortex-M/A架构、RISC-V指令集、FPGA硬件加速。掌握实时操作系统、边缘AI推理芯片、异构计算架构，修炼CUDA并行计算、OpenMP多核优化，参悟量子比特操控与退火算法。',
      cultivation: [
        '入门：嵌入境（STM32/ESP32、FreeRTOS实时系统）',
        '小成：边缘境（NVIDIA Jetson、TensorRT推理）',
        '大成：并行境（CUDA编程、MPI集群计算）',
        '圆满：量子境（Qiskit量子算法、量子纠错码）'
      ],
      secretArt: 'FPGA时序收敛心法 • SIMD向量优化术 • 量子叠加神诀',
      difficulty: '★★★★★',
      route: '/sects/hardware/suantian-men'
    },
    {
      id: 'control',
      name: '御器门',
      title: '万物听令宗',
      masterName: '驭物真人',
      element: '御',
      weapon: '控制神符',
      technique: '万物御令术',
      description: '御器门弟子修炼控制之道，精通PID控制算法、伺服电机驱动、运动控制卡编程。掌握PLC梯形图、HMI人机界面、SCADA组态软件，修炼MES制造执行、AGV调度算法，参悟数字孪生建模与预测性维护。',
      cultivation: [
        '入门：调节境（PID参数整定、PWM驱动控制）',
        '小成：联动境（PLC编程、Modbus通信）',
        '大成：协同境（多轴运动控制、机器视觉引导）',
        '圆满：智造境（MES/WMS集成、AI质量检测）'
      ],
      secretArt: 'PID参数自整定秘法 • 伺服增益调优术 • 视觉定位神诀',
      difficulty: '★★★★☆',
      route: '/sects/hardware/yuqi-men'
    },
    {
      id: 'power',
      name: '聚能门',
      title: '天地储能宗',
      masterName: '蓄势真人',
      element: '能',
      weapon: '聚能神丹',
      technique: '天地聚能术',
      description: '聚能门弟子修炼能源之道，精通DC-DC变换器拓扑、MPPT最大功率跟踪、BMS电池管理系统。掌握开关电源设计、同步整流技术、功率因数校正，修炼无线充电原理、锂电池化学特性，参悟钙钛矿太阳能电池与固态电解质技术。',
      cultivation: [
        '入门：变换境（Buck/Boost拓扑、磁性元件设计）',
        '小成：管理境（BMS均衡算法、SOC/SOH估算）',
        '大成：无线境（WPC Qi协议、磁耦合谐振）',
        '圆满：储能境（钠离子电池、氢燃料电池）'
      ],
      secretArt: '开关电源EMI抑制心法 • MPPT扰动观察术 • 谐振充电神诀',
      difficulty: '★★★☆☆',
      route: '/sects/hardware/juneng-men'
    },
    {
      id: 'integration',
      name: '融合门',
      title: '万法归宗派',
      masterName: '融通真人',
      element: '合',
      weapon: '融合宝镜',
      technique: '万法归一术',
      description: '融合门弟子修炼集成之道，精通SoC芯片设计、PCB多层布线、EMC电磁兼容。掌握模块化硬件设计、标准总线接口、IP核复用技术，修炼chiplet小芯片架构、异构计算集成，参悟先进封装工艺与系统级封装(SiP)技术。',
      cultivation: [
        '入门：模块境（PCB设计、接口标准化）',
        '小成：集成境（SoC设计、IP核集成）',
        '大成：封装境（先进封装、3D堆叠）',
        '圆满：系统境（chiplet架构、异构融合）'
      ],
      secretArt: 'PCB叠层优化心法 • EMC设计规则术 • SiP封装神诀',
      difficulty: '★★★★★',
      route: '/sects/hardware/ronghe-men'
    }
  ];

  const handleSectClick = (sect) => {
    if (selectedSect?.id === sect.id) {
      // 确认拜师入门
      router.push(sect.route);
    } else {
      setSelectedSect(sect);
    }
  };

  return (
    <Layout title="EEnous - 硬件武林">
      <div className="hardware-game-world">
        {/* 武侠游戏背景 */}
        <div className="mystical-atmosphere">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="floating-energy"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* 游戏UI容器 */}
        <div className={`game-container ${gameStarted ? 'game-active' : ''}`}>
          
          {/* 游戏标题区 */}
          <div className="game-header">
            <div className="destiny-path" onClick={() => router.push('/explore')}>
              ← 返回天命择道
            </div>
            
            <div className="game-title">
              <div className="title-ornament">◆</div>
              <h1>硬件武林</h1>
              <div className="title-ornament">◆</div>
            </div>
            
            <div className="player-status">
              <span className="player-title">天命人</span>
              <span className="status-text">请选择你的修炼门派</span>
            </div>
          </div>

          {/* 六大门派选择 */}
          <div className="sects-selection">
            {hardwareSects.map((sect, index) => (
              <div
                key={sect.id}
                className={`sect-card ${selectedSect?.id === sect.id ? 'selected' : ''}`}
                onClick={() => handleSectClick(sect)}
                style={{ '--appear-delay': `${index * 0.2}s` }}
              >
                <div className="sect-glow"></div>
                
                {/* 门派徽章 */}
                <div className="sect-badge">
                  <div className="element-symbol">{sect.element}</div>
                  <div className="sect-name">{sect.name}</div>
                </div>
                
                {/* 门派信息 */}
                <div className="sect-info">
                  <h3 className="sect-title">{sect.title}</h3>
                  <div className="sect-master">掌门：{sect.masterName}</div>
                  <div className="sect-weapon">神器：{sect.weapon}</div>
                  <div className="sect-technique">绝技：{sect.technique}</div>
                </div>

                {/* 门派描述 */}
                <div className="sect-description">{sect.description}</div>

                {/* 修炼等级 */}
                <div className="cultivation-levels">
                  <div className="levels-title">修炼境界</div>
                  {sect.cultivation.map((level, idx) => (
                    <div key={idx} className="level-item">{level}</div>
                  ))}
                </div>

                {/* 秘传技艺 */}
                <div className="secret-arts">
                  <div className="arts-title">门派绝学</div>
                  <div className="arts-list">{sect.secretArt}</div>
                </div>

                {/* 难度与入门 */}
                <div className="sect-footer">
                  <div className="difficulty">
                    <span>修炼难度：</span>
                    <span className="stars">{sect.difficulty}</span>
                  </div>
                  <div className="join-sect">
                    {selectedSect?.id === sect.id ? (
                      <span className="confirm-join">点击确认拜师入门</span>
                    ) : (
                      <span className="view-sect">了解此门派</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 门派详情窗口 */}
          {selectedSect && (
            <div className="sect-detail-modal">
              <div className="modal-content">
                <div className="modal-header">
                  <h3>{selectedSect.title}</h3>
                  <div className="modal-close" onClick={() => setSelectedSect(null)}>×</div>
                </div>
                <div className="modal-body">
                  <div className="chosen-master">
                    <span>你即将拜入</span>
                    <strong>{selectedSect.masterName}</strong>
                    <span>门下</span>
                  </div>
                  <div className="chosen-path">
                    修炼<strong>{selectedSect.technique}</strong>，成就硬件武林传说
                  </div>
                  <div className="modal-actions">
                    <button 
                      className="confirm-btn"
                      onClick={() => router.push(selectedSect.route)}
                    >
                      确认拜师入门
                    </button>
                    <button 
                      className="cancel-btn"
                      onClick={() => setSelectedSect(null)}
                    >
                      重新选择
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 武林格言 */}
          <div className="martial-wisdom">
            <div className="wisdom-scroll">
              <div className="scroll-text">
                "硬件武林，六门并立。天命之人，择一而精。器道大成，可御万物，成就武林传说。"
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hardware-game-world {
          min-height: 100vh;
          background: 
            radial-gradient(circle at 20% 30%, rgba(138, 43, 226, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%);
          color: #ffffff;
          position: relative;
          overflow-x: hidden;
          font-family: 'SF Pro Display', 'Microsoft YaHei', sans-serif;
        }

        /* 神秘氛围背景 */
        .mystical-atmosphere {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .floating-energy {
          position: absolute;
          width: 6px;
          height: 6px;
          background: radial-gradient(circle,
            rgba(0, 212, 255, 0.8) 0%,
            rgba(138, 43, 226, 0.6) 50%,
            transparent 100%);
          border-radius: 50%;
          animation: mysticalFloat linear infinite;
          filter: blur(1px);
        }

        @keyframes mysticalFloat {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(0.5);
            opacity: 0;
          }
          20% {
            opacity: 1;
            transform: translate(10px, -20px) rotate(90deg) scale(1);
          }
          80% {
            opacity: 1;
            transform: translate(-10px, -80px) rotate(270deg) scale(1);
          }
          100% {
            transform: translate(0, -100px) rotate(360deg) scale(0.5);
            opacity: 0;
          }
        }

        /* 游戏容器 */
        .game-container {
          position: relative;
          z-index: 5;
          max-width: 1600px;
          margin: 0 auto;
          padding: 2rem;
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s ease-out;
        }

        .game-container.game-active {
          opacity: 1;
          transform: translateY(0);
        }

        /* 游戏标题区 */
        .game-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .destiny-path {
          display: inline-block;
          color: rgba(0, 212, 255, 0.8);
          font-size: 1rem;
          margin-bottom: 2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid rgba(0, 212, 255, 0.3);
          padding: 0.5rem 1rem;
          border-radius: 20px;
        }

        .destiny-path:hover {
          color: rgba(0, 212, 255, 1);
          border-color: rgba(0, 212, 255, 0.6);
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
        }

        .game-title {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 1.5rem;
        }

        .title-ornament {
          font-size: 2rem;
          color: rgba(0, 212, 255, 0.6);
          animation: titleGlow 3s ease-in-out infinite;
        }

        @keyframes titleGlow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        .game-title h1 {
          font-size: 4rem;
          font-weight: 700;
          margin: 0;
          background: linear-gradient(135deg,
            rgba(255, 255, 255, 1) 0%,
            rgba(0, 212, 255, 1) 30%,
            rgba(138, 43, 226, 1) 70%,
            rgba(255, 255, 255, 1) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 
            0 0 100px rgba(0, 212, 255, 0.5),
            0 0 150px rgba(138, 43, 226, 0.3);
        }

        .player-status {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          font-size: 1.2rem;
        }

        .player-title {
          color: rgba(255, 215, 0, 0.9);
          font-weight: 600;
          padding: 0.3rem 0.8rem;
          border: 1px solid rgba(255, 215, 0, 0.3);
          border-radius: 15px;
          background: rgba(255, 215, 0, 0.1);
        }

        .status-text {
          color: rgba(255, 255, 255, 0.8);
          font-style: italic;
        }

        /* 六大门派选择 */
        .sects-selection {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .sect-card {
          position: relative;
          background: rgba(0, 0, 0, 0.7);
          border: 2px solid rgba(0, 212, 255, 0.2);
          border-radius: 20px;
          padding: 2rem;
          cursor: pointer;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          backdrop-filter: blur(15px);
          opacity: 0;
          transform: translateY(50px) scale(0.9);
          animation: sectAppear 0.8s ease-out var(--appear-delay) forwards;
          overflow: hidden;
        }

        @keyframes sectAppear {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .sect-glow {
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          background: linear-gradient(135deg,
            rgba(0, 212, 255, 0.2) 0%,
            rgba(138, 43, 226, 0.2) 50%,
            rgba(0, 212, 255, 0.2) 100%);
          border-radius: 20px;
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: -1;
        }

        .sect-card:hover,
        .sect-card.selected {
          transform: translateY(-15px) scale(1.05);
          border-color: rgba(0, 212, 255, 0.8);
          box-shadow: 
            0 30px 60px rgba(0, 0, 0, 0.3),
            0 0 100px rgba(0, 212, 255, 0.2);
        }

        .sect-card:hover .sect-glow,
        .sect-card.selected .sect-glow {
          opacity: 1;
        }

        .sect-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(0, 212, 255, 0.3);
        }

        .element-symbol {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg,
            rgba(0, 212, 255, 0.3) 0%,
            rgba(138, 43, 226, 0.3) 100%);
          border: 2px solid rgba(0, 212, 255, 0.6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          font-weight: 700;
          color: rgba(0, 212, 255, 1);
          text-shadow: 0 0 20px rgba(0, 212, 255, 0.8);
        }

        .sect-name {
          font-size: 1.8rem;
          font-weight: 600;
          color: rgba(0, 212, 255, 0.9);
        }

        .sect-info {
          margin-bottom: 1.5rem;
        }

        .sect-title {
          font-size: 1.4rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 0.8rem;
          text-align: center;
        }

        .sect-master,
        .sect-weapon,
        .sect-technique {
          font-size: 0.95rem;
          margin-bottom: 0.5rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .sect-description {
          font-size: 1rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 1.5rem;
          text-align: justify;
        }

        .cultivation-levels {
          margin-bottom: 1.5rem;
        }

        .levels-title {
          font-size: 0.9rem;
          color: rgba(0, 212, 255, 0.8);
          margin-bottom: 0.8rem;
          font-weight: 500;
        }

        .level-item {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 0.3rem;
          padding-left: 1rem;
          position: relative;
        }

        .level-item::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: rgba(0, 212, 255, 0.6);
        }

        .secret-arts {
          margin-bottom: 1.5rem;
        }

        .arts-title {
          font-size: 0.9rem;
          color: rgba(138, 43, 226, 0.8);
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .arts-list {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.4;
        }

        .sect-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid rgba(0, 212, 255, 0.2);
        }

        .difficulty {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .stars {
          color: rgba(255, 215, 0, 0.8);
          margin-left: 0.5rem;
        }

        .join-sect {
          font-size: 0.9rem;
          font-weight: 500;
        }

        .view-sect {
          color: rgba(0, 212, 255, 0.8);
        }

        .confirm-join {
          color: rgba(255, 215, 0, 0.9);
          animation: confirmPulse 2s ease-in-out infinite;
        }

        @keyframes confirmPulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        /* 门派详情模态框 */
        .sect-detail-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          backdrop-filter: blur(10px);
        }

        .modal-content {
          background: rgba(0, 0, 0, 0.9);
          border: 2px solid rgba(0, 212, 255, 0.6);
          border-radius: 20px;
          padding: 2rem;
          max-width: 500px;
          width: 90%;
          box-shadow: 0 0 100px rgba(0, 212, 255, 0.3);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(0, 212, 255, 0.3);
        }

        .modal-header h3 {
          margin: 0;
          color: rgba(0, 212, 255, 0.9);
          font-size: 1.5rem;
        }

        .modal-close {
          font-size: 2rem;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .modal-close:hover {
          color: rgba(255, 255, 255, 1);
        }

        .chosen-master {
          text-align: center;
          margin-bottom: 1rem;
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .chosen-master strong {
          color: rgba(255, 215, 0, 0.9);
          font-size: 1.2rem;
        }

        .chosen-path {
          text-align: center;
          margin-bottom: 2rem;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
          font-style: italic;
        }

        .chosen-path strong {
          color: rgba(0, 212, 255, 0.9);
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .confirm-btn,
        .cancel-btn {
          padding: 0.8rem 1.5rem;
          border: none;
          border-radius: 25px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .confirm-btn {
          background: linear-gradient(135deg,
            rgba(0, 212, 255, 0.8) 0%,
            rgba(138, 43, 226, 0.8) 100%);
          color: #ffffff;
        }

        .confirm-btn:hover {
          box-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
          transform: translateY(-2px);
        }

        .cancel-btn {
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .cancel-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        /* 武林格言 */
        .martial-wisdom {
          text-align: center;
          padding: 3rem 2rem;
          border-top: 1px solid rgba(0, 212, 255, 0.2);
        }

        .wisdom-scroll {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(138, 43, 226, 0.3);
          border-radius: 15px;
          position: relative;
        }

        .wisdom-scroll::before,
        .wisdom-scroll::after {
          content: '◇';
          position: absolute;
          font-size: 1.5rem;
          color: rgba(138, 43, 226, 0.6);
        }

        .wisdom-scroll::before {
          top: 1rem;
          left: 1rem;
        }

        .wisdom-scroll::after {
          bottom: 1rem;
          right: 1rem;
        }

        .scroll-text {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.8);
          font-style: italic;
          line-height: 1.8;
          letter-spacing: 1px;
        }

        /* 响应式设计 */
        @media (max-width: 1024px) {
          .sects-selection {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .game-title h1 {
            font-size: 3rem;
          }
        }

        @media (max-width: 768px) {
          .game-container {
            padding: 1rem;
          }
          
          .game-title {
            gap: 1rem;
          }
          
          .game-title h1 {
            font-size: 2.5rem;
          }
          
          .sect-card {
            padding: 1.5rem;
          }
          
          .modal-content {
            padding: 1.5rem;
          }
        }
      `}</style>
    </Layout>
  );
} 