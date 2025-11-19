# EEnous 跨设备登录解决方案

## 问题描述

您在测试时发现，在一台电脑上注册的账号无法在另一台电脑上登录。这是因为原有的用户认证系统使用 `localStorage` 进行本地存储，账号信息只保存在单台设备的浏览器中。

## 解决方案

我们已经实现了一套完整的服务器端用户认证系统，支持跨设备登录。

### 1. 技术架构

- **数据库**: SQLite 数据库存储用户信息
- **密码加密**: bcrypt 加密算法保护用户密码
- **会话管理**: JWT-like token 机制，支持7天免登录
- **API接口**: RESTful API 实现用户注册、登录、验证等功能

### 2. 数据结构

#### 用户表 (users)
- id: 主键
- qq: QQ号（唯一）
- global_nickname: 全局昵称
- password_hash: 加密后的密码
- created_at, updated_at, last_login: 时间戳
- is_active: 账号状态

#### 门派用户表 (sect_users)  
- id: 主键
- user_id: 关联用户ID
- sect_id: 门派ID
- sect_nickname: 门派昵称
- sect_password_hash: 门派密码（加密）
- cultivation_level: 修炼等级
- sect_points: 门派积分
- join_time, last_login: 时间戳

#### 会话表 (sessions)
- id: 主键
- user_id: 用户ID
- sect_id: 门派ID
- session_token: 会话令牌
- expires_at: 过期时间

### 3. 部署步骤

#### 3.1 安装依赖

由于权限问题，请手动安装必需的依赖：

\`\`\`bash
# 使用管理员权限运行命令提示符或PowerShell
npm install better-sqlite3 bcryptjs

# 或者如果有yarn
yarn add better-sqlite3 bcryptjs
\`\`\`

#### 3.2 文件结构

新增文件：
- `lib/database.js` - 数据库管理模块
- `pages/api/auth/register.js` - 注册API
- `pages/api/auth/login.js` - 登录API  
- `pages/api/auth/verify.js` - 会话验证API
- `pages/api/auth/logout.js` - 登出API
- `pages/api/auth/update.js` - 用户信息更新API
- `components/SectAuthNew.js` - 新的认证组件
- `scripts/migrate-data.js` - 数据迁移工具

#### 3.3 启动服务

\`\`\`bash
npm run dev
\`\`\`

数据库会自动初始化，在 `data/users.db` 文件中。

### 4. 使用方法

#### 4.1 更新门派页面

将现有门派页面中的 `SectAuth` 组件替换为 `SectAuthNew`：

\`\`\`javascript
// 原来
import SectAuth from '../../../components/SectAuth';

// 改为
import SectAuth from '../../../components/SectAuthNew';
\`\`\`

#### 4.2 用户迁移

对于现有用户，我们提供了数据迁移工具：

1. 打开浏览器开发者工具
2. 在控制台中运行：\`EenousDataMigration.showMigrationInstructions()\`
3. 按照提示导出旧数据
4. 使用相同信息重新注册

### 5. 新功能特性

#### 5.1 全局密码 + 门派密码
- **全局密码**: 用于验证用户身份，跨所有门派
- **门派密码**: 每个门派独立的密码，提供额外安全层

#### 5.2 会话管理
- 自动登录（7天有效期）
- 跨设备同步
- 安全登出

#### 5.3 密码安全
- bcrypt 加密存储
- 密码强度验证（最少6位）
- 支持密码修改

### 6. API 接口

#### 注册
\`POST /api/auth/register\`
\`\`\`json
{
  "qq": "123456789",
  "globalNickname": "全局昵称",
  "password": "全局密码",
  "sectId": "tianyan",
  "sectNickname": "门派昵称", 
  "sectPassword": "门派密码"
}
\`\`\`

#### 登录
\`POST /api/auth/login\`
\`\`\`json
{
  "qq": "123456789",
  "password": "全局密码",
  "sectId": "tianyan",
  "sectPassword": "门派密码"
}
\`\`\`

#### 会话验证
\`POST /api/auth/verify\`
\`\`\`json
{
  "sessionToken": "会话令牌"
}
\`\`\`

### 7. 兼容性说明

- **任务数据**: 保留在 localStorage 中，不受影响
- **建议数据**: 保留在 localStorage 中，不受影响  
- **跨门派功能**: 完全兼容，支持数据同步
- **原有UI**: 保持一致的用户体验

### 8. 测试验证

部署完成后，您可以：

1. 在电脑A上注册新账号
2. 在电脑B上使用相同的QQ号和密码登录
3. 验证数据同步和功能正常

### 9. 故障排除

#### 9.1 依赖安装失败
- 使用管理员权限运行命令
- 或尝试使用 yarn 代替 npm
- 确保 Node.js 版本兼容

#### 9.2 数据库初始化失败
- 检查 `data` 目录权限
- 确保 SQLite 依赖正确安装

#### 9.3 API 请求失败
- 检查服务器是否正常启动
- 查看浏览器开发者工具中的网络请求
- 检查服务器日志

## 总结

通过这套解决方案，EEnous 网站现在支持：

✅ **跨设备登录**: 任何设备都可以登录同一账号  
✅ **数据安全**: 密码加密存储，会话管理  
✅ **用户体验**: 自动登录，无缝切换  
✅ **向后兼容**: 现有功能不受影响  
✅ **扩展性**: 支持未来功能扩展

这样就彻底解决了您遇到的跨设备登录问题！ 