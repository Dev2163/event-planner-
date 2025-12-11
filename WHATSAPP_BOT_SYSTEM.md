# Complete Booking System: WhatsApp Bot + Website Integration

## 🎯 System Overview

A unified booking system that accepts reservations from **both WhatsApp Bot and Website**, synchronized through Google Sheets and Google Calendar to prevent double bookings.

---

## 📱 Contact Information
- **Phone/WhatsApp:** +91 7016686728
- **Email:** hello@eleganceevents.com

---

## 🏗️ System Architecture

```
┌─────────────────┐         ┌──────────────────┐
│  WhatsApp Bot   │────────▶│  Central System  │
│  (User Input)   │         │  (Validation &   │
└─────────────────┘         │   Processing)    │
                            │                  │
┌─────────────────┐         │                  │
│  Website Form   │────────▶│                  │
│  (User Input)   │         └────────┬─────────┘
└─────────────────┘                  │
                                     │
                    ┌────────────────┴────────────────┐
                    │                                  │
            ┌───────▼────────┐              ┌─────────▼────────┐
            │  Google Sheet  │              │ Google Calendar  │
            │  (Database)    │              │  (Schedule)      │
            └────────────────┘              └──────────────────┘
```

---

## 🔄 Booking Flow

### A) WhatsApp Bot Booking

**User Message Examples:**
```
"I want to book decoration on 12 March at 4 PM"
"Book wedding planning for 25 Dec"
"Need birthday party setup on 15th Jan, 100 guests"
```

**Bot Response Flow:**
1. ✅ Extract: Date, Time, Service Type, Guest Count
2. ✅ Check availability in Google Sheet
3. ✅ If available → Create booking
4. ✅ Add to Google Calendar
5. ✅ Send confirmation with booking ID
6. ✅ Send reminder 24 hours before event

**Bot Confirmation Message:**
```
🎉 Booking Confirmed!

📋 Booking ID: EE-2024-001
👤 Name: [Customer Name]
📅 Date: 12 March 2024
🕐 Time: 4:00 PM
🎊 Service: Decoration
👥 Guests: 100
📍 Location: [Location]

✅ Your booking is confirmed!
💰 Payment link: [Link]
📞 Contact: +91 7016686728

We'll send you a reminder 24 hours before your event.
```

### B) Website Booking

**User Journey:**
1. Visit website → Click "Book Now"
2. Fill form:
   - Name, Email, Phone
   - Event Type, Date, Time
   - Guest Count, Location
   - Budget, Special Requirements
3. System checks availability
4. If available → Booking created
5. Confirmation shown on website
6. Email + WhatsApp notification sent

**Website Confirmation:**
```
✅ Booking Successful!

Your booking request has been received.
Booking ID: EE-2024-001

📧 Confirmation email sent to: [email]
📱 WhatsApp confirmation sent to: [phone]

Our team will contact you within 24 hours.
```

---

## 📊 Google Sheets Database Structure

### Sheet 1: Bookings

| Column | Data | Example |
|--------|------|---------|
| A | Booking ID | EE-2024-001 |
| B | Customer Name | John Doe |
| C | Phone | +91 9876543210 |
| D | Email | john@example.com |
| E | Event Type | Wedding Planning |
| F | Event Date | 2024-03-12 |
| G | Event Time | 16:00 |
| H | Guest Count | 150 |
| I | Location | Mumbai |
| J | Budget | $10,000 - $20,000 |
| K | Special Requirements | Outdoor setup |
| L | Status | Confirmed/Pending/Cancelled |
| M | Source | WhatsApp/Website |
| N | Created At | 2024-01-15 10:30 |
| O | Payment Status | Paid/Pending |

### Sheet 2: Availability Calendar

| Date | Time Slot | Status | Booking ID |
|------|-----------|--------|------------|
| 2024-03-12 | 10:00 AM | Available | - |
| 2024-03-12 | 02:00 PM | Booked | EE-2024-001 |
| 2024-03-12 | 06:00 PM | Available | - |

---

## ⚙️ Booking Rules (Customizable)

### Option 1: One Booking Per Day
```javascript
// Check if date already has a booking
if (bookingsOnDate.length > 0) {
  return "Sorry, this date is already booked.";
}
```

### Option 2: Maximum 2 Bookings Per Day
```javascript
// Check if date has less than 2 bookings
if (bookingsOnDate.length >= 2) {
  return "Sorry, maximum bookings reached for this date.";
}
```

### Option 3: Time Slot Based (Recommended)
```javascript
// Available time slots
const timeSlots = [
  "10:00 AM - 02:00 PM",
  "02:00 PM - 06:00 PM",
  "06:00 PM - 10:00 PM"
];

// Check if time slot is available
if (isTimeSlotBooked(date, timeSlot)) {
  return "This time slot is already booked. Available slots: [list]";
}
```

---

## 🛠️ Technology Stack

### 1. WhatsApp Bot

**Recommended: WhatsApp Cloud API (Meta)**
- ✅ Official API
- ✅ Free tier available
- ✅ Reliable and scalable
- ✅ Supports rich media

**Alternative Options:**
- WATI (Paid, easier setup)
- Twilio WhatsApp API (Paid, enterprise)
- Botpress (Open source)

### 2. Website Booking

**Current Stack (Already Implemented):**
- ✅ React + TypeScript
- ✅ Tailwind CSS
- ✅ Framer Motion (animations)
- ✅ Booking Modal component
- ✅ Form validation

### 3. Backend / Database

**Option A: Google Sheets + Apps Script (Recommended for Start)**
```javascript
// Google Apps Script
function addBooking(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Bookings");
  
  // Check availability
  if (!isAvailable(data.date, data.time)) {
    return { success: false, message: "Time slot not available" };
  }
  
  // Add booking
  sheet.appendRow([
    generateBookingId(),
    data.name,
    data.phone,
    data.email,
    data.eventType,
    data.date,
    data.time,
    data.guestCount,
    data.location,
    data.budget,
    data.message,
    "Confirmed",
    data.source,
    new Date(),
    "Pending"
  ]);
  
  // Add to Google Calendar
  addToCalendar(data);
  
  return { success: true, bookingId: generateBookingId() };
}
```

**Option B: Firebase (For Scalability)**
```javascript
// Firebase Firestore
const bookingsRef = db.collection('bookings');

await bookingsRef.add({
  bookingId: generateId(),
  customerName: data.name,
  phone: data.phone,
  eventDate: data.date,
  status: 'confirmed',
  createdAt: firebase.firestore.FieldValue.serverTimestamp()
});
```

### 4. Automation Tools

**Make.com Workflow:**
```
Trigger: New row in Google Sheet
↓
Action 1: Create Google Calendar event
↓
Action 2: Send WhatsApp confirmation
↓
Action 3: Send email confirmation
↓
Action 4: Schedule reminder (24h before)
```

**Zapier Alternative:**
```
Trigger: Webhook from website
↓
Action 1: Add to Google Sheets
↓
Action 2: Create Calendar event
↓
Action 3: Send notifications
```

---

## 📱 WhatsApp Bot Implementation

### Bot Conversation Flow

```
User: Hi
Bot: 👋 Welcome to Elegance Events!

How can I help you today?

1️⃣ Book an event
2️⃣ Check booking status
3️⃣ View services
4️⃣ Talk to support

Reply with a number (1-4)

---

User: 1
Bot: Great! Let's book your event.

What type of event are you planning?

1️⃣ Wedding Planning
2️⃣ Birthday Party
3️⃣ Corporate Event
4️⃣ Baby Shower
5️⃣ Anniversary
6️⃣ Theme Party

Reply with a number

---

User: 1
Bot: Perfect! Wedding Planning selected.

📅 What date would you like? (DD-MM-YYYY)
Example: 15-03-2024

---

User: 15-03-2024
Bot: Checking availability for 15 March 2024...

✅ Date is available!

🕐 What time would you prefer?

1️⃣ Morning (10 AM - 2 PM)
2️⃣ Afternoon (2 PM - 6 PM)
3️⃣ Evening (6 PM - 10 PM)

---

User: 2
Bot: Afternoon slot selected (2 PM - 6 PM)

👥 How many guests are you expecting?

---

User: 150
Bot: 150 guests noted.

📍 Where will the event be held?
(City or venue name)

---

User: Mumbai
Bot: Location: Mumbai ✅

📝 Any special requirements or message?
(Or type "skip" to continue)

---

User: Need outdoor setup
Bot: Perfect! Let me confirm your booking:

🎉 Booking Summary

📋 Event: Wedding Planning
📅 Date: 15 March 2024
🕐 Time: 2 PM - 6 PM
👥 Guests: 150
📍 Location: Mumbai
💬 Requirements: Need outdoor setup

Is this correct?
Reply: YES to confirm / NO to restart

---

User: YES
Bot: 🎉 Booking Confirmed!

📋 Booking ID: EE-2024-001

✅ Your wedding planning is confirmed for 15 March 2024

📞 Our team will call you at [phone] within 24 hours
💰 Payment link: [link]

📱 Save this booking ID for future reference

Need anything else?
```

### Bot Features

**1. Natural Language Processing**
```javascript
// Example: Parse user message
"I want to book decoration on 12 March"

Extracted:
- Intent: Booking
- Service: Decoration
- Date: 12 March
```

**2. Availability Check**
```javascript
function checkAvailability(date, time) {
  // Query Google Sheet
  const bookings = getBookingsForDate(date);
  
  // Check time slot
  const isBooked = bookings.some(b => b.timeSlot === time);
  
  return !isBooked;
}
```

**3. Automatic Reminders**
```javascript
// Schedule reminder 24 hours before
function scheduleReminder(booking) {
  const reminderTime = booking.eventDate - 24hours;
  
  scheduleMessage(reminderTime, `
    ⏰ Reminder: Your event is tomorrow!
    
    📋 Booking ID: ${booking.id}
    📅 Date: ${booking.date}
    🕐 Time: ${booking.time}
    
    See you soon! 🎉
  `);
}
```

---

## 🌐 Website Integration (Already Implemented)

### Current Features ✅
- Responsive booking modal
- Form validation
- WhatsApp integration
- Success confirmation
- Phone: +91 7016686728

### Additional Features to Add

**1. Real-time Availability Check**
```typescript
const checkAvailability = async (date: string, time: string) => {
  const response = await fetch('/api/check-availability', {
    method: 'POST',
    body: JSON.stringify({ date, time })
  });
  
  const { available } = await response.json();
  return available;
};
```

**2. Calendar View**
```tsx
<Calendar
  onDateSelect={(date) => {
    checkAvailability(date).then(slots => {
      setAvailableSlots(slots);
    });
  }}
  disabledDates={bookedDates}
/>
```

**3. Payment Integration**
```typescript
const initiatePayment = async (bookingId: string) => {
  // Razorpay / Stripe integration
  const order = await createPaymentOrder(bookingId);
  
  const options = {
    key: RAZORPAY_KEY,
    amount: order.amount,
    order_id: order.id,
    handler: (response) => {
      confirmBooking(bookingId, response.payment_id);
    }
  };
  
  const rzp = new Razorpay(options);
  rzp.open();
};
```

---

## 🔗 API Endpoints Needed

### 1. Check Availability
```
POST /api/check-availability
Body: { date: "2024-03-12", timeSlot: "afternoon" }
Response: { available: true, slots: [...] }
```

### 2. Create Booking
```
POST /api/bookings
Body: { name, phone, email, eventType, date, time, ... }
Response: { success: true, bookingId: "EE-2024-001" }
```

### 3. Get Booking
```
GET /api/bookings/:id
Response: { booking: {...} }
```

### 4. Update Booking
```
PUT /api/bookings/:id
Body: { status: "confirmed", paymentStatus: "paid" }
Response: { success: true }
```

---

## 📧 Notification System

### Email Template
```html
<!DOCTYPE html>
<html>
<head>
  <title>Booking Confirmation</title>
</head>
<body>
  <h1>🎉 Booking Confirmed!</h1>
  
  <p>Dear [Name],</p>
  
  <p>Your event booking has been confirmed:</p>
  
  <table>
    <tr><td>Booking ID:</td><td><strong>EE-2024-001</strong></td></tr>
    <tr><td>Event Type:</td><td>Wedding Planning</td></tr>
    <tr><td>Date:</td><td>15 March 2024</td></tr>
    <tr><td>Time:</td><td>2:00 PM - 6:00 PM</td></tr>
    <tr><td>Guests:</td><td>150</td></tr>
  </table>
  
  <p>Our team will contact you within 24 hours.</p>
  
  <p>Contact: +91 7016686728</p>
</body>
</html>
```

### WhatsApp Template
```
🎉 *Booking Confirmed!*

Dear [Name],

Your booking has been confirmed:

📋 Booking ID: EE-2024-001
🎊 Event: Wedding Planning
📅 Date: 15 March 2024
🕐 Time: 2:00 PM - 6:00 PM
👥 Guests: 150

Our team will contact you within 24 hours.

📞 Contact: +91 7016686728
```

---

## 🚀 Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- [x] Website booking form (DONE)
- [ ] Google Sheets setup
- [ ] Google Calendar integration
- [ ] Basic API endpoints

### Phase 2: WhatsApp Bot (Week 3-4)
- [ ] WhatsApp Cloud API setup
- [ ] Bot conversation flow
- [ ] NLP integration
- [ ] Availability checking

### Phase 3: Integration (Week 5-6)
- [ ] Connect website to Google Sheets
- [ ] Connect bot to Google Sheets
- [ ] Sync both systems
- [ ] Testing

### Phase 4: Automation (Week 7-8)
- [ ] Automatic confirmations
- [ ] Reminder system
- [ ] Payment integration
- [ ] Admin dashboard

---

## 💰 Cost Estimate

### Free Tier (Recommended for Start)
- WhatsApp Cloud API: Free (1000 conversations/month)
- Google Sheets: Free
- Google Calendar: Free
- Vercel Hosting: Free
- Total: **$0/month**

### Paid Tier (For Scale)
- WhatsApp Cloud API: $0.005-0.01 per conversation
- Make.com: $9/month
- Firebase: $25/month
- Total: **~$35-50/month**

---

## 📱 Next Steps

1. **Set up Google Sheets**
   - Create booking database
   - Set up availability calendar
   - Configure Apps Script

2. **WhatsApp Bot Setup**
   - Register with Meta
   - Get API credentials
   - Configure webhook

3. **Connect Website**
   - Create API endpoints
   - Integrate with Google Sheets
   - Test booking flow

4. **Testing**
   - Test WhatsApp bookings
   - Test website bookings
   - Verify synchronization

---

## 📞 Support

For implementation support:
- Phone: +91 7016686728
- Email: hello@eleganceevents.com

---

**Status:** Ready to implement
**Contact:** +91 7016686728
**Next Action:** Choose implementation phase to start
