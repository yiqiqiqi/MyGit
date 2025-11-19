import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../../components/Layout';
import SectAuth from '../../../components/SectAuthNew';

export default function ShujuMenPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  return (
    <Layout title="EEnous - 数据门·数据智能宗">
      <SectAuth 
        sectId="shuju"
        renderContent={(user, logout, updateFunctions) => {
          if (!editForm.sectNickname) {
            setEditForm({
              sectNickname: user.sectNickname,
              globalNickname: user.globalNickname,
            });
          }

          return (
          <div className="sect-page shuju-sect">
            <div className="sect-container">
              <div className="sect-nav">
                <button onClick={() => router.push('/software-dao')} className="back-button">
                  ← 返回软件武林
                </button>
              </div>

              <div className="sect-header">
                <div className="sect-emblem">数</div>
                <h1 className="sect-title">数据门</h1>
                <p className="sect-subtitle">数据智能宗</p>
                <div className="sect-slogan">数据神算·数据智能术</div>
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

              {/* 门派大厅内容 */}
              {activeTab === 'home' && (
              <div className="sect-content">
                <div className="welcome-section">
                  <h2>欢迎回来，{user.sectNickname}师兄</h2>
                  <p>你已成功拜入数据门·数据智能宗</p>
                </div>

                <div className="cultivation-content">
                  <h3>修炼课程</h3>
                  <div className="course-list">
                    
                    <div className="course-item">
                      <div className="course-icon">📊</div>
                      <div className="course-info">
                        <h4>大数据处理技术</h4>
                        <p>掌握Hadoop、Spark、Kafka等大数据技术栈</p>
                        <span className="course-status">即将开放</span>
                      </div>
                    </div>
                    
                    <div className="course-item">
                      <div className="course-icon">🗄️</div>
                      <div className="course-info">
                        <h4>数据库设计与优化</h4>
                        <p>学习MySQL、MongoDB、Redis等数据库技术</p>
                        <span className="course-status">即将开放</span>
                      </div>
                    </div>
                    
                    <div className="course-item">
                      <div className="course-icon">📈</div>
                      <div className="course-info">
                        <h4>数据可视化与BI</h4>
                        <p>掌握数据分析、报表设计、可视化技术</p>
                        <span className="course-status">即将开放</span>
                      </div>
                    </div>
                  </div>
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
                          <span className="sect-badge">数据门</span>
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
                        {user.registeredSects && user.registeredSects.map(sid => (
                          <div key={sid} className="sect-item">
                            <span className="sect-name">{sid === 'shuju' ? '数据门' : sid}</span>
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

            <style jsx>{`
              .sect-page {
                min-height: 100vh;
                background: undefined;
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
                background: rgba(76, 175, 80, 0.1);
                border: 1px solid rgba(76, 175, 80, 0.3);
                color: #4caf50;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.3s ease;
              }

              .back-button:hover {
                background: rgba(76, 175, 80, 0.2);
              }

              .sect-header {
                text-align: center;
                margin-bottom: 3rem;
              }

              .sect-emblem {
                width: 100px;
                height: 100px;
                background: #4caf50;
                color: #000;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3rem;
                font-weight: bold;
                margin: 0 auto 1.5rem;
                box-shadow: 0 0 40px rgba(76, 175, 80, 0.4);
              }

              .sect-title {
                font-size: 3.5rem;
                margin-bottom: 0.5rem;
                color: #4caf50;
                text-shadow: 0 0 30px rgba(76, 175, 80, 0.5);
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
                background: rgba(76, 175, 80, 0.1);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(76, 175, 80, 0.2);
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
                color: #4caf50;
              }

              .user-level, .user-points {
                background: rgba(76, 175, 80, 0.1);
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
                background: rgba(76, 175, 80, 0.1);
                color: #4caf50;
              }

              .tab-item.active {
                background: rgba(76, 175, 80, 0.15);
                border-color: rgba(76, 175, 80, 0.3);
                color: #4caf50;
              }

              .tab-icon {
                font-size: 1.2rem;
              }

              /* 个人中心样式 */
              .profile-section h2,
              .settings-section h2 {
                color: #4caf50;
                margin-bottom: 2rem;
                font-size: 2rem;
              }

              .profile-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 2rem;
              }

              .profile-card {
                background: rgba(76, 175, 80, 0.05);
                border: 1px solid rgba(76, 175, 80, 0.1);
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
                color: #4caf50;
                margin-bottom: 1.5rem;
              }

              .edit-button {
                background: rgba(76, 175, 80, 0.1);
                border: 1px solid rgba(76, 175, 80, 0.3);
                color: #4caf50;
                padding: 0.4rem 0.8rem;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.9rem;
                transition: all 0.3s ease;
              }

              .edit-button:hover {
                background: rgba(76, 175, 80, 0.2);
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
                background: rgba(76, 175, 80, 0.1);
                border: 1px solid rgba(76, 175, 80, 0.3);
                color: #fff;
                padding: 0.4rem 0.8rem;
                border-radius: 6px;
                font-size: 1rem;
                max-width: 200px;
              }

              .edit-input:focus {
                outline: none;
                border-color: #4caf50;
                box-shadow: 0 0 10px rgba(76, 175, 80, 0.3);
              }

              .edit-actions {
                margin-top: 1.5rem;
                text-align: right;
              }

              .save-button {
                background: rgba(76, 175, 80, 0.2);
                border: 1px solid rgba(76, 175, 80, 0.4);
                color: #4caf50;
                padding: 0.6rem 1.5rem;
                border-radius: 6px;
                cursor: pointer;
                font-size: 1rem;
                transition: all 0.3s ease;
              }

              .save-button:hover {
                background: rgba(76, 175, 80, 0.3);
                transform: translateY(-1px);
              }

              .sect-badge {
                background: rgba(76, 175, 80, 0.2);
                color: #4caf50;
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
                background: rgba(76, 175, 80, 0.1);
                border: 1px solid rgba(76, 175, 80, 0.3);
                color: #4caf50;
                padding: 0.4rem 1rem;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.9rem;
                transition: all 0.3s ease;
              }

              .switch-button:hover {
                background: rgba(76, 175, 80, 0.2);
              }

              /* 设置页面样式 */
              .settings-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 2rem;
              }

              .settings-card {
                background: rgba(76, 175, 80, 0.05);
                border: 1px solid rgba(76, 175, 80, 0.1);
                border-radius: 12px;
                padding: 2rem;
              }

              .settings-card.danger {
                background: rgba(255, 0, 0, 0.05);
                border-color: rgba(255, 0, 0, 0.1);
              }

              .settings-card h3 {
                color: #4caf50;
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
                border-color: #4caf50;
                box-shadow: 0 0 10px rgba(76, 175, 80, 0.3);
              }

              .update-button {
                background: rgba(76, 175, 80, 0.2);
                border: 1px solid rgba(76, 175, 80, 0.4);
                color: #4caf50;
                padding: 0.8rem 1.5rem;
                border-radius: 6px;
                cursor: pointer;
                font-size: 1rem;
                transition: all 0.3s ease;
                margin-top: 1rem;
              }

              .update-button:hover {
                background: rgba(76, 175, 80, 0.3);
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
                background-color: #4caf50;
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
                color: #4caf50;
                font-size: 2.2rem;
                margin-bottom: 1rem;
              }

              .cultivation-content h3 {
                color: #4caf50;
                margin-bottom: 1.5rem;
                font-size: 1.5rem;
              }

              .course-list {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
              }

              .course-item {
                background: rgba(76, 175, 80, 0.05);
                border: 1px solid rgba(76, 175, 80, 0.1);
                padding: 1.5rem;
                border-radius: 12px;
                display: flex;
                gap: 1rem;
                transition: all 0.3s ease;
              }

              .course-item:hover {
                background: rgba(76, 175, 80, 0.1);
                transform: translateY(-2px);
              }

              .course-icon {
                font-size: 2rem;
                flex-shrink: 0;
              }

              .course-info h4 {
                color: #4caf50;
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
              }
            `}</style>
          </div>
          );
        }}
      />
    </Layout>
  );
}