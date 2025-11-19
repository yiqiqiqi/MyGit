import { SessionManager, TaskManager } from '../../../lib/database-simple';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: '方法不允许' });
  }

  try {
    const { sessionToken, taskId, ...updateData } = req.body;

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

    // 处理标签数据
    if (updateData.tags && typeof updateData.tags === 'string') {
      updateData.tags = updateData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    }

    // 如果状态改为完成，自动设置进度为100%
    if (updateData.status === '完成') {
      updateData.progress = 100;
    }

    // 更新任务
    const updatedTask = TaskManager.updateTask(taskId, updateData);

    res.status(200).json({
      success: true,
      message: '任务更新成功',
      task: updatedTask
    });

  } catch (error) {
    console.error('更新任务错误:', error);
    res.status(500).json({ 
      error: error.message || '更新任务失败，请稍后重试' 
    });
  }
} 