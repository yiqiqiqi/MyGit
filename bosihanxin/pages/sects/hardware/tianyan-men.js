import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import SectAuth from '../../../components/SectAuthNew';

// 本地存储键名
const TASKS_STORAGE_KEY = 'eenous_sect_tasks';
const SUGGESTIONS_STORAGE_KEY = 'eenous_sect_suggestions';

// 初始化任务数据
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

export default function TianyanMenPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home'); // home, profile, settings
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [contentTab, setContentTab] = useState('taskboard'); // courses, trials, scriptures, achievements, taskboard, suggestions
  
  // 任务看板状态 - 从localStorage加载
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
    sect: 'tianyan',
    priority: '中',
    status: '规划中',
    deadline: '',
    tags: ''
  });
  
  const [taskFilter, setTaskFilter] = useState('all'); // all, tianyan, qianli, suantian, etc.
  const [taskSort, setTaskSort] = useState('deadline'); // deadline, priority, progress, created

  return (
    <Layout title="EEnous - 天眼门·感知天下宗">
      <SectAuth 
        sectId="tianyan"
        renderContent={(user, logout, updateFunctions) => {
          // 初始化编辑表单
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
            const userNickname = user.sectNickname || '天眼门弟子';
            const userQQ = user.qq || 'Unknown';
            const userGlobalName = user.globalNickname || user.sectNickname || '天眼门弟子';

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
                author: `天眼门·${userNickname}`,
                authorId: userQQ,
                authorGlobalName: userGlobalName,
                sect: '天眼门',
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
            const userNickname = user.sectNickname || '天眼门弟子';
            const userQQ = user.qq || 'Unknown';
            const userGlobalName = user.globalNickname || user.sectNickname || '天眼门弟子';

            const newComment = {
              id: Date.now(),
              author: `天眼门·${userNickname}`,
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
          <div className="sect-page tianyan-sect">
            {/* 门派专属背景 */}
            <div className="sect-atmosphere">
              {/* 感知粒子 */}
              {[...Array(15)].map((_, i) => (
                <div 
                  key={i} 
                  className="sensing-particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 8}s`,
                    animationDuration: `${6 + Math.random() * 3}s`
                  }}
                />
              ))}
              
              {/* 雷达扫描效果 */}
              <div className="radar-scanner">
                <div className="radar-sweep"></div>
                <div className="radar-center"></div>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="radar-ring" style={{animationDelay: `${i * 0.5}s`}}></div>
                ))}
              </div>
              
              {/* 数据流效果 */}
              <div className="data-streams">
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i} 
                    className="data-stream"
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
              
              {/* 感知波纹 */}
              <div className="sensing-waves">
                <div className="wave wave-1"></div>
                <div className="wave wave-2"></div>
                <div className="wave wave-3"></div>
              </div>
              
              {/* 科技网格 */}
              <div className="tech-grid"></div>
            </div>

            <div className="sect-container">
              {/* 门派导航 */}
              <div className="sect-nav">
                <button onClick={() => router.push('/hardware-dao')} className="back-button">
                  ← 返回硬件武林
                </button>
              </div>

              {/* 门派标题 */}
              <div className="sect-header">
                <div className="sect-emblem">灵</div>
                <h1 className="sect-title">天眼门</h1>
                <p className="sect-subtitle">感知天下宗</p>
                <div className="sect-slogan">慧眼神珠·万物感知术</div>
              </div>

              {/* 用户信息栏 */}
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

              {/* 门派内容区域 */}
              <div className="sect-content">
                {/* 主页内容 */}
                {activeTab === 'home' && (
                  <>
                    <div className="welcome-section">
                      <h2>欢迎回来，{user.sectNickname}师兄</h2>
                      <p>你已成功拜入天眼门·感知天下宗</p>
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
                          <span>下一境界：感知入微</span>
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
                          <h3>修炼法门·感知之道</h3>
                          
                          {/* 基础感知篇 */}
                          <div className="course-category">
                            <h4>【基础感知篇】入门必修</h4>
                            <div className="course-list">
                              <div className="course-item">
                                <div className="course-icon">🌡️</div>
                                <div className="course-info">
                                  <h5>温度感知术</h5>
                                  <p className="course-desc">
                                    深入掌握温度传感技术的核心原理与应用实践。学习热电偶的塞贝克效应、
                                    RTD的电阻温度特性曲线、NTC/PTC热敏电阻的非线性补偿算法。
                                    涵盖PT100/PT1000铂电阻的四线制测量、K/J/T型热电偶的冷端补偿技术、
                                    红外测温的斯特藩-玻尔兹曼定律应用。
                                  </p>
                                  <div className="tech-tags">
                                    <span>Seebeck效应</span>
                                    <span>惠斯通电桥</span>
                                    <span>冷端补偿</span>
                                    <span>线性化算法</span>
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
                                <div className="course-icon">💨</div>
                                <div className="course-info">
                                  <h5>气压感知诀</h5>
                                  <p className="course-desc">
                                    精通各类压力传感技术的设计与应用。深入研究压阻式传感器的惠斯通电桥设计、
                                    电容式传感器的差分电容检测电路、MEMS压力传感器的微加工工艺。
                                    掌握绝压/表压/差压测量原理、动态压力响应特性、温度补偿与非线性校正技术。
                                    包含工业4.0智能压力变送器的HART/FF/Profibus协议实现。
                                  </p>
                                  <div className="tech-tags">
                                    <span>压阻效应</span>
                                    <span>MEMS工艺</span>
                                    <span>差分测量</span>
                                    <span>数字补偿</span>
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
                              
                              <div className="course-item">
                                <div className="course-icon">💡</div>
                                <div className="course-info">
                                  <h5>光明感应功</h5>
                                  <p className="course-desc">
                                    全面掌握光电传感技术体系。从光敏电阻的光电导效应、PIN光电二极管的
                                    光生伏特效应，到APD雪崩光电二极管的内部增益机制。深入学习CCD的
                                    电荷耦合原理、CMOS图像传感器的有源像素技术、TOF深度相机的相位测量。
                                    包含多光谱/高光谱成像、单光子探测器SPAD、硅光子集成技术等前沿内容。
                                  </p>
                                  <div className="tech-tags">
                                    <span>光电效应</span>
                                    <span>CCD/CMOS</span>
                                    <span>TOF测距</span>
                                    <span>光谱分析</span>
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
                            </div>
                          </div>

                          {/* 进阶融合篇 */}
                          <div className="course-category">
                            <h4>【进阶融合篇】内门精修</h4>
                            <div className="course-list">
                              <div className="course-item advanced">
                                <div className="course-icon">🔮</div>
                                <div className="course-info">
                                  <h5>九宫传感阵</h5>
                                  <p className="course-desc">
                                    掌握惯性测量单元IMU的核心技术与多传感器融合算法。深入学习三轴加速度计的
                                    MEMS梳齿结构设计、三轴陀螺仪的科里奥利力检测原理、三轴磁力计的
                                    各向异性磁阻效应。精通扩展卡尔曼滤波EKF、无迹卡尔曼滤波UKF、
                                    互补滤波器设计。实现姿态解算的四元数算法、Madgwick/Mahony滤波器，
                                    以及SLAM中的IMU预积分技术。
                                  </p>
                                  <div className="tech-tags">
                                    <span>九轴融合</span>
                                    <span>卡尔曼滤波</span>
                                    <span>四元数</span>
                                    <span>姿态解算</span>
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
                                <div className="course-icon">🌊</div>
                                <div className="course-info">
                                  <h5>超声波探测术</h5>
                                  <p className="course-desc">
                                    精通超声波传感技术的全领域应用。从压电换能器的逆压电效应、
                                    超声波在不同介质中的传播特性，到相控阵超声的波束成形技术。
                                    掌握脉冲回波法测距、多普勒效应流速测量、超声成像的合成孔径技术。
                                    包含医疗超声的谐波成像、工业NDT的TOFD衍射时差法、
                                    以及空气耦合超声的高灵敏度检测技术。
                                  </p>
                                  <div className="tech-tags">
                                    <span>压电换能</span>
                                    <span>相控阵</span>
                                    <span>多普勒</span>
                                    <span>TOFD</span>
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
                                <div className="course-icon">⚡</div>
                                <div className="course-info">
                                  <h5>生物电感应诀</h5>
                                  <p className="course-desc">
                                    深入生物电信号的采集与处理技术。掌握差分放大器的CMRR优化、
                                    仪表放大器的高输入阻抗设计、生物电极的极化电位补偿。
                                    精通EMG肌电信号的运动单元动作电位MUAP分析、ECG心电的
                                    QRS波群检测算法、EEG脑电的事件相关电位ERP提取。
                                    包含植入式神经接口、柔性生物电子、以及脑机接口BCI的实时解码技术。
                                  </p>
                                  <div className="tech-tags">
                                    <span>生物放大器</span>
                                    <span>信号处理</span>
                                    <span>模式识别</span>
                                    <span>BCI接口</span>
                                  </div>
                                  <div className="course-meta">
                                    <span className="difficulty">难度：⭐⭐⭐⭐</span>
                                    <span className="duration">修炼时长：60日</span>
                                    <span className="exp-gain">经验值：+600</span>
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
                                <div className="course-icon">🧬</div>
                                <div className="course-info">
                                  <h5>纳米感知神功</h5>
                                  <p className="course-desc">
                                    探索纳米尺度传感的极限技术。掌握碳纳米管CNT的场效应晶体管传感器、
                                    石墨烯的量子霍尔效应应用、金纳米粒子的局域表面等离子体共振LSPR。
                                    深入学习单分子检测的纳米孔测序技术、原子力显微镜AFM的力谱分析、
                                    扫描隧道显微镜STM的量子隧穿效应。包含DNA纳米机器人、
                                    量子点生物标记、以及二维材料异质结的新型传感机制。
                                  </p>
                                  <div className="tech-tags">
                                    <span>纳米材料</span>
                                    <span>单分子检测</span>
                                    <span>量子传感</span>
                                    <span>STM/AFM</span>
                                  </div>
                                  <div className="course-meta">
                                    <span className="difficulty">难度：⭐⭐⭐⭐⭐</span>
                                    <span className="duration">修炼时长：180日</span>
                                    <span className="exp-gain">经验值：+2000</span>
                                  </div>
                                  <button className="start-button locked master-locked">
                                    <span className="button-text">需掌门亲传</span>
                                    <span className="lock-icon">👁️</span>
                                  </button>
                                </div>
                              </div>
                              
                              <div className="course-item master">
                                <div className="course-icon">🌐</div>
                                <div className="course-info">
                                  <h5>万物互联心法</h5>
                                  <p className="course-desc">
                                    构建终极物联网传感系统。精通无线传感网络WSN的分布式时钟同步、
                                    多跳路由协议、能量收集与管理。掌握边缘计算的联邦学习框架、
                                    5G网络切片的超低延迟通信、区块链的分布式信任机制。
                                    实现数字孪生的实时映射、工业互联网的OPC UA协议栈、
                                    以及智慧城市的大规模异构传感器融合平台。
                                  </p>
                                  <div className="tech-tags">
                                    <span>WSN网络</span>
                                    <span>边缘计算</span>
                                    <span>数字孪生</span>
                                    <span>5G-IoT</span>
                                  </div>
                                  <div className="course-meta">
                                    <span className="difficulty">难度：⭐⭐⭐⭐⭐</span>
                                    <span className="duration">修炼时长：365日</span>
                                    <span className="exp-gain">经验值：+5000</span>
                                  </div>
                                  <button className="start-button locked master-locked">
                                    <span className="button-text">需掌门亲传</span>
                                    <span className="lock-icon">👁️</span>
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
                          <h3>试炼挑战·实战考验</h3>
                          
                          {/* 入门试炼 */}
                          <div className="trial-category">
                            <h4>【入门试炼】初窥门径</h4>
                            <div className="trial-list">
                              <div className="trial-item">
                                <div className="trial-icon">🎯</div>
                                <div className="trial-info">
                                  <h5>感知初试</h5>
                                  <p>使用基础传感器搭建环境监测系统，实时感知温湿度、光照变化</p>
                                  <div className="trial-rewards">
                                    <span className="reward">奖励：感知石 ×10</span>
                                    <span className="exp">经验：+100</span>
                                  </div>
                                  <button className="trial-button">接受试炼</button>
                                </div>
                              </div>
                              
                              <div className="trial-item">
                                <div className="trial-icon">🏃</div>
                                <div className="trial-info">
                                  <h5>动态追踪</h5>
                                  <p>运用加速度计和陀螺仪，实现运动轨迹追踪与姿态解算</p>
                                  <div className="trial-rewards">
                                    <span className="reward">奖励：追踪符 ×5</span>
                                    <span className="exp">经验：+200</span>
                                  </div>
                                  <button className="trial-button">接受试炼</button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 进阶试炼 */}
                          <div className="trial-category">
                            <h4>【进阶试炼】融会贯通</h4>
                            <div className="trial-list">
                              <div className="trial-item advanced">
                                <div className="trial-icon">🔥</div>
                                <div className="trial-info">
                                  <h5>多重感知阵</h5>
                                  <p>布置多传感器阵列，实现数据融合与智能决策，洞察复杂环境</p>
                                  <div className="trial-rewards">
                                    <span className="reward">奖励：融合宝珠 ×1</span>
                                    <span className="exp">经验：+500</span>
                                  </div>
                                  <button className="trial-button locked">需境界：感知入微</button>
                                </div>
                              </div>
                              
                              <div className="trial-item advanced">
                                <div className="trial-icon">🌪️</div>
                                <div className="trial-info">
                                  <h5>边缘智能</h5>
                                  <p>在资源受限的边缘设备上部署AI模型，实现实时智能感知</p>
                                  <div className="trial-rewards">
                                    <span className="reward">奖励：智能核心 ×1</span>
                                    <span className="exp">经验：+800</span>
                                  </div>
                                  <button className="trial-button locked">需境界：洞察秋毫</button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 宗师试炼 */}
                          <div className="trial-category">
                            <h4>【宗师试炼】登峰造极</h4>
                            <div className="trial-list">
                              <div className="trial-item master">
                                <div className="trial-icon">⚡</div>
                                <div className="trial-info">
                                  <h5>感知天机</h5>
                                  <p>设计全新传感器架构，突破现有技术极限，开创感知新纪元</p>
                                  <div className="trial-rewards">
                                    <span className="reward">奖励：天眼真传</span>
                                    <span className="exp">经验：+10000</span>
                                  </div>
                                  <button className="trial-button locked">需境界：感知宗师</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 核心秘籍内容 */}
                      {contentTab === 'scriptures' && (
                        <div className="scriptures-section">
                          <h3>核心秘籍·不传之秘</h3>
                          
                          <div className="scripture-grid">
                            {/* 感知心经 */}
                            <div className="scripture-item">
                              <div className="scripture-cover">
                                <div className="scripture-seal">密</div>
                                <h4>《感知心经》</h4>
                                <p className="scripture-desc">天眼门镇派之宝，记载传感器原理精髓</p>
                              </div>
                              <div className="scripture-preview">
                                <blockquote>
                                  "夫感知之道，在乎精微。电生于动，磁起于变。
                                  压电效应者，力电相生也；光电转换者，光能化电也。
                                  温差电动势生，是为热电偶之理；
                                  电阻随温而变，乃热敏电阻之道..."
                                </blockquote>
                                <button className="read-button">研读秘籍</button>
                              </div>
                            </div>

                            {/* 融合真解 */}
                            <div className="scripture-item">
                              <div className="scripture-cover">
                                <div className="scripture-seal">秘</div>
                                <h4>《融合真解》</h4>
                                <p className="scripture-desc">多传感器数据融合的至高心法</p>
                              </div>
                              <div className="scripture-preview">
                                <blockquote>
                                  "单一感知，如管中窥豹；多元融合，方见全貌。
                                  卡尔曼滤波者，预测校正，递推更新；
                                  粒子滤波者，随机采样，权重更新；
                                  神经网络者，深度学习，特征提取..."
                                </blockquote>
                                <button className="read-button">研读秘籍</button>
                              </div>
                            </div>

                            {/* 天眼神功 */}
                            <div className="scripture-item legendary">
                              <div className="scripture-cover">
                                <div className="scripture-seal">绝</div>
                                <h4>《天眼神功》</h4>
                                <p className="scripture-desc">掌门亲传，非天资聪颖者不可修</p>
                              </div>
                              <div className="scripture-preview">
                                <blockquote>
                                  "欲开天眼，先通感知。纳米之微，量子之妙。
                                  石墨烯传感，二维材料之极致；
                                  量子点感应，纳米尺度之精华；
                                  待至大成，一念感知万物，是为天眼通..."
                                </blockquote>
                                <button className="read-button locked">需掌门许可</button>
                              </div>
                            </div>

                            {/* MEMS心法 */}
                            <div className="scripture-item">
                              <div className="scripture-cover">
                                <div className="scripture-seal">传</div>
                                <h4>《MEMS心法》</h4>
                                <p className="scripture-desc">微机电系统的设计精要</p>
                              </div>
                              <div className="scripture-preview">
                                <blockquote>
                                  "微纳之间，别有洞天。
                                  硅基微加工，体硅表面皆可用；
                                  静电驱动者，电容变化而生力；
                                  谐振传感者，频率偏移示参量..."
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
                          <h3>成就荣耀·名扬天下</h3>
                          
                          <div className="achievement-categories">
                            {/* 修炼成就 */}
                            <div className="achievement-category">
                              <h4>修炼成就</h4>
                              <div className="achievement-grid">
                                <div className="achievement-item unlocked">
                                  <div className="achievement-icon">🌟</div>
                                  <div className="achievement-name">初入天眼</div>
                                  <div className="achievement-desc">成功加入天眼门</div>
                                  <div className="achievement-date">2024.01.15</div>
                                </div>
                                
                                <div className="achievement-item">
                                  <div className="achievement-icon">📖</div>
                                  <div className="achievement-name">勤学苦练</div>
                                  <div className="achievement-desc">完成10门课程</div>
                                  <div className="progress-bar">
                                    <div className="progress" style={{width: '30%'}}></div>
                                  </div>
                                </div>
                                
                                <div className="achievement-item">
                                  <div className="achievement-icon">⚡</div>
                                  <div className="achievement-name">感知大师</div>
                                  <div className="achievement-desc">掌握所有基础传感技术</div>
                                  <div className="progress-bar">
                                    <div className="progress" style={{width: '15%'}}></div>
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
                                  <div className="achievement-name">无懈可击</div>
                                  <div className="achievement-desc">完美完成高难度试炼</div>
                                  <div className="locked-overlay">未解锁</div>
                                </div>
                                
                                <div className="achievement-item legendary">
                                  <div className="achievement-icon">👑</div>
                                  <div className="achievement-name">天眼之光</div>
                                  <div className="achievement-desc">成为年度最佳弟子</div>
                                  <div className="locked-overlay">传说成就</div>
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
                                    sect: '天眼门',
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
                    </div>
                  </>
                )}

                {/* 个人中心内容 */}
                {activeTab === 'profile' && (
                  <div className="profile-section">
                    <h2>个人信息</h2>
                    
                    <div className="profile-grid">
                      {/* 基本信息卡片 */}
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

                                  // 更新全局昵称
                                  if (editForm.globalNickname !== user.globalNickname) {
                                    if (!editForm.globalNickname.trim()) {
                                      errors.push('全局昵称不能为空');
                                    } else {
                                      const success = await updateFunctions.updateGlobalNickname(editForm.globalNickname.trim());
                                      if (success) hasChanges = true;
                                      else errors.push('全局昵称更新失败');
                                    }
                                  }

                                  // 更新门派昵称
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

                      {/* 门派信息卡片 */}
                      <div className="profile-card">
                        <h3>门派信息</h3>
                        <div className="info-grid">
                          <div className="info-item">
                            <label>当前门派</label>
                            <span className="sect-badge">天眼门</span>
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

                      {/* 已加入门派列表 */}
                      <div className="profile-card full-width">
                        <h3>已加入门派</h3>
                        <div className="sects-list">
                          {user.registeredSects && user.registeredSects.map(sectId => (
                            <div key={sectId} className="sect-item">
                              <span className="sect-name">{sectId === 'tianyan' ? '天眼门' : sectId}</span>
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
                      {/* 修改密码 */}
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
                                // 验证输入
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

                                // 更新密码
                                const success = await updateFunctions.updatePassword(
                                  passwordForm.oldPassword,
                                  passwordForm.newPassword
                                );

                                if (success) {
                                  alert('密码修改成功！请重新登录');
                                  // 清空表单
                                  setPasswordForm({
                                    oldPassword: '',
                                    newPassword: '',
                                    confirmPassword: ''
                                  });
                                  // 可选：自动登出
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

                      {/* 账户安全 */}
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

                      {/* 危险操作 */}
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

            {/* 建议讨论模块 */}
            {contentTab === 'suggestions' && (
              <div className="suggestions-section">
                <div className="suggestions-header">
                  <h3>💡 建议讨论·群策群力</h3>
                  <p className="suggestions-subtitle">各门派弟子齐聚一堂，畅所欲言，共话武林技术未来</p>
                  
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
                          placeholder="技术交流, 跨门派合作, 创新..."
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
                background: linear-gradient(135deg, #000000 0%, #0a2a0a 50%, #1a3a1a 100%);
                color: #ffffff;
                position: relative;
                overflow-x: hidden;
              }

              .sect-atmosphere {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1;
              }

              .sensing-particle {
                position: absolute;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, rgba(0, 255, 127, 0.8) 0%, transparent 70%);
                border-radius: 50%;
                animation: float 8s ease-in-out infinite;
              }

              @keyframes float {
                0%, 100% { transform: translateY(0px) scale(1); opacity: 0.7; }
                50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
              }

              .sect-container {
                position: relative;
                z-index: 2;
                max-width: 1200px;
                margin: 0 auto;
                padding: 2rem;
                min-height: 100vh;
              }

              .sect-nav {
                margin-bottom: 2rem;
              }

              .back-button {
                background: rgba(0, 255, 127, 0.1);
                border: 1px solid rgba(0, 255, 127, 0.3);
                color: #00ff7f;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.3s ease;
              }

              .back-button:hover {
                background: rgba(0, 255, 127, 0.2);
              }

              .sect-header {
                text-align: center;
                margin-bottom: 3rem;
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
                background: rgba(0, 255, 127, 0.1);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(0, 255, 127, 0.2);
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
                color: #00ff7f;
              }

              .user-level, .user-points {
                background: rgba(0, 255, 127, 0.1);
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
                background: rgba(0, 255, 127, 0.1);
                color: #00ff7f;
              }

              .tab-item.active {
                background: rgba(0, 255, 127, 0.15);
                border-color: rgba(0, 255, 127, 0.3);
                color: #00ff7f;
              }

              .tab-icon {
                font-size: 1.2rem;
              }

              /* 个人中心样式 */
              .profile-section h2,
              .settings-section h2 {
                color: #00ff7f;
                margin-bottom: 2rem;
                font-size: 2rem;
              }

              .profile-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 2rem;
              }

              .profile-card {
                background: rgba(0, 255, 127, 0.05);
                border: 1px solid rgba(0, 255, 127, 0.1);
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
                color: #00ff7f;
                margin-bottom: 1.5rem;
              }

              .edit-button {
                background: rgba(0, 255, 127, 0.1);
                border: 1px solid rgba(0, 255, 127, 0.3);
                color: #00ff7f;
                padding: 0.4rem 0.8rem;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.9rem;
                transition: all 0.3s ease;
              }

              .edit-button:hover {
                background: rgba(0, 255, 127, 0.2);
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
                background: rgba(0, 255, 127, 0.1);
                border: 1px solid rgba(0, 255, 127, 0.3);
                color: #fff;
                padding: 0.4rem 0.8rem;
                border-radius: 6px;
                font-size: 1rem;
                max-width: 200px;
              }

              .edit-input:focus {
                outline: none;
                border-color: #00ff7f;
                box-shadow: 0 0 10px rgba(0, 255, 127, 0.3);
              }

              .edit-actions {
                margin-top: 1.5rem;
                text-align: right;
              }

              .save-button {
                background: rgba(0, 255, 127, 0.2);
                border: 1px solid rgba(0, 255, 127, 0.4);
                color: #00ff7f;
                padding: 0.6rem 1.5rem;
                border-radius: 6px;
                cursor: pointer;
                font-size: 1rem;
                transition: all 0.3s ease;
              }

              .save-button:hover {
                background: rgba(0, 255, 127, 0.3);
                transform: translateY(-1px);
              }

              .sect-badge {
                background: rgba(0, 255, 127, 0.2);
                color: #00ff7f;
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
                background: rgba(0, 255, 127, 0.1);
                border: 1px solid rgba(0, 255, 127, 0.3);
                color: #00ff7f;
                padding: 0.4rem 1rem;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.9rem;
                transition: all 0.3s ease;
              }

              .switch-button:hover {
                background: rgba(0, 255, 127, 0.2);
              }

              /* 设置页面样式 */
              .settings-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 2rem;
              }

              .settings-card {
                background: rgba(0, 255, 127, 0.05);
                border: 1px solid rgba(0, 255, 127, 0.1);
                border-radius: 12px;
                padding: 2rem;
              }

              .settings-card.danger {
                background: rgba(255, 0, 0, 0.05);
                border-color: rgba(255, 0, 0, 0.1);
              }

              .settings-card h3 {
                color: #00ff7f;
                margin-bottom: 1.5rem;
              }

              .settings-card.danger h3 {
                color: #ff6b6b;
              }

              .password-form {
                display: flex;
                flex-direction: column;
                gap: 1rem;
              }

              .form-item {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
              }

              .form-item label {
                color: #999;
                font-size: 0.9rem;
              }

              .form-item input {
                background: rgba(0, 0, 0, 0.3);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: #fff;
                padding: 0.8rem;
                border-radius: 6px;
                font-size: 1rem;
              }

              .form-item input:focus {
                outline: none;
                border-color: #00ff7f;
                box-shadow: 0 0 10px rgba(0, 255, 127, 0.3);
              }

              .update-button {
                background: rgba(0, 255, 127, 0.2);
                border: 1px solid rgba(0, 255, 127, 0.4);
                color: #00ff7f;
                padding: 0.8rem 1.5rem;
                border-radius: 6px;
                cursor: pointer;
                font-size: 1rem;
                transition: all 0.3s ease;
                margin-top: 1rem;
              }

              .update-button:hover {
                background: rgba(0, 255, 127, 0.3);
                transform: translateY(-1px);
              }

              .security-options {
                display: flex;
                flex-direction: column;
                gap: 1rem;
              }

              .security-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem;
                background: rgba(0, 0, 0, 0.2);
                border-radius: 8px;
              }

              /* 开关样式 */
              .switch {
                position: relative;
                display: inline-block;
                width: 50px;
                height: 24px;
              }

              .switch input {
                opacity: 0;
                width: 0;
                height: 0;
              }

              .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(255, 255, 255, 0.1);
                transition: .4s;
                border-radius: 24px;
              }

              .slider:before {
                position: absolute;
                content: "";
                height: 16px;
                width: 16px;
                left: 4px;
                bottom: 4px;
                background-color: white;
                transition: .4s;
                border-radius: 50%;
              }

              input:checked + .slider {
                background-color: #00ff7f;
              }

              input:checked + .slider:before {
                transform: translateX(26px);
              }

              .danger-zone {
                text-align: center;
              }

              .danger-button {
                background: rgba(255, 0, 0, 0.1);
                border: 1px solid rgba(255, 0, 0, 0.3);
                color: #ff6b6b;
                padding: 0.8rem 2rem;
                border-radius: 6px;
                cursor: pointer;
                font-size: 1rem;
                transition: all 0.3s ease;
              }

              .danger-button:hover {
                background: rgba(255, 0, 0, 0.2);
                transform: translateY(-1px);
              }

              .danger-warning {
                color: #ff6b6b;
                font-size: 0.9rem;
                margin-top: 1rem;
                opacity: 0.8;
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
                color: #00ff7f;
                font-size: 2.2rem;
                margin-bottom: 1rem;
              }

              .content-grid {
                display: grid;
                grid-template-columns: 2fr 1fr;
                gap: 2rem;
              }

              .practice-area h3, .community-area h3 {
                color: #00ff7f;
                margin-bottom: 1rem;
              }

              .community-placeholder {
                background: rgba(0, 255, 127, 0.05);
                border: 1px solid rgba(0, 255, 127, 0.1);
                padding: 2rem;
                border-radius: 12px;
                text-align: center;
                color: #999;
              }

              .community-placeholder ul {
                list-style: none;
                padding: 0;
                margin-top: 1rem;
              }

              .community-placeholder li {
                margin: 0.5rem 0;
              }

              .sect-achievements {
                margin-top: 3rem;
              }

              .sect-achievements h3 {
                color: #00ff7f;
                margin-bottom: 1.5rem;
              }

              @media (max-width: 768px) {
                .content-tabs {
                  flex-wrap: wrap;
                }

                .content-tab {
                  padding: 0.6rem 1rem;
                  font-size: 0.9rem;
                }

                .scripture-grid,
                .achievement-grid {
                  grid-template-columns: 1fr;
                }

                .course-item,
                .trial-item {
                  flex-direction: column;
                  text-align: center;
                }

                .trial-rewards {
                  flex-direction: column;
                  gap: 0.5rem;
                }
              }

              .cultivation-content h3 {
                color: #00ff7f;
                margin-bottom: 1.5rem;
                font-size: 1.8rem;
              }

              /* 境界进度样式 */
              .cultivation-progress {
                background: rgba(0, 255, 127, 0.05);
                border: 1px solid rgba(0, 255, 127, 0.2);
                border-radius: 12px;
                padding: 1.5rem;
                margin-bottom: 2rem;
              }

              .cultivation-progress h3 {
                color: #00ff7f;
                margin-bottom: 1rem;
                font-size: 1.3rem;
              }

              .realm-info {
                display: flex;
                flex-direction: column;
                gap: 1rem;
              }

              .current-realm {
                display: flex;
                gap: 0.5rem;
                align-items: center;
              }

              .realm-title {
                color: #999;
              }

              .realm-name {
                color: #00ff7f;
                font-size: 1.2rem;
                font-weight: 600;
              }

              .realm-progress-bar {
                width: 100%;
                height: 8px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 4px;
                overflow: hidden;
              }

              .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #00ff7f 0%, #00cc66 100%);
                transition: width 0.3s ease;
              }

              .next-realm {
                display: flex;
                justify-content: space-between;
                color: #ccc;
                font-size: 0.9rem;
              }

              .exp-info {
                color: #00ff7f;
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
                background: rgba(0, 255, 127, 0.1);
                color: #00ff7f;
              }

              .content-tab.active {
                background: rgba(0, 255, 127, 0.15);
                border-color: rgba(0, 255, 127, 0.3);
                color: #00ff7f;
              }

              /* 课程样式 */
              .courses-section h3 {
                color: #00ff7f;
                margin-bottom: 2rem;
                text-align: center;
                font-size: 1.8rem;
              }

              .course-category {
                margin-bottom: 3rem;
              }

              .course-category h4 {
                color: #00ff7f;
                margin-bottom: 1.5rem;
                font-size: 1.3rem;
                padding-bottom: 0.5rem;
                border-bottom: 1px solid rgba(0, 255, 127, 0.2);
              }

              .course-list {
                display: grid;
                gap: 1.5rem;
              }

              .course-item {
                display: flex;
                gap: 1.5rem;
                background: rgba(0, 255, 127, 0.05);
                border: 1px solid rgba(0, 255, 127, 0.1);
                padding: 1.5rem;
                border-radius: 12px;
                transition: all 0.3s ease;
              }

              .course-item:hover {
                background: rgba(0, 255, 127, 0.08);
                transform: translateY(-2px);
                box-shadow: 0 5px 20px rgba(0, 255, 127, 0.2);
              }

              .course-item.advanced {
                background: rgba(0, 150, 255, 0.05);
                border-color: rgba(0, 150, 255, 0.2);
              }

              .course-item.advanced:hover {
                background: rgba(0, 150, 255, 0.08);
                box-shadow: 0 5px 20px rgba(0, 150, 255, 0.2);
              }

              .course-item.master {
                background: rgba(255, 215, 0, 0.05);
                border-color: rgba(255, 215, 0, 0.2);
              }

              .course-item.master:hover {
                background: rgba(255, 215, 0, 0.08);
                box-shadow: 0 5px 20px rgba(255, 215, 0, 0.2);
              }

              .course-icon {
                font-size: 2.5rem;
                flex-shrink: 0;
              }

              .course-info h5 {
                color: #00ff7f;
                margin-bottom: 0.5rem;
                font-size: 1.2rem;
              }

              .course-info p {
                color: #ccc;
                margin-bottom: 1rem;
                line-height: 1.6;
              }

              .course-meta {
                display: flex;
                gap: 1.5rem;
                margin-bottom: 1rem;
              }

              .difficulty, .duration {
                color: #999;
                font-size: 0.9rem;
              }

              .start-button {
                background: rgba(0, 255, 127, 0.2);
                border: 1px solid rgba(0, 255, 127, 0.4);
                color: #00ff7f;
                padding: 0.6rem 1.5rem;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.3s ease;
              }

              .start-button:hover {
                background: rgba(0, 255, 127, 0.3);
                transform: translateY(-1px);
              }

              .start-button.locked {
                background: rgba(255, 255, 255, 0.05);
                border-color: rgba(255, 255, 255, 0.1);
                color: #666;
                cursor: not-allowed;
              }

              /* 试炼样式 */
              .trials-section h3 {
                color: #00ff7f;
                margin-bottom: 2rem;
                text-align: center;
                font-size: 1.8rem;
              }

              .trial-category {
                margin-bottom: 3rem;
              }

              .trial-category h4 {
                color: #00ff7f;
                margin-bottom: 1.5rem;
                font-size: 1.3rem;
                padding-bottom: 0.5rem;
                border-bottom: 1px solid rgba(0, 255, 127, 0.2);
              }

              .trial-list {
                display: grid;
                gap: 1.5rem;
              }

              .trial-item {
                display: flex;
                gap: 1.5rem;
                background: rgba(0, 255, 127, 0.05);
                border: 1px solid rgba(0, 255, 127, 0.1);
                padding: 1.5rem;
                border-radius: 12px;
                transition: all 0.3s ease;
              }

              .trial-item:hover {
                background: rgba(0, 255, 127, 0.08);
                transform: translateY(-2px);
                box-shadow: 0 5px 20px rgba(0, 255, 127, 0.2);
              }

              .trial-item.advanced {
                background: rgba(255, 100, 0, 0.05);
                border-color: rgba(255, 100, 0, 0.2);
              }

              .trial-item.master {
                background: rgba(255, 0, 100, 0.05);
                border-color: rgba(255, 0, 100, 0.2);
              }

              .trial-icon {
                font-size: 2.5rem;
                flex-shrink: 0;
              }

              .trial-info h5 {
                color: #00ff7f;
                margin-bottom: 0.5rem;
                font-size: 1.2rem;
              }

              .trial-info p {
                color: #ccc;
                margin-bottom: 1rem;
                line-height: 1.6;
              }

              .trial-rewards {
                display: flex;
                gap: 1.5rem;
                margin-bottom: 1rem;
              }

              .reward {
                color: #ffd700;
                font-size: 0.9rem;
              }

              .exp {
                color: #00ff7f;
                font-size: 0.9rem;
              }

              .trial-button {
                background: rgba(255, 100, 0, 0.2);
                border: 1px solid rgba(255, 100, 0, 0.4);
                color: #ff6400;
                padding: 0.6rem 1.5rem;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.3s ease;
              }

              .trial-button:hover {
                background: rgba(255, 100, 0, 0.3);
                transform: translateY(-1px);
              }

              .trial-button.locked {
                background: rgba(255, 255, 255, 0.05);
                border-color: rgba(255, 255, 255, 0.1);
                color: #666;
                cursor: not-allowed;
              }

              /* 秘籍样式 */
              .scriptures-section h3 {
                color: #00ff7f;
                margin-bottom: 2rem;
                text-align: center;
                font-size: 1.8rem;
              }

              .scripture-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 2rem;
              }

              .scripture-item {
                background: rgba(0, 0, 0, 0.3);
                border: 1px solid rgba(0, 255, 127, 0.2);
                border-radius: 12px;
                overflow: hidden;
                transition: all 0.3s ease;
              }

              .scripture-item:hover {
                transform: translateY(-3px);
                box-shadow: 0 10px 30px rgba(0, 255, 127, 0.3);
              }

              .scripture-item.legendary {
                background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 100, 0, 0.1) 100%);
                border-color: rgba(255, 215, 0, 0.3);
              }

              .scripture-cover {
                padding: 2rem;
                background: rgba(0, 255, 127, 0.05);
                text-align: center;
                position: relative;
              }

              .scripture-seal {
                position: absolute;
                top: 1rem;
                right: 1rem;
                width: 40px;
                height: 40px;
                background: rgba(255, 0, 0, 0.8);
                color: #fff;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 1.2rem;
              }

              .scripture-cover h4 {
                color: #00ff7f;
                font-size: 1.5rem;
                margin-bottom: 0.5rem;
              }

              .scripture-desc {
                color: #ccc;
                font-size: 0.9rem;
              }

              .scripture-preview {
                padding: 1.5rem;
              }

              .scripture-preview blockquote {
                color: #ccc;
                font-style: italic;
                line-height: 1.8;
                margin-bottom: 1rem;
                padding: 1rem;
                background: rgba(0, 255, 127, 0.05);
                border-left: 3px solid rgba(0, 255, 127, 0.3);
                border-radius: 4px;
              }

              .read-button {
                background: rgba(0, 255, 127, 0.2);
                border: 1px solid rgba(0, 255, 127, 0.4);
                color: #00ff7f;
                padding: 0.6rem 1.5rem;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.3s ease;
                width: 100%;
              }

              .read-button:hover {
                background: rgba(0, 255, 127, 0.3);
              }

              .read-button.locked {
                background: rgba(255, 255, 255, 0.05);
                border-color: rgba(255, 255, 255, 0.1);
                color: #666;
                cursor: not-allowed;
              }

              /* 成就样式 */
              .achievements-section h3 {
                color: #00ff7f;
                margin-bottom: 2rem;
                text-align: center;
                font-size: 1.8rem;
              }

              .achievement-categories {
                display: flex;
                flex-direction: column;
                gap: 2rem;
              }

              .achievement-category h4 {
                color: #00ff7f;
                margin-bottom: 1.5rem;
                font-size: 1.3rem;
              }

              .achievement-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 1.5rem;
              }

              .achievement-item {
                background: rgba(0, 0, 0, 0.3);
                border: 1px solid rgba(0, 255, 127, 0.2);
                border-radius: 12px;
                padding: 1.5rem;
                text-align: center;
                transition: all 0.3s ease;
                position: relative;
              }

              .achievement-item:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 20px rgba(0, 255, 127, 0.2);
              }

              .achievement-item.unlocked {
                background: rgba(0, 255, 127, 0.1);
                border-color: rgba(0, 255, 127, 0.3);
              }

              .achievement-item.rare {
                background: rgba(0, 150, 255, 0.05);
                border-color: rgba(0, 150, 255, 0.2);
              }

              .achievement-item.legendary {
                background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 100, 0, 0.1) 100%);
                border-color: rgba(255, 215, 0, 0.3);
              }

              .achievement-icon {
                font-size: 2.5rem;
                margin-bottom: 0.5rem;
              }

              .achievement-name {
                color: #00ff7f;
                font-size: 1.1rem;
                margin-bottom: 0.3rem;
              }

              .achievement-desc {
                color: #999;
                font-size: 0.9rem;
              }

              .achievement-date {
                color: #666;
                font-size: 0.8rem;
              }

              .progress-bar {
                width: 100%;
                height: 4px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 2px;
                overflow: hidden;
                margin-top: 0.5rem;
              }

              .progress {
                height: 100%;
                background: linear-gradient(90deg, #00ff7f 0%, #00cc66 100%);
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
                color: #666;
                font-weight: bold;
                border-radius: 12px;
              }

              /* 雷达扫描效果 */
              .radar-scanner {
                position: fixed;
                width: 300px;
                height: 300px;
                top: 10%;
                right: 5%;
                opacity: 0.3;
                pointer-events: none;
              }

              .radar-center {
                position: absolute;
                width: 10px;
                height: 10px;
                background: #00ff7f;
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                box-shadow: 0 0 20px #00ff7f;
              }

              .radar-sweep {
                position: absolute;
                width: 100%;
                height: 100%;
                background: conic-gradient(
                  from 0deg,
                  transparent 0deg,
                  rgba(0, 255, 127, 0.3) 30deg,
                  transparent 90deg
                );
                animation: radar-rotate 4s linear infinite;
              }

              @keyframes radar-rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }

              .radar-ring {
                position: absolute;
                border: 1px solid rgba(0, 255, 127, 0.3);
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                animation: radar-pulse 4s ease-out infinite;
              }

              @keyframes radar-pulse {
                0% {
                  width: 0;
                  height: 0;
                  opacity: 1;
                }
                100% {
                  width: 300px;
                  height: 300px;
                  opacity: 0;
                }
              }

              /* 数据流效果 */
              .data-streams {
                position: fixed;
                width: 100%;
                height: 100%;
                overflow: hidden;
                pointer-events: none;
              }

              .data-stream {
                position: absolute;
                color: rgba(0, 255, 127, 0.3);
                font-family: 'Courier New', monospace;
                font-size: 12px;
                animation: data-fall linear infinite;
                white-space: nowrap;
              }

              @keyframes data-fall {
                from {
                  transform: translateY(-100px);
                  opacity: 0;
                }
                10% {
                  opacity: 0.5;
                }
                90% {
                  opacity: 0.5;
                }
                to {
                  transform: translateY(100vh);
                  opacity: 0;
                }
              }

              /* 感知波纹 */
              .sensing-waves {
                position: fixed;
                width: 100%;
                height: 100%;
                pointer-events: none;
                overflow: hidden;
              }

              .wave {
                position: absolute;
                left: 50%;
                bottom: 0;
                width: 200%;
                height: 200%;
                transform: translateX(-50%);
                border-radius: 50%;
                background: radial-gradient(
                  circle at center,
                  transparent 0%,
                  transparent 40%,
                  rgba(0, 255, 127, 0.1) 40%,
                  transparent 41%
                );
              }

              .wave-1 {
                animation: wave-expand 8s ease-out infinite;
              }

              .wave-2 {
                animation: wave-expand 8s ease-out 2.67s infinite;
              }

              .wave-3 {
                animation: wave-expand 8s ease-out 5.33s infinite;
              }

              @keyframes wave-expand {
                0% {
                  transform: translateX(-50%) scale(0.1);
                  opacity: 1;
                }
                100% {
                  transform: translateX(-50%) scale(3);
                  opacity: 0;
                }
              }

              /* 科技网格 */
              .tech-grid {
                position: fixed;
                width: 100%;
                height: 100%;
                background-image: 
                  linear-gradient(rgba(0, 255, 127, 0.03) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 255, 127, 0.03) 1px, transparent 1px);
                background-size: 50px 50px;
                animation: grid-move 20s linear infinite;
              }

              @keyframes grid-move {
                0% { transform: translate(0, 0); }
                100% { transform: translate(50px, 50px); }
              }

              /* 增强的组件样式 */
              .sect-emblem {
                width: 120px;
                height: 120px;
                background: linear-gradient(135deg, #00ff7f 0%, #00cc66 100%);
                color: #000;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3.5rem;
                font-weight: bold;
                margin: 0 auto 1.5rem;
                box-shadow: 
                  0 0 60px rgba(0, 255, 127, 0.6),
                  inset 0 0 30px rgba(0, 255, 127, 0.3);
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

              .sect-title {
                font-size: 4rem;
                margin-bottom: 0.5rem;
                color: #00ff7f;
                text-shadow: 
                  0 0 30px rgba(0, 255, 127, 0.8),
                  0 0 60px rgba(0, 255, 127, 0.5),
                  0 0 90px rgba(0, 255, 127, 0.3);
                animation: title-flicker 5s ease-in-out infinite;
              }

              @keyframes title-flicker {
                0%, 100% { opacity: 1; }
                95% { opacity: 0.95; }
              }

              /* 高级课程卡片样式 */
              .course-item {
                display: flex;
                gap: 1.5rem;
                background: linear-gradient(
                  135deg,
                  rgba(0, 255, 127, 0.05) 0%,
                  rgba(0, 255, 127, 0.02) 100%
                );
                border: 1px solid rgba(0, 255, 127, 0.2);
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
                  #00ff7f,
                  transparent,
                  transparent,
                  #00ff7f
                );
                border-radius: 16px;
                opacity: 0;
                z-index: -1;
                transition: opacity 0.4s ease;
              }

              .course-item:hover::before {
                opacity: 0.3;
                animation: border-rotate 3s linear infinite;
              }

              @keyframes border-rotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }

              .course-item:hover {
                background: linear-gradient(
                  135deg,
                  rgba(0, 255, 127, 0.1) 0%,
                  rgba(0, 255, 127, 0.05) 100%
                );
                transform: translateY(-5px) scale(1.02);
                box-shadow: 
                  0 10px 40px rgba(0, 255, 127, 0.3),
                  0 0 60px rgba(0, 255, 127, 0.1) inset;
              }

              .course-desc {
                color: #ccc;
                line-height: 1.7;
                margin-bottom: 1rem;
                font-size: 0.95rem;
              }

              .tech-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-bottom: 1rem;
              }

              .tech-tags span {
                background: rgba(0, 255, 127, 0.1);
                border: 1px solid rgba(0, 255, 127, 0.3);
                color: #00ff7f;
                padding: 0.3rem 0.8rem;
                border-radius: 20px;
                font-size: 0.8rem;
                transition: all 0.3s ease;
              }

              .tech-tags span:hover {
                background: rgba(0, 255, 127, 0.2);
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0, 255, 127, 0.3);
              }

              /* 高级按钮样式 */
              .start-button {
                background: linear-gradient(135deg, rgba(0, 255, 127, 0.2) 0%, rgba(0, 255, 127, 0.1) 100%);
                border: 1px solid rgba(0, 255, 127, 0.4);
                color: #00ff7f;
                padding: 0.8rem 2rem;
                border-radius: 30px;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1px;
              }

              .button-glow {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(0, 255, 127, 0.5);
                transform: translate(-50%, -50%);
                transition: width 0.6s, height 0.6s;
              }

              .start-button:hover .button-glow {
                width: 300px;
                height: 300px;
              }

              .start-button:hover {
                background: linear-gradient(135deg, rgba(0, 255, 127, 0.3) 0%, rgba(0, 255, 127, 0.2) 100%);
                transform: translateY(-2px);
                box-shadow: 
                  0 10px 30px rgba(0, 255, 127, 0.4),
                  0 0 20px rgba(0, 255, 127, 0.6) inset;
                color: #fff;
              }

              .start-button.locked {
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
                border-color: rgba(255, 255, 255, 0.2);
                color: #666;
                cursor: not-allowed;
              }

              .start-button.locked:hover {
                transform: none;
                box-shadow: none;
              }

              .start-button.master-locked {
                background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%);
                border-color: rgba(255, 215, 0, 0.3);
                color: #ffd700;
                animation: master-pulse 2s ease-in-out infinite;
              }

              @keyframes master-pulse {
                0%, 100% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.3); }
                50% { box-shadow: 0 0 40px rgba(255, 215, 0, 0.5); }
              }

              .lock-icon {
                margin-left: 0.5rem;
                font-size: 1.1rem;
              }

              /* 进阶课程样式 */
              .course-item.advanced {
                background: linear-gradient(
                  135deg,
                  rgba(0, 150, 255, 0.05) 0%,
                  rgba(0, 150, 255, 0.02) 100%
                );
                border-color: rgba(0, 150, 255, 0.3);
              }

              .course-item.advanced:hover {
                background: linear-gradient(
                  135deg,
                  rgba(0, 150, 255, 0.1) 0%,
                  rgba(0, 150, 255, 0.05) 100%
                );
                box-shadow: 
                  0 10px 40px rgba(0, 150, 255, 0.3),
                  0 0 60px rgba(0, 150, 255, 0.1) inset;
              }

              .course-item.advanced .tech-tags span {
                background: rgba(0, 150, 255, 0.1);
                border-color: rgba(0, 150, 255, 0.3);
                color: #0096ff;
              }

              /* 大师课程样式 */
              .course-item.master {
                background: linear-gradient(
                  135deg,
                  rgba(255, 215, 0, 0.05) 0%,
                  rgba(255, 215, 0, 0.02) 100%
                );
                border-color: rgba(255, 215, 0, 0.3);
                position: relative;
              }

              .course-item.master::after {
                content: '👁️';
                position: absolute;
                top: 1rem;
                right: 1rem;
                font-size: 1.5rem;
                opacity: 0.3;
                animation: eye-blink 5s ease-in-out infinite;
              }

              @keyframes eye-blink {
                0%, 90%, 100% { transform: scaleY(1); }
                95% { transform: scaleY(0.1); }
              }

              .course-item.master:hover {
                background: linear-gradient(
                  135deg,
                  rgba(255, 215, 0, 0.1) 0%,
                  rgba(255, 215, 0, 0.05) 100%
                );
                box-shadow: 
                  0 10px 40px rgba(255, 215, 0, 0.3),
                  0 0 60px rgba(255, 215, 0, 0.1) inset;
              }

              .course-item.master .tech-tags span {
                background: rgba(255, 215, 0, 0.1);
                border-color: rgba(255, 215, 0, 0.3);
                color: #ffd700;
              }

              /* 任务看板样式 */
              .taskboard-section {
                margin-top: 2rem;
              }

              .taskboard-header {
                margin-bottom: 2rem;
                text-align: center;
              }

              .taskboard-header h3 {
                color: #00ff7f;
                font-size: 2.5rem;
                margin-bottom: 0.5rem;
                text-shadow: 0 0 20px rgba(0, 255, 127, 0.6);
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
                background: rgba(0, 255, 127, 0.1);
                border: 1px solid rgba(0, 255, 127, 0.3);
                color: #00ff7f;
                padding: 0.5rem 1rem;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
              }

              .filter-select:hover, .sort-select:hover {
                background: rgba(0, 255, 127, 0.15);
                border-color: rgba(0, 255, 127, 0.5);
              }

              .add-task-button {
                background: linear-gradient(135deg, #00ff7f 0%, #00cc66 100%);
                color: #000;
                border: none;
                padding: 0.8rem 1.5rem;
                border-radius: 25px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(0, 255, 127, 0.3);
              }

              .add-task-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(0, 255, 127, 0.4);
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
                background: rgba(0, 255, 127, 0.02);
                border: 1px solid rgba(0, 255, 127, 0.1);
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
                background: rgba(0, 255, 127, 0.03);
                border: 1px solid rgba(0, 255, 127, 0.15);
                border-radius: 12px;
                padding: 1.5rem;
                min-height: 400px;
              }

              .task-column.planning {
                border-color: rgba(255, 215, 0, 0.3);
                background: rgba(255, 215, 0, 0.03);
              }

              .task-column.progress {
                border-color: rgba(0, 150, 255, 0.3);
                background: rgba(0, 150, 255, 0.03);
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
                background: rgba(0, 255, 127, 0.2);
                color: #00ff7f;
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
                background: linear-gradient(90deg, #00ff7f, #00cc66);
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
                box-shadow: 0 8px 25px rgba(0, 255, 127, 0.15);
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
                background: rgba(0, 255, 127, 0.2);
                color: #00ff7f;
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
                background: linear-gradient(90deg, #00ff7f 0%, #00cc66 100%);
                border-radius: 3px;
                transition: width 0.3s ease;
              }

              .progress-text {
                color: #00ff7f;
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
                background: rgba(0, 255, 127, 0.1);
                border: 1px solid rgba(0, 255, 127, 0.2);
                color: #00ff7f;
                padding: 0.2rem 0.6rem;
                border-radius: 12px;
                font-size: 0.75rem;
                transition: all 0.2s ease;
              }

              .task-tag:hover {
                background: rgba(0, 255, 127, 0.15);
                transform: translateY(-1px);
              }

              /* 模态框样式 */
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
                background: linear-gradient(135deg, #1a3a1a 0%, #0a2a0a 100%);
                border: 1px solid rgba(0, 255, 127, 0.3);
                border-radius: 16px;
                width: 90%;
                max-width: 600px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 
                  0 20px 60px rgba(0, 255, 127, 0.3),
                  0 0 100px rgba(0, 255, 127, 0.1) inset;
              }

              .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem 2rem;
                border-bottom: 1px solid rgba(0, 255, 127, 0.2);
              }

              .modal-header h3 {
                color: #00ff7f;
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
                color: #00ff7f;
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
                color: #00ff7f;
                margin-bottom: 0.5rem;
                font-weight: 600;
              }

              .form-input, .form-textarea, .form-select {
                width: 100%;
                background: rgba(0, 255, 127, 0.05);
                border: 1px solid rgba(0, 255, 127, 0.3);
                color: #fff;
                padding: 0.8rem;
                border-radius: 8px;
                font-size: 1rem;
                transition: all 0.3s ease;
              }

              .form-input:focus, .form-textarea:focus, .form-select:focus {
                outline: none;
                border-color: #00ff7f;
                background: rgba(0, 255, 127, 0.08);
                box-shadow: 0 0 15px rgba(0, 255, 127, 0.2);
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
                border-top: 1px solid rgba(0, 255, 127, 0.2);
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
                background: linear-gradient(135deg, #00ff7f 0%, #00cc66 100%);
                color: #000;
                border: none;
                padding: 0.8rem 1.5rem;
                border-radius: 8px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(0, 255, 127, 0.3);
              }

              .modal-footer .save-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(0, 255, 127, 0.4);
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

              /* 建议讨论模块样式 */
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
                background: linear-gradient(45deg, #00ff7f, #32cd32);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                margin-bottom: 10px;
                text-shadow: 0 0 20px rgba(0, 255, 127, 0.3);
              }

              .suggestions-subtitle {
                color: #90ee90;
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
                background: linear-gradient(45deg, #00ff7f, #32cd32);
                color: #000;
                border: none;
                padding: 12px 24px;
                border-radius: 25px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(0, 255, 127, 0.3);
              }

              .create-suggestion-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(0, 255, 127, 0.4);
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
                background: rgba(0, 255, 127, 0.1);
                border: 1px solid #00ff7f;
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
                background: rgba(0, 255, 127, 0.1);
                border-radius: 4px;
              }

              .suggestions-list::-webkit-scrollbar-thumb {
                background: linear-gradient(45deg, #00ff7f, #32cd32);
                border-radius: 4px;
              }

              .empty-suggestions {
                text-align: center;
                padding: 60px 20px;
                background: rgba(0, 255, 127, 0.05);
                border-radius: 20px;
                border: 2px dashed rgba(0, 255, 127, 0.3);
              }

              .empty-icon {
                font-size: 4rem;
                margin-bottom: 20px;
              }

              .suggestion-card {
                background: linear-gradient(135deg, rgba(0, 255, 127, 0.05), rgba(50, 205, 50, 0.03));
                border: 1px solid rgba(0, 255, 127, 0.2);
                border-radius: 15px;
                padding: 20px;
                margin-bottom: 20px;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
              }

              .suggestion-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(0, 255, 127, 0.2);
                border-color: rgba(0, 255, 127, 0.4);
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
                color: #90ee90;
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
                background: rgba(0, 255, 127, 0.2);
                border-color: #00ff7f;
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
                color: #00ff7f;
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
                background: rgba(0, 255, 127, 0.1);
                color: #00ff7f;
                padding: 4px 8px;
                border-radius: 8px;
                font-size: 0.8rem;
                border: 1px solid rgba(0, 255, 127, 0.3);
              }

              .comments-section {
                border-top: 1px solid rgba(0, 255, 127, 0.2);
                padding-top: 15px;
              }

              .comments-title {
                color: #90ee90;
                margin-bottom: 15px;
                font-size: 1rem;
              }

              .comments-list {
                margin-bottom: 15px;
              }

              .comment {
                background: rgba(0, 255, 127, 0.03);
                border-left: 3px solid rgba(0, 255, 127, 0.3);
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
                color: #90ee90;
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
                background: rgba(0, 255, 127, 0.05);
                border: 1px solid rgba(0, 255, 127, 0.2);
                color: #fff;
                padding: 12px;
                border-radius: 8px;
                resize: vertical;
                font-family: inherit;
              }

              .comment-input:focus {
                outline: none;
                border-color: #00ff7f;
                box-shadow: 0 0 10px rgba(0, 255, 127, 0.3);
              }

              .submit-comment-btn {
                background: linear-gradient(45deg, #00ff7f, #32cd32);
                color: #000;
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
                box-shadow: 0 4px 15px rgba(0, 255, 127, 0.3);
              }

              .submit-comment-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
              }

              /* 建议模态框样式 */
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
                color: #90ee90;
                margin-bottom: 8px;
                font-weight: 500;
              }

              .suggestion-form input,
              .suggestion-form textarea,
              .suggestion-form select {
                width: 100%;
                background: rgba(0, 255, 127, 0.05);
                border: 1px solid rgba(0, 255, 127, 0.2);
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
                border-color: #00ff7f;
                box-shadow: 0 0 10px rgba(0, 255, 127, 0.3);
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
                background: linear-gradient(45deg, #00ff7f, #32cd32);
                color: #000;
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