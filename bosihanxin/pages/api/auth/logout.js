import { SessionManager } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '方法不允许' });
  }

  try {
    const { sessionToken } = req.body;

    if (!sessionToken) {
      return res.status(400).json({ error: '缺少会话令牌' });
    }

    // 删除会话
    const deleted = SessionManager.deleteSession(sessionToken);

    if (deleted) {
      res.status(200).json({
        success: true,
        message: '登出成功'
      });
    } else {
      res.status(404).json({
        error: '会话不存在或已过期'
      });
    }

  } catch (error) {
    console.error('登出错误:', error);
    res.status(500).json({
      error: '登出失败，请稍后重试'
    });
  }
}
