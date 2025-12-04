# 🚀 Quick Start - Test Notifications in 5 Minutes

## ✅ Prerequisites
- Backend running on `http://127.0.0.1:8000`
- Frontend running on `http://localhost:3000`
- User account created and logged in

## 🎯 Quick Test (No Pusher Setup Needed!)

### Step 1: Start the Servers

**Terminal 1 - Backend:**
```bash
cd /home/shahan/Documents/project/smsc-client/smsc-server
php artisan serve
```

**Terminal 2 - Frontend:**
```bash
cd /home/shahan/Documents/project/smsc-client
npm run dev
```

### Step 2: Login and Get Your Token

1. Go to `http://localhost:3000/login`
2. Login with your account
3. Open Browser DevTools (F12)
4. Go to **Application** tab → **Cookies** → `http://localhost:3000`
5. Find and copy the value of `rmc-token` or `pma-token`

### Step 3: Test Notification API

**Terminal 3 - Run Test Script:**
```bash
cd /home/shahan/Documents/project/smsc-client
./test-notification.sh
```

When prompted, paste your token from Step 2.

**Or use curl directly:**
```bash
curl -X POST http://127.0.0.1:8000/api/rmc/notifications/test \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "event_code": "TEN_001",
    "title": "🎉 Test Notification",
    "message": "Your notification system is working!",
    "key_id": 1
  }'
```

### Step 4: Check Frontend

1. Look at the **bell icon** in the navbar (top-right)
2. You should see a **red dot** indicating unread notification
3. Click the bell icon to open the dropdown
4. Your test notification should appear!

**Expected Result:**
```
📬 Notifications Dropdown Opens
   ┌─────────────────────────────────┐
   │ Notifications           1 New   │
   ├─────────────────────────────────┤
   │ 🎉 Test Notification           │
   │ Your notification system is... │
   │ Just now                        │
   └─────────────────────────────────┘
```

### Step 5: Check Browser Console

Open DevTools Console (F12), you should see:
```
✅ Fetched notifications: 1
📡 WebSocket: Connecting to private channel user.123
🔄 Starting polling fallback (every 30 seconds)
```

**Note:** If WebSocket shows an error, that's OK! The polling fallback will work automatically.

---

## 🎯 Test Complete Tender Flow

### Complete RMC Onboarding:

1. **Register/Login as RMC User**
   - Go to `http://localhost:3000/register`
   
2. **Complete All 7 Steps:**
   - Step 1: About You
   - Step 2: Email Verification
   - Step 3: Property Details
   - Step 4: Budget & Priorities
   - Step 5: Block Details
   - Step 6: Availability
   - Step 7: Questions (Final Step)

3. **After Step 7 Completes:**
   - A tender is automatically created
   - **Notification is sent automatically!**
   - Check the bell icon for: **"Tender is Now Live"**

---

## 🔍 Verify Everything Works

### ✅ Checklist:

- [ ] Bell icon shows red dot for unread notifications
- [ ] Clicking bell opens dropdown with notifications
- [ ] Notifications show correct title and message
- [ ] Clicking notification marks it as read (removes highlight)
- [ ] Clicking X icon deletes notification
- [ ] Unread count updates correctly
- [ ] Console shows API calls without errors

---

## 🐛 Troubleshooting

### Issue: No notifications appearing

**Solution 1 - Check Backend:**
```bash
# Make sure backend is running
cd /home/shahan/Documents/project/smsc-client/smsc-server
php artisan serve
```

**Solution 2 - Check Token:**
```bash
# Verify token is valid
curl -X GET http://127.0.0.1:8000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Solution 3 - Check Logs:**
```bash
# Backend logs
tail -f /home/shahan/Documents/project/smsc-client/smsc-server/storage/logs/laravel.log

# Frontend browser console
# Press F12 → Console tab
```

### Issue: Red dot not appearing

**Check:**
1. Are there unread notifications? Test with curl command above
2. Is user ID correct? Check Redux store in DevTools
3. Any console errors?

### Issue: Notifications not updating in real-time

**This is normal!** Without Pusher:
- Notifications update every 30 seconds (polling)
- Or when you click the bell icon
- Or when you refresh the page

**To enable real-time:**
- Set up Pusher credentials (see main README)

---

## 📊 What Happens Behind the Scenes

### When You Complete Tender Onboarding:

1. **Backend** (`RmcOnboardingService.php` → `processStepSeven`):
   ```php
   // Creates tender
   $tender = $this->tenderService->createTender($payload);
   
   // Sends notification automatically
   $this->notificationService->notifyTenderLive(...);
   ```

2. **Backend** (`TenderService.php` → `sendTenderLiveNotification`):
   ```php
   // Creates notification in database
   $notification = Notification::create([...]);
   
   // Broadcasts via WebSocket (if Pusher configured)
   event(new NotificationSent($notification, $userId));
   
   // Stores in Redis for fast access
   Redis::lpush("notifications:user:{$userId}", ...);
   ```

3. **Frontend** (`useNotifications.ts`):
   ```typescript
   // Listens for real-time updates
   Echo.private(`user.${userId}`)
     .listen('.notification.sent', (event) => {
       dispatch(addNotification(event));
     });
   
   // OR polls every 30 seconds (fallback)
   setInterval(() => fetchUnreadCount(), 30000);
   ```

4. **Frontend** (`NotificationsDropdown.tsx`):
   ```typescript
   // Displays in UI
   {notifications.map(notification => (
     <div>{notification.title}</div>
   ))}
   ```

---

## 🎉 Success!

If you can:
1. ✅ See the red dot on bell icon
2. ✅ Open dropdown and see notifications
3. ✅ Mark as read / delete notifications
4. ✅ Receive notification after completing tender onboarding

**Your notification system is fully functional! 🎊**

---

## 📚 Additional Resources

- **Full Testing Guide:** `NOTIFICATION_TESTING_GUIDE.md`
- **Test Script:** `./test-notification.sh`
- **Backend Notification Service:** `smsc-server/app/Services/NotificationService.php`
- **Frontend Hook:** `src/hooks/useNotifications.ts`
- **API Endpoints:** `smsc-server/routes/api.php` (search for "notifications")

---

## 🔐 Pusher Setup (Optional)

For instant real-time notifications (0 delay instead of 30 seconds):

1. **Sign up:** https://pusher.com/ (free tier: 200K messages/day)
2. **Create app** → Get credentials
3. **Update `.env` files** in both frontend and backend
4. **Restart servers**

See detailed Pusher setup instructions in the main documentation.

---

**Need help?** Check the console logs or backend logs for detailed error messages.


