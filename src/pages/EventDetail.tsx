import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Users, MapPin, Clock, Check, Sparkles, Heart, Star } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

interface EventData {
    id: string;
    title: string;
    icon: string;
    description: string;
    fullDescription: string;
    features: string[];
    decorations: {
        title: string;
        image: string;
        description: string;
    }[];
    packages: {
        name: string;
        price: string;
        features: string[];
        popular?: boolean;
    }[];
    gallery: string[];
}

const eventData: Record<string, EventData> = {
    "wedding-planning": {
        id: "wedding-planning",
        title: "Wedding Planning",
        icon: "💝",
        description: "Complete wedding management from venue to vows, making your special day perfect.",
        fullDescription: "Transform your dream wedding into reality with our comprehensive planning services. From intimate ceremonies to grand celebrations, we handle every detail with precision and care.",
        features: [
            "Venue Selection & Booking",
            "Complete Decoration Setup",
            "Catering & Menu Planning",
            "Photography & Videography",
            "Entertainment & Music",
            "Guest Management",
            "Timeline Coordination",
            "Day-of Coordination"
        ],
        decorations: [
            {
                title: "Floral Centerpieces",
                image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&fit=crop",
                description: "Elegant floral arrangements with roses, peonies, and seasonal blooms"
            },
            {
                title: "Stage Decoration",
                image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=400&fit=crop",
                description: "Luxurious stage setup with draping, lighting, and floral accents"
            },
            {
                title: "Table Settings",
                image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600&h=400&fit=crop",
                description: "Premium table arrangements with fine china and crystal"
            },
            {
                title: "Entrance Decor",
                image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=400&fit=crop",
                description: "Grand entrance with floral arches and ambient lighting"
            }
        ],
        packages: [
            {
                name: "Essential",
                price: "$5,000",
                features: ["Basic venue decoration", "Standard catering (50 guests)", "Photography (4 hours)", "Basic sound system"]
            },
            {
                name: "Premium",
                price: "$12,000",
                features: ["Complete venue transformation", "Gourmet catering (100 guests)", "Photography & Videography (8 hours)", "Live music & DJ", "Floral arrangements", "Wedding coordinator"],
                popular: true
            },
            {
                name: "Luxury",
                price: "$25,000",
                features: ["Exclusive venue booking", "5-star catering (200+ guests)", "Premium photo/video team", "Live band & entertainment", "Designer floral decor", "Full planning team", "Honeymoon planning"]
            }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&h=600&fit=crop"
        ]
    },
    "birthday-parties": {
        id: "birthday-parties",
        title: "Birthday Parties",
        icon: "🎂",
        description: "Theme-based celebrations for all ages with stunning decorations and entertainment.",
        fullDescription: "Create unforgettable birthday memories with our creative party planning services. From kids' themed parties to elegant adult celebrations.",
        features: [
            "Custom Theme Design",
            "Balloon Decorations",
            "Cake & Dessert Table",
            "Entertainment & Games",
            "Party Favors",
            "Photography",
            "Catering Services",
            "Venue Setup"
        ],
        decorations: [
            {
                title: "Balloon Arches",
                image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop",
                description: "Stunning balloon installations in custom colors"
            },
            {
                title: "Dessert Tables",
                image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=600&h=400&fit=crop",
                description: "Beautiful dessert displays with themed decorations"
            },
            {
                title: "Photo Booth",
                image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop",
                description: "Custom photo booth with props and backdrops"
            },
            {
                title: "Table Decor",
                image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&h=400&fit=crop",
                description: "Themed table settings and centerpieces"
            }
        ],
        packages: [
            {
                name: "Kids Party",
                price: "$800",
                features: ["Theme decorations", "Balloon setup", "Entertainment (2 hours)", "Cake & snacks (20 kids)"]
            },
            {
                name: "Teen Celebration",
                price: "$1,500",
                features: ["Modern decor", "DJ & sound system", "Photo booth", "Catering (30 guests)", "Party favors"],
                popular: true
            },
            {
                name: "Adult Milestone",
                price: "$3,500",
                features: ["Elegant decorations", "Premium catering (50 guests)", "Live music", "Full bar service", "Photography", "Custom cake"]
            }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&h=600&fit=crop"
        ]
    },
    "corporate-events": {
        id: "corporate-events",
        title: "Corporate Events",
        icon: "📋",
        description: "Professional conferences, product launches, and team celebrations.",
        fullDescription: "Elevate your corporate gatherings with our professional event management services. We ensure seamless execution for conferences, product launches, and team building events.",
        features: [
            "Conference Planning",
            "AV Equipment Setup",
            "Professional Catering",
            "Branding & Signage",
            "Registration Management",
            "Speaker Coordination",
            "Networking Spaces",
            "Post-Event Analytics"
        ],
        decorations: [
            {
                title: "Stage Setup",
                image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop",
                description: "Professional stage with LED screens and lighting"
            },
            {
                title: "Branding Elements",
                image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop",
                description: "Custom branded backdrops and signage"
            },
            {
                title: "Lounge Areas",
                image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop",
                description: "Comfortable networking spaces with modern furniture"
            },
            {
                title: "Registration Desk",
                image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
                description: "Professional check-in area with branding"
            }
        ],
        packages: [
            {
                name: "Meeting",
                price: "$2,000",
                features: ["Meeting room setup", "AV equipment", "Coffee & snacks", "Basic branding (25 attendees)"]
            },
            {
                name: "Conference",
                price: "$8,000",
                features: ["Full venue setup", "Professional AV", "Catered lunch", "Registration system", "Photography (100 attendees)"],
                popular: true
            },
            {
                name: "Product Launch",
                price: "$15,000",
                features: ["Premium venue", "Complete branding", "Gourmet catering", "Live streaming", "Media coverage", "VIP management (200+ attendees)"]
            }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop"
        ]
    }
};

const EventDetail = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const navigate = useNavigate();
    const [event, setEvent] = useState<EventData | null>(null);
    const { scrollYProgress } = useScroll();

    const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const headerScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

    useEffect(() => {
        if (eventId && eventData[eventId]) {
            setEvent(eventData[eventId]);
        } else {
            navigate("/");
        }
    }, [eventId, navigate]);

    if (!event) return null;

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Header with Parallax */}
            <motion.section
                style={{ opacity: headerOpacity, scale: headerScale }}
                className="relative h-screen flex items-center justify-center overflow-hidden"
            >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <img
                        src={event.gallery[0]}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
                </div>

                {/* Floating Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-primary/30 rounded-full"
                            initial={{ opacity: 0, y: 0 }}
                            animate={{
                                opacity: [0, 1, 0],
                                y: [-100, window.innerHeight + 100],
                                x: Math.sin(i) * 100
                            }}
                            transition={{
                                duration: 5 + Math.random() * 5,
                                repeat: Infinity,
                                delay: Math.random() * 5
                            }}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `-100px`
                            }}
                        />
                    ))}
                </div>

                {/* Content */}
                <div className="relative z-10 container-custom text-center">
                    <Button
                        variant="ghost"
                        size="lg"
                        onClick={() => navigate("/")}
                        className="absolute top-8 left-8 text-white hover:bg-white/10"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Home
                    </Button>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="text-7xl mb-6 animate-float">{event.icon}</div>
                        <h1 className="font-display text-6xl md:text-8xl font-bold mb-6 text-white">
                            {event.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
                            {event.fullDescription}
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Button variant="gold" size="xl" className="group">
                                <Calendar className="w-5 h-5 mr-2" />
                                Book Now
                            </Button>
                            <Button variant="glass" size="xl">
                                <Sparkles className="w-5 h-5 mr-2" />
                                View Gallery
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
                        <div className="w-1.5 h-3 bg-white rounded-full" />
                    </div>
                </motion.div>
            </motion.section>

            {/* Features Section with Reveal Animation */}
            <section className="relative py-20 overflow-hidden">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-display text-4xl md:text-6xl font-bold mb-4 gold-gradient-text">
                            What's Included
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Comprehensive services tailored to your needs
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {event.features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="glass-card p-6 hover:shadow-2xl transition-all duration-300"
                            >
                                <Check className="w-8 h-8 text-primary mb-4" />
                                <h3 className="font-semibold text-lg mb-2">{feature}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Decorations Showcase with Overlapping Animation */}
            <section className="relative py-20 bg-gradient-to-b from-background to-muted/20">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
                            Decoration <span className="gold-gradient-text">Showcase</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Explore our stunning decoration options
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {event.decorations.map((decoration, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                className="group relative overflow-hidden rounded-3xl"
                            >
                                <div className="relative h-96 overflow-hidden">
                                    <motion.img
                                        src={decoration.image}
                                        alt={decoration.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                                    {/* Decorative Corner Elements */}
                                    <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-8">
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            whileInView={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <div className="flex items-center gap-2 mb-3">
                                                <Star className="w-5 h-5 text-primary" />
                                                <h3 className="font-display text-2xl font-bold text-white">
                                                    {decoration.title}
                                                </h3>
                                            </div>
                                            <p className="text-white/80 text-sm">
                                                {decoration.description}
                                            </p>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Packages with Accounting Breakdown */}
            <section className="relative py-20 overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-wine rounded-full blur-3xl" />
                </div>

                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
                            Investment <span className="gold-gradient-text">Packages</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Choose the perfect package for your celebration
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {event.packages.map((pkg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className={`relative glass-card p-8 ${pkg.popular ? "border-2 border-primary shadow-2xl" : ""
                                    }`}
                            >
                                {pkg.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <div className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                                            <Heart className="w-4 h-4" />
                                            Most Popular
                                        </div>
                                    </div>
                                )}

                                <div className="text-center mb-8">
                                    <h3 className="font-display text-2xl font-bold mb-4">
                                        {pkg.name}
                                    </h3>
                                    <div className="mb-2">
                                        <span className="text-5xl font-bold gold-gradient-text">
                                            {pkg.price}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Complete package
                                    </p>
                                </div>

                                <div className="space-y-4 mb-8">
                                    {pkg.features.map((feature, fIndex) => (
                                        <motion.div
                                            key={fIndex}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.1 * fIndex }}
                                            className="flex items-start gap-3"
                                        >
                                            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                            <span className="text-sm">{feature}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                <Button
                                    variant={pkg.popular ? "gold" : "outline"}
                                    size="lg"
                                    className="w-full group"
                                >
                                    <Calendar className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                                    Select Package
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Section with Smooth Transitions */}
            <section className="relative py-20 bg-gradient-to-b from-muted/20 to-background">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
                            Our <span className="gold-gradient-text">Portfolio</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Recent events we've brought to life
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {event.gallery.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, zIndex: 10 }}
                                className="relative aspect-square overflow-hidden rounded-2xl cursor-pointer group"
                            >
                                <img
                                    src={image}
                                    alt={`Gallery ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-20">
                <div className="container-custom text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="glass-card p-12 max-w-4xl mx-auto"
                    >
                        <Sparkles className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse" />
                        <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                            Ready to Create Magic?
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                            Let's discuss your vision and create an unforgettable experience together.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="gold" size="xl" className="group">
                                <Calendar className="w-5 h-5 mr-2" />
                                Schedule Consultation
                            </Button>
                            <Button variant="outline" size="xl">
                                <Users className="w-5 h-5 mr-2" />
                                Contact Us
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default EventDetail;
