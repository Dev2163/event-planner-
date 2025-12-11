# 💰 WhatsApp Bot Cost Estimator - Implementation Guide

## 🎯 Overview

This guide shows how to implement an intelligent cost estimator in your WhatsApp bot that calculates event costs automatically based on user selections.

---

## 🤖 Bot Conversation Flow

### **Step 1: User Initiates**

**User sends:**
```
Estimate cost for birthday decoration
```
or
```
How much for wedding decoration?
```
or
```
Price estimate
```

---

### **Step 2: Bot Asks for Package**

**Bot replies:**
```
🎉 Great! Let's calculate your event cost.

Please choose a decoration package:

1️⃣ Basic Package - ₹3,000
   • Balloon arch
   • Basic table setup
   • 2 hours service

2️⃣ Premium Package - ₹6,000
   • Balloon decoration
   • Flower arrangements
   • LED lights
   • 4 hours service

3️⃣ Luxury Package - ₹12,000
   • Premium balloons
   • Exotic flowers
   • Professional lighting
   • Stage setup
   • Full day service

Reply with 1, 2, or 3
```

---

### **Step 3: User Selects Package**

**User replies:**
```
2
```

**Bot confirms:**
```
✅ Premium Package selected (₹6,000)

Now, what's your event size?

1️⃣ Small (1-50 guests)
2️⃣ Medium (51-150 guests)
3️⃣ Large (151-300 guests)
4️⃣ Extra Large (300+ guests)

Reply with 1, 2, 3, or 4
```

---

### **Step 4: User Selects Event Size**

**User replies:**
```
2
```

**Bot confirms:**
```
✅ Medium event (51-150 guests)

Would you like any add-on services?

1️⃣ Extra Balloons (+₹500)
2️⃣ Flower Arrangements (+₹1,200)
3️⃣ LED Lighting (+₹1,500)
4️⃣ Photography (+₹3,000)
5️⃣ Videography (+₹4,000)
6️⃣ Cake Decoration (+₹800)
7️⃣ Catering Setup (+₹2,000)
8️⃣ Stage Setup (+₹2,500)
9️⃣ Entrance Decoration (+₹1,800)
0️⃣ No add-ons

You can select multiple (e.g., "1,3,4")
or reply "0" for no add-ons
```

---

### **Step 5: User Selects Add-ons**

**User replies:**
```
2,3,4
```

**Bot confirms:**
```
✅ Add-ons selected:
• Flower Arrangements (+₹1,200)
• LED Lighting (+₹1,500)
• Photography (+₹3,000)

How far is your venue from the city center?

Enter distance in km (e.g., "15")
or reply "0" if within city
```

---

### **Step 6: User Enters Distance**

**User replies:**
```
20
```

**Bot confirms:**
```
✅ Distance: 20 km

Do you have a discount code?

Enter code (e.g., "FESTIVE10")
or reply "NO" to skip
```

---

### **Step 7: User Enters Discount Code**

**User replies:**
```
FESTIVE10
```

---

### **Step 8: Bot Calculates & Shows Estimate**

**Bot sends final estimate:**
```
🎉 *Cost Estimate - Elegance Events*

📦 *Package:* Premium Package
👥 *Event Size:* Medium (51-150 guests)

💰 *Price Breakdown:*
━━━━━━━━━━━━━━━━━━━━
Premium Package: ₹6,000
Medium (1.5x): ₹3,000
Flower Arrangements: ₹1,200
LED Lighting: ₹1,500
Photography: ₹3,000
Travel Charges (10 km): ₹150
GST (18%): ₹2,493
Festive Season Discount (-10%): -₹1,385
━━━━━━━━━━━━━━━━━━━━
*Total: ₹15,958*

📞 *Contact:* +91 7016686728
📧 *Email:* hello@eleganceevents.com

✨ _This is an estimated cost. Final price may vary based on specific requirements._

Would you like to:
1️⃣ Book this event
2️⃣ Modify estimate
3️⃣ Talk to our team
```

---

## 🔧 Technical Implementation

### **Using WhatsApp Cloud API**

```javascript
// Cost estimator bot handler
const costEstimatorFlow = {
  state: 'initial',
  data: {
    package: null,
    size: null,
    addons: [],
    distance: 0,
    discountCode: null
  }
};

// Handle incoming message
async function handleCostEstimator(message, from) {
  const text = message.toLowerCase();
  
  // Check if user wants cost estimate
  if (text.includes('estimate') || text.includes('cost') || text.includes('price')) {
    await sendPackageOptions(from);
    costEstimatorFlow.state = 'awaiting_package';
    return;
  }
  
  // Handle based on current state
  switch (costEstimatorFlow.state) {
    case 'awaiting_package':
      await handlePackageSelection(message, from);
      break;
    case 'awaiting_size':
      await handleSizeSelection(message, from);
      break;
    case 'awaiting_addons':
      await handleAddonsSelection(message, from);
      break;
    case 'awaiting_distance':
      await handleDistanceInput(message, from);
      break;
    case 'awaiting_discount':
      await handleDiscountCode(message, from);
      break;
  }
}

// Send package options
async function sendPackageOptions(to) {
  const message = `🎉 Great! Let's calculate your event cost.

Please choose a decoration package:

1️⃣ Basic Package - ₹3,000
2️⃣ Premium Package - ₹6,000
3️⃣ Luxury Package - ₹12,000

Reply with 1, 2, or 3`;

  await sendWhatsAppMessage(to, message);
}

// Handle package selection
async function handlePackageSelection(message, to) {
  const choice = parseInt(message);
  const packages = ['basic', 'premium', 'luxury'];
  
  if (choice >= 1 && choice <= 3) {
    costEstimatorFlow.data.package = packages[choice - 1];
    await sendSizeOptions(to);
    costEstimatorFlow.state = 'awaiting_size';
  } else {
    await sendWhatsAppMessage(to, '❌ Invalid choice. Please reply with 1, 2, or 3');
  }
}

// Calculate final cost
async function calculateAndSendEstimate(to) {
  const { calculateCost, generateCostEstimateMessage } = require('./costCalculator');
  
  const estimate = {
    decorationPackage: costEstimatorFlow.data.package,
    eventSize: costEstimatorFlow.data.size,
    addons: costEstimatorFlow.data.addons,
    distance: costEstimatorFlow.data.distance,
    discountCode: costEstimatorFlow.data.discountCode
  };
  
  const breakdown = calculateCost(estimate);
  const message = generateCostEstimateMessage(estimate, breakdown);
  
  await sendWhatsAppMessage(to, message);
  
  // Reset flow
  costEstimatorFlow.state = 'initial';
  costEstimatorFlow.data = {
    package: null,
    size: null,
    addons: [],
    distance: 0,
    discountCode: null
  };
}
```

---

## 🎨 Enhanced Bot Features

### **1. Quick Replies (Interactive Buttons)**

```javascript
// Send interactive buttons for package selection
async function sendPackageButtons(to) {
  await sendWhatsAppInteractiveMessage(to, {
    type: 'button',
    body: {
      text: '🎉 Choose your decoration package:'
    },
    action: {
      buttons: [
        {
          type: 'reply',
          reply: {
            id: 'pkg_basic',
            title: 'Basic ₹3,000'
          }
        },
        {
          type: 'reply',
          reply: {
            id: 'pkg_premium',
            title: 'Premium ₹6,000'
          }
        },
        {
          type: 'reply',
          reply: {
            id: 'pkg_luxury',
            title: 'Luxury ₹12,000'
          }
        }
      ]
    }
  });
}
```

### **2. List Messages**

```javascript
// Send list of add-ons
async function sendAddonsList(to) {
  await sendWhatsAppListMessage(to, {
    body: 'Select add-on services:',
    button: 'View Add-ons',
    sections: [
      {
        title: 'Decoration Add-ons',
        rows: [
          { id: 'addon_balloons', title: 'Extra Balloons', description: '₹500' },
          { id: 'addon_flowers', title: 'Flowers', description: '₹1,200' },
          { id: 'addon_lights', title: 'LED Lights', description: '₹1,500' }
        ]
      },
      {
        title: 'Photography',
        rows: [
          { id: 'addon_photo', title: 'Photography', description: '₹3,000' },
          { id: 'addon_video', title: 'Videography', description: '₹4,000' }
        ]
      }
    ]
  });
}
```

---

## 📊 Pricing Configuration

All pricing is managed in `src/lib/costCalculator.ts`:

```typescript
export const PRICING = {
  decorationPackages: {
    basic: { price: 3000, ... },
    premium: { price: 6000, ... },
    luxury: { price: 12000, ... }
  },
  addons: {
    balloons: { price: 500, ... },
    flowers: { price: 1200, ... },
    // ... more add-ons
  },
  gst: { rate: 0.18 }, // 18%
  discounts: {
    festive: { percentage: 0.10, code: 'FESTIVE10' },
    // ... more discounts
  }
};
```

---

## 🚀 Deployment Steps

### **1. Setup WhatsApp Cloud API**
- Create Meta Developer account
- Get Phone Number ID
- Get Access Token

### **2. Deploy Bot Handler**
- Deploy to Vercel/Railway/Heroku
- Set webhook URL
- Configure environment variables

### **3. Test Bot**
- Send "estimate cost" to your WhatsApp number
- Follow the conversation flow
- Verify calculations

---

## 📞 Contact

**Phone:** +91 7016686728
**Email:** hello@eleganceevents.com

---

## ✅ Features Summary

✅ **Interactive package selection**
✅ **Real-time cost calculation**
✅ **Add-on services**
✅ **Distance-based travel charges**
✅ **Discount code support**
✅ **GST calculation**
✅ **Detailed price breakdown**
✅ **WhatsApp message formatting**
✅ **Conversation state management**
✅ **Error handling**

---

*Made with ❤️ by Elegance Events*
*Contact: +91 7016686728*
