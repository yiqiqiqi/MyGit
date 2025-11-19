import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function SoftwarePathPage() {
  const router = useRouter();
  const [selectedSect, setSelectedSect] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    // 页面加载后开始游戏序章
    const timer = setTimeout(() => setGameStarted(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const softwareSects = [
    {
      id: 'algorithm',
      name: '天机门',
      title: '算法天机宗',
      masterName: '智算真人',
      element: '算',
      weapon: '天机宝鉴',
      technique: '天机算法术',
      description: '天机门弟子修炼算法天道，精通Transformer架构、强化学习、图神经网络。掌握PyTorch/TensorFlow深度学习框架、CUDA并行计算、AutoML自动机器学习，修炼BERT/GPT大语言模型、神经架构搜索，参悟AGI通用人工智能与神经符号推理。',
      cultivation: [
        '入门：基算境（排序/搜索算法、动态规划）',
        '小成：机学境（梯度下降、决策树、SVM）',
        '大成：深度境（CNN/RNN、Transformer、BERT）',
        '圆满：天机境（GPT-4、PaLM、强化学习AGI）'
      ],
      secretArt: '梯度下降心法 • 注意力机制术 • 神经架构搜索诀',
      difficulty: '★★★★★',
      route: '/sects/software/tianji-men'
    },
    {
      id: 'data',
      name: '数据门',
      title: '洞察万象宗',
      masterName: '析数真人',
      element: '数',
      weapon: '洞察神镜',
      technique: '数据洞察术',
      description: '数据门弟子修炼数据之道，精通Hadoop/Spark大数据处理、Kafka实时流计算、ClickHouse列式存储。掌握Python/R数据科学栈、pandas/numpy数据处理、Tableau/Power BI可视化，修炼数据仓库建模、ETL数据管道，参悟联邦学习与隐私计算技术。',
      cultivation: [
        '入门：采集境（Flume/Logstash、爬虫技术）',
        '小成：存储境（HDFS/Hive、MySQL/MongoDB）',
        '大成：分析境（Spark MLlib、时间序列分析）',
        '圆满：智能境（AutoML、数据中台架构）'
      ],
      secretArt: '大数据处理心法 • 实时流计算术 • 数据湖架构诀',
      difficulty: '★★★★☆',
      route: '/sects/software/shuju-men'
    },
    {
      id: 'platform',
      name: '架构门',
      title: '平台统御宗',
      masterName: '架构真人',
      element: '构',
      weapon: '统御宝塔',
      technique: '平台统御术',
      description: '架构门弟子修炼平台之道，精通DDD领域驱动设计、CQRS事件溯源、分布式系统CAP理论。掌握Spring Cloud微服务、Service Mesh服务网格、API网关设计，修炼Redis缓存策略、消息队列RabbitMQ/Kafka，参悟云原生架构与Kubernetes容器编排。',
      cultivation: [
        '入门：单体境（MVC架构、三层架构）',
        '小成：服务境（SOA、RESTful API）',
        '大成：微服境（Spring Cloud、Service Mesh）',
        '圆满：云原境（K8s、Serverless、事件驱动）'
      ],
      secretArt: 'DDD建模心法 • 微服务拆分术 • 分布式事务诀',
      difficulty: '★★★★☆',
      route: '/sects/software/jiagou-men'
    },
    {
      id: 'intelligence',
      name: '智慧门',
      title: '人工智能宗',
      masterName: '智慧真人',
      element: '智',
      weapon: '智慧法轮',
      technique: '人工智能术',
      description: '智慧门弟子修炼智能之道，精通计算机视觉OpenCV、自然语言处理NLTK/spaCy、知识图谱Neo4j。掌握智能推荐算法、专家系统构建、RPA机器人流程自动化，修炼语音识别ASR、图像生成GAN，参悟多模态大模型与因果推理技术。',
      cultivation: [
        '入门：规则境（专家系统、决策树）',
        '小成：学习境（推荐系统、协同过滤）',
        '大成：感知境（CV、NLP、语音识别）',
        '圆满：认知境（多模态、因果推理、AGI应用）'
      ],
      secretArt: '知识推理心法 • 多模态融合术 • 智能决策诀',
      difficulty: '★★★★★',
      route: '/sects/software/zhihui-men'
    },
    {
      id: 'cloud',
      name: '云霄门',
      title: '云端逍遥宗',
      masterName: '云游真人',
      element: '云',
      weapon: '逍遥云盘',
      technique: '云端逍遥术',
      description: '云霄门弟子修炼云端之道，精通Kubernetes容器编排、Docker容器化、Istio服务网格。掌握AWS/Azure/阿里云服务、Terraform基础设施即代码、CI/CD DevOps流水线，修炼Serverless无服务器、边缘计算CDN，参悟多云混合架构与云原生安全。',
      cultivation: [
        '入门：容器境（Docker、Registry、镜像构建）',
        '小成：编排境（K8s、Helm、服务发现）',
        '大成：网格境（Istio、Envoy、流量管理）',
        '圆满：原生境（Serverless、边缘计算、多云）'
      ],
      secretArt: 'K8s调度心法 • 服务网格术 • 无服务器神诀',
      difficulty: '★★★☆☆',
      route: '/sects/software/yunxiao-men'
    },
    {
      id: 'frontend',
      name: '幻象门',
      title: '用户体验宗',
      masterName: '幻影真人',
      element: '幻',
      weapon: '体验神瞳',
      technique: '用户幻象术',
      description: '幻象门弟子修炼界面之道，精通React/Vue/Angular现代前端框架、TypeScript类型系统、Webpack/Vite构建工具。掌握CSS-in-JS、Sass/Less预处理、响应式设计Flexbox/Grid，修炼WebGL三维渲染、PWA渐进式应用，参悟WebAssembly高性能计算与Web3前端技术。',
      cultivation: [
        '入门：基础境（HTML/CSS/JS、DOM操作）',
        '小成：框架境（React/Vue、组件化设计）',
        '大成：工程境（TypeScript、构建优化、测试）',
        '圆满：体验境（动画/3D、性能优化、可访问性）'
      ],
      secretArt: '组件化设计心法 • 性能优化术 • 用户体验神诀',
      difficulty: '★★★☆☆',
      route: '/sects/software/huanxiang-men'
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
    <Layout title="EEnous - 软件江湖">
      <div className="software-game-world">
        {/* 数字矩阵背景 */}
        <div className="digital-matrix">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i} 
              className="matrix-code"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${10 + Math.random() * 5}s`
              }}
            >
              {['λ', 'π', '∑', '∆', '∞', '≠', '≤', '≥', '∈', '∩', '∪', '⊕'][i % 12]}
            </div>
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
              <div className="title-ornament">◈</div>
              <h1>软件江湖</h1>
              <div className="title-ornament">◈</div>
            </div>
            
            <div className="player-status">
              <span className="player-title">天命人</span>
              <span className="status-text">请选择你的修炼门派</span>
            </div>
          </div>

          {/* 六大门派选择 */}
          <div className="sects-selection">
            {softwareSects.map((sect, index) => (
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
                    修炼<strong>{selectedSect.technique}</strong>，成就软件江湖传说
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

          {/* 江湖格言 */}
          <div className="martial-wisdom">
            <div className="wisdom-scroll">
              <div className="scroll-text">
                "软件江湖，六门争雄。代码如诗，逻辑如剑。天命之人，择一精通，可驾驭数字世界，成就江湖传说。"
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .software-game-world {
          min-height: 100vh;
          background: 
            radial-gradient(circle at 30% 20%, rgba(138, 43, 226, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(0, 100, 255, 0.12) 0%, transparent 50%),
            linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%);
          color: #ffffff;
          position: relative;
          overflow-x: hidden;
          font-family: 'SF Pro Display', 'Microsoft YaHei', sans-serif;
        }

        /* 数字矩阵背景 */
        .digital-matrix {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .matrix-code {
          position: absolute;
          font-size: 1.2rem;
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          color: rgba(138, 43, 226, 0.3);
          animation: matrixFlow linear infinite;
          font-weight: 300;
        }

        @keyframes matrixFlow {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(0.5);
            opacity: 0;
          }
          15% {
            opacity: 0.8;
            transform: translate(5px, -15px) rotate(45deg) scale(1);
          }
          85% {
            opacity: 0.8;
            transform: translate(-5px, -85px) rotate(315deg) scale(1);
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
          color: rgba(138, 43, 226, 0.8);
          font-size: 1rem;
          margin-bottom: 2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid rgba(138, 43, 226, 0.3);
          padding: 0.5rem 1rem;
          border-radius: 20px;
        }

        .destiny-path:hover {
          color: rgba(138, 43, 226, 1);
          border-color: rgba(138, 43, 226, 0.6);
          box-shadow: 0 0 20px rgba(138, 43, 226, 0.3);
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
          color: rgba(138, 43, 226, 0.6);
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
            rgba(138, 43, 226, 1) 30%,
            rgba(0, 100, 255, 1) 70%,
            rgba(255, 255, 255, 1) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 
            0 0 100px rgba(138, 43, 226, 0.5),
            0 0 150px rgba(0, 100, 255, 0.3);
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
          border: 2px solid rgba(138, 43, 226, 0.2);
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
            rgba(138, 43, 226, 0.2) 0%,
            rgba(0, 100, 255, 0.2) 50%,
            rgba(138, 43, 226, 0.2) 100%);
          border-radius: 20px;
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: -1;
        }

        .sect-card:hover,
        .sect-card.selected {
          transform: translateY(-15px) scale(1.05);
          border-color: rgba(138, 43, 226, 0.8);
          box-shadow: 
            0 30px 60px rgba(0, 0, 0, 0.3),
            0 0 100px rgba(138, 43, 226, 0.2);
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
          border-bottom: 1px solid rgba(138, 43, 226, 0.3);
        }

        .element-symbol {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg,
            rgba(138, 43, 226, 0.3) 0%,
            rgba(0, 100, 255, 0.3) 100%);
          border: 2px solid rgba(138, 43, 226, 0.6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          font-weight: 700;
          color: rgba(138, 43, 226, 1);
          text-shadow: 0 0 20px rgba(138, 43, 226, 0.8);
        }

        .sect-name {
          font-size: 1.8rem;
          font-weight: 600;
          color: rgba(138, 43, 226, 0.9);
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
          color: rgba(138, 43, 226, 0.8);
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
          color: rgba(138, 43, 226, 0.6);
        }

        .secret-arts {
          margin-bottom: 1.5rem;
        }

        .arts-title {
          font-size: 0.9rem;
          color: rgba(0, 100, 255, 0.8);
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
          border-top: 1px solid rgba(138, 43, 226, 0.2);
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
          color: rgba(138, 43, 226, 0.8);
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
          border: 2px solid rgba(138, 43, 226, 0.6);
          border-radius: 20px;
          padding: 2rem;
          max-width: 500px;
          width: 90%;
          box-shadow: 0 0 100px rgba(138, 43, 226, 0.3);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(138, 43, 226, 0.3);
        }

        .modal-header h3 {
          margin: 0;
          color: rgba(138, 43, 226, 0.9);
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
          color: rgba(138, 43, 226, 0.9);
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
            rgba(138, 43, 226, 0.8) 0%,
            rgba(0, 100, 255, 0.8) 100%);
          color: #ffffff;
        }

        .confirm-btn:hover {
          box-shadow: 0 0 30px rgba(138, 43, 226, 0.5);
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

        /* 江湖格言 */
        .martial-wisdom {
          text-align: center;
          padding: 3rem 2rem;
          border-top: 1px solid rgba(138, 43, 226, 0.2);
        }

        .wisdom-scroll {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(0, 100, 255, 0.3);
          border-radius: 15px;
          position: relative;
        }

        .wisdom-scroll::before,
        .wisdom-scroll::after {
          content: '◈';
          position: absolute;
          font-size: 1.5rem;
          color: rgba(0, 100, 255, 0.6);
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