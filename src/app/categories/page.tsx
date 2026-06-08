import type { Metadata } from "next";
import { CategoriesDirectory } from "@/components/sections/CategoriesDirectory";
import { Navbar } from "@/components/sections/Navbar";

export const metadata: Metadata = {
  title: "Product Categories Directory | Affhan Group",
  description:
    "Explore our complete product sourcing catalog. Filter by category, min order quantity (MOQ), origin hubs, and submit sourcing requests.",
};

export default function CategoriesPage() {
  return (
    <main className="min-h-screen w-full bg-[#f9fafb] text-slate-950 pt-16 lg:h-screen lg:overflow-hidden">
      <Navbar />
      <CategoriesDirectory />
    </main>
  );
}

