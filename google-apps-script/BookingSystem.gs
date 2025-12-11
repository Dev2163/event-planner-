// Google Apps Script for Booking System
// Deploy this as a Web App in Google Sheets

// Configuration
const PHONE_NUMBER = "917016686728";
const SHEET_NAME = "Bookings";
const CALENDAR_ID = "primary"; // or your calendar ID

// Main function to handle booking requests
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!data.name || !data.phone || !data.eventDate) {
      return createResponse(false, "Missing required fields");
    }
    
    // Check availability
    if (!checkAvailability(data.eventDate, data.timeSlot)) {
      return createResponse(false, "Time slot not available");
    }
    
    // Create booking
    const bookingId = createBooking(data);
    
    // Add to Google Calendar
    addToCalendar(data, bookingId);
    
    // Send confirmations
    sendConfirmations(data, bookingId);
    
    return createResponse(true, "Booking created successfully", { bookingId });
    
  } catch (error) {
    Logger.log("Error: " + error);
    return createResponse(false, "Server error: " + error.message);
  }
}

// Check if date/time is available
function checkAvailability(date, timeSlot) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  // Skip header row
  for (let i = 1; i < data.length; i++) {
    const bookingDate = data[i][5]; // Column F: Event Date
    const bookingTime = data[i][6]; // Column G: Event Time
    const status = data[i][11]; // Column L: Status
    
    // Check if same date and time slot is already booked
    if (bookingDate.toString() === date && 
        bookingTime === timeSlot && 
        status === "Confirmed") {
      return false;
    }
  }
  
  return true;
}

// Create booking in Google Sheet
function createBooking(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const bookingId = generateBookingId();
  
  const row = [
    bookingId,                    // A: Booking ID
    data.name,                    // B: Customer Name
    data.phone,                   // C: Phone
    data.email || "",             // D: Email
    data.eventType,               // E: Event Type
    data.eventDate,               // F: Event Date
    data.timeSlot || "",          // G: Event Time
    data.guestCount || "",        // H: Guest Count
    data.location || "",          // I: Location
    data.budget || "",            // J: Budget
    data.message || "",           // K: Special Requirements
    "Confirmed",                  // L: Status
    data.source || "Website",    // M: Source
    new Date(),                   // N: Created At
    "Pending"                     // O: Payment Status
  ];
  
  sheet.appendRow(row);
  
  return bookingId;
}

// Generate unique booking ID
function generateBookingId() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  return `EE-${year}${month}${day}-${random}`;
}

// Add event to Google Calendar
function addToCalendar(data, bookingId) {
  const calendar = CalendarApp.getCalendarById(CALENDAR_ID);
  
  // Parse date and time
  const eventDate = new Date(data.eventDate);
  const startTime = parseTime(data.timeSlot);
  
  // Set start and end times
  eventDate.setHours(startTime.hour, startTime.minute);
  const endDate = new Date(eventDate.getTime() + (4 * 60 * 60 * 1000)); // 4 hours duration
  
  // Create event
  const event = calendar.createEvent(
    `${data.eventType} - ${data.name}`,
    eventDate,
    endDate,
    {
      description: `
Booking ID: ${bookingId}
Customer: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Guests: ${data.guestCount}
Location: ${data.location}
Budget: ${data.budget}
Requirements: ${data.message}
      `,
      location: data.location || "",
      guests: data.email || ""
    }
  );
  
  Logger.log("Calendar event created: " + event.getId());
  
  return event.getId();
}

// Parse time slot to hours and minutes
function parseTime(timeSlot) {
  const timeMap = {
    "morning": { hour: 10, minute: 0 },
    "afternoon": { hour: 14, minute: 0 },
    "evening": { hour: 18, minute: 0 }
  };
  
  return timeMap[timeSlot.toLowerCase()] || { hour: 10, minute: 0 };
}

// Send confirmation notifications
function sendConfirmations(data, bookingId) {
  // Send WhatsApp message (via external API)
  sendWhatsAppConfirmation(data, bookingId);
  
  // Send Email
  if (data.email) {
    sendEmailConfirmation(data, bookingId);
  }
}

// Send WhatsApp confirmation
function sendWhatsAppConfirmation(data, bookingId) {
  // This would integrate with WhatsApp Cloud API
  // For now, just log it
  Logger.log("WhatsApp confirmation would be sent to: " + data.phone);
  
  const message = `
🎉 *Booking Confirmed!*

📋 Booking ID: ${bookingId}
👤 Name: ${data.name}
🎊 Event: ${data.eventType}
📅 Date: ${data.eventDate}
🕐 Time: ${data.timeSlot}
👥 Guests: ${data.guestCount}
📍 Location: ${data.location}

✅ Your booking is confirmed!

Our team will contact you within 24 hours.

📞 Contact: +91 7016686728
  `;
  
  // TODO: Implement WhatsApp API call
  // Example: UrlFetchApp.fetch(whatsappApiUrl, options);
}

// Send Email confirmation
function sendEmailConfirmation(data, bookingId) {
  const subject = `Booking Confirmation - ${bookingId}`;
  
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #D4AF37, #F4E4C1); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .header h1 { margin: 0; color: #1a1a1a; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .detail-row { display: flex; padding: 10px 0; border-bottom: 1px solid #eee; }
    .detail-label { font-weight: bold; width: 150px; }
    .detail-value { flex: 1; }
    .footer { text-align: center; margin-top: 30px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Booking Confirmed!</h1>
    </div>
    
    <div class="content">
      <p>Dear ${data.name},</p>
      
      <p>Thank you for choosing Elegance Events! Your booking has been confirmed.</p>
      
      <div class="booking-details">
        <div class="detail-row">
          <div class="detail-label">Booking ID:</div>
          <div class="detail-value"><strong>${bookingId}</strong></div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Event Type:</div>
          <div class="detail-value">${data.eventType}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Date:</div>
          <div class="detail-value">${data.eventDate}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Time:</div>
          <div class="detail-value">${data.timeSlot}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Guests:</div>
          <div class="detail-value">${data.guestCount}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Location:</div>
          <div class="detail-value">${data.location}</div>
        </div>
      </div>
      
      <p>Our team will contact you within 24 hours to discuss the details and finalize your event.</p>
      
      <p>If you have any questions, feel free to reach out:</p>
      <p>📞 Phone: +91 7016686728<br>
         📧 Email: hello@eleganceevents.com</p>
      
      <div class="footer">
        <p>Thank you for choosing Elegance Events!</p>
        <p>Creating Magical Moments Since 2015</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
  
  MailApp.sendEmail({
    to: data.email,
    subject: subject,
    htmlBody: htmlBody
  });
  
  Logger.log("Email sent to: " + data.email);
}

// Get booking by ID
function getBooking(bookingId) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === bookingId) {
      return {
        bookingId: data[i][0],
        name: data[i][1],
        phone: data[i][2],
        email: data[i][3],
        eventType: data[i][4],
        eventDate: data[i][5],
        timeSlot: data[i][6],
        guestCount: data[i][7],
        location: data[i][8],
        budget: data[i][9],
        message: data[i][10],
        status: data[i][11],
        source: data[i][12],
        createdAt: data[i][13],
        paymentStatus: data[i][14]
      };
    }
  }
  
  return null;
}

// Get all bookings for a date
function getBookingsForDate(date) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const bookings = [];
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][5].toString() === date && data[i][11] === "Confirmed") {
      bookings.push({
        bookingId: data[i][0],
        timeSlot: data[i][6],
        eventType: data[i][4]
      });
    }
  }
  
  return bookings;
}

// Helper function to create API response
function createResponse(success, message, data = {}) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: success,
      message: message,
      data: data
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function
function testBooking() {
  const testData = {
    name: "John Doe",
    phone: "+919876543210",
    email: "john@example.com",
    eventType: "Wedding Planning",
    eventDate: "2024-03-15",
    timeSlot: "afternoon",
    guestCount: "150",
    location: "Mumbai",
    budget: "$10,000 - $20,000",
    message: "Need outdoor setup",
    source: "Website"
  };
  
  const bookingId = createBooking(testData);
  Logger.log("Test booking created: " + bookingId);
  
  addToCalendar(testData, bookingId);
  sendConfirmations(testData, bookingId);
}
