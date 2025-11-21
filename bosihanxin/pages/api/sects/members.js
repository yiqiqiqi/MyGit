import { SectUserManager } from '../../../lib/db';

/**
 * 获取门派成员列表 API
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: '方法不允许' });
  }

  try {
    const { sectId } = req.query;

    if (!sectId) {
      return res.status(400).json({ error: '缺少门派ID' });
    }

    // 获取门派所有成员
    const members = SectUserManager.getSectMembers(sectId);

    // 返回成员列表
    res.status(200).json({
      success: true,
      sectId,
      totalMembers: members.length,
      members: members.map((member, index) => ({
        rank: index + 1,
        userId: member.user_id,
        qq: member.qq,
        globalNickname: member.global_nickname,
        sectNickname: member.sect_nickname,
        cultivationLevel: member.cultivation_level,
        sectPoints: member.sect_points,
        joinTime: member.join_time,
        lastLogin: member.last_login
      }))
    });

  } catch (error) {
    console.error('获取门派成员错误:', error);
    res.status(500).json({
      error: '获取成员列表失败，请稍后重试'
    });
  }
}
