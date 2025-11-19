import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import SectAuth from '../../../components/SectAuthNew';
import ApiClient from '../../../lib/api-client';

// 门派ID
const SECT_ID = 'suantian';

// 初始化任务数据
const getInitialTasks = () => [
  {
    id: 1,
    title: "深度学习推理优化算法",
    description: "研发新一代深度学习推理加速算法，提升AI模型的计算效率",
    sect: "算天门",
    assignee: "算法师兄",
    priority: "高",
    status: "进行中",
    progress: 75,
    deadline: "2024-02-20",
    createdAt: "2024-01-08",
    tags: ["深度学习", "推理加速", "算法优化"]
  },
  {
    id: 2,
    title: "量子计算模拟器开发",
    description: "构建高性能量子计算模拟器，支持复杂量子电路仿真",
    sect: "算天门",
    assignee: "量子计算师",
    priority: "高",
    status: "规划中",
    progress: 30,
    deadline: "2024-03-10",
    createdAt: "2024-01-15",
    tags: ["量子计算", "模拟器", "量子电路"]
  },
  {
    id: 3,
    title: "机器学习模型压缩技术",
    description: "研究神经网络剪枝和量化技术，实现模型轻量化部署",
    sect: "算天门",
    assignee: "模型优化弟子",
    priority: "中",
    status: "完成",
    progress: 100,
    deadline: "2024-01-25",
    createdAt: "2024-01-01",
    tags: ["模型压缩", "剪枝", "量化"]
  },
  {
    id: 4,
    title: "分布式计算调度算法",
    description: "设计智能任务调度算法，优化集群资源利用率",
    sect: "算天门",
    assignee: "调度算法师",
    priority: "中",
    status: "进行中",
    progress: 55,
    deadline: "2024-02-28",
    createdAt: "2024-01-12",
    tags: ["分布式计算", "任务调度", "资源优化"]
  }
];

// 初始化建议数据
const getInitialSuggestions = () => [
  {
    id: 1,
    title: "建立跨门派算法竞赛平台",
    content: "建议创建一个统一的算法竞赛平台，让各门派弟子可以切磋算法技艺，互相学习先进的计算方法。平台可以包含算法挑战、代码评测、性能排行等功能，促进整个武林的计算技术发展。",
    author: "算天门·算法长老",
    authorId: "999999999",
    authorGlobalName: "神机妙算师",
    sect: "算天门",
    timestamp: "2024-01-15T09:30:00Z",
    tags: ["算法竞赛", "跨门派合作", "平台建设"],
    priority: "高",
    likes: 18,
    comments: [
      {
        id: 1,
        author: "天机门·算法弟子",
        authorId: "777777777",
        authorGlobalName: "算法专家",
        content: "非常支持！我们天机门在算法理论方面有深厚积累，愿意贡献力量。建议加入算法复杂度分析和证明功能。",
        timestamp: "2024-01-15T14:20:00Z"
      },
      {
        id: 2,
        author: "智慧门·AI研究员",
        authorId: "555555555",
        authorGlobalName: "人工智能大师",
        content: "可以结合机器学习算法评测，增加AI算法专项比赛，推动人工智能技术进步。",
        timestamp: "2024-01-15T16:45:00Z"
      }
    ]
  },
  {
    id: 2,
    title: "优化门派计算资源调度系统",
    content: "当前各门派的计算资源利用率不均衡，建议开发智能资源调度系统，实现计算任务的动态负载均衡。通过机器学习预测任务执行时间，优化资源分配策略，提高整体计算效率。",
    author: "算天门·调度专家",
    authorId: "888888888",
    authorGlobalName: "资源调度大师",
    sect: "算天门",
    timestamp: "2024-01-16T11:15:00Z",
    tags: ["资源调度", "负载均衡", "机器学习"],
    priority: "中",
    likes: 12,
    comments: [
      {
        id: 1,
        author: "云霄门·云计算弟子",
        authorId: "333333333",
        authorGlobalName: "云端专家",
        content: "我们云霄门在云资源管理方面经验丰富，可以提供弹性扩缩容的技术支持。",
        timestamp: "2024-01-16T15:30:00Z"
      }
    ]
  }
];

export default function SuantianMenPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // 任务看板状态
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [taskFilter, setTaskFilter] = useState('all');
  const [taskPriorityFilter, setTaskPriorityFilter] = useState('all');
  const [taskSectFilter, setTaskSectFilter] = useState('all');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    sect: '算天门',
    assignee: '',
    priority: '中',
    status: '规划中',
    deadline: '',
    tags: ''
  });

  // 建议讨论状态
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [suggestionFilter, setSuggestionFilter] = useState('all');
  const [suggestionPriorityFilter, setSuggestionPriorityFilter] = useState('all');
  const [editingSuggestion, setEditingSuggestion] = useState(null);
  const [suggestionForm, setSuggestionForm] = useState({
    title: '',
    content: '',
    tags: '',
    priority: '中'
  });
  const [newComment, setNewComment] = useState('');

  // API调用状态
  const [sessionToken, setSessionToken] = useState('');
  const [apiLoading, setApiLoading] = useState(false);

  // 从API加载数据
  const loadTasksFromAPI = async (token) => {
    try {
      setApiLoading(true);
      const result = await ApiClient.getTasks(token);
      setTasks(result.tasks || []);
    } catch (error) {
      console.error('加载任务失败:', error);
      // 如果API失败，使用初始数据
      setTasks(getInitialTasks());
    } finally {
      setApiLoading(false);
    }
  };

  const loadSuggestionsFromAPI = async (token) => {
    try {
      const result = await ApiClient.getSuggestions(token);
      setSuggestions(result.suggestions || []);
    } catch (error) {
      console.error('加载建议失败:', error);
      // 如果API失败，使用初始数据
      setSuggestions(getInitialSuggestions());
    }
  };

  // 任务相关API调用
  const createTaskAPI = async (taskData) => {
    try {
      setApiLoading(true);
      await ApiClient.createTask(sessionToken, taskData);
      // 重新加载任务列表
      await loadTasksFromAPI(sessionToken);
    } catch (error) {
      console.error('创建任务失败:', error);
      alert('创建任务失败: ' + error.message);
    } finally {
      setApiLoading(false);
    }
  };

  const updateTaskAPI = async (taskId, updateData) => {
    try {
      setApiLoading(true);
      await ApiClient.updateTask(sessionToken, taskId, updateData);
      // 重新加载任务列表
      await loadTasksFromAPI(sessionToken);
    } catch (error) {
      console.error('更新任务失败:', error);
      alert('更新任务失败: ' + error.message);
    } finally {
      setApiLoading(false);
    }
  };

  const deleteTaskAPI = async (taskId) => {
    try {
      setApiLoading(true);
      await ApiClient.deleteTask(sessionToken, taskId);
      // 重新加载任务列表
      await loadTasksFromAPI(sessionToken);
    } catch (error) {
      console.error('删除任务失败:', error);
      alert('删除任务失败: ' + error.message);
    } finally {
      setApiLoading(false);
    }
  };

  // 建议相关API调用
  const createSuggestionAPI = async (suggestionData) => {
    try {
      await ApiClient.createSuggestion(sessionToken, { ...suggestionData, sectId: SECT_ID });
      // 重新加载建议列表
      await loadSuggestionsFromAPI(sessionToken);
    } catch (error) {
      console.error('创建建议失败:', error);
      alert('创建建议失败: ' + error.message);
    }
  };

  const likeSuggestionAPI = async (suggestionId) => {
    try {
      await ApiClient.likeSuggestion(sessionToken, suggestionId);
      // 重新加载建议列表
      await loadSuggestionsFromAPI(sessionToken);
    } catch (error) {
      console.error('点赞失败:', error);
      alert('点赞失败: ' + error.message);
    }
  };

  const addCommentAPI = async (suggestionId, content) => {
    try {
      await ApiClient.addComment(sessionToken, suggestionId, content, SECT_ID);
      // 重新加载建议列表
      await loadSuggestionsFromAPI(sessionToken);
    } catch (error) {
      console.error('添加评论失败:', error);
      alert('添加评论失败: ' + error.message);
    }
  };

  // 当sessionToken改变时，加载数据
  useEffect(() => {
    if (sessionToken) {
      loadTasksFromAPI(sessionToken);
      loadSuggestionsFromAPI(sessionToken);
    }
  }, [sessionToken]);

  // 任务筛选逻辑
  useEffect(() => {
    let filtered = tasks;
    
    if (taskFilter !== 'all') {
      filtered = filtered.filter(task => task.status === taskFilter);
    }
    
    if (taskPriorityFilter !== 'all') {
      filtered = filtered.filter(task => task.priority === taskPriorityFilter);
    }
    
    if (taskSectFilter !== 'all') {
      filtered = filtered.filter(task => task.sect === taskSectFilter);
    }
    
    setFilteredTasks(filtered);
  }, [tasks, taskFilter, taskPriorityFilter, taskSectFilter]);

  // 建议筛选逻辑
  useEffect(() => {
    let filtered = suggestions;
    
    if (suggestionPriorityFilter !== 'all') {
      filtered = filtered.filter(suggestion => suggestion.priority === suggestionPriorityFilter);
    }
    
    setFilteredSuggestions(filtered);
  }, [suggestions, suggestionPriorityFilter]);

  return (
    <Layout title="EEnous - 算天门·神机妙算宗">
      <SectAuth 
        sectId="suantian"
        renderContent={(user, logout, updateFunctions) => {
          if (!editForm.sectNickname) {
            setEditForm({
              sectNickname: user.sectNickname,
              globalNickname: user.globalNickname,
            });
          }

          // 设置会话令牌
          if (!sessionToken) {
            const token = localStorage.getItem(`session_token_${SECT_ID}`);
            if (token) {
              setSessionToken(token);
            }
          }

          // 在 renderContent 内部定义这些函数，以便访问 user 参数
          const handleTaskSubmit = async (e) => {
            e.preventDefault();
            
            if (!taskForm.title.trim() || !taskForm.description.trim()) {
              alert('请填写任务标题和描述');
              return;
            }

            if (!sessionToken) {
              alert('请先登录');
              return;
            }

            if (editingTask) {
              // 编辑现有任务
              const updateData = {
                title: taskForm.title.trim(),
                description: taskForm.description.trim(),
                sect: taskForm.sect,
                assignee: taskForm.assignee.trim(),
                priority: taskForm.priority,
                status: taskForm.status,
                deadline: taskForm.deadline,
                tags: taskForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
              };
              await updateTaskAPI(editingTask.id, updateData);
              setEditingTask(null);
            } else {
              // 创建新任务
              const taskData = {
                title: taskForm.title.trim(),
                description: taskForm.description.trim(),
                sect: taskForm.sect,
                assignee: taskForm.assignee.trim() || user.sectNickname,
                priority: taskForm.priority,
                status: taskForm.status,
                deadline: taskForm.deadline,
                tags: taskForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
              };
              await createTaskAPI(taskData);
            }

            // 重置表单
            setTaskForm({
              title: '',
              description: '',
              sect: '算天门',
              assignee: '',
              priority: '中',
              status: '规划中',
              deadline: '',
              tags: ''
            });
            setIsTaskModalOpen(false);
          };

          const handleSuggestionSubmit = async (e) => {
            e.preventDefault();
            
            if (!suggestionForm.title.trim() || !suggestionForm.content.trim()) {
              alert('请填写标题和内容');
              return;
            }

            if (!sessionToken) {
              alert('请先登录');
              return;
            }

            if (editingSuggestion) {
              // 目前不支持编辑建议，可以在API中添加此功能
              alert('暂不支持编辑建议');
              return;
            } else {
              // 创建新建议
              const suggestionData = {
                title: suggestionForm.title.trim(),
                content: suggestionForm.content.trim(),
                tags: suggestionForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                priority: suggestionForm.priority
              };
              await createSuggestionAPI(suggestionData);
            }

            // 重置表单
            setSuggestionForm({
              title: '',
              content: '',
              tags: '',
              priority: '中'
            });
          };

          const handleAddComment = async (suggestionId, commentContent) => {
            if (!commentContent.trim()) return;

            if (!sessionToken) {
              alert('请先登录');
              return;
            }

            await addCommentAPI(suggestionId, commentContent);
            setNewComment('');
          };

          return (
          <div className="sect-page suantian-sect">
            <div className="sect-container">
              <div className="sect-nav">
                <button onClick={() => router.push('/hardware-dao')} className="back-button">
                  ← 返回硬件武林
                </button>
              </div>

              <div className="sect-header">
                <div className="sect-emblem">计</div>
                <h1 className="sect-title">算天门</h1>
                <p className="sect-subtitle">神机妙算宗</p>
                <div className="sect-slogan">算天神珠·神机妙算术</div>
              </div>

              <div className="user-info-bar">
                <div className="user-details">
                  <span className="user-nickname">{user.sectNickname}</span>
                  <span className="user-level">{user.cultivationLevel}</span>
                  <span className="user-points">积分: {user.sectPoints}</span>
                  <span className="join-time">入门: {new Date(user.joinTime).toLocaleDateString()}</span>
                </div>
                <div className="user-actions">
                  <button className="logout-button" onClick={logout}>
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
                  className={`tab-item ${activeTab === 'tasks' ? 'active' : ''}`}
                  onClick={() => setActiveTab('tasks')}
                >
                  <span className="tab-icon">📋</span>
                  <span className="tab-label">任务看板</span>
                </button>
                <button 
                  className={`tab-item ${activeTab === 'suggestions' ? 'active' : ''}`}
                  onClick={() => setActiveTab('suggestions')}
                >
                  <span className="tab-icon">💬</span>
                  <span className="tab-label">建议讨论</span>
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

              {/* 门派大厅内容 */}
              {activeTab === 'home' && (
                <>
                  <div className="sect-content">
                    <div className="welcome-section">
                      <h2>欢迎来到算天门</h2>
                      <p>神机妙算，运筹帷幄。在这里，我们探索计算的极限，追求算法的艺术。</p>
                    </div>

                    <div className="cultivation-content">
                      <h3>修炼课程</h3>
                      <div className="course-list">
                        <div className="course-item">
                          <div className="course-icon">🧮</div>
                          <div className="course-info">
                            <h4>算法设计与分析</h4>
                            <p>深入学习各种经典算法和数据结构，掌握算法复杂度分析</p>
                            <span className="course-status">即将开放</span>
                          </div>
                        </div>
                        
                        <div className="course-item">
                          <div className="course-icon">🤖</div>
                          <div className="course-info">
                            <h4>机器学习实战</h4>
                            <p>从基础到进阶，掌握机器学习算法原理与实际应用</p>
                            <span className="course-status">即将开放</span>
                          </div>
                        </div>
                        
                        <div className="course-item">
                          <div className="course-icon">⚡</div>
                          <div className="course-info">
                            <h4>量子计算入门</h4>
                            <p>探索量子计算的神秘世界，学习量子算法和量子编程</p>
                            <span className="course-status">即将开放</span>
                          </div>
                        </div>
                        
                        <div className="course-item">
                          <div className="course-icon">🌐</div>
                          <div className="course-info">
                            <h4>分布式计算系统</h4>
                            <p>掌握大规模分布式系统设计与优化技术</p>
                            <span className="course-status">即将开放</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* 任务看板内容 */}
              {activeTab === 'tasks' && (
                <div className="tasks-section">
                  <div className="section-header">
                    <h2>任务看板</h2>
                    <button 
                      className="create-button"
                      onClick={() => {
                        setEditingTask(null);
                        setTaskForm({
                          title: '',
                          description: '',
                          sect: '算天门',
                          assignee: '',
                          priority: '中',
                          status: '规划中',
                          deadline: '',
                          tags: ''
                        });
                        setIsTaskModalOpen(true);
                      }}
                    >
                      创建任务
                    </button>
                  </div>

                  {/* 筛选控件 */}
                  <div className="filter-controls">
                    <select value={taskFilter} onChange={(e) => setTaskFilter(e.target.value)}>
                      <option value="all">所有状态</option>
                      <option value="规划中">规划中</option>
                      <option value="进行中">进行中</option>
                      <option value="完成">完成</option>
                      <option value="暂停">暂停</option>
                    </select>
                    <select value={taskPriorityFilter} onChange={(e) => setTaskPriorityFilter(e.target.value)}>
                      <option value="all">所有优先级</option>
                      <option value="高">高优先级</option>
                      <option value="中">中优先级</option>
                      <option value="低">低优先级</option>
                    </select>
                    <select value={taskSectFilter} onChange={(e) => setTaskSectFilter(e.target.value)}>
                      <option value="all">所有门派</option>
                      <option value="算天门">算天门</option>
                      <option value="天眼门">天眼门</option>
                      <option value="千里门">千里门</option>
                      <option value="天机门">天机门</option>
                      <option value="其他">其他门派</option>
                    </select>
                  </div>

                  {/* 任务列表 */}
                  {apiLoading && (
                    <div className="loading-state">
                      <span>🔄 加载中...</span>
                    </div>
                  )}
                  {!apiLoading && (
                    <div className="tasks-grid">
                    {filteredTasks.map(task => (
                      <div key={task.id} className="task-card">
                        <div className="task-header">
                          <h3>{task.title}</h3>
                          <div className="task-actions">
                            <button 
                              onClick={() => {
                                setEditingTask(task);
                                setTaskForm({
                                  title: task.title,
                                  description: task.description,
                                  sect: task.sect,
                                  assignee: task.assignee,
                                  priority: task.priority,
                                  status: task.status,
                                  deadline: task.deadline,
                                  tags: task.tags.join(', ')
                                });
                                setIsTaskModalOpen(true);
                              }}
                              className="edit-btn"
                            >
                              编辑
                            </button>
                            <button 
                              onClick={async () => {
                                if (confirm('确定要删除这个任务吗？')) {
                                  if (!sessionToken) {
                                    alert('请先登录');
                                    return;
                                  }
                                  await deleteTaskAPI(task.id);
                                }
                              }}
                              className="delete-btn"
                            >
                              删除
                            </button>
                          </div>
                        </div>
                        <p className="task-description">{task.description}</p>
                        <div className="task-meta">
                          <span className={`task-priority priority-${task.priority}`}>{task.priority}优先级</span>
                          <span className={`task-status status-${task.status}`}>{task.status}</span>
                          <span className="task-sect">{task.sect}</span>
                        </div>
                        <div className="task-details">
                          <p>负责人: {task.assignee}</p>
                          <p>截止日期: {task.deadline}</p>
                          <div className="task-progress">
                            <span>进度: {task.progress}%</span>
                            <div className="progress-bar">
                              <div className="progress-fill" style={{width: `${task.progress}%`}}></div>
                            </div>
                          </div>
                        </div>
                        {task.tags.length > 0 && (
                          <div className="task-tags">
                            {task.tags.map((tag, index) => (
                              <span key={index} className="tag">{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    </div>
                  )}

                  {/* 任务创建/编辑模态框 */}
                  {isTaskModalOpen && (
                    <div className="modal-overlay">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h3>{editingTask ? '编辑任务' : '创建新任务'}</h3>
                          <button onClick={() => setIsTaskModalOpen(false)} className="close-btn">×</button>
                        </div>
                        <form onSubmit={handleTaskSubmit}>
                          <div className="form-group">
                            <label>任务标题</label>
                            <input
                              type="text"
                              value={taskForm.title}
                              onChange={(e) => setTaskForm({...taskForm, title: e.target.value})}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>任务描述</label>
                            <textarea
                              value={taskForm.description}
                              onChange={(e) => setTaskForm({...taskForm, description: e.target.value})}
                              required
                            />
                          </div>
                          <div className="form-row">
                            <div className="form-group">
                              <label>所属门派</label>
                              <select
                                value={taskForm.sect}
                                onChange={(e) => setTaskForm({...taskForm, sect: e.target.value})}
                              >
                                <option value="算天门">算天门</option>
                                <option value="天眼门">天眼门</option>
                                <option value="千里门">千里门</option>
                                <option value="天机门">天机门</option>
                                <option value="其他">其他门派</option>
                              </select>
                            </div>
                            <div className="form-group">
                              <label>负责人</label>
                              <input
                                type="text"
                                value={taskForm.assignee}
                                onChange={(e) => setTaskForm({...taskForm, assignee: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="form-group">
                              <label>优先级</label>
                              <select
                                value={taskForm.priority}
                                onChange={(e) => setTaskForm({...taskForm, priority: e.target.value})}
                              >
                                <option value="低">低</option>
                                <option value="中">中</option>
                                <option value="高">高</option>
                              </select>
                            </div>
                            <div className="form-group">
                              <label>状态</label>
                              <select
                                value={taskForm.status}
                                onChange={(e) => setTaskForm({...taskForm, status: e.target.value})}
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
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>标签 (用逗号分隔)</label>
                            <input
                              type="text"
                              value={taskForm.tags}
                              onChange={(e) => setTaskForm({...taskForm, tags: e.target.value})}
                              placeholder="例如: 算法, 机器学习, 优化"
                            />
                          </div>
                          <div className="form-actions">
                            <button type="button" onClick={() => setIsTaskModalOpen(false)} className="cancel-btn">
                              取消
                            </button>
                            <button type="submit" className="submit-btn">
                              {editingTask ? '更新任务' : '创建任务'}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 建议讨论内容 */}
              {activeTab === 'suggestions' && (
                <div className="suggestions-section">
                  <div className="section-header">
                    <h2>建议讨论</h2>
                    <div className="header-actions">
                      <select value={suggestionPriorityFilter} onChange={(e) => setSuggestionPriorityFilter(e.target.value)}>
                        <option value="all">所有优先级</option>
                        <option value="高">高优先级</option>
                        <option value="中">中优先级</option>
                        <option value="低">低优先级</option>
                      </select>
                      <button 
                        onClick={() => {
                          if (confirm('确定要清空所有建议吗？此操作不可撤销。')) {
                            updateSuggestions([]);
                          }
                        }}
                        className="clear-btn"
                      >
                        清空建议
                      </button>
                    </div>
                  </div>

                  {/* 建议提交表单 */}
                  <div className="suggestion-form">
                    <h3>{editingSuggestion ? '编辑建议' : '提交新建议'}</h3>
                    <form onSubmit={handleSuggestionSubmit}>
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="建议标题"
                          value={suggestionForm.title}
                          onChange={(e) => setSuggestionForm({...suggestionForm, title: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <textarea
                          placeholder="详细描述你的建议..."
                          value={suggestionForm.content}
                          onChange={(e) => setSuggestionForm({...suggestionForm, content: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <input
                            type="text"
                            placeholder="标签 (用逗号分隔)"
                            value={suggestionForm.tags}
                            onChange={(e) => setSuggestionForm({...suggestionForm, tags: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <select
                            value={suggestionForm.priority}
                            onChange={(e) => setSuggestionForm({...suggestionForm, priority: e.target.value})}
                          >
                            <option value="低">低优先级</option>
                            <option value="中">中优先级</option>
                            <option value="高">高优先级</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-actions">
                        {editingSuggestion && (
                          <button 
                            type="button" 
                            onClick={() => {
                              setEditingSuggestion(null);
                              setSuggestionForm({title: '', content: '', tags: '', priority: '中'});
                            }}
                            className="cancel-btn"
                          >
                            取消编辑
                          </button>
                        )}
                        <button type="submit" className="submit-btn">
                          {editingSuggestion ? '更新建议' : '提交建议'}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* 建议列表 */}
                  <div className="suggestions-list">
                    {filteredSuggestions.map(suggestion => (
                      <div key={suggestion.id} className="suggestion-card">
                        <div className="suggestion-header">
                          <h3>{suggestion.title}</h3>
                          <div className="suggestion-actions">
                            <button 
                              onClick={() => {
                                setEditingSuggestion(suggestion);
                                setSuggestionForm({
                                  title: suggestion.title,
                                  content: suggestion.content,
                                  tags: suggestion.tags.join(', '),
                                  priority: suggestion.priority
                                });
                              }}
                              className="edit-btn"
                            >
                              编辑
                            </button>
                            <button 
                              onClick={() => {
                                if (confirm('确定要删除这个建议吗？')) {
                                  updateSuggestions(suggestions.filter(s => s.id !== suggestion.id));
                                }
                              }}
                              className="delete-btn"
                            >
                              删除
                            </button>
                          </div>
                        </div>
                        <div className="suggestion-meta">
                          <span className="suggestion-author">
                            {suggestion.sect} ({suggestion.authorGlobalName})
                          </span>
                          <span className="suggestion-time">
                            {new Date(suggestion.timestamp).toLocaleString()}
                          </span>
                          <span className={`suggestion-priority priority-${suggestion.priority}`}>
                            {suggestion.priority}优先级
                          </span>
                        </div>
                        <div className="suggestion-content">
                          <p>{suggestion.content}</p>
                        </div>
                        {suggestion.tags.length > 0 && (
                          <div className="suggestion-tags">
                            {suggestion.tags.map((tag, index) => (
                              <span key={index} className="tag">{tag}</span>
                            ))}
                          </div>
                        )}
                        <div className="suggestion-stats">
                          <button 
                            onClick={() => {
                              if (!sessionToken) {
                                alert('请先登录');
                                return;
                              }
                              likeSuggestionAPI(suggestion.id);
                            }}
                            className="like-btn"
                          >
                            👍 {suggestion.likes}
                          </button>
                          <span className="comment-count">💬 {suggestion.comments.length}</span>
                        </div>

                        {/* 评论区域 */}
                        <div className="comments-section">
                          <h4>评论 ({suggestion.comments.length})</h4>
                          {suggestion.comments.map(comment => (
                            <div key={comment.id} className="comment">
                              <div className="comment-header">
                                <span className="comment-author">
                                  {comment.author.split('·')[0]} ({comment.authorGlobalName})
                                </span>
                                <span className="comment-time">
                                  {new Date(comment.timestamp).toLocaleString()}
                                </span>
                              </div>
                              <div className="comment-content">
                                {comment.content}
                              </div>
                            </div>
                          ))}
                          <div className="add-comment">
                            <textarea
                              placeholder="添加评论..."
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button 
                              onClick={() => handleAddComment(suggestion.id, newComment)}
                              className="submit-btn"
                              disabled={!newComment.trim()}
                            >
                              发表评论
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
                                  alert('更新失败：\n' + errors.join('\n'));
                                } else if (hasChanges) {
                                  alert('信息更新成功！');
                                  setIsEditing(false);
                                } else {
                                  setIsEditing(false);
                                }
                              } catch (error) {
                                alert('更新过程中发生错误，请重试');
                              }
                            }}
                          >
                            保存修改
                          </button>
                        </div>
                      )}
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
                      <form className="password-form">
                        <div className="form-item">
                          <label>当前密码</label>
                          <input 
                            type="password"
                            value={passwordForm.oldPassword}
                            onChange={(e) => setPasswordForm({...passwordForm, oldPassword: e.target.value})}
                          />
                        </div>
                        <div className="form-item">
                          <label>新密码</label>
                          <input 
                            type="password"
                            value={passwordForm.newPassword}
                            onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                          />
                        </div>
                        <div className="form-item">
                          <label>确认新密码</label>
                          <input 
                            type="password"
                            value={passwordForm.confirmPassword}
                            onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                          />
                        </div>
                        <button 
                          type="button"
                          className="update-button"
                          onClick={async () => {
                            if (!passwordForm.oldPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
                              alert('请填写所有密码字段');
                              return;
                            }
                            if (passwordForm.newPassword !== passwordForm.confirmPassword) {
                              alert('新密码和确认密码不匹配');
                              return;
                            }
                            if (passwordForm.newPassword.length < 6) {
                              alert('新密码长度至少6位');
                              return;
                            }
                            try {
                              const success = await updateFunctions.updatePassword(passwordForm.oldPassword, passwordForm.newPassword);
                              if (success) {
                                alert('密码修改成功！');
                                setPasswordForm({oldPassword: '', newPassword: '', confirmPassword: ''});
                              } else {
                                alert('密码修改失败，请检查当前密码是否正确');
                              }
                            } catch (error) {
                              alert('密码修改过程中发生错误，请重试');
                            }
                          }}
                        >
                          更新密码
                        </button>
                      </form>
                    </div>

                    <div className="settings-card danger">
                      <h3>危险操作</h3>
                      <div className="danger-zone">
                        <button 
                          className="danger-button"
                          onClick={() => {
                            if (confirm('确定要退出算天门吗？这将清除您在本门派的所有数据！')) {
                              if (confirm('此操作不可撤销，确定要继续吗？')) {
                                logout();
                              }
                            }
                          }}
                        >
                          退出门派
                        </button>
                        <p className="danger-warning">注意：退出门派将清除您的所有数据，且不可恢复！</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <style jsx>{`
              .sect-page {
                min-height: 100vh;
                background: linear-gradient(135deg, #000000 0%, #2a1a0a 50%, #3a2a1a 100%);
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
                background: rgba(255, 107, 53, 0.1);
                border: 1px solid rgba(255, 107, 53, 0.3);
                color: #ff6b35;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.3s ease;
              }

              .back-button:hover {
                background: rgba(255, 107, 53, 0.2);
              }

              .sect-header {
                text-align: center;
                margin-bottom: 3rem;
              }

              .sect-emblem {
                width: 100px;
                height: 100px;
                background: #ff6b35;
                color: #000;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3rem;
                font-weight: bold;
                margin: 0 auto 1.5rem;
                box-shadow: 0 0 40px rgba(255, 107, 53, 0.4);
              }

              .sect-title {
                font-size: 3.5rem;
                margin-bottom: 0.5rem;
                color: #ff6b35;
                text-shadow: 0 0 30px rgba(255, 107, 53, 0.5);
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
                background: rgba(255, 107, 53, 0.1);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 107, 53, 0.2);
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
                color: #ff6b35;
              }

              .user-level, .user-points {
                background: rgba(255, 107, 53, 0.1);
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
                background: rgba(255, 107, 53, 0.1);
                color: #ff6b35;
              }

              .tab-item.active {
                background: rgba(255, 107, 53, 0.15);
                border-color: rgba(255, 107, 53, 0.3);
                color: #ff6b35;
              }

              .tab-icon {
                font-size: 1.2rem;
              }

              .tab-label {
                font-size: 1.2rem;
                font-weight: 600;
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
                color: #ff6b35;
                font-size: 2.2rem;
                margin-bottom: 1rem;
              }

              .cultivation-content h3 {
                color: #ff6b35;
                margin-bottom: 1.5rem;
                font-size: 1.5rem;
              }

              .course-list {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
              }

              .course-item {
                background: rgba(255, 107, 53, 0.05);
                border: 1px solid rgba(255, 107, 53, 0.1);
                padding: 1.5rem;
                border-radius: 12px;
                display: flex;
                gap: 1rem;
                transition: all 0.3s ease;
              }

              .course-item:hover {
                background: rgba(255, 107, 53, 0.1);
                transform: translateY(-2px);
              }

              .course-icon {
                font-size: 2rem;
                flex-shrink: 0;
              }

              .course-info h4 {
                color: #ff6b35;
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

              /* 任务看板样式 */
              .tasks-section, .suggestions-section {
                background: rgba(0, 0, 0, 0.3);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                padding: 2rem;
              }

              .section-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
              }

              .section-header h2 {
                color: #ff6b35;
                margin: 0;
              }

              .create-button, .submit-btn {
                background: rgba(255, 107, 53, 0.2);
                border: 1px solid rgba(255, 107, 53, 0.4);
                color: #ff6b35;
                padding: 0.6rem 1.5rem;
                border-radius: 6px;
                cursor: pointer;
                font-size: 1rem;
                transition: all 0.3s ease;
              }

              .create-button:hover, .submit-btn:hover {
                background: rgba(255, 107, 53, 0.3);
                transform: translateY(-1px);
              }

              .filter-controls {
                display: flex;
                gap: 1rem;
                margin-bottom: 2rem;
              }

              .filter-controls select {
                background: rgba(255, 107, 53, 0.1);
                border: 1px solid rgba(255, 107, 53, 0.3);
                color: #fff;
                padding: 0.5rem;
                border-radius: 6px;
              }

              .tasks-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                gap: 1.5rem;
              }

              .task-card, .suggestion-card {
                background: rgba(255, 107, 53, 0.05);
                border: 1px solid rgba(255, 107, 53, 0.1);
                border-radius: 12px;
                padding: 1.5rem;
                transition: all 0.3s ease;
              }

              .task-card:hover, .suggestion-card:hover {
                background: rgba(255, 107, 53, 0.1);
                transform: translateY(-2px);
              }

              .task-header, .suggestion-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
              }

              .task-header h3, .suggestion-header h3 {
                color: #ff6b35;
                margin: 0;
              }

              .task-actions, .suggestion-actions {
                display: flex;
                gap: 0.5rem;
              }

              .edit-btn, .delete-btn {
                background: rgba(255, 107, 53, 0.1);
                border: 1px solid rgba(255, 107, 53, 0.3);
                color: #ff6b35;
                padding: 0.3rem 0.6rem;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.8rem;
                transition: all 0.3s ease;
              }

              .edit-btn:hover, .delete-btn:hover {
                background: rgba(255, 107, 53, 0.2);
              }

              .task-meta, .suggestion-meta {
                display: flex;
                gap: 1rem;
                margin-bottom: 1rem;
                flex-wrap: wrap;
              }

              .task-priority, .suggestion-priority {
                padding: 0.2rem 0.6rem;
                border-radius: 12px;
                font-size: 0.8rem;
              }

              .priority-高 {
                background: rgba(255, 0, 0, 0.2);
                color: #ff6b6b;
              }

              .priority-中 {
                background: rgba(255, 165, 0, 0.2);
                color: #ffa500;
              }

              .priority-低 {
                background: rgba(0, 255, 0, 0.2);
                color: #00ff00;
              }

              .task-status {
                padding: 0.2rem 0.6rem;
                border-radius: 12px;
                font-size: 0.8rem;
              }

              .status-规划中 {
                background: rgba(128, 128, 128, 0.2);
                color: #888;
              }

              .status-进行中 {
                background: rgba(0, 123, 255, 0.2);
                color: #007bff;
              }

              .status-完成 {
                background: rgba(40, 167, 69, 0.2);
                color: #28a745;
              }

              .status-暂停 {
                background: rgba(255, 193, 7, 0.2);
                color: #ffc107;
              }

              .task-sect {
                background: rgba(255, 107, 53, 0.2);
                color: #ff6b35;
                padding: 0.2rem 0.6rem;
                border-radius: 12px;
                font-size: 0.8rem;
              }

              .progress-bar {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                height: 8px;
                overflow: hidden;
                margin-top: 0.5rem;
              }

              .progress-fill {
                background: #ff6b35;
                height: 100%;
                transition: width 0.3s ease;
              }

              .task-tags, .suggestion-tags {
                display: flex;
                gap: 0.5rem;
                margin-top: 1rem;
                flex-wrap: wrap;
              }

              .tag {
                background: rgba(255, 107, 53, 0.2);
                color: #ff6b35;
                padding: 0.2rem 0.6rem;
                border-radius: 12px;
                font-size: 0.8rem;
              }

              .modal-overlay {
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
              }

              .modal-content {
                background: rgba(0, 0, 0, 0.9);
                border: 1px solid rgba(255, 107, 53, 0.3);
                border-radius: 12px;
                padding: 2rem;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
              }

              .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
              }

              .modal-header h3 {
                color: #ff6b35;
                margin: 0;
              }

              .close-btn {
                background: none;
                border: none;
                color: #fff;
                font-size: 1.5rem;
                cursor: pointer;
              }

              .form-group {
                margin-bottom: 1rem;
              }

              .form-row {
                display: flex;
                gap: 1rem;
              }

              .form-row .form-group {
                flex: 1;
              }

              .form-group label {
                display: block;
                color: #ff6b35;
                margin-bottom: 0.5rem;
                font-weight: 500;
              }

              .form-group input, .form-group textarea, .form-group select {
                width: 100%;
                background: rgba(255, 107, 53, 0.1);
                border: 1px solid rgba(255, 107, 53, 0.3);
                color: #fff;
                padding: 0.8rem;
                border-radius: 6px;
                font-size: 1rem;
              }

              .form-group textarea {
                resize: vertical;
                min-height: 100px;
              }

              .form-actions {
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
                margin-top: 1.5rem;
              }

              .cancel-btn {
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.3);
                color: #fff;
                padding: 0.6rem 1.5rem;
                border-radius: 6px;
                cursor: pointer;
              }

              /* 建议讨论样式 */
              .suggestion-form {
                background: rgba(255, 107, 53, 0.05);
                border: 1px solid rgba(255, 107, 53, 0.1);
                border-radius: 12px;
                padding: 1.5rem;
                margin-bottom: 2rem;
              }

              .suggestion-form h3 {
                color: #ff6b35;
                margin-bottom: 1rem;
              }

              .suggestions-list {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
              }

              .suggestion-author {
                color: #ff6b35;
                font-weight: 500;
              }

              .suggestion-time {
                color: #999;
                font-size: 0.9rem;
              }

              .suggestion-content {
                margin: 1rem 0;
                line-height: 1.6;
              }

              .suggestion-stats {
                display: flex;
                gap: 1rem;
                margin: 1rem 0;
              }

              .like-btn {
                background: rgba(255, 107, 53, 0.1);
                border: 1px solid rgba(255, 107, 53, 0.3);
                color: #ff6b35;
                padding: 0.4rem 0.8rem;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.9rem;
              }

              .comment-count {
                color: #999;
                font-size: 0.9rem;
                display: flex;
                align-items: center;
              }

              .comments-section {
                margin-top: 1rem;
                padding-top: 1rem;
                border-top: 1px solid rgba(255, 107, 53, 0.2);
              }

              .comments-section h4 {
                color: #ff6b35;
                margin-bottom: 1rem;
              }

              .comment {
                background: rgba(0, 0, 0, 0.3);
                border-radius: 8px;
                padding: 1rem;
                margin-bottom: 1rem;
              }

              .comment-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 0.5rem;
              }

              .comment-author {
                color: #ff6b35;
                font-weight: 500;
              }

              .comment-time {
                color: #999;
                font-size: 0.8rem;
              }

              .add-comment {
                margin-top: 1rem;
              }

              .add-comment textarea {
                width: 100%;
                background: rgba(255, 107, 53, 0.1);
                border: 1px solid rgba(255, 107, 53, 0.3);
                color: #fff;
                padding: 0.8rem;
                border-radius: 6px;
                resize: vertical;
                min-height: 80px;
                margin-bottom: 0.5rem;
              }

              .header-actions {
                display: flex;
                gap: 1rem;
                align-items: center;
              }

              .clear-btn {
                background: rgba(255, 0, 0, 0.1);
                border: 1px solid rgba(255, 0, 0, 0.3);
                color: #ff6b6b;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.9rem;
              }

              /* 个人中心样式 */
              .profile-section h2,
              .settings-section h2 {
                color: #ff6b35;
                margin-bottom: 2rem;
                font-size: 2rem;
              }

              .profile-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 2rem;
              }

              .profile-card {
                background: rgba(255, 107, 53, 0.05);
                border: 1px solid rgba(255, 107, 53, 0.1);
                border-radius: 12px;
                padding: 2rem;
              }

              .card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
              }

              .profile-card h3 {
                color: #ff6b35;
                margin-bottom: 1.5rem;
              }

              .edit-button {
                background: rgba(255, 107, 53, 0.1);
                border: 1px solid rgba(255, 107, 53, 0.3);
                color: #ff6b35;
                padding: 0.4rem 0.8rem;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.9rem;
                transition: all 0.3s ease;
              }

              .edit-button:hover {
                background: rgba(255, 107, 53, 0.2);
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
                background: rgba(255, 107, 53, 0.1);
                border: 1px solid rgba(255, 107, 53, 0.3);
                color: #fff;
                padding: 0.4rem 0.8rem;
                border-radius: 6px;
                font-size: 1rem;
                max-width: 200px;
              }

              .edit-input:focus {
                outline: none;
                border-color: #ff6b35;
                box-shadow: 0 0 10px rgba(255, 107, 53, 0.3);
              }

              .edit-actions {
                margin-top: 1.5rem;
                text-align: right;
              }

              .save-button {
                background: rgba(255, 107, 53, 0.2);
                border: 1px solid rgba(255, 107, 53, 0.4);
                color: #ff6b35;
                padding: 0.6rem 1.5rem;
                border-radius: 6px;
                cursor: pointer;
                font-size: 1rem;
                transition: all 0.3s ease;
              }

              .save-button:hover {
                background: rgba(255, 107, 53, 0.3);
                transform: translateY(-1px);
              }

              /* 设置页面样式 */
              .settings-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 2rem;
              }

              .settings-card {
                background: rgba(255, 107, 53, 0.05);
                border: 1px solid rgba(255, 107, 53, 0.1);
                border-radius: 12px;
                padding: 2rem;
              }

              .settings-card.danger {
                background: rgba(255, 0, 0, 0.05);
                border-color: rgba(255, 0, 0, 0.1);
              }

              .settings-card h3 {
                color: #ff6b35;
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
                border-color: #ff6b35;
                box-shadow: 0 0 10px rgba(255, 107, 53, 0.3);
              }

              .update-button {
                background: rgba(255, 107, 53, 0.2);
                border: 1px solid rgba(255, 107, 53, 0.4);
                color: #ff6b35;
                padding: 0.8rem 1.5rem;
                border-radius: 6px;
                cursor: pointer;
                font-size: 1rem;
                transition: all 0.3s ease;
                margin-top: 1rem;
              }

              .update-button:hover {
                background: rgba(255, 107, 53, 0.3);
                transform: translateY(-1px);
              }

              .security-options {
                margin-bottom: 1.5rem;
              }

              .security-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.5rem;
              }

              .security-item label {
                font-weight: 600;
              }

              .security-item .switch {
                position: relative;
                display: inline-size;
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
                background-color: #ff6b35;
              }

              .security-item input:focus + .slider {
                box-shadow: 0 0 1px #ff6b35;
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
                  flex-wrap: wrap;
                }

                .tab-item {
                  min-width: calc(50% - 0.5rem);
                }

                .tasks-grid {
                  grid-template-columns: 1fr;
                }

                .form-row {
                  flex-direction: column;
                }

                .filter-controls {
                  flex-wrap: wrap;
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