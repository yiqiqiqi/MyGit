import { SessionManager, TaskManager } from '../../../lib/database-simple';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '方法不允许' });
  }

  try {
    const { sessionToken, title, description, sect, assignee, priority, status, deadline, tags } = req.body;

    if (!sessionToken) {
      return res.status(400).json({ error: '缺少会话令牌' });
    }

    // 验证会话
    const session = SessionManager.validateSession(sessionToken);
    if (!session) {
      return res.status(401).json({ error: '会话已过期或无效' });
    }

    // 验证必填字段
    if (!title || !description) {
      return res.status(400).json({ error: '请填写任务标题和描述' });
    }

    // 创建任务数据
    const taskData = {
      title: title.trim(),
      description: description.trim(),
      sect: sect || '未分配',
      assignee: assignee || session.qq,
      priority: priority || '中',
      status: status || '规划中',
      progress: status === '完成' ? 100 : 0,
      deadline: deadline || '',
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []),
      createdBy: session.user_id,
      createdByName: session.global_nickname
    };

    // 创建任务
    const newTask = TaskManager.createTask(taskData);

    res.status(200).json({
      success: true,
      message: '任务创建成功',
      task: newTask
    });

  } catch (error) {
    console.error('创建任务错误:', error);
    res.status(500).json({ 
      error: error.message || '创建任务失败，请稍后重试' 
    });
  }
} 