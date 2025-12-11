import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { useState } from "react";

// AI-powered response system
const getBotResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase().trim();

  // Greeting responses
  if (message.match(/^(hi|hello|hey|hola|namaste)/)) {
    return "👋 Hi there! Welcome to Elegance Events. How can I help you plan your perfect celebration today?";
  }

  // Booking related
  if (message.includes('book') || message.includes('booking')) {
    return "🎉 Great! I'd love to help you book an event. What type of event are you planning?\n\n• Wedding Planning\n• Birthday Party\n• Corporate Event\n• Baby Shower\n• Anniversary\n• Theme Party\n\nJust let me know!";
  }

  // Wedding related
  if (message.includes('wedding') || message.includes('marriage') || message.includes('shaadi')) {
    return "💝 Wonderful! We specialize in creating magical weddings.\n\n✨ Our wedding services include:\n• Complete venue decoration\n• Floral arrangements\n• Stage setup\n• Catering coordination\n• Photography & videography\n• Guest management\n\n📞 Call us at +91 7016686728 or click 'Book Now' to get started!";
  }

  // Birthday related
  if (message.includes('birthday') || message.includes('bday') || message.includes('party')) {
    return "🎂 Awesome! We create unforgettable birthday celebrations!\n\n🎈 Our birthday packages include:\n• Theme-based decorations\n• Balloon arrangements\n• Cake & dessert table\n• Entertainment & games\n• Photography\n• Party favors\n\n💰 Packages start from ₹15,000\n📞 Contact: +91 7016686728";
  }

  // Corporate events
  if (message.includes('corporate') || message.includes('office') || message.includes('company') || message.includes('conference')) {
    return "🏢 Perfect! We handle professional corporate events.\n\n📊 Services include:\n• Conference planning\n• Product launches\n• Team building events\n• AV equipment setup\n• Professional catering\n• Branding & signage\n\n📞 Let's discuss your requirements: +91 7016686728";
  }

  // Pricing related
  if (message.includes('price') || message.includes('cost') || message.includes('budget') || message.includes('charge') || message.includes('fee')) {
    return "💰 Our pricing depends on your specific requirements:\n\n💎 Wedding: ₹50,000 - ₹5,00,000+\n🎂 Birthday: ₹15,000 - ₹1,00,000\n🏢 Corporate: ₹25,000 - ₹3,00,000\n👶 Baby Shower: ₹20,000 - ₹75,000\n\n📞 For exact quote, call: +91 7016686728\n📝 Or click 'Book Now' for detailed pricing!";
  }

  // Services related
  if (message.includes('service') || message.includes('what do you') || message.includes('what can you')) {
    return "✨ We offer complete event planning services:\n\n🎊 Event Types:\n• Weddings\n• Birthdays\n• Corporate Events\n• Baby Showers\n• Anniversaries\n• Theme Parties\n\n🎨 Services:\n• Decoration\n• Catering\n• Photography\n• Entertainment\n• Venue booking\n\n📞 Call: +91 7016686728";
  }

  // Contact related
  if (message.includes('contact') || message.includes('phone') || message.includes('number') || message.includes('call')) {
    return "📞 You can reach us at:\n\n📱 Phone/WhatsApp: +91 7016686728\n📧 Email: hello@eleganceevents.com\n\n⏰ Available: Mon-Sat, 10 AM - 8 PM\n\nFeel free to call us anytime!";
  }

  // Location related
  if (message.includes('location') || message.includes('where') || message.includes('address') || message.includes('office')) {
    return "📍 We serve events across India!\n\n🌟 Popular cities:\n• Mumbai\n• Delhi\n• Bangalore\n• Pune\n• Hyderabad\n• And many more!\n\n📞 Call +91 7016686728 to check availability in your city.";
  }

  // Availability/Date related
  if (message.includes('available') || message.includes('date') || message.includes('when') || message.includes('free')) {
    return "📅 We'd love to check availability for your event!\n\nPlease share:\n• Event date\n• Event type\n• Location\n• Guest count\n\n📞 Or call us directly: +91 7016686728\n📝 Click 'Book Now' to fill the form!";
  }

  // Package related
  if (message.includes('package') || message.includes('plan') || message.includes('offer')) {
    return "📦 We have customized packages for every budget!\n\n✨ Popular Packages:\n\n🥉 Essential: Basic decoration + catering\n🥈 Premium: Complete setup + entertainment\n🥇 Luxury: Everything + premium services\n\n📞 Call for details: +91 7016686728\n📝 Or click 'Book Now' to explore!";
  }

  // Decoration related
  if (message.includes('decoration') || message.includes('decor') || message.includes('theme')) {
    return "🎨 We create stunning decorations!\n\n✨ Decoration services:\n• Floral arrangements\n• Balloon installations\n• Stage decoration\n• Entrance decor\n• Table settings\n• Lighting setup\n• Theme-based designs\n\n📸 See our portfolio on the website!\n📞 Contact: +91 7016686728";
  }

  // Photography related
  if (message.includes('photo') || message.includes('video') || message.includes('camera')) {
    return "📸 Professional photography & videography available!\n\n📷 Services include:\n• Pre-event photoshoot\n• Event coverage\n• Candid photography\n• Drone shots\n• Video editing\n• Photo albums\n\n📞 Book now: +91 7016686728";
  }

  // Catering related
  if (message.includes('food') || message.includes('catering') || message.includes('menu') || message.includes('cuisine')) {
    return "🍽️ Delicious catering services available!\n\n👨‍🍳 We offer:\n• Indian cuisine\n• Continental\n• Chinese\n• Desserts & beverages\n• Custom menus\n• Live counters\n\n📞 Discuss menu: +91 7016686728";
  }

  // Thank you
  if (message.includes('thank') || message.includes('thanks')) {
    return "You're welcome! 😊\n\nIs there anything else I can help you with?\n\n📞 Feel free to call: +91 7016686728\n📝 Or click 'Book Now' to start planning!";
  }

  // Help/Support
  if (message.includes('help') || message.includes('support') || message.includes('assist')) {
    return "🤝 I'm here to help!\n\nYou can ask me about:\n• Event booking\n• Pricing & packages\n• Services we offer\n• Availability\n• Contact details\n\nOr simply tell me what event you're planning! 🎉";
  }

  // Default response with suggestions
  return "I'd love to help you! 😊\n\nYou can ask me about:\n\n🎉 Event booking\n💰 Pricing & packages\n📅 Availability\n🎨 Decoration services\n📸 Photography\n🍽️ Catering\n\nOr click one of the quick messages below!\n\n📞 Call anytime: +91 7016686728";
};

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ type: 'user' | 'bot', text: string }>>([
    {
      type: 'bot',
      text: "👋 Hi there! Welcome to Elegance Events. How can I help you plan your perfect celebration?"
    }
  ]);

  const phoneNumber = "917016686728";

  const sendMessage = () => {
    const userMsg = message.trim();
    if (!userMsg) return;

    // Add user message to chat
    setChatHistory(prev => [...prev, { type: 'user', text: userMsg }]);

    // Get bot response
    const botResponse = getBotResponse(userMsg);

    // Add bot response after a short delay
    setTimeout(() => {
      setChatHistory(prev => [...prev, { type: 'bot', text: botResponse }]);
    }, 500);

    // Clear input
    setMessage("");
  };

  const handleQuickMessage = (msg: string) => {
    setMessage(msg);
    // Auto-send after setting message
    setTimeout(() => {
      const userMsg = msg.trim();
      setChatHistory(prev => [...prev, { type: 'user', text: userMsg }]);

      const botResponse = getBotResponse(userMsg);
      setTimeout(() => {
        setChatHistory(prev => [...prev, { type: 'bot', text: botResponse }]);
      }, 500);

      setMessage("");
    }, 100);
  };

  const openWhatsApp = () => {
    const whatsappMsg = "Hi! I'm interested in booking an event with Elegance Events.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMsg)}`, "_blank");
  };

  const quickMessages = [
    "I want to book a wedding",
    "Birthday party inquiry",
    "Corporate event quote",
    "Get pricing details",
  ];

  return (
    <>
      {/* Chat Widget */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-96 transition-all duration-500 ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
      >
        <div className="glass-card overflow-hidden shadow-2xl animate-scale-in rounded-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Elegance Events</h4>
                <p className="text-xs text-white/80">Usually replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors hover:rotate-90 duration-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="bg-card/95 h-96 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 ${msg.type === 'user'
                      ? 'bg-green-500 text-white rounded-br-none'
                      : 'bg-muted/50 text-foreground rounded-bl-none'
                      }`}
                  >
                    <p className="text-sm whitespace-pre-line">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Messages */}
            {chatHistory.length <= 2 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-muted-foreground mb-2">Quick messages:</p>
                <div className="flex flex-wrap gap-2">
                  {quickMessages.map((msg) => (
                    <button
                      key={msg}
                      onClick={() => handleQuickMessage(msg)}
                      className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      {msg}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type a message..."
                  maxLength={500}
                  className="flex-1 px-4 py-2 rounded-full bg-muted/50 border border-border focus:border-primary focus:outline-none text-sm transition-colors"
                />
                <button
                  onClick={sendMessage}
                  className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white hover:bg-green-600 transition-all hover:scale-110"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={openWhatsApp}
                className="w-full mt-2 text-xs text-green-600 hover:text-green-700 font-medium"
              >
                💬 Continue on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          {/* Pulse Animation */}
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-30" />
          <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse opacity-20" style={{ animationDelay: "0.5s" }} />

          {/* Button */}
          <div className={`relative w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 ${isOpen ? "rotate-90 bg-green-600" : "hover:bg-green-600 hover:scale-110"
            }`}>
            {isOpen ? (
              <X className="w-7 h-7 text-white" />
            ) : (
              <MessageCircle className="w-7 h-7 text-white" />
            )}
          </div>

          {/* Notification Badge */}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
              <span className="text-xs text-white font-bold">1</span>
            </div>
          )}

          {/* Tooltip */}
          {!isOpen && (
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-4 py-2 bg-card rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              <span className="text-sm font-medium text-foreground">Chat with us!</span>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-card rotate-45" />
            </div>
          )}
        </div>
      </button>
    </>
  );
};

export default WhatsAppButton;
