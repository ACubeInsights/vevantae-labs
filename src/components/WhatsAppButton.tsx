'use client';

import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const phoneNumber = '+919671300080';
  const message = 'Hello! I would like to know more about Vevantae Labs products.';

  const handleClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-success hover:bg-success-strong text-success-foreground p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />

      <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-foreground text-background text-sm whitespace-nowrap rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Chat with us on WhatsApp
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground" />
      </div>
    </button>
  );
}
