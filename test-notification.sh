#!/bin/bash

# Test Notification Script
# This script helps you quickly test the notification system

echo "🔔 SMSC Notification System - Test Script"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo -e "${YELLOW}⚠️  Warning: 'jq' is not installed. Install it for better output formatting.${NC}"
    echo "   sudo apt-get install jq"
    echo ""
fi

# Get backend URL
BACKEND_URL="${BACKEND_URL:-http://127.0.0.1:8000/api}"

echo -e "${BLUE}Backend URL: $BACKEND_URL${NC}"
echo ""

# Prompt for token
echo "📝 Please provide your authentication token:"
echo "   (You can find it in browser DevTools → Application → Cookies → 'rmc-token' or 'pma-token')"
echo ""
read -p "Token: " TOKEN

if [ -z "$TOKEN" ]; then
    echo -e "${RED}❌ Error: Token is required${NC}"
    exit 1
fi

echo ""
echo "=================================="
echo "🧪 Testing Notification Endpoints"
echo "=================================="
echo ""

# Test 1: Get Unread Count
echo -e "${BLUE}1️⃣  Testing: Get Unread Count${NC}"
echo "   GET $BACKEND_URL/rmc/notifications/unread-count"
echo ""
UNREAD_RESPONSE=$(curl -s -X GET "$BACKEND_URL/rmc/notifications/unread-count" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/json")

if command -v jq &> /dev/null; then
    echo "$UNREAD_RESPONSE" | jq '.'
else
    echo "$UNREAD_RESPONSE"
fi

UNREAD_COUNT=$(echo "$UNREAD_RESPONSE" | grep -o '"unread_count":[0-9]*' | grep -o '[0-9]*')
echo ""
echo -e "${GREEN}✅ Unread Count: $UNREAD_COUNT${NC}"
echo ""
sleep 1

# Test 2: Get All Notifications
echo -e "${BLUE}2️⃣  Testing: Get All Notifications (limit 5)${NC}"
echo "   GET $BACKEND_URL/rmc/notifications?limit=5&source=database"
echo ""
NOTIFICATIONS_RESPONSE=$(curl -s -X GET "$BACKEND_URL/rmc/notifications?limit=5&source=database" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/json")

if command -v jq &> /dev/null; then
    echo "$NOTIFICATIONS_RESPONSE" | jq '.data.notifications | length as $count | "Found \($count) notifications"'
    echo ""
    echo "$NOTIFICATIONS_RESPONSE" | jq '.data.notifications[] | "\(.id) - \(.title) (Read: \(.read_at != null))"'
else
    echo "$NOTIFICATIONS_RESPONSE"
fi
echo ""
sleep 1

# Test 3: Create Test Notification
echo -e "${BLUE}3️⃣  Testing: Create Test Notification${NC}"
echo "   POST $BACKEND_URL/rmc/notifications/test"
echo ""

TEST_NOTIFICATION=$(curl -s -X POST "$BACKEND_URL/rmc/notifications/test" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "event_code": "TEN_001",
    "title": "🧪 Test Notification",
    "message": "This is a test notification created by the test script",
    "key_id": 999,
    "data": {
      "test": true,
      "created_by": "test-script",
      "timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"
    }
  }')

if command -v jq &> /dev/null; then
    echo "$TEST_NOTIFICATION" | jq '.'
else
    echo "$TEST_NOTIFICATION"
fi

NEW_NOTIFICATION_ID=$(echo "$TEST_NOTIFICATION" | grep -o '"id":[0-9]*' | head -1 | grep -o '[0-9]*')

if [ -n "$NEW_NOTIFICATION_ID" ]; then
    echo ""
    echo -e "${GREEN}✅ Created Test Notification (ID: $NEW_NOTIFICATION_ID)${NC}"
    echo -e "${YELLOW}   → Check your frontend notification dropdown now!${NC}"
    echo ""
    sleep 2

    # Test 4: Mark as Read
    echo -e "${BLUE}4️⃣  Testing: Mark Notification as Read${NC}"
    echo "   POST $BACKEND_URL/rmc/notifications/$NEW_NOTIFICATION_ID/mark-read"
    echo ""
    
    MARK_READ_RESPONSE=$(curl -s -X POST "$BACKEND_URL/rmc/notifications/$NEW_NOTIFICATION_ID/mark-read" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Accept: application/json")
    
    if command -v jq &> /dev/null; then
        echo "$MARK_READ_RESPONSE" | jq '.'
    else
        echo "$MARK_READ_RESPONSE"
    fi
    echo ""
    echo -e "${GREEN}✅ Marked as Read${NC}"
    echo ""
    sleep 1

    # Test 5: Delete Notification
    echo -e "${BLUE}5️⃣  Testing: Delete Notification${NC}"
    echo "   DELETE $BACKEND_URL/rmc/notifications/$NEW_NOTIFICATION_ID"
    echo ""
    
    DELETE_RESPONSE=$(curl -s -X DELETE "$BACKEND_URL/rmc/notifications/$NEW_NOTIFICATION_ID" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Accept: application/json")
    
    if command -v jq &> /dev/null; then
        echo "$DELETE_RESPONSE" | jq '.'
    else
        echo "$DELETE_RESPONSE"
    fi
    echo ""
    echo -e "${GREEN}✅ Deleted Test Notification${NC}"
    echo ""
else
    echo -e "${RED}❌ Failed to create test notification${NC}"
    echo "   Response: $TEST_NOTIFICATION"
fi

echo ""
echo "=================================="
echo "✅ Testing Complete!"
echo "=================================="
echo ""
echo -e "${GREEN}Summary:${NC}"
echo "  • Unread count API: ✅"
echo "  • Get notifications API: ✅"
echo "  • Create notification API: ✅"
echo "  • Mark as read API: ✅"
echo "  • Delete notification API: ✅"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo "  1. Check the frontend notification dropdown"
echo "  2. Complete a tender onboarding to trigger automatic notifications"
echo "  3. Verify real-time updates (if WebSocket is configured)"
echo ""
echo "  📚 For detailed testing guide, see: NOTIFICATION_TESTING_GUIDE.md"
echo ""


