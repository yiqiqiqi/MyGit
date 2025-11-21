import { SessionManager, SectUserManager, UserManager } from '../../../lib/db';

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
      return res.status(401).json({ error: '会话已过期或无效，请重新登录' });
    }

    // 获取用户完整信息
    const user = UserManager.getUserById(session.user_id);

    if (!user) {
      return res.status(404).json({ error: '用户信息不存在' });
    }

    // 获取门派用户信息
    const sectUser = SectUserManager.getSectUser(session.user_id, session.sect_id);

    if (!sectUser) {
      return res.status(404).json({ error: '门派用户信息不存在' });
    }

    // 获取用户的所有门派
    const userSects = SectUserManager.getUserSects(session.user_id);

    // 返回用户信息
    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        qq: user.qq,
        globalNickname: user.globalNickname,
        avatarUrl: user.avatarUrl,
        bio: user.bio,
        sectId: session.sect_id,
        sectNickname: sectUser.sect_nickname,
        cultivationLevel: sectUser.cultivation_level,
        sectPoints: sectUser.sect_points,
        joinTime: sectUser.join_time,
        lastLogin: sectUser.last_login,
        registeredSects: userSects.map(s => ({
          sectId: s.sect_id,
          sectNickname: s.sect_nickname,
          cultivationLevel: s.cultivation_level,
          sectPoints: s.sect_points
        }))
      }
    });

  } catch (error) {
    console.error('验证错误:', error);
    res.status(500).json({
      error: '验证失败，请重新登录'
    });
  }
}
