import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, User, Mail, Phone, MapPin, Users, MessageSquare, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createBooking, sendWhatsAppBooking, validateBookingData } from "@/lib/api";

interface BookingModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    eventType?: string;
}

const BookingModal = ({ open, onOpenChange, eventType = "" }: BookingModalProps) => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        eventType: eventType,
        eventDate: "",
        guestCount: "",
        location: "",
        budget: "",
        message: ""
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Validate form data
            const validation = validateBookingData(formData);
            if (!validation.valid) {
                toast({
                    title: "Validation Error",
                    description: Object.values(validation.errors)[0],
                    variant: "destructive"
                });
                setIsSubmitting(false);
                return;
            }

            // Create booking in Google Sheets
            const result = await createBooking({
                ...formData,
                source: 'Website'
            });

            if (result.success) {
                // Send WhatsApp message with booking details
                sendWhatsAppBooking(formData, result.data?.bookingId);

                // Show success state
                setIsSuccess(true);

                toast({
                    title: "Booking Request Sent!",
                    description: `Booking ID: ${result.data?.bookingId || 'Pending'}. We'll contact you shortly.`,
                });

                // Reset form after 2 seconds
                setTimeout(() => {
                    setIsSuccess(false);
                    setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        eventType: eventType,
                        eventDate: "",
                        guestCount: "",
                        location: "",
                        budget: "",
                        message: ""
                    });
                    onOpenChange(false);
                }, 2000);
            } else {
                toast({
                    title: "Booking Failed",
                    description: result.message || "Please try again or contact us directly.",
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error('Booking error:', error);
            toast({
                title: "Error",
                description: "An unexpected error occurred. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                {isSuccess ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-scale-in">
                            <CheckCircle2 className="w-12 h-12 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Booking Request Sent!</h3>
                        <p className="text-muted-foreground text-center">
                            Thank you for choosing Elegance Events. We'll contact you shortly.
                        </p>
                    </div>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-display">Book Your Event</DialogTitle>
                            <DialogDescription>
                                Fill in the details below and we'll get back to you within 24 hours to discuss your special event.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                            {/* Personal Information */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    <User className="w-5 h-5 text-primary" />
                                    Personal Information
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name *</Label>
                                        <Input
                                            id="name"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange("name", e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange("email", e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number *</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="+91 98765 43210"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange("phone", e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Event Details */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-primary" />
                                    Event Details
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="eventType">Event Type *</Label>
                                        <Select
                                            value={formData.eventType}
                                            onValueChange={(value) => handleInputChange("eventType", value)}
                                            required
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select event type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Wedding Planning">Wedding Planning</SelectItem>
                                                <SelectItem value="Birthday Parties">Birthday Parties</SelectItem>
                                                <SelectItem value="Corporate Events">Corporate Events</SelectItem>
                                                <SelectItem value="Baby Shower">Baby Shower</SelectItem>
                                                <SelectItem value="Anniversary">Anniversary</SelectItem>
                                                <SelectItem value="Theme Parties">Theme Parties</SelectItem>
                                                <SelectItem value="Other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="eventDate">Event Date *</Label>
                                        <Input
                                            id="eventDate"
                                            type="date"
                                            value={formData.eventDate}
                                            onChange={(e) => handleInputChange("eventDate", e.target.value)}
                                            min={new Date().toISOString().split('T')[0]}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="guestCount">Expected Guests *</Label>
                                        <Input
                                            id="guestCount"
                                            type="number"
                                            placeholder="e.g., 100"
                                            value={formData.guestCount}
                                            onChange={(e) => handleInputChange("guestCount", e.target.value)}
                                            min="1"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="budget">Budget Range</Label>
                                        <Select
                                            value={formData.budget}
                                            onValueChange={(value) => handleInputChange("budget", value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select budget range" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Under $5,000">Under $5,000</SelectItem>
                                                <SelectItem value="$5,000 - $10,000">$5,000 - $10,000</SelectItem>
                                                <SelectItem value="$10,000 - $20,000">$10,000 - $20,000</SelectItem>
                                                <SelectItem value="$20,000 - $50,000">$20,000 - $50,000</SelectItem>
                                                <SelectItem value="Above $50,000">Above $50,000</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="location">Event Location *</Label>
                                    <Input
                                        id="location"
                                        placeholder="City or venue name"
                                        value={formData.location}
                                        onChange={(e) => handleInputChange("location", e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 text-primary" />
                                    Additional Information
                                </h3>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Special Requirements or Message</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Tell us about your vision, special requirements, or any questions you have..."
                                        value={formData.message}
                                        onChange={(e) => handleInputChange("message", e.target.value)}
                                        rows={4}
                                    />
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="bg-muted/50 p-4 rounded-lg">
                                <p className="text-sm text-muted-foreground mb-2">
                                    Need immediate assistance? Call us at:
                                </p>
                                <a
                                    href="tel:+917016686728"
                                    className="flex items-center gap-2 text-primary font-semibold hover:underline"
                                >
                                    <Phone className="w-4 h-4" />
                                    +91 7016686728
                                </a>
                            </div>

                            {/* Submit Button */}
                            <div className="flex gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => onOpenChange(false)}
                                    className="flex-1"
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="gold"
                                    className="flex-1"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Calendar className="w-4 h-4 mr-2" />
                                            Send Booking Request
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default BookingModal;
