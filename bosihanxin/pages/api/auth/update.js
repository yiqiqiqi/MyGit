import { SessionManager, UserManager, SectUserManager } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '方法不允许' });
  }

  try {
    const { sessionToken, action, ...data } = req.body;

    if (!sessionToken) {
      return res.status(400).json({ error: '缺少会话令牌' });
    }

    // 验证会话
    const session = SessionManager.validateSession(sessionToken);
    if (!session) {
      return res.status(401).json({ error: '会话已过期或无效，请重新登录' });
    }

    let result;

    switch (action) {
      case 'updateGlobalNickname':
        if (!data.newNickname || data.newNickname.trim().length === 0) {
          return res.status(400).json({ error: '请提供新的全局昵称' });
        }
        if (data.newNickname.length > 20) {
          return res.status(400).json({ error: '昵称不超过20个字符' });
        }
        result = UserManager.updateGlobalNickname(session.user_id, data.newNickname.trim());
        break;

      case 'updateSectNickname':
        if (!data.newNickname || data.newNickname.trim().length === 0) {
          return res.status(400).json({ error: '请提供新的门派昵称' });
        }
        if (data.newNickname.length > 20) {
          return res.status(400).json({ error: '昵称不超过20个字符' });
        }
        result = SectUserManager.updateSectNickname(session.user_id, session.sect_id, data.newNickname.trim());
        break;

      case 'changePassword':
        if (!data.oldPassword || !data.newPassword) {
          return res.status(400).json({ error: '请提供旧密码和新密码' });
        }
        if (data.newPassword.length < 6) {
          return res.status(400).json({ error: '新密码至少6位字符' });
        }
        if (data.newPassword.length > 50) {
          return res.status(400).json({ error: '密码不超过50个字符' });
        }
        result = await UserManager.changePassword(session.user_id, data.oldPassword, data.newPassword);
        break;

      case 'updateProfile':
        // 更新用户资料（头像、简介等）
        const allowedUpdates = {};
        if (data.avatarUrl !== undefined) allowedUpdates.avatar_url = data.avatarUrl;
        if (data.bio !== undefined) allowedUpdates.bio = data.bio;

        if (Object.keys(allowedUpdates).length === 0) {
          return res.status(400).json({ error: '没有需要更新的信息' });
        }

        result = UserManager.updateProfile(session.user_id, allowedUpdates);
        break;

      default:
        return res.status(400).json({ error: '未知的操作类型' });
    }

    if (result) {
      res.status(200).json({
        success: true,
        message: '更新成功'
      });
    } else {
      res.status(400).json({
        error: '更新失败，请检查输入信息'
      });
    }

  } catch (error) {
    console.error('更新错误:', error);
    res.status(500).json({
      error: error.message || '更新失败，请稍后重试'
    });
  }
}
