import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { GlobalSourcingSection } from "@/components/sections/GlobalSourcingSection";
import { GlobalMapSection } from "@/components/sections/GlobalMapSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { Navbar } from "@/components/sections/Navbar";
import { PopularProductsSection } from "@/components/sections/PopularProductsSection";
import { ProductCategoriesSection } from "@/components/sections/ProductCategoriesSection";
import { SourcingProcessSection } from "@/components/sections/SourcingProcessSection";

export default function Home() {
  return (
    <main className="relative h-screen w-full snap-y snap-proximity overflow-y-auto overflow-x-hidden scroll-smooth bg-black [overscroll-behavior-y:contain]">
      <Navbar />
      <HeroSection />
      <BenefitsSection />
      <GlobalSourcingSection />
      <ProductCategoriesSection />
      <SourcingProcessSection />
      <PopularProductsSection />
      <GlobalMapSection />
      <FooterSection />
    </main>
  );
}
