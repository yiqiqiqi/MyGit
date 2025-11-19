# 🔐 微信开放平台登录接入指南

## 📋 接入流程总览

### 1️⃣ 微信开放平台申请

#### 申请条件
- ✅ 已注册的公司或个体工商户
- ✅ 已备案的域名
- ✅ 300元认证费用

#### 申请步骤
1. **注册开发者账号**
   - 访问 [微信开放平台](https://open.weixin.qq.com/)
   - 注册并完成开发者认证

2. **创建网站应用**
   - 登录开放平台管理中心
   - 选择"网站应用" → "创建应用"
   - 填写应用基本信息
   - 上传应用图标和截图

3. **配置授权回调域名**
   ```
   # 示例域名配置
   主域名: yourdomain.com
   回调域名: yourdomain.com
   ```

4. **获取应用凭证**
   - 获取 `AppID` 和 `AppSecret`
   - 妥善保管，不要泄露

### 2️⃣ 环境配置

#### 创建环境变量文件 `.env.local`
```bash
# 微信开放平台配置
WECHAT_APP_ID=your_wechat_app_id_here
WECHAT_APP_SECRET=your_wechat_app_secret_here

# 网站域名配置（用于微信授权回调）
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# 启用真实微信登录
NEXT_PUBLIC_ENABLE_REAL_WECHAT=true
NEXT_PUBLIC_WECHAT_APP_ID=your_wechat_app_id_here
```

#### 本地开发环境
```bash
# 开发环境使用模拟登录
NEXT_PUBLIC_ENABLE_REAL_WECHAT=false
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3️⃣ 代码实现

已为你实现了完整的微信登录系统：

#### API 接口
- ✅ `/api/wechat/login.js` - 处理微信授权回调
- ✅ `/api/wechat/check-login.js` - 检查登录状态

#### 前端组件
- ✅ `WeChatLoginManager` - 登录管理类，支持真实和模拟登录
- ✅ 自动检测环境，无缝切换

### 4️⃣ 部署配置

#### Vercel 部署
1. **环境变量配置**
   ```bash
   # 在 Vercel Dashboard 中配置
   WECHAT_APP_ID=your_app_id
   WECHAT_APP_SECRET=your_app_secret
   NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
   NEXT_PUBLIC_ENABLE_REAL_WECHAT=true
   NEXT_PUBLIC_WECHAT_APP_ID=your_app_id
   ```

2. **域名配置**
   - 在微信开放平台中添加 Vercel 域名到授权回调域名列表
   - 或者绑定自定义域名

#### 自建服务器部署
1. **HTTPS 配置** ⚠️
   ```bash
   # 微信开放平台要求必须使用 HTTPS
   # 配置 SSL 证书
   ```

2. **环境变量**
   ```bash
   # 服务器环境变量
   export WECHAT_APP_ID="your_app_id"
   export WECHAT_APP_SECRET="your_app_secret"
   export NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
   export NEXT_PUBLIC_ENABLE_REAL_WECHAT="true"
   ```

### 5️⃣ 生产环境优化

#### 数据存储优化
当前使用内存存储登录状态，生产环境建议使用 Redis：

```javascript
// 安装 Redis 客户端
npm install redis

// 修改 /api/wechat/check-login.js
import { createClient } from 'redis';

const redis = createClient({
  url: process.env.REDIS_URL
});
```

#### 安全性增强
```javascript
// 1. 添加 CSRF 保护
// 2. 验证 state 参数
// 3. 设置 session 过期时间
// 4. 使用 HTTPS
```

### 6️⃣ 测试流程

#### 开发环境测试
```bash
# 1. 启动开发服务器
npm run dev

# 2. 访问天眼门页面
http://localhost:3000/sects/hardware/tianyan-men

# 3. 点击登录，查看模拟登录流程
```

#### 生产环境测试
```bash
# 1. 确保环境变量正确配置
# 2. 部署到服务器
# 3. 使用微信扫码测试真实登录流程
```

### 7️⃣ 常见问题

#### Q: 微信登录二维码无法显示？
A: 检查 `NEXT_PUBLIC_WECHAT_APP_ID` 是否正确配置

#### Q: 扫码后没有反应？
A: 
1. 检查回调域名是否正确配置
2. 确认服务器使用 HTTPS
3. 查看浏览器控制台错误信息

#### Q: 获取用户信息失败？
A: 
1. 确认 AppSecret 配置正确
2. 检查网络连接
3. 查看服务器日志

#### Q: 本地开发无法测试真实登录？
A: 
1. 使用模拟登录进行开发
2. 或使用 ngrok 等工具创建 HTTPS 隧道

### 8️⃣ 监控和维护

#### 日志监控
```javascript
// 添加登录日志
console.log('WeChat login attempt:', { 
  openid: userData.openid, 
  timestamp: new Date().toISOString() 
});
```

#### 错误处理
```javascript
// 完善错误处理
try {
  // 微信登录逻辑
} catch (error) {
  // 记录错误日志
  console.error('WeChat login error:', error);
  // 用户友好的错误提示
}
```

---

## 🎯 快速启动

### 立即体验模拟登录
1. 确保 `NEXT_PUBLIC_ENABLE_REAL_WECHAT=false`
2. 访问天眼门页面
3. 点击微信登录体验完整流程

### 配置真实登录
1. 申请微信开放平台账号
2. 创建网站应用
3. 配置环境变量
4. 部署到 HTTPS 服务器
5. 测试扫码登录

---

## 📞 技术支持

如果在接入过程中遇到问题，可以：
1. 查看微信开放平台文档
2. 检查浏览器控制台错误
3. 查看服务器日志
4. 联系技术支持

---

**🚀 恭喜！你的网站现在支持微信扫码登录了！** 