"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { allProducts, type Product } from "@/data/products";
import { Package, Globe } from "lucide-react";
import { FooterSection } from "./FooterSection";

// Helper function to map category name to its browse-by-category thumbnail
function getCategoryImage(catName: string): string {
  const mapping: Record<string, string> = {
    "Automative Parts": "automotive-parts-accessories.png",
    "Baby Bags": "baby-bags.png",
    "Baby Products": "baby-products.png",
    "Bags": "bags.jpg",
    "Bed Mattress": "bed-and-mattress.png",
    "Books": "books.jpg",
    "Bottles": "bottles.png",
    "Boxes": "boxes.jpg",
    "Car Bike Parts & Accessories": "car-bike-parts-accessories.jpg",
    "Cell Phones Accessories": "cell-phones-accessories.png",
    "Ceramic": "ceramic.jpg",
    "Chair Furniture": "chair-furniture.jpg",
    "Clothing Fabrics": "clothing-fabrics.png",
    "Computer Accessories": "computer-accessories.jpg",
    "Computer": "computer.jpg",
    "Cosmetic Beauty": "cosmetic-beauty.png",
    "Electronics": "electronics.png",
    "Footwear Products": "footwear-products.png",
    "Gifts": "gifts.png",
    "Gym Equipment": "gym-equipment.jpg",
    "Health Household": "health-household.jpg",
    "Home Kitchen": "home-kitchen.png",
    "Interior Decors": "interior-decors.jpg",
    "Ladders": "ladders.png",
    "Lights": "lighting.jpg",
    "Locks": "locks.jpg",
    "Machine Transport Spares": "machine-transport-spares.png",
    "Metals & Alloys": "metals-alloys.jpg",
    "Music Instruments": "music-instruments.jpg",
    "Office Products": "office-products.png",
    "Optical Sun Glasses": "optical-sunglasses.jpg",
    "Outdoors Garden": "outdoors.png",
    "Pet Supplies": "pet-supplies.png",
    "Safety": "safety.jpg",
    "Sanitary": "sanitary.jpg",
    "Shelfs": "shelves.jpg",
    "Sports Outdoors": "sports-outdoors.jpg",
    "Stationary": "stationery.jpg",
    "Tools Home Improvement": "tools.jpg",
    "Toys Games": "toys-games.jpg",
    "Transporting": "transportation.png",
    "Umbrella": "umbrellas.jpg",
    "Watch": "watches.jpg"
  };
  return mapping[catName] || "default.png";
}

export function CategoriesDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(24);
  const [inquiryProduct, setInquiryProduct] = useState<Product | null>(null);
  const [inquiryForm, setInquiryForm] = useState({
    qty: "500",
    timeline: "1 Month",
    details: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const rightContainerRef = useRef<HTMLDivElement | null>(null);

  // Reset scroll position to top when selected category or search query changes
  useEffect(() => {
    if (rightContainerRef.current) {
      rightContainerRef.current.scrollTop = 0;
    }
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0 });
    }
  }, [selectedCategory, searchQuery]);

  // Extract all categories dynamically and count them
  const categoriesList = useMemo(() => {
    const counts: Record<string, number> = { All: allProducts.length };
    allProducts.forEach((product) => {
      counts[product.category] = (counts[product.category] || 0) + 1;
    });

    return Object.keys(counts).map((catName) => ({
      name: catName,
      count: counts[catName],
    }));
  }, []);

  // Filter products based on search and selected category
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.region.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Paginated products list to prevent rendering lag (DOM bloat fix)
  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setInquiryProduct(null);
      setSubmitted(false);
      setInquiryForm({ qty: "500", timeline: "1 Month", details: "", email: "" });
    }, 2000);
  };

  return (
    <div className="relative w-full max-w-full overflow-x-hidden lg:h-[calc(100vh-64px)] lg:overflow-hidden bg-[#f9fafb]">
      {/* Self-contained style tag for custom sidebar scrollbar */}
      <style dangerouslySetInnerHTML={{ __html: `
        .sidebar-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .sidebar-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.35);
          border-radius: 4px;
          transition: background 0.3s;
        }
        .sidebar-scrollbar::-webkit-scrollbar-thumb {
          background: transparent;
        }
        .sidebar-scrollbar:hover::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.35);
        }
      `}} />

      {/* Background radial effects */}
      <div className="pointer-events-none absolute left-0 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_at_top_left,rgba(39,168,196,0.06)_0%,rgba(0,0,0,0)_60%)]" />
      <div className="pointer-events-none absolute right-0 bottom-0 -z-10 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_at_bottom_right,rgba(39,168,196,0.06)_0%,rgba(0,0,0,0)_60%)]" />

      {/* Main Grid Workspace */}
      <div className="flex flex-col lg:flex-row h-full w-full max-w-full min-w-0">
        {/* Sidebar Category Tabs - Fixed position on desktop */}
        <aside className="w-full max-w-full min-w-0 lg:w-[340px] lg:shrink-0 bg-white/70 border-b lg:border-b-0 lg:border-r border-slate-200/60 backdrop-blur-md p-4 lg:p-5 flex flex-col lg:h-full select-none">
          <h2 className="mb-4 text-xs font-extrabold tracking-[0.2em] text-slate-400 uppercase">
            Filter Categories
          </h2>
          <div className="sidebar-scrollbar flex flex-row gap-2 overflow-x-auto pb-3 lg:flex-col lg:overflow-x-visible lg:pb-0 lg:space-y-1.5 lg:overflow-y-auto pr-1 flex-1 w-full max-w-full min-w-0">
            {categoriesList.map((cat) => {
              const isSelected = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    setVisibleCount(24);
                  }}
                  className={`group flex items-center justify-between gap-3 shrink-0 rounded-xl px-3 py-2.5 transition-all duration-300 ${
                    isSelected
                      ? "bg-[#27a8c4] text-white shadow-[0_4px_16px_rgba(39,168,196,0.25)]"
                      : "text-slate-800 hover:bg-slate-100/70 hover:text-slate-950"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Icon / Image thumbnail - resized to h-11 w-11 */}
                    <div className={`relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border transition-all ${
                      isSelected ? "border-white/20 bg-white/10" : "border-slate-200 bg-white shadow-sm"
                    }`}>
                      {cat.name === "All" ? (
                        <svg className={`h-5.5 w-5.5 ${isSelected ? "text-white" : "text-[#176579]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                      ) : (
                        <Image
                          src={`/images/browse-by-category/${getCategoryImage(cat.name)}`}
                          alt={cat.name}
                          fill
                          className="object-cover"
                          sizes="44px"
                          unoptimized
                        />
                      )}
                    </div>
                    <span className="truncate text-left text-[14px] lg:text-[14.5px] font-bold leading-tight text-slate-800 group-hover:text-[#176579]" title={cat.name}>
                      {cat.name}
                    </span>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-bold font-mono border transition-all ${
                      isSelected
                        ? "bg-white/20 text-white border-white/10"
                        : "bg-slate-50 text-slate-500 border-slate-200/50"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Content Area - Scrollable catalog & embedded footer */}
        <div
          ref={rightContainerRef}
          className="flex-grow lg:h-full lg:overflow-y-auto flex flex-col"
        >
          <main className="flex-1 px-4 py-10 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto">
            {/* Hero / Directory Header */}
            <div className="mb-8 text-center">
              <span className="inline-block text-xs font-bold tracking-[0.24em] text-[#27a8c4] uppercase mb-2">
                GLOBAL DIRECTORY
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Product Categories Console
              </h1>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-500">
                Browse our complete catalog of verified import-export products, check minimum order quantities (MOQ), and dispatch inquiry requests directly.
              </p>

              {/* Search Widget */}
              <div className="mx-auto mt-6 max-w-lg">
                <div className="relative rounded-2xl border border-slate-200/80 bg-white/60 p-1.5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] backdrop-blur-md transition-all duration-300 focus-within:border-[#27a8c4]/65 focus-within:shadow-[0_0_24px_rgba(39,168,196,0.15)]">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <svg
                      className="h-5 w-5 text-slate-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="block w-full border-0 bg-transparent py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0"
                    placeholder="Search by product, category, or sourcing region..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setVisibleCount(24);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {displayedProducts.map((product, idx) => (
                    <article
                      key={`${product.name}-${product.image}-${idx}`}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/60 bg-white/70 shadow-[0_4px_20px_rgba(15,23,42,0.01)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#27a8c4]/60 hover:shadow-[0_20px_40px_rgba(39,168,196,0.12)]"
                    >
                      {/* Image Frame */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-white border-b border-slate-100 p-4">
                        <Image
                          src={`/images/${product.image}`}
                          alt={product.name}
                          fill
                          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                          sizes="350px"
                        />
                        <div className="absolute left-3 top-3 rounded-full bg-slate-900/65 px-3 py-1 text-[9px] font-bold tracking-[0.08em] text-white border border-white/20 shadow-[0_4px_12px_rgba(0,0,0,0.1)] backdrop-blur-md uppercase">
                          {product.category}
                        </div>
                      </div>

                      {/* Body Content */}
                      <div className="flex flex-1 flex-col p-4">
                        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-slate-800 transition-colors duration-300 group-hover:text-[#176579]">
                          {product.name}
                        </h3>

                        {/* B2B Sourcing Specs Row Layout (Imbalance and Spacing Fix) */}
                        <div className="my-4 grid grid-cols-2 gap-3 border-t border-b border-slate-100/80 py-3">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#27a8c4]/10 text-[#27a8c4]">
                              <Package className="h-3.5 w-3.5" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-[8px] font-bold uppercase tracking-wider text-slate-400">MOQ</div>
                              <div className="text-xs font-bold text-slate-700 truncate">{product.moq}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#27a8c4]/10 text-[#27a8c4]">
                              <Globe className="h-3.5 w-3.5" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-[8px] font-bold uppercase tracking-wider text-slate-400">Origin</div>
                              <div className="text-xs font-bold text-slate-700 truncate">{product.region.replace(" Sourcing Hub", "")}</div>
                            </div>
                          </div>
                        </div>

                        {/* Premium Inquire Sourcing Action Button (High-Contrast CTA Fix) */}
                        <button
                          onClick={() => setInquiryProduct(product)}
                          className="mt-auto w-full rounded-xl bg-gradient-to-r from-[#27a8c4] to-[#176579] hover:from-[#3cd5f7] hover:to-[#27a8c4] py-2.5 text-xs font-bold text-white transition-all duration-300 shadow-[0_4px_12px_rgba(39,168,196,0.15)] hover:shadow-[0_4px_20px_rgba(39,168,196,0.25)] hover:scale-[1.02] active:scale-[0.98]"
                        >
                          Inquire Sourcing
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                {filteredProducts.length > visibleCount && (
                  <div className="mt-10 text-center">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 24)}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#27a8c4] to-[#176579] hover:from-[#3cd5f7] hover:to-[#27a8c4] px-6 py-3 text-xs font-bold text-white transition-all shadow-md active:scale-[0.98] cursor-pointer"
                    >
                      Load More Products
                      <span className="text-[10px] text-white/70 font-normal">
                        (Showing {visibleCount} of {filteredProducts.length})
                      </span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white/30 p-16 text-center backdrop-blur-sm">
                <svg
                  className="mx-auto h-12 w-12 text-slate-350"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                <h3 className="mt-4 text-sm font-bold text-slate-800">No products found</h3>
                <p className="mt-2 text-xs text-slate-500">
                  We couldn&apos;t find any items matching your filters or search keywords.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="mt-5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition-all hover:bg-slate-50"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>

          {/* Footer inside the scrollable content area */}
          <FooterSection />
        </div>
      </div>

      {/* Sourcing Inquiry Popup Modal */}
      {inquiryProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-[timeline-fade-in_200ms_ease-out]">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-2xl backdrop-blur-md animate-[product-category-in_300ms_cubic-bezier(0.16,1,0.3,1)_both]">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold tracking-[0.16em] text-[#27a8c4] uppercase">
                  RFQ CONSOLE
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
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
              <form onSubmit={handleInquirySubmit} className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1.5">
                      Target Quantity (MOQ: {inquiryProduct.moq})
                    </label>
                    <input
                      type="number"
                      required
                      min={parseInt(inquiryProduct.moq)}
                      className="block w-full rounded-xl border border-slate-200/80 bg-slate-50/50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#27a8c4] focus:ring-1 focus:ring-[#27a8c4] focus:outline-none"
                      value={inquiryForm.qty}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, qty: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1.5">
                      Sourcing Timeline
                    </label>
                    <select
                      className="block w-full rounded-xl border border-slate-200/80 bg-slate-50/50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#27a8c4] focus:ring-1 focus:ring-[#27a8c4] focus:outline-none"
                      value={inquiryForm.timeline}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, timeline: e.target.value })}
                    >
                      <option>Urgent (1-2 Weeks)</option>
                      <option>1 Month</option>
                      <option>2-3 Months</option>
                      <option>Planning / Ongoing Sourcing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1.5">
                    Your Contact Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="buyer@company.com"
                    className="block w-full rounded-xl border border-slate-200/80 bg-slate-50/50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#27a8c4] focus:ring-1 focus:ring-[#27a8c4] focus:outline-none"
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1.5">
                    Custom Specifications / Branding Requests
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter packaging design requests, logo embossing, shipping terms (FOB/DDP), or target price limits..."
                    className="block w-full rounded-xl border border-slate-200/80 bg-slate-50/50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#27a8c4] focus:ring-1 focus:ring-[#27a8c4] focus:outline-none resize-none"
                    value={inquiryForm.details}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, details: e.target.value })}
                  />
                </div>

                <div className="pt-2 border-t border-slate-100 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setInquiryProduct(null)}
                    className="flex-1 rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-gradient-to-r from-[#27a8c4] to-[#176579] py-3 text-xs font-bold text-white transition-all shadow-[0_4px_12px_rgba(39,168,196,0.25)] hover:opacity-95 cursor-pointer"
                  >
                    Send Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
