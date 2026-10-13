import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, MessageSquare, Sparkles, CheckCheck, PhoneCall } from 'lucide-react';

interface ConciergeChatModalProps {
  onClose: () => void;
  initialQuery?: string;
}

interface ChatMessage {
  id: string;
  sender: 'concierge' | 'user';
  text: string;
  time: string;
}

export const ConciergeChatModal: React.FC<ConciergeChatModalProps> = ({
  onClose,
  initialQuery,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'concierge',
      text: "Hello! I'm Vikram, your TravelEasy 24/7 Holiday Concierge. How can I make your journey extraordinary today?",
      time: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState(initialQuery || '');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickSuggestions = [
    'Can I customize the Kerala Houseboat?',
    'What are the best dates for Goa?',
    'Are private airport transfers included?',
    'How do I add custom flights?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Simulated smart concierge reply
    setTimeout(() => {
      let reply = "I would love to help you with that! All our holiday packages are 100% customizable. Our local destination team ensures private transfers, handpicked verified stays, and flexible dates.";
      const lower = text.toLowerCase();
      if (lower.includes('kerala') || lower.includes('houseboat')) {
        reply = "The Kerala Backwater Escape features a private luxury Kettuvallam with your own personal chef. You can request vegetarian, vegan, or traditional Malabar seafood menus at zero extra fee!";
      } else if (lower.includes('goa') || lower.includes('dates')) {
        reply = "For Goa, November through February offers sublime coastal sunsets, beach shacks, and comfortable 26°C evenings. The package includes VIP Catamaran cruise tickets along Mandovi River!";
      } else if (lower.includes('flight')) {
        reply = "You can add flights from Bengaluru, Mumbai, Delhi, and more with 1 tap via the 'Configure' button on our flight banner. We lock in instant guaranteed fares with 15kg baggage included!";
      } else if (lower.includes('transfer') || lower.includes('airport')) {
        reply = "Yes! All packages come with dedicated private air-conditioned SUV airport pickup and drop-off. Your driver greets you right at the arrival terminal with a name sign.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'concierge',
          text: reply,
          time: 'Just now',
        },
      ]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center sm:p-4">
      <div 
        className="bg-[#0a122a] border border-white/[0.1] rounded-t-3xl sm:rounded-3xl w-full max-w-lg h-[80vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Concierge Header */}
        <div className="p-4 bg-[#131a33] border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#29a195]/20 border border-[#6bd8cb]/40 flex items-center justify-center text-[#6bd8cb]">
                <MessageSquare className="w-5 h-5 text-[#6bd8cb]" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#6bd8cb] ring-2 ring-[#131a33]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-white text-base">TravelEasy Concierge</h3>
                <span className="text-[10px] font-heading font-bold uppercase px-1.5 py-0.5 rounded bg-[#29a195]/30 text-[#6bd8cb]">
                  24/7 Live
                </span>
              </div>
              <p className="text-xs text-[#bcc9c6]">Vikram • Holiday & Flight Specialist</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#171e37] flex items-center justify-center text-[#bcc9c6] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#6bd8cb] text-[#003732] font-medium rounded-tr-none'
                    : 'bg-[#131a33] text-[#dbe1ff] border border-white/[0.06] rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-[#879391] mt-1 px-1">{msg.time}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 bg-[#070d1e] border-t border-white/[0.04] flex gap-2 overflow-x-auto no-scrollbar">
          {quickSuggestions.map((sug, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(sug)}
              className="flex-shrink-0 px-3 py-1 rounded-full bg-[#131a33] hover:bg-[#171e37] border border-white/[0.08] hover:border-[#6bd8cb]/40 text-xs text-[#bcc9c6] hover:text-white transition-colors"
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#131a33] border-t border-white/[0.08] flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about itineraries, custom stays, or flights..."
            className="flex-1 bg-[#171e37] border border-white/[0.08] focus:border-[#6bd8cb] rounded-full px-4 py-2.5 text-sm text-white placeholder-[#879391] focus:outline-none"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim()}
            className="w-10 h-10 rounded-full bg-[#6bd8cb] hover:bg-[#89f5e7] disabled:opacity-40 text-[#003732] flex items-center justify-center flex-shrink-0 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
