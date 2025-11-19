// 检查微信登录状态API
// 这个API用于轮询检查用户是否完成了微信扫码登录

// 在真实环境中，你需要一个数据库或缓存来存储登录状态
// 这里使用内存存储作为示例，实际项目中建议使用Redis
const loginStatus = new Map();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { token } = req.query;
    
    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }
    
    try {
      // 获取当前token的登录状态
      const status = loginStatus.get(token) || { status: 'waiting' };
      
      // 清理过期的状态（5分钟）
      const now = Date.now();
      if (status.timestamp && (now - status.timestamp) > 5 * 60 * 1000) {
        loginStatus.delete(token);
        return res.status(200).json({ status: 'expired' });
      }
      
      res.status(200).json(status);
      
    } catch (error) {
      console.error('Check login status error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    // 更新登录状态（由微信回调接口调用）
    const { token, status, userInfo } = req.body;
    
    if (!token || !status) {
      return res.status(400).json({ error: 'Token and status are required' });
    }
    
    loginStatus.set(token, {
      status,
      userInfo,
      timestamp: Date.now()
    });
    
    res.status(200).json({ success: true });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// 清理过期的登录状态（定期清理内存）
setInterval(() => {
  const now = Date.now();
  const expireTime = 5 * 60 * 1000; // 5分钟
  
  for (const [token, data] of loginStatus.entries()) {
    if (data.timestamp && (now - data.timestamp) > expireTime) {
      loginStatus.delete(token);
    }
  }
}, 60 * 1000); // 每分钟清理一次 