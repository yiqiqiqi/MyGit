import { SessionManager, SuggestionManager, SectUserManager } from '../../../lib/database-simple';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '方法不允许' });
  }

  try {
    const { sessionToken, title, content, tags, priority, sectId } = req.body;

    if (!sessionToken) {
      return res.status(400).json({ error: '缺少会话令牌' });
    }

    // 验证会话
    const session = SessionManager.validateSession(sessionToken);
    if (!session) {
      return res.status(401).json({ error: '会话已过期或无效' });
    }

    // 验证必填字段
    if (!title || !content) {
      return res.status(400).json({ error: '请填写建议标题和内容' });
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

    // 创建建议数据
    const suggestionData = {
      title: title.trim(),
      content: content.trim(),
      author: `${sectNames[sectId] || sectId}·${sectUser.sectNickname}`,
      authorId: session.qq,
      authorGlobalName: session.global_nickname,
      sect: sectNames[sectId] || sectId,
      sectId: sectId,
      timestamp: new Date().toISOString(),
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []),
      priority: priority || '中'
    };

    // 创建建议
    const newSuggestion = SuggestionManager.createSuggestion(suggestionData);

    res.status(200).json({
      success: true,
      message: '建议创建成功',
      suggestion: newSuggestion
    });

  } catch (error) {
    console.error('创建建议错误:', error);
    res.status(500).json({ 
      error: error.message || '创建建议失败，请稍后重试' 
    });
  }
} 