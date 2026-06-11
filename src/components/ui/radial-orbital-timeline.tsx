"use client";

import { useEffect, useRef, useState } from "react";
import type { ElementType, MouseEvent } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

const stepChecklists: Record<number, { title: string; items: string[] }> = {
  1: {
    title: "Stage Deliverables",
    items: [
      "Submit product specifications & ideas",
      "Assign dedicated sourcing agent",
      "Identify potential target factory matches",
      "Confirm target order quantities & guidelines"
    ]
  },
  2: {
    title: "Commercial Costing",
    items: [
      "Request detailed quotes from verified factories",
      "Estimate shipping freight & port handling tariffs",
      "Review sample unit costs & bulk tier pricing",
      "Deliver structured quotation sheet to client"
    ]
  },
  3: {
    title: "Design Signoff",
    items: [
      "Generate custom 2D/3D product blueprints",
      "Align packaging size and branded logo formats",
      "Verify material compliance certifications",
      "Obtain final design approval signature"
    ]
  },
  4: {
    title: "Payment Milestones",
    items: [
      "Process 30% start production deposit",
      "Prepare factory manufacturing contract",
      "Review payment terms & milestones",
      "Approve starting schedule with factory raw materials"
    ]
  },
  5: {
    title: "Factory Production",
    items: [
      "Procure raw materials & check quality",
      "Begin molding & assembly line processes",
      "Conduct weekly progress checks on output speed",
      "Confirm initial production run schedule"
    ]
  },
  6: {
    title: "Quality Inspection",
    items: [
      "Inspect mid-production batch run quality",
      "Supervise final packaging & seal durability",
      "Issue detailed testing report with video proof",
      "Approve consignment ready for shipping release"
    ]
  },
  7: {
    title: "Balance Settlement",
    items: [
      "Verify final inspection report pass",
      "Settle 70% remaining balance payment",
      "Release factory cargo transfer permissions",
      "Issue official commercial invoice & certificate of origin"
    ]
  },
  8: {
    title: "Logistics Booking",
    items: [
      "Select sea/air cargo freight provider",
      "Consolidate orders at Guangzhou warehousing hub",
      "Prepare customs export declaration papers",
      "Load container & seal tracking tags"
    ]
  },
  9: {
    title: "Doorstep Delivery",
    items: [
      "Supervise arrival at destination port",
      "Clear local import customs duties & paperwork",
      "Dispatch final logistics truck routes to door",
      "Conduct post-delivery check with client"
    ]
  }
};

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [, setHoveredNodeId] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(1024);
  const [mounted, setMounted] = useState<boolean>(false);
  const [animatedPercent, setAnimatedPercent] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const timer = setTimeout(() => {
        setMounted(true);
        setWindowWidth(window.innerWidth);
      }, 0);
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener("resize", handleResize);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const handleContainerClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === containerRef.current || event.target === orbitRef.current) {
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    if (nodeIndex === -1) return;
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const toggleItem = (id: number) => {
    if (activeNodeId === id) {
      // Toggle off
      setActiveNodeId(null);
      setAutoRotate(true);
      setPulseEffect({});
    } else {
      // Toggle on
      setActiveNodeId(id);
      setAutoRotate(false);

      const relatedItems = getRelatedItems(id);
      const newPulseEffect: Record<number, boolean> = {};
      relatedItems.forEach((relId) => {
        newPulseEffect[relId] = true;
      });
      setPulseEffect(newPulseEffect);

      centerViewOnNode(id);
    }
  };

  useEffect(() => {
    let rotationTimer: ReturnType<typeof setInterval>;

    if (autoRotate && !isHovered) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, isHovered]);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 210; 
    const radian = (angle * Math.PI) / 180;

    const x = Number((radius * Math.cos(radian) + centerOffset.x).toFixed(3));
    const y = Number((radius * Math.sin(radian) + centerOffset.y).toFixed(3));

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = 1;

    return { x, y, angle, zIndex, opacity };
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "border-[#1f5369] bg-[#1f5369] text-white";
      case "in-progress":
        return "border-[#27a8c4] bg-[#e9f8fb] text-[#176579]";
      case "pending":
      default:
        return "border-slate-300 bg-slate-100 text-slate-600";
    }
  };

  const getNodeStyles = (item: TimelineItem, isExpanded: boolean, isRelated: boolean): string => {
    if (isExpanded) {
      return "bg-[#1f5369] border-[#1f5369] text-white shadow-lg shadow-[#1f5369]/25 scale-125 ring-4 ring-[#27a8c4]/45";
    }

    const baseStyles = "bg-white text-[#16475c] transition-all duration-300 opacity-100";

    switch (item.status) {
      case "completed":
        return `${baseStyles} border-[#27a8c4] shadow-[0_0_15px_rgba(39,168,196,0.3)] hover:scale-110 ${
          isRelated ? "ring-4 ring-white/50" : ""
        }`;
      case "in-progress":
        return `${baseStyles} border-[#27a8c4] shadow-[0_0_20px_rgba(39,168,196,0.5)] animate-pulse hover:scale-110 ${
          isRelated ? "ring-4 ring-[#27a8c4]/30" : ""
        }`;
      case "pending":
      default:
        return `${baseStyles} border-slate-300 shadow-[0_0_12px_rgba(255,255,255,0.15)] hover:scale-105 ${
          isRelated ? "ring-4 ring-white/20" : ""
        }`;
    }
  };

  const activeItem = activeNodeId !== null ? timelineData.find((item) => item.id === activeNodeId) : null;

  // Dynamic Sourcing Stats Calculations
  const totalSteps = timelineData.length;
  const completedSteps = timelineData.filter((item) => item.status === "completed").length;
  const progressPercentage = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  // Click-only selection tracker for progress summary
  const displayNodeId = activeNodeId;
  const displayItem = displayNodeId !== null ? timelineData.find((item) => item.id === displayNodeId) : null;
  const displayPercentage = displayItem 
    ? Math.round((displayItem.id / totalSteps) * 100)
    : progressPercentage;

  // Determine active workflow phase
  const getActivePhase = (id: number | null): 1 | 2 | 3 | null => {
    if (!id) return null;
    if (id <= 2) return 1;
    if (id <= 6) return 2;
    return 3;
  };
  const activePhase = displayItem ? getActivePhase(displayItem.id) : null;

  useEffect(() => {
    if (!mounted) return;

    let startTimestamp: number | null = null;
    const startValue = animatedPercent;
    const endValue = displayPercentage;
    const duration = 800; // 800ms animation rollup

    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = progress * (2 - progress); // easeOutQuad
      
      const currentValue = Math.round(startValue + easedProgress * (endValue - startValue));
      setAnimatedPercent(currentValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayPercentage, mounted]);

  // Responsive scale factor calculation
  let scale = 1;
  if (windowWidth < 400) {
    scale = 0.58;
  } else if (windowWidth < 640) {
    scale = 0.68;
  } else if (windowWidth < 1024) {
    scale = 0.88;
  }

  return (
    <div
      className="flex h-auto lg:h-full w-full flex-col items-center justify-center lg:overflow-hidden bg-[#245b6d]"
      ref={containerRef}
      onClick={handleContainerClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>
        {`
          @keyframes orbitFlow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes timelineFadeIn {
            from { opacity: 0; transform: scale(0.96) translate3d(0, 4px, 0); }
            to { opacity: 1; transform: scale(1) translate3d(0, 0, 0); }
          }
        `}
      </style>

      {/* Desktop circular orbit timeline */}
      <div className="relative hidden lg:flex h-full w-full max-w-[1440px] px-8 items-center justify-center">
        {/* Left Side Panel (Workflow Summary) */}
        <div className="hidden xl:flex absolute left-8 top-1/2 -translate-y-1/2 w-[285px] flex-col gap-5 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md text-white select-none shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#3cd5f7]">Affhan Sourcing</span>
            <h4 className="text-base font-extrabold tracking-tight text-white">Workflow Summary</h4>
          </div>
          
          <div className="h-px bg-white/10 w-full" />
          
          {/* Progress Circle Visualizer */}
          <div className="flex items-center gap-4">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
              <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 56 56">
                {/* Background Track */}
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="3.5"
                />
                {/* Active Progress */}
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  fill="none"
                  stroke="#27a8c4"
                  strokeWidth="3.5"
                  strokeDasharray="150.8"
                  strokeDashoffset={150.8 - (150.8 * (mounted ? animatedPercent : displayPercentage)) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                  style={{
                    filter: "drop-shadow(0 0 4px rgba(39, 168, 196, 0.6))",
                  }}
                />
              </svg>
              <span className="relative z-10 text-[11px] font-bold font-mono text-[#e9f8fb] transition-all duration-300">
                {mounted ? animatedPercent : displayPercentage}%
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className={`text-[10px] uppercase tracking-wider font-extrabold transition-colors duration-350 ${displayItem ? "text-[#3cd5f7]" : "text-white/75"}`}>
                {displayItem ? "Selected Stage" : "Total Progress"}
              </span>
              <span className="text-xs font-bold text-white transition-all duration-300 truncate max-w-[170px]" title={displayItem ? `Step 0${displayItem.id} of 0${totalSteps} (${displayItem.title})` : undefined}>
                {displayItem 
                  ? `Step 0${displayItem.id} of 0${totalSteps} (${displayItem.title})` 
                  : `${completedSteps} of ${totalSteps} Steps Done`
                }
              </span>
            </div>
          </div>
          <div className="h-px bg-white/10 w-full" />

          {/* Active Workflow Phase Tracker */}
          <div className="flex flex-col gap-2 pt-1">
            <span className="text-[10px] text-white/75 uppercase tracking-wider font-extrabold">Sourcing Stage Tracks</span>
            <div className="flex flex-col gap-2">
              <div
                className={`flex items-center gap-2.5 rounded-lg p-2.5 border transition-all duration-300 ${
                  activePhase === 1
                    ? "bg-[#27a8c4]/20 border-[#27a8c4]/50 shadow-[0_0_12px_rgba(39,168,196,0.2)] text-white"
                    : "bg-white/[0.03] border-white/5 text-white/70 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${activePhase === 1 ? "bg-[#3cd5f7] animate-ping" : "bg-white/40"}`} />
                <div className="flex flex-col">
                  <span className={`text-[11px] font-bold leading-none ${activePhase === 1 ? "text-white" : "text-slate-100"}`}>1. Discovery & Pricing</span>
                  <span className={`text-[10px] mt-1 font-medium ${activePhase === 1 ? "text-[#3cd5f7]" : "text-slate-300"}`}>Steps 01 - 02 (Enquiry & Quotation)</span>
                </div>
              </div>

              <div
                className={`flex items-center gap-2.5 rounded-lg p-2.5 border transition-all duration-300 ${
                  activePhase === 2
                    ? "bg-[#27a8c4]/20 border-[#27a8c4]/50 shadow-[0_0_12px_rgba(39,168,196,0.2)] text-white"
                    : "bg-white/[0.03] border-white/5 text-white/70 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${activePhase === 2 ? "bg-[#3cd5f7] animate-ping" : "bg-white/40"}`} />
                <div className="flex flex-col">
                  <span className={`text-[11px] font-bold leading-none ${activePhase === 2 ? "text-white" : "text-slate-100"}`}>2. Design & Production</span>
                  <span className={`text-[10px] mt-1 font-medium ${activePhase === 2 ? "text-[#3cd5f7]" : "text-slate-300"}`}>Steps 03 - 06 (Design, QC, Production)</span>
                </div>
              </div>

              <div
                className={`flex items-center gap-2.5 rounded-lg p-2.5 border transition-all duration-300 ${
                  activePhase === 3
                    ? "bg-[#27a8c4]/20 border-[#27a8c4]/50 shadow-[0_0_12px_rgba(39,168,196,0.2)] text-white"
                    : "bg-white/[0.03] border-white/5 text-white/70 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${activePhase === 3 ? "bg-[#3cd5f7] animate-ping" : "bg-white/40"}`} />
                <div className="flex flex-col">
                  <span className={`text-[11px] font-bold leading-none ${activePhase === 3 ? "text-white" : "text-slate-100"}`}>3. Logistics & Handover</span>
                  <span className={`text-[10px] mt-1 font-medium ${activePhase === 3 ? "text-[#3cd5f7]" : "text-slate-300"}`}>Steps 07 - 09 (Balance, Booking, Delivery)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Circular Orbit Container */}
        <div
          className="absolute flex h-full w-full items-center justify-center pointer-events-none"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px) scale(${scale})`,
          }}
        >
          {/* Inner click targets need pointer-events-auto */}
          <div className="relative flex h-full w-full items-center justify-center pointer-events-auto">
            {/* Central Interactive Core */}
            <div
              onClick={(e) => e.stopPropagation()}
              className={`
                absolute z-10 flex flex-col items-center justify-center rounded-full bg-white 
                shadow-[0_22px_80px_rgba(8,47,73,0.34)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                ${
                  activeItem
                    ? "h-60 w-60 sm:h-68 sm:w-68 p-6 border-2 border-[#27a8c4]/45"
                    : "h-36 w-36 border border-white/70 hover:scale-105"
                }
              `}
            >
              {/* Dynamic Orbit Rings */}
              <div
                className={`
                  absolute rounded-full border border-white/35 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                  ${activeItem ? "h-[290px] w-[290px] opacity-40" : "h-48 w-48 affhan-logo-orbit"}
                `}
              />
              <div
                className={`
                  absolute rounded-full border border-[#27a8c4]/55 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                  ${activeItem ? "h-[280px] w-[280px] opacity-20" : "h-44 w-44 affhan-logo-pulse"}
                `}
              />
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(39,168,196,0.2)_0%,rgba(39,168,196,0)_68%)] pointer-events-none" />

              {/* Logo State */}
              <div
                className={`
                  relative flex items-center justify-center transition-all duration-500
                  ${activeItem ? "opacity-0 scale-75 pointer-events-none h-0 w-0 overflow-hidden" : "opacity-100 scale-100 h-full w-full"}
                `}
              >
                <Image
                  alt="AFFHAN logo"
                  className="relative z-10 h-28 w-28 object-contain"
                  height={112}
                  src="/images/logo.png"
                  width={112}
                  priority
                />
              </div>

              {/* Details State */}
              {activeItem && (
                <div
                  className="relative z-20 flex h-full w-full flex-col items-center justify-center text-center"
                  style={{
                    animation: "timelineFadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) both",
                    animationDelay: "140ms",
                  }}
                >
                  {/* Close Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveNodeId(null);
                      setPulseEffect({});
                      setAutoRotate(true);
                    }}
                    className="absolute top-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700"
                    aria-label="Close details"
                  >
                    <X size={14} />
                  </button>

                  <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#176579]">
                    {activeItem.date}
                  </span>

                  <h3 className="mt-1.5 px-2 text-sm sm:text-base font-extrabold leading-tight text-slate-900 line-clamp-2">
                    {activeItem.title}
                  </h3>

                  {/* Status Pill */}
                  <div
                    className={`mt-2 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider border inline-block ${getStatusStyles(
                      activeItem.status,
                    )}`}
                  >
                    {activeItem.status === "completed"
                      ? "COMPLETE"
                      : activeItem.status === "in-progress"
                        ? "IN PROGRESS"
                        : "PENDING"}
                  </div>

                  <p className="mt-3 px-3 text-[11px] sm:text-xs leading-relaxed text-slate-600 line-clamp-4 overflow-y-auto max-h-[88px] scrollbar-thin">
                    {activeItem.content}
                  </p>
                </div>
              )}
            </div>

            {/* SVG Orbit Lines */}
            <svg className="absolute h-[470px] w-[470px] pointer-events-none" viewBox="0 0 470 470">
              <defs>
                <linearGradient id="orbit-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#27a8c4" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#27a8c4" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              <g
                style={{
                  transformOrigin: "235px 235px",
                  transform: `rotate(${rotationAngle}deg)`,
                }}
                className="transition-transform duration-700 ease-out"
              >
                {/* Background Static Path */}
                <circle
                  cx="235"
                  cy="235"
                  r="210"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.18)"
                  strokeWidth="1.5"
                />

                {/* Flow Animation Path */}
                <circle
                  cx="235"
                  cy="235"
                  r="210"
                  fill="none"
                  stroke="url(#orbit-glow)"
                  strokeWidth="2.5"
                  strokeDasharray="24 160"
                  style={{
                    transformOrigin: "center",
                    animation: "orbitFlow 24s linear infinite",
                  }}
                />
              </g>
            </svg>

            {timelineData.map((item, index) => {
              const position = calculateNodePosition(index, timelineData.length);
              const isExpanded = activeNodeId === item.id;
              const isRelated = isRelatedToActive(item.id);
              const isPulsing = pulseEffect[item.id];
              const Icon = item.icon;

              const nodeStyle = {
                transform: `translate(${position.x}px, ${position.y}px)`,
                zIndex: isExpanded ? 200 : position.zIndex,
                opacity: isExpanded ? 1 : position.opacity,
              };

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    nodeRefs.current[item.id] = el;
                  }}
                  className="group absolute cursor-pointer transition-all duration-700"
                  style={nodeStyle}
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleItem(item.id);
                  }}
                  onMouseEnter={() => {
                    setHoveredNodeId(item.id);
                  }}
                  onMouseLeave={() => {
                    setHoveredNodeId(null);
                  }}
                >
                  {/* Glow ring */}
                  <div
                    className={`absolute rounded-full pointer-events-none transition-all duration-300
                      ${isExpanded ? "scale-110 opacity-100" : ""}
                      ${isPulsing ? "animate-pulse duration-1000" : ""}
                    `}
                    style={{
                      background:
                        "radial-gradient(circle, rgba(255,255,255,0.35) 0%, rgba(39,168,196,0.2) 40%, rgba(39,168,196,0) 70%)",
                      width: "72px",
                      height: "72px",
                      left: "-16px",
                      top: "-16px",
                    }}
                  />

                  {/* Node circle */}
                  <div
                    className={`
                      flex h-10 w-10 items-center justify-center rounded-full border-2
                      transition-all duration-300
                      ${getNodeStyles(item, isExpanded, isRelated)}
                    `}
                  >
                    <div className={isExpanded ? "animate-[pulse_1.8s_ease-in-out_infinite]" : ""}>
                      <Icon size={16} />
                    </div>
                  </div>

                  {/* Interactive Hover Tooltip (above the node) */}
                  <div
                    className={`
                      absolute bottom-12 left-1/2 -translate-x-1/2 w-max max-w-[160px] 
                      bg-slate-900/95 text-[#e9f8fb] text-[10px] font-bold px-2.5 py-1 rounded-md shadow-lg 
                      backdrop-blur-md pointer-events-none transition-all duration-355 transform border border-white/10 text-center
                      ${
                        isExpanded
                          ? "scale-100 opacity-100 translate-y-0"
                          : "scale-75 opacity-0 translate-y-1 group-hover:scale-100 group-hover:opacity-100 group-hover:translate-y-0"
                      }
                    `}
                  >
                    {item.title}
                    {/* Tooltip Arrow */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900/95 rotate-45 border-r border-b border-white/10" />
                  </div>

                  {/* Text Label (Always below the node, displaying Step Number badge only) */}
                  <div
                    className={`
                      absolute left-1/2 -translate-x-1/2 top-12 w-24 text-center transition-all duration-300
                      ${
                        isExpanded
                          ? "scale-110 font-bold"
                          : "group-hover:scale-105"
                      }
                    `}
                  >
                    <span
                      className={`
                        block text-[10px] font-mono tracking-wider font-bold uppercase rounded-full px-2.5 py-0.5 border transition-all duration-300
                        ${
                          isExpanded
                            ? "bg-[#27a8c4] text-[#0a2732] border-[#27a8c4] shadow-md shadow-[#27a8c4]/30"
                            : "bg-[#133744] text-[#e9f8fb] border-[#27a8c4]/35 group-hover:bg-[#184454] group-hover:text-white group-hover:border-[#27a8c4]/60"
                        }
                      `}
                    >
                      {item.date}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side Panel (Dynamic Checklist / Step details) */}
        <div className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 w-[285px] flex-col gap-5 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md text-white select-none shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
          {activeItem ? (
            <div 
              className="flex flex-col gap-5"
              style={{
                animation: "timelineFadeIn 0.45s ease-out both",
              }}
            >
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#3cd5f7]">{activeItem.date}</span>
                <h4 className="text-base font-extrabold tracking-tight truncate text-white">{activeItem.title}</h4>
              </div>
              
              <div className="h-px bg-white/10 w-full" />
              
              <div className="flex flex-col gap-3">
                <span className="text-[10px] text-[#3cd5f7] uppercase tracking-wider font-extrabold">
                  {stepChecklists[activeItem.id]?.title || "Key Deliverables"}
                </span>
                
                <ul className="space-y-3.5">
                  {(stepChecklists[activeItem.id]?.items || []).map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-white leading-normal">
                      <span className="mt-1 flex h-1.5 w-1.5 shrink-0 rounded-full bg-[#3cd5f7]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-5 text-center items-center py-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-[#3cd5f7] animate-bounce">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <div className="flex flex-col gap-1.5">
                <h4 className="text-sm font-extrabold uppercase tracking-[0.12em] text-white">Stage Guide</h4>
                <p className="text-[11px] leading-relaxed text-slate-200">
                  Click any stage node on the circular workflow to view the corresponding milestones and checklists in this guide.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Mobile / Tablet Vertical Stepper Timeline (lg:hidden) */}
      <div className="lg:hidden flex w-full flex-col gap-6 px-4 py-8 pointer-events-auto">
        <div className="relative w-full max-w-xl mx-auto flex flex-col gap-8 py-6">
          {/* Vertical pipeline guide */}
          <div className="absolute left-[23px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#27a8c4]/80 via-white/20 to-[#27a8c4]/80" />

          {timelineData.map((item) => {
            const Icon = item.icon;
            const checklist = stepChecklists[item.id];
            const isCompleted = item.status === "completed";
            const isInProgress = item.status === "in-progress";

            return (
              <div key={item.id} className="relative pl-14 flex flex-col">
                {/* Glowing node on line */}
                <div
                  className={`absolute left-2 top-0.5 flex h-9.5 w-9.5 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    isCompleted
                      ? "bg-[#1f5369] border-[#27a8c4] text-white shadow-[0_0_12px_rgba(39,168,196,0.45)]"
                      : isInProgress
                      ? "bg-white border-[#27a8c4] text-[#176579] animate-pulse shadow-[0_0_18px_rgba(39,168,196,0.65)] ring-4 ring-[#27a8c4]/20"
                      : "bg-[#133744] border-slate-350 text-slate-300/80"
                  }`}
                >
                  <Icon size={15} />
                </div>

                {/* Stepper Card */}
                <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md shadow-md hover:border-[#27a8c4]/30 hover:bg-white/[0.05] transition-all duration-300">
                  {/* Header info */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-wider rounded-full px-2.5 py-0.5 border ${
                      isCompleted
                        ? "bg-[#27a8c4]/20 border-[#27a8c4]/40 text-[#3cd5f7]"
                        : isInProgress
                        ? "bg-[#27a8c4]/30 border-[#27a8c4] text-white animate-pulse"
                        : "bg-white/5 border-white/10 text-white/50"
                    }`}>
                      {item.date}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#3cd5f7]/85">
                      {item.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-2 text-base font-extrabold text-white">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">
                    {item.content}
                  </p>

                  {/* Deliverables List */}
                  {checklist && (
                    <div className="mt-4 border-t border-white/5 pt-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#3cd5f7] block mb-2">
                        {checklist.title}
                      </span>
                      <ul className="space-y-2">
                        {checklist.items.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-[11px] text-slate-200/90 leading-normal">
                            <span className="mt-1 flex h-1 w-1 shrink-0 rounded-full bg-[#3cd5f7]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
