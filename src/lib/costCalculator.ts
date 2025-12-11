/**
 * Cost Estimation Calculator
 * Calculates event costs based on user selections
 */

// Pricing Configuration
export const PRICING = {
    // Base Decoration Packages
    decorationPackages: {
        basic: {
            name: 'Basic Package',
            price: 3000,
            description: 'Simple balloon decoration with basic setup',
            includes: ['Balloon arch', 'Basic table setup', '2 hours service']
        },
        premium: {
            name: 'Premium Package',
            price: 6000,
            description: 'Enhanced decoration with flowers and lighting',
            includes: ['Balloon decoration', 'Flower arrangements', 'LED lights', '4 hours service']
        },
        luxury: {
            name: 'Luxury Package',
            price: 12000,
            description: 'Complete premium decoration with all amenities',
            includes: ['Premium balloons', 'Exotic flowers', 'Professional lighting', 'Stage setup', 'Full day service']
        }
    },

    // Event Size Multipliers
    eventSize: {
        small: {
            name: 'Small (1-50 guests)',
            multiplier: 1.0,
            description: 'Intimate gathering'
        },
        medium: {
            name: 'Medium (51-150 guests)',
            multiplier: 1.5,
            description: 'Mid-size celebration'
        },
        large: {
            name: 'Large (151-300 guests)',
            multiplier: 2.0,
            description: 'Grand event'
        },
        extraLarge: {
            name: 'Extra Large (300+ guests)',
            multiplier: 2.5,
            description: 'Mega celebration'
        }
    },

    // Add-on Services
    addons: {
        balloons: {
            name: 'Extra Balloons',
            price: 500,
            description: 'Additional balloon decorations'
        },
        flowers: {
            name: 'Flower Arrangements',
            price: 1200,
            description: 'Fresh flower decorations'
        },
        ledLights: {
            name: 'LED Lighting',
            price: 1500,
            description: 'Professional LED light setup'
        },
        photography: {
            name: 'Photography',
            price: 3000,
            description: 'Professional photographer (4 hours)'
        },
        videography: {
            name: 'Videography',
            price: 4000,
            description: 'Professional videographer (4 hours)'
        },
        cake: {
            name: 'Cake Decoration',
            price: 800,
            description: 'Cake table decoration'
        },
        catering: {
            name: 'Catering Setup',
            price: 2000,
            description: 'Food counter decoration'
        },
        stage: {
            name: 'Stage Setup',
            price: 2500,
            description: 'Professional stage decoration'
        },
        entrance: {
            name: 'Entrance Decoration',
            price: 1800,
            description: 'Grand entrance setup'
        }
    },

    // Travel Charges (per km)
    travelCharges: {
        perKm: 15,
        freeUpTo: 10, // Free for first 10 km
        description: 'Travel charges beyond 10 km'
    },

    // GST
    gst: {
        rate: 0.18, // 18%
        description: 'Goods and Services Tax'
    },

    // Discounts
    discounts: {
        festive: {
            name: 'Festive Season Discount',
            percentage: 0.10, // 10%
            code: 'FESTIVE10'
        },
        referral: {
            name: 'Referral Discount',
            percentage: 0.15, // 15%
            code: 'REFER15'
        },
        earlyBird: {
            name: 'Early Bird Discount',
            percentage: 0.05, // 5%
            code: 'EARLY5',
            description: 'Book 30 days in advance'
        }
    }
};

// Cost Calculation Interface
export interface CostEstimate {
    decorationPackage: keyof typeof PRICING.decorationPackages;
    eventSize: keyof typeof PRICING.eventSize;
    addons: Array<keyof typeof PRICING.addons>;
    distance?: number; // km
    discountCode?: string;
}

export interface CostBreakdown {
    basePrice: number;
    sizeMultiplier: number;
    subtotal: number;
    addonsTotal: number;
    travelCharges: number;
    subtotalBeforeTax: number;
    gst: number;
    discount: number;
    total: number;
    breakdown: {
        item: string;
        price: number;
    }[];
}

/**
 * Calculate total cost based on selections
 */
export function calculateCost(estimate: CostEstimate): CostBreakdown {
    const breakdown: CostBreakdown['breakdown'] = [];

    // 1. Base decoration package
    const packageData = PRICING.decorationPackages[estimate.decorationPackage];
    const basePrice = packageData.price;
    breakdown.push({
        item: packageData.name,
        price: basePrice
    });

    // 2. Event size multiplier
    const sizeData = PRICING.eventSize[estimate.eventSize];
    const sizeMultiplier = sizeData.multiplier;
    const subtotal = basePrice * sizeMultiplier;

    if (sizeMultiplier > 1) {
        breakdown.push({
            item: `${sizeData.name} (${sizeMultiplier}x)`,
            price: subtotal - basePrice
        });
    }

    // 3. Add-ons
    let addonsTotal = 0;
    estimate.addons.forEach(addonKey => {
        const addon = PRICING.addons[addonKey];
        addonsTotal += addon.price;
        breakdown.push({
            item: addon.name,
            price: addon.price
        });
    });

    // 4. Travel charges
    let travelCharges = 0;
    if (estimate.distance && estimate.distance > PRICING.travelCharges.freeUpTo) {
        const chargeableDistance = estimate.distance - PRICING.travelCharges.freeUpTo;
        travelCharges = chargeableDistance * PRICING.travelCharges.perKm;
        breakdown.push({
            item: `Travel Charges (${chargeableDistance} km)`,
            price: travelCharges
        });
    }

    // 5. Subtotal before tax
    const subtotalBeforeTax = subtotal + addonsTotal + travelCharges;

    // 6. GST
    const gst = subtotalBeforeTax * PRICING.gst.rate;
    breakdown.push({
        item: `GST (${PRICING.gst.rate * 100}%)`,
        price: gst
    });

    // 7. Discount
    let discount = 0;
    if (estimate.discountCode) {
        const discountKey = Object.keys(PRICING.discounts).find(
            key => PRICING.discounts[key as keyof typeof PRICING.discounts].code === estimate.discountCode
        );

        if (discountKey) {
            const discountData = PRICING.discounts[discountKey as keyof typeof PRICING.discounts];
            discount = subtotalBeforeTax * discountData.percentage;
            breakdown.push({
                item: `${discountData.name} (-${discountData.percentage * 100}%)`,
                price: -discount
            });
        }
    }

    // 8. Final total
    const total = subtotalBeforeTax + gst - discount;

    return {
        basePrice,
        sizeMultiplier,
        subtotal,
        addonsTotal,
        travelCharges,
        subtotalBeforeTax,
        gst,
        discount,
        total: Math.round(total),
        breakdown
    };
}

/**
 * Get price range for a package
 */
export function getPriceRange(packageType: keyof typeof PRICING.decorationPackages): {
    min: number;
    max: number;
} {
    const basePrice = PRICING.decorationPackages[packageType].price;

    // Minimum: Small event, no addons
    const min = basePrice * PRICING.eventSize.small.multiplier;

    // Maximum: Extra large event, all addons, max travel, with GST
    const allAddons = Object.values(PRICING.addons).reduce((sum, addon) => sum + addon.price, 0);
    const maxTravel = 50 * PRICING.travelCharges.perKm; // Assume max 50 km
    const max = (basePrice * PRICING.eventSize.extraLarge.multiplier + allAddons + maxTravel) * (1 + PRICING.gst.rate);

    return {
        min: Math.round(min),
        max: Math.round(max)
    };
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
    return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * Generate WhatsApp message with cost estimate
 */
export function generateCostEstimateMessage(
    estimate: CostEstimate,
    breakdown: CostBreakdown
): string {
    const packageData = PRICING.decorationPackages[estimate.decorationPackage];
    const sizeData = PRICING.eventSize[estimate.eventSize];

    let message = `🎉 *Cost Estimate - Elegance Events*\n\n`;
    message += `📦 *Package:* ${packageData.name}\n`;
    message += `👥 *Event Size:* ${sizeData.name}\n\n`;

    message += `💰 *Price Breakdown:*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;

    breakdown.breakdown.forEach(item => {
        const price = item.price >= 0 ? formatCurrency(item.price) : `-${formatCurrency(Math.abs(item.price))}`;
        message += `${item.item}: ${price}\n`;
    });

    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `*Total: ${formatCurrency(breakdown.total)}*\n\n`;

    message += `📞 *Contact:* +91 7016686728\n`;
    message += `📧 *Email:* hello@eleganceevents.com\n\n`;
    message += `✨ _This is an estimated cost. Final price may vary based on specific requirements._`;

    return message;
}

export default {
    PRICING,
    calculateCost,
    getPriceRange,
    formatCurrency,
    generateCostEstimateMessage
};
