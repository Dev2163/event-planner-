import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Packages", href: "#packages" },
    { name: "Gallery", href: "#gallery" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-primary/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <Sparkles className="w-8 h-8 text-primary transition-transform duration-300 group-hover:rotate-12" />
          <span className="font-display text-2xl font-bold gold-gradient-text">
            Elegance Events
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <Button variant="gold" size="lg">
            Book Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-primary/10 transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="container-custom py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-foreground hover:text-primary transition-colors py-2 text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <Button variant="gold" size="lg" className="mt-4">
            Book Now
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
