import { SectUserManager } from '../../../lib/db';

/**
 * 获取门派排行榜 API
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: '方法不允许' });
  }

  try {
    const { sectId, limit = 100 } = req.query;

    if (!sectId) {
      return res.status(400).json({ error: '缺少门派ID' });
    }

    const limitNum = Math.min(parseInt(limit) || 100, 500); // 最多500条

    // 获取门派排行榜
    const leaderboard = SectUserManager.getSectLeaderboard(sectId, limitNum);

    // 返回排行榜数据
    res.status(200).json({
      success: true,
      sectId,
      totalEntries: leaderboard.length,
      leaderboard: leaderboard.map((entry, index) => ({
        rank: index + 1,
        globalNickname: entry.global_nickname,
        sectNickname: entry.sect_nickname,
        cultivationLevel: entry.cultivation_level,
        sectPoints: entry.sect_points,
        joinTime: entry.join_time
      }))
    });

  } catch (error) {
    console.error('获取排行榜错误:', error);
    res.status(500).json({
      error: '获取排行榜失败，请稍后重试'
    });
  }
}
