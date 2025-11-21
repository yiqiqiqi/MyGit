import { UserManager, SectUserManager, SessionManager } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '方法不允许' });
  }

  try {
    const { qq, password, sectId } = req.body;

    // 验证必填字段
    if (!qq || !password || !sectId) {
      return res.status(400).json({ error: '请填写所有必填字段' });
    }

    // 验证QQ号格式
    if (!/^\d{5,12}$/.test(qq)) {
      return res.status(400).json({ error: '请输入正确的QQ号（5-12位数字）' });
    }

    // 验证用户账号（只需要一个密码）
    const user = await UserManager.validateUser(qq, password);

    // 检查用户是否已加入此门派
    const sectUser = SectUserManager.getSectUser(user.id, sectId);

    if (!sectUser) {
      return res.status(400).json({
        error: '您还未加入此门派，请先注册'
      });
    }

    // 创建会话
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const sessionToken = SessionManager.createSession(user.id, sectId, ipAddress, userAgent);

    // 更新门派最后登录时间
    SectUserManager.updateLastLogin(user.id, sectId);

    // 获取用户的所有门派
    const userSects = SectUserManager.getUserSects(user.id);

    // 返回成功响应
    res.status(200).json({
      success: true,
      message: '登录成功',
      user: {
        id: user.id,
        qq: user.qq,
        globalNickname: user.globalNickname,
        sectId,
        sectNickname: sectUser.sect_nickname,
        cultivationLevel: sectUser.cultivation_level,
        sectPoints: sectUser.sect_points,
        joinTime: sectUser.join_time,
        lastLogin: sectUser.last_login,
        registeredSects: userSects.map(s => s.sect_id)
      },
      sessionToken
    });

  } catch (error) {
    console.error('登录错误:', error);
    res.status(400).json({
      error: error.message || '登录失败，请检查账号和密码'
    });
  }
}
