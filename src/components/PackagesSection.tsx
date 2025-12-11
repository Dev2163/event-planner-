import { Check, Crown, Star, Sparkles, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";

interface Package {
  name: string;
  price: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  popular: boolean;
}

const packages: Package[] = [
  {
    name: "Basic",
    price: "₹4,999",
    description: "Perfect for small birthdays & simple celebrations",
    icon: Sparkles,
    features: [
      "Basic theme decoration",
      "Balloon arch / backdrop",
      "Cake table setup",
      "Basic lighting",
      "Coordinator support",
      "50 edited photos",
    ],
    popular: false,
  },
  {
    name: "Standard",
    price: "₹12,999",
    description: "Ideal for birthdays, baby showers, engagements",
    icon: Star,
    features: [
      "Premium theme decoration",
      "Backdrop + LED lights",
      "Customized name board",
      "Stage setup",
      "100 edited photos",
      "1 videographer",
      "WhatsApp event updates",
    ],
    popular: false,
  },
  {
    name: "Premium",
    price: "₹29,999",
    description: "Suitable for weddings, receptions, corporate events",
    icon: Crown,
    features: [
      "Luxury theme decoration",
      "Full stage design",
      "Entry gate + walkway décor",
      "LED wall or projector",
      "Full event photography",
      "Full HD videography",
      "Dedicated event manager",
      "WhatsApp live updates",
      "Calendar reminders",
    ],
    popular: true,
  },
];

const PackagesSection = () => {
  return (
    <section id="packages" className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 animate-float" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-wine/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            Pricing
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Choose Your <span className="gold-gradient-text">Package</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select the perfect package that fits your celebration needs.
            All packages include our signature attention to detail.
          </p>
        </AnimatedSection>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <AnimatedSection
              key={pkg.name}
              delay={index * 150}
              animation="slide-up"
            >
              <div
                className={`relative glass-card p-6 flex flex-col h-full hover-lift group ${pkg.popular ? "border-primary/50 lg:scale-105" : ""
                  }`}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-gold rounded-full text-primary-foreground text-sm font-medium animate-pulse">
                    Most Popular
                  </div>
                )}

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <pkg.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Package Info */}
                <h3 className="font-display text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{pkg.name}</h3>
                <div className="mb-2">
                  <span className="font-display text-3xl font-bold gold-gradient-text">
                    {pkg.price}
                  </span>
                  {pkg.price !== "Custom" && (
                    <span className="text-muted-foreground text-sm"> onwards</span>
                  )}
                </div>
                <p className="text-muted-foreground text-sm mb-6">{pkg.description}</p>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {pkg.features.map((feature, featureIndex) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm group-hover:translate-x-1 transition-transform"
                      style={{ transitionDelay: `${featureIndex * 50}ms` }}
                    >
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground group-hover:text-foreground/80 transition-colors">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <a href="#contact">
                  <Button
                    variant={pkg.popular ? "gold" : "gold-outline"}
                    className="w-full group-hover:scale-105 transition-transform"
                  >
                    {pkg.price === "Custom" ? "Get Quote" : "Select Package"}
                  </Button>
                </a>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
