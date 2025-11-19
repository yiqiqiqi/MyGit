import { UserManager, SectUserManager, SessionManager } from '../../../lib/database-simple';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '方法不允许' });
  }

  try {
    const { qq, globalNickname, password, sectId, sectNickname, sectPassword } = req.body;

    // 验证必填字段
    if (!qq || !globalNickname || !password || !sectId || !sectNickname || !sectPassword) {
      return res.status(400).json({ error: '请填写所有必填字段' });
    }

    // 验证QQ号格式
    if (!/^\d{5,12}$/.test(qq)) {
      return res.status(400).json({ error: '请输入正确的QQ号（5-12位数字）' });
    }

    // 验证密码强度
    if (password.length < 6) {
      return res.status(400).json({ error: '密码至少6位字符' });
    }

    if (sectPassword.length < 6) {
      return res.status(400).json({ error: '门派密码至少6位字符' });
    }

    // 检查用户是否已存在
    const existingUser = UserManager.getUserByQQ(qq);
    let user;

    if (existingUser) {
      // 用户已存在，检查是否已加入此门派
      const existingSectUser = SectUserManager.getSectUser(existingUser.id, sectId);
      if (existingSectUser) {
        return res.status(400).json({ error: '该QQ号已加入此门派，请直接登录' });
      }
      user = existingUser;
    } else {
      // 创建新用户
      user = await UserManager.registerUser(qq, globalNickname, password);
    }

    // 注册门派用户
    const sectUser = await SectUserManager.registerSectUser(
      user.id, 
      sectId, 
      sectNickname, 
      sectPassword
    );

    // 创建会话
    const sessionToken = SessionManager.createSession(user.id, sectId);

    // 返回成功响应
    res.status(200).json({
      success: true,
      message: '注册成功',
      user: {
        id: user.id,
        qq: user.qq || qq,
        globalNickname: user.globalNickname || globalNickname,
        sectId,
        sectNickname,
        cultivationLevel: '入门弟子',
        sectPoints: 0
      },
      sessionToken
    });

  } catch (error) {
    console.error('注册错误:', error);
    res.status(500).json({ 
      error: error.message || '注册失败，请稍后重试' 
    });
  }
} 