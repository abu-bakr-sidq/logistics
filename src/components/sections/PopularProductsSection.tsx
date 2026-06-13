"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Package, Globe } from "lucide-react";
import { popularProducts, type Product as PopularProduct } from "@/data/products";

function PopularProductCard({
  product,
  isActive,
  onClick,
}: {
  product: PopularProduct;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <article
      onClick={onClick}
      className={`group relative box-border h-[170px] w-[105px] shrink-0 overflow-hidden rounded-xl cursor-pointer popular-glass-card sm:h-[268px] sm:w-[208px] lg:h-[280px] lg:w-[220px] ${
        isActive ? "active-card" : ""
      }`}
    >
      {/* Glossy sweeping glass sheen reflection overlay */}
      <div className="glass-sheen" />

      {/* Product Image */}
      <div className="relative h-[64%] overflow-hidden bg-slate-100/10">
        <Image
          alt={product.name}
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          fill
          sizes="(max-width: 640px) 110px, 280px"
          src={`/images/popular products/${product.image}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      
      {/* Product Name */}
      <div className="relative flex h-[36%] items-center px-2.5 sm:px-3.5 border-t border-slate-200/10 bg-transparent">
        <h3 className="line-clamp-2 text-[9.5px] font-bold leading-[1.25] text-slate-800 tracking-tight transition-colors duration-300 group-hover:text-[#176579] sm:text-[13px] sm:font-semibold sm:leading-snug">
          {product.name}
        </h3>
      </div>

      {/* Slide bar highlight */}
      <div className={`absolute bottom-0 left-0 h-[2px] bg-[#27a8c4] transition-all duration-300 ${
        isActive ? "w-full shadow-[0_0_8px_rgba(39,168,196,0.6)]" : "w-0 group-hover:w-full"
      }`} />
    </article>
  );
}

export function PopularProductsSection() {
  const [activeProductIndex, setActiveProductIndex] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const [inquiryProduct, setInquiryProduct] = useState<PopularProduct | null>(null);
  const [inquiryForm, setInquiryForm] = useState({
    qty: "500",
    timeline: "1 Month",
    details: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const activeProduct = popularProducts[activeProductIndex];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setInquiryProduct(null);
      setSubmitted(false);
      setInquiryForm({ qty: "500", timeline: "1 Month", details: "", email: "" });
    }, 2000);
  };

  const scrollPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= 240;
    }
  };
  const scrollNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += 240;
    }
  };

  return (
    <section
      id="popular-products"
      className="relative box-border flex min-h-screen lg:h-screen w-full lg:snap-start flex-col justify-center overflow-y-auto lg:overflow-hidden bg-[#f9fafb] px-5 pt-24 pb-12 sm:px-8 lg:px-14 lg:pt-28 lg:pb-10"
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        .popular-glass-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(240, 253, 250, 0.25) 100%) !important;
          backdrop-filter: blur(20px) !important;
          -webkit-backdrop-filter: blur(20px) !important;
          border-top: 1.5px solid rgba(255, 255, 255, 0.8) !important;
          border-left: 1.5px solid rgba(255, 255, 255, 0.8) !important;
          border-bottom: 1.5px solid rgba(148, 163, 184, 0.2) !important;
          border-right: 1.5px solid rgba(148, 163, 184, 0.2) !important;
          box-shadow: 
            inset 0 2px 6px rgba(255, 255, 255, 0.7), 
            inset 0 -2px 6px rgba(0, 0, 0, 0.02),
            0 8px 24px rgba(15, 23, 42, 0.04) !important;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
          will-change: transform, box-shadow, background-color, border-color;
        }

        .popular-glass-card:hover {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(240, 253, 250, 0.35) 100%) !important;
          border-top-color: rgba(255, 255, 255, 0.95) !important;
          border-left-color: rgba(255, 255, 255, 0.95) !important;
          border-bottom-color: rgba(148, 163, 184, 0.3) !important;
          border-right-color: rgba(148, 163, 184, 0.3) !important;
          box-shadow: 
            inset 0 4px 10px rgba(255, 255, 255, 0.85), 
            inset 0 -4px 10px rgba(0, 0, 0, 0.03),
            0 16px 36px rgba(39, 168, 196, 0.1),
            0 2px 6px rgba(0, 0, 0, 0.01) !important;
          transform: translateY(-6px) !important;
        }

        .popular-glass-card.active-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(224, 242, 254, 0.45) 100%) !important;
          border: 2px solid #27a8c4 !important;
          box-shadow: 
            inset 0 2px 8px rgba(255, 255, 255, 0.9), 
            inset 0 -2px 8px rgba(0, 0, 0, 0.02),
            0 12px 28px rgba(39, 168, 196, 0.15) !important;
        }

        .glass-sheen {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0) 100%);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
          z-index: 20;
        }
        .popular-glass-card:hover .glass-sheen {
          transform: translateX(100%);
        }
      `}} />

      {/* High-tech dot mesh overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.28] pointer-events-none" />
      {/* Subtle background light cyan radial light aura at bottom-left */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(39,168,196,0.055)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

      <div className="relative z-10 mx-auto my-auto flex w-full max-w-[1640px] flex-col justify-center overflow-hidden">
        
        {/* Header Section */}
        <div className="flex -translate-y-2 flex-col justify-between gap-3 pb-4 border-b border-slate-100/50 lg:flex-row lg:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#27a8c4] drop-shadow-[0_2px_4px_rgba(39,168,196,0.06)]">
              Popular Products
            </span>
            <h2 className="mt-2 max-w-[650px] text-[22px] font-semibold leading-tight tracking-[-0.02em] text-slate-950 sm:text-[28px] lg:text-[32px]">
              Trending products ready for global sourcing
            </h2>
          </div>
          <p className="max-w-[470px] text-[13px] leading-6 text-slate-600 lg:pb-1">
            Explore everyday high-demand listings. Select any product card from the carousel to view live sourcing details.
          </p>
        </div>

        {/* Dynamic Split Layout */}
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-stretch lg:h-[510px] p-2 overflow-hidden">
          
          {/* Left Panel: Spotlight Console (Frosted white glass theme) */}
          <div className="hidden lg:flex lg:w-[35%] bg-white/75 border border-slate-200/50 backdrop-blur-md rounded-3xl p-5 lg:p-6 flex-col justify-between lg:h-full shadow-[0_24px_60px_rgba(15,23,42,0.06)] relative overflow-hidden lg:order-1">
            {/* Soft background radial light glow behind image and text */}
            <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-[#27a8c4]/10 blur-[40px] pointer-events-none" />
            
            <div className="relative z-10 flex items-center justify-between border-b border-slate-100/60 pb-3">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#27a8c4]">
                Sourcing Spotlight
              </span>
            </div>

            {/* Selected Product Spotlight details */}
            <div
              key={activeProductIndex}
              className="relative z-10 animate-[product-category-in_400ms_cubic-bezier(0.16,1,0.3,1)_both] mt-3 flex-1 flex flex-col justify-between"
            >
              <div className="flex-1 flex flex-col">
                {/* Live Image Preview Frame */}
                <div className="relative h-[170px] w-[170px] mx-auto rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-inner mb-3">
                  <Image
                    alt={activeProduct.name}
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03]"
                    fill
                    sizes="240px"
                    src={`/images/popular products/${activeProduct.image}`}
                  />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {activeProduct.category}
                </span>
                <h3 className="mt-1 text-base font-bold leading-snug text-slate-900 lg:text-lg line-clamp-2">
                  {activeProduct.name}
                </h3>
                
                {/* Specs Widgets Grid */}
                <div className="mt-3 grid grid-cols-2 gap-2 border-t border-b border-slate-100/85 py-2">
                  <div className="flex flex-col items-center justify-center rounded-xl bg-slate-50/80 border border-slate-100/80 p-2 text-center">
                    <Package className="h-4 w-4 text-[#27a8c4] mb-1" />
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">MOQ</span>
                    <span className="text-[11px] font-bold text-[#176579] mt-0.5 line-clamp-1">{activeProduct.moq}</span>
                  </div>

                  <div className="flex flex-col items-center justify-center rounded-xl bg-slate-50/80 border border-slate-100/80 p-2 text-center">
                    <Globe className="h-4 w-4 text-[#27a8c4] mb-1" />
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Origin</span>
                    <span className="text-[11px] font-bold text-slate-700 mt-0.5 line-clamp-1">{activeProduct.region.split(" ")[0]}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setInquiryProduct(activeProduct)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#27a8c4] to-[#176579] py-2.5 text-xs font-bold text-white transition-all duration-300 hover:opacity-95 hover:shadow-[0_4px_16px_rgba(39,168,196,0.3)] hover:-translate-y-0.5 cursor-pointer"
              >
                Request Product
                <svg className="h-3.5 w-3.5 transition-transform duration-300 hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Panel: Minimalist Product Carousel */}
          <div className="w-full lg:w-[65%] h-auto lg:h-full flex flex-col justify-between gap-4 lg:order-2">
            <div className="flex items-center justify-between pb-3">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#27a8c4]">
                Trending Sourcing Selections
              </span>
              <div className="flex gap-2">
                <button
                  onClick={scrollPrev}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white/60 text-slate-600 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-slate-900 cursor-pointer shadow-sm hover:shadow"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={scrollNext}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white/60 text-slate-600 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-slate-900 cursor-pointer shadow-sm hover:shadow"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Carousel Container */}
            <div
              ref={carouselRef}
              className="flex-1 overflow-x-auto overflow-y-hidden flex items-center gap-2.5 sm:gap-4 py-2 scroll-smooth select-none -mx-5 px-5 sm:-mx-8 sm:px-8 lg:-mx-14 lg:px-14"
              style={{ scrollbarWidth: "none" }}
            >
              {popularProducts.map((product, index) => {
                const isActive = index === activeProductIndex;
                return (
                  <PopularProductCard
                    key={`popular-${index}-${product.name}`}
                    product={product}
                    isActive={isActive}
                    onClick={() => {
                      setActiveProductIndex(index);
                      if (typeof window !== "undefined" && window.innerWidth < 1024) {
                        setInquiryProduct(product);
                      }
                    }}
                  />
                );
              })}
            </div>
            
            {/* Interaction Cue */}
            <div className="text-[10px] text-slate-400 text-center mt-3 uppercase tracking-wider font-semibold">
              ← Drag, scroll, or use arrows to navigate products • Click a card to inspect specs →
            </div>

            {/* Mobile Explore More Products Button */}
            <div className="mt-4 flex justify-center lg:hidden">
              <a
                href="/categories"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#27a8c4] to-[#176579] hover:from-[#3cd5f7] hover:to-[#27a8c4] px-6 py-3 text-xs font-bold text-white transition-all shadow-[0_4px_16px_rgba(39,168,196,0.15)] active:scale-[0.98] cursor-pointer"
              >
                Explore More Products
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
          
        </div>

      </div>

      {/* RFQ Inquiry Modal overlay */}
      {inquiryProduct && (
        <div className="fixed inset-0 z-50 flex items-end justify-center lg:items-center p-0 lg:p-4 bg-slate-900/40 backdrop-blur-sm animate-[timeline-fade-in_200ms_ease-out]">
          <div className="w-full lg:max-w-lg max-h-[92vh] lg:max-h-none overflow-hidden rounded-t-3xl lg:rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-2xl backdrop-blur-md animate-[product-category-in_300ms_cubic-bezier(0.16,1,0.3,1)_both] flex flex-col">
            {/* Drag Handle for Mobile */}
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4 lg:hidden shrink-0" />

            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4 shrink-0">
              <div>
                <span className="text-[10px] font-bold tracking-[0.16em] text-[#27a8c4] uppercase">
                  RFQ CONSOLE
                </span>
                <h3 className="text-base lg:text-lg font-bold text-slate-900 mt-1">
                  Inquire: {inquiryProduct.name}
                </h3>
              </div>
              <button
                onClick={() => setInquiryProduct(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all cursor-pointer"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable Container */}
            <div className="flex-1 overflow-y-auto mt-4 pr-0.5" style={{ scrollbarWidth: "none" }}>
              {/* Product overview card (mobile only) */}
              <div className="lg:hidden bg-gradient-to-br from-white to-slate-50/80 rounded-2xl p-4 border border-slate-150/50 flex gap-4 items-center mb-5 shadow-[0_8px_30px_rgba(15,23,42,0.03)]">
                <div className="relative h-20 w-20 rounded-xl overflow-hidden border border-slate-200/60 bg-white shrink-0 shadow-sm">
                  <Image
                    alt={inquiryProduct.name}
                    className="object-cover"
                    fill
                    sizes="80px"
                    src={`/images/popular products/${inquiryProduct.image}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
                    {inquiryProduct.category}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 truncate mt-0.5">
                    {inquiryProduct.name}
                  </h4>
                  
                  {/* Compact specs rows */}
                  <div className="mt-2.5 flex gap-2.5 text-[10px] text-slate-650 font-medium">
                    <span className="bg-[#27a8c4]/8 px-2.5 py-1 rounded-lg border border-[#27a8c4]/15 text-[10px] font-semibold text-[#176579] shadow-sm">
                      MOQ: <span className="font-extrabold">{inquiryProduct.moq}</span>
                    </span>
                    <span className="bg-slate-100/60 px-2.5 py-1 rounded-lg border border-slate-200/50 text-[10px] font-semibold text-slate-700 shadow-sm">
                      Origin: <span className="font-extrabold">{inquiryProduct.region.split(" ")[0]}</span>
                    </span>
                  </div>
                </div>
              </div>

              {submitted ? (
                /* Success Animation */
                <div className="py-12 text-center animate-[timeline-fade-in_250ms_ease-out]">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-500 border border-teal-100 shadow-[0_4px_16px_rgba(20,184,166,0.15)] mb-4">
                    <svg className="h-8 w-8 animate-[timeline-pulse_1.5s_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900">RFQ Request Submitted!</h4>
                  <p className="mt-2 text-xs text-slate-500 max-w-xs mx-auto">
                    Your sourcing inquiry has been successfully transmitted. Affhan Group managers will respond via email with details and freight pricing.
                  </p>
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                    <label className="block text-[10px] font-bold tracking-wider text-slate-500 uppercase flex items-start min-h-[28px] leading-tight">
                      Target Quantity (MOQ: {inquiryProduct.moq})
                    </label>
                    <label className="block text-[10px] font-bold tracking-wider text-slate-500 uppercase flex items-start min-h-[28px] leading-tight">
                      Sourcing Timeline
                    </label>

                    <input
                      type="number"
                      required
                      min={parseInt(inquiryProduct.moq)}
                      className="block w-full h-11 rounded-xl border border-slate-200/85 bg-white px-4 py-2.5 text-xs text-slate-900 focus:border-[#27a8c4] focus:ring-4 focus:ring-[#27a8c4]/8 focus:outline-none transition-all duration-200 shadow-sm"
                      value={inquiryForm.qty}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, qty: e.target.value })}
                    />
                    <select
                      className="block w-full h-11 rounded-xl border border-slate-200/85 bg-white px-4 py-2.5 text-xs text-slate-900 focus:border-[#27a8c4] focus:ring-4 focus:ring-[#27a8c4]/8 focus:outline-none transition-all duration-200 shadow-sm appearance-none bg-[url('data:image/svg+xml;utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23475569%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:14px_14px] bg-[right_16px_center] bg-no-repeat pr-10"
                      value={inquiryForm.timeline}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, timeline: e.target.value })}
                    >
                      <option>Urgent (1-2 Weeks)</option>
                      <option>1 Month</option>
                      <option>2-3 Months</option>
                      <option>Planning / Ongoing Sourcing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-1.5">
                      Your Contact Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="buyer@company.com"
                      className="block w-full rounded-xl border border-slate-200/85 bg-white px-4 py-3 text-xs text-slate-900 focus:border-[#27a8c4] focus:ring-4 focus:ring-[#27a8c4]/8 focus:outline-none transition-all duration-200 shadow-sm"
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-1.5">
                      Custom Specifications / Branding Requests
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Enter packaging design requests, logo embossing, shipping terms (FOB/DDP), or target price limits..."
                      className="block w-full rounded-xl border border-slate-200/85 bg-white px-4 py-3 text-xs text-slate-900 focus:border-[#27a8c4] focus:ring-4 focus:ring-[#27a8c4]/8 focus:outline-none resize-none transition-all duration-200 shadow-sm"
                      value={inquiryForm.details}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, details: e.target.value })}
                    />
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex gap-3 pb-4">
                    <button
                      type="button"
                      onClick={() => setInquiryProduct(null)}
                      className="flex-1 rounded-xl border border-slate-250 bg-slate-50/40 py-3 text-xs font-bold text-slate-600 hover:bg-slate-100/80 hover:text-slate-800 transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 rounded-xl bg-gradient-to-r from-[#27a8c4] to-[#176579] py-3 text-xs font-bold text-white transition-all shadow-[0_4px_16px_rgba(39,168,196,0.25)] hover:opacity-95 hover:shadow-[0_6px_20px_rgba(39,168,196,0.35)] cursor-pointer"
                    >
                      Send Request
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
