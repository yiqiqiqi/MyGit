import { SessionManager, SectUserManager } from '../../../lib/database-simple';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '方法不允许' });
  }

  try {
    const { sessionToken } = req.body;

    if (!sessionToken) {
      return res.status(400).json({ error: '缺少会话令牌' });
    }

    // 验证会话
    const session = SessionManager.validateSession(sessionToken);
    
    if (!session) {
      return res.status(401).json({ error: '会话已过期或无效' });
    }

    // 获取最新的门派用户信息
    const sectUser = SectUserManager.getSectUser(session.user_id, session.sect_id);
    
    if (!sectUser) {
      return res.status(404).json({ error: '门派用户信息不存在' });
    }

    // 返回用户信息
    res.status(200).json({
      success: true,
      user: {
        id: session.user_id,
        qq: session.qq,
        globalNickname: session.global_nickname,
        sectId: session.sect_id,
        sectNickname: sectUser.sect_nickname,
        cultivationLevel: sectUser.cultivation_level,
        sectPoints: sectUser.sect_points,
        joinTime: sectUser.join_time,
        lastLogin: sectUser.last_login
      }
    });

  } catch (error) {
    console.error('验证错误:', error);
    res.status(500).json({ 
      error: '验证失败，请重新登录' 
    });
  }
} 