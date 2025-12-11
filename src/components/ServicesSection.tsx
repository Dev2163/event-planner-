import { Heart, Cake, Building2, Baby, Gift, PartyPopper, Camera, Utensils, LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  routeId: string;
}

const services: Service[] = [
  {
    icon: Heart,
    title: "Wedding Planning",
    description: "Complete wedding management from venue to vows, making your special day perfect.",
    routeId: "wedding-planning",
  },
  {
    icon: Cake,
    title: "Birthday Parties",
    description: "Theme-based celebrations for all ages with stunning decorations and entertainment.",
    routeId: "birthday-parties",
  },
  {
    icon: Building2,
    title: "Corporate Events",
    description: "Professional conferences, product launches, and team celebrations.",
    routeId: "corporate-events",
  },
  {
    icon: Baby,
    title: "Baby Shower",
    description: "Beautiful celebrations welcoming your little ones with joy and elegance.",
    routeId: "baby-shower",
  },
  {
    icon: Gift,
    title: "Anniversary",
    description: "Celebrate milestones with romantic setups and memorable experiences.",
    routeId: "anniversary",
  },
  {
    icon: PartyPopper,
    title: "Theme Parties",
    description: "Creative themed events that transport you to another world.",
    routeId: "theme-parties",
  },
  {
    icon: Camera,
    title: "Photography",
    description: "Professional photo and video coverage to capture every precious moment.",
    routeId: "photography",
  },
  {
    icon: Utensils,
    title: "Catering",
    description: "Exquisite cuisine tailored to your taste and dietary preferences.",
    routeId: "catering",
  },
];

const ServicesSection = () => {
  const navigate = useNavigate();

  const handleServiceClick = (routeId: string) => {
    navigate(`/event/${routeId}`);
  };

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial opacity-30 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            Our Services
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            What We <span className="gold-gradient-text">Offer</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From intimate gatherings to grand celebrations, we provide comprehensive
            event planning services tailored to your unique vision.
          </p>
        </AnimatedSection>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <AnimatedSection
              key={service.title}
              delay={index * 100}
              animation="scale"
            >
              <div
                onClick={() => handleServiceClick(service.routeId)}
                className="glass-card p-6 h-full hover-lift group cursor-pointer hover:border-primary/40 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <service.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View Details →
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
