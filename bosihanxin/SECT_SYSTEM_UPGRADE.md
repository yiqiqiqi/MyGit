# 门派系统重大升级说明

## 📋 概述

本次升级对门派系统进行了全面重构，解决了之前存在的安全隐患和设计缺陷，提升了系统的可用性和可维护性。

## ✅ 已完成的主要更改

### 1. 统一密码系统

**之前的问题：**
- 用户需要记住两个密码（全局密码 + 门派密码）
- 设计复杂，用户体验差
- 门派密码的存在理由不明确

**现在的解决方案：**
- ✅ 移除了门派密码，只保留全局密码
- ✅ 用户使用同一个密码登录所有已加入的门派
- ✅ 简化了注册和登录流程

### 2. 升级数据库系统

**之前的问题：**
- 使用 JSON 文件存储（`database-simple.js`）
- 并发支持差，性能低下
- 不支持事务和索引

**现在的解决方案：**
- ✅ 创建新的 SQLite 数据库系统（`lib/db.js`）
- ✅ 支持完整的 ACID 事务
- ✅ 添加索引提高查询性能
- ✅ 使用 WAL 模式提升并发性能

### 3. 门派常量统一管理

**之前的问题：**
- 门派配置分散在多个文件中
- 门派名称等信息重复定义
- 难以维护和更新

**现在的解决方案：**
- ✅ 将所有门派配置提取到 `constants/appConstants.js`
- ✅ 统一的 `SECT_CONFIGS` 对象
- ✅ 提供工具函数（`getSectConfig`, `getSectName`, `getCultivationLevel`）
- ✅ 定义了完整的修炼等级系统和权限映射

### 4. 更新所有 API 端点

**已更新的 API：**
- ✅ `/api/auth/register` - 移除门派密码参数
- ✅ `/api/auth/login` - 简化登录流程
- ✅ `/api/auth/verify` - 增强用户信息返回
- ✅ `/api/auth/update` - 移除门派密码更改，添加资料更新
- ✅ `/api/auth/logout` - 保持不变

**新增的 API：**
- ✅ `/api/sects/switch` - 门派切换功能
- ✅ `/api/sects/members` - 获取门派成员列表
- ✅ `/api/sects/leaderboard` - 获取门派排行榜

### 5. 前端组件更新

**SectAuthNew.js 组件更新：**
- ✅ 移除了所有门派密码相关字段
- ✅ 从 `appConstants` 导入门派配置
- ✅ 简化了登录/注册表单
- ✅ 添加了键盘 Enter 键支持
- ✅ 移除了 `updateSectPassword` 函数
- ✅ 添加了 `updateProfile` 函数

**废弃的组件：**
- ❌ `SectAuth.js` → `SectAuth.js.deprecated`（已弃用，不安全）

### 6. 新增功能

**积分和等级系统：**
- ✅ 自动根据积分计算修炼等级
- ✅ 6级修炼等级：入门弟子、外门弟子、内门弟子、核心弟子、执事、长老
- ✅ 每个等级有对应的权限映射
- ✅ 积分历史记录

**排行榜系统：**
- ✅ 按门派积分排序
- ✅ 支持分页查询
- ✅ 显示用户排名

**门派切换：**
- ✅ 用户可以在已加入的门派间自由切换
- ✅ 自动更新会话和登录时间

**增强的日志系统：**
- ✅ 所有数据库操作都有日志记录
- ✅ 记录 IP 地址和 User-Agent
- ✅ 会话活动追踪

## 📦 新的数据库结构

### users 表（全局用户）
```sql
- id: INTEGER (主键)
- qq: TEXT (唯一)
- global_nickname: TEXT
- password_hash: TEXT (bcrypt 加密)
- created_at: DATETIME
- updated_at: DATETIME
- last_login: DATETIME
- is_active: BOOLEAN
- avatar_url: TEXT
- bio: TEXT
```

### sect_users 表（门派用户）
```sql
- id: INTEGER (主键)
- user_id: INTEGER (外键)
- sect_id: TEXT
- sect_nickname: TEXT
- join_time: DATETIME
- cultivation_level: TEXT
- sect_points: INTEGER
- last_login: DATETIME
- is_active: BOOLEAN
- UNIQUE(user_id, sect_id)
```

### sessions 表（会话）
```sql
- id: INTEGER (主键)
- user_id: INTEGER (外键)
- sect_id: TEXT
- session_token: TEXT (唯一)
- expires_at: DATETIME (7天过期)
- created_at: DATETIME
- last_activity: DATETIME
- ip_address: TEXT
- user_agent: TEXT
```

### suggestions 表（建议）
```sql
- id: INTEGER (主键)
- user_id: INTEGER (外键)
- sect_id: TEXT
- title: TEXT
- content: TEXT
- category: TEXT
- status: TEXT
- likes: INTEGER
- created_at: DATETIME
- updated_at: DATETIME
```

### tasks 表（任务）
```sql
- id: INTEGER (主键)
- sect_id: TEXT
- title: TEXT
- description: TEXT
- created_by: INTEGER (外键)
- assigned_to: INTEGER (外键)
- status: TEXT
- priority: TEXT
- due_date: DATETIME
- created_at: DATETIME
- updated_at: DATETIME
- completed_at: DATETIME
```

### point_history 表（积分历史）
```sql
- id: INTEGER (主键)
- user_id: INTEGER (外键)
- sect_id: TEXT
- points_change: INTEGER
- reason: TEXT
- created_at: DATETIME
```

## 🔧 迁移指南

### 对于开发者

1. **更新导入语句：**
```javascript
// ❌ 旧的
import { UserManager } from '../../../lib/database-simple';

// ✅ 新的
import { UserManager } from '../../../lib/db';
```

2. **更新注册调用：**
```javascript
// ❌ 旧的（需要两个密码）
await api.register(qq, globalNickname, password, sectId, sectNickname, sectPassword);

// ✅ 新的（只需要一个密码）
await api.register(qq, globalNickname, password, sectId, sectNickname);
```

3. **更新登录调用：**
```javascript
// ❌ 旧的（需要两个密码）
await api.login(qq, password, sectId, sectPassword);

// ✅ 新的（只需要一个密码）
await api.login(qq, password, sectId);
```

4. **使用门派配置：**
```javascript
// ❌ 旧的（硬编码）
const sectConfig = {
  name: '天眼门',
  subtitle: '感知天下宗',
  // ...
};

// ✅ 新的（从常量导入）
import { SECT_CONFIGS, getSectConfig } from '../constants/appConstants';
const sectConfig = getSectConfig(sectId);
```

### 对于用户

1. **首次登录需要重新注册：**
   - 旧的数据使用 JSON 文件存储，新系统使用 SQLite
   - 用户需要重新注册账号（只需一个密码）

2. **简化的登录流程：**
   - 只需输入 QQ 号和密码即可登录
   - 无需再输入门派密码

3. **新功能可用：**
   - 可以查看门派成员列表
   - 可以查看门派排行榜
   - 可以在已加入的门派间切换

## 🔒 安全性提升

### 之前的安全问题

1. ❌ 使用不安全的哈希函数（`simpleHash`）
2. ❌ 密码存储在 localStorage（易受 XSS 攻击）
3. ❌ 没有会话过期机制
4. ❌ 缺少输入验证

### 现在的安全措施

1. ✅ 使用 bcrypt 加密密码（10轮salt）
2. ✅ 会话令牌使用加密随机字节（32字节）
3. ✅ 会话自动过期（7天）
4. ✅ 定期清理过期会话（每小时）
5. ✅ 完善的输入验证
6. ✅ SQL 注入防护（参数化查询）
7. ✅ 记录 IP 和 User-Agent 用于审计

## 📊 性能优化

1. ✅ 数据库索引（QQ号、会话令牌、门派ID等）
2. ✅ WAL 模式提升并发性能
3. ✅ 事务批处理
4. ✅ 自动清理过期数据

## 🚧 后续工作（TODO）

以下功能已设计但未完全实现，可作为后续改进方向：

### 高优先级
- [ ] 使用 HttpOnly Cookie 替代 localStorage 存储会话令牌
- [ ] 实现完整的权限系统（基于修炼等级）
- [ ] 优化门派页面代码（提取共享组件，减少重复）
- [ ] 数据迁移工具（从 JSON 到 SQLite）

### 中优先级
- [ ] 完整的积分兑换系统
- [ ] 门派任务指派和完成流程
- [ ] 建议审核机制
- [ ] 实时通知系统
- [ ] 用户头像上传

### 低优先级
- [ ] 跨门派消息系统
- [ ] 成就系统
- [ ] 门派活动日历
- [ ] 数据导出功能

## 📝 文件变更清单

### 新增文件
- `lib/db.js` - 新的 SQLite 数据库系统
- `pages/api/sects/switch.js` - 门派切换 API
- `pages/api/sects/members.js` - 成员列表 API
- `pages/api/sects/leaderboard.js` - 排行榜 API
- `SECT_SYSTEM_UPGRADE.md` - 本文档

### 修改文件
- `constants/appConstants.js` - 添加门派配置和等级系统
- `components/SectAuthNew.js` - 移除双密码系统
- `pages/api/auth/register.js` - 简化注册流程
- `pages/api/auth/login.js` - 简化登录流程
- `pages/api/auth/verify.js` - 增强返回信息
- `pages/api/auth/update.js` - 更新功能调整
- `pages/api/auth/logout.js` - 更新导入路径

### 废弃文件
- `components/SectAuth.js` → `components/SectAuth.js.deprecated`
- `lib/database-simple.js` - 仍保留但不建议使用
- `lib/database.js` - 被 `lib/db.js` 替代

## 🔄 兼容性说明

**破坏性更改：**
- 旧的 API 调用需要更新（移除门派密码参数）
- 数据库结构完全重新设计
- 用户需要重新注册

**向后兼容：**
- 保留了旧的数据库文件（未删除）
- SectAuth.js 被重命名而非删除
- 门派页面的基本结构保持不变

## 💬 反馈和支持

如有问题或建议，请通过以下方式联系：
- 创建 GitHub Issue
- 联系技术团队

---

**版本**: 2.0.0
**更新日期**: 2025-11-21
**维护者**: Claude AI Assistant
