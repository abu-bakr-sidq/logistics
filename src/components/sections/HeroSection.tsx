"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { allProducts, type Product } from "@/data/products";

export function HeroSection() {
  const [heroQuery, setHeroQuery] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const heroSearchRef = useRef<HTMLDivElement | null>(null);

  // Trigger loading spinner on search input
  useEffect(() => {
    const query = heroQuery.trim();
    if (query.length >= 2) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 500); // 500ms searching duration
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
    }
  }, [heroQuery]);

  // Filter products for suggestions (query length >= 2)
  const suggestions = useMemo(() => {
    const query = heroQuery.trim().toLowerCase();
    if (query.length < 2) return [];
    return allProducts
      .filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      )
      .slice(0, 5);
  }, [heroQuery]);

  // Click outside listener to dismiss suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        heroSearchRef.current &&
        !heroSearchRef.current.contains(event.target as Node)
      ) {
        setIsInputFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsInputFocused(false);
    window.location.href = `/categories?q=${encodeURIComponent(heroQuery)}`;
  };

  const handleSuggestionClick = (product: Product) => {
    setIsInputFocused(false);
    setHeroQuery("");
    window.location.href = `/categories?category=${encodeURIComponent(product.category)}`;
  };

  return (
    <section className="relative flex h-screen w-full snap-start items-center justify-center overflow-hidden px-6 text-white sm:px-10 md:px-16 lg:px-24">
      <style>
        {`
          @keyframes scrollMouse {
            0% { transform: translateY(0); opacity: 1; }
            50% { transform: translateY(8px); opacity: 0.3; }
            100% { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>

      {/* Background Video and Custom Multi-gradient Overlay */}
      <div className="absolute inset-0">
        <video
          id="home"
          className="absolute inset-0 h-full w-full object-cover object-center"
          src="/videos/logistics-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="AFFHAN global logistics background video"
        />
        {/* Color-graded gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b161b]/70 via-[#10242d]/35 to-[#081115]/85" />
        {/* Ambient center radial glow core */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(39,168,196,0.14)_0%,rgba(0,0,0,0)_65%)] pointer-events-none" />
      </div>

      <div className="relative z-20 mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-4 pt-8 text-center sm:gap-5 md:pt-2 -translate-y-14 sm:translate-y-0">
        {/* Glowing wide category badge */}
        <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#3cd5f7] sm:text-[11px] drop-shadow-[0_2px_4px_rgba(60,213,247,0.15)]">
          AFFHAN GLOBAL SOURCING
        </p>

        {/* Gradient headline styling */}
        <h1 className="max-w-[760px] text-balance text-[28px] font-extrabold leading-[1.08] tracking-tight text-white sm:text-[36px] md:text-[42px] lg:text-[48px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]">
          Seamless <span className="bg-gradient-to-r from-white via-[#e2f8fc] to-[#3cd5f7] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(60,213,247,0.1)]">Supply Chain Solutions</span>
        </h1>

        {/* High-end glassmorphic search input with suggestions */}
        <div ref={heroSearchRef} className="relative w-full max-w-[520px] sm:max-w-[580px] h-14 sm:h-[60px]">
          <form
            onSubmit={handleHeroSearchSubmit}
            className="flex h-14 w-full items-center justify-between rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-md px-3.5 text-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white/[0.12] hover:border-white/25 focus-within:scale-[1.01] focus-within:border-[#27a8c4]/65 focus-within:bg-slate-900/60 focus-within:shadow-[0_0_24px_rgba(39,168,196,0.25)] sm:h-[60px] sm:px-4"
          >
            <input
              name="q"
              value={heroQuery}
              onChange={(e) => setHeroQuery(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              className="min-w-0 flex-1 bg-transparent px-2.5 text-[13px] font-medium text-white outline-none placeholder:text-slate-300/75 sm:text-sm"
              type="search"
              placeholder="Search for products, categories, or components..."
              aria-label="Search for products, categories, or components"
              autoComplete="off"
            />
            <button
              className="ml-2 inline-flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-[#27a8c4] text-[#0a2732] shadow-[0_4px_12px_rgba(39,168,196,0.3)] transition-all duration-300 hover:bg-[#3cd5f7] hover:scale-105 hover:shadow-[0_6px_16px_rgba(60,213,247,0.45)]"
              type="submit"
              aria-label="Search"
            >
              <svg
                aria-hidden="true"
                className="h-[18px] w-[18px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-4.35-4.35m1.35-5.15a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
                />
              </svg>
            </button>
          </form>

          {isInputFocused && heroQuery.trim().length >= 2 && (
            <div
              onWheel={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="absolute top-full left-0 right-0 z-[100] mt-3 max-h-60 overflow-y-auto rounded-2xl border border-slate-200/80 bg-white p-1.5 shadow-[0_20px_50px_rgba(15,23,42,0.15)] text-slate-800"
            >
              {isSearching ? (
                <div className="flex items-center justify-center py-8 gap-2.5 text-slate-500 font-medium text-xs">
                  <svg className="animate-spin h-4 w-4 text-[#27a8c4]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </div>
              ) : suggestions.length > 0 ? (
                suggestions.map((product, idx) => (
                  <button
                    key={`hero-suggest-${idx}`}
                    type="button"
                    onClick={() => handleSuggestionClick(product)}
                    className="flex w-full items-center gap-3 rounded-xl p-2.5 hover:bg-slate-50 transition-colors text-left cursor-pointer"
                  >
                    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg border border-slate-150 bg-white">
                      <Image
                        src={`/images/${product.image}`}
                        alt={product.name}
                        fill
                        sizes="32px"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-bold text-slate-800">
                        {product.name}
                      </span>
                      <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                        {product.category}
                      </span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-slate-400 font-medium">
                  No matching products found
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar: Stats indicators & Scroll cues */}
      <div className="absolute bottom-0 left-0 z-10 flex w-full items-end justify-between border-t border-white/10 px-6 py-5 max-md:justify-end sm:px-10 md:px-16 md:py-6 lg:px-24 bg-gradient-to-t from-slate-950/40 to-transparent">
        {/* Glassmorphic Stats Indicators */}
        <div className="flex gap-10 max-md:hidden">
          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-2 backdrop-blur-sm transition-transform duration-300 hover:scale-105">
            <span className="h-2 w-2 rounded-full bg-[#27a8c4] animate-pulse" />
            <div>
              <strong className="block text-base font-extrabold leading-none text-white sm:text-lg">
                12+
              </strong>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-300 mt-1 block">
                Global Categories
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-2 backdrop-blur-sm transition-transform duration-300 hover:scale-105">
            <span className="h-2 w-2 rounded-full bg-[#27a8c4] animate-pulse" />
            <div>
              <strong className="block text-base font-extrabold leading-none text-white sm:text-lg">
                100%
              </strong>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-300 mt-1 block">
                Verified Sourcing
              </span>
            </div>
          </div>
        </div>

        {/* Scroll Mouse Cue Link */}
        <a
          className="group flex items-center gap-3.5 text-[11px] font-bold uppercase tracking-[0.24em] text-slate-300/90 transition-colors duration-300 hover:text-white"
          href="#categories"
        >
          SCROLL TO EXPLORE
          <div className="relative flex h-8 w-5 items-start justify-center rounded-full border-2 border-slate-300/80 p-1 group-hover:border-white transition-colors duration-300">
            <div className="h-1.5 w-1 rounded-full bg-[#3cd5f7] animate-[scrollMouse_1.6s_ease-in-out_infinite]" />
          </div>
        </a>
      </div>
    </section>
  );
}
