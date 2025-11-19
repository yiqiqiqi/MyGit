import { SessionManager, TaskManager } from '../../../lib/database-simple';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: '方法不允许' });
  }

  try {
    const { sessionToken, taskId } = req.body;

    if (!sessionToken) {
      return res.status(400).json({ error: '缺少会话令牌' });
    }

    if (!taskId) {
      return res.status(400).json({ error: '缺少任务ID' });
    }

    // 验证会话
    const session = SessionManager.validateSession(sessionToken);
    if (!session) {
      return res.status(401).json({ error: '会话已过期或无效' });
    }

    // 删除任务
    TaskManager.deleteTask(taskId);

    res.status(200).json({
      success: true,
      message: '任务删除成功'
    });

  } catch (error) {
    console.error('删除任务错误:', error);
    res.status(500).json({ 
      error: error.message || '删除任务失败，请稍后重试' 
    });
  }
} 