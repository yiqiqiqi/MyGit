# 门派系统测试指南

## 🚀 快速启动

### 1. 安装依赖（已完成）
```bash
cd /home/user/MyGit/bosihanxin
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

服务器将在 http://localhost:80 启动

---

## 📋 测试清单

### 阶段 1：基础功能测试

#### ✅ 测试 1.1 - 用户注册
1. 访问任意门派页面（例如：http://localhost:80/sects/hardware/tianyan-men）
2. 点击"新用户注册"
3. 填写以下信息：
   - **QQ号**：12345678（5-12位数字）
   - **全局昵称**：测试用户
   - **密码**：test123（6-50个字符）
   - **门派昵称**：天眼弟子
4. 点击"确认入门"

**预期结果**：
- ✅ 注册成功，自动登录
- ✅ 显示欢迎页面
- ✅ 显示修炼境界：入门弟子
- ✅ 显示门派积分：0

**检查点**：
- 数据库文件创建：`data/sect_system.db`
- 控制台日志：`[INFO] 用户注册成功`
- 控制台日志：`[INFO] 用户加入门派成功`

---

#### ✅ 测试 1.2 - 用户登录
1. 点击"退出门派"
2. 在登录页面输入：
   - **QQ号**：12345678
   - **密码**：test123
3. 点击"登录门派"

**预期结果**：
- ✅ 登录成功
- ✅ 显示用户信息正确
- ✅ 会话令牌保存到 localStorage

**检查点**：
- 浏览器 localStorage 中有 `session_token_tianyan`
- 控制台日志：`[INFO] 用户登录成功`

---

#### ✅ 测试 1.3 - 会话验证（自动登录）
1. 保持登录状态
2. 刷新页面（F5）

**预期结果**：
- ✅ 无需重新登录
- ✅ 自动恢复登录状态
- ✅ 用户信息正确显示

---

### 阶段 2：多门派测试

#### ✅ 测试 2.1 - 加入第二个门派
1. 保持第一个门派的登录状态
2. 访问另一个门派（例如：http://localhost:80/sects/software/tianji-men）
3. 点击"新用户注册"
4. 填写信息（QQ号使用同一个）：
   - **QQ号**：12345678（相同QQ号）
   - **全局昵称**：测试用户（会自动使用已注册的）
   - **密码**：test123（相同密码）
   - **门派昵称**：天机门徒

**预期结果**：
- ✅ 成功加入第二个门派
- ✅ 不需要创建新的全局账号
- ✅ 显示为该门派的入门弟子

---

#### ✅ 测试 2.2 - 门派切换
1. 在天机门登录状态下
2. 访问 http://localhost:80/sects/hardware/tianyan-men
3. 应该提示登录（因为会话是针对天机门的）
4. 使用相同密码登录

**预期结果**：
- ✅ 可以登录天眼门
- ✅ 显示天眼门的门派昵称
- ✅ 两个门派的积分和等级独立

---

### 阶段 3：API 测试

#### ✅ 测试 3.1 - 门派成员列表 API
使用浏览器访问或使用 curl：
```bash
curl http://localhost:80/api/sects/members?sectId=tianyan
```

**预期返回**：
```json
{
  "success": true,
  "sectId": "tianyan",
  "totalMembers": 1,
  "members": [
    {
      "rank": 1,
      "userId": 1,
      "qq": "12345678",
      "globalNickname": "测试用户",
      "sectNickname": "天眼弟子",
      "cultivationLevel": "入门弟子",
      "sectPoints": 0,
      "joinTime": "...",
      "lastLogin": "..."
    }
  ]
}
```

---

#### ✅ 测试 3.2 - 门派排行榜 API
```bash
curl http://localhost:80/api/sects/leaderboard?sectId=tianyan&limit=10
```

**预期返回**：
```json
{
  "success": true,
  "sectId": "tianyan",
  "totalEntries": 1,
  "leaderboard": [
    {
      "rank": 1,
      "globalNickname": "测试用户",
      "sectNickname": "天眼弟子",
      "cultivationLevel": "入门弟子",
      "sectPoints": 0,
      "joinTime": "..."
    }
  ]
}
```

---

### 阶段 4：数据完整性测试

#### ✅ 测试 4.1 - 检查数据库
使用 SQLite 工具查看数据库：
```bash
cd /home/user/MyGit/bosihanxin/data
sqlite3 sect_system.db
```

执行 SQL 查询：
```sql
-- 查看所有用户
SELECT * FROM users;

-- 查看所有门派用户
SELECT * FROM sect_users;

-- 查看所有会话
SELECT * FROM sessions;

-- 检查密码是否加密
SELECT qq, password_hash FROM users;
```

**预期结果**：
- ✅ users 表有一条记录
- ✅ sect_users 表有对应数量的记录
- ✅ password_hash 是 bcrypt 加密字符串（以 `$2a$` 开头）

---

#### ✅ 测试 4.2 - 修改用户信息
1. 在门派页面点击"账户设置"（如果页面有此功能）
2. 或使用 API 测试工具

使用 curl 测试：
```bash
# 先获取 sessionToken（从浏览器 localStorage 复制）
SESSION_TOKEN="your_session_token_here"

# 更新全局昵称
curl -X POST http://localhost:80/api/auth/update \
  -H "Content-Type: application/json" \
  -d '{
    "sessionToken": "'$SESSION_TOKEN'",
    "action": "updateGlobalNickname",
    "newNickname": "新昵称"
  }'

# 更新门派昵称
curl -X POST http://localhost:80/api/auth/update \
  -H "Content-Type: application/json" \
  -d '{
    "sessionToken": "'$SESSION_TOKEN'",
    "action": "updateSectNickname",
    "newNickname": "新门派昵称"
  }'
```

**预期结果**：
- ✅ 更新成功，返回 `{"success": true}`
- ✅ 刷新页面后显示新昵称

---

### 阶段 5：安全性测试

#### ✅ 测试 5.1 - 密码加密验证
1. 打开数据库查看密码：
```bash
sqlite3 data/sect_system.db "SELECT qq, password_hash FROM users;"
```

**预期结果**：
- ✅ password_hash 是长字符串（约 60 字符）
- ✅ 以 `$2a$10$` 或 `$2b$10$` 开头（bcrypt 格式）
- ✅ 每次注册相同密码，hash 值都不同（因为有 salt）

---

#### ✅ 测试 5.2 - 会话过期测试
1. 手动修改数据库中的会话过期时间：
```sql
UPDATE sessions SET expires_at = datetime('now', '-1 day') WHERE id = 1;
```

2. 刷新页面

**预期结果**：
- ✅ 会话失效，需要重新登录
- ✅ localStorage 中的 token 被清除

---

#### ✅ 测试 5.3 - 输入验证测试
测试各种无效输入：

**QQ号验证**：
- ❌ `123`（太短）→ 应该显示错误
- ❌ `abcdefg`（非数字）→ 应该显示错误
- ✅ `12345678`（有效）

**密码验证**：
- ❌ `123`（太短）→ 应该显示错误
- ✅ `test123`（有效，6-50字符）

**昵称验证**：
- ❌ 空字符串 → 应该显示错误
- ❌ 超过20个字符 → 应该显示错误
- ✅ `测试用户`（有效）

---

### 阶段 6：性能和并发测试

#### ✅ 测试 6.1 - 多用户注册
创建 5-10 个测试账号：
```javascript
// 在浏览器控制台运行
const testUsers = [
  { qq: '11111111', nick: 'User1' },
  { qq: '22222222', nick: 'User2' },
  { qq: '33333333', nick: 'User3' },
  { qq: '44444444', nick: 'User4' },
  { qq: '55555555', nick: 'User5' }
];

// 手动注册这些用户
```

**预期结果**：
- ✅ 所有用户成功注册
- ✅ 排行榜显示所有用户
- ✅ 成员列表正确

---

#### ✅ 测试 6.2 - 查询性能
```bash
# 查看查询计划
sqlite3 data/sect_system.db

EXPLAIN QUERY PLAN SELECT * FROM sect_users WHERE sect_id = 'tianyan';
EXPLAIN QUERY PLAN SELECT * FROM sessions WHERE session_token = 'xxx';
```

**预期结果**：
- ✅ 使用索引查询（SEARCH ... USING INDEX）
- ✅ 不是全表扫描（SCAN TABLE）

---

## 🔍 调试技巧

### 查看日志
新数据库系统有内置日志，在终端查看：
```bash
npm run dev
```

日志格式：
- `[INFO]` - 正常操作
- `[ERROR]` - 错误
- `[WARN]` - 警告

### 检查 localStorage
在浏览器控制台：
```javascript
// 查看所有 localStorage
console.log(localStorage);

// 查看特定会话令牌
console.log(localStorage.getItem('session_token_tianyan'));

// 清除会话（强制重新登录）
localStorage.removeItem('session_token_tianyan');
```

### 重置数据库
如果需要完全重置：
```bash
cd /home/user/MyGit/bosihanxin
rm -f data/sect_system.db
# 重启服务器，数据库会自动重新创建
```

---

## ✅ 完整测试检查清单

| 测试项 | 状态 | 备注 |
|--------|------|------|
| ✅ 用户注册 | ⬜ | |
| ✅ 用户登录 | ⬜ | |
| ✅ 会话验证 | ⬜ | |
| ✅ 加入多个门派 | ⬜ | |
| ✅ 门派切换 | ⬜ | |
| ✅ 成员列表 API | ⬜ | |
| ✅ 排行榜 API | ⬜ | |
| ✅ 更新昵称 | ⬜ | |
| ✅ 更新密码 | ⬜ | |
| ✅ 密码加密 | ⬜ | |
| ✅ 会话过期 | ⬜ | |
| ✅ 输入验证 | ⬜ | |
| ✅ 数据完整性 | ⬜ | |

---

## 🐛 常见问题排查

### 问题 1：无法连接数据库
**错误信息**：`Error: SQLITE_CANTOPEN`

**解决方案**：
```bash
# 确保 data 目录存在
mkdir -p /home/user/MyGit/bosihanxin/data

# 检查权限
ls -la /home/user/MyGit/bosihanxin/data
```

---

### 问题 2：Module not found: better-sqlite3
**解决方案**：
```bash
cd /home/user/MyGit/bosihanxin
npm install better-sqlite3
npm run dev
```

---

### 问题 3：会话一直失效
**检查**：
1. 查看浏览器 localStorage
2. 检查数据库 sessions 表
3. 查看服务器日志

---

### 问题 4：注册时提示"该QQ号已注册"
这是正常的！如果你用同一个QQ号注册新门派，系统会：
1. 复用已有的全局账号
2. 创建新的门派账号
3. 不会报错（除非你已经加入了这个门派）

---

## 📊 预期的数据库结构

注册一个用户后，数据库应该有：

**users 表**：1 条记录
```
id | qq       | global_nickname | password_hash      | ...
1  | 12345678 | 测试用户        | $2a$10$...        | ...
```

**sect_users 表**：每个门派 1 条记录
```
id | user_id | sect_id | sect_nickname | cultivation_level | sect_points
1  | 1       | tianyan | 天眼弟子      | 入门弟子          | 0
```

**sessions 表**：活跃会话
```
id | user_id | sect_id | session_token     | expires_at
1  | 1       | tianyan | abc123...         | 2025-11-28...
```

---

## 🎯 测试成功标准

**基础功能（必须通过）**：
- ✅ 注册、登录、登出正常工作
- ✅ 密码使用 bcrypt 加密
- ✅ 会话机制正常
- ✅ 可以加入多个门派

**高级功能（建议通过）**：
- ✅ API 端点返回正确数据
- ✅ 数据库索引正常工作
- ✅ 输入验证完善
- ✅ 会话自动过期

---

**开始测试吧！** 如果遇到任何问题，请查看服务器日志或参考常见问题排查部分。
