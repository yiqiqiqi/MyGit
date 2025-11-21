#!/bin/bash

# 门派系统 API 快速测试脚本
# 用法: ./test-api.sh

BASE_URL="http://localhost:80"
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "=================================="
echo "门派系统 API 测试"
echo "=================================="
echo ""

# 测试 1: 注册新用户
echo "📝 测试 1: 注册新用户..."
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "qq": "99999999",
    "globalNickname": "API测试用户",
    "password": "test123456",
    "sectId": "tianyan",
    "sectNickname": "测试弟子"
  }')

if echo "$REGISTER_RESPONSE" | grep -q '"success":true'; then
  echo -e "${GREEN}✅ 注册成功${NC}"
  SESSION_TOKEN=$(echo "$REGISTER_RESPONSE" | grep -o '"sessionToken":"[^"]*' | cut -d'"' -f4)
  echo "   会话令牌: ${SESSION_TOKEN:0:20}..."
else
  echo -e "${RED}❌ 注册失败${NC}"
  echo "$REGISTER_RESPONSE" | jq '.' 2>/dev/null || echo "$REGISTER_RESPONSE"
fi

echo ""

# 测试 2: 登录
echo "🔐 测试 2: 用户登录..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "qq": "99999999",
    "password": "test123456",
    "sectId": "tianyan"
  }')

if echo "$LOGIN_RESPONSE" | grep -q '"success":true'; then
  echo -e "${GREEN}✅ 登录成功${NC}"
  SESSION_TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"sessionToken":"[^"]*' | cut -d'"' -f4)
else
  echo -e "${RED}❌ 登录失败${NC}"
  echo "$LOGIN_RESPONSE" | jq '.' 2>/dev/null || echo "$LOGIN_RESPONSE"
fi

echo ""

# 测试 3: 验证会话
if [ ! -z "$SESSION_TOKEN" ]; then
  echo "🔍 测试 3: 验证会话..."
  VERIFY_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/verify" \
    -H "Content-Type: application/json" \
    -d "{\"sessionToken\": \"$SESSION_TOKEN\"}")

  if echo "$VERIFY_RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ 会话验证成功${NC}"
    echo "$VERIFY_RESPONSE" | jq '.user | {qq, globalNickname, sectNickname, cultivationLevel, sectPoints}' 2>/dev/null
  else
    echo -e "${RED}❌ 会话验证失败${NC}"
  fi
fi

echo ""

# 测试 4: 获取门派成员列表
echo "👥 测试 4: 获取门派成员列表..."
MEMBERS_RESPONSE=$(curl -s "$BASE_URL/api/sects/members?sectId=tianyan")

if echo "$MEMBERS_RESPONSE" | grep -q '"success":true'; then
  echo -e "${GREEN}✅ 获取成功${NC}"
  MEMBER_COUNT=$(echo "$MEMBERS_RESPONSE" | grep -o '"totalMembers":[0-9]*' | cut -d':' -f2)
  echo "   总成员数: $MEMBER_COUNT"
  echo "$MEMBERS_RESPONSE" | jq '.members[0] | {rank, globalNickname, sectNickname, cultivationLevel, sectPoints}' 2>/dev/null
else
  echo -e "${RED}❌ 获取失败${NC}"
fi

echo ""

# 测试 5: 获取排行榜
echo "🏆 测试 5: 获取门派排行榜..."
LEADERBOARD_RESPONSE=$(curl -s "$BASE_URL/api/sects/leaderboard?sectId=tianyan&limit=5")

if echo "$LEADERBOARD_RESPONSE" | grep -q '"success":true'; then
  echo -e "${GREEN}✅ 获取成功${NC}"
  echo "$LEADERBOARD_RESPONSE" | jq '.leaderboard[0:3]' 2>/dev/null
else
  echo -e "${RED}❌ 获取失败${NC}"
fi

echo ""

# 测试 6: 更新全局昵称
if [ ! -z "$SESSION_TOKEN" ]; then
  echo "✏️  测试 6: 更新全局昵称..."
  UPDATE_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/update" \
    -H "Content-Type: application/json" \
    -d "{
      \"sessionToken\": \"$SESSION_TOKEN\",
      \"action\": \"updateGlobalNickname\",
      \"newNickname\": \"API测试用户_已更新\"
    }")

  if echo "$UPDATE_RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ 更新成功${NC}"
  else
    echo -e "${RED}❌ 更新失败${NC}"
  fi
fi

echo ""

# 测试 7: 登出
if [ ! -z "$SESSION_TOKEN" ]; then
  echo "👋 测试 7: 用户登出..."
  LOGOUT_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/logout" \
    -H "Content-Type: application/json" \
    -d "{\"sessionToken\": \"$SESSION_TOKEN\"}")

  if echo "$LOGOUT_RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ 登出成功${NC}"
  else
    echo -e "${RED}❌ 登出失败${NC}"
  fi
fi

echo ""
echo "=================================="
echo "测试完成！"
echo "=================================="
echo ""
echo "💡 提示："
echo "- 查看详细测试指南: TESTING_GUIDE.md"
echo "- 查看数据库: sqlite3 data/sect_system.db"
echo "- 查看日志: 开发服务器终端"
echo ""
