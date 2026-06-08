"use client";

import Image from "next/image";
import { useRef, useEffect, MouseEvent } from "react";
import { productCategories } from "@/data/home-page";

function CategoryCard({
  category,
  index,
}: {
  category: { name: string; image: string };
  index: number;
}) {
  return (
    <article
      className="group relative box-border h-[156px] max-h-[21vh] w-[176px] shrink-0 overflow-hidden rounded-2xl border border-slate-200/50 bg-white/50 shadow-[0_8px_24px_rgba(15,23,42,0.02)] backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-[#27a8c4]/45 hover:bg-white/80 hover:shadow-[0_16px_36px_rgba(39,168,196,0.08)] focus-within:-translate-y-1.5 focus-within:border-[#27a8c4]/45 sm:h-[170px] sm:w-[200px] lg:h-[184px] lg:w-[224px]"
      style={{ animationDelay: `${index * 24}ms` }}
    >
      <div className="relative h-[70%] overflow-hidden bg-slate-50">
        <Image
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] group-focus-within:scale-[1.06]"
          src={`/images/browse-by-category/${category.image}`}
          alt={category.name}
          fill
          sizes="260px"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />
      </div>
      <div className="relative flex h-[30%] items-center border-t border-slate-100/50 bg-transparent px-4">
        <h3 className="line-clamp-2 text-xs font-semibold leading-5 text-slate-800 transition-colors duration-300 group-hover:text-[#176579] group-focus-within:text-[#176579] sm:text-[13px] select-none">
          {category.name}
        </h3>
        
        {/* Sleek growing cyan accent line on hover */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#27a8c4] transition-all duration-300 ease-out group-hover:w-full group-focus-within:w-full shadow-[0_0_8px_rgba(39,168,196,0.6)]" />
      </div>
    </article>
  );
}

// High-performance custom hook that handles both automated marquee scroll and manual overrides
const useMarqueeScroll = (direction: "left" | "right") => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const isHovered = useRef(false);
  const isTempPaused = useRef(false);
  const tempPauseTimeout = useRef<NodeJS.Timeout | null>(null);
  const targetScrollLeft = useRef<number | null>(null);

  const triggerTempPause = () => {
    isTempPaused.current = true;
    if (tempPauseTimeout.current) clearTimeout(tempPauseTimeout.current);
    tempPauseTimeout.current = setTimeout(() => {
      isTempPaused.current = false;
    }, 2500); // Autoplay resumes 2.5s after user interaction stops
  };

  const scrollByAmount = (amount: number) => {
    triggerTempPause();
    if (ref.current) {
      const currentTarget = targetScrollLeft.current !== null ? targetScrollLeft.current : ref.current.scrollLeft;
      targetScrollLeft.current = currentTarget + amount;
    }
  };

  // Autoplay & smooth-scroll loop using requestAnimationFrame for fluid motion
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let animationId: number;
    let lastTime = performance.now();
    let initialized = false;
    let scrollPos = 0;

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      const halfWidth = el.scrollWidth / 2;

      if (halfWidth > 0) {
        // Initialize scrollPos once the element is loaded
        if (!initialized) {
          scrollPos = direction === "right" ? halfWidth : el.scrollLeft;
          el.scrollLeft = Math.round(scrollPos);
          initialized = true;
        }

        if (targetScrollLeft.current !== null) {
          // Easing / interpolation towards targetScrollLeft (frame-rate independent)
          const easeFactor = 1 - Math.exp(-0.01 * delta); // Easing factor
          scrollPos += (targetScrollLeft.current - scrollPos) * easeFactor;

          // Check if we reached the target
          if (Math.abs(targetScrollLeft.current - scrollPos) < 0.5) {
            scrollPos = targetScrollLeft.current;
            targetScrollLeft.current = null;
          }

          // Wrap check during smooth animation
          if (scrollPos >= halfWidth) {
            scrollPos -= halfWidth;
            if (targetScrollLeft.current !== null) targetScrollLeft.current -= halfWidth;
          } else if (scrollPos <= 0) {
            scrollPos += halfWidth;
            if (targetScrollLeft.current !== null) targetScrollLeft.current += halfWidth;
          }

          el.scrollLeft = Math.round(scrollPos);
        } else if (!isDragging.current && !isHovered.current && !isTempPaused.current) {
          const speed = direction === "left" ? 0.05 : -0.05; // pixels per ms
          scrollPos += speed * delta;

          // Handle wrapping of the autoplay
          if (direction === "left") {
            if (scrollPos >= halfWidth) {
              scrollPos -= halfWidth;
            }
          } else {
            if (scrollPos <= 0) {
              scrollPos += halfWidth;
            }
          }

          el.scrollLeft = Math.round(scrollPos);
        } else {
          // Keep our floating scrollPos in sync during user interactions (drag, swipe)
          scrollPos = el.scrollLeft;
        }

        // Universal wrapping safety check (for dragging or swipe scroll)
        if (targetScrollLeft.current === null) {
          if (el.scrollLeft >= halfWidth) {
            el.scrollLeft -= halfWidth;
            scrollPos = el.scrollLeft;
          } else if (el.scrollLeft <= 0.1) {
            el.scrollLeft += halfWidth;
            scrollPos = el.scrollLeft;
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationId);
      if (tempPauseTimeout.current) clearTimeout(tempPauseTimeout.current);
    };
  }, [direction]);

  // Drag scroll handlers
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    isDragging.current = true;
    targetScrollLeft.current = null; // Cancel any active smooth scroll on drag
    triggerTempPause();

    el.style.scrollBehavior = "auto"; // Instant pointer feedback
    const startX = e.pageX - el.offsetLeft;
    const scrollLeft = el.scrollLeft;

    const handleMouseMove = (moveEvent: globalThis.MouseEvent) => {
      const x = moveEvent.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;

      // Wrap immediately during drag
      const halfWidth = el.scrollWidth / 2;
      if (halfWidth > 0) {
        if (el.scrollLeft >= halfWidth) {
          el.scrollLeft -= halfWidth;
        } else if (el.scrollLeft <= 0.1) {
          el.scrollLeft += halfWidth;
        }
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = () => {
    isDragging.current = true;
    targetScrollLeft.current = null; // Cancel any active smooth scroll on touch swipe
    triggerTempPause();
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  const handleMouseEnter = () => {
    isHovered.current = true;
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
  };

  return {
    ref,
    onMouseDown: handleMouseDown,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    triggerTempPause,
    scrollByAmount,
  };
};

export function ProductCategoriesSection() {
  const firstRowCategories = productCategories.slice(0, 24);
  const secondRowCategories = productCategories.slice(24);
  const loopSets = [0, 1]; // Render list twice side-by-side to achieve seamless JS loop wrapping

  const {
    ref: refOne,
    onMouseDown: onMouseDownOne,
    onTouchStart: onTouchStartOne,
    onTouchEnd: onTouchEndOne,
    onMouseEnter: onMouseEnterOne,
    onMouseLeave: onMouseLeaveOne,
    scrollByAmount: scrollByAmountOne,
  } = useMarqueeScroll("left");

  const {
    ref: refTwo,
    onMouseDown: onMouseDownTwo,
    onTouchStart: onTouchStartTwo,
    onTouchEnd: onTouchEndTwo,
    onMouseEnter: onMouseEnterTwo,
    onMouseLeave: onMouseLeaveTwo,
    scrollByAmount: scrollByAmountTwo,
  } = useMarqueeScroll("right");

  const scrollNext = () => {
    scrollByAmountOne(380);
    scrollByAmountTwo(380);
  };

  const scrollPrev = () => {
    scrollByAmountOne(-380);
    scrollByAmountTwo(-380);
  };

  return (
    <section
      id="product-categories"
      className="relative box-border flex h-screen w-screen snap-start flex-col overflow-hidden bg-[#f9fafb] px-5 pb-8 pt-24 sm:px-8 lg:px-14"
    >
      {/* Subtle background light cyan radial light aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(39,168,196,0.05)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

      <div className="relative z-10 mx-auto my-auto flex w-full max-w-[1640px] flex-col justify-center overflow-hidden">
        <div className="flex -translate-y-2 flex-col justify-between gap-2 pb-3 lg:flex-row lg:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#27a8c4] drop-shadow-[0_2px_4px_rgba(39,168,196,0.06)]">
              Product Categories
            </span>
            <h2 className="mt-2 max-w-[620px] text-[22px] font-semibold leading-tight tracking-[-0.02em] text-slate-950 sm:text-[28px] lg:text-[32px]">
              Browse products across verified sourcing categories
            </h2>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <p className="max-w-[470px] text-[13px] leading-6 text-slate-600 lg:text-right">
              Explore organized product segments with clear visuals, corrected
              category names, and a clean structure built for fast scanning.
            </p>
            {/* Prev / Next Scroll Buttons */}
            <div className="flex gap-2">
              <button
                onClick={scrollPrev}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white/60 text-slate-600 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-slate-900 cursor-pointer shadow-sm hover:shadow"
                aria-label="Scroll left"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={scrollNext}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white/60 text-slate-600 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-slate-900 cursor-pointer shadow-sm hover:shadow"
                aria-label="Scroll right"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Row 1: Moves Left */}
          <div className="category-marquee-mask overflow-hidden py-1.5">
            <div
              ref={refOne}
              onMouseDown={onMouseDownOne}
              onTouchStart={onTouchStartOne}
              onTouchEnd={onTouchEndOne}
              onMouseEnter={onMouseEnterOne}
              onMouseLeave={onMouseLeaveOne}
              className="category-marquee-row flex overflow-x-auto select-none py-1 gap-3 pr-3 lg:gap-4 lg:pr-4 cursor-grab active:cursor-grabbing"
            >
              {loopSets.map((setIndex) => (
                <div
                   className="flex shrink-0 gap-3 pr-3 lg:gap-4 lg:pr-4"
                  key={`row-one-set-${setIndex}`}
                >
                  {firstRowCategories.map((category, index) => (
                    <CategoryCard
                      category={category}
                      index={index}
                      key={`row-one-${setIndex}-${category.name}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Moves Right */}
          <div className="category-marquee-mask overflow-hidden py-1.5">
            <div
              ref={refTwo}
              onMouseDown={onMouseDownTwo}
              onTouchStart={onTouchStartTwo}
              onTouchEnd={onTouchEndTwo}
              onMouseEnter={onMouseEnterTwo}
              onMouseLeave={onMouseLeaveTwo}
              className="category-marquee-row flex overflow-x-auto select-none py-1 gap-3 pr-3 lg:gap-4 lg:pr-4 cursor-grab active:cursor-grabbing"
            >
              {loopSets.map((setIndex) => (
                <div
                  className="flex shrink-0 gap-3 pr-3 lg:gap-4 lg:pr-4"
                  key={`row-two-set-${setIndex}`}
                >
                  {secondRowCategories.map((category, index) => (
                    <CategoryCard
                      category={category}
                      index={index}
                      key={`row-two-${setIndex}-${category.name}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interaction Cue */}
        <div className="text-[10px] text-slate-400 text-center mt-4 uppercase tracking-wider font-semibold">
          ← Drag rows, swipe, use arrows, or let it scroll automatically →
        </div>
      </div>
    </section>
  );
}
