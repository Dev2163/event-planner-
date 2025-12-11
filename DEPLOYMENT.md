# 🚀 Deployment Instructions

## Quick Start (5 Minutes)

Follow these steps to deploy your booking system:

---

## Step 1: Setup Environment Variables

1. **Copy the environment template:**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Edit `.env.local`** and update:
   - Keep `YOUR_SCRIPT_ID` for now (we'll update after Google Script deployment)
   - Phone number is already set to: `917016686728`

---

## Step 2: Deploy Google Apps Script

### 2.1 Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click "+ Blank" to create new spreadsheet
3. Name it: **"Elegance Events - Bookings"**

### 2.2 Add Headers

In Row 1, add these headers:

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Booking ID | Customer Name | Phone | Email | Event Type | Event Date | Event Time | Guest Count | Location | Budget | Requirements | Status | Source | Created At | Payment Status |

### 2.3 Add Apps Script

1. Click **Extensions** → **Apps Script**
2. Delete the default `function myFunction()` code
3. Copy ALL code from `google-apps-script/BookingSystem.gs`
4. Paste into the script editor
5. Click **Save** (💾 icon)
6. Name the project: **"Booking System"**

### 2.4 Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click ⚙️ **gear icon** → Select **Web app**
3. Fill in:
   - **Description:** "Elegance Events Booking API"
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone
4. Click **Deploy**
5. **Authorize** the app (click "Review Permissions" → Select your account → Allow)
6. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/AKfycbx.../exec`)

### 2.5 Update Environment Variable

1. Open `.env.local`
2. Replace `YOUR_SCRIPT_ID` with the ID from your Web App URL
3. Save the file

**Example:**
```env
# Before:
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# After:
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec
```

---

## Step 3: Test the Integration

### 3.1 Install Dependencies

```bash
npm install
```

### 3.2 Run Development Server

```bash
npm run dev
```

### 3.3 Test Booking Flow

1. Open http://localhost:5173
2. Click **"Book Your Event"** button
3. Fill in the form with test data:
   - Name: Test User
   - Email: test@example.com
   - Phone: +91 9876543210
   - Event Type: Birthday Parties
   - Date: (select a future date)
   - Guests: 50
   - Location: Mumbai
4. Click **"Send Booking Request"**
5. Check:
   - ✅ Success message appears
   - ✅ WhatsApp opens with pre-filled message
   - ✅ Google Sheet has new row
   - ✅ Google Calendar has new event

---

## Step 4: Deploy to Production

### Option A: Deploy to Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Elegance Events booking system"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables:
     - `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`: (your Web App URL)
     - `NEXT_PUBLIC_PHONE_NUMBER`: 917016686728
   - Click "Deploy"

3. **Done!** Your site will be live at: `https://your-project.vercel.app`

### Option B: Deploy to Netlify

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy:**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Add environment variables in Site Settings

---

## Step 5: Setup Google Calendar (Optional)

1. Open Google Calendar
2. Create a new calendar: **"Elegance Events Bookings"**
3. Get Calendar ID:
   - Click ⚙️ Settings
   - Select your calendar
   - Scroll to "Integrate calendar"
   - Copy **Calendar ID**
4. Update `google-apps-script/BookingSystem.gs`:
   ```javascript
   const CALENDAR_ID = "your-calendar-id@group.calendar.google.com";
   ```
5. Redeploy the script

---

## Step 6: Enable Email Notifications

Email notifications are automatically enabled! They will be sent from your Google account.

To customize the email template:
1. Edit the `sendEmailConfirmation()` function in `BookingSystem.gs`
2. Update the HTML template
3. Redeploy

---

## 🧪 Testing Checklist

Before going live, test these:

- [ ] Website booking form submits successfully
- [ ] Data appears in Google Sheet
- [ ] Calendar event is created
- [ ] WhatsApp message opens correctly
- [ ] Email confirmation is sent
- [ ] Form validation works
- [ ] Success screen appears
- [ ] Phone number links work (+91 7016686728)

---

## 🔧 Troubleshooting

### Issue: "Google Script URL not configured"

**Solution:** Update `.env.local` with your actual Web App URL

### Issue: Booking not appearing in Google Sheet

**Solutions:**
1. Check Apps Script execution logs (View → Executions)
2. Verify "Who has access" is set to "Anyone"
3. Re-deploy the Web App
4. Check browser console for errors

### Issue: Email not sending

**Solutions:**
1. Check Gmail quota (500 emails/day)
2. Verify email address in form
3. Check Apps Script logs
4. Ensure script is authorized

### Issue: Calendar event not created

**Solutions:**
1. Check CALENDAR_ID in script
2. Verify calendar permissions
3. Check Apps Script logs

---

## 📱 WhatsApp Bot Setup (Optional - Advanced)

For the WhatsApp bot functionality, follow `SETUP_GUIDE.md` Step 4.

**Quick Overview:**
1. Create Meta Developer account
2. Setup WhatsApp Business API
3. Configure webhook
4. Deploy bot handler
5. Test messages

---

## 🔐 Security Notes

### Environment Variables
- Never commit `.env.local` to Git
- `.env.local.example` is safe to commit
- Use different URLs for dev/production

### Google Apps Script
- Keep Web App URL private
- Regularly review Apps Script permissions
- Monitor execution logs

### Data Privacy
- Customer data is stored in your Google Sheet
- Only you have access
- Follow GDPR guidelines if applicable

---

## 📊 Monitoring

### Daily Checks:
- Review new bookings in Google Sheet
- Check calendar for upcoming events
- Monitor email delivery

### Weekly Tasks:
- Export booking data backup
- Review booking trends
- Update availability

### Monthly Tasks:
- Analyze booking statistics
- Update pricing if needed
- Review customer feedback

---

## 🆘 Need Help?

### Documentation:
- `IMPLEMENTATION_SUMMARY.md` - System overview
- `WHATSAPP_BOT_SYSTEM.md` - Bot architecture
- `SETUP_GUIDE.md` - Detailed setup

### Contact:
- Phone: +91 7016686728
- Email: hello@eleganceevents.com

### Resources:
- [Google Apps Script Docs](https://developers.google.com/apps-script)
- [Vercel Deployment](https://vercel.com/docs)
- [WhatsApp Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api)

---

## ✅ Post-Deployment

After successful deployment:

1. **Test everything** with real data
2. **Share the link** with your team
3. **Monitor first bookings** closely
4. **Gather feedback** from users
5. **Iterate and improve**

---

**Congratulations! Your booking system is now live! 🎉**

Contact: +91 7016686728
