// 微信开放平台登录API
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { code, state } = req.query;
    
    if (!code) {
      return res.status(400).json({ error: 'Authorization code is required' });
    }
    
    try {
      // 1. 通过code获取access_token
      const tokenResponse = await fetch(
        `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${process.env.WECHAT_APP_ID}&secret=${process.env.WECHAT_APP_SECRET}&code=${code}&grant_type=authorization_code`
      );
      
      const tokenData = await tokenResponse.json();
      
      if (tokenData.errcode) {
        return res.status(400).json({ error: tokenData.errmsg });
      }
      
      // 2. 获取用户信息
      const userResponse = await fetch(
        `https://api.weixin.qq.com/sns/userinfo?access_token=${tokenData.access_token}&openid=${tokenData.openid}`
      );
      
      const userData = await userResponse.json();
      
      if (userData.errcode) {
        return res.status(400).json({ error: userData.errmsg });
      }
      
      // 3. 返回用户信息
      res.status(200).json({
        openid: userData.openid,
        unionid: userData.unionid,
        nickname: userData.nickname,
        avatar: userData.headimgurl,
        sex: userData.sex,
        city: userData.city,
        province: userData.province,
        country: userData.country
      });
      
    } catch (error) {
      console.error('WeChat login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 