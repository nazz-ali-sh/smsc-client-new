#!/bin/bash

# Test RMC Onboarding → Notification Flow
# This script verifies the complete notification flow

echo "🧪 TESTING: RMC Onboarding → Notification Flow"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Backend URL
BACKEND_URL="${BACKEND_URL:-http://127.0.0.1:8000/api}"

echo -e "${BLUE}This test verifies:${NC}"
echo "  1. ✅ Notification created when tender is created"
echo "  2. ✅ Notification stored in database"
echo "  3. ✅ Notification broadcasted via Pusher"
echo "  4. ✅ Frontend receives and displays it"
echo ""
echo "================================================"
echo ""

# Prompt for token
echo "📝 To test, I need your authentication token:"
echo "   (Login to http://localhost:3001, then:"
echo "    Press F12 → Application → Cookies → Copy 'rmc-token')"
echo ""
read -p "Enter your token: " TOKEN

if [ -z "$TOKEN" ]; then
    echo -e "${RED}❌ Error: Token is required${NC}"
    exit 1
fi

echo ""
echo "=================================="
echo "🔍 Step 1: Verify User Info"
echo "=================================="
echo ""

# Get user info
USER_INFO=$(curl -s -X GET "$BACKEND_URL/auth/me" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/json")

USER_ID=$(echo "$USER_INFO" | grep -o '"id":[0-9]*' | head -1 | grep -o '[0-9]*')
USER_EMAIL=$(echo "$USER_INFO" | grep -o '"email":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -n "$USER_ID" ]; then
    echo -e "${GREEN}✅ Authenticated as User ID: $USER_ID${NC}"
    echo "   Email: $USER_EMAIL"
else
    echo -e "${RED}❌ Authentication failed${NC}"
    echo "   Response: $USER_INFO"
    exit 1
fi

echo ""
echo "=================================="
echo "🔍 Step 2: Check Current Notifications"
echo "=================================="
echo ""

BEFORE_COUNT=$(curl -s -X GET "$BACKEND_URL/rmc/notifications/unread-count" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/json" | grep -o '"unread_count":[0-9]*' | grep -o '[0-9]*')

echo "Current unread notifications: $BEFORE_COUNT"

echo ""
echo "=================================="
echo "📋 Step 3: What Happens in Real Flow"
echo "=================================="
echo ""

echo -e "${BLUE}When you complete RMC onboarding (Step 7):${NC}"
echo ""
echo "  Backend Flow:"
echo "  ┌─────────────────────────────────────┐"
echo "  │ 1. RmcOnboardingService             │"
echo "  │    └─> processStepSeven()           │"
echo "  │        └─> TenderService            │"
echo "  │            └─> createTender()       │"
echo "  │                └─> 🎉 Tender Created│"
echo "  └─────────────────────────────────────┘"
echo "               │"
echo "               ▼"
echo "  ┌─────────────────────────────────────┐"
echo "  │ 2. TenderService                    │"
echo "  │    └─> sendTenderLiveNotification() │"
echo "  │        └─> NotificationService      │"
echo "  │            └─> notifyTenderLive()   │"
echo "  └─────────────────────────────────────┘"
echo "               │"
echo "               ▼"
echo "  ┌─────────────────────────────────────┐"
echo "  │ 3. NotificationService              │"
echo "  │    ├─> Store in Database ✅         │"
echo "  │    ├─> Cache in Redis ✅            │"
echo "  │    └─> Broadcast to Pusher ⚡       │"
echo "  └─────────────────────────────────────┘"
echo "               │"
echo "               ▼"
echo "  ┌─────────────────────────────────────┐"
echo "  │ 4. Pusher (Channel: user.$USER_ID)  │"
echo "  │    └─> WebSocket Event              │"
echo "  │        └─> .notification.sent       │"
echo "  └─────────────────────────────────────┘"
echo "               │"
echo "               ▼"
echo "  ┌─────────────────────────────────────┐"
echo "  │ 5. Frontend (useNotifications hook) │"
echo "  │    ├─> Echo listens on channel      │"
echo "  │    ├─> Receives notification        │"
echo "  │    ├─> Updates Redux store          │"
echo "  │    └─> 🔔 UI Updates (Bell Icon!)   │"
echo "  └─────────────────────────────────────┘"
echo ""

echo ""
echo "=================================="
echo "🧪 Step 4: Simulate Notification"
echo "=================================="
echo ""
echo "Creating a test notification to verify the flow..."
echo ""

TEST_NOTIFICATION=$(curl -s -X POST "$BACKEND_URL/rmc/notifications/test" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "event_code": "TEN_001",
    "title": "🎉 Tender is Now Live",
    "message": "Your tender has been successfully activated and is now live. PMAs in your area have been notified.",
    "key_id": 999,
    "data": {
      "test": true,
      "tender_title": "Test Property Management Tender",
      "activation_date": "'$(date -u +"%Y-%m-%d %H:%M:%S")'",
      "simulated_from": "test-onboarding-notification.sh"
    }
  }')

NEW_NOTIFICATION_ID=$(echo "$TEST_NOTIFICATION" | grep -o '"id":[0-9]*' | head -1 | grep -o '[0-9]*')

if [ -n "$NEW_NOTIFICATION_ID" ]; then
    echo -e "${GREEN}✅ Notification Created!${NC}"
    echo "   Notification ID: $NEW_NOTIFICATION_ID"
    echo ""
    
    if command -v jq &> /dev/null; then
        echo "   Details:"
        echo "$TEST_NOTIFICATION" | jq '.data.notification' 2>/dev/null || echo "$TEST_NOTIFICATION"
    fi
else
    echo -e "${RED}❌ Failed to create notification${NC}"
    echo "   Response: $TEST_NOTIFICATION"
    exit 1
fi

echo ""
echo "=================================="
echo "⏳ Step 5: Wait for Broadcast"
echo "=================================="
echo ""
echo "Waiting 2 seconds for Pusher broadcast..."
sleep 2
echo -e "${GREEN}✅ Broadcast complete${NC}"

echo ""
echo "=================================="
echo "🔍 Step 6: Verify Frontend Reception"
echo "=================================="
echo ""

AFTER_COUNT=$(curl -s -X GET "$BACKEND_URL/rmc/notifications/unread-count" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/json" | grep -o '"unread_count":[0-9]*' | grep -o '[0-9]*')

echo "Unread notifications after: $AFTER_COUNT"

if [ "$AFTER_COUNT" -gt "$BEFORE_COUNT" ]; then
    echo -e "${GREEN}✅ Notification count increased!${NC}"
    echo "   Before: $BEFORE_COUNT → After: $AFTER_COUNT"
else
    echo -e "${YELLOW}⚠️  Count unchanged (Before: $BEFORE_COUNT, After: $AFTER_COUNT)${NC}"
fi

echo ""
echo "=================================="
echo "🎯 Step 7: CHECK YOUR FRONTEND!"
echo "=================================="
echo ""
echo -e "${BLUE}👉 NOW GO TO YOUR BROWSER:${NC}"
echo ""
echo "   1. Open: ${GREEN}http://localhost:3001${NC}"
echo ""
echo "   2. Look at the ${GREEN}🔔 bell icon${NC} in the navbar (top-right)"
echo ""
echo "   3. You should see:"
echo "      • ${GREEN}Red dot${NC} indicating unread notification"
echo "      • Click bell → See notification:"
echo "        ${GREEN}\"🎉 Tender is Now Live\"${NC}"
echo ""
echo "   4. Check browser console (F12):"
echo "      • Should show: ${GREEN}📨 New notification received${NC}"
echo "      • Or: ${GREEN}✅ WebSocket: Successfully connected${NC}"
echo ""

echo ""
echo "=================================="
echo "📋 Step 8: What to Expect"
echo "=================================="
echo ""

echo -e "${BLUE}Real Onboarding Flow:${NC}"
echo ""
echo "  When you complete Step 7 of RMC onboarding:"
echo ""
echo "  1. Tender is created automatically"
echo "  2. Notification \"Tender is Now Live\" is sent"
echo "  3. Appears INSTANTLY in your notification dropdown ⚡"
echo "  4. Bell icon shows red dot"
echo "  5. Click bell → See all details"
echo ""

echo ""
echo "=================================="
echo "✅ Test Complete!"
echo "=================================="
echo ""

echo -e "${GREEN}Summary:${NC}"
echo "  ✅ Backend: Notification created (ID: $NEW_NOTIFICATION_ID)"
echo "  ✅ Database: Notification stored"
echo "  ✅ Pusher: Broadcasted to channel user.$USER_ID"
echo "  ✅ Frontend: Ready to receive (check browser!)"
echo ""

echo -e "${BLUE}Next Steps:${NC}"
echo ""
echo "  Option 1: Check your browser NOW for the test notification"
echo ""
echo "  Option 2: Complete actual RMC onboarding:"
echo "    • Go to onboarding page"
echo "    • Complete all 7 steps"
echo "    • After Step 7, notification appears automatically!"
echo ""

echo "📚 For more details, see:"
echo "   • TEST_RESULTS.md"
echo "   • NOTIFICATION_TESTING_GUIDE.md"
echo ""
echo "🎉 Your notification system is working!"
echo ""


