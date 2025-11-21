const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

// 数据库文件路径
const dbPath = path.join(process.cwd(), 'data', 'sect_system.db');

// 确保数据目录存在
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// 初始化数据库连接
const db = new Database(dbPath);

// 启用外键约束和WAL模式（提高并发性能）
db.pragma('foreign_keys = ON');
db.pragma('journal_mode = WAL');

// 日志函数
const log = {
  info: (message, data = {}) => {
    console.log(`[INFO] ${message}`, data);
  },
  error: (message, error = {}) => {
    console.error(`[ERROR] ${message}`, error.message || error);
  },
  warn: (message, data = {}) => {
    console.warn(`[WARN] ${message}`, data);
  }
};

// ============================================
// 数据库表结构初始化
// ============================================

const initDatabase = () => {
  try {
    // 用户表（全局用户）
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        qq TEXT UNIQUE NOT NULL,
        global_nickname TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_login DATETIME,
        is_active BOOLEAN DEFAULT 1,
        avatar_url TEXT,
        bio TEXT
      )
    `);

    // 门派用户表（移除了 sect_password_hash）
    db.exec(`
      CREATE TABLE IF NOT EXISTS sect_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        sect_id TEXT NOT NULL,
        sect_nickname TEXT NOT NULL,
        join_time DATETIME DEFAULT CURRENT_TIMESTAMP,
        cultivation_level TEXT DEFAULT '入门弟子',
        sect_points INTEGER DEFAULT 0,
        last_login DATETIME,
        is_active BOOLEAN DEFAULT 1,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        UNIQUE(user_id, sect_id)
      )
    `);

    // 会话表
    db.exec(`
      CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        sect_id TEXT NOT NULL,
        session_token TEXT UNIQUE NOT NULL,
        expires_at DATETIME NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_activity DATETIME DEFAULT CURRENT_TIMESTAMP,
        ip_address TEXT,
        user_agent TEXT,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )
    `);

    // 建议表
    db.exec(`
      CREATE TABLE IF NOT EXISTS suggestions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        sect_id TEXT NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        category TEXT,
        status TEXT DEFAULT 'pending',
        likes INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )
    `);

    // 建议评论表
    db.exec(`
      CREATE TABLE IF NOT EXISTS suggestion_comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        suggestion_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (suggestion_id) REFERENCES suggestions (id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )
    `);

    // 任务表
    db.exec(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sect_id TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        created_by INTEGER NOT NULL,
        assigned_to INTEGER,
        status TEXT DEFAULT 'pending',
        priority TEXT DEFAULT 'medium',
        due_date DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        completed_at DATETIME,
        FOREIGN KEY (created_by) REFERENCES users (id),
        FOREIGN KEY (assigned_to) REFERENCES users (id)
      )
    `);

    // 积分历史表
    db.exec(`
      CREATE TABLE IF NOT EXISTS point_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        sect_id TEXT NOT NULL,
        points_change INTEGER NOT NULL,
        reason TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )
    `);

    // 创建索引以提高查询性能
    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_users_qq ON users(qq);
      CREATE INDEX IF NOT EXISTS idx_sect_users_user_id ON sect_users(user_id);
      CREATE INDEX IF NOT EXISTS idx_sect_users_sect_id ON sect_users(sect_id);
      CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(session_token);
      CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);
      CREATE INDEX IF NOT EXISTS idx_suggestions_sect ON suggestions(sect_id);
      CREATE INDEX IF NOT EXISTS idx_tasks_sect ON tasks(sect_id);
    `);

    log.info('数据库初始化成功');
  } catch (error) {
    log.error('数据库初始化失败', error);
    throw error;
  }
};

// ============================================
// 用户管理类
// ============================================

class UserManager {
  /**
   * 注册新用户
   */
  static async registerUser(qq, globalNickname, password) {
    try {
      const passwordHash = await bcrypt.hash(password, 10);

      const stmt = db.prepare(`
        INSERT INTO users (qq, global_nickname, password_hash)
        VALUES (?, ?, ?)
      `);

      const result = stmt.run(qq, globalNickname, passwordHash);

      log.info('用户注册成功', { qq, id: result.lastInsertRowid });

      return {
        id: result.lastInsertRowid,
        qq,
        globalNickname
      };
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        throw new Error('该QQ号已注册');
      }
      log.error('用户注册失败', error);
      throw error;
    }
  }

  /**
   * 验证用户登录
   */
  static async validateUser(qq, password) {
    const stmt = db.prepare(`
      SELECT id, qq, global_nickname, password_hash, last_login, avatar_url, bio
      FROM users
      WHERE qq = ? AND is_active = 1
    `);

    const user = stmt.get(qq);

    if (!user) {
      throw new Error('用户不存在或已被禁用');
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      throw new Error('密码错误');
    }

    // 更新最后登录时间
    const updateStmt = db.prepare(`
      UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?
    `);
    updateStmt.run(user.id);

    log.info('用户登录成功', { qq, id: user.id });

    return {
      id: user.id,
      qq: user.qq,
      globalNickname: user.global_nickname,
      lastLogin: user.last_login,
      avatarUrl: user.avatar_url,
      bio: user.bio
    };
  }

  /**
   * 根据ID获取用户信息
   */
  static getUserById(userId) {
    const stmt = db.prepare(`
      SELECT id, qq, global_nickname, created_at, last_login, avatar_url, bio
      FROM users
      WHERE id = ? AND is_active = 1
    `);

    const user = stmt.get(userId);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      qq: user.qq,
      globalNickname: user.global_nickname,
      createdAt: user.created_at,
      lastLogin: user.last_login,
      avatarUrl: user.avatar_url,
      bio: user.bio
    };
  }

  /**
   * 根据QQ号获取用户信息
   */
  static getUserByQQ(qq) {
    const stmt = db.prepare(`
      SELECT id, qq, global_nickname, created_at, last_login, avatar_url, bio
      FROM users
      WHERE qq = ? AND is_active = 1
    `);

    return stmt.get(qq);
  }

  /**
   * 更新全局昵称
   */
  static updateGlobalNickname(userId, newNickname) {
    const stmt = db.prepare(`
      UPDATE users
      SET global_nickname = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    const result = stmt.run(newNickname, userId);

    if (result.changes > 0) {
      log.info('更新全局昵称成功', { userId, newNickname });
    }

    return result.changes > 0;
  }

  /**
   * 更改密码
   */
  static async changePassword(userId, oldPassword, newPassword) {
    // 先获取用户信息
    const user = this.getUserById(userId);
    if (!user) {
      throw new Error('用户不存在');
    }

    // 验证旧密码
    const stmt = db.prepare('SELECT password_hash FROM users WHERE id = ?');
    const row = stmt.get(userId);

    const isValid = await bcrypt.compare(oldPassword, row.password_hash);
    if (!isValid) {
      throw new Error('旧密码错误');
    }

    // 更新新密码
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    const updateStmt = db.prepare(`
      UPDATE users
      SET password_hash = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    const result = updateStmt.run(newPasswordHash, userId);

    if (result.changes > 0) {
      log.info('密码更改成功', { userId });
    }

    return result.changes > 0;
  }

  /**
   * 更新用户资料
   */
  static updateProfile(userId, updates) {
    const allowedFields = ['avatar_url', 'bio'];
    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(updates)) {
      if (allowedFields.includes(key)) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }

    if (fields.length === 0) {
      return false;
    }

    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(userId);

    const stmt = db.prepare(`
      UPDATE users
      SET ${fields.join(', ')}
      WHERE id = ?
    `);

    const result = stmt.run(...values);
    return result.changes > 0;
  }
}

// ============================================
// 门派用户管理类
// ============================================

class SectUserManager {
  /**
   * 用户加入门派（移除了门派密码参数）
   */
  static registerSectUser(userId, sectId, sectNickname) {
    try {
      const stmt = db.prepare(`
        INSERT INTO sect_users (user_id, sect_id, sect_nickname)
        VALUES (?, ?, ?)
      `);

      const result = stmt.run(userId, sectId, sectNickname);

      log.info('用户加入门派成功', { userId, sectId, id: result.lastInsertRowid });

      return {
        id: result.lastInsertRowid,
        userId,
        sectId,
        sectNickname
      };
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        throw new Error('该用户已加入此门派');
      }
      log.error('用户加入门派失败', error);
      throw error;
    }
  }

  /**
   * 获取用户在特定门派的信息
   */
  static getSectUser(userId, sectId) {
    const stmt = db.prepare(`
      SELECT * FROM sect_users
      WHERE user_id = ? AND sect_id = ? AND is_active = 1
    `);

    return stmt.get(userId, sectId);
  }

  /**
   * 获取用户加入的所有门派
   */
  static getUserSects(userId) {
    const stmt = db.prepare(`
      SELECT
        sect_id,
        sect_nickname,
        cultivation_level,
        sect_points,
        join_time,
        last_login
      FROM sect_users
      WHERE user_id = ? AND is_active = 1
      ORDER BY join_time DESC
    `);

    return stmt.all(userId);
  }

  /**
   * 获取门派的所有成员
   */
  static getSectMembers(sectId) {
    const stmt = db.prepare(`
      SELECT
        u.id as user_id,
        u.qq,
        u.global_nickname,
        su.sect_nickname,
        su.cultivation_level,
        su.sect_points,
        su.join_time,
        su.last_login
      FROM sect_users su
      JOIN users u ON su.user_id = u.id
      WHERE su.sect_id = ? AND su.is_active = 1 AND u.is_active = 1
      ORDER BY su.sect_points DESC, su.join_time ASC
    `);

    return stmt.all(sectId);
  }

  /**
   * 更新门派昵称
   */
  static updateSectNickname(userId, sectId, newNickname) {
    const stmt = db.prepare(`
      UPDATE sect_users
      SET sect_nickname = ?
      WHERE user_id = ? AND sect_id = ?
    `);

    const result = stmt.run(newNickname, userId, sectId);

    if (result.changes > 0) {
      log.info('更新门派昵称成功', { userId, sectId, newNickname });
    }

    return result.changes > 0;
  }

  /**
   * 更新最后登录时间
   */
  static updateLastLogin(userId, sectId) {
    const stmt = db.prepare(`
      UPDATE sect_users
      SET last_login = CURRENT_TIMESTAMP
      WHERE user_id = ? AND sect_id = ?
    `);

    return stmt.run(userId, sectId).changes > 0;
  }

  /**
   * 增加门派积分
   */
  static addSectPoints(userId, sectId, points, reason = '') {
    const transaction = db.transaction(() => {
      // 更新积分
      const updateStmt = db.prepare(`
        UPDATE sect_users
        SET sect_points = sect_points + ?
        WHERE user_id = ? AND sect_id = ?
      `);
      updateStmt.run(points, userId, sectId);

      // 记录积分历史
      const historyStmt = db.prepare(`
        INSERT INTO point_history (user_id, sect_id, points_change, reason)
        VALUES (?, ?, ?, ?)
      `);
      historyStmt.run(userId, sectId, points, reason);

      // 检查是否需要升级修炼等级
      const sectUser = this.getSectUser(userId, sectId);
      if (sectUser) {
        const newLevel = this.calculateCultivationLevel(sectUser.sect_points);
        if (newLevel !== sectUser.cultivation_level) {
          const levelStmt = db.prepare(`
            UPDATE sect_users
            SET cultivation_level = ?
            WHERE user_id = ? AND sect_id = ?
          `);
          levelStmt.run(newLevel, userId, sectId);

          log.info('用户修炼等级提升', { userId, sectId, newLevel });
        }
      }
    });

    transaction();

    log.info('增加门派积分成功', { userId, sectId, points, reason });

    return true;
  }

  /**
   * 根据积分计算修炼等级
   */
  static calculateCultivationLevel(points) {
    if (points >= 10000) return '长老';
    if (points >= 3000) return '执事';
    if (points >= 1000) return '核心弟子';
    if (points >= 500) return '内门弟子';
    if (points >= 100) return '外门弟子';
    return '入门弟子';
  }

  /**
   * 获取门派排行榜
   */
  static getSectLeaderboard(sectId, limit = 100) {
    const stmt = db.prepare(`
      SELECT
        u.global_nickname,
        su.sect_nickname,
        su.cultivation_level,
        su.sect_points,
        su.join_time
      FROM sect_users su
      JOIN users u ON su.user_id = u.id
      WHERE su.sect_id = ? AND su.is_active = 1 AND u.is_active = 1
      ORDER BY su.sect_points DESC, su.join_time ASC
      LIMIT ?
    `);

    return stmt.all(sectId, limit);
  }

  /**
   * 退出门派（软删除）
   */
  static leaveSect(userId, sectId) {
    const stmt = db.prepare(`
      UPDATE sect_users
      SET is_active = 0
      WHERE user_id = ? AND sect_id = ?
    `);

    const result = stmt.run(userId, sectId);

    if (result.changes > 0) {
      log.info('用户退出门派', { userId, sectId });
    }

    return result.changes > 0;
  }
}

// ============================================
// 会话管理类
// ============================================

class SessionManager {
  /**
   * 创建会话
   */
  static createSession(userId, sectId, ipAddress = null, userAgent = null) {
    const sessionToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7天过期

    const stmt = db.prepare(`
      INSERT INTO sessions (user_id, sect_id, session_token, expires_at, ip_address, user_agent)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    stmt.run(userId, sectId, sessionToken, expiresAt.toISOString(), ipAddress, userAgent);

    log.info('创建会话成功', { userId, sectId, expiresAt });

    return sessionToken;
  }

  /**
   * 验证会话
   */
  static validateSession(sessionToken) {
    const stmt = db.prepare(`
      SELECT s.user_id, s.sect_id, u.qq, u.global_nickname
      FROM sessions s
      JOIN users u ON s.user_id = u.id
      WHERE s.session_token = ?
        AND s.expires_at > CURRENT_TIMESTAMP
        AND u.is_active = 1
    `);

    const session = stmt.get(sessionToken);

    if (session) {
      // 更新最后活动时间
      const updateStmt = db.prepare(`
        UPDATE sessions
        SET last_activity = CURRENT_TIMESTAMP
        WHERE session_token = ?
      `);
      updateStmt.run(sessionToken);
    }

    return session;
  }

  /**
   * 删除会话（登出）
   */
  static deleteSession(sessionToken) {
    const stmt = db.prepare(`
      DELETE FROM sessions WHERE session_token = ?
    `);

    const result = stmt.run(sessionToken);

    if (result.changes > 0) {
      log.info('删除会话成功', { sessionToken });
    }

    return result.changes > 0;
  }

  /**
   * 删除用户的所有会话
   */
  static deleteUserSessions(userId) {
    const stmt = db.prepare(`
      DELETE FROM sessions WHERE user_id = ?
    `);

    const result = stmt.run(userId);

    log.info('删除用户所有会话', { userId, count: result.changes });

    return result.changes;
  }

  /**
   * 清理过期会话
   */
  static cleanupExpiredSessions() {
    const stmt = db.prepare(`
      DELETE FROM sessions WHERE expires_at <= CURRENT_TIMESTAMP
    `);

    const result = stmt.run();

    if (result.changes > 0) {
      log.info('清理过期会话', { count: result.changes });
    }

    return result.changes;
  }

  /**
   * 获取活跃会话数量
   */
  static getActiveSessionCount() {
    const stmt = db.prepare(`
      SELECT COUNT(*) as count
      FROM sessions
      WHERE expires_at > CURRENT_TIMESTAMP
    `);

    return stmt.get().count;
  }
}

// ============================================
// 建议管理类
// ============================================

class SuggestionManager {
  /**
   * 创建建议
   */
  static createSuggestion(userId, sectId, title, content, category = null) {
    const stmt = db.prepare(`
      INSERT INTO suggestions (user_id, sect_id, title, content, category)
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = stmt.run(userId, sectId, title, content, category);

    log.info('创建建议成功', { userId, sectId, id: result.lastInsertRowid });

    return result.lastInsertRowid;
  }

  /**
   * 获取门派的建议列表
   */
  static getSuggestionsBySect(sectId, limit = 50, offset = 0) {
    const stmt = db.prepare(`
      SELECT
        s.*,
        u.global_nickname,
        su.sect_nickname
      FROM suggestions s
      JOIN users u ON s.user_id = u.id
      LEFT JOIN sect_users su ON s.user_id = su.user_id AND s.sect_id = su.sect_id
      WHERE s.sect_id = ?
      ORDER BY s.created_at DESC
      LIMIT ? OFFSET ?
    `);

    return stmt.all(sectId, limit, offset);
  }

  /**
   * 点赞建议
   */
  static likeSuggestion(suggestionId) {
    const stmt = db.prepare(`
      UPDATE suggestions
      SET likes = likes + 1
      WHERE id = ?
    `);

    return stmt.run(suggestionId).changes > 0;
  }

  /**
   * 添加评论
   */
  static addComment(suggestionId, userId, content) {
    const stmt = db.prepare(`
      INSERT INTO suggestion_comments (suggestion_id, user_id, content)
      VALUES (?, ?, ?)
    `);

    const result = stmt.run(suggestionId, userId, content);

    log.info('添加评论成功', { suggestionId, userId });

    return result.lastInsertRowid;
  }

  /**
   * 获取建议的评论
   */
  static getComments(suggestionId) {
    const stmt = db.prepare(`
      SELECT
        c.*,
        u.global_nickname
      FROM suggestion_comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.suggestion_id = ?
      ORDER BY c.created_at ASC
    `);

    return stmt.all(suggestionId);
  }
}

// ============================================
// 任务管理类
// ============================================

class TaskManager {
  /**
   * 创建任务
   */
  static createTask(sectId, createdBy, title, description, assignedTo = null, priority = 'medium', dueDate = null) {
    const stmt = db.prepare(`
      INSERT INTO tasks (sect_id, created_by, title, description, assigned_to, priority, due_date)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(sectId, createdBy, title, description, assignedTo, priority, dueDate);

    log.info('创建任务成功', { sectId, createdBy, id: result.lastInsertRowid });

    return result.lastInsertRowid;
  }

  /**
   * 获取门派的任务列表
   */
  static getTasksBySect(sectId, status = null) {
    let query = `
      SELECT
        t.*,
        u1.global_nickname as creator_name,
        u2.global_nickname as assignee_name
      FROM tasks t
      JOIN users u1 ON t.created_by = u1.id
      LEFT JOIN users u2 ON t.assigned_to = u2.id
      WHERE t.sect_id = ?
    `;

    const params = [sectId];

    if (status) {
      query += ' AND t.status = ?';
      params.push(status);
    }

    query += ' ORDER BY t.created_at DESC';

    const stmt = db.prepare(query);
    return stmt.all(...params);
  }

  /**
   * 更新任务状态
   */
  static updateTaskStatus(taskId, status) {
    const stmt = db.prepare(`
      UPDATE tasks
      SET status = ?,
          updated_at = CURRENT_TIMESTAMP,
          completed_at = CASE WHEN ? = 'completed' THEN CURRENT_TIMESTAMP ELSE completed_at END
      WHERE id = ?
    `);

    return stmt.run(status, status, taskId).changes > 0;
  }

  /**
   * 分配任务
   */
  static assignTask(taskId, userId) {
    const stmt = db.prepare(`
      UPDATE tasks
      SET assigned_to = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    return stmt.run(userId, taskId).changes > 0;
  }
}

// ============================================
// 初始化和导出
// ============================================

// 初始化数据库
initDatabase();

// 定期清理过期会话（每小时）
setInterval(() => {
  SessionManager.cleanupExpiredSessions();
}, 60 * 60 * 1000);

// 导出数据库实例和管理类
module.exports = {
  db,
  UserManager,
  SectUserManager,
  SessionManager,
  SuggestionManager,
  TaskManager,
  log
};
