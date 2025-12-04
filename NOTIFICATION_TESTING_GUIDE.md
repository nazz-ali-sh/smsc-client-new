# Notification System - Testing Guide

## 🎯 Overview
This guide explains how to test the real-time notification system that has been implemented for the SMSC platform.

## ✅ What Has Been Implemented

### Frontend (React/Next.js)
1. **Notification Types & Interfaces** (`src/types/notification.ts`)
2. **Notification API Service** (`src/services/notification-apis/notification-api.ts`)
3. **Redux Notification Slice** (`src/redux-store/slices/notificationSlice.ts`)
4. **useNotifications Hook** (`src/hooks/useNotifications.ts`) - with WebSocket support
5. **Updated NotificationsDropdown Component** - now uses real data
6. **Updated NavbarContent Component** - removed static notifications

### Backend (Laravel)
1. **Broadcasting Channels** (`smsc-server/routes/channels.php`) - WebSocket authorization
2. **Notification Creation on Tender Onboarding** - Already implemented in `TenderService`
3. **NotificationService** - Already has methods for all notification types
4. **Notification APIs** - All REST endpoints ready

## 🚀 Testing Methods

### Method 1: Test via Tender Onboarding (Recommended)

This tests the complete end-to-end flow including notification creation when a tender is activated.

**Steps:**
1. **Start the Backend:**
   ```bash
   cd /home/shahan/Documents/project/smsc-client/smsc-server
   php artisan serve
   ```

2. **Start the Frontend:**
   ```bash
   cd /home/shahan/Documents/project/smsc-client
   npm run dev
   ```

3. **Complete RMC Onboarding:**
   - Go to `http://localhost:3000/register` or login
   - Complete all 7 steps of the tender onboarding process
   - When you reach Step 7 and submit, a tender will be created
   - **A notification will automatically be created and sent to the RMC user**

4. **Check Notifications:**
   - Look at the notification icon in the navbar (should show a red dot)
   - Click on the notification icon
   - You should see: "Tender is Now Live" notification
   - Check the browser console for logs like:
     ```
     ✅ Fetched notifications: X
     📡 WebSocket: Connecting to private channel user.{userId}
     ```

### Method 2: Test via API (Quick Test)

This method uses the test notification endpoint to quickly create a notification.

**Steps:**

1. **Get Authentication Token:**
   - Login to the application
   - Open browser DevTools → Application → Cookies
   - Copy the value of `rmc-token` or `pma-token`

2. **Create Test Notification:**
   ```bash
   curl -X POST http://127.0.0.1:8000/api/rmc/notifications/test \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_TOKEN_HERE" \
     -d '{
       "event_code": "TEN_001",
       "title": "Test Notification",
       "message": "This is a test notification from the API",
       "key_id": 1,
       "data": {
         "test": true
       }
     }'
   ```

3. **Check Frontend:**
   - The notification should appear immediately in the dropdown (if WebSocket is working)
   - Or it will appear when you refresh or open the notifications dropdown (polling fallback)
   - Console will show: `📨 New notification received:`

### Method 3: Test Notification APIs

Test all the notification management features:

**1. Get All Notifications:**
```bash
curl -X GET "http://127.0.0.1:8000/api/rmc/notifications?limit=20&source=database" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**2. Get Unread Count:**
```bash
curl -X GET "http://127.0.0.1:8000/api/rmc/notifications/unread-count" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**3. Mark Notification as Read:**
```bash
curl -X POST "http://127.0.0.1:8000/api/rmc/notifications/{notification_id}/mark-read" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**4. Mark All as Read:**
```bash
curl -X POST "http://127.0.0.1:8000/api/rmc/notifications/mark-all-read" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**5. Delete Notification:**
```bash
curl -X DELETE "http://127.0.0.1:8000/api/rmc/notifications/{notification_id}" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🔍 What to Look For During Testing

### Frontend Console Logs
When testing, open the browser console and look for these logs:

✅ **Success Indicators:**
```
📡 WebSocket: Connecting to private channel user.123
✅ WebSocket: Successfully connected
✅ Fetched notifications: 5
📨 New notification received: {notification data}
✅ Marked notification as read: 123
```

❌ **Error Indicators (with Fallback):**
```
❌ Failed to initialize WebSocket: [error]
🔄 Starting polling fallback (every 30 seconds)
```
*Note: Even if WebSocket fails, the system will fall back to polling, so notifications will still work!*

### UI Elements to Test

1. **Notification Badge:**
   - Red dot should appear when there are unread notifications
   - Should disappear when all are marked as read

2. **Notification Dropdown:**
   - Click the bell icon in the navbar
   - Should show list of notifications
   - Unread notifications should have highlighted background
   - Shows "X New" chip at the top if there are unread notifications

3. **Notification Actions:**
   - **Click on notification:** Should mark it as read and remove highlight
   - **Click X icon:** Should delete the notification
   - **Click "Mark all as read" icon:** Should mark all notifications as read
   - **View All Notifications button:** Currently static (can be implemented later)

4. **Real-time Updates:**
   - Keep the dropdown open
   - Create a test notification via API (Method 2)
   - New notification should appear at the top immediately (if WebSocket working)
   - Or appear after 30 seconds (if using polling fallback)

## 🔧 Troubleshooting

### Issue: No notifications appearing

**Check:**
1. Is the backend running? (`php artisan serve`)
2. Is the user logged in?
3. Check browser console for errors
4. Verify API endpoint: `http://127.0.0.1:8000/api/rmc/notifications/unread-count`

### Issue: WebSocket not connecting

**This is OK!** The system has a polling fallback that will still work.

**To enable WebSocket (optional):**
1. Sign up for a free Pusher account: https://pusher.com/
2. Create a new app and get credentials
3. Update backend `.env`:
   ```
   BROADCAST_DRIVER=pusher
   PUSHER_APP_ID=your_app_id
   PUSHER_APP_KEY=your_app_key
   PUSHER_APP_SECRET=your_app_secret
   PUSHER_APP_CLUSTER=mt1
   ```
4. Update frontend `.env`:
   ```
   NEXT_PUBLIC_PUSHER_APP_KEY=your_app_key
   NEXT_PUBLIC_PUSHER_CLUSTER=mt1
   ```
5. Restart both backend and frontend

### Issue: Notifications not persisting

**Check:**
1. Database connection is working
2. Redis is running (optional, but improves performance)
3. Check backend logs: `storage/logs/laravel.log`

## 📊 Expected Notification Event Codes

The system supports the following notification types:

### RMC Notifications
- `TEN_001` - Tender is Now Live
- `TEN_002` - New Tender Responses
- `TEN_003` - Tender Results Ready
- `SHO_001` - PMAs Shortlisted
- `VID_001` - Video Call Confirmed
- `VID_002` - Video Call Reschedule
- `VID_004` - Video Call Rejected
- `VID_005` - Video Call Cancelled
- `SIT_001` - Site Visit Confirmed
- `SIT_002` - Site Visit Reschedule
- `SIT_004` - Site Visit Rejected
- `SIT_005` - Site Visit Cancelled
- `FIN_001` - Final Selection Made
- `FIN_002` - Final Report Ready
- `MSG_001` - New Message from PMA
- `PAY_001` - Payment Reminder
- `ADM_001` - Admin Notice
- `AUTH_001` - Password Reset

### PMA Notifications
- `TEN_004` - New Tender Opportunity Nearby
- `TEN_005` - Tender Deadline Extended
- `VID_003` - Video Call Invitation
- `SIT_003` - Site Visit Invitation
- `MSG_002` - Chat Request from RMC
- `APP_001` - PMA Appointment Success
- `APP_002` - PMA Appointment Rejection

## 🎨 Notification Icons

Each event code has a specific icon and color:
- 📝 Tender events → Document icons (green, blue, yellow)
- 📹 Video calls → Video icons (blue)
- 📍 Site visits → Map pin icons (green)
- ⭐ Shortlisting → Bookmark icon (green)
- ✅ Final selection → Checkmark icon (green)
- 💬 Messages → Mail/chat icons (blue)
- 💰 Payments → Money icon (yellow)
- 🔔 Admin notices → Notification icon (red)

## 📝 Database Tables

Notifications are stored in:
- `notifications` - Main notification records
- `notification_events` - Event type definitions
- `notification_preferences` - User notification preferences

You can check notifications directly in the database:
```sql
SELECT * FROM notifications WHERE notification_to LIKE '%"123"%' ORDER BY created_at DESC;
```

## 🚀 Next Steps (Optional Enhancements)

1. **Enable Real WebSocket:**
   - Configure Pusher credentials
   - Better real-time performance

2. **Add Sound Notifications:**
   - Play sound when notification arrives
   - Add notification sound toggle in settings

3. **Add Browser Notifications:**
   - Request permission from user
   - Show system notifications even when tab is inactive

4. **Add Notification Settings Page:**
   - Allow users to control which notifications they receive
   - Email vs Portal notifications

5. **Add "View All Notifications" Page:**
   - Implement full notification history page
   - Pagination and filtering

## ✅ Success Criteria

Your notification system is working correctly if:

1. ✅ Notification icon shows red dot for unread notifications
2. ✅ Clicking icon shows dropdown with notifications
3. ✅ Notifications can be marked as read/deleted
4. ✅ New notifications appear when completing tender onboarding
5. ✅ Console shows successful API calls and no errors
6. ✅ Unread count updates correctly
7. ✅ Notifications persist after page refresh

---

**🎉 Congratulations!** If all tests pass, your notification system is fully functional!


