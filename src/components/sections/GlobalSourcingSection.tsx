"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/data/home-page";
import { AnimatedStatNumber } from "@/components/shared/AnimatedStatNumber";

export function GlobalSourcingSection() {
  const [statsRunId, setStatsRunId] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const wasSectionVisible = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !wasSectionVisible.current) {
          setStatsRunId((currentRunId) => currentRunId + 1);
        }

        wasSectionVisible.current = entry.isIntersecting;
      },
      { threshold: 0.35 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative flex h-screen w-full lg:snap-start flex-col justify-center overflow-hidden bg-[#f6f6f3] px-5 pt-[72px] pb-6 sm:px-8 lg:px-14 lg:pt-[96px] lg:pb-8"
      ref={sectionRef}
    >
      {/* Background Dot Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #27a8c4 1px, transparent 1px)`,
          backgroundSize: "24px 24px"
        }}
      />

      {/* Subtle Background Radial Aura */}
      <div className="absolute left-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(39,168,196,0.06)_0%,rgba(39,168,196,0)_70%)] pointer-events-none" />

      <div className="relative z-10 mx-auto my-auto flex flex-col w-full max-w-[1480px] min-w-0 gap-4 lg:grid lg:grid-rows-[auto_1fr] lg:gap-6">

        {/* Header and Stats */}
        <div className="flex flex-col w-full min-w-0 gap-6 lg:grid lg:grid-cols-[1.15fr_1fr] lg:items-center">

          {/* Header */}
          <div className="stats-panel-in flex w-full min-w-0 flex-col gap-1 sm:gap-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#27a8c4]">
              GLOBAL NETWORK OPERATIONS
            </span>
            <h2 className="max-w-[600px] text-[20px] font-bold leading-tight tracking-tight text-[#292929] sm:text-[30px] lg:text-[34px]">
              Global Manufacturing Sourcing Company
            </h2>
            <p className="mt-1 max-w-[540px] text-[12px] leading-relaxed text-slate-600 sm:text-sm">
              Connecting buyers with reliable products, verified sourcing
              channels, and scalable logistics coverage across global markets.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid w-full min-w-0 grid-cols-2 gap-2.5 sm:grid-cols-2 lg:gap-4">
            {stats.map((stat, index) => (
              <div
                className="stats-panel-in group flex w-full min-w-0 flex-col rounded-2xl border border-slate-200/60 bg-white/40 p-2 pl-3 sm:p-4 sm:pl-6 shadow-[0_8px_24px_rgba(15,23,42,0.02)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#27a8c4]/45 hover:bg-white/80 hover:shadow-[0_16px_36px_rgba(39,168,196,0.1)]"
                key={stat.label}
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="relative">
                  {/* Microglow element */}
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#27a8c4] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <AnimatedStatNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    runId={statsRunId}
                  />
                </div>
                <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-[#176579] transition-colors duration-300 sm:text-xs">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Video Card (Dashboard Frame) */}
        <div className="stats-panel-in w-full min-w-0 min-h-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-[0_20px_56px_rgba(15,23,42,0.14)] relative group flex flex-col">

          {/* Video element container */}
          <div className="relative w-full bg-slate-900 h-[150px] xs:h-[180px] sm:h-[290px] lg:h-[310px] xl:h-[370px] 2xl:h-[430px] overflow-hidden">
            <video
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.01]"
              src="/videos/global.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Global manufacturing sourcing video"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

            {/* Top Dashboard Header Overlay */}
            <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center pointer-events-none">
              {/* Live Indicator */}
              <div className="flex items-center gap-2 rounded-full bg-slate-900/85 border border-white/10 px-3 py-1 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#e9f8fb]">
                  LIVE NETWORK FEED
                </span>
              </div>

              {/* High-Tech Grid Details */}
              <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-white/50 bg-slate-900/85 border border-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                <span className="h-1 w-1 rounded-full bg-[#27a8c4]" />
                <span>SYS.ACTIVE</span>
                <span className="text-white/20">|</span>
                <span>LOC: GLOBAL_ANCHORS</span>
              </div>
            </div>

            {/* Desktop-only: Caption overlaid on video with no background */}
            <div className="hidden lg:flex absolute bottom-0 left-0 right-0 z-20 flex-col gap-1 px-8 py-6 pointer-events-none">
              <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-[#27a8c4] drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
                Logistics & Supply Chains
              </span>
              <strong className="max-w-[760px] text-base md:text-lg font-bold leading-snug tracking-tight text-white/95 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                Reliable sourcing capacity supported by connected logistics operations.
              </strong>
            </div>
          </div>

          {/* Mobile/tablet only: Caption bar below video */}
          <div className="bg-[#0b1419] border-t border-slate-800/80 px-4 py-3 sm:px-8 sm:py-6 flex flex-col gap-1 text-white lg:hidden">
            <span className="text-[9px] sm:text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-[#27a8c4]">
              Logistics & Supply Chains
            </span>
            <strong className="max-w-[760px] text-[13px] sm:text-base md:text-lg font-bold leading-snug tracking-tight text-white/95">
              Reliable sourcing capacity supported by connected logistics operations.
            </strong>
          </div>
        </div>

      </div>
    </section>
  );
}
