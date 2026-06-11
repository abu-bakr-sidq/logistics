import { benefits } from "@/data/home-page";
import { BenefitIcon } from "@/components/shared/BenefitIcon";

export function BenefitsSection() {
  return (
    <section
      id="benefits"
      className="relative flex min-h-screen lg:h-screen w-full lg:snap-start flex-col items-center justify-center overflow-y-auto lg:overflow-hidden bg-[#245b6d] px-5 py-24 lg:py-10 sm:px-8 lg:px-12"
    >
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
              className="benefit-card-in group relative flex min-h-[200px] flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-[#27a8c4]/45 hover:bg-white/[0.08] hover:shadow-[0_20px_40px_rgba(39,168,196,0.18)]"
              key={benefit.title}
              style={{
                animationDelay: `${index * 140}ms`,
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* Glow Aura behind icon */}
              <div className="absolute top-6 left-6 h-10 w-10 rounded-full bg-[radial-gradient(circle,rgba(39,168,196,0.25)_0%,rgba(39,168,196,0)_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

              {/* Icon Container */}
              <div className="relative z-10 mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#27a8c4]/30 bg-[#27a8c4]/15 text-[#27a8c4] transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                <BenefitIcon icon={benefit.icon} />
              </div>

              {/* Title */}
              <h3 className="relative z-10 text-[18px] font-bold leading-snug tracking-tight text-white/95 group-hover:text-white transition-colors duration-300">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="relative z-10 mt-3 text-[13.5px] font-normal leading-relaxed text-white/65 group-hover:text-white/80 transition-colors duration-300">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
