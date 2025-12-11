import { useEffect, useRef, useState, ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: "fade-up" | "fade-left" | "fade-right" | "scale" | "slide-up";
}

const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  animation = "fade-up",
}: AnimatedSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const animationClasses = {
    "fade-up": "translate-y-10 opacity-0",
    "fade-left": "translate-x-10 opacity-0",
    "fade-right": "-translate-x-10 opacity-0",
    scale: "scale-95 opacity-0",
    "slide-up": "translate-y-20 opacity-0",
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${
        isVisible ? "translate-y-0 translate-x-0 scale-100 opacity-100" : animationClasses[animation]
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
