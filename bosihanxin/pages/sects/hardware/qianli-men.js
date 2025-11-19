import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import SectAuth from '../../../components/SectAuthNew';

// 本地存储键名
const TASKS_STORAGE_KEY = 'eenous_sect_tasks';
const SUGGESTIONS_STORAGE_KEY = 'eenous_sect_suggestions';

// 初始化建议数据
const getInitialSuggestions = () => [
  {
    id: 1,
    title: "建立跨门派技术交流平台",
    content: "建议创建一个统一的技术交流平台，让各门派弟子可以分享技术心得，促进武林技术发展。可以包含技术论坛、在线研讨会、代码共享等功能。",
    author: "天眼门·感知长老",
    authorId: "888888888",
    authorGlobalName: "技术大师",
    sect: "天眼门",
    timestamp: "2024-01-15T10:30:00Z",
    tags: ["跨门派合作", "技术交流", "平台建设"],
    priority: "高",
    likes: 15,
    comments: [
      {
        id: 1,
        author: "千里门·通信弟子",
        authorId: "666666666",
        authorGlobalName: "通信专家",
        content: "非常赞同！我们千里门在通信技术方面有很多经验可以分享，希望能与各门派深度交流。",
        timestamp: "2024-01-15T14:20:00Z"
      },
      {
        id: 2,
        author: "算天门·数据分析师",
        authorId: "777777777",
        authorGlobalName: "数据科学家",
        content: "建议加入数据分析功能，可以统计各种技术讨论的热度和效果。",
        timestamp: "2024-01-15T16:45:00Z"
      }
    ]
  },
  {
    id: 2,
    title: "改进传感器精度标准化流程",
    content: "当前各种传感器的精度标准不统一，建议制定统一的精度测试和校准流程，确保所有门派使用的传感器都能达到最高标准。",
    author: "天眼门·精度专家",
    authorId: "555555555",
    authorGlobalName: "精度大师",
    sect: "天眼门",
    timestamp: "2024-01-12T09:15:00Z",
    tags: ["传感器", "精度", "标准化"],
    priority: "中",
    likes: 8,
    comments: [
      {
        id: 3,
        author: "御器门·控制工程师",
        authorId: "999999999",
        authorGlobalName: "控制专家",
        content: "这个建议很有价值，我们在控制系统中经常遇到传感器精度不一致的问题。",
        timestamp: "2024-01-12T11:30:00Z"
      }
    ]
  },
  {
    id: 3,
    title: "量子通信技术普及计划",
    content: "量子通信是未来的发展方向，建议各门派联合开展量子通信技术的研发和普及，让更多弟子掌握这项前沿技术。",
    author: "千里门·量子研究员",
    authorId: "444444444",
    authorGlobalName: "量子先锋",
    sect: "千里门",
    timestamp: "2024-01-10T15:45:00Z",
    tags: ["量子通信", "技术普及", "前沿技术"],
    priority: "高",
    likes: 22,
    comments: [
      {
        id: 4,
        author: "天眼门·量子传感专家",
        authorId: "333333333",
        authorGlobalName: "量子感知者",
        content: "量子技术确实是未来趋势，我们天眼门在量子传感方面也有研究，可以合作。",
        timestamp: "2024-01-10T17:20:00Z"
      },
      {
        id: 5,
        author: "融合门·系统集成师",
        authorId: "222222222",
        authorGlobalName: "系统架构师",
        content: "量子通信需要与现有系统集成，我们融合门可以提供技术支持。",
        timestamp: "2024-01-11T08:10:00Z"
      }
    ]
  }
];

// 从localStorage读取建议
const loadSuggestionsFromStorage = () => {
  if (typeof window === 'undefined') return getInitialSuggestions();
  
  try {
    const stored = localStorage.getItem(SUGGESTIONS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    } else {
      // 首次访问，初始化数据
      const initialSuggestions = getInitialSuggestions();
      localStorage.setItem(SUGGESTIONS_STORAGE_KEY, JSON.stringify(initialSuggestions));
      return initialSuggestions;
    }
  } catch (error) {
    console.error('读取建议数据失败:', error);
    return getInitialSuggestions();
  }
};

// 保存建议到localStorage
const saveSuggestionsToStorage = (suggestions) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(SUGGESTIONS_STORAGE_KEY, JSON.stringify(suggestions));
    // 触发自定义事件，通知其他页面数据已更新
    window.dispatchEvent(new CustomEvent('suggestionsUpdated'));
  } catch (error) {
    console.error('保存建议数据失败:', error);
  }
};

// 从localStorage读取任务
const loadTasksFromStorage = () => {
  if (typeof window === 'undefined') return getInitialTasks();
  
  try {
    const stored = localStorage.getItem(TASKS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    } else {
      // 首次访问，初始化数据
      const initialTasks = getInitialTasks();
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(initialTasks));
      return initialTasks;
    }
  } catch (error) {
    console.error('读取任务数据失败:', error);
    return getInitialTasks();
  }
};

// 保存任务到localStorage
const saveTasksToStorage = (tasks) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    // 触发自定义事件，通知其他页面数据已更新
    window.dispatchEvent(new CustomEvent('tasksUpdated'));
  } catch (error) {
    console.error('保存任务数据失败:', error);
  }
};

export default function QianliMenPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  // Add new state for contentTab
  const [contentTab, setContentTab] = useState('courses'); // courses, trials, scriptures, achievements, taskboard, suggestions
  
  // 任务看板状态 - 从localStorage加载，与天眼门共享数据
  const [tasks, setTasks] = useState([]);
  
  // 建议模块状态 - 从localStorage加载
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);
  const [editingSuggestion, setEditingSuggestion] = useState(null);
  const [suggestionForm, setSuggestionForm] = useState({
    title: '',
    content: '',
    tags: '',
    priority: '中'
  });
  const [suggestionFilter, setSuggestionFilter] = useState('all'); // all, tianyan, qianli, etc.
  const [suggestionSort, setSuggestionSort] = useState('latest'); // latest, oldest, most_liked
  const [newComment, setNewComment] = useState('');

  // 组件初始化时加载数据
  useEffect(() => {
    const loadedTasks = loadTasksFromStorage();
    const loadedSuggestions = loadSuggestionsFromStorage();
    setTasks(loadedTasks);
    setSuggestions(loadedSuggestions);
  }, []);

  // 监听其他页面的任务更新
  useEffect(() => {
    const handleTasksUpdate = () => {
      const updatedTasks = loadTasksFromStorage();
      setTasks(updatedTasks);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('tasksUpdated', handleTasksUpdate);
      return () => window.removeEventListener('tasksUpdated', handleTasksUpdate);
    }
  }, []);

  // 监听其他页面的建议更新
  useEffect(() => {
    const handleSuggestionsUpdate = () => {
      const updatedSuggestions = loadSuggestionsFromStorage();
      setSuggestions(updatedSuggestions);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('suggestionsUpdated', handleSuggestionsUpdate);
      return () => window.removeEventListener('suggestionsUpdated', handleSuggestionsUpdate);
    }
  }, []);

  // 更新任务并保存到localStorage
  const updateTasks = (newTasks) => {
    setTasks(newTasks);
    saveTasksToStorage(newTasks);
  };

  // 更新建议并保存到localStorage
  const updateSuggestions = (newSuggestions) => {
    setSuggestions(newSuggestions);
    saveSuggestionsToStorage(newSuggestions);
  };

  // 建议模块函数
  const openSuggestionModal = (suggestion = null) => {
    if (suggestion) {
      setEditingSuggestion(suggestion);
      setSuggestionForm({
        title: suggestion.title,
        content: suggestion.content,
        tags: suggestion.tags.join(', '),
        priority: suggestion.priority
      });
    } else {
      setEditingSuggestion(null);
      setSuggestionForm({
        title: '',
        content: '',
        tags: '',
        priority: '中'
      });
    }
    setShowSuggestionModal(true);
  };

  const closeSuggestionModal = () => {
    setShowSuggestionModal(false);
    setEditingSuggestion(null);
    setSuggestionForm({
      title: '',
      content: '',
      tags: '',
      priority: '中'
    });
  };

  // handleSuggestionSubmit 函数将在 renderContent 内部定义

  const handleLikeSuggestion = (suggestionId) => {
    const updatedSuggestions = suggestions.map(suggestion => 
      suggestion.id === suggestionId 
        ? { ...suggestion, likes: suggestion.likes + 1 }
        : suggestion
    );
    updateSuggestions(updatedSuggestions);
  };

  // handleAddComment 函数将在 renderContent 内部定义

  const deleteSuggestion = (suggestionId) => {
    if (confirm('确定要删除这个建议吗？')) {
      const updatedSuggestions = suggestions.filter(suggestion => suggestion.id !== suggestionId);
      updateSuggestions(updatedSuggestions);
    }
  };

  // 筛选和排序建议
  const getFilteredAndSortedSuggestions = () => {
    let filtered = suggestions;
    
    if (suggestionFilter !== 'all') {
      const sectMap = {
        'tianyan': '天眼门',
        'qianli': '千里门',
        'suantian': '算天门',
        'yuqi': '御器门',
        'juneng': '聚能门',
        'ronghe': '融合门'
      };
      filtered = suggestions.filter(suggestion => suggestion.sect === sectMap[suggestionFilter]);
    }
    
    switch (suggestionSort) {
      case 'oldest':
        return filtered.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      case 'most_liked':
        return filtered.sort((a, b) => b.likes - a.likes);
      case 'latest':
      default:
        return filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
  };

  const initializeSampleSuggestions = () => {
    if (confirm('确定要加载示例建议数据吗？这将覆盖当前数据。')) {
      const initialSuggestions = getInitialSuggestions();
      updateSuggestions(initialSuggestions);
    }
  };

  const clearAllSuggestions = () => {
    if (confirm('确定要清空所有建议吗？此操作不可撤销。')) {
      updateSuggestions([]);
    }
  };
  
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    sect: '千里门',
    priority: '中',
    status: '规划中',
    deadline: '',
    tags: ''
  });
  
  const [taskFilter, setTaskFilter] = useState('all'); // all, tianyan, qianli, suantian, etc.
  const [taskSort, setTaskSort] = useState('deadline'); // deadline, priority, progress, created

  return (
    <Layout title="EEnous - 千里门·传音达意宗">
      <SectAuth 
        sectId="qianli"
        renderContent={(user, logout, updateFunctions) => {
          if (!editForm.sectNickname) {
            setEditForm({
              sectNickname: user.sectNickname,
              globalNickname: user.globalNickname,
            });
          }

          // 在 renderContent 内部定义这些函数，以便访问 user 参数
          const handleSuggestionSubmit = (e) => {
            e.preventDefault();
            
            if (!suggestionForm.title.trim() || !suggestionForm.content.trim()) {
              alert('请填写标题和内容');
              return;
            }

            // 使用传递进来的 user 参数，而不是从 localStorage 获取
            const userNickname = user.sectNickname || '千里门弟子';
            const userQQ = user.qq || 'Unknown';
            const userGlobalName = user.globalNickname || user.sectNickname || '千里门弟子';

            if (editingSuggestion) {
              // 编辑现有建议
              const updatedSuggestions = suggestions.map(suggestion => 
                suggestion.id === editingSuggestion.id 
                  ? {
                      ...suggestion,
                      title: suggestionForm.title.trim(),
                      content: suggestionForm.content.trim(),
                      tags: suggestionForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                      priority: suggestionForm.priority
                    }
                  : suggestion
              );
              updateSuggestions(updatedSuggestions);
            } else {
              // 添加新建议
              const newSuggestion = {
                id: Date.now(),
                title: suggestionForm.title.trim(),
                content: suggestionForm.content.trim(),
                author: `千里门·${userNickname}`,
                authorId: userQQ,
                authorGlobalName: userGlobalName,
                sect: '千里门',
                timestamp: new Date().toISOString(),
                tags: suggestionForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                priority: suggestionForm.priority,
                likes: 0,
                comments: []
              };
              updateSuggestions([newSuggestion, ...suggestions]);
            }
            
            closeSuggestionModal();
          };

          const handleAddComment = (suggestionId, commentContent) => {
            if (!commentContent.trim()) return;

            // 使用传递进来的 user 参数，而不是从 localStorage 获取
            const userNickname = user.sectNickname || '千里门弟子';
            const userQQ = user.qq || 'Unknown';
            const userGlobalName = user.globalNickname || user.sectNickname || '千里门弟子';

            const newComment = {
              id: Date.now(),
              author: `千里门·${userNickname}`,
              authorId: userQQ,
              authorGlobalName: userGlobalName,
              content: commentContent.trim(),
              timestamp: new Date().toISOString()
            };

            const updatedSuggestions = suggestions.map(suggestion => 
              suggestion.id === suggestionId 
                ? { ...suggestion, comments: [...suggestion.comments, newComment] }
                : suggestion
            );
            updateSuggestions(updatedSuggestions);
            setNewComment('');
          };

          return (
          <div className="sect-page qianli-sect">
            {/* 门派专属背景 */}
            <div className="sect-atmosphere">
              {/* 传音粒子 */}
              {[...Array(15)].map((_, i) => (
                <div 
                  key={i} 
                  className="transmission-particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 8}s`,
                    animationDuration: `${6 + Math.random() * 3}s`
                  }}
                />
              ))}
              
              {/* 波纹传播效果 */}
              <div className="wave-propagator">
                <div className="wave-sweep"></div>
                <div className="wave-center"></div>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="wave-ring" style={{animationDelay: `${i * 0.5}s`}}></div>
                ))}
              </div>
              
              {/* 信号流效果 */}
              <div className="signal-streams">
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i} 
                    className="signal-stream"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 5}s`,
                      animationDuration: `${3 + Math.random() * 2}s`
                    }}
                  >
                    {Math.random().toString(2).substr(2, 8)}
                  </div>
                ))}
              </div>
              
              {/* 传音波纹 */}
              <div className="transmission-waves">
                <div className="wave wave-1"></div>
                <div className="wave wave-2"></div>
                <div className="wave wave-3"></div>
              </div>
              
              {/* 通信网格 */}
              <div className="comm-grid"></div>
            </div>

            <div className="sect-container">
              <div className="sect-nav">
                <button onClick={() => router.push('/hardware-dao')} className="back-button">
                  ← 返回硬件武林
                </button>
              </div>

              <div className="sect-header">
                <div className="sect-emblem">音</div>
                <h1 className="sect-title">千里门</h1>
                <p className="sect-subtitle">传音达意宗</p>
                <div className="sect-slogan">千里神音·传音达意术</div>
              </div>

              <div className="user-info-bar">
                <div className="user-details">
                  <span className="user-nickname">{user.sectNickname}</span>
                  <span className="user-level">{user.cultivationLevel}</span>
                  <span className="user-points">积分: {user.sectPoints}</span>
                </div>
                <div className="user-actions">
                  <span className="join-time">入门: {new Date(user.joinTime).toLocaleDateString()}</span>
                  <button onClick={logout} className="logout-button">
                    退出门派
                  </button>
                </div>
              </div>

              {/* 导航标签 */}
              <div className="tab-navigation">
                <button 
                  className={`tab-item ${activeTab === 'home' ? 'active' : ''}`}
                  onClick={() => setActiveTab('home')}
                >
                  <span className="tab-icon">🏛️</span>
                  <span className="tab-label">门派大厅</span>
                </button>
                <button 
                  className={`tab-item ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <span className="tab-icon">👤</span>
                  <span className="tab-label">个人中心</span>
                </button>
                <button 
                  className={`tab-item ${activeTab === 'settings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  <span className="tab-icon">⚙️</span>
                  <span className="tab-label">账户设置</span>
                </button>
              </div>

              <div className="sect-content">
                {/* 主页内容 */}
                {activeTab === 'home' && (
                  <>
                    <div className="welcome-section">
                      <h2>欢迎回来，{user.sectNickname}师兄</h2>
                      <p>你已成功拜入千里门·传音达意宗</p>
                    </div>

                    {/* 境界进度 */}
                    <div className="cultivation-progress">
                      <h3>修炼境界</h3>
                      <div className="realm-info">
                        <div className="current-realm">
                          <span className="realm-title">当前境界：</span>
                          <span className="realm-name">{user.cultivationLevel}</span>
                        </div>
                        <div className="realm-progress-bar">
                          <div className="progress-fill" style={{width: '15%'}}></div>
                        </div>
                        <div className="next-realm">
                          <span>下一境界：传音入微</span>
                          <span className="exp-info">经验：150/1000</span>
                        </div>
                      </div>
                    </div>

                    <div className="cultivation-content">
                      <div className="content-tabs">
                        <button 
                          className={`content-tab ${contentTab === 'courses' ? 'active' : ''}`}
                          onClick={() => setContentTab('courses')}
                        >
                          修炼法门
                        </button>
                        <button 
                          className={`content-tab ${contentTab === 'trials' ? 'active' : ''}`}
                          onClick={() => setContentTab('trials')}
                        >
                          试炼挑战
                        </button>
                        <button 
                          className={`content-tab ${contentTab === 'scriptures' ? 'active' : ''}`}
                          onClick={() => setContentTab('scriptures')}
                        >
                          核心秘籍
                        </button>
                        <button 
                          className={`content-tab ${contentTab === 'achievements' ? 'active' : ''}`}
                          onClick={() => setContentTab('achievements')}
                        >
                          成就荣耀
                        </button>
                        <button 
                          className={`content-tab ${contentTab === 'taskboard' ? 'active' : ''}`}
                          onClick={() => setContentTab('taskboard')}
                        >
                          任务看板
                        </button>
                        <button 
                          className={`content-tab ${contentTab === 'suggestions' ? 'active' : ''}`}
                          onClick={() => setContentTab('suggestions')}
                        >
                          建议讨论
                        </button>
                      </div>

                      {/* 修炼法门内容 */}
                      {contentTab === 'courses' && (
                        <div className="courses-section">
                          <h3>修炼法门·传音之道</h3>
                          
                          {/* 基础传音篇 */}
                          <div className="course-category">
                            <h4>【基础传音篇】入门必修</h4>
                            <div className="course-list">
                              <div className="course-item">
                                <div className="course-icon">📡</div>
                                <div className="course-info">
                                  <h5>无线传音术</h5>
                                  <p className="course-desc">
                                    深入掌握无线通信技术的核心原理与应用实践。学习调制解调的QPSK/QAM技术、
                                    频谱分析的FFT/IFFT算法、信道编码的Turbo/LDPC码。掌握FDMA/TDMA/CDMA多址接入、
                                    MIMO天线阵列设计、功率放大器的线性化技术。涵盖蓝牙5.0的LE Audio、
                                    WiFi 6的OFDMA机制、Zigbee 3.0的Mesh组网协议。
                                  </p>
                                  <div className="tech-tags">
                                    <span>QPSK/QAM</span>
                                    <span>MIMO天线</span>
                                    <span>Turbo码</span>
                                    <span>WiFi 6</span>
                                  </div>
                                  <div className="course-meta">
                                    <span className="difficulty">难度：⭐</span>
                                    <span className="duration">修炼时长：7日</span>
                                    <span className="exp-gain">经验值：+50</span>
                                  </div>
                                  <button className="start-button">
                                    <span className="button-text">开始修炼</span>
                                    <span className="button-glow"></span>
                                  </button>
                                </div>
                              </div>
                              
                              <div className="course-item">
                                <div className="course-icon">🌐</div>
                                <div className="course-info">
                                  <h5>光纤传音诀</h5>
                                  <p className="course-desc">
                                    精通光纤通信系统的设计与应用。深入研究单模/多模光纤的色散特性、
                                    DWDM密集波分复用的ITU-T标准、EDFA掺铒光纤放大器的ASE噪声抑制。
                                    掌握G-PON/XG-PON的DBA动态带宽分配、OTN光传送网的FEC前向纠错、
                                    OTDR光时域反射仪的背向散射分析。包含相干光通信的偏振复用技术。
                                  </p>
                                  <div className="tech-tags">
                                    <span>DWDM</span>
                                    <span>EDFA放大</span>
                                    <span>PON网络</span>
                                    <span>相干光通信</span>
                                  </div>
                                  <div className="course-meta">
                                    <span className="difficulty">难度：⭐⭐</span>
                                    <span className="duration">修炼时长：14日</span>
                                    <span className="exp-gain">经验值：+100</span>
                                  </div>
                                  <button className="start-button">
                                    <span className="button-text">开始修炼</span>
                                    <span className="button-glow"></span>
                                  </button>
                                </div>
                              </div>
                              
                              <div className="course-item">
                                <div className="course-icon">🏭</div>
                                <div className="course-info">
                                  <h5>工业传音功</h5>
                                  <p className="course-desc">
                                    全面掌握工业通信协议体系。从Modbus RTU/TCP的功能码解析、
                                    Profinet RT的实时以太网架构，到EtherCAT的分布式时钟同步。
                                    深入学习CAN总线的仲裁机制、RS-485的差分信号传输、
                                    CC-Link IE的QoS服务质量保证。包含TSN时间敏感网络的802.1AS标准、
                                    OPC UA的信息模型与安全机制。
                                  </p>
                                  <div className="tech-tags">
                                    <span>Modbus协议</span>
                                    <span>Profinet RT</span>
                                    <span>EtherCAT</span>
                                    <span>OPC UA</span>
                                  </div>
                                  <div className="course-meta">
                                    <span className="difficulty">难度：⭐⭐</span>
                                    <span className="duration">修炼时长：10日</span>
                                    <span className="exp-gain">经验值：+80</span>
                                  </div>
                                  <button className="start-button">
                                    <span className="button-text">开始修炼</span>
                                    <span className="button-glow"></span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* 进阶传输篇 */}
                          <div className="course-category">
                            <h4>【进阶传输篇】内门精修</h4>
                            <div className="course-list">
                              <div className="course-item advanced">
                                <div className="course-icon">📱</div>
                                <div className="course-info">
                                  <h5>5G天音阵</h5>
                                  <p className="course-desc">
                                    掌握5G NR新空口技术的核心架构与关键技术。深入学习massive MIMO大规模天线阵列、
                                    毫米波波束赋形的codebook设计、网络切片的SLA服务等级协议。
                                    精通gNB基站的CU/DU分离架构、PDCP层的数据压缩算法、
                                    SA/NSA组网的互操作。实现边缘计算MEC的业务下沉、
                                    uRLLC超可靠低延迟通信，以及eMBB增强移动宽带应用。
                                  </p>
                                  <div className="tech-tags">
                                    <span>massive MIMO</span>
                                    <span>毫米波</span>
                                    <span>网络切片</span>
                                    <span>边缘计算</span>
                                  </div>
                                  <div className="course-meta">
                                    <span className="difficulty">难度：⭐⭐⭐</span>
                                    <span className="duration">修炼时长：30日</span>
                                    <span className="exp-gain">经验值：+300</span>
                                  </div>
                                  <button className="start-button locked">
                                    <span className="button-text">境界不足</span>
                                    <span className="lock-icon">🔒</span>
                                  </button>
                                </div>
                              </div>
                              
                              <div className="course-item advanced">
                                <div className="course-icon">🛰️</div>
                                <div className="course-info">
                                  <h5>卫星中继术</h5>
                                  <p className="course-desc">
                                    精通卫星通信系统的全域覆盖技术。从GEO同步轨道的星座设计、
                                    LEO低轨的多普勒频移补偿，到星间链路的自由空间光通信。
                                    掌握Ka/Ku频段的VSAT终端设计、卫星信道的雨衰建模、
                                    DVB-S2X的自适应编码调制ACM。包含星地融合网络的切换算法、
                                    卫星物联网的NB-IoT over Satellite、以及6G非地面网络NTN架构。
                                  </p>
                                  <div className="tech-tags">
                                    <span>LEO星座</span>
                                    <span>星间链路</span>
                                    <span>DVB-S2X</span>
                                    <span>NTN网络</span>
                                  </div>
                                  <div className="course-meta">
                                    <span className="difficulty">难度：⭐⭐⭐⭐</span>
                                    <span className="duration">修炼时长：45日</span>
                                    <span className="exp-gain">经验值：+500</span>
                                  </div>
                                  <button className="start-button locked">
                                    <span className="button-text">境界不足</span>
                                    <span className="lock-icon">🔒</span>
                                  </button>
                                </div>
                              </div>
                              
                              <div className="course-item advanced">
                                <div className="course-icon">🌊</div>
                                <div className="course-info">
                                  <h5>软件定义神通</h5>
                                  <p className="course-desc">
                                    深入SDN软件定义网络的控制与数据平面分离架构。掌握OpenFlow协议的
                                    流表匹配规则、ODL/ONOS控制器的南北向接口、P4可编程数据平面语言。
                                    精通NFV网络功能虚拟化的VNF链编排、容器化网络的CNI插件、
                                    Intent-Based Networking的策略引擎。实现SD-WAN的动态路径选择、
                                    5G核心网的Service Based Architecture、边缘云的算力网络融合。
                                  </p>
                                  <div className="tech-tags">
                                    <span>OpenFlow</span>
                                    <span>P4编程</span>
                                    <span>NFV编排</span>
                                    <span>Intent网络</span>
                                  </div>
                                  <div className="course-meta">
                                    <span className="difficulty">难度：⭐⭐⭐⭐</span>
                                    <span className="duration">修炼时长：40日</span>
                                    <span className="exp-gain">经验值：+450</span>
                                  </div>
                                  <button className="start-button locked">
                                    <span className="button-text">境界不足</span>
                                    <span className="lock-icon">🔒</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 大师秘传篇 */}
                          <div className="course-category">
                            <h4>【大师秘传篇】掌门真传</h4>
                            <div className="course-list">
                              <div className="course-item master">
                                <div className="course-icon">🌌</div>
                                <div className="course-info">
                                  <h5>太赫兹传音神功</h5>
                                  <p className="course-desc">
                                    探索太赫兹通信的极限技术前沿。掌握0.1-10THz频段的器件工艺、
                                    Graphene/CNT材料的太赫兹特性、UTC-PD单行载流子光电二极管设计。
                                    深入学习大气衰减的分子吸收建模、MIMO-OFDM在太赫兹的性能优化、
                                    智能反射面IRS的波束控制算法。实现6G Tbps级无线传输、
                                    全息通信的空间复用技术、以及感通一体化的无线感知网络。
                                  </p>
                                  <div className="tech-tags">
                                    <span>太赫兹器件</span>
                                    <span>智能反射面</span>
                                    <span>6G Tbps</span>
                                    <span>感通一体</span>
                                  </div>
                                  <div className="course-meta">
                                    <span className="difficulty">难度：⭐⭐⭐⭐⭐</span>
                                    <span className="duration">修炼时长：180日</span>
                                    <span className="exp-gain">经验值：+2000</span>
                                  </div>
                                  <button className="start-button locked master-locked">
                                    <span className="button-text">需掌门亲传</span>
                                    <span className="lock-icon">🎭</span>
                                  </button>
                                </div>
                              </div>
                              
                              <div className="course-item master">
                                <div className="course-icon">🧬</div>
                                <div className="course-info">
                                  <h5>万里传音心法</h5>
                                  <p className="course-desc">
                                    构建终极全球通信网络架构。精通海底光缆的中继器技术、
                                    星地融合的无缝切换算法、量子通信的BB84协议实现。
                                    掌握全息波束成形的数字孪生、6G空天地海一体化网络、
                                    脑机接口的神经信号传输协议。实现意念控制的直觉通信、
                                    多维空间的信息传递、以及超越光速限制的量子纠缠通信网络。
                                  </p>
                                  <div className="tech-tags">
                                    <span>量子通信</span>
                                    <span>空天地海</span>
                                    <span>脑机接口</span>
                                    <span>量子纠缠</span>
                                  </div>
                                  <div className="course-meta">
                                    <span className="difficulty">难度：⭐⭐⭐⭐⭐</span>
                                    <span className="duration">修炼时长：365日</span>
                                    <span className="exp-gain">经验值：+5000</span>
                                  </div>
                                  <button className="start-button locked master-locked">
                                    <span className="button-text">需掌门亲传</span>
                                    <span className="lock-icon">🎭</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 试炼挑战内容 */}
                      {contentTab === 'trials' && (
                        <div className="trials-section">
                          <h3>试炼挑战·千里传音</h3>
                          
                          <div className="trial-categories">
                            <div className="trial-category">
                              <h4>入门试炼</h4>
                              <div className="trial-list">
                                <div className="trial-item">
                                  <div className="trial-icon">📡</div>
                                  <div className="trial-info">
                                    <h5>WiFi信号侦测</h5>
                                    <p className="trial-desc">使用频谱仪分析2.4GHz和5GHz频段，识别信道占用情况并优化网络配置</p>
                                    <div className="trial-requirements">
                                      <span>要求境界：接入境</span>
                                      <span>时间限制：30分钟</span>
                                    </div>
                                    <div className="trial-rewards">
                                      <span className="reward">经验+100</span>
                                      <span className="reward">通信积分+50</span>
                                    </div>
                                  </div>
                                  <button className="trial-start-btn">开始试炼</button>
                                </div>
                                
                                <div className="trial-item">
                                  <div className="trial-icon">🌐</div>
                                  <div className="trial-info">
                                    <h5>光纤链路测试</h5>
                                    <p className="trial-desc">运用OTDR测试单模光纤链路，分析事件表并计算链路损耗预算</p>
                                    <div className="trial-requirements">
                                      <span>要求境界：接入境</span>
                                      <span>时间限制：45分钟</span>
                                    </div>
                                    <div className="trial-rewards">
                                      <span className="reward">经验+120</span>
                                      <span className="reward">光纤道具+1</span>
                                    </div>
                                  </div>
                                  <button className="trial-start-btn">开始试炼</button>
                                </div>
                              </div>
                            </div>

                            <div className="trial-category">
                              <h4>进阶试炼</h4>
                              <div className="trial-list">
                                <div className="trial-item advanced">
                                  <div className="trial-icon">📱</div>
                                  <div className="trial-info">
                                    <h5>5G基站优化</h5>
                                    <p className="trial-desc">配置gNB基站参数，优化波束赋形算法，实现目标小区的覆盖和容量提升</p>
                                    <div className="trial-requirements">
                                      <span>要求境界：无线境</span>
                                      <span>时间限制：2小时</span>
                                    </div>
                                    <div className="trial-rewards">
                                      <span className="reward">经验+500</span>
                                      <span className="reward">5G装备+1</span>
                                    </div>
                                  </div>
                                  <button className="trial-start-btn locked">境界不足</button>
                                </div>
                                
                                <div className="trial-item advanced">
                                  <div className="trial-icon">🛰️</div>
                                  <div className="trial-info">
                                    <h5>卫星轨道计算</h5>
                                    <p className="trial-desc">计算LEO卫星星座的覆盖范围，设计切换算法以保证通信连续性</p>
                                    <div className="trial-requirements">
                                      <span>要求境界：天涯境</span>
                                      <span>时间限制：3小时</span>
                                    </div>
                                    <div className="trial-rewards">
                                      <span className="reward">经验+800</span>
                                      <span className="reward">卫星勋章+1</span>
                                    </div>
                                  </div>
                                  <button className="trial-start-btn locked">境界不足</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 核心秘籍内容 */}
                      {contentTab === 'scriptures' && (
                        <div className="scriptures-section">
                          <h3>核心秘籍·传音宝典</h3>
                          
                          <div className="scripture-grid">
                            <div className="scripture-item">
                              <div className="scripture-cover">
                                <div className="scripture-seal">传</div>
                                <h4>《无线传音经》</h4>
                                <p className="scripture-desc">无线通信的根本法门</p>
                              </div>
                              <div className="scripture-preview">
                                <blockquote>
                                  "电磁波动，载信息而行千里。
                                  调制解调者，频域时域皆可变；
                                  MIMO天线者，空间复用增容量；
                                  信道编码者，抗噪纠错保真实..."
                                </blockquote>
                                <button className="read-button">研读秘籍</button>
                              </div>
                            </div>

                            <div className="scripture-item">
                              <div className="scripture-cover">
                                <div className="scripture-seal">光</div>
                                <h4>《光纤神功》</h4>
                                <p className="scripture-desc">光纤通信的至高心法</p>
                              </div>
                              <div className="scripture-preview">
                                <blockquote>
                                  "光行玻璃，全反射而不散；
                                  单模多模，色散特性各异；
                                  DWDM者，波长复用增带宽；
                                  相干检测者，相位幅度皆可用..."
                                </blockquote>
                                <button className="read-button">研读秘籍</button>
                              </div>
                            </div>

                            <div className="scripture-item">
                              <div className="scripture-cover">
                                <div className="scripture-seal">网</div>
                                <h4>《网络心法》</h4>
                                <p className="scripture-desc">网络架构的精要总纲</p>
                              </div>
                              <div className="scripture-preview">
                                <blockquote>
                                  "协议分层，各司其职而有序；
                                  TCP可靠，UDP迅捷各有妙；
                                  路由交换，数据包寻最优径；
                                  QoS保障，关键业务优先行..."
                                </blockquote>
                                <button className="read-button">研读秘籍</button>
                              </div>
                            </div>

                            <div className="scripture-item">
                              <div className="scripture-cover">
                                <div className="scripture-seal">融</div>
                                <h4>《5G心法》</h4>
                                <p className="scripture-desc">5G技术的核心要诀</p>
                              </div>
                              <div className="scripture-preview">
                                <blockquote>
                                  "新空口者，灵活帧结构适万物；
                                  网络切片，隔离资源保服务；
                                  边缘计算，算力下沉降时延；
                                  万物互联，智慧社会由此生..."
                                </blockquote>
                                <button className="read-button">研读秘籍</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 成就系统内容 */}
                      {contentTab === 'achievements' && (
                        <div className="achievements-section">
                          <h3>成就荣耀·名扬千里</h3>
                          
                          <div className="achievement-categories">
                            {/* 修炼成就 */}
                            <div className="achievement-category">
                              <h4>修炼成就</h4>
                              <div className="achievement-grid">
                                <div className="achievement-item unlocked">
                                  <div className="achievement-icon">🌟</div>
                                  <div className="achievement-name">初入千里</div>
                                  <div className="achievement-desc">成功加入千里门</div>
                                  <div className="achievement-date">2024.01.15</div>
                                </div>
                                
                                <div className="achievement-item">
                                  <div className="achievement-icon">📖</div>
                                  <div className="achievement-name">勤学苦练</div>
                                  <div className="achievement-desc">完成10门课程</div>
                                  <div className="progress-bar">
                                    <div className="progress" style={{width: '20%'}}></div>
                                  </div>
                                </div>
                                
                                <div className="achievement-item">
                                  <div className="achievement-icon">⚡</div>
                                  <div className="achievement-name">传音大师</div>
                                  <div className="achievement-desc">掌握所有基础通信技术</div>
                                  <div className="progress-bar">
                                    <div className="progress" style={{width: '25%'}}></div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* 试炼成就 */}
                            <div className="achievement-category">
                              <h4>试炼成就</h4>
                              <div className="achievement-grid">
                                <div className="achievement-item">
                                  <div className="achievement-icon">🏆</div>
                                  <div className="achievement-name">试炼新手</div>
                                  <div className="achievement-desc">完成首个试炼任务</div>
                                  <div className="progress-bar">
                                    <div className="progress" style={{width: '0%'}}></div>
                                  </div>
                                </div>
                                
                                <div className="achievement-item rare">
                                  <div className="achievement-icon">💎</div>
                                  <div className="achievement-name">信号无阻</div>
                                  <div className="achievement-desc">完美完成高难度通信试炼</div>
                                  <div className="locked-overlay">未解锁</div>
                                </div>
                                
                                <div className="achievement-item legendary">
                                  <div className="achievement-icon">👑</div>
                                  <div className="achievement-name">千里传音</div>
                                  <div className="achievement-desc">成为年度最佳弟子</div>
                                  <div className="locked-overlay">传说成就</div>
                                </div>
                              </div>
                            </div>

                            {/* 技术成就 */}
                            <div className="achievement-category">
                              <h4>技术成就</h4>
                              <div className="achievement-grid">
                                <div className="achievement-item">
                                  <div className="achievement-icon">📡</div>
                                  <div className="achievement-name">无线专家</div>
                                  <div className="achievement-desc">精通所有无线通信协议</div>
                                  <div className="progress-bar">
                                    <div className="progress" style={{width: '15%'}}></div>
                                  </div>
                                </div>
                                
                                <div className="achievement-item">
                                  <div className="achievement-icon">🌐</div>
                                  <div className="achievement-name">光纤大师</div>
                                  <div className="achievement-desc">掌握光纤通信全套技术</div>
                                  <div className="progress-bar">
                                    <div className="progress" style={{width: '10%'}}></div>
                                  </div>
                                </div>
                                
                                <div className="achievement-item rare">
                                  <div className="achievement-icon">🛰️</div>
                                  <div className="achievement-name">卫星通信师</div>
                                  <div className="achievement-desc">成功设计卫星通信系统</div>
                                  <div className="locked-overlay">未解锁</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 任务看板内容 */}
                      {contentTab === 'taskboard' && (
                        <div className="taskboard-section">
                          <div className="taskboard-header">
                            <h3>各大门派·任务看板</h3>
                            <p className="taskboard-desc">协同管理硬件武林各门派技术项目进度</p>
                            
                            <div className="taskboard-controls">
                              <div className="task-filters">
                                <select 
                                  value={taskFilter} 
                                  onChange={(e) => setTaskFilter(e.target.value)}
                                  className="filter-select"
                                >
                                  <option value="all">全部门派</option>
                                  <option value="天眼门">天眼门</option>
                                  <option value="千里门">千里门</option>
                                  <option value="算天门">算天门</option>
                                  <option value="御器门">御器门</option>
                                  <option value="聚能门">聚能门</option>
                                  <option value="融合门">融合门</option>
                                </select>
                                
                                <select 
                                  value={taskSort} 
                                  onChange={(e) => setTaskSort(e.target.value)}
                                  className="sort-select"
                                >
                                  <option value="deadline">按期限排序</option>
                                  <option value="priority">按优先级排序</option>
                                  <option value="progress">按进度排序</option>
                                  <option value="created">按创建时间排序</option>
                                </select>
                              </div>
                              
                              <button 
                                className="add-task-button"
                                onClick={() => {
                                  setEditingTask(null);
                                  setTaskForm({
                                    title: '',
                                    description: '',
                                    sect: '千里门',
                                    priority: '中',
                                    status: '规划中',
                                    deadline: '',
                                    tags: ''
                                  });
                                  setShowTaskModal(true);
                                }}
                              >
                                + 新建任务
                              </button>
                              
                              {tasks.length === 0 ? (
                                <button 
                                  className="init-data-button"
                                  onClick={() => {
                                    // 加载天眼门的初始数据
                                    const getInitialTasks = () => [
                                      {
                                        id: 1,
                                        title: "5G基站信号优化项目",
                                        description: "优化城市核心区域5G基站信号覆盖，提升网络质量",
                                        sect: "千里门",
                                        assignee: "通信师兄",
                                        priority: "高",
                                        status: "进行中",
                                        progress: 65,
                                        deadline: "2024-02-15",
                                        createdAt: "2024-01-10",
                                        tags: ["5G", "信号优化", "基站"]
                                      },
                                      {
                                        id: 2,
                                        title: "工业传感器校准系统",
                                        description: "开发自动化传感器校准平台，提升测量精度",
                                        sect: "天眼门",
                                        assignee: "感知弟子",
                                        priority: "中",
                                        status: "规划中",
                                        progress: 20,
                                        deadline: "2024-02-28",
                                        createdAt: "2024-01-12",
                                        tags: ["传感器", "校准", "精度"]
                                      },
                                      {
                                        id: 3,
                                        title: "量子通信密钥分发",
                                        description: "研发量子密钥分发协议，确保通信安全",
                                        sect: "千里门",
                                        assignee: "量子研究员",
                                        priority: "高",
                                        status: "完成",
                                        progress: 100,
                                        deadline: "2024-01-30",
                                        createdAt: "2024-01-01",
                                        tags: ["量子通信", "密钥", "安全"]
                                      },
                                      {
                                        id: 4,
                                        title: "AI芯片神经网络加速器",
                                        description: "设计专用AI芯片架构，优化深度学习推理性能",
                                        sect: "算天门",
                                        assignee: "芯片架构师",
                                        priority: "高",
                                        status: "进行中",
                                        progress: 45,
                                        deadline: "2024-03-15",
                                        createdAt: "2024-01-08",
                                        tags: ["AI芯片", "神经网络", "加速器"]
                                      }
                                    ];
                                    const initialTasks = getInitialTasks();
                                    updateTasks(initialTasks);
                                  }}
                                >
                                  📦 加载示例数据
                                </button>
                              ) : (
                                <button 
                                  className="clear-data-button"
                                  onClick={() => {
                                    if (confirm('确定要清空所有任务吗？此操作无法撤销。')) {
                                      updateTasks([]);
                                    }
                                  }}
                                >
                                  🗑️ 清空所有任务
                                </button>
                              )}
                            </div>
                          </div>
                          
                          <div className="task-board">
                            <div className="task-columns">
                              {/* 规划中列 */}
                              <div className="task-column planning">
                                <div className="column-header">
                                  <h4>📋 规划中</h4>
                                  <span className="task-count">
                                    {tasks.filter(task => task.status === '规划中').length}
                                  </span>
                                </div>
                                <div className="task-list">
                                  {tasks
                                    .filter(task => task.status === '规划中')
                                    .filter(task => taskFilter === 'all' || task.sect === taskFilter)
                                    .map(task => (
                                      <div key={task.id} className="task-card" onClick={() => {
                                        setEditingTask(task);
                                        setTaskForm({
                                          title: task.title,
                                          description: task.description,
                                          sect: task.sect,
                                          priority: task.priority,
                                          status: task.status,
                                          deadline: task.deadline,
                                          tags: task.tags.join(', ')
                                        });
                                        setShowTaskModal(true);
                                      }}>
                                        <div className="task-header">
                                          <div className="task-sect">{task.sect}</div>
                                          <div className={`task-priority priority-${task.priority}`}>
                                            {task.priority}
                                          </div>
                                        </div>
                                        <h5 className="task-title">{task.title}</h5>
                                        <p className="task-description">{task.description}</p>
                                        <div className="task-assignee">负责人：{task.assignee}</div>
                                        <div className="task-deadline">截止：{task.deadline}</div>
                                        <div className="task-tags">
                                          {task.tags.map(tag => (
                                            <span key={tag} className="task-tag">{tag}</span>
                                          ))}
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              </div>
                              
                              {/* 进行中列 */}
                              <div className="task-column progress">
                                <div className="column-header">
                                  <h4>🚀 进行中</h4>
                                  <span className="task-count">
                                    {tasks.filter(task => task.status === '进行中').length}
                                  </span>
                                </div>
                                <div className="task-list">
                                  {tasks
                                    .filter(task => task.status === '进行中')
                                    .filter(task => taskFilter === 'all' || task.sect === taskFilter)
                                    .map(task => (
                                      <div key={task.id} className="task-card" onClick={() => {
                                        setEditingTask(task);
                                        setTaskForm({
                                          title: task.title,
                                          description: task.description,
                                          sect: task.sect,
                                          priority: task.priority,
                                          status: task.status,
                                          deadline: task.deadline,
                                          tags: task.tags.join(', ')
                                        });
                                        setShowTaskModal(true);
                                      }}>
                                        <div className="task-header">
                                          <div className="task-sect">{task.sect}</div>
                                          <div className={`task-priority priority-${task.priority}`}>
                                            {task.priority}
                                          </div>
                                        </div>
                                        <h5 className="task-title">{task.title}</h5>
                                        <p className="task-description">{task.description}</p>
                                        <div className="task-progress-container">
                                          <div className="progress-bar">
                                            <div 
                                              className="progress-fill" 
                                              style={{width: `${task.progress}%`}}
                                            ></div>
                                          </div>
                                          <span className="progress-text">{task.progress}%</span>
                                        </div>
                                        <div className="task-assignee">负责人：{task.assignee}</div>
                                        <div className="task-deadline">截止：{task.deadline}</div>
                                        <div className="task-tags">
                                          {task.tags.map(tag => (
                                            <span key={tag} className="task-tag">{tag}</span>
                                          ))}
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              </div>
                              
                              {/* 已完成列 */}
                              <div className="task-column completed">
                                <div className="column-header">
                                  <h4>✅ 已完成</h4>
                                  <span className="task-count">
                                    {tasks.filter(task => task.status === '完成').length}
                                  </span>
                                </div>
                                <div className="task-list">
                                  {tasks
                                    .filter(task => task.status === '完成')
                                    .filter(task => taskFilter === 'all' || task.sect === taskFilter)
                                    .map(task => (
                                      <div key={task.id} className="task-card completed" onClick={() => {
                                        setEditingTask(task);
                                        setTaskForm({
                                          title: task.title,
                                          description: task.description,
                                          sect: task.sect,
                                          priority: task.priority,
                                          status: task.status,
                                          deadline: task.deadline,
                                          tags: task.tags.join(', ')
                                        });
                                        setShowTaskModal(true);
                                      }}>
                                        <div className="task-header">
                                          <div className="task-sect">{task.sect}</div>
                                          <div className="completion-badge">已完成</div>
                                        </div>
                                        <h5 className="task-title">{task.title}</h5>
                                        <p className="task-description">{task.description}</p>
                                        <div className="task-assignee">负责人：{task.assignee}</div>
                                        <div className="task-deadline">完成于：{task.deadline}</div>
                                        <div className="task-tags">
                                          {task.tags.map(tag => (
                                            <span key={tag} className="task-tag">{tag}</span>
                                          ))}
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 建议讨论内容 */}
                      {contentTab === 'suggestions' && (
                        <div className="suggestions-section">
                          <div className="suggestions-header">
                            <h3>💡 建议讨论·千里传音</h3>
                            <p className="suggestions-subtitle">千里门弟子携手并进，共享智慧，传音天下，共谋武林技术发展大业</p>
                            
                            <div className="suggestions-controls">
                              <div className="suggestions-actions">
                                <button 
                                  className="create-suggestion-btn"
                                  onClick={() => openSuggestionModal()}
                                >
                                  ✨ 提交建议
                                </button>
                                
                                {suggestions.length === 0 ? (
                                  <button 
                                    className="init-data-btn"
                                    onClick={initializeSampleSuggestions}
                                  >
                                    📦 加载示例数据
                                  </button>
                                ) : (
                                  <button 
                                    className="clear-data-btn"
                                    onClick={clearAllSuggestions}
                                  >
                                    🗑️ 清空所有建议
                                  </button>
                                )}
                              </div>
                              
                              <div className="suggestions-filters">
                                <select
                                  value={suggestionFilter}
                                  onChange={(e) => setSuggestionFilter(e.target.value)}
                                  className="filter-select"
                                >
                                  <option value="all">全部门派</option>
                                  <option value="tianyan">天眼门</option>
                                  <option value="qianli">千里门</option>
                                  <option value="suantian">算天门</option>
                                  <option value="yuqi">御器门</option>
                                  <option value="juneng">聚能门</option>
                                  <option value="ronghe">融合门</option>
                                </select>
                                
                                <select
                                  value={suggestionSort}
                                  onChange={(e) => setSuggestionSort(e.target.value)}
                                  className="sort-select"
                                >
                                  <option value="latest">最新发布</option>
                                  <option value="oldest">最早发布</option>
                                  <option value="most_liked">最多赞同</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="suggestions-list">
                            {getFilteredAndSortedSuggestions().length === 0 ? (
                              <div className="empty-suggestions">
                                <div className="empty-icon">🤔</div>
                                <h4>暂无建议</h4>
                                <p>成为第一个提出建议的弟子，为武林技术发展贡献智慧！</p>
                              </div>
                            ) : (
                              getFilteredAndSortedSuggestions().map(suggestion => (
                                <div key={suggestion.id} className="suggestion-card">
                                  <div className="suggestion-header">
                                    <div className="suggestion-meta">
                                      <span className={`sect-badge sect-${suggestion.sect === '天眼门' ? 'tianyan' : suggestion.sect === '千里门' ? 'qianli' : 'other'}`}>
                                        {suggestion.sect}
                                      </span>
                                      <span className={`priority priority-${suggestion.priority}`}>
                                        {suggestion.priority}
                                      </span>
                                      <span className="suggestion-author">
                                        {suggestion.sect} ({suggestion.authorGlobalName || suggestion.author.split('·')[1] || '佚名'})
                                      </span>
                                      <span className="suggestion-time">
                                        {new Date(suggestion.timestamp).toLocaleDateString('zh-CN')}
                                      </span>
                                    </div>
                                    <div className="suggestion-actions">
                                      <button
                                        className="like-btn"
                                        onClick={() => handleLikeSuggestion(suggestion.id)}
                                      >
                                        👍 {suggestion.likes}
                                      </button>
                                      <button
                                        className="edit-btn"
                                        onClick={() => openSuggestionModal(suggestion)}
                                      >
                                        ✏️
                                      </button>
                                      <button
                                        className="delete-btn"
                                        onClick={() => deleteSuggestion(suggestion.id)}
                                      >
                                        🗑️
                                      </button>
                                    </div>
                                  </div>
                                  
                                  <div className="suggestion-content">
                                    <h4 className="suggestion-title">{suggestion.title}</h4>
                                    <p className="suggestion-text">{suggestion.content}</p>
                                    
                                    {suggestion.tags.length > 0 && (
                                      <div className="suggestion-tags">
                                        {suggestion.tags.map((tag, index) => (
                                          <span key={index} className="tag">#{tag}</span>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="comments-section">
                                    <h5 className="comments-title">
                                      💬 讨论 ({suggestion.comments.length})
                                    </h5>
                                    
                                    <div className="comments-list">
                                      {suggestion.comments.map(comment => (
                                        <div key={comment.id} className="comment">
                                          <div className="comment-meta">
                                            <span className="comment-author">
                                              {comment.author.split('·')[0]} ({comment.authorGlobalName || comment.author.split('·')[1] || '佚名'})
                                            </span>
                                            <span className="comment-time">
                                              {new Date(comment.timestamp).toLocaleString('zh-CN')}
                                            </span>
                                          </div>
                                          <p className="comment-content">{comment.content}</p>
                                        </div>
                                      ))}
                                    </div>
                                    
                                    <div className="add-comment">
                                      <textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="参与讨论，分享你的见解..."
                                        className="comment-input"
                                        rows="3"
                                      />
                                      <button
                                        className="submit-comment-btn"
                                        onClick={() => handleAddComment(suggestion.id, newComment)}
                                        disabled={!newComment.trim()}
                                      >
                                        发表评论
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* 个人中心内容 */}
                {activeTab === 'profile' && (
                  <div className="profile-section">
                    <h2>个人信息</h2>
                    <div className="profile-grid">
                      <div className="profile-card">
                        <div className="card-header">
                          <h3>基本信息</h3>
                          <button 
                            className="edit-button"
                            onClick={() => setIsEditing(!isEditing)}
                          >
                            {isEditing ? '取消' : '编辑'}
                          </button>
                        </div>
                        <div className="info-grid">
                          <div className="info-item">
                            <label>QQ号</label>
                            <span>{user.qq}</span>
                          </div>
                          <div className="info-item">
                            <label>全局昵称</label>
                            {isEditing ? (
                              <input 
                                type="text"
                                value={editForm.globalNickname}
                                onChange={(e) => setEditForm({...editForm, globalNickname: e.target.value})}
                                className="edit-input"
                              />
                            ) : (
                              <span>{user.globalNickname}</span>
                            )}
                          </div>
                          <div className="info-item">
                            <label>门派昵称</label>
                            {isEditing ? (
                              <input 
                                type="text"
                                value={editForm.sectNickname}
                                onChange={(e) => setEditForm({...editForm, sectNickname: e.target.value})}
                                className="edit-input"
                              />
                            ) : (
                              <span>{user.sectNickname}</span>
                            )}
                          </div>
                          <div className="info-item">
                            <label>入门时间</label>
                            <span>{new Date(user.joinTime).toLocaleString()}</span>
                          </div>
                        </div>
                        {isEditing && (
                          <div className="edit-actions">
                            <button 
                              className="save-button"
                              onClick={async () => {
                                try {
                                  let hasChanges = false;
                                  let errors = [];
                                  if (editForm.globalNickname !== user.globalNickname) {
                                    if (!editForm.globalNickname.trim()) {
                                      errors.push('全局昵称不能为空');
                                    } else {
                                      const success = await updateFunctions.updateGlobalNickname(editForm.globalNickname.trim());
                                      if (success) hasChanges = true;
                                      else errors.push('全局昵称更新失败');
                                    }
                                  }
                                  if (editForm.sectNickname !== user.sectNickname) {
                                    if (!editForm.sectNickname.trim()) {
                                      errors.push('门派昵称不能为空');
                                    } else {
                                      const success = await updateFunctions.updateSectNickname(editForm.sectNickname.trim());
                                      if (success) hasChanges = true;
                                      else errors.push('门派昵称更新失败');
                                    }
                                  }
                                  if (errors.length > 0) {
                                    alert('保存失败：\n' + errors.join('\n'));
                                  } else if (hasChanges) {
                                    alert('保存成功！');
                                    setIsEditing(false);
                                  } else {
                                    alert('没有修改任何信息');
                                    setIsEditing(false);
                                  }
                                } catch (error) {
                                  alert('保存时出错：' + error.message);
                                }
                              }}
                            >
                              保存修改
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="profile-card">
                        <h3>门派信息</h3>
                        <div className="info-grid">
                          <div className="info-item">
                            <label>当前门派</label>
                            <span className="sect-badge">千里门</span>
                          </div>
                          <div className="info-item">
                            <label>修炼境界</label>
                            <span>{user.cultivationLevel}</span>
                          </div>
                          <div className="info-item">
                            <label>门派积分</label>
                            <span className="points-value">{user.sectPoints}</span>
                          </div>
                          <div className="info-item">
                            <label>最后登录</label>
                            <span>{new Date(user.lastLoginTime || Date.now()).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="profile-card full-width">
                        <h3>已加入门派</h3>
                        <div className="sects-list">
                          {user.registeredSects && user.registeredSects.map(sectId => (
                            <div key={sectId} className="sect-item">
                              <span className="sect-name">{sectId === 'qianli' ? '千里门' : sectId}</span>
                              <button 
                                className="switch-button"
                                onClick={() => alert('切换门派功能开发中...')}
                              >
                                切换
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 账户设置内容 */}
                {activeTab === 'settings' && (
                  <div className="settings-section">
                    <h2>账户设置</h2>
                    <div className="settings-grid">
                      <div className="settings-card">
                        <h3>修改密码</h3>
                        <div className="password-form">
                          <div className="form-item">
                            <label>当前密码</label>
                            <input 
                              type="password" 
                              placeholder="请输入当前密码" 
                              value={passwordForm.oldPassword}
                              onChange={(e) => setPasswordForm({...passwordForm, oldPassword: e.target.value})}
                            />
                          </div>
                          <div className="form-item">
                            <label>新密码</label>
                            <input 
                              type="password" 
                              placeholder="请输入新密码（至少6位）" 
                              value={passwordForm.newPassword}
                              onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                            />
                          </div>
                          <div className="form-item">
                            <label>确认新密码</label>
                            <input 
                              type="password" 
                              placeholder="请再次输入新密码" 
                              value={passwordForm.confirmPassword}
                              onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                            />
                          </div>
                          <button 
                            className="update-button"
                            onClick={async () => {
                              try {
                                if (!passwordForm.oldPassword) {
                                  alert('请输入当前密码');
                                  return;
                                }
                                if (!passwordForm.newPassword) {
                                  alert('请输入新密码');
                                  return;
                                }
                                if (passwordForm.newPassword.length < 6) {
                                  alert('新密码至少需要6个字符');
                                  return;
                                }
                                if (passwordForm.newPassword !== passwordForm.confirmPassword) {
                                  alert('两次输入的新密码不一致');
                                  return;
                                }
                                const success = await updateFunctions.updatePassword(
                                  passwordForm.oldPassword,
                                  passwordForm.newPassword
                                );
                                if (success) {
                                  alert('密码修改成功！请重新登录');
                                  setPasswordForm({
                                    oldPassword: '',
                                    newPassword: '',
                                    confirmPassword: ''
                                  });
                                  setTimeout(() => {
                                    logout();
                                  }, 1500);
                                } else {
                                  alert('密码修改失败，请检查当前密码是否正确');
                                }
                              } catch (error) {
                                alert('修改密码时出错：' + error.message);
                              }
                            }}
                          >
                            更新密码
                          </button>
                        </div>
                      </div>

                      <div className="settings-card">
                        <h3>账户安全</h3>
                        <div className="security-options">
                          <div className="security-item">
                            <span>登录提醒</span>
                            <label className="switch">
                              <input type="checkbox" defaultChecked />
                              <span className="slider"></span>
                            </label>
                          </div>
                          <div className="security-item">
                            <span>异地登录验证</span>
                            <label className="switch">
                              <input type="checkbox" />
                              <span className="slider"></span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="settings-card danger">
                        <h3>危险操作</h3>
                        <div className="danger-zone">
                          <button className="danger-button">
                            退出当前门派
                          </button>
                          <p className="danger-warning">
                            退出后将清空所有门派数据，无法恢复！
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* 任务编辑模态框 */}
            {showTaskModal && (
              <div className="task-modal-overlay" onClick={() => setShowTaskModal(false)}>
                <div className="task-modal" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h3>{editingTask ? '编辑任务' : '新建任务'}</h3>
                    <button 
                      className="close-button"
                      onClick={() => setShowTaskModal(false)}
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="modal-content">
                    <div className="form-group">
                      <label>任务标题</label>
                      <input
                        type="text"
                        value={taskForm.title}
                        onChange={(e) => setTaskForm({...taskForm, title: e.target.value})}
                        placeholder="输入任务标题"
                        className="form-input"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>任务描述</label>
                      <textarea
                        value={taskForm.description}
                        onChange={(e) => setTaskForm({...taskForm, description: e.target.value})}
                        placeholder="详细描述任务内容"
                        className="form-textarea"
                        rows="4"
                      />
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>所属门派</label>
                        <select
                          value={taskForm.sect}
                          onChange={(e) => setTaskForm({...taskForm, sect: e.target.value})}
                          className="form-select"
                        >
                          <option value="天眼门">天眼门</option>
                          <option value="千里门">千里门</option>
                          <option value="算天门">算天门</option>
                          <option value="御器门">御器门</option>
                          <option value="聚能门">聚能门</option>
                          <option value="融合门">融合门</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label>优先级</label>
                        <select
                          value={taskForm.priority}
                          onChange={(e) => setTaskForm({...taskForm, priority: e.target.value})}
                          className="form-select"
                        >
                          <option value="低">低</option>
                          <option value="中">中</option>
                          <option value="高">高</option>
                          <option value="紧急">紧急</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>任务状态</label>
                        <select
                          value={taskForm.status}
                          onChange={(e) => setTaskForm({...taskForm, status: e.target.value})}
                          className="form-select"
                        >
                          <option value="规划中">规划中</option>
                          <option value="进行中">进行中</option>
                          <option value="完成">完成</option>
                          <option value="暂停">暂停</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label>截止日期</label>
                        <input
                          type="date"
                          value={taskForm.deadline}
                          onChange={(e) => setTaskForm({...taskForm, deadline: e.target.value})}
                          className="form-input"
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>技术标签</label>
                      <input
                        type="text"
                        value={taskForm.tags}
                        onChange={(e) => setTaskForm({...taskForm, tags: e.target.value})}
                        placeholder="用逗号分隔，如：5G, 传感器, AI"
                        className="form-input"
                      />
                    </div>
                  </div>
                  
                  <div className="modal-footer">
                    <div className="footer-left">
                      {editingTask && (
                        <button 
                          className="delete-button"
                                                     onClick={() => {
                             if (confirm('确定要删除这个任务吗？此操作无法撤销。')) {
                               updateTasks(tasks.filter(task => task.id !== editingTask.id));
                               setShowTaskModal(false);
                             }
                           }}
                        >
                          🗑️ 删除任务
                        </button>
                      )}
                    </div>
                    
                    <div className="footer-right">
                      <button 
                        className="cancel-button"
                        onClick={() => setShowTaskModal(false)}
                      >
                        取消
                      </button>
                      <button 
                        className="save-button"
                        onClick={() => {
                          if (editingTask) {
                            // 更新任务
                            updateTasks(tasks.map(task => 
                              task.id === editingTask.id 
                                ? {
                                    ...task,
                                    title: taskForm.title,
                                    description: taskForm.description,
                                    sect: taskForm.sect,
                                    priority: taskForm.priority,
                                    status: taskForm.status,
                                    deadline: taskForm.deadline,
                                    tags: taskForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
                                  }
                                : task
                            ));
                          } else {
                            // 新建任务
                            const newTask = {
                              id: Date.now(),
                              title: taskForm.title,
                              description: taskForm.description,
                              sect: taskForm.sect,
                              assignee: user.sectNickname,
                              priority: taskForm.priority,
                              status: taskForm.status,
                              progress: taskForm.status === '完成' ? 100 : 0,
                              deadline: taskForm.deadline,
                              createdAt: new Date().toISOString().split('T')[0],
                              tags: taskForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
                            };
                            updateTasks([...tasks, newTask]);
                          }
                          setShowTaskModal(false);
                        }}
                      >
                        {editingTask ? '更新任务' : '创建任务'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 建议模态框 */}
            {showSuggestionModal && (
              <div className="modal-overlay" onClick={closeSuggestionModal}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h3>{editingSuggestion ? '编辑建议' : '提交新建议'}</h3>
                    <button className="close-btn" onClick={closeSuggestionModal}>×</button>
                  </div>
                  
                  <form onSubmit={handleSuggestionSubmit} className="suggestion-form">
                    <div className="form-group">
                      <label>建议标题</label>
                      <input
                        type="text"
                        value={suggestionForm.title}
                        onChange={(e) => setSuggestionForm({...suggestionForm, title: e.target.value})}
                        placeholder="请输入建议标题..."
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>建议内容</label>
                      <textarea
                        value={suggestionForm.content}
                        onChange={(e) => setSuggestionForm({...suggestionForm, content: e.target.value})}
                        placeholder="详细描述你的建议..."
                        rows="6"
                        required
                      />
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>重要程度</label>
                        <select
                          value={suggestionForm.priority}
                          onChange={(e) => setSuggestionForm({...suggestionForm, priority: e.target.value})}
                        >
                          <option value="低">低</option>
                          <option value="中">中</option>
                          <option value="高">高</option>
                          <option value="紧急">紧急</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label>标签 (用逗号分隔)</label>
                        <input
                          type="text"
                          value={suggestionForm.tags}
                          onChange={(e) => setSuggestionForm({...suggestionForm, tags: e.target.value})}
                          placeholder="通信技术, 跨门派合作, 创新..."
                        />
                      </div>
                    </div>
                    
                    <div className="modal-footer">
                      <div className="footer-left">
                        {editingSuggestion && (
                          <button 
                            type="button" 
                            className="delete-suggestion-btn"
                            onClick={() => {
                              deleteSuggestion(editingSuggestion.id);
                              closeSuggestionModal();
                            }}
                          >
                            🗑️ 删除建议
                          </button>
                        )}
                      </div>
                      <div className="footer-right">
                        <button type="button" className="cancel-btn" onClick={closeSuggestionModal}>
                          取消
                        </button>
                        <button type="submit" className="submit-btn">
                          {editingSuggestion ? '更新建议' : '提交建议'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <style jsx>{`
              .sect-page {
                min-height: 100vh;
                background: linear-gradient(135deg, #000000 0%, #0a1a2a 50%, #1a2a3a 100%);
                color: #ffffff;
                position: relative;
              }

              .sect-container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 2rem;
                min-height: 100vh;
              }

              .sect-nav {
                margin-bottom: 2rem;
              }

              .back-button {
                background: rgba(30, 144, 255, 0.1);
                border: 1px solid rgba(30, 144, 255, 0.3);
                color: #1e90ff;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.3s ease;
              }

              .back-button:hover {
                background: rgba(30, 144, 255, 0.2);
              }

              .sect-header {
                text-align: center;
                margin-bottom: 3rem;
              }

              .sect-emblem {
                width: 100px;
                height: 100px;
                background: #1e90ff;
                color: #000;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3rem;
                font-weight: bold;
                margin: 0 auto 1.5rem;
                box-shadow: 0 0 40px rgba(30, 144, 255, 0.4);
              }

              .sect-title {
                font-size: 3.5rem;
                margin-bottom: 0.5rem;
                color: #1e90ff;
                text-shadow: 0 0 30px rgba(30, 144, 255, 0.5);
              }

              .sect-subtitle {
                font-size: 1.5rem;
                color: #ccc;
                margin-bottom: 1rem;
              }

              .sect-slogan {
                font-style: italic;
                color: #999;
                font-size: 1.1rem;
              }

              .user-info-bar {
                background: rgba(30, 144, 255, 0.1);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(30, 144, 255, 0.2);
                padding: 1.5rem;
                border-radius: 12px;
                margin-bottom: 3rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 1rem;
              }

              .user-details {
                display: flex;
                gap: 1.5rem;
                align-items: center;
                flex-wrap: wrap;
              }

              .user-nickname {
                font-size: 1.3rem;
                font-weight: 600;
                color: #1e90ff;
              }

              .user-level, .user-points {
                background: rgba(30, 144, 255, 0.1);
                padding: 0.4rem 0.8rem;
                border-radius: 20px;
                font-size: 0.9rem;
                color: #ccc;
              }

              .join-time {
                color: #999;
                font-size: 0.9rem;
              }

              .logout-button {
                background: rgba(255, 0, 0, 0.1);
                border: 1px solid rgba(255, 0, 0, 0.3);
                color: #ff6b6b;
                padding: 0.4rem 0.8rem;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.9rem;
                transition: all 0.3s ease;
                margin-left: 1rem;
              }

              .logout-button:hover {
                background: rgba(255, 0, 0, 0.2);
                transform: translateY(-1px);
              }

              .sect-content {
                background: rgba(0, 0, 0, 0.3);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                padding: 3rem;
              }

              .welcome-section {
                text-align: center;
                margin-bottom: 3rem;
              }

              .welcome-section h2 {
                color: #1e90ff;
                font-size: 2.2rem;
                margin-bottom: 1rem;
              }

              .cultivation-content h3 {
                color: #1e90ff;
                margin-bottom: 1.5rem;
                font-size: 1.5rem;
              }

              /* 内容标签样式 */
              .content-tabs {
                display: flex;
                gap: 1rem;
                margin-bottom: 2rem;
                background: rgba(0, 0, 0, 0.3);
                padding: 0.5rem;
                border-radius: 12px;
                backdrop-filter: blur(10px);
              }

              .content-tab {
                flex: 1;
                padding: 0.8rem 1.5rem;
                background: transparent;
                border: 1px solid transparent;
                color: #ccc;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 1rem;
                text-align: center;
              }

              .content-tab:hover {
                background: rgba(30, 144, 255, 0.1);
                color: #1e90ff;
              }

              .content-tab.active {
                background: rgba(30, 144, 255, 0.15);
                border-color: rgba(30, 144, 255, 0.3);
                color: #1e90ff;
              }

              .course-list {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
              }

              .course-item {
                background: rgba(30, 144, 255, 0.05);
                border: 1px solid rgba(30, 144, 255, 0.1);
                padding: 1.5rem;
                border-radius: 12px;
                display: flex;
                gap: 1rem;
                transition: all 0.3s ease;
              }

              .course-item:hover {
                background: rgba(30, 144, 255, 0.1);
                transform: translateY(-2px);
              }

              .course-icon {
                font-size: 2rem;
                flex-shrink: 0;
              }

              .course-info h4 {
                color: #1e90ff;
                margin-bottom: 0.5rem;
              }

              .course-info p {
                color: #ccc;
                margin-bottom: 0.5rem;
                line-height: 1.5;
              }

              .course-status {
                background: rgba(255, 165, 0, 0.2);
                color: #ffa500;
                padding: 0.2rem 0.6rem;
                border-radius: 12px;
                font-size: 0.8rem;
              }

              /* 导航标签样式 */
              .tab-navigation {
                display: flex;
                gap: 1rem;
                margin-bottom: 2rem;
                background: rgba(0, 0, 0, 0.3);
                padding: 0.5rem;
                border-radius: 12px;
                backdrop-filter: blur(10px);
              }

              .tab-item {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                padding: 0.8rem 1.5rem;
                background: transparent;
                border: 1px solid transparent;
                color: #ccc;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 1rem;
              }

              .tab-item:hover {
                background: rgba(30, 144, 255, 0.1);
                color: #1e90ff;
              }

              .tab-item.active {
                background: rgba(30, 144, 255, 0.15);
                border-color: rgba(30, 144, 255, 0.3);
                color: #1e90ff;
              }

              .tab-icon {
                font-size: 1.2rem;
              }

              /* 个人中心样式 */
              .profile-section h2,
              .settings-section h2 {
                color: #1e90ff;
                margin-bottom: 2rem;
                font-size: 2rem;
              }

              .profile-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 2rem;
              }

              .profile-card {
                background: rgba(30, 144, 255, 0.05);
                border: 1px solid rgba(30, 144, 255, 0.1);
                border-radius: 12px;
                padding: 2rem;
              }

              .profile-card.full-width {
                grid-column: 1 / -1;
              }

              .card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
              }

              .profile-card h3 {
                color: #1e90ff;
                margin-bottom: 1.5rem;
              }

              .edit-button {
                background: rgba(30, 144, 255, 0.1);
                border: 1px solid rgba(30, 144, 255, 0.3);
                color: #1e90ff;
                padding: 0.4rem 0.8rem;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.9rem;
                transition: all 0.3s ease;
              }

              .edit-button:hover {
                background: rgba(30, 144, 255, 0.2);
              }

              .info-grid {
                display: grid;
                gap: 1rem;
              }

              .info-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.8rem;
                background: rgba(0, 0, 0, 0.2);
                border-radius: 8px;
              }

              .info-item label {
                color: #999;
                font-size: 0.9rem;
              }

              .info-item span {
                color: #fff;
                font-weight: 500;
              }

              .edit-input {
                background: rgba(30, 144, 255, 0.1);
                border: 1px solid rgba(30, 144, 255, 0.3);
                color: #fff;
                padding: 0.4rem 0.8rem;
                border-radius: 6px;
                font-size: 1rem;
                max-width: 200px;
              }

              .edit-input:focus {
                outline: none;
                border-color: #1e90ff;
                box-shadow: 0 0 10px rgba(30, 144, 255, 0.3);
              }

              .edit-actions {
                margin-top: 1.5rem;
                text-align: right;
              }

              .save-button {
                background: rgba(30, 144, 255, 0.2);
                border: 1px solid rgba(30, 144, 255, 0.4);
                color: #1e90ff;
                padding: 0.6rem 1.5rem;
                border-radius: 6px;
                cursor: pointer;
                font-size: 1rem;
                transition: all 0.3s ease;
              }

              .save-button:hover {
                background: rgba(30, 144, 255, 0.3);
                transform: translateY(-1px);
              }

              .sect-badge {
                background: rgba(30, 144, 255, 0.2);
                color: #1e90ff;
                padding: 0.3rem 0.8rem;
                border-radius: 20px;
                font-size: 0.9rem;
              }

              .points-value {
                color: #ffd700 !important;
                font-size: 1.2rem;
                font-weight: bold;
              }

              .sects-list {
                display: flex;
                flex-direction: column;
                gap: 1rem;
              }

              .sect-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem;
                background: rgba(0, 0, 0, 0.2);
                border-radius: 8px;
              }

              .switch-button {
                background: rgba(30, 144, 255, 0.1);
                border: 1px solid rgba(30, 144, 255, 0.3);
                color: #1e90ff;
                padding: 0.4rem 1rem;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.9rem;
                transition: all 0.3s ease;
              }

              .switch-button:hover {
                background: rgba(30, 144, 255, 0.2);
              }

              .settings-section {
                margin-bottom: 3rem;
              }

              .settings-grid {
                display: flex;
                gap: 1.5rem;
              }

              .settings-card {
                background: rgba(30, 144, 255, 0.05);
                border: 1px solid rgba(30, 144, 255, 0.1);
                padding: 1.5rem;
                border-radius: 12px;
                flex: 1;
              }

              .password-form {
                display: flex;
                flex-direction: column;
                gap: 1rem;
              }

              .form-item {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
              }

              .form-item label {
                font-size: 1.2rem;
                font-weight: 600;
                color: #1e90ff;
                margin-right: 0.5rem;
              }

              .form-item input {
                background: rgba(30, 144, 255, 0.1);
                border: 1px solid rgba(30, 144, 255, 0.2);
                color: #1e90ff;
                padding: 0.5rem;
                border-radius: 6px;
              }

              .update-button {
                background: rgba(30, 144, 255, 0.2);
                border: 1px solid rgba(30, 144, 255, 0.3);
                color: #1e90ff;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.3s ease;
              }

              .update-button:hover {
                background: rgba(30, 144, 255, 0.3);
              }

              .security-options {
                display: flex;
                flex-wrap: wrap;
                gap: 1rem;
              }

              .security-item {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
              }

              .security-item span {
                font-size: 1.2rem;
                color: #ccc;
                margin-right: 0.5rem;
              }

              .security-item .switch {
                position: relative;
                display: inline-block;
                width: 60px;
                height: 34px;
              }

              .security-item .switch input {
                opacity: 0;
                width: 0;
                height: 0;
              }

              .security-item .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                -webkit-transition: .4s;
                transition: .4s;
              }

              .security-item .slider:before {
                position: absolute;
                content: "";
                height: 26px;
                width: 26px;
                left: 4px;
                bottom: 4px;
                background-color: white;
                -webkit-transition: .4s;
                transition: .4s;
              }

              .security-item input:checked + .slider {
                background-color: #2196F3;
              }

              .security-item input:focus + .slider {
                box-shadow: 0 0 1px #2196F3;
              }

              .security-item input:checked + .slider:before {
                -webkit-transform: translateX(26px);
                -ms-transform: translateX(26px);
                transform: translateX(26px);
              }

              .security-item .slider.round {
                border-radius: 34px;
              }

              .security-item .slider.round:before {
                border-radius: 50%;
              }

              .danger-zone {
                margin-top: 1.5rem;
                text-align: center;
              }

              .danger-button {
                background: rgba(255, 0, 0, 0.2);
                border: 1px solid rgba(255, 0, 0, 0.3);
                color: #ff0000;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.3s ease;
              }

              .danger-button:hover {
                background: rgba(255, 0, 0, 0.3);
              }

              .danger-warning {
                color: #ff0000;
                font-size: 1.2rem;
                margin-top: 0.5rem;
              }

              /* 门派专属背景特效 - 通信主题 */
              .sect-atmosphere {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                z-index: -1;
                background: radial-gradient(
                  circle at 25% 25%, 
                  rgba(30, 144, 255, 0.03) 0%, 
                  transparent 50%
                ),
                radial-gradient(
                  circle at 75% 75%, 
                  rgba(0, 191, 255, 0.02) 0%, 
                  transparent 50%
                );
              }

              /* 传输粒子 - 模拟信号传输 */
              .transmission-particle {
                position: absolute;
                width: 6px;
                height: 6px;
                background: linear-gradient(45deg, #1e90ff, #00bfff);
                border-radius: 50%;
                box-shadow: 0 0 15px rgba(30, 144, 255, 0.6);
                animation: signal-transmission 8s linear infinite;
              }

              @keyframes signal-transmission {
                0% {
                  transform: scale(0.5) rotate(0deg);
                  opacity: 0;
                }
                10% {
                  opacity: 1;
                }
                90% {
                  opacity: 1;
                }
                100% {
                  transform: scale(1.5) rotate(360deg);
                  opacity: 0;
                }
              }

              /* 波纹传播器 - 通信基站效果 */
              .wave-propagator {
                position: fixed;
                top: 20%;
                right: 15%;
                width: 300px;
                height: 300px;
                border-radius: 50%;
                pointer-events: none;
              }

              .wave-center {
                position: absolute;
                width: 15px;
                height: 15px;
                background: #1e90ff;
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                box-shadow: 
                  0 0 30px #1e90ff,
                  0 0 60px rgba(30, 144, 255, 0.5);
                animation: center-pulse 2s ease-in-out infinite;
              }

              @keyframes center-pulse {
                0%, 100% { 
                  transform: translate(-50%, -50%) scale(1); 
                  box-shadow: 0 0 30px #1e90ff, 0 0 60px rgba(30, 144, 255, 0.5);
                }
                50% { 
                  transform: translate(-50%, -50%) scale(1.2); 
                  box-shadow: 0 0 50px #1e90ff, 0 0 100px rgba(30, 144, 255, 0.8);
                }
              }

              .wave-sweep {
                position: absolute;
                width: 100%;
                height: 100%;
                background: conic-gradient(
                  from 0deg,
                  transparent 0deg,
                  rgba(30, 144, 255, 0.4) 30deg,
                  rgba(0, 191, 255, 0.2) 60deg,
                  transparent 120deg
                );
                animation: signal-sweep 4s linear infinite;
              }

              @keyframes signal-sweep {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }

              .wave-ring {
                position: absolute;
                border: 2px solid rgba(30, 144, 255, 0.4);
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                animation: wave-expand 4s ease-out infinite;
              }

              @keyframes wave-expand {
                0% {
                  width: 0;
                  height: 0;
                  opacity: 1;
                  border-width: 3px;
                }
                100% {
                  width: 400px;
                  height: 400px;
                  opacity: 0;
                  border-width: 0;
                }
              }

              /* 信号流效果 - 数据包传输 */
              .signal-streams {
                position: fixed;
                width: 100%;
                height: 100%;
                overflow: hidden;
                pointer-events: none;
              }

              .signal-stream {
                position: absolute;
                color: rgba(30, 144, 255, 0.4);
                font-family: 'Courier New', monospace;
                font-size: 10px;
                animation: data-packet-flow linear infinite;
                white-space: nowrap;
                text-shadow: 0 0 10px rgba(30, 144, 255, 0.6);
              }

              @keyframes data-packet-flow {
                from {
                  transform: translateY(-100px) translateX(-50px);
                  opacity: 0;
                }
                10% {
                  opacity: 0.8;
                }
                90% {
                  opacity: 0.8;
                }
                to {
                  transform: translateY(100vh) translateX(50px);
                  opacity: 0;
                }
              }

              /* 传音波纹 - 信号扩散效果 */
              .transmission-waves {
                position: fixed;
                width: 100%;
                height: 100%;
                pointer-events: none;
                overflow: hidden;
              }

              .wave {
                position: absolute;
                border-radius: 50%;
                background: radial-gradient(
                  circle at center,
                  transparent 0%,
                  transparent 30%,
                  rgba(30, 144, 255, 0.15) 30%,
                  rgba(30, 144, 255, 0.1) 35%,
                  transparent 40%
                );
              }

              .wave-1 {
                left: 10%;
                bottom: 20%;
                width: 300%;
                height: 300%;
                animation: communication-wave 12s ease-out infinite;
              }

              .wave-2 {
                right: 10%;
                top: 30%;
                width: 250%;
                height: 250%;
                animation: communication-wave 12s ease-out 4s infinite;
              }

              .wave-3 {
                left: 30%;
                top: 10%;
                width: 200%;
                height: 200%;
                animation: communication-wave 12s ease-out 8s infinite;
              }

              @keyframes communication-wave {
                0% {
                  transform: scale(0.1);
                  opacity: 1;
                }
                100% {
                  transform: scale(1);
                  opacity: 0;
                }
              }

              /* 通信网格 - 网络拓扑背景 */
              .comm-grid {
                position: fixed;
                width: 100%;
                height: 100%;
                background-image: 
                  linear-gradient(rgba(30, 144, 255, 0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(30, 144, 255, 0.05) 1px, transparent 1px),
                  radial-gradient(circle at 25% 25%, rgba(30, 144, 255, 0.03) 2px, transparent 2px),
                  radial-gradient(circle at 75% 75%, rgba(0, 191, 255, 0.03) 2px, transparent 2px);
                background-size: 60px 60px, 60px 60px, 120px 120px, 180px 180px;
                animation: network-drift 30s linear infinite;
                pointer-events: none;
              }

              @keyframes network-drift {
                0% { transform: translate(0, 0); }
                100% { transform: translate(60px, 60px); }
              }

              /* 门派徽章增强效果 */
              .sect-emblem {
                width: 120px;
                height: 120px;
                background: linear-gradient(135deg, #1e90ff 0%, #00bfff 100%);
                color: #000;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3.5rem;
                font-weight: bold;
                margin: 0 auto 1.5rem;
                box-shadow: 
                  0 0 60px rgba(30, 144, 255, 0.6),
                  inset 0 0 30px rgba(30, 144, 255, 0.3);
                position: relative;
                animation: emblem-pulse 3s ease-in-out infinite;
              }

              @keyframes emblem-pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
              }

              .sect-emblem::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: inherit;
                filter: blur(20px);
                opacity: 0.5;
                z-index: -1;
                animation: emblem-glow 3s ease-in-out infinite;
              }

              @keyframes emblem-glow {
                0%, 100% { transform: scale(1.2); opacity: 0.5; }
                50% { transform: scale(1.4); opacity: 0.8; }
              }

              /* 标题增强效果 */
              .sect-title {
                font-size: 4rem;
                margin-bottom: 0.5rem;
                color: #1e90ff;
                text-shadow: 
                  0 0 30px rgba(30, 144, 255, 0.8),
                  0 0 60px rgba(30, 144, 255, 0.5),
                  0 0 90px rgba(30, 144, 255, 0.3);
                animation: title-wave 5s ease-in-out infinite;
              }

              @keyframes title-wave {
                0%, 100% { 
                  opacity: 1; 
                  text-shadow: 0 0 30px rgba(30, 144, 255, 0.8), 0 0 60px rgba(30, 144, 255, 0.5), 0 0 90px rgba(30, 144, 255, 0.3);
                }
                50% { 
                  opacity: 0.95; 
                  text-shadow: 0 0 40px rgba(30, 144, 255, 1), 0 0 80px rgba(30, 144, 255, 0.7), 0 0 120px rgba(30, 144, 255, 0.5);
                }
              }

              /* 课程卡片系统 */
              .course-item {
                display: flex;
                gap: 1.5rem;
                background: linear-gradient(
                  135deg,
                  rgba(30, 144, 255, 0.05) 0%,
                  rgba(30, 144, 255, 0.02) 100%
                );
                border: 1px solid rgba(30, 144, 255, 0.2);
                padding: 1.8rem;
                border-radius: 16px;
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                position: relative;
                overflow: hidden;
              }

              .course-item::before {
                content: '';
                position: absolute;
                top: -2px;
                left: -2px;
                right: -2px;
                bottom: -2px;
                background: linear-gradient(
                  45deg,
                  #1e90ff,
                  transparent,
                  transparent,
                  #1e90ff
                );
                border-radius: 16px;
                opacity: 0;
                z-index: -1;
                transition: opacity 0.3s ease;
              }

              .course-item:hover::before {
                opacity: 1;
              }

              .course-item:hover {
                background: linear-gradient(
                  135deg,
                  rgba(30, 144, 255, 0.1) 0%,
                  rgba(30, 144, 255, 0.05) 100%
                );
                transform: translateY(-5px) scale(1.02);
                box-shadow: 
                  0 15px 40px rgba(30, 144, 255, 0.3),
                  0 0 60px rgba(30, 144, 255, 0.2);
              }

              .course-item.advanced {
                background: linear-gradient(
                  135deg,
                  rgba(0, 150, 255, 0.05) 0%,
                  rgba(0, 150, 255, 0.02) 100%
                );
                border-color: rgba(0, 150, 255, 0.2);
              }

              .course-item.advanced:hover {
                background: linear-gradient(
                  135deg,
                  rgba(0, 150, 255, 0.1) 0%,
                  rgba(0, 150, 255, 0.05) 100%
                );
                box-shadow: 
                  0 15px 40px rgba(0, 150, 255, 0.3),
                  0 0 60px rgba(0, 150, 255, 0.2);
              }

              .course-item.master {
                background: linear-gradient(
                  135deg,
                  rgba(255, 215, 0, 0.05) 0%,
                  rgba(255, 215, 0, 0.02) 100%
                );
                border-color: rgba(255, 215, 0, 0.2);
              }

              .course-item.master:hover {
                background: linear-gradient(
                  135deg,
                  rgba(255, 215, 0, 0.1) 0%,
                  rgba(255, 215, 0, 0.05) 100%
                );
                box-shadow: 
                  0 15px 40px rgba(255, 215, 0, 0.3),
                  0 0 60px rgba(255, 215, 0, 0.2);
              }

              /* 试炼系统样式 */
              .trial-categories {
                display: flex;
                flex-direction: column;
                gap: 2rem;
              }

              .trial-category h4 {
                color: #1e90ff;
                font-size: 1.5rem;
                margin-bottom: 1rem;
                text-shadow: 0 0 10px rgba(30, 144, 255, 0.5);
              }

              .trial-list {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
              }

              .trial-item {
                display: flex;
                gap: 1.5rem;
                background: linear-gradient(135deg, rgba(30, 144, 255, 0.05) 0%, rgba(30, 144, 255, 0.02) 100%);
                border: 1px solid rgba(30, 144, 255, 0.2);
                padding: 1.5rem;
                border-radius: 12px;
                transition: all 0.3s ease;
                align-items: center;
              }

              .trial-item:hover {
                transform: translateY(-3px);
                box-shadow: 0 10px 30px rgba(30, 144, 255, 0.2);
              }

              .trial-item.advanced {
                background: linear-gradient(135deg, rgba(0, 150, 255, 0.05) 0%, rgba(0, 150, 255, 0.02) 100%);
                border-color: rgba(0, 150, 255, 0.2);
              }

              .trial-icon {
                font-size: 2.5rem;
                min-width: 60px;
                text-align: center;
              }

              .trial-info {
                flex: 1;
              }

              .trial-info h5 {
                color: #1e90ff;
                font-size: 1.3rem;
                margin-bottom: 0.5rem;
              }

              .trial-desc {
                color: #ccc;
                margin-bottom: 1rem;
                line-height: 1.5;
              }

              .trial-requirements {
                display: flex;
                gap: 1rem;
                margin-bottom: 0.5rem;
              }

              .trial-requirements span {
                background: rgba(30, 144, 255, 0.1);
                padding: 0.3rem 0.8rem;
                border-radius: 15px;
                font-size: 0.9rem;
                color: #1e90ff;
              }

              .trial-rewards {
                display: flex;
                gap: 0.8rem;
              }

              .reward {
                background: linear-gradient(45deg, #ffd700, #ffed4e);
                color: #000;
                padding: 0.3rem 0.8rem;
                border-radius: 15px;
                font-size: 0.9rem;
                font-weight: bold;
              }

              .trial-start-btn {
                background: linear-gradient(45deg, #1e90ff, #00bfff);
                color: white;
                border: none;
                padding: 0.8rem 1.5rem;
                border-radius: 8px;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s ease;
                min-width: 120px;
              }

              .trial-start-btn:hover {
                transform: scale(1.05);
                box-shadow: 0 5px 15px rgba(30, 144, 255, 0.4);
              }

              .trial-start-btn.locked {
                background: #666;
                cursor: not-allowed;
              }

              /* 秘籍系统样式 */
              .scripture-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
              }

              .scripture-item {
                background: linear-gradient(135deg, rgba(30, 144, 255, 0.05) 0%, rgba(30, 144, 255, 0.02) 100%);
                border: 1px solid rgba(30, 144, 255, 0.2);
                border-radius: 16px;
                overflow: hidden;
                transition: all 0.4s ease;
              }

              .scripture-item:hover {
                transform: translateY(-8px) scale(1.02);
                box-shadow: 0 20px 50px rgba(30, 144, 255, 0.3);
              }

              .scripture-cover {
                background: linear-gradient(135deg, #1e90ff, #00bfff);
                color: white;
                padding: 2rem;
                text-align: center;
                position: relative;
              }

              .scripture-seal {
                width: 80px;
                height: 80px;
                background: rgba(255, 255, 255, 0.2);
                border: 3px solid rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2rem;
                font-weight: bold;
                margin: 0 auto 1rem;
              }

              .scripture-cover h4 {
                font-size: 1.5rem;
                margin-bottom: 0.5rem;
              }

              .scripture-desc {
                opacity: 0.9;
                font-style: italic;
              }

              .scripture-preview {
                padding: 2rem;
              }

              .scripture-preview blockquote {
                background: rgba(30, 144, 255, 0.05);
                border-left: 4px solid #1e90ff;
                padding: 1.5rem;
                margin: 0 0 1.5rem 0;
                font-style: italic;
                color: #ccc;
                line-height: 1.8;
              }

              .read-button {
                background: linear-gradient(45deg, #1e90ff, #00bfff);
                color: white;
                border: none;
                padding: 0.8rem 2rem;
                border-radius: 8px;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s ease;
                width: 100%;
              }

              .read-button:hover {
                transform: scale(1.02);
                box-shadow: 0 5px 15px rgba(30, 144, 255, 0.4);
              }

              /* 成就系统样式 */
              .achievement-categories {
                display: flex;
                flex-direction: column;
                gap: 2.5rem;
              }

              .achievement-category h4 {
                color: #1e90ff;
                font-size: 1.5rem;
                margin-bottom: 1.5rem;
                text-shadow: 0 0 10px rgba(30, 144, 255, 0.5);
              }

              .achievement-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1.5rem;
              }

              .achievement-item {
                background: linear-gradient(135deg, rgba(30, 144, 255, 0.05) 0%, rgba(30, 144, 255, 0.02) 100%);
                border: 1px solid rgba(30, 144, 255, 0.2);
                padding: 1.5rem;
                border-radius: 12px;
                text-align: center;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
              }

              .achievement-item:hover {
                transform: translateY(-3px);
                box-shadow: 0 10px 30px rgba(30, 144, 255, 0.2);
              }

              .achievement-item.unlocked {
                background: linear-gradient(135deg, rgba(0, 255, 127, 0.1) 0%, rgba(0, 255, 127, 0.05) 100%);
                border-color: rgba(0, 255, 127, 0.3);
              }

              .achievement-item.rare {
                background: linear-gradient(135deg, rgba(138, 43, 226, 0.1) 0%, rgba(138, 43, 226, 0.05) 100%);
                border-color: rgba(138, 43, 226, 0.3);
              }

              .achievement-item.legendary {
                background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%);
                border-color: rgba(255, 215, 0, 0.3);
              }

              .achievement-icon {
                font-size: 3rem;
                margin-bottom: 1rem;
              }

              .achievement-name {
                color: #1e90ff;
                font-size: 1.2rem;
                font-weight: bold;
                margin-bottom: 0.5rem;
              }

              .achievement-desc {
                color: #ccc;
                margin-bottom: 1rem;
                line-height: 1.4;
              }

              .achievement-date {
                color: #00ff7f;
                font-size: 0.9rem;
                font-weight: bold;
              }

              .progress-bar {
                background: rgba(30, 144, 255, 0.1);
                height: 8px;
                border-radius: 4px;
                overflow: hidden;
                margin-top: 0.5rem;
              }

              .progress {
                background: linear-gradient(90deg, #1e90ff, #00bfff);
                height: 100%;
                border-radius: 4px;
                transition: width 0.3s ease;
              }

              .locked-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #ccc;
                font-weight: bold;
                border-radius: 12px;
              }

              /* 通用UI增强 */
              .start-button {
                background: linear-gradient(45deg, #1e90ff, #00bfff);
                color: white;
                border: none;
                padding: 1rem 2rem;
                border-radius: 8px;
                cursor: pointer;
                font-weight: bold;
                position: relative;
                overflow: hidden;
                transition: all 0.3s ease;
              }

              .start-button:hover {
                transform: scale(1.05);
                box-shadow: 0 10px 25px rgba(30, 144, 255, 0.4);
              }

              .start-button.locked {
                background: #666;
                cursor: not-allowed;
              }

              .start-button.master-locked {
                background: linear-gradient(45deg, #666, #999);
                cursor: not-allowed;
              }

              .button-glow {
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                transition: left 0.5s;
              }

              .start-button:hover .button-glow {
                left: 100%;
              }

              .tech-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin: 1rem 0;
              }

              .tech-tags span {
                background: rgba(30, 144, 255, 0.1);
                color: #1e90ff;
                padding: 0.3rem 0.8rem;
                border-radius: 15px;
                font-size: 0.85rem;
                border: 1px solid rgba(30, 144, 255, 0.2);
              }

              @media (max-width: 768px) {
                .sect-container {
                  padding: 1rem;
                }

                .user-info-bar {
                  flex-direction: column;
                  text-align: center;
                }

                .user-details {
                  justify-content: center;
                }

                .sect-title {
                  font-size: 2.5rem;
                }

                .tab-navigation {
                  flex-direction: column;
                }

                .tab-item {
                  width: 100%;
                }

                .achievement-grid,
                .scripture-grid {
                  grid-template-columns: 1fr;
                }

                .trial-item {
                  flex-direction: column;
                  text-align: center;
                }
              }

              /* 任务看板样式 - 千里门蓝色主题 */
              .taskboard-section {
                margin-top: 2rem;
              }

              .taskboard-header {
                margin-bottom: 2rem;
                text-align: center;
              }

              .taskboard-header h3 {
                color: #1e90ff;
                font-size: 2.5rem;
                margin-bottom: 0.5rem;
                text-shadow: 0 0 20px rgba(30, 144, 255, 0.6);
              }

              .taskboard-desc {
                color: #ccc;
                font-size: 1.1rem;
                margin-bottom: 2rem;
              }

              .taskboard-controls {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 1rem;
                margin-bottom: 2rem;
              }

              .task-filters {
                display: flex;
                gap: 1rem;
              }

              .filter-select, .sort-select {
                background: rgba(30, 144, 255, 0.1);
                border: 1px solid rgba(30, 144, 255, 0.3);
                color: #1e90ff;
                padding: 0.5rem 1rem;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
              }

              .filter-select:hover, .sort-select:hover {
                background: rgba(30, 144, 255, 0.15);
                border-color: rgba(30, 144, 255, 0.5);
              }

              .add-task-button {
                background: linear-gradient(135deg, #1e90ff 0%, #0070f3 100%);
                color: #fff;
                border: none;
                padding: 0.8rem 1.5rem;
                border-radius: 25px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(30, 144, 255, 0.3);
              }

              .add-task-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(30, 144, 255, 0.4);
              }

              .init-data-button {
                background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                color: #fff;
                border: none;
                padding: 0.8rem 1.5rem;
                border-radius: 25px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
              }

              .init-data-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
              }

              .clear-data-button {
                background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                color: #fff;
                border: none;
                padding: 0.8rem 1.5rem;
                border-radius: 25px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
              }

              .clear-data-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
              }

              /* 看板布局 */
              .task-board {
                background: rgba(30, 144, 255, 0.02);
                border: 1px solid rgba(30, 144, 255, 0.1);
                border-radius: 16px;
                padding: 2rem;
                backdrop-filter: blur(10px);
              }

              .task-columns {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                gap: 2rem;
              }

              .task-column {
                background: rgba(30, 144, 255, 0.03);
                border: 1px solid rgba(30, 144, 255, 0.15);
                border-radius: 12px;
                padding: 1.5rem;
                min-height: 400px;
              }

              .task-column.planning {
                border-color: rgba(255, 215, 0, 0.3);
                background: rgba(255, 215, 0, 0.03);
              }

              .task-column.progress {
                border-color: rgba(30, 144, 255, 0.3);
                background: rgba(30, 144, 255, 0.03);
              }

              .task-column.completed {
                border-color: rgba(0, 255, 127, 0.3);
                background: rgba(0, 255, 127, 0.03);
              }

              .column-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
              }

              .column-header h4 {
                color: #fff;
                font-size: 1.3rem;
                margin: 0;
              }

              .task-count {
                background: rgba(30, 144, 255, 0.2);
                color: #1e90ff;
                padding: 0.3rem 0.8rem;
                border-radius: 15px;
                font-size: 0.9rem;
                font-weight: bold;
              }

              .task-list {
                display: flex;
                flex-direction: column;
                gap: 1rem;
              }

              /* 任务卡片样式 */
              .task-card {
                background: linear-gradient(
                  135deg,
                  rgba(255, 255, 255, 0.08) 0%,
                  rgba(255, 255, 255, 0.03) 100%
                );
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 1.2rem;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
              }

              .task-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 3px;
                background: linear-gradient(90deg, #1e90ff, #0070f3);
                opacity: 0;
                transition: opacity 0.3s ease;
              }

              .task-card:hover::before {
                opacity: 1;
              }

              .task-card:hover {
                background: linear-gradient(
                  135deg,
                  rgba(255, 255, 255, 0.12) 0%,
                  rgba(255, 255, 255, 0.06) 100%
                );
                transform: translateY(-3px);
                box-shadow: 0 8px 25px rgba(30, 144, 255, 0.15);
              }

              .task-card.completed {
                opacity: 0.7;
              }

              .task-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.8rem;
              }

              .task-sect {
                background: rgba(30, 144, 255, 0.2);
                color: #1e90ff;
                padding: 0.2rem 0.6rem;
                border-radius: 10px;
                font-size: 0.8rem;
                font-weight: bold;
              }

              .task-priority {
                padding: 0.2rem 0.6rem;
                border-radius: 10px;
                font-size: 0.8rem;
                font-weight: bold;
              }

              .priority-低 {
                background: rgba(128, 128, 128, 0.2);
                color: #888;
              }

              .priority-中 {
                background: rgba(255, 215, 0, 0.2);
                color: #ffd700;
              }

              .priority-高 {
                background: rgba(255, 140, 0, 0.2);
                color: #ff8c00;
              }

              .priority-紧急 {
                background: rgba(255, 69, 69, 0.2);
                color: #ff4545;
                animation: priority-pulse 2s ease-in-out infinite;
              }

              @keyframes priority-pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
              }

              .completion-badge {
                background: rgba(0, 255, 127, 0.2);
                color: #00ff7f;
                padding: 0.2rem 0.6rem;
                border-radius: 10px;
                font-size: 0.8rem;
                font-weight: bold;
              }

              .task-title {
                color: #fff;
                font-size: 1.1rem;
                margin: 0 0 0.5rem 0;
                font-weight: 600;
              }

              .task-description {
                color: #ccc;
                font-size: 0.9rem;
                margin: 0 0 1rem 0;
                line-height: 1.5;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
              }

              .task-progress-container {
                display: flex;
                align-items: center;
                gap: 0.8rem;
                margin-bottom: 0.8rem;
              }

              .progress-bar {
                flex: 1;
                height: 6px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 3px;
                overflow: hidden;
              }

              .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #1e90ff 0%, #0070f3 100%);
                border-radius: 3px;
                transition: width 0.3s ease;
              }

              .progress-text {
                color: #1e90ff;
                font-size: 0.8rem;
                font-weight: bold;
                min-width: 35px;
              }

              .task-assignee {
                color: #aaa;
                font-size: 0.85rem;
                margin-bottom: 0.3rem;
              }

              .task-deadline {
                color: #aaa;
                font-size: 0.85rem;
                margin-bottom: 0.8rem;
              }

              .task-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 0.4rem;
              }

              .task-tag {
                background: rgba(30, 144, 255, 0.1);
                border: 1px solid rgba(30, 144, 255, 0.2);
                color: #1e90ff;
                padding: 0.2rem 0.6rem;
                border-radius: 12px;
                font-size: 0.75rem;
                transition: all 0.2s ease;
              }

              .task-tag:hover {
                background: rgba(30, 144, 255, 0.15);
                transform: translateY(-1px);
              }

              /* 模态框样式 - 千里门蓝色主题 */
              .task-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                backdrop-filter: blur(5px);
              }

              .task-modal {
                background: linear-gradient(135deg, #1a2a3a 0%, #0a1a2a 100%);
                border: 1px solid rgba(30, 144, 255, 0.3);
                border-radius: 16px;
                width: 90%;
                max-width: 600px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 
                  0 20px 60px rgba(30, 144, 255, 0.3),
                  0 0 100px rgba(30, 144, 255, 0.1) inset;
              }

              .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem 2rem;
                border-bottom: 1px solid rgba(30, 144, 255, 0.2);
              }

              .modal-header h3 {
                color: #1e90ff;
                margin: 0;
                font-size: 1.5rem;
              }

              .close-button {
                background: none;
                border: none;
                color: #fff;
                font-size: 2rem;
                cursor: pointer;
                padding: 0;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
              }

              .close-button:hover {
                background: rgba(255, 255, 255, 0.1);
                color: #1e90ff;
              }

              .modal-content {
                padding: 2rem;
              }

              .form-group {
                margin-bottom: 1.5rem;
              }

              .form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
              }

              .form-group label {
                display: block;
                color: #1e90ff;
                margin-bottom: 0.5rem;
                font-weight: 600;
              }

              .form-input, .form-textarea, .form-select {
                width: 100%;
                background: rgba(30, 144, 255, 0.05);
                border: 1px solid rgba(30, 144, 255, 0.3);
                color: #fff;
                padding: 0.8rem;
                border-radius: 8px;
                font-size: 1rem;
                transition: all 0.3s ease;
              }

              .form-input:focus, .form-textarea:focus, .form-select:focus {
                outline: none;
                border-color: #1e90ff;
                background: rgba(30, 144, 255, 0.08);
                box-shadow: 0 0 15px rgba(30, 144, 255, 0.2);
              }

              .form-textarea {
                resize: vertical;
                min-height: 100px;
              }

              .modal-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem 2rem;
                border-top: 1px solid rgba(30, 144, 255, 0.2);
              }

              .footer-left {
                display: flex;
                align-items: center;
              }

              .footer-right {
                display: flex;
                gap: 1rem;
                align-items: center;
              }

              .cancel-button {
                background: transparent;
                border: 1px solid rgba(255, 255, 255, 0.3);
                color: #fff;
                padding: 0.8rem 1.5rem;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
              }

              .cancel-button:hover {
                background: rgba(255, 255, 255, 0.1);
                border-color: rgba(255, 255, 255, 0.5);
              }

              .modal-footer .save-button {
                background: linear-gradient(135deg, #1e90ff 0%, #0070f3 100%);
                color: #fff;
                border: none;
                padding: 0.8rem 1.5rem;
                border-radius: 8px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(30, 144, 255, 0.3);
              }

              .modal-footer .save-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(30, 144, 255, 0.4);
              }

              .delete-button {
                background: linear-gradient(135deg, #ff4757 0%, #ff3742 100%);
                color: #fff;
                border: none;
                padding: 0.8rem 1.5rem;
                border-radius: 8px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(255, 71, 87, 0.3);
                display: flex;
                align-items: center;
                gap: 0.5rem;
              }

              .delete-button:hover {
                background: linear-gradient(135deg, #ff3742 0%, #ff2f3a 100%);
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(255, 71, 87, 0.4);
              }

              /* 建议讨论模块样式 - 千里门蓝色主题 */
              .suggestions-section {
                padding: 20px;
                max-width: 1200px;
                margin: 0 auto;
              }

              .suggestions-header {
                text-align: center;
                margin-bottom: 30px;
              }

              .suggestions-header h3 {
                font-size: 2.5rem;
                background: linear-gradient(45deg, #1e90ff, #00bfff);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                margin-bottom: 10px;
                text-shadow: 0 0 20px rgba(30, 144, 255, 0.3);
              }

              .suggestions-subtitle {
                color: #87ceeb;
                font-size: 1.1rem;
                opacity: 0.9;
                margin-bottom: 25px;
              }

              .suggestions-controls {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 15px;
                margin-bottom: 20px;
              }

              .suggestions-actions {
                display: flex;
                gap: 10px;
              }

              .create-suggestion-btn {
                background: linear-gradient(45deg, #1e90ff, #00bfff);
                color: #fff;
                border: none;
                padding: 12px 24px;
                border-radius: 25px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(30, 144, 255, 0.3);
              }

              .create-suggestion-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(30, 144, 255, 0.4);
              }

              .init-data-btn {
                background: linear-gradient(45deg, #9400d3, #4b0082);
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
              }

              .clear-data-btn {
                background: linear-gradient(45deg, #ff4444, #cc0000);
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
              }

              .suggestions-filters {
                display: flex;
                gap: 10px;
              }

              .filter-select, .sort-select {
                background: rgba(30, 144, 255, 0.1);
                border: 1px solid #1e90ff;
                color: #fff;
                padding: 8px 12px;
                border-radius: 15px;
                cursor: pointer;
              }

              .suggestions-list {
                max-height: 70vh;
                overflow-y: auto;
                padding-right: 10px;
              }

              .suggestions-list::-webkit-scrollbar {
                width: 8px;
              }

              .suggestions-list::-webkit-scrollbar-track {
                background: rgba(30, 144, 255, 0.1);
                border-radius: 4px;
              }

              .suggestions-list::-webkit-scrollbar-thumb {
                background: linear-gradient(45deg, #1e90ff, #00bfff);
                border-radius: 4px;
              }

              .empty-suggestions {
                text-align: center;
                padding: 60px 20px;
                background: rgba(30, 144, 255, 0.05);
                border-radius: 20px;
                border: 2px dashed rgba(30, 144, 255, 0.3);
              }

              .empty-icon {
                font-size: 4rem;
                margin-bottom: 20px;
              }

              .suggestion-card {
                background: linear-gradient(135deg, rgba(30, 144, 255, 0.05), rgba(0, 191, 255, 0.03));
                border: 1px solid rgba(30, 144, 255, 0.2);
                border-radius: 15px;
                padding: 20px;
                margin-bottom: 20px;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
              }

              .suggestion-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(30, 144, 255, 0.2);
                border-color: rgba(30, 144, 255, 0.4);
              }

              .suggestion-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 15px;
                flex-wrap: wrap;
                gap: 10px;
              }

              .suggestion-meta {
                display: flex;
                align-items: center;
                gap: 12px;
                flex-wrap: wrap;
              }

              .sect-badge {
                padding: 4px 12px;
                border-radius: 12px;
                font-size: 0.8rem;
                font-weight: bold;
              }

              .sect-tianyan {
                background: rgba(0, 255, 127, 0.2);
                color: #00ff7f;
              }

              .sect-qianli {
                background: rgba(30, 144, 255, 0.2);
                color: #1e90ff;
              }

              .sect-other {
                background: rgba(255, 255, 255, 0.1);
                color: #ccc;
              }

              .suggestion-author {
                color: #87ceeb;
                font-weight: 500;
              }

              .author-id {
                color: #888;
                font-size: 0.85em;
                font-weight: 400;
              }

              .suggestion-time {
                color: #666;
                font-size: 0.9rem;
              }

              .suggestion-actions {
                display: flex;
                gap: 8px;
              }

              .like-btn, .edit-btn, .delete-btn {
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: #fff;
                padding: 6px 12px;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.9rem;
              }

              .like-btn:hover {
                background: rgba(30, 144, 255, 0.2);
                border-color: #1e90ff;
              }

              .edit-btn:hover {
                background: rgba(255, 193, 7, 0.2);
                border-color: #ffc107;
              }

              .delete-btn:hover {
                background: rgba(220, 53, 69, 0.2);
                border-color: #dc3545;
              }

              .suggestion-content {
                margin-bottom: 20px;
              }

              .suggestion-title {
                color: #1e90ff;
                font-size: 1.3rem;
                margin-bottom: 10px;
                font-weight: 600;
              }

              .suggestion-text {
                line-height: 1.6;
                color: #e0e0e0;
                margin-bottom: 15px;
              }

              .suggestion-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
              }

              .tag {
                background: rgba(30, 144, 255, 0.1);
                color: #1e90ff;
                padding: 4px 8px;
                border-radius: 8px;
                font-size: 0.8rem;
                border: 1px solid rgba(30, 144, 255, 0.3);
              }

              .comments-section {
                border-top: 1px solid rgba(30, 144, 255, 0.2);
                padding-top: 15px;
              }

              .comments-title {
                color: #87ceeb;
                margin-bottom: 15px;
                font-size: 1rem;
              }

              .comments-list {
                margin-bottom: 15px;
              }

              .comment {
                background: rgba(30, 144, 255, 0.03);
                border-left: 3px solid rgba(30, 144, 255, 0.3);
                padding: 12px;
                margin-bottom: 10px;
                border-radius: 8px;
              }

              .comment-meta {
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;
                font-size: 0.9rem;
              }

              .comment-author {
                color: #87ceeb;
                font-weight: 500;
              }

              .comment-time {
                color: #666;
              }

              .comment-content {
                line-height: 1.5;
                color: #e0e0e0;
              }

              .add-comment {
                display: flex;
                flex-direction: column;
                gap: 10px;
              }

              .comment-input {
                background: rgba(30, 144, 255, 0.05);
                border: 1px solid rgba(30, 144, 255, 0.2);
                color: #fff;
                padding: 12px;
                border-radius: 8px;
                resize: vertical;
                font-family: inherit;
              }

              .comment-input:focus {
                outline: none;
                border-color: #1e90ff;
                box-shadow: 0 0 10px rgba(30, 144, 255, 0.3);
              }

              .submit-comment-btn {
                background: linear-gradient(45deg, #1e90ff, #00bfff);
                color: #fff;
                border: none;
                padding: 10px 20px;
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
                align-self: flex-start;
                font-weight: 500;
              }

              .submit-comment-btn:hover:not(:disabled) {
                transform: translateY(-1px);
                box-shadow: 0 4px 15px rgba(30, 144, 255, 0.3);
              }

              .submit-comment-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
              }

              /* 建议模态框样式 - 千里门主题 */
              .suggestion-form .form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
              }

              .suggestion-form .form-group {
                margin-bottom: 20px;
              }

              .suggestion-form label {
                display: block;
                color: #87ceeb;
                margin-bottom: 8px;
                font-weight: 500;
              }

              .suggestion-form input,
              .suggestion-form textarea,
              .suggestion-form select {
                width: 100%;
                background: rgba(30, 144, 255, 0.05);
                border: 1px solid rgba(30, 144, 255, 0.2);
                color: #fff;
                padding: 12px;
                border-radius: 8px;
                font-family: inherit;
                font-size: 1rem;
              }

              .suggestion-form input:focus,
              .suggestion-form textarea:focus,
              .suggestion-form select:focus {
                outline: none;
                border-color: #1e90ff;
                box-shadow: 0 0 10px rgba(30, 144, 255, 0.3);
              }

              .suggestion-form textarea {
                resize: vertical;
                min-height: 120px;
              }

              .modal-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 30px;
              }

              .footer-left, .footer-right {
                display: flex;
                gap: 10px;
              }

              .delete-suggestion-btn {
                background: linear-gradient(45deg, #ff4444, #cc0000);
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
              }

              .delete-suggestion-btn:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 15px rgba(255, 68, 68, 0.3);
              }

              .cancel-btn {
                background: rgba(255, 255, 255, 0.1);
                color: #fff;
                border: 1px solid rgba(255, 255, 255, 0.3);
                padding: 10px 20px;
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
              }

              .submit-btn {
                background: linear-gradient(45deg, #1e90ff, #00bfff);
                color: #fff;
                border: none;
                padding: 10px 20px;
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-weight: 500;
              }

              /* 响应式设计 */
              @media (max-width: 768px) {
                .task-columns {
                  grid-template-columns: 1fr;
                }
                
                .taskboard-controls {
                  flex-direction: column;
                  align-items: stretch;
                }
                
                .task-filters {
                  justify-content: space-between;
                }
                
                .form-row {
                  grid-template-columns: 1fr;
                }
                
                .task-modal {
                  width: 95%;
                  margin: 1rem;
                }
                
                .modal-content {
                  padding: 1.5rem;
                }

                /* 建议模块响应式 */
                .suggestions-controls {
                  flex-direction: column;
                  align-items: stretch;
                }

                .suggestions-actions,
                .suggestions-filters {
                  justify-content: center;
                }

                .suggestion-header {
                  flex-direction: column;
                  align-items: flex-start;
                }

                .suggestion-form .form-row {
                  grid-template-columns: 1fr;
                }

                .modal-footer {
                  flex-direction: column;
                  gap: 15px;
                }

                .footer-left, .footer-right {
                  justify-content: center;
                }
              }
            `}</style>
          </div>
          );
        }}
      />
    </Layout>
  );
} 