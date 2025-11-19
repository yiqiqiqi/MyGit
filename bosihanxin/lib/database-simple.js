const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// 数据文件路径
const dataDir = path.join(process.cwd(), 'data');
const usersFile = path.join(dataDir, 'users.json');
const sectUsersFile = path.join(dataDir, 'sect-users.json');
const sessionsFile = path.join(dataDir, 'sessions.json');
const tasksFile = path.join(dataDir, 'tasks.json');
const suggestionsFile = path.join(dataDir, 'suggestions.json');

// 确保数据目录存在
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// 数据加载函数
const loadData = (filePath, defaultData = {}) => {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (error) {
    console.warn(`加载数据文件失败: ${filePath}`, error);
  }
  return defaultData;
};

// 数据保存函数
const saveData = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`保存数据文件失败: ${filePath}`, error);
    return false;
  }
};

// 生成唯一ID
const generateId = () => {
  return Date.now().toString() + '_' + Math.random().toString(36).substr(2, 9);
};

// 用户管理类
class UserManager {
  static getUsers() {
    return loadData(usersFile, {});
  }

  static saveUsers(users) {
    return saveData(usersFile, users);
  }

  // 注册新用户
  static async registerUser(qq, globalNickname, password) {
    try {
      const users = this.getUsers();
      
      if (users[qq]) {
        throw new Error('该QQ号已注册');
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const userId = generateId();
      
      users[qq] = {
        id: userId,
        qq,
        globalNickname,
        passwordHash,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastLogin: null,
        isActive: true
      };

      this.saveUsers(users);
      return { id: userId, qq, globalNickname };
    } catch (error) {
      throw error;
    }
  }

  // 验证用户登录
  static async validateUser(qq, password) {
    const users = this.getUsers();
    const user = users[qq];
    
    if (!user || !user.isActive) {
      throw new Error('用户不存在');
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new Error('密码错误');
    }

    // 更新最后登录时间
    user.lastLogin = new Date().toISOString();
    this.saveUsers(users);

    return {
      id: user.id,
      qq: user.qq,
      globalNickname: user.globalNickname,
      lastLogin: user.lastLogin
    };
  }

  // 获取用户信息
  static getUserByQQ(qq) {
    const users = this.getUsers();
    const user = users[qq];
    
    if (!user || !user.isActive) {
      return null;
    }

    return {
      id: user.id,
      qq: user.qq,
      globalNickname: user.globalNickname,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin
    };
  }

  // 更新全局昵称
  static updateGlobalNickname(qq, newNickname) {
    const users = this.getUsers();
    const user = users[qq];
    
    if (!user) {
      return false;
    }

    user.globalNickname = newNickname;
    user.updatedAt = new Date().toISOString();
    
    return this.saveUsers(users);
  }

  // 更改密码
  static async changePassword(qq, oldPassword, newPassword) {
    await this.validateUser(qq, oldPassword);
    
    const users = this.getUsers();
    const user = users[qq];
    
    if (!user) {
      return false;
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    user.passwordHash = newPasswordHash;
    user.updatedAt = new Date().toISOString();
    
    return this.saveUsers(users);
  }
}

// 门派用户管理类
class SectUserManager {
  static getSectUsers() {
    return loadData(sectUsersFile, {});
  }

  static saveSectUsers(sectUsers) {
    return saveData(sectUsersFile, sectUsers);
  }

  static getUserSectKey(userId, sectId) {
    return `${userId}_${sectId}`;
  }

  // 注册门派用户
  static async registerSectUser(userId, sectId, sectNickname, sectPassword) {
    try {
      const sectUsers = this.getSectUsers();
      const key = this.getUserSectKey(userId, sectId);
      
      if (sectUsers[key]) {
        throw new Error('该用户已加入此门派');
      }

      const sectPasswordHash = await bcrypt.hash(sectPassword, 10);
      
      sectUsers[key] = {
        id: generateId(),
        userId,
        sectId,
        sectNickname,
        sectPasswordHash,
        joinTime: new Date().toISOString(),
        cultivationLevel: '入门弟子',
        sectPoints: 0,
        lastLogin: null
      };

      this.saveSectUsers(sectUsers);
      return { id: sectUsers[key].id, userId, sectId, sectNickname };
    } catch (error) {
      throw error;
    }
  }

  // 验证门派登录
  static async validateSectUser(userId, sectId, sectPassword) {
    const sectUsers = this.getSectUsers();
    const key = this.getUserSectKey(userId, sectId);
    const sectUser = sectUsers[key];
    
    if (!sectUser) {
      throw new Error('未加入此门派');
    }

    const isValid = await bcrypt.compare(sectPassword, sectUser.sectPasswordHash);
    if (!isValid) {
      throw new Error('门派密码错误');
    }

    // 更新最后登录时间
    sectUser.lastLogin = new Date().toISOString();
    this.saveSectUsers(sectUsers);

    return sectUser;
  }

  // 获取用户的门派信息
  static getSectUser(userId, sectId) {
    const sectUsers = this.getSectUsers();
    const key = this.getUserSectKey(userId, sectId);
    return sectUsers[key] || null;
  }

  // 获取用户所有门派
  static getUserSects(userId) {
    const sectUsers = this.getSectUsers();
    const userSects = [];
    
    Object.values(sectUsers).forEach(sectUser => {
      if (sectUser.userId === userId) {
        userSects.push({
          sectId: sectUser.sectId,
          sectNickname: sectUser.sectNickname,
          cultivationLevel: sectUser.cultivationLevel,
          sectPoints: sectUser.sectPoints,
          joinTime: sectUser.joinTime,
          lastLogin: sectUser.lastLogin
        });
      }
    });
    
    return userSects;
  }

  // 更新门派昵称
  static updateSectNickname(userId, sectId, newNickname) {
    const sectUsers = this.getSectUsers();
    const key = this.getUserSectKey(userId, sectId);
    const sectUser = sectUsers[key];
    
    if (!sectUser) {
      return false;
    }

    sectUser.sectNickname = newNickname;
    return this.saveSectUsers(sectUsers);
  }

  // 更改门派密码
  static async changeSectPassword(userId, sectId, oldPassword, newPassword) {
    await this.validateSectUser(userId, sectId, oldPassword);
    
    const sectUsers = this.getSectUsers();
    const key = this.getUserSectKey(userId, sectId);
    const sectUser = sectUsers[key];
    
    if (!sectUser) {
      return false;
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    sectUser.sectPasswordHash = newPasswordHash;
    
    return this.saveSectUsers(sectUsers);
  }

  // 获取门派所有用户
  static getSectMembers(sectId) {
    const sectUsers = this.getSectUsers();
    const users = UserManager.getUsers();
    const members = [];
    
    Object.values(sectUsers).forEach(sectUser => {
      if (sectUser.sectId === sectId) {
        // 找到对应的全局用户信息
        const globalUser = Object.values(users).find(u => u.id === sectUser.userId);
        if (globalUser) {
          members.push({
            qq: globalUser.qq,
            globalNickname: globalUser.globalNickname,
            sectNickname: sectUser.sectNickname,
            cultivationLevel: sectUser.cultivationLevel,
            sectPoints: sectUser.sectPoints,
            joinTime: sectUser.joinTime,
            lastLogin: sectUser.lastLogin
          });
        }
      }
    });
    
    return members.sort((a, b) => new Date(a.joinTime) - new Date(b.joinTime));
  }
}

// 会话管理类
class SessionManager {
  static getSessions() {
    return loadData(sessionsFile, {});
  }

  static saveSessions(sessions) {
    return saveData(sessionsFile, sessions);
  }

  // 创建会话
  static createSession(userId, sectId) {
    const sessionToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7天过期
    
    const sessions = this.getSessions();
    sessions[sessionToken] = {
      userId,
      sectId,
      expiresAt: expiresAt.toISOString(),
      createdAt: new Date().toISOString()
    };
    
    this.saveSessions(sessions);
    return sessionToken;
  }

  // 验证会话
  static validateSession(sessionToken) {
    const sessions = this.getSessions();
    const session = sessions[sessionToken];
    
    if (!session) {
      return null;
    }

    // 检查是否过期
    if (new Date(session.expiresAt) <= new Date()) {
      delete sessions[sessionToken];
      this.saveSessions(sessions);
      return null;
    }

    // 获取用户信息
    const users = UserManager.getUsers();
    const user = Object.values(users).find(u => u.id === session.userId);
    
    if (!user) {
      delete sessions[sessionToken];
      this.saveSessions(sessions);
      return null;
    }

    return {
      user_id: session.userId,
      sect_id: session.sectId,
      qq: user.qq,
      global_nickname: user.globalNickname
    };
  }

  // 删除会话（登出）
  static deleteSession(sessionToken) {
    const sessions = this.getSessions();
    
    if (sessions[sessionToken]) {
      delete sessions[sessionToken];
      this.saveSessions(sessions);
      return true;
    }
    
    return false;
  }

  // 清理过期会话
  static cleanupExpiredSessions() {
    const sessions = this.getSessions();
    const now = new Date();
    let cleaned = 0;
    
    Object.keys(sessions).forEach(token => {
      if (new Date(sessions[token].expiresAt) <= now) {
        delete sessions[token];
        cleaned++;
      }
    });
    
    if (cleaned > 0) {
      this.saveSessions(sessions);
    }
    
    return cleaned;
  }
}

// 定期清理过期会话（每小时）
setInterval(() => {
  SessionManager.cleanupExpiredSessions();
}, 60 * 60 * 1000);

// 任务管理类
class TaskManager {
  static getTasks() {
    return loadData(tasksFile, []);
  }

  static saveTasks(tasks) {
    return saveData(tasksFile, tasks);
  }

  // 创建任务
  static createTask(taskData) {
    const tasks = this.getTasks();
    const newTask = {
      id: generateId(),
      ...taskData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    tasks.push(newTask);
    this.saveTasks(tasks);
    return newTask;
  }

  // 获取所有任务
  static getAllTasks() {
    return this.getTasks();
  }

  // 获取特定门派的任务
  static getTasksBySect(sectId) {
    const tasks = this.getTasks();
    return tasks.filter(task => task.sect === sectId);
  }

  // 获取特定用户创建的任务
  static getTasksByUser(userId) {
    const tasks = this.getTasks();
    return tasks.filter(task => task.createdBy === userId);
  }

  // 更新任务
  static updateTask(taskId, updateData) {
    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex === -1) {
      throw new Error('任务不存在');
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    this.saveTasks(tasks);
    return tasks[taskIndex];
  }

  // 删除任务
  static deleteTask(taskId) {
    const tasks = this.getTasks();
    const filteredTasks = tasks.filter(task => task.id !== taskId);
    
    if (filteredTasks.length === tasks.length) {
      throw new Error('任务不存在');
    }

    this.saveTasks(filteredTasks);
    return true;
  }
}

// 建议管理类
class SuggestionManager {
  static getSuggestions() {
    return loadData(suggestionsFile, []);
  }

  static saveSuggestions(suggestions) {
    return saveData(suggestionsFile, suggestions);
  }

  // 创建建议
  static createSuggestion(suggestionData) {
    const suggestions = this.getSuggestions();
    const newSuggestion = {
      id: generateId(),
      ...suggestionData,
      likes: 0,
      comments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    suggestions.unshift(newSuggestion); // 新建议放在最前面
    this.saveSuggestions(suggestions);
    return newSuggestion;
  }

  // 获取所有建议
  static getAllSuggestions() {
    return this.getSuggestions();
  }

  // 获取特定门派的建议
  static getSuggestionsBySect(sectId) {
    const suggestions = this.getSuggestions();
    return suggestions.filter(suggestion => suggestion.sect === sectId);
  }

  // 获取特定用户创建的建议
  static getSuggestionsByUser(userId) {
    const suggestions = this.getSuggestions();
    return suggestions.filter(suggestion => suggestion.authorId === userId);
  }

  // 更新建议
  static updateSuggestion(suggestionId, updateData) {
    const suggestions = this.getSuggestions();
    const suggestionIndex = suggestions.findIndex(suggestion => suggestion.id === suggestionId);
    
    if (suggestionIndex === -1) {
      throw new Error('建议不存在');
    }

    suggestions[suggestionIndex] = {
      ...suggestions[suggestionIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    this.saveSuggestions(suggestions);
    return suggestions[suggestionIndex];
  }

  // 删除建议
  static deleteSuggestion(suggestionId) {
    const suggestions = this.getSuggestions();
    const filteredSuggestions = suggestions.filter(suggestion => suggestion.id !== suggestionId);
    
    if (filteredSuggestions.length === suggestions.length) {
      throw new Error('建议不存在');
    }

    this.saveSuggestions(filteredSuggestions);
    return true;
  }

  // 点赞建议
  static likeSuggestion(suggestionId) {
    const suggestions = this.getSuggestions();
    const suggestionIndex = suggestions.findIndex(suggestion => suggestion.id === suggestionId);
    
    if (suggestionIndex === -1) {
      throw new Error('建议不存在');
    }

    suggestions[suggestionIndex].likes += 1;
    this.saveSuggestions(suggestions);
    return suggestions[suggestionIndex];
  }

  // 添加评论
  static addComment(suggestionId, commentData) {
    const suggestions = this.getSuggestions();
    const suggestionIndex = suggestions.findIndex(suggestion => suggestion.id === suggestionId);
    
    if (suggestionIndex === -1) {
      throw new Error('建议不存在');
    }

    const newComment = {
      id: generateId(),
      ...commentData,
      timestamp: new Date().toISOString()
    };

    suggestions[suggestionIndex].comments.push(newComment);
    this.saveSuggestions(suggestions);
    return newComment;
  }

  // 删除评论
  static deleteComment(suggestionId, commentId) {
    const suggestions = this.getSuggestions();
    const suggestionIndex = suggestions.findIndex(suggestion => suggestion.id === suggestionId);
    
    if (suggestionIndex === -1) {
      throw new Error('建议不存在');
    }

    const originalLength = suggestions[suggestionIndex].comments.length;
    suggestions[suggestionIndex].comments = suggestions[suggestionIndex].comments.filter(
      comment => comment.id !== commentId
    );

    if (suggestions[suggestionIndex].comments.length === originalLength) {
      throw new Error('评论不存在');
    }

    this.saveSuggestions(suggestions);
    return true;
  }
}

console.log('简化版数据库系统已加载');

module.exports = {
  UserManager,
  SectUserManager,
  SessionManager,
  TaskManager,
  SuggestionManager
}; 