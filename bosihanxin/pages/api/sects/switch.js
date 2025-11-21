import { SessionManager, SectUserManager } from '../../../lib/db';

/**
 * 门派切换 API
 * 允许用户在已加入的门派之间切换
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '方法不允许' });
  }

  try {
    const { sessionToken, targetSectId } = req.body;

    if (!sessionToken || !targetSectId) {
      return res.status(400).json({ error: '缺少必填参数' });
    }

    // 验证当前会话
    const session = SessionManager.validateSession(sessionToken);

    if (!session) {
      return res.status(401).json({ error: '会话已过期或无效，请重新登录' });
    }

    // 检查用户是否已加入目标门派
    const targetSectUser = SectUserManager.getSectUser(session.user_id, targetSectId);

    if (!targetSectUser) {
      return res.status(400).json({
        error: '您还未加入此门派，请先注册'
      });
    }

    // 删除旧会话
    SessionManager.deleteSession(sessionToken);

    // 创建新会话（切换到目标门派）
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const newSessionToken = SessionManager.createSession(
      session.user_id,
      targetSectId,
      ipAddress,
      userAgent
    );

    // 更新门派最后登录时间
    SectUserManager.updateLastLogin(session.user_id, targetSectId);

    // 获取用户所有门派
    const userSects = SectUserManager.getUserSects(session.user_id);

    // 返回成功响应
    res.status(200).json({
      success: true,
      message: '切换门派成功',
      sessionToken: newSessionToken,
      user: {
        id: session.user_id,
        qq: session.qq,
        globalNickname: session.global_nickname,
        sectId: targetSectId,
        sectNickname: targetSectUser.sect_nickname,
        cultivationLevel: targetSectUser.cultivation_level,
        sectPoints: targetSectUser.sect_points,
        joinTime: targetSectUser.join_time,
        lastLogin: targetSectUser.last_login,
        registeredSects: userSects.map(s => s.sect_id)
      }
    });

  } catch (error) {
    console.error('切换门派错误:', error);
    res.status(500).json({
      error: error.message || '切换失败，请稍后重试'
    });
  }
}
