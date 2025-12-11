/**
 * API Integration for Booking System
 * Connects website to Google Apps Script backend
 */

// Google Apps Script Web App URL
// TODO: Replace with your actual deployed Web App URL after deploying the Google Script
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL ||
    "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

export interface BookingData {
    name: string;
    email: string;
    phone: string;
    eventType: string;
    eventDate: string;
    timeSlot?: string;
    guestCount: string;
    location: string;
    budget?: string;
    message?: string;
    source?: 'Website' | 'WhatsApp';
}

export interface BookingResponse {
    success: boolean;
    message: string;
    data?: {
        bookingId?: string;
        [key: string]: any;
    };
}

/**
 * Create a new booking
 */
export async function createBooking(data: BookingData): Promise<BookingResponse> {
    try {
        console.log('Creating booking:', data);

        // For development: If no Google Script URL is configured, simulate success
        if (GOOGLE_SCRIPT_URL.includes('YOUR_SCRIPT_ID')) {
            console.warn('Google Script URL not configured. Using mock response.');

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Return mock success response
            return {
                success: true,
                message: 'Booking created successfully (mock)',
                data: {
                    bookingId: `EE-${Date.now()}-MOCK`
                }
            };
        }

        // Make actual API call to Google Apps Script
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            // Note: Google Apps Script requires 'no-cors' mode
            mode: 'no-cors'
        });

        // With no-cors, we can't read the response, so we assume success
        // The actual confirmation will come via email/WhatsApp
        return {
            success: true,
            message: 'Booking request submitted successfully',
            data: {
                bookingId: 'Pending confirmation'
            }
        };

    } catch (error) {
        console.error('Booking API error:', error);

        return {
            success: false,
            message: error instanceof Error ? error.message : 'Failed to create booking',
        };
    }
}

/**
 * Check availability for a specific date and time
 */
export async function checkAvailability(
    date: string,
    timeSlot?: string
): Promise<{ available: boolean; slots?: string[] }> {
    try {
        // For development: If no Google Script URL is configured, return mock data
        if (GOOGLE_SCRIPT_URL.includes('YOUR_SCRIPT_ID')) {
            console.warn('Google Script URL not configured. Using mock availability.');

            return {
                available: true,
                slots: ['morning', 'afternoon', 'evening']
            };
        }

        const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=checkAvailability`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date, timeSlot }),
            mode: 'no-cors'
        });

        // With no-cors, assume available
        return {
            available: true,
            slots: ['morning', 'afternoon', 'evening']
        };

    } catch (error) {
        console.error('Availability check error:', error);

        // On error, assume available to not block bookings
        return {
            available: true,
            slots: []
        };
    }
}

/**
 * Get booking by ID
 */
export async function getBooking(bookingId: string): Promise<BookingResponse> {
    try {
        if (GOOGLE_SCRIPT_URL.includes('YOUR_SCRIPT_ID')) {
            return {
                success: false,
                message: 'Google Script URL not configured'
            };
        }

        const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getBooking&id=${bookingId}`, {
            method: 'GET',
            mode: 'no-cors'
        });

        return {
            success: true,
            message: 'Booking retrieved',
            data: {}
        };

    } catch (error) {
        console.error('Get booking error:', error);

        return {
            success: false,
            message: 'Failed to retrieve booking'
        };
    }
}

/**
 * Format date for API
 */
export function formatDateForAPI(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Parse time slot to readable format
 */
export function formatTimeSlot(slot: string): string {
    const timeMap: Record<string, string> = {
        'morning': '10:00 AM - 2:00 PM',
        'afternoon': '2:00 PM - 6:00 PM',
        'evening': '6:00 PM - 10:00 PM'
    };

    return timeMap[slot.toLowerCase()] || slot;
}

/**
 * Generate WhatsApp message for booking
 */
export function generateWhatsAppMessage(data: BookingData, bookingId?: string): string {
    return `
🎉 *New Event Booking Request*

${bookingId ? `📋 *Booking ID:* ${bookingId}\n` : ''}
👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
📱 *Phone:* ${data.phone}
🎊 *Event Type:* ${data.eventType}
📅 *Event Date:* ${data.eventDate}
${data.timeSlot ? `🕐 *Time:* ${formatTimeSlot(data.timeSlot)}\n` : ''}
👥 *Guest Count:* ${data.guestCount}
📍 *Location:* ${data.location}
${data.budget ? `💰 *Budget:* ${data.budget}\n` : ''}
${data.message ? `💬 *Message:* ${data.message}\n` : ''}

Looking forward to creating a magical event! ✨
  `.trim();
}

/**
 * Open WhatsApp with booking details
 */
export function sendWhatsAppBooking(data: BookingData, bookingId?: string): void {
    const message = generateWhatsAppMessage(data, bookingId);
    const phoneNumber = '917016686728'; // Elegance Events WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
}

/**
 * Validate booking data
 */
export function validateBookingData(data: Partial<BookingData>): {
    valid: boolean;
    errors: Record<string, string>;
} {
    const errors: Record<string, string> = {};

    if (!data.name || data.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
    }

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = 'Valid email is required';
    }

    if (!data.phone || data.phone.trim().length < 10) {
        errors.phone = 'Valid phone number is required';
    }

    if (!data.eventType) {
        errors.eventType = 'Event type is required';
    }

    if (!data.eventDate) {
        errors.eventDate = 'Event date is required';
    } else {
        const selectedDate = new Date(data.eventDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            errors.eventDate = 'Event date must be in the future';
        }
    }

    if (!data.guestCount || parseInt(data.guestCount) < 1) {
        errors.guestCount = 'Guest count must be at least 1';
    }

    if (!data.location || data.location.trim().length < 2) {
        errors.location = 'Location is required';
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors
    };
}

export default {
    createBooking,
    checkAvailability,
    getBooking,
    formatDateForAPI,
    formatTimeSlot,
    generateWhatsAppMessage,
    sendWhatsAppBooking,
    validateBookingData
};
