import { SessionManager, SuggestionManager } from '../../../lib/database-simple';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '方法不允许' });
  }

  try {
    const { sessionToken, suggestionId } = req.body;

    if (!sessionToken) {
      return res.status(400).json({ error: '缺少会话令牌' });
    }

    if (!suggestionId) {
      return res.status(400).json({ error: '缺少建议ID' });
    }

    // 验证会话
    const session = SessionManager.validateSession(sessionToken);
    if (!session) {
      return res.status(401).json({ error: '会话已过期或无效' });
    }

    // 点赞建议
    const updatedSuggestion = SuggestionManager.likeSuggestion(suggestionId);

    res.status(200).json({
      success: true,
      message: '点赞成功',
      suggestion: updatedSuggestion
    });

  } catch (error) {
    console.error('点赞建议错误:', error);
    res.status(500).json({ 
      error: error.message || '点赞失败，请稍后重试' 
    });
  }
} 