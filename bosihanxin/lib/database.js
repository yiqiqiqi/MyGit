const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

// 数据库文件路径
const dbPath = path.join(process.cwd(), 'data', 'users.db');

// 确保数据目录存在
const fs = require('fs');
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// 初始化数据库连接
const db = new Database(dbPath);

// 启用外键约束
db.pragma('foreign_keys = ON');

// 创建用户表
const createUsersTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      qq TEXT UNIQUE NOT NULL,
      global_nickname TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_login DATETIME,
      is_active BOOLEAN DEFAULT 1
    )
  `;
  db.exec(sql);
};

// 创建门派用户表
const createSectUsersTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS sect_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      sect_id TEXT NOT NULL,
      sect_nickname TEXT NOT NULL,
      sect_password_hash TEXT NOT NULL,
      join_time DATETIME DEFAULT CURRENT_TIMESTAMP,
      cultivation_level TEXT DEFAULT '入门弟子',
      sect_points INTEGER DEFAULT 0,
      last_login DATETIME,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
      UNIQUE(user_id, sect_id)
    )
  `;
  db.exec(sql);
};

// 创建会话表（用于跟踪登录状态）
const createSessionsTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      sect_id TEXT NOT NULL,
      session_token TEXT UNIQUE NOT NULL,
      expires_at DATETIME NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
  `;
  db.exec(sql);
};

// 初始化数据库表
const initDatabase = () => {
  try {
    createUsersTable();
    createSectUsersTable();
    createSessionsTable();
    console.log('数据库初始化成功');
  } catch (error) {
    console.error('数据库初始化失败:', error);
    throw error;
  }
};

// 用户管理类
class UserManager {
  // 注册新用户
  static async registerUser(qq, globalNickname, password) {
    try {
      const passwordHash = await bcrypt.hash(password, 10);
      
      const insertUser = db.prepare(`
        INSERT INTO users (qq, global_nickname, password_hash)
        VALUES (?, ?, ?)
      `);
      
      const result = insertUser.run(qq, globalNickname, passwordHash);
      return { id: result.lastInsertRowid, qq, globalNickname };
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        throw new Error('该QQ号已注册');
      }
      throw error;
    }
  }

  // 验证用户登录
  static async validateUser(qq, password) {
    const getUser = db.prepare(`
      SELECT id, qq, global_nickname, password_hash, last_login
      FROM users 
      WHERE qq = ? AND is_active = 1
    `);
    
    const user = getUser.get(qq);
    if (!user) {
      throw new Error('用户不存在');
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      throw new Error('密码错误');
    }

    // 更新最后登录时间
    const updateLogin = db.prepare(`
      UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?
    `);
    updateLogin.run(user.id);

    return {
      id: user.id,
      qq: user.qq,
      globalNickname: user.global_nickname,
      lastLogin: user.last_login
    };
  }

  // 获取用户信息
  static getUserByQQ(qq) {
    const getUser = db.prepare(`
      SELECT id, qq, global_nickname, created_at, last_login
      FROM users 
      WHERE qq = ? AND is_active = 1
    `);
    
    return getUser.get(qq);
  }

  // 更新全局昵称
  static updateGlobalNickname(qq, newNickname) {
    const updateUser = db.prepare(`
      UPDATE users 
      SET global_nickname = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE qq = ?
    `);
    
    const result = updateUser.run(newNickname, qq);
    return result.changes > 0;
  }

  // 更改密码
  static async changePassword(qq, oldPassword, newPassword) {
    const user = await this.validateUser(qq, oldPassword);
    
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    const updatePassword = db.prepare(`
      UPDATE users 
      SET password_hash = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE qq = ?
    `);
    
    const result = updatePassword.run(newPasswordHash, qq);
    return result.changes > 0;
  }
}

// 门派用户管理类
class SectUserManager {
  // 注册门派用户
  static async registerSectUser(userId, sectId, sectNickname, sectPassword) {
    try {
      const sectPasswordHash = await bcrypt.hash(sectPassword, 10);
      
      const insertSectUser = db.prepare(`
        INSERT INTO sect_users (user_id, sect_id, sect_nickname, sect_password_hash)
        VALUES (?, ?, ?, ?)
      `);
      
      const result = insertSectUser.run(userId, sectId, sectNickname, sectPasswordHash);
      return { id: result.lastInsertRowid, userId, sectId, sectNickname };
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        throw new Error('该用户已加入此门派');
      }
      throw error;
    }
  }

  // 验证门派登录
  static async validateSectUser(userId, sectId, sectPassword) {
    const getSectUser = db.prepare(`
      SELECT * FROM sect_users 
      WHERE user_id = ? AND sect_id = ?
    `);
    
    const sectUser = getSectUser.get(userId, sectId);
    if (!sectUser) {
      throw new Error('未加入此门派');
    }

    const isValid = await bcrypt.compare(sectPassword, sectUser.sect_password_hash);
    if (!isValid) {
      throw new Error('门派密码错误');
    }

    // 更新最后登录时间
    const updateLogin = db.prepare(`
      UPDATE sect_users SET last_login = CURRENT_TIMESTAMP 
      WHERE user_id = ? AND sect_id = ?
    `);
    updateLogin.run(userId, sectId);

    return sectUser;
  }

  // 获取用户的门派信息
  static getSectUser(userId, sectId) {
    const getSectUser = db.prepare(`
      SELECT * FROM sect_users 
      WHERE user_id = ? AND sect_id = ?
    `);
    
    return getSectUser.get(userId, sectId);
  }

  // 获取用户所有门派
  static getUserSects(userId) {
    const getSects = db.prepare(`
      SELECT sect_id, sect_nickname, cultivation_level, sect_points, join_time, last_login
      FROM sect_users 
      WHERE user_id = ?
    `);
    
    return getSects.all(userId);
  }

  // 更新门派昵称
  static updateSectNickname(userId, sectId, newNickname) {
    const updateNickname = db.prepare(`
      UPDATE sect_users 
      SET sect_nickname = ? 
      WHERE user_id = ? AND sect_id = ?
    `);
    
    const result = updateNickname.run(newNickname, userId, sectId);
    return result.changes > 0;
  }

  // 更改门派密码
  static async changeSectPassword(userId, sectId, oldPassword, newPassword) {
    await this.validateSectUser(userId, sectId, oldPassword);
    
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    const updatePassword = db.prepare(`
      UPDATE sect_users 
      SET sect_password_hash = ? 
      WHERE user_id = ? AND sect_id = ?
    `);
    
    const result = updatePassword.run(newPasswordHash, userId, sectId);
    return result.changes > 0;
  }

  // 获取门派所有用户
  static getSectMembers(sectId) {
    const getMembers = db.prepare(`
      SELECT 
        u.qq,
        u.global_nickname,
        su.sect_nickname,
        su.cultivation_level,
        su.sect_points,
        su.join_time,
        su.last_login
      FROM sect_users su
      JOIN users u ON su.user_id = u.id
      WHERE su.sect_id = ?
      ORDER BY su.join_time ASC
    `);
    
    return getMembers.all(sectId);
  }
}

// 会话管理类
class SessionManager {
  // 创建会话
  static createSession(userId, sectId) {
    const sessionToken = require('crypto').randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7天过期
    
    const insertSession = db.prepare(`
      INSERT INTO sessions (user_id, sect_id, session_token, expires_at)
      VALUES (?, ?, ?, ?)
    `);
    
    insertSession.run(userId, sectId, sessionToken, expiresAt.toISOString());
    return sessionToken;
  }

  // 验证会话
  static validateSession(sessionToken) {
    const getSession = db.prepare(`
      SELECT s.user_id, s.sect_id, u.qq, u.global_nickname
      FROM sessions s
      JOIN users u ON s.user_id = u.id
      WHERE s.session_token = ? AND s.expires_at > CURRENT_TIMESTAMP
    `);
    
    return getSession.get(sessionToken);
  }

  // 删除会话（登出）
  static deleteSession(sessionToken) {
    const deleteSession = db.prepare(`
      DELETE FROM sessions WHERE session_token = ?
    `);
    
    const result = deleteSession.run(sessionToken);
    return result.changes > 0;
  }

  // 清理过期会话
  static cleanupExpiredSessions() {
    const cleanup = db.prepare(`
      DELETE FROM sessions WHERE expires_at <= CURRENT_TIMESTAMP
    `);
    
    return cleanup.run();
  }
}

// 初始化数据库
initDatabase();

// 定期清理过期会话（每小时）
setInterval(() => {
  SessionManager.cleanupExpiredSessions();
}, 60 * 60 * 1000);

module.exports = {
  db,
  UserManager,
  SectUserManager,
  SessionManager
}; 