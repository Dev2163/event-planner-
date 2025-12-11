import { Sparkles, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Heart } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Packages", href: "#packages" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    "Wedding Planning",
    "Birthday Parties",
    "Corporate Events",
    "Baby Shower",
    "Anniversary",
    "Theme Parties",
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "Youtube" },
  ];

  return (
    <footer className="bg-card/50 border-t border-primary/10 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-wine/5 rounded-full blur-3xl" />

      <div className="container-custom py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <AnimatedSection animation="fade-up">
            <a href="#home" className="flex items-center gap-2 mb-6 group">
              <Sparkles className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform" />
              <span className="font-display text-2xl font-bold gold-gradient-text">
                Elegance Events
              </span>
            </a>
            <p className="text-muted-foreground mb-6">
              Creating magical moments and unforgettable celebrations since 2015.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </AnimatedSection>

          {/* Quick Links */}
          <AnimatedSection animation="fade-up" delay={100}>
            <h4 className="font-display text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-2 inline-block duration-300"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Services */}
          <AnimatedSection animation="fade-up" delay={200}>
            <h4 className="font-display text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-default">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Contact */}
          <AnimatedSection animation="fade-up" delay={300}>
            <h4 className="font-display text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+917016686728"
                  className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Phone className="w-5 h-5 shrink-0 mt-0.5 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
                  +91 70166 86728
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@eleganceevents.com"
                  className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Mail className="w-5 h-5 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  hello@eleganceevents.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                123 Event Street, Celebration City, India - 380001
              </li>
            </ul>
          </AnimatedSection>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            © {currentYear} Elegance Events. Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> in India
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
