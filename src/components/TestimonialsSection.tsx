import { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const testimonials = [
  {
    id: 1,
    name: "Priya & Rahul Sharma",
    event: "Wedding",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
    rating: 5,
    text: "Elegance Events made our dream wedding come true! Every detail was perfect, from the stunning decorations to the seamless coordination. We couldn't have asked for a better team.",
  },
  {
    id: 2,
    name: "Neha Patel",
    event: "Birthday Party",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
    rating: 5,
    text: "My daughter's princess-themed birthday was absolutely magical! The team went above and beyond to create an enchanting experience. Highly recommended!",
  },
  {
    id: 3,
    name: "Vikram Industries",
    event: "Corporate Event",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
    rating: 5,
    text: "Professional, creative, and reliable. Our annual conference was executed flawlessly. The team understood our brand and delivered an impressive event that impressed all our stakeholders.",
  },
  {
    id: 4,
    name: "Anita & Karan Malhotra",
    event: "Anniversary",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces",
    rating: 5,
    text: "Our 25th anniversary celebration was beyond our expectations. The romantic setup and attention to detail made it an evening we'll cherish forever.",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, currentIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-wine/10 rounded-full blur-3xl animate-float" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            What Our <span className="gold-gradient-text">Clients Say</span>
          </h2>
        </AnimatedSection>

        {/* Testimonial Slider */}
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="scale">
            <div className="glass-card p-8 md:p-12 relative overflow-hidden">
              {/* Quote Icon */}
              <Quote className="absolute top-6 left-6 w-12 h-12 text-primary/20 animate-pulse" />

              {/* Content */}
              <div className={`text-center transition-all duration-500 ${isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
                {/* Rating */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 text-primary fill-primary animate-pulse"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 min-h-[120px]">
                  "{testimonials[currentIndex].text}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary/30 hover:border-primary transition-colors hover:scale-110 duration-300"
                  />
                  <div className="text-left">
                    <h4 className="font-display font-semibold text-foreground">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-primary text-sm">{testimonials[currentIndex].event}</p>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => { setIsAutoPlaying(false); handleNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </AnimatedSection>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-500 hover:scale-125 ${
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
