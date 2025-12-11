# Quick Setup Guide: WhatsApp Bot + Website Booking System

## 📋 Prerequisites
- Google Account
- WhatsApp Business Account
- Phone Number: +91 7016686728

---

## 🚀 Step-by-Step Setup

### Step 1: Google Sheets Setup (15 minutes)

1. **Create New Google Sheet**
   - Go to [Google Sheets](https://sheets.google.com)
   - Create new spreadsheet
   - Name it: "Elegance Events - Bookings"

2. **Create Bookings Sheet**
   - Rename Sheet1 to "Bookings"
   - Add headers in Row 1:
     ```
     A: Booking ID
     B: Customer Name
     C: Phone
     D: Email
     E: Event Type
     F: Event Date
     G: Event Time
     H: Guest Count
     I: Location
     J: Budget
     K: Special Requirements
     L: Status
     M: Source
     N: Created At
     O: Payment Status
     ```

3. **Add Google Apps Script**
   - Click Extensions → Apps Script
   - Delete default code
   - Copy code from `google-apps-script/BookingSystem.gs`
   - Save as "Booking System"

4. **Deploy as Web App**
   - Click Deploy → New deployment
   - Type: Web app
   - Execute as: Me
   - Who has access: Anyone
   - Click Deploy
   - Copy the Web App URL (you'll need this)

---

### Step 2: WhatsApp Cloud API Setup (30 minutes)

1. **Create Meta Developer Account**
   - Go to [developers.facebook.com](https://developers.facebook.com)
   - Create account / Log in
   - Create new app

2. **Add WhatsApp Product**
   - Select "WhatsApp" from products
   - Set up WhatsApp Business API
   - Get Phone Number ID
   - Get Access Token

3. **Configure Webhook**
   - Webhook URL: Your server endpoint
   - Verify Token: Create a random string
   - Subscribe to messages

4. **Test WhatsApp Connection**
   ```bash
   curl -X POST \
     https://graph.facebook.com/v18.0/PHONE_NUMBER_ID/messages \
     -H "Authorization: Bearer ACCESS_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "messaging_product": "whatsapp",
       "to": "917016686728",
       "type": "text",
       "text": {
         "body": "Test message from Elegance Events Bot"
       }
     }'
   ```

---

### Step 3: Website Integration (20 minutes)

1. **Update API Endpoint**
   
   Create `src/lib/api.ts`:
   ```typescript
   const GOOGLE_SCRIPT_URL = "YOUR_WEB_APP_URL_HERE";

   export async function createBooking(data: any) {
     try {
       const response = await fetch(GOOGLE_SCRIPT_URL, {
         method: 'POST',
         mode: 'no-cors',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(data)
       });

       return { success: true };
     } catch (error) {
       console.error('Booking error:', error);
       return { success: false, error };
     }
   }
   ```

2. **Update BookingModal.tsx**
   
   Replace the handleSubmit function:
   ```typescript
   import { createBooking } from '@/lib/api';

   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsSubmitting(true);

     // Send to Google Sheets
     const result = await createBooking({
       ...formData,
       source: 'Website'
     });

     if (result.success) {
       // Open WhatsApp
       const whatsappMessage = `...`; // existing message
       const whatsappUrl = `https://wa.me/917016686728?text=${encodeURIComponent(whatsappMessage)}`;
       window.open(whatsappUrl, '_blank');

       setIsSuccess(true);
       toast({
         title: "Booking Request Sent!",
         description: "We'll contact you shortly.",
       });
     } else {
       toast({
         title: "Error",
         description: "Failed to create booking. Please try again.",
         variant: "destructive"
       });
     }

     setIsSubmitting(false);
   };
   ```

3. **Test Website Booking**
   - Run `npm run dev`
   - Click "Book Your Event"
   - Fill form and submit
   - Check Google Sheet for new row
   - Check Google Calendar for event

---

### Step 4: WhatsApp Bot Flow (Advanced)

1. **Create Bot Handler**
   
   Create `whatsapp-bot/handler.js`:
   ```javascript
   const axios = require('axios');

   const GOOGLE_SCRIPT_URL = 'YOUR_WEB_APP_URL';
   const WHATSAPP_TOKEN = 'YOUR_ACCESS_TOKEN';
   const PHONE_NUMBER_ID = 'YOUR_PHONE_NUMBER_ID';

   // Handle incoming messages
   async function handleMessage(message) {
     const from = message.from;
     const text = message.text.body.toLowerCase();

     // Simple keyword detection
     if (text.includes('book') || text.includes('booking')) {
       await sendMessage(from, getBookingMenu());
     } else if (text.includes('status')) {
       await sendMessage(from, 'Please provide your booking ID');
     } else {
       await sendMessage(from, getWelcomeMessage());
     }
   }

   // Send WhatsApp message
   async function sendMessage(to, message) {
     await axios.post(
       `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`,
       {
         messaging_product: 'whatsapp',
         to: to,
         type: 'text',
         text: { body: message }
       },
       {
         headers: {
           'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
           'Content-Type': 'application/json'
         }
       }
     );
   }

   function getWelcomeMessage() {
     return `👋 Welcome to Elegance Events!

How can I help you today?

1️⃣ Book an event
2️⃣ Check booking status
3️⃣ View services
4️⃣ Talk to support

Reply with a number (1-4)`;
   }

   function getBookingMenu() {
     return `Great! Let's book your event.

What type of event?

1️⃣ Wedding Planning
2️⃣ Birthday Party
3️⃣ Corporate Event
4️⃣ Baby Shower
5️⃣ Anniversary

Reply with a number`;
   }

   module.exports = { handleMessage };
   ```

2. **Deploy Bot**
   - Deploy to Vercel/Railway/Heroku
   - Set environment variables
   - Update webhook URL in Meta

---

### Step 5: Testing Checklist

- [ ] Google Sheet receives data
- [ ] Google Calendar creates events
- [ ] Email confirmations sent
- [ ] WhatsApp messages work
- [ ] Website form submits
- [ ] Availability checking works
- [ ] No double bookings

---

## 🔧 Configuration

### Environment Variables

Create `.env.local`:
```env
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
WHATSAPP_TOKEN=YOUR_ACCESS_TOKEN
WHATSAPP_PHONE_ID=YOUR_PHONE_NUMBER_ID
PHONE_NUMBER=917016686728
```

---

## 📱 Phone Number Configuration

**Primary Contact:** +91 7016686728

Used in:
- ✅ WhatsApp Bot
- ✅ Website booking form
- ✅ Email confirmations
- ✅ SMS notifications
- ✅ Call-to-action buttons

---

## 🎯 Next Steps

1. **Test Everything**
   - Make test bookings from website
   - Send test messages to WhatsApp
   - Verify Google Sheet updates
   - Check calendar events

2. **Go Live**
   - Update production URLs
   - Enable real phone number
   - Monitor first bookings

3. **Add Features**
   - Payment integration
   - Automatic reminders
   - Admin dashboard
   - Analytics

---

## 🆘 Troubleshooting

### Google Script Not Working
- Check deployment settings
- Verify "Anyone" can access
- Check Apps Script logs

### WhatsApp Not Sending
- Verify access token
- Check phone number format
- Review webhook logs

### Website Form Errors
- Check CORS settings
- Verify API endpoint
- Check browser console

---

## 📞 Support

Need help with setup?
- Phone: +91 7016686728
- Email: hello@eleganceevents.com

---

## 📚 Resources

- [WhatsApp Cloud API Docs](https://developers.facebook.com/docs/whatsapp/cloud-api)
- [Google Apps Script Guide](https://developers.google.com/apps-script)
- [Make.com Tutorials](https://www.make.com/en/help/tutorials)

---

**Estimated Setup Time:** 1-2 hours
**Difficulty:** Intermediate
**Cost:** Free (with free tiers)
