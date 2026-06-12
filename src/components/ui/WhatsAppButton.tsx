"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after 2.5 seconds to draw attention
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 md:bottom-8 md:right-8">
      {/* Tooltip Popup */}
      {showTooltip && (
        <div 
          className="relative flex items-center gap-3 rounded-2xl bg-white p-3.5 pr-8 text-xs font-bold text-slate-800 shadow-2xl border border-slate-100 select-none max-w-[200px]"
          style={{
            animation: "whatsappTooltipFadeIn 0.3s ease-out both"
          }}
        >
          {/* Close button */}
          <button 
            onClick={() => setShowTooltip(false)}
            className="absolute top-1.5 right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            aria-label="Close message"
          >
            <X size={10} strokeWidth={3} />
          </button>
          
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-[#25D366] font-black uppercase tracking-wider">Affhan Support</span>
            <span className="text-slate-600 leading-normal font-semibold">Hi! How can we help you? Chat with us on WhatsApp.</span>
          </div>
          
          {/* Tooltip Arrow */}
          <div className="absolute -bottom-1 right-5 h-2.5 w-2.5 rotate-45 border-r border-b border-slate-100 bg-white" />
        </div>
      )}

      {/* Pulsing Trigger Button */}
      <a
        href="https://wa.me/919092009044"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setShowTooltip(false)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20ba5a] transition-all duration-300 hover:scale-110 active:scale-95 group"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulsing aura */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-45 animate-ping group-hover:animate-none -z-10" />
        
        {/* Official WhatsApp Logo SVG */}
        <svg 
          viewBox="0 0 24 24" 
          className="h-7 w-7 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.028L2 22l5.176-1.356a9.926 9.926 0 004.836 1.258h.005c5.507 0 9.991-4.478 9.992-9.986A9.967 9.967 0 0012.012 2zm5.718 14.167c-.247.697-1.203 1.267-1.66 1.302-.424.032-.976.046-1.583-.149a9.619 9.619 0 01-3.666-2.18 10.146 10.146 0 01-2.536-3.834c-.45-.765-.544-1.572-.153-2.175.247-.381.569-.459.76-.503.172-.039.378-.048.513-.021.144.029.351.109.49.444.172.417.587 1.431.636 1.53.05.099.083.214.017.346-.066.131-.099.23-.198.344-.099.115-.208.256-.297.346-.099.099-.202.207-.087.403a7.484 7.484 0 001.524 1.896 6.84 6.84 0 002.193 1.348c.206.099.328.083.444-.05.115-.131.49-.569.622-.765.131-.197.264-.164.444-.099.182.066 1.146.54 1.344.636.197.099.328.148.378.23.05.083.05.477-.197 1.175z" />
        </svg>
      </a>
      
      <style>{`
        @keyframes whatsappTooltipFadeIn {
          from { opacity: 0; transform: scale(0.9) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
