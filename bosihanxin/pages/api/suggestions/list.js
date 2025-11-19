import { SessionManager, SuggestionManager } from '../../../lib/database-simple';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: '方法不允许' });
  }

  try {
    const { sessionToken, sect, user, sort } = req.query;

    if (!sessionToken) {
      return res.status(400).json({ error: '缺少会话令牌' });
    }

    // 验证会话
    const session = SessionManager.validateSession(sessionToken);
    if (!session) {
      return res.status(401).json({ error: '会话已过期或无效' });
    }

    let suggestions;
    
    if (sect && sect !== 'all') {
      // 获取特定门派的建议
      suggestions = SuggestionManager.getSuggestionsBySect(sect);
    } else if (user) {
      // 获取特定用户的建议
      suggestions = SuggestionManager.getSuggestionsByUser(session.user_id);
    } else {
      // 获取所有建议
      suggestions = SuggestionManager.getAllSuggestions();
    }

    // 排序
    if (sort) {
      switch (sort) {
        case 'oldest':
          suggestions.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          break;
        case 'most_liked':
          suggestions.sort((a, b) => b.likes - a.likes);
          break;
        case 'latest':
        default:
          suggestions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
      }
    }

    res.status(200).json({
      success: true,
      suggestions: suggestions || []
    });

  } catch (error) {
    console.error('获取建议列表错误:', error);
    res.status(500).json({ 
      error: '获取建议列表失败，请稍后重试' 
    });
  }
} 