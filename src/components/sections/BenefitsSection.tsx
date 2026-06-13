import { benefits } from "@/data/home-page";
import { BenefitIcon } from "@/components/shared/BenefitIcon";

export function BenefitsSection() {
  return (
    <section
      id="benefits"
      className="relative flex min-h-screen lg:h-screen w-full lg:snap-start flex-col items-center justify-center overflow-x-hidden lg:overflow-hidden bg-[#245b6d] px-5 pt-24 pb-12 sm:px-8 lg:px-12 lg:pt-28 lg:pb-10"
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes benefitsWaterFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes benefitsWaveMove1 {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-25%, 8px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes benefitsWaveMove2 {
          0% { transform: translate3d(-25%, 0, 0); }
          50% { transform: translate3d(0, -6px, 0); }
          100% { transform: translate3d(-25%, 0, 0); }
        }

        .benefits-glass-card {
          background: linear-gradient(-45deg, rgba(255, 255, 255, 0.65) 0%, rgba(224, 242, 254, 0.45) 35%, rgba(204, 251, 241, 0.4) 70%, rgba(255, 255, 255, 0.7) 100%) !important;
          background-size: 240% 240% !important;
          animation: benefitsWaterFlow 12s ease infinite !important;
          backdrop-filter: blur(20px) !important;
          -webkit-backdrop-filter: blur(20px) !important;
          border-top: 2px solid rgba(255, 255, 255, 0.95) !important;
          border-left: 2px solid rgba(255, 255, 255, 0.95) !important;
          border-bottom: 2px solid rgba(148, 163, 184, 0.3) !important;
          border-right: 2px solid rgba(148, 163, 184, 0.3) !important;
          border-radius: 28px !important;
          box-shadow: 
            inset 0 3px 10px rgba(255, 255, 255, 0.95), 
            inset 0 -3px 10px rgba(0, 0, 0, 0.03),
            0 12px 32px rgba(15, 23, 42, 0.05) !important;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
          will-change: transform, box-shadow, background-position;
        }

        .benefits-glass-card:hover {
          background: linear-gradient(-45deg, rgba(255, 255, 255, 0.8) 0%, rgba(224, 242, 254, 0.55) 35%, rgba(204, 251, 241, 0.5) 70%, rgba(255, 255, 255, 0.85) 100%) !important;
          border-top-color: rgba(255, 255, 255, 0.99) !important;
          border-left-color: rgba(255, 255, 255, 0.99) !important;
          border-bottom-color: rgba(148, 163, 184, 0.45) !important;
          border-right-color: rgba(148, 163, 184, 0.45) !important;
          box-shadow: 
            inset 0 5px 15px rgba(255, 255, 255, 0.98), 
            inset 0 -5px 15px rgba(0, 0, 0, 0.04),
            0 24px 50px rgba(39, 168, 196, 0.18),
            0 4px 12px rgba(0, 0, 0, 0.02) !important;
          transform: translateY(-8px) scale(1.015) !important;
        }

        .benefits-glass-card:active {
          transform: translateY(-3px) scale(0.99) !important;
          box-shadow: 
            inset 0 2px 6px rgba(255, 255, 255, 0.95), 
            inset 0 -2px 6px rgba(0, 0, 0, 0.04), 
            0 12px 25px rgba(39, 168, 196, 0.08) !important;
        }

        .benefits-wave-container {
          height: 40px;
          transition: height 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
          opacity: 0.22;
        }
        .benefits-glass-card:hover .benefits-wave-container {
          height: 100px;
          opacity: 0.45;
        }

        .animate-benefits-wave1 {
          animation: benefitsWaveMove1 14s ease-in-out infinite;
        }
        .animate-benefits-wave2 {
          animation: benefitsWaveMove2 10s ease-in-out infinite;
        }
      `}} />

      {/* Background Ambient Glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(39,168,196,0.12)_0%,rgba(39,168,196,0)_70%)] pointer-events-none" />

      <div className="relative z-10 mx-auto my-auto flex w-full max-w-[1280px] flex-col gap-10 md:gap-12 lg:gap-16">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#27a8c4]">
            BENEFITS
          </span>
          <h2 className="mt-3 text-[30px] font-bold leading-tight tracking-tight text-white sm:text-[38px] lg:text-[42px]">
            Why Choose Affhan?
          </h2>
          <p className="mt-4 max-w-[680px] text-sm leading-relaxed text-white/70">
            Experience a secure, comprehensive, and tailored global supply chain partnership designed to guarantee quality transactions, streamline logistics, and power modern e-commerce beyond borders.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid w-full gap-5 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit, index) => (
            <article
              className="benefit-card-in group relative flex min-h-[225px] flex-col justify-between rounded-[28px] overflow-hidden benefits-glass-card p-6"
              key={benefit.title}
              style={{
                animationDelay: `${index * 140}ms`,
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* Decorative Liquid Water Glow Blobs */}
              <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-cyan-300/10 blur-xl pointer-events-none group-hover:bg-cyan-400/20 group-hover:scale-125 transition-all duration-700 z-0" />
              <div className="absolute -left-6 -top-6 w-24 h-24 rounded-full bg-teal-300/10 blur-xl pointer-events-none group-hover:bg-teal-400/20 group-hover:scale-125 transition-all duration-700 z-0" />

              {/* SVG Animated Waves (Water Splash effect) */}
              <div className="absolute bottom-0 left-0 right-0 w-full pointer-events-none overflow-hidden z-0 benefits-wave-container">
                <svg className="absolute w-[200%] h-full bottom-0 left-0 animate-benefits-wave1" viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path d="M0,60 Q150,85 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z" fill="url(#benefits-wave-grad-1)" />
                </svg>
                <svg className="absolute w-[200%] h-full bottom-0 left-0 animate-benefits-wave2" viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path d="M0,50 Q150,25 300,50 T600,50 T900,50 T1200,50 L1200,120 L0,120 Z" fill="url(#benefits-wave-grad-2)" />
                </svg>
              </div>

              <div className="relative z-10 flex flex-col justify-between h-full w-full">
                <div>
                  {/* Icon Container */}
                  <div className="relative z-10 mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#176579]/30 bg-[#176579]/10 text-[#176579] transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-[#176579] group-hover:text-white group-hover:border-transparent shadow-sm">
                    <BenefitIcon icon={benefit.icon} />
                  </div>

                  {/* Title */}
                  <h3 className="relative z-10 text-[18px] font-bold leading-snug tracking-tight text-slate-900 group-hover:text-[#176579] transition-colors duration-300">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="relative z-10 mt-3 text-[13.5px] font-medium leading-relaxed text-slate-700 group-hover:text-slate-800 transition-colors duration-300">
                    {benefit.description}
                  </p>
                </div>
              </div>

              {/* Bottom growing glowing accent line */}
              <div className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#27a8c4] to-[#176579] w-0 group-hover:w-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(39,168,196,0.4)]" />
            </article>
          ))}
        </div>

      </div>

      {/* Wave SVG gradients definition */}
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
        <defs>
          <linearGradient id="benefits-wave-grad-1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#27a8c4" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#176579" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="benefits-wave-grad-2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3cd5f7" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#27a8c4" stopOpacity="0.75" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
}
