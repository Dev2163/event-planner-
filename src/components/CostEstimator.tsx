import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import {
    Calculator,
    Package,
    Users,
    MapPin,
    Sparkles,
    Check,
    MessageSquare,
    Phone
} from 'lucide-react';
import {
    PRICING,
    calculateCost,
    formatCurrency,
    generateCostEstimateMessage,
    type CostEstimate,
    type CostBreakdown
} from '@/lib/costCalculator';
import { toast } from 'sonner';

const CostEstimator = () => {
    const [estimate, setEstimate] = useState<CostEstimate>({
        decorationPackage: 'premium',
        eventSize: 'medium',
        addons: [],
        distance: 0,
        discountCode: ''
    });

    const [breakdown, setBreakdown] = useState<CostBreakdown | null>(null);
    const [showBreakdown, setShowBreakdown] = useState(false);

    // Calculate cost whenever estimate changes
    useEffect(() => {
        const result = calculateCost(estimate);
        setBreakdown(result);
    }, [estimate]);

    const handlePackageChange = (value: string) => {
        setEstimate(prev => ({
            ...prev,
            decorationPackage: value as keyof typeof PRICING.decorationPackages
        }));
    };

    const handleSizeChange = (value: string) => {
        setEstimate(prev => ({
            ...prev,
            eventSize: value as keyof typeof PRICING.eventSize
        }));
    };

    const toggleAddon = (addonKey: keyof typeof PRICING.addons) => {
        setEstimate(prev => ({
            ...prev,
            addons: prev.addons.includes(addonKey)
                ? prev.addons.filter(a => a !== addonKey)
                : [...prev.addons, addonKey]
        }));
    };

    const handleDistanceChange = (value: string) => {
        setEstimate(prev => ({
            ...prev,
            distance: parseInt(value) || 0
        }));
    };

    const handleDiscountCodeChange = (value: string) => {
        setEstimate(prev => ({
            ...prev,
            discountCode: value.toUpperCase()
        }));
    };

    const sendToWhatsApp = () => {
        if (!breakdown) return;

        const message = generateCostEstimateMessage(estimate, breakdown);
        const whatsappUrl = `https://wa.me/917016686728?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        toast.success('Opening WhatsApp...', {
            description: 'Your cost estimate will be shared with our team!'
        });
    };

    const callNow = () => {
        window.location.href = 'tel:+917016686728';
    };

    if (!breakdown) return null;

    return (
        <section className="section-padding bg-gradient-to-b from-background to-muted/20">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
                        Cost Calculator
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                        Estimate Your <span className="gold-gradient-text">Event Cost</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Get an instant cost estimate for your event. Customize your package and see the price breakdown in real-time.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Left: Configuration */}
                    <Card className="p-6 md:p-8 glass-card">
                        <h3 className="font-display text-2xl font-semibold mb-6 flex items-center gap-2">
                            <Calculator className="w-6 h-6 text-primary" />
                            Configure Your Event
                        </h3>

                        <div className="space-y-6">
                            {/* Decoration Package */}
                            <div className="space-y-3">
                                <Label className="flex items-center gap-2 text-base">
                                    <Package className="w-4 h-4 text-primary" />
                                    Decoration Package
                                </Label>
                                <Select value={estimate.decorationPackage} onValueChange={handlePackageChange}>
                                    <SelectTrigger className="h-12">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(PRICING.decorationPackages).map(([key, pkg]) => (
                                            <SelectItem key={key} value={key}>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{pkg.name}</span>
                                                    <span className="text-xs text-muted-foreground">{formatCurrency(pkg.price)}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <p className="text-sm text-muted-foreground">
                                    {PRICING.decorationPackages[estimate.decorationPackage].description}
                                </p>
                            </div>

                            {/* Event Size */}
                            <div className="space-y-3">
                                <Label className="flex items-center gap-2 text-base">
                                    <Users className="w-4 h-4 text-primary" />
                                    Event Size
                                </Label>
                                <Select value={estimate.eventSize} onValueChange={handleSizeChange}>
                                    <SelectTrigger className="h-12">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(PRICING.eventSize).map(([key, size]) => (
                                            <SelectItem key={key} value={key}>
                                                {size.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Add-ons */}
                            <div className="space-y-3">
                                <Label className="flex items-center gap-2 text-base">
                                    <Sparkles className="w-4 h-4 text-primary" />
                                    Add-on Services
                                </Label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {Object.entries(PRICING.addons).map(([key, addon]) => (
                                        <button
                                            key={key}
                                            onClick={() => toggleAddon(key as keyof typeof PRICING.addons)}
                                            className={`p-3 rounded-lg border-2 transition-all text-left ${estimate.addons.includes(key as keyof typeof PRICING.addons)
                                                    ? 'border-primary bg-primary/10'
                                                    : 'border-border hover:border-primary/50'
                                                }`}
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex-1">
                                                    <div className="font-medium text-sm">{addon.name}</div>
                                                    <div className="text-xs text-primary font-semibold">
                                                        {formatCurrency(addon.price)}
                                                    </div>
                                                </div>
                                                {estimate.addons.includes(key as keyof typeof PRICING.addons) && (
                                                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Distance */}
                            <div className="space-y-3">
                                <Label className="flex items-center gap-2 text-base">
                                    <MapPin className="w-4 h-4 text-primary" />
                                    Distance from City Center (km)
                                </Label>
                                <Input
                                    type="number"
                                    min="0"
                                    value={estimate.distance || ''}
                                    onChange={(e) => handleDistanceChange(e.target.value)}
                                    placeholder="Enter distance"
                                    className="h-12"
                                />
                                <p className="text-xs text-muted-foreground">
                                    First {PRICING.travelCharges.freeUpTo} km free, then {formatCurrency(PRICING.travelCharges.perKm)}/km
                                </p>
                            </div>

                            {/* Discount Code */}
                            <div className="space-y-3">
                                <Label className="text-base">Discount Code (Optional)</Label>
                                <Input
                                    type="text"
                                    value={estimate.discountCode}
                                    onChange={(e) => handleDiscountCodeChange(e.target.value)}
                                    placeholder="Enter code"
                                    className="h-12 uppercase"
                                />
                                <div className="flex flex-wrap gap-2">
                                    {Object.values(PRICING.discounts).map((discount) => (
                                        <button
                                            key={discount.code}
                                            onClick={() => handleDiscountCodeChange(discount.code)}
                                            className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                                        >
                                            {discount.code} ({discount.percentage * 100}% OFF)
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Right: Cost Breakdown */}
                    <div className="space-y-6">
                        {/* Total Card */}
                        <Card className="p-6 md:p-8 glass-card border-2 border-primary/20">
                            <div className="text-center mb-6">
                                <p className="text-muted-foreground mb-2">Estimated Total</p>
                                <h3 className="font-display text-5xl md:text-6xl font-bold gold-gradient-text">
                                    {formatCurrency(breakdown.total)}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-2">
                                    *Final price may vary based on specific requirements
                                </p>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="text-center p-4 rounded-lg bg-muted/50">
                                    <p className="text-sm text-muted-foreground mb-1">Base Price</p>
                                    <p className="font-semibold">{formatCurrency(breakdown.subtotal)}</p>
                                </div>
                                <div className="text-center p-4 rounded-lg bg-muted/50">
                                    <p className="text-sm text-muted-foreground mb-1">Add-ons</p>
                                    <p className="font-semibold">{formatCurrency(breakdown.addonsTotal)}</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <Button
                                    variant="gold"
                                    size="lg"
                                    className="w-full"
                                    onClick={sendToWhatsApp}
                                >
                                    <MessageSquare className="w-5 h-5 mr-2" />
                                    Send to WhatsApp
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full"
                                    onClick={callNow}
                                >
                                    <Phone className="w-5 h-5 mr-2" />
                                    Call +91 7016686728
                                </Button>
                            </div>
                        </Card>

                        {/* Detailed Breakdown */}
                        <Card className="p-6 glass-card">
                            <button
                                onClick={() => setShowBreakdown(!showBreakdown)}
                                className="w-full flex items-center justify-between mb-4"
                            >
                                <h4 className="font-semibold text-lg">Price Breakdown</h4>
                                <span className="text-sm text-primary">
                                    {showBreakdown ? 'Hide' : 'Show'} Details
                                </span>
                            </button>

                            {showBreakdown && (
                                <div className="space-y-2">
                                    {breakdown.breakdown.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center py-2 border-b border-border last:border-0"
                                        >
                                            <span className="text-sm text-muted-foreground">{item.item}</span>
                                            <span className={`font-medium ${item.price < 0 ? 'text-green-500' : ''}`}>
                                                {item.price < 0 ? '-' : ''}{formatCurrency(Math.abs(item.price))}
                                            </span>
                                        </div>
                                    ))}
                                    <div className="flex justify-between items-center pt-4 border-t-2 border-primary/20">
                                        <span className="font-semibold text-lg">Total</span>
                                        <span className="font-bold text-2xl text-primary">
                                            {formatCurrency(breakdown.total)}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </Card>

                        {/* Package Includes */}
                        <Card className="p-6 glass-card">
                            <h4 className="font-semibold text-lg mb-4">Package Includes</h4>
                            <ul className="space-y-2">
                                {PRICING.decorationPackages[estimate.decorationPackage].includes.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm">
                                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CostEstimator;
