import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CostEstimator from "@/components/CostEstimator";
import { Calculator, Sparkles, TrendingUp, Shield, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CostEstimatorPage = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-24 md:pt-32 pb-8 md:pb-16 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial opacity-20" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />

                <div className="container-custom relative z-10">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full border border-border hover:border-primary/50 hover:bg-primary/10 transition-all mb-6 md:mb-8 group text-sm md:text-base"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to Home</span>
                    </button>

                    <div className="text-center max-w-4xl mx-auto px-4">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 md:mb-6 animate-fade-up">
                            <Calculator className="w-3 md:w-4 h-3 md:h-4 text-primary" />
                            <span className="text-xs md:text-sm font-medium text-primary">Free Cost Calculator</span>
                        </div>

                        {/* Heading */}
                        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 animate-fade-up leading-tight" style={{ animationDelay: '0.1s' }}>
                            Plan Your <span className="gold-gradient-text">Perfect Event</span>
                        </h1>

                        {/* Description */}
                        <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8 animate-fade-up px-4" style={{ animationDelay: '0.2s' }}>
                            Get an instant, transparent cost estimate for your dream event. No hidden charges, no surprises - just honest pricing.
                        </p>

                        {/* Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
                            {[
                                {
                                    icon: Calculator,
                                    title: "Instant Calculation",
                                    description: "Real-time pricing as you customize"
                                },
                                {
                                    icon: TrendingUp,
                                    title: "Transparent Pricing",
                                    description: "See detailed cost breakdown"
                                },
                                {
                                    icon: Shield,
                                    title: "No Hidden Fees",
                                    description: "What you see is what you pay"
                                }
                            ].map((feature, index) => (
                                <div
                                    key={feature.title}
                                    className="glass-card p-4 md:p-6 text-center animate-fade-up hover:scale-105 transition-transform"
                                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                                >
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 md:mb-4">
                                        <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                                    </div>
                                    <h3 className="font-semibold text-base md:text-lg mb-1 md:mb-2">{feature.title}</h3>
                                    <p className="text-xs md:text-sm text-muted-foreground">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Cost Estimator Component */}
            <CostEstimator />

            {/* Why Choose Us Section */}
            <section className="py-12 md:py-20 bg-muted/20">
                <div className="container-custom px-4">
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
                            Why Use Our <span className="gold-gradient-text">Cost Estimator</span>?
                        </h2>
                        <p className="text-muted-foreground text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-4">
                            Make informed decisions with our transparent pricing calculator
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {[
                            {
                                icon: "💰",
                                title: "Budget Planning",
                                description: "Plan your event within your budget with accurate estimates"
                            },
                            {
                                icon: "📊",
                                title: "Compare Packages",
                                description: "See how different packages and add-ons affect the total cost"
                            },
                            {
                                icon: "⚡",
                                title: "Instant Results",
                                description: "Get your estimate in seconds, no waiting required"
                            },
                            {
                                icon: "📱",
                                title: "Share Easily",
                                description: "Send your estimate via WhatsApp to discuss with family"
                            }
                        ].map((item, index) => (
                            <div
                                key={item.title}
                                className="glass-card p-4 md:p-6 hover:border-primary/30 transition-all"
                            >
                                <div className="text-3xl md:text-4xl mb-3 md:mb-4">{item.icon}</div>
                                <h3 className="font-semibold text-base md:text-lg mb-1 md:mb-2">{item.title}</h3>
                                <p className="text-xs md:text-sm text-muted-foreground">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 md:py-20">
                <div className="container-custom px-4">
                    <div className="glass-card p-6 md:p-12 text-center relative overflow-hidden">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-primary/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-wine/10 rounded-full blur-3xl" />

                        <div className="relative z-10">
                            <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-primary mx-auto mb-3 md:mb-4" />
                            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 px-4">
                                Ready to Book Your Event?
                            </h2>
                            <p className="text-muted-foreground text-sm md:text-base lg:text-lg mb-6 md:mb-8 max-w-2xl mx-auto px-4">
                                Get your estimate above and contact us to confirm your booking. Our team is ready to make your event unforgettable!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
                                <a
                                    href="tel:+917016686728"
                                    className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors text-sm md:text-base"
                                >
                                    📞 Call +91 7016686728
                                </a>
                                <a
                                    href="https://wa.me/917016686728"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-colors text-sm md:text-base"
                                >
                                    💬 WhatsApp Us
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default CostEstimatorPage;
