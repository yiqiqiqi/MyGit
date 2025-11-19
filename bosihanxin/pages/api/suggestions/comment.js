import { SessionManager, SuggestionManager, SectUserManager } from '../../../lib/database-simple';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '方法不允许' });
  }

  try {
    const { sessionToken, suggestionId, content, sectId } = req.body;

    if (!sessionToken) {
      return res.status(400).json({ error: '缺少会话令牌' });
    }

    if (!suggestionId) {
      return res.status(400).json({ error: '缺少建议ID' });
    }

    if (!content || !content.trim()) {
      return res.status(400).json({ error: '请输入评论内容' });
    }

    // 验证会话
    const session = SessionManager.validateSession(sessionToken);
    if (!session) {
      return res.status(401).json({ error: '会话已过期或无效' });
    }

    // 获取门派用户信息
    const sectUser = SectUserManager.getSectUser(session.user_id, sectId);
    if (!sectUser) {
      return res.status(400).json({ error: '用户未加入指定门派' });
    }

    // 门派名称映射
    const sectNames = {
      'tianyan': '天眼门',
      'qianli': '千里门',
      'suantian': '算天门',
      'yuqi': '御器门',
      'juneng': '聚能门',
      'ronghe': '融合门',
      'tianji': '天机门',
      'huanxiang': '幻象门',
      'yunxiao': '云霄门',
      'jiagou': '架构门',
      'shuju': '数据门',
      'zhihui': '智慧门'
    };

    // 创建评论数据
    const commentData = {
      author: `${sectNames[sectId] || sectId}·${sectUser.sectNickname}`,
      authorId: session.qq,
      authorGlobalName: session.global_nickname,
      content: content.trim()
    };

    // 添加评论
    const newComment = SuggestionManager.addComment(suggestionId, commentData);

    res.status(200).json({
      success: true,
      message: '评论添加成功',
      comment: newComment
    });

  } catch (error) {
    console.error('添加评论错误:', error);
    res.status(500).json({ 
      error: error.message || '添加评论失败，请稍后重试' 
    });
  }
} 