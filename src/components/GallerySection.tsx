import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, ZoomIn } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const galleryImages = [
  {
    id: 1,
    category: "wedding",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop",
    title: "Royal Wedding Setup",
  },
  {
    id: 2,
    category: "birthday",
    url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop",
    title: "Birthday Celebration",
  },
  {
    id: 3,
    category: "corporate",
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
    title: "Corporate Event",
  },
  {
    id: 4,
    category: "wedding",
    url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=400&fit=crop",
    title: "Garden Wedding",
  },
  {
    id: 5,
    category: "party",
    url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop",
    title: "Theme Party",
  },
  {
    id: 6,
    category: "birthday",
    url: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600&h=400&fit=crop",
    title: "Kids Birthday",
  },
];

const categories = ["all", "wedding", "birthday", "corporate", "party"];

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <section id="gallery" className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-wine/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-12">
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            Portfolio
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Our <span className="gold-gradient-text">Creations</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            A glimpse into the magical moments we've crafted for our clients.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "gold" : "ghost"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="capitalize hover:scale-105 transition-transform"
              >
                {category}
              </Button>
            ))}
          </div>
        </AnimatedSection>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <AnimatedSection
              key={image.id}
              delay={index * 100}
              animation="scale"
            >
              <div
                className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500">
                      <ZoomIn className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {image.title}
                    </h3>
                    <span className="text-primary text-sm capitalize">{image.category}</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* View More Button */}
        <AnimatedSection className="text-center mt-12">
          <Button variant="gold-outline" size="lg" className="hover:scale-105 transition-transform">
            View Full Gallery
          </Button>
        </AnimatedSection>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors hover:rotate-90 duration-300"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage.url.replace("w=600&h=400", "w=1200&h=800")}
            alt={selectedImage.title}
            className="max-w-full max-h-[80vh] rounded-2xl object-contain animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default GallerySection;
