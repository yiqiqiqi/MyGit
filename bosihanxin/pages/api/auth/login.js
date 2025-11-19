import { UserManager, SectUserManager, SessionManager } from '../../../lib/database-simple';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '方法不允许' });
  }

  try {
    const { qq, password, sectId, sectPassword } = req.body;

    // 验证必填字段
    if (!qq || !password || !sectId || !sectPassword) {
      return res.status(400).json({ error: '请填写所有必填字段' });
    }

    // 验证QQ号格式
    if (!/^\d{5,12}$/.test(qq)) {
      return res.status(400).json({ error: '请输入正确的QQ号（5-12位数字）' });
    }

    // 验证用户账号
    const user = await UserManager.validateUser(qq, password);
    
    // 验证门派账号
    const sectUser = await SectUserManager.validateSectUser(user.id, sectId, sectPassword);

    // 创建会话
    const sessionToken = SessionManager.createSession(user.id, sectId);

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
        lastLogin: sectUser.last_login
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