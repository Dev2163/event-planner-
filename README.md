# Elegance Events - Event Planning Platform

A modern, feature-rich event planning and booking platform built with React, TypeScript, and Vite.

## 🎉 Features

### Website Features
- ✨ **Interactive Event Pages** - Detailed pages for each event type with animations
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎨 **Modern UI** - Beautiful glass-morphism design with smooth animations
- 📅 **Booking System** - Complete booking form with validation
- 💬 **AI Chatbot** - Intelligent WhatsApp chatbot that answers questions
- 🔔 **Notifications** - Email and WhatsApp confirmations

### Event Types
- 💝 Wedding Planning
- 🎂 Birthday Parties
- 🏢 Corporate Events
- 👶 Baby Showers
- 💑 Anniversaries
- 🎭 Theme Parties
- 📸 Photography Services
- 🍽️ Catering Services

### Backend Integration
- 📊 **Google Sheets** - Booking database
- 📅 **Google Calendar** - Automatic event scheduling
- 📧 **Email System** - Automated confirmations
- 💬 **WhatsApp API** - Instant notifications

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Google Account (for backend)
- WhatsApp Business Account (optional)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Dev2163/event-planner-.git
   cd event-planner-
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Open browser:**
   ```
   http://localhost:8081
   ```

## 📁 Project Structure

```
eventflow-pro-main/
├── src/
│   ├── components/          # React components
│   │   ├── BookingModal.tsx # Booking form
│   │   ├── WhatsAppButton.tsx # AI chatbot
│   │   ├── HeroSection.tsx  # Home page hero
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── Index.tsx       # Home page
│   │   ├── EventDetail.tsx # Event details
│   │   └── ...
│   ├── lib/                # Utilities
│   │   └── api.ts          # API integration
│   └── index.css           # Global styles
├── google-apps-script/     # Backend code
│   └── BookingSystem.gs    # Google Apps Script
├── public/                 # Static assets
└── docs/                   # Documentation
    ├── DEPLOYMENT.md
    ├── SETUP_GUIDE.md
    └── ...
```

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Backend
- **Google Apps Script** - Server logic
- **Google Sheets** - Database
- **Google Calendar** - Scheduling
- **WhatsApp Cloud API** - Messaging

## 📞 Contact Information

- **Phone/WhatsApp:** +91 7016686728
- **Email:** hello@eleganceevents.com
- **Website:** [Coming Soon]

## 🔧 Configuration

### Environment Variables

Create `.env.local` file:

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
VITE_PHONE_NUMBER=917016686728
VITE_EMAIL=hello@eleganceevents.com
VITE_WHATSAPP_NUMBER=917016686728
```

## 📚 Documentation

- [Deployment Guide](DEPLOYMENT.md) - How to deploy
- [Setup Guide](SETUP_GUIDE.md) - Detailed setup instructions
- [WhatsApp Bot System](WHATSAPP_BOT_SYSTEM.md) - Bot architecture
- [Implementation Summary](IMPLEMENTATION_SUMMARY.md) - Complete overview

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Deploy to Netlify

1. Build the project: `npm run build`
2. Upload `dist` folder to Netlify
3. Configure environment variables

## 🎨 Features Showcase

### Booking System
- Multi-step form with validation
- Real-time availability checking
- Google Sheets integration
- Email & WhatsApp confirmations
- Payment tracking

### AI Chatbot
- Natural language understanding
- Context-aware responses
- Quick message suggestions
- WhatsApp integration
- 24/7 availability

### Event Pages
- Parallax scrolling effects
- Smooth animations
- Decoration galleries
- Pricing packages
- Portfolio showcase

## 📊 API Integration

The booking system integrates with:

1. **Google Apps Script** - Backend processing
2. **Google Sheets** - Data storage
3. **Google Calendar** - Event scheduling
4. **WhatsApp API** - Notifications
5. **Email Service** - Confirmations

## 🔐 Security

- Environment variables for sensitive data
- HTTPS encryption
- Form validation
- CORS configuration
- Secure API endpoints

## 🧪 Testing

Run tests:
```bash
npm run test
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 📝 License

This project is private and proprietary.

## 👥 Team

**Elegance Events**
- Creating Magical Moments Since 2015
- Professional Event Planning Services
- Contact: +91 7016686728

## 🙏 Acknowledgments

- React Team
- Vite Team
- Tailwind CSS
- Framer Motion
- All open-source contributors

## 📈 Roadmap

- [ ] Payment gateway integration
- [ ] Customer dashboard
- [ ] Mobile app
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Vendor marketplace

## 🐛 Bug Reports

Found a bug? Please contact:
- Phone: +91 7016686728
- Email: hello@eleganceevents.com

## 💡 Feature Requests

Have an idea? We'd love to hear it!
Contact us at: +91 7016686728

---

**Made with ❤️ by Elegance Events**

*Creating unforgettable celebrations, one event at a time.*

📞 +91 7016686728 | 📧 hello@eleganceevents.com
