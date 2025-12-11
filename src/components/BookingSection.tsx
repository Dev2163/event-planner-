import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Users, MapPin, Phone, Mail, User, MessageSquare, Check, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import AnimatedSection from "@/components/AnimatedSection";
import { z } from "zod";
//jay devsu
const eventTypes = [
  "Wedding",
  "Birthday Party",
  "Corporate Event",
  "Baby Shower",
  "Anniversary",
  "Engagement",
  "Theme Party",
  "Other",
];

// Validation schemas
const step1Schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(15, "Phone number is too long"),
});

const step2Schema = z.object({
  eventType: z.string().min(1, "Please select an event type"),
  eventDate: z.string().min(1, "Please select a date"),
  guestCount: z.string().min(1, "Please enter guest count"),
});

const BookingSection = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    venue: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep1 = () => {
    try {
      step1Schema.parse({ name: formData.name, email: formData.email, phone: formData.phone });
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            newErrors[error.path[0] as string] = error.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const validateStep2 = () => {
    try {
      step2Schema.parse({ eventType: formData.eventType, eventDate: formData.eventDate, guestCount: formData.guestCount });
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            newErrors[error.path[0] as string] = error.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      toast.success("Booking request submitted! We'll contact you within 24 hours.", {
        icon: <Sparkles className="w-5 h-5 text-primary" />,
      });
      setStep(1);
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        eventDate: "",
        guestCount: "",
        venue: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const openWhatsApp = () => {
    const message = `Hi! I'm interested in booking an event.
    
Name: ${formData.name}
Event Type: ${formData.eventType || "Not selected"}
Date: ${formData.eventDate || "Not selected"}
Guests: ${formData.guestCount || "Not specified"}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/917016686728?text=${encodedMessage}`, "_ blank");
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial opacity-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-wine/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <AnimatedSection animation="fade-right">
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
              Book Your Event
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Let's Create <span className="gold-gradient-text">Magic Together</span>
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Fill out the form and our team will get back to you within 24 hours
              with a personalized quote for your celebration.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {[
                "Free consultation & quotation",
                "24/7 WhatsApp support",
                "Calendar reminders for your event",
                "Flexible payment options",
              ].map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 group hover:translate-x-2 transition-transform"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 group-hover:scale-110 transition-all">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">{feature}</span>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="mt-10 space-y-4">
              <a
                href="tel:+917016686728"
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
              >
                <Phone className="w-5 h-5 text-primary group-hover:scale-110 group-hover:rotate-12 transition-transform" />
                +91 70166 86728
              </a>
              <a
                href="mailto:hello@eleganceevents.com"
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
              >
                <Mail className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                hello@eleganceevents.com
              </a>
            </div>

            {/* WhatsApp Quick Book */}
            <div className="mt-8">
              <Button
                variant="gold"
                size="lg"
                onClick={openWhatsApp}
                className="group"
              >
                <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Quick Book via WhatsApp
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </AnimatedSection>

          {/* Right Form */}
          <AnimatedSection animation="fade-left" delay={200}>
            <div className="glass-card p-8 hover:border-primary/30 transition-colors">
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-500 ${step >= s
                        ? "bg-primary text-primary-foreground scale-110"
                        : "bg-muted text-muted-foreground"
                        } ${step === s ? "animate-pulse ring-4 ring-primary/30" : ""}`}
                    >
                      {step > s ? <Check className="w-5 h-5" /> : s}
                    </div>
                    {s < 3 && (
                      <div
                        className={`w-12 md:w-20 h-1 mx-2 rounded transition-all duration-500 ${step > s ? "bg-primary" : "bg-muted"
                          }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Details */}
                {step === 1 && (
                  <div className="space-y-5 animate-fade-up">
                    <h3 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Personal Details
                    </h3>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl bg-muted/50 border ${errors.name ? "border-destructive" : "border-border"} focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
                      />
                      {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl bg-muted/50 border ${errors.email ? "border-destructive" : "border-border"} focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
                      />
                      {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl bg-muted/50 border ${errors.phone ? "border-destructive" : "border-border"} focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
                      />
                      {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                )}

                {/* Step 2: Event Details */}
                {step === 2 && (
                  <div className="space-y-5 animate-fade-up">
                    <h3 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Event Details
                    </h3>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl bg-muted/50 border ${errors.eventType ? "border-destructive" : "border-border"} focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
                    >
                      <option value="">Select Event Type</option>
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.eventType && <p className="text-destructive text-sm mt-1">{errors.eventType}</p>}

                    <div className="relative group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split("T")[0]}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl bg-muted/50 border ${errors.eventDate ? "border-destructive" : "border-border"} focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
                      />
                      {errors.eventDate && <p className="text-destructive text-sm mt-1">{errors.eventDate}</p>}
                    </div>
                    <div className="relative group">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input
                        type="number"
                        name="guestCount"
                        placeholder="Expected Guest Count"
                        value={formData.guestCount}
                        onChange={handleInputChange}
                        min="1"
                        className={`w-full pl-12 pr-4 py-3 rounded-xl bg-muted/50 border ${errors.guestCount ? "border-destructive" : "border-border"} focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
                      />
                      {errors.guestCount && <p className="text-destructive text-sm mt-1">{errors.guestCount}</p>}
                    </div>
                  </div>
                )}

                {/* Step 3: Additional Info */}
                {step === 3 && (
                  <div className="space-y-5 animate-fade-up">
                    <h3 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      Additional Information
                    </h3>
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-4 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input
                        type="text"
                        name="venue"
                        placeholder="Preferred Venue / Location"
                        value={formData.venue}
                        onChange={handleInputChange}
                        maxLength={200}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                    <div className="relative group">
                      <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <textarea
                        name="message"
                        placeholder="Tell us about your vision for the event..."
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        maxLength={1000}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-8">
                  {step > 1 && (
                    <Button type="button" variant="outline" onClick={prevStep} className="flex-1 group">
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      Previous
                    </Button>
                  )}
                  {step < 3 ? (
                    <Button type="button" variant="gold" onClick={nextStep} className="flex-1 group">
                      Next Step
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="gold"
                      className="flex-1 group"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Submitting...
                        </span>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                          Submit Booking
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
