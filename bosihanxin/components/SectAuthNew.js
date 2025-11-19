import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// 门派配置数据
const sectConfigs = {
  tianyan: {
    name: '天眼门',
    subtitle: '感知天下宗',
    emblem: '灵',
    slogan: '慧眼神珠·万物感知术',
    primaryColor: '#00ff7f',
    secondaryColor: '#0a2a0a',
    bgGradient: 'linear-gradient(135deg, #000000 0%, #0a2a0a 50%, #1a3a1a 100%)',
    particles: 'sensing'
  },
  qianli: {
    name: '千里门',
    subtitle: '传音达意宗',
    emblem: '音',
    slogan: '千里神音·传音达意术',
    primaryColor: '#1e90ff',
    secondaryColor: '#0a1a2a',
    bgGradient: 'linear-gradient(135deg, #000000 0%, #0a1a2a 50%, #1a2a3a 100%)',
    particles: 'wave'
  },
  suantian: {
    name: '算天门',
    subtitle: '神机妙算宗',
    emblem: '计',
    slogan: '算天神珠·神机妙算术',
    primaryColor: '#ff6b35',
    secondaryColor: '#2a1a0a',
    bgGradient: 'linear-gradient(135deg, #000000 0%, #2a1a0a 50%, #3a2a1a 100%)',
    particles: 'compute'
  },
  yuqi: {
    name: '御器门',
    subtitle: '万物听令宗',
    emblem: '御',
    slogan: '控制神符·万物御令术',
    primaryColor: '#ff4757',
    secondaryColor: '#2a0a1a',
    bgGradient: 'linear-gradient(135deg, #000000 0%, #2a0a1a 50%, #3a1a2a 100%)',
    particles: 'control'
  },
  juneng: {
    name: '聚能门',
    subtitle: '天地储能宗',
    emblem: '能',
    slogan: '聚能神丹·天地聚能术',
    primaryColor: '#ffd700',
    secondaryColor: '#2a2a0a',
    bgGradient: 'linear-gradient(135deg, #000000 0%, #2a2a0a 50%, #3a3a1a 100%)',
    particles: 'energy'
  },
  ronghe: {
    name: '融合门',
    subtitle: '万法归宗派',
    emblem: '合',
    slogan: '融合宝镜·万法归一术',
    primaryColor: '#9c27b0',
    secondaryColor: '#2a0a2a',
    bgGradient: 'linear-gradient(135deg, #000000 0%, #2a0a2a 50%, #3a1a3a 100%)',
    particles: 'fusion'
  },
  tianji: {
    name: '天机门',
    subtitle: '算法天机宗',
    emblem: '算',
    slogan: '天机宝鉴·天机算法术',
    primaryColor: '#8a2be2',
    secondaryColor: '#1a0a2a',
    bgGradient: 'linear-gradient(135deg, #000000 0%, #1a0a2a 50%, #2a1a3a 100%)',
    particles: 'matrix'
  },
  huanxiang: {
    name: '幻象门',
    subtitle: '用户体验宗',
    emblem: '幻',
    slogan: '体验神瞳·用户幻象术',
    primaryColor: '#ff69b4',
    secondaryColor: '#2a0a1a',
    bgGradient: 'linear-gradient(135deg, #000000 0%, #2a0a1a 50%, #3a1a2a 100%)',
    particles: 'illusion'
  },
  yunxiao: {
    name: '云霄门',
    subtitle: '云端逍遥宗',
    emblem: '云',
    slogan: '云霄神驾·云端逍遥术',
    primaryColor: '#87ceeb',
    secondaryColor: '#0a1a2a',
    bgGradient: 'linear-gradient(135deg, #000000 0%, #0a1a2a 50%, #1a2a3a 100%)',
    particles: 'cloud'
  },
  jiagou: {
    name: '架构门',
    subtitle: '平台统御宗',
    emblem: '构',
    slogan: '统御宝塔·平台统御术',
    primaryColor: '#ff8c00',
    secondaryColor: '#2a1a0a',
    bgGradient: 'linear-gradient(135deg, #000000 0%, #2a1a0a 50%, #3a2a1a 100%)',
    particles: 'architecture'
  },
  shuju: {
    name: '数据门',
    subtitle: '洞察万象宗',
    emblem: '数',
    slogan: '洞察神镜·数据洞察术',
    primaryColor: '#32cd32',
    secondaryColor: '#0a2a0a',
    bgGradient: 'linear-gradient(135deg, #000000 0%, #0a2a0a 50%, #1a3a1a 100%)',
    particles: 'data'
  },
  zhihui: {
    name: '智慧门',
    subtitle: '人工智能宗',
    emblem: '智',
    slogan: '智慧神光·人工智能术',
    primaryColor: '#ffd700',
    secondaryColor: '#2a2a0a',
    bgGradient: 'linear-gradient(135deg, #000000 0%, #2a2a0a 50%, #3a3a1a 100%)',
    particles: 'ai'
  }
};

// API 工具函数
const api = {
  async post(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || '请求失败');
    }
    
    return result;
  },

  async register(qq, globalNickname, password, sectId, sectNickname, sectPassword) {
    return this.post('/api/auth/register', {
      qq, globalNickname, password, sectId, sectNickname, sectPassword
    });
  },

  async login(qq, password, sectId, sectPassword) {
    return this.post('/api/auth/login', {
      qq, password, sectId, sectPassword
    });
  },

  async verify(sessionToken) {
    return this.post('/api/auth/verify', { sessionToken });
  },

  async logout(sessionToken) {
    return this.post('/api/auth/logout', { sessionToken });
  },

  async updateUser(sessionToken, action, data) {
    return this.post('/api/auth/update', {
      sessionToken, action, ...data
    });
  }
};

const SectAuthNew = ({ sectId, onLoginSuccess, children, renderContent }) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState('login'); // login, register, success
  const [qq, setQq] = useState('');
  const [password, setPassword] = useState('');
  const [globalNickname, setGlobalNickname] = useState('');
  const [sectNickname, setSectNickname] = useState('');
  const [sectPassword, setSectPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionToken, setSessionToken] = useState('');

  const sectConfig = sectConfigs[sectId] || sectConfigs.tianyan;

  // 检查登录状态
  useEffect(() => {
    const savedToken = localStorage.getItem(`session_token_${sectId}`);
    if (savedToken) {
      verifySession(savedToken);
    }
  }, [sectId]);

  // 验证会话
  const verifySession = async (token) => {
    try {
      const result = await api.verify(token);
      if (result.success) {
        setUser(result.user);
        setSessionToken(token);
        setIsLoggedIn(true);
        onLoginSuccess && onLoginSuccess(result.user);
      } else {
        localStorage.removeItem(`session_token_${sectId}`);
      }
    } catch (error) {
      localStorage.removeItem(`session_token_${sectId}`);
    }
  };

  // QQ号验证
  const validateQQ = (qqNum) => {
    return /^\d{5,12}$/.test(qqNum);
  };

  // 密码强度验证
  const validatePassword = (pwd) => {
    return pwd.length >= 6;
  };

  // 处理登录
  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      if (!validateQQ(qq)) {
        throw new Error('请输入正确的QQ号（5-12位数字）');
      }

      if (!password) {
        throw new Error('请输入密码');
      }

      if (!sectPassword) {
        throw new Error('请输入门派密码');
      }

      const result = await api.login(qq, password, sectId, sectPassword);
      
      if (result.success) {
        setUser(result.user);
        setSessionToken(result.sessionToken);
        setIsLoggedIn(true);
        setCurrentStep('success');
        
        // 保存会话令牌
        localStorage.setItem(`session_token_${sectId}`, result.sessionToken);
        
        onLoginSuccess && onLoginSuccess(result.user);
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 处理注册
  const handleRegister = async () => {
    setError('');
    setLoading(true);

    try {
      if (!validateQQ(qq)) {
        throw new Error('请输入正确的QQ号（5-12位数字）');
      }

      if (!validatePassword(password)) {
        throw new Error('密码至少6位字符');
      }

      if (!validatePassword(sectPassword)) {
        throw new Error('门派密码至少6位字符');
      }

      if (!globalNickname.trim()) {
        throw new Error('请输入全局昵称');
      }

      if (!sectNickname.trim()) {
        throw new Error('请输入门派昵称');
      }

      const result = await api.register(
        qq, 
        globalNickname.trim(), 
        password, 
        sectId, 
        sectNickname.trim(), 
        sectPassword
      );
      
      if (result.success) {
        setUser(result.user);
        setSessionToken(result.sessionToken);
        setIsLoggedIn(true);
        setCurrentStep('success');
        
        // 保存会话令牌
        localStorage.setItem(`session_token_${sectId}`, result.sessionToken);
        
        onLoginSuccess && onLoginSuccess(result.user);
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 处理登出
  const handleLogout = async () => {
    try {
      if (sessionToken) {
        await api.logout(sessionToken);
      }
    } catch (error) {
      console.error('登出API调用失败:', error);
    } finally {
      // 清理本地状态
      localStorage.removeItem(`session_token_${sectId}`);
      setUser(null);
      setIsLoggedIn(false);
      setCurrentStep('login');
      setSessionToken('');
      setQq('');
      setPassword('');
      setSectPassword('');
      setGlobalNickname('');
      setSectNickname('');
      setError('');
    }
  };

  // 更新功能
  const updateFunctions = {
    updateGlobalNickname: async (newNickname) => {
      try {
        const result = await api.updateUser(sessionToken, 'updateGlobalNickname', {
          newNickname
        });
        if (result.success) {
          setUser({...user, globalNickname: newNickname});
          return true;
        }
        return false;
      } catch (error) {
        console.error('更新全局昵称失败:', error);
        return false;
      }
    },

    updateSectNickname: async (newNickname) => {
      try {
        const result = await api.updateUser(sessionToken, 'updateSectNickname', {
          newNickname
        });
        if (result.success) {
          setUser({...user, sectNickname: newNickname});
          return true;
        }
        return false;
      } catch (error) {
        console.error('更新门派昵称失败:', error);
        return false;
      }
    },

    updatePassword: async (oldPassword, newPassword) => {
      try {
        const result = await api.updateUser(sessionToken, 'changePassword', {
          oldPassword, newPassword
        });
        return result.success;
      } catch (error) {
        console.error('更新密码失败:', error);
        throw error;
      }
    },

    updateSectPassword: async (oldPassword, newPassword) => {
      try {
        const result = await api.updateUser(sessionToken, 'changeSectPassword', {
          oldPassword, newPassword
        });
        return result.success;
      } catch (error) {
        console.error('更新门派密码失败:', error);
        throw error;
      }
    }
  };

  // 如果已登录，渲染内容
  if (isLoggedIn && user) {
    // 支持新的 renderContent API
    if (renderContent) {
      return renderContent(user, handleLogout, updateFunctions);
    }
    
    // 支持传统的 children API
    if (children) {
      return children;
    }

    // 默认的成功页面
    return (
      <div className="member-area">
        <div className="user-info-bar">
          <div className="user-details">
            <span className="user-nickname">{user.sectNickname}</span>
            <span className="user-level">{user.cultivationLevel}</span>
          </div>
          <button onClick={handleLogout} className="logout-btn">退出门派</button>
        </div>
        
        <div className="welcome-section">
          <h2>欢迎回来，{user.sectNickname}师兄</h2>
          <p>你已成功拜入{sectConfig.name}·{sectConfig.subtitle}</p>
          <div className="member-status">
            <span className="cultivation-level">修炼境界：{user.cultivationLevel}</span>
            <span className="join-time">入门时间：{new Date(user.joinTime).toLocaleDateString()}</span>
            <span className="sect-points">门派积分：{user.sectPoints}</span>
          </div>
        </div>

        <div className="sect-content">
          <div className="content-placeholder">
            <h3>修炼内容</h3>
            <p>门派修炼系统正在构建中...</p>
          </div>
        </div>

        <style jsx>{`
          .member-area {
            min-height: 100vh;
            background: ${sectConfig.bgGradient};
            padding: 2rem;
          }

          .user-info-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: rgba(0, 0, 0, 0.7);
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 2rem;
          }

          .user-details {
            display: flex;
            gap: 1rem;
            align-items: center;
          }

          .user-nickname {
            color: ${sectConfig.primaryColor};
            font-weight: bold;
          }

          .user-level {
            color: #ccc;
            font-size: 0.9rem;
          }

          .logout-btn {
            background: rgba(255, 0, 0, 0.2);
            border: 1px solid rgba(255, 0, 0, 0.3);
            color: #ff6b6b;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .logout-btn:hover {
            background: rgba(255, 0, 0, 0.3);
          }

          .welcome-section {
            background: rgba(0, 0, 0, 0.7);
            padding: 2rem;
            border-radius: 8px;
            margin-bottom: 2rem;
            text-align: center;
          }

          .welcome-section h2 {
            color: ${sectConfig.primaryColor};
            margin-bottom: 1rem;
          }

          .welcome-section p {
            color: #ccc;
            margin-bottom: 1.5rem;
          }

          .member-status {
            display: flex;
            justify-content: center;
            gap: 2rem;
            flex-wrap: wrap;
          }

          .member-status span {
            color: #999;
            font-size: 0.9rem;
          }

          .sect-content {
            background: rgba(0, 0, 0, 0.7);
            padding: 2rem;
            border-radius: 8px;
          }

          .content-placeholder {
            text-align: center;
            color: #ccc;
          }

          .content-placeholder h3 {
            color: ${sectConfig.primaryColor};
            margin-bottom: 1rem;
          }
        `}</style>
      </div>
    );
  }

  // 登录/注册界面
  return (
    <div className="sect-auth-container">
      <div className="auth-card">
        <div className="sect-header">
          <div className="sect-emblem">{sectConfig.emblem}</div>
          <h1 className="sect-title">{sectConfig.name}</h1>
          <p className="sect-subtitle">{sectConfig.subtitle}</p>
          <div className="sect-slogan">{sectConfig.slogan}</div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {currentStep === 'login' && (
          <div className="auth-form">
            <h2>拜师入门</h2>
            <p>已有账号？请输入QQ号和密码登录</p>
            
            <div className="input-group">
              <label>QQ号</label>
              <input
                type="text"
                value={qq}
                onChange={(e) => setQq(e.target.value.replace(/\D/g, ''))}
                placeholder="请输入QQ号"
                maxLength={12}
              />
            </div>

            <div className="input-group">
              <label>全局密码</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入全局密码"
              />
            </div>

            <div className="input-group">
              <label>门派密码</label>
              <input
                type="password"
                value={sectPassword}
                onChange={(e) => setSectPassword(e.target.value)}
                placeholder="请输入门派密码"
              />
            </div>

            <div className="button-group">
              <button 
                onClick={handleLogin} 
                disabled={loading || !qq || !password || !sectPassword}
                className="primary-btn"
              >
                {loading ? '验证中...' : '登录门派'}
              </button>
              <button 
                onClick={() => setCurrentStep('register')}
                className="secondary-btn"
              >
                新用户注册
              </button>
            </div>
          </div>
        )}

        {currentStep === 'register' && (
          <div className="auth-form">
            <h2>新弟子入门</h2>
            <p>首次加入{sectConfig.name}，请填写以下信息</p>
            
            <div className="input-group">
              <label>QQ号</label>
              <input
                type="text"
                value={qq}
                onChange={(e) => setQq(e.target.value.replace(/\D/g, ''))}
                placeholder="请输入QQ号"
                maxLength={12}
              />
            </div>

            <div className="input-group">
              <label>全局昵称</label>
              <input
                type="text"
                value={globalNickname}
                onChange={(e) => setGlobalNickname(e.target.value)}
                placeholder="在所有门派中显示的昵称"
                maxLength={20}
              />
            </div>

            <div className="input-group">
              <label>全局密码</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="设置全局密码（至少6位）"
              />
            </div>

            <div className="input-group">
              <label>门派昵称</label>
              <input
                type="text"
                value={sectNickname}
                onChange={(e) => setSectNickname(e.target.value)}
                placeholder={`在${sectConfig.name}中的昵称`}
                maxLength={20}
              />
            </div>

            <div className="input-group">
              <label>门派密码</label>
              <input
                type="password"
                value={sectPassword}
                onChange={(e) => setSectPassword(e.target.value)}
                placeholder="设置门派密码（至少6位）"
              />
            </div>

            <div className="button-group">
              <button 
                onClick={handleRegister} 
                disabled={loading || !qq || !password || !sectPassword || !globalNickname || !sectNickname}
                className="primary-btn"
              >
                {loading ? '注册中...' : '确认入门'}
              </button>
              <button 
                onClick={() => setCurrentStep('login')}
                className="secondary-btn"
              >
                返回登录
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .sect-auth-container {
          min-height: 100vh;
          background: ${sectConfig.bgGradient};
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
        }

        .auth-card {
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 3rem;
          max-width: 500px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .sect-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .sect-emblem {
          width: 80px;
          height: 80px;
          background: ${sectConfig.primaryColor};
          color: #000;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: bold;
          margin: 0 auto 1rem;
          box-shadow: 0 0 30px ${sectConfig.primaryColor}40;
        }

        .sect-title {
          color: ${sectConfig.primaryColor};
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          text-shadow: 0 0 20px ${sectConfig.primaryColor};
        }

        .sect-subtitle {
          color: #ccc;
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }

        .sect-slogan {
          color: #999;
          font-style: italic;
          font-size: 1rem;
        }

        .error-message {
          background: rgba(255, 0, 0, 0.1);
          border: 1px solid rgba(255, 0, 0, 0.3);
          color: #ff6b6b;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .auth-form h2 {
          color: #fff;
          margin-bottom: 0.5rem;
        }

        .auth-form p {
          color: #ccc;
          margin-bottom: 2rem;
        }

        .input-group {
          margin-bottom: 1.5rem;
        }

        .input-group label {
          display: block;
          color: #ccc;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .input-group input {
          width: 100%;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #fff;
          font-size: 1rem;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .input-group input:focus {
          outline: none;
          border-color: ${sectConfig.primaryColor};
          box-shadow: 0 0 0 2px ${sectConfig.primaryColor}20;
        }

        .input-group input::placeholder {
          color: #666;
        }

        .button-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 2rem;
        }

        .primary-btn {
          background: linear-gradient(45deg, ${sectConfig.primaryColor}, ${sectConfig.primaryColor}90);
          border: none;
          color: #000;
          padding: 1rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .primary-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px ${sectConfig.primaryColor}40;
        }

        .primary-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .secondary-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #ccc;
          padding: 1rem;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .secondary-btn:hover {
          border-color: ${sectConfig.primaryColor};
          color: ${sectConfig.primaryColor};
        }
      `}</style>
    </div>
  );
};

export default SectAuthNew; 