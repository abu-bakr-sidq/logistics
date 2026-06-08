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
      className="relative flex h-screen w-full snap-start flex-col overflow-hidden bg-[#f6f6f3] px-5 pb-8 pt-24 sm:px-8 lg:px-14"
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

      <div className="relative z-10 mx-auto my-auto grid w-full max-w-[1480px] grid-rows-[auto_1fr] gap-6">
        
        {/* Header and Stats */}
        <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          
          {/* Header */}
          <div className="stats-panel-in flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#27a8c4]">
              GLOBAL NETWORK OPERATIONS
            </span>
            <h2 className="max-w-[600px] text-[24px] font-bold leading-tight tracking-tight text-[#292929] sm:text-[30px] lg:text-[34px]">
              Global Manufacturing Sourcing Company
            </h2>
            <p className="mt-1.5 max-w-[540px] text-[13px] leading-relaxed text-slate-600 sm:text-sm">
              Connecting buyers with reliable products, verified sourcing
              channels, and scalable logistics coverage across global markets.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((stat, index) => (
              <div
                className="stats-panel-in group flex flex-col rounded-2xl border border-slate-200/60 bg-white/40 p-4 pl-6 shadow-[0_8px_24px_rgba(15,23,42,0.02)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#27a8c4]/45 hover:bg-white/80 hover:shadow-[0_16px_36px_rgba(39,168,196,0.1)]"
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
                <span className="mt-1 block text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-[#176579] transition-colors duration-300">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Video Card (Dashboard Frame) */}
        <div className="stats-panel-in min-h-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-[0_20px_56px_rgba(15,23,42,0.14)] relative group">
          
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

          {/* Video element */}
          <div className="relative w-full bg-slate-900 h-[220px] sm:h-[290px] lg:h-[350px] xl:h-[400px] overflow-hidden">
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
            <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent pointer-events-none" />
            
            {/* Bottom Title Info */}
            <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-1.5 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-5 pb-5 pt-20 text-white sm:px-8 sm:pb-7">
              <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-[#27a8c4]">
                Logistics & Supply Chains
              </span>
              <strong className="max-w-[660px] text-lg font-bold leading-tight tracking-tight sm:text-xl md:text-2xl text-white/95">
                Reliable sourcing capacity supported by connected logistics operations.
              </strong>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
