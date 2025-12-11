import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, MessageCircle, Sparkles } from "lucide-react";
import BookingModal from "@/components/BookingModal";

const HeroSection = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-radial opacity-50 animate-pulse" />

        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-wine/20 rounded-full blur-3xl animate-float animation-delay-300" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-primary/5 rounded-full blur-2xl animate-float" style={{ animationDelay: "4s" }} />

        {/* Animated Grid Lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent animate-pulse" />
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent animate-pulse" style={{ animationDelay: "0.5s" }} />
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        {/* Floating Event Cards */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Row 1 - Slide Left */}
          <div className="absolute top-[15%] w-full">
            <div
              className="absolute w-64 h-40 rounded-2xl shadow-2xl overflow-hidden glass-card animate-slide-left"
              style={{
                animationDuration: "25s",
                animationDelay: "0s",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=250&fit=crop"
                alt="Wedding Event"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div
              className="absolute w-64 h-40 rounded-2xl shadow-2xl overflow-hidden glass-card animate-slide-left"
              style={{
                animationDuration: "25s",
                animationDelay: "8s",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=250&fit=crop"
                alt="Birthday Celebration"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div
              className="absolute w-64 h-40 rounded-2xl shadow-2xl overflow-hidden glass-card animate-slide-left"
              style={{
                animationDuration: "25s",
                animationDelay: "16s",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=250&fit=crop"
                alt="Corporate Event"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </div>

          {/* Row 2 - Slide Right */}
          <div className="absolute top-[40%] w-full">
            <div
              className="absolute w-64 h-40 rounded-2xl shadow-2xl overflow-hidden glass-card animate-slide-right"
              style={{
                animationDuration: "28s",
                animationDelay: "0s",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=250&fit=crop"
                alt="Party Decoration"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div
              className="absolute w-64 h-40 rounded-2xl shadow-2xl overflow-hidden glass-card animate-slide-right"
              style={{
                animationDuration: "28s",
                animationDelay: "9s",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400&h=250&fit=crop"
                alt="Elegant Setup"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div
              className="absolute w-64 h-40 rounded-2xl shadow-2xl overflow-hidden glass-card animate-slide-right"
              style={{
                animationDuration: "28s",
                animationDelay: "18s",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400&h=250&fit=crop"
                alt="Celebration"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </div>

          {/* Row 3 - Slide Left */}
          <div className="absolute top-[65%] w-full">
            <div
              className="absolute w-64 h-40 rounded-2xl shadow-2xl overflow-hidden glass-card animate-slide-left"
              style={{
                animationDuration: "30s",
                animationDelay: "0s",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=250&fit=crop"
                alt="Luxury Event"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div
              className="absolute w-64 h-40 rounded-2xl shadow-2xl overflow-hidden glass-card animate-slide-left"
              style={{
                animationDuration: "30s",
                animationDelay: "10s",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=250&fit=crop"
                alt="Wedding Decor"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div
              className="absolute w-64 h-40 rounded-2xl shadow-2xl overflow-hidden glass-card animate-slide-left"
              style={{
                animationDuration: "30s",
                animationDelay: "20s",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&h=250&fit=crop"
                alt="Event Planning"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                backgroundColor: `hsl(30 45% ${50 + Math.random() * 30}% / ${0.2 + Math.random() * 0.4})`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 6}s`,
              }}
            />
          ))}
        </div>

        {/* Sparkle Effects */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute w-1 h-1 bg-primary rounded-full animate-sparkle"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}

        {/* Content */}
        <div className="container-custom relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-up hover:scale-105 transition-transform cursor-default">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">
              Creating Magical Moments Since 2015
            </span>
          </div>

          {/* Main Heading with Staggered Animation */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="inline-block animate-fade-up opacity-0 text-foreground" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>Plan.</span>{" "}
            <span className="inline-block animate-fade-up opacity-0 gold-gradient-text" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>Celebrate.</span>{" "}
            <span className="inline-block animate-fade-up opacity-0 text-foreground" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>Remember.</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up opacity-0" style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}>
            From intimate gatherings to grand celebrations, we craft unforgettable
            experiences that turn your dreams into beautiful memories.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up opacity-0" style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}>
            <Button variant="gold" size="xl" className="group animate-pulse-glow" onClick={() => setIsBookingOpen(true)}>
              <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Book Your Event
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
            </Button>
            <a href="#contact">
              <Button variant="glass" size="xl" className="group">
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Get Free Quote
              </Button>
            </a>
          </div>

          {/* Stats with Counter Animation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            {[
              { number: "1000+", label: "Events Completed" },
              { number: "500+", label: "Happy Clients" },
              { number: "10+", label: "Years Experience" },
              { number: "50+", label: "Team Members" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-up opacity-0 hover:scale-110 transition-transform cursor-default"
                style={{ animationDelay: `${1.1 + index * 0.15}s`, animationFillMode: "forwards" }}
              >
                <div className="font-display text-3xl md:text-4xl font-bold gold-gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-1.5 animate-bounce">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal open={isBookingOpen} onOpenChange={setIsBookingOpen} />
    </>
  );
};

export default HeroSection;
