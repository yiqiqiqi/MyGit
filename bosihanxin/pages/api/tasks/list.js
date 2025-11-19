import { SessionManager, TaskManager } from '../../../lib/database-simple';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: '方法不允许' });
  }

  try {
    const { sessionToken, sect, user } = req.query;

    if (!sessionToken) {
      return res.status(400).json({ error: '缺少会话令牌' });
    }

    // 验证会话
    const session = SessionManager.validateSession(sessionToken);
    if (!session) {
      return res.status(401).json({ error: '会话已过期或无效' });
    }

    let tasks;
    
    if (sect && sect !== 'all') {
      // 获取特定门派的任务
      tasks = TaskManager.getTasksBySect(sect);
    } else if (user) {
      // 获取特定用户的任务
      tasks = TaskManager.getTasksByUser(session.user_id);
    } else {
      // 获取所有任务
      tasks = TaskManager.getAllTasks();
    }

    res.status(200).json({
      success: true,
      tasks: tasks || []
    });

  } catch (error) {
    console.error('获取任务列表错误:', error);
    res.status(500).json({ 
      error: '获取任务列表失败，请稍后重试' 
    });
  }
} 