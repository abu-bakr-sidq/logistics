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
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [categorySearchQuery, setCategorySearchQuery] = useState("");  const rightContainerRef = useRef<HTMLDivElement | null>(null);

  // Handle mounting and initial URL parameter check (e.g. q=something, category=catName)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q");
      if (q) {
        setSearchQuery(q);
        // Dispatch to sync with Navbar initially
        window.dispatchEvent(new CustomEvent("main-search", { detail: q }));
      }

      const catParam = params.get("category");
      if (catParam) {
        setSelectedCategory(catParam);
      }

      // Keep legacy inquire check in case someone hits the URL directly
      const inquireName = params.get("inquire");
      if (inquireName) {
        const found = allProducts.find(
          (p) => p.name.toLowerCase() === inquireName.toLowerCase()
        );
        if (found) {
          setInquiryProduct(found);
          const url = new URL(window.location.href);
          url.searchParams.delete("inquire");
          window.history.replaceState(null, "", url.pathname + url.search);
        }
      }
    }
  }, []);

  // Listen to navbar search bar changes to sync main search input
  useEffect(() => {
    const handleNavbarSearchSync = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setSearchQuery(customEvent.detail || "");
    };

    window.addEventListener("navbar-search", handleNavbarSearchSync);
    return () => {
      window.removeEventListener("navbar-search", handleNavbarSearchSync);
    };
  }, []);

  // Listen to select-product-suggestion event from Navbar search suggestions
  useEffect(() => {
    const handleSelectSuggestion = (e: Event) => {
      const customEvent = e as CustomEvent<Product>;
      if (customEvent.detail) {
        const product = customEvent.detail;
        setSelectedCategory(product.category);
        setSearchQuery("");
        setVisibleCount(24);
        // Dispatch main-search to sync Navbar's text input state (clear it)
        window.dispatchEvent(new CustomEvent("main-search", { detail: "" }));
      }
    };

    window.addEventListener("select-product-suggestion", handleSelectSuggestion);
    return () => {
      window.removeEventListener("select-product-suggestion", handleSelectSuggestion);
    };
  }, []);

  // Update browser URL query parameter when searchQuery changes (without page reload)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const currentQ = url.searchParams.get("q") || "";
      if (searchQuery !== currentQ) {
        if (searchQuery) {
          url.searchParams.set("q", searchQuery);
        } else {
          url.searchParams.delete("q");
        }
        window.history.replaceState(null, "", url.pathname + url.search);
      }
    }
  }, [searchQuery]);

  // Update browser URL query parameter when selectedCategory changes (without page reload)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const currentCat = url.searchParams.get("category") || "All";
      if (selectedCategory !== currentCat) {
        if (selectedCategory && selectedCategory !== "All") {
          url.searchParams.set("category", selectedCategory);
        } else {
          url.searchParams.delete("category");
        }
        window.history.replaceState(null, "", url.pathname + url.search);
      }
    }
  }, [selectedCategory]);

  const handleMainSearchChange = (val: string) => {
    setSearchQuery(val);
    setVisibleCount(24);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("main-search", { detail: val }));
    }
  };

  // Reset scroll position to top when selected category or search query changes
  useEffect(() => {
    if (rightContainerRef.current) {
      rightContainerRef.current.scrollTop = 0;
    }
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0 });
    }
  }, [selectedCategory, searchQuery]);

  // Reset category search query when mobile drawer closes
  useEffect(() => {
    if (!isMobileSidebarOpen) {
      setCategorySearchQuery("");
    }
  }, [isMobileSidebarOpen]);

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

        .directory-glass-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(240, 253, 250, 0.25) 100%) !important;
          backdrop-filter: blur(20px) !important;
          -webkit-backdrop-filter: blur(20px) !important;
          border-top: 1.5px solid rgba(255, 255, 255, 0.8) !important;
          border-left: 1.5px solid rgba(255, 255, 255, 0.8) !important;
          border-bottom: 1.5px solid rgba(148, 163, 184, 0.2) !important;
          border-right: 1.5px solid rgba(148, 163, 184, 0.2) !important;
          box-shadow:
            inset 0 2px 6px rgba(255, 255, 255, 0.7),
            inset 0 -2px 6px rgba(0, 0, 0, 0.02),
            0 8px 24px rgba(15, 23, 42, 0.04) !important;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
          will-change: transform, box-shadow;
        }
        .directory-glass-card:hover {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(240, 253, 250, 0.35) 100%) !important;
          border-top-color: rgba(255, 255, 255, 0.95) !important;
          border-left-color: rgba(255, 255, 255, 0.95) !important;
          border-bottom-color: rgba(148, 163, 184, 0.3) !important;
          border-right-color: rgba(148, 163, 184, 0.3) !important;
          box-shadow:
            inset 0 4px 10px rgba(255, 255, 255, 0.85),
            inset 0 -4px 10px rgba(0, 0, 0, 0.03),
            0 16px 36px rgba(39, 168, 196, 0.1),
            0 2px 6px rgba(0, 0, 0, 0.01) !important;
          transform: translateY(-6px) !important;
        }
        .directory-glass-sheen {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
          z-index: 20;
        }
        .directory-glass-card:hover .directory-glass-sheen {
          transform: translateX(100%);
        }
      `}} />

      {/* Background radial effects */}
      <div className="pointer-events-none absolute left-0 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_at_top_left,rgba(39,168,196,0.06)_0%,rgba(0,0,0,0)_60%)]" />
      <div className="pointer-events-none absolute right-0 bottom-0 -z-10 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_at_bottom_right,rgba(39,168,196,0.06)_0%,rgba(0,0,0,0)_60%)]" />

      <div className="flex flex-col lg:flex-row h-full w-full max-w-full min-w-0">
        {/* Sidebar Category Tabs - Fixed position on desktop */}
        <aside className="hidden lg:flex w-full max-w-full min-w-0 lg:w-[340px] lg:shrink-0 bg-white/70 border-b lg:border-b-0 lg:border-r border-slate-200/60 backdrop-blur-md p-4 lg:p-5 flex-col lg:h-full select-none">
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

              {/* Sticky search/filter bar container */}
              <div className="sticky top-16 z-30 -mx-4 px-4 py-3 bg-[#f9fafb]/90 border-b border-slate-200/40 backdrop-blur-md lg:relative lg:top-0 lg:z-0 lg:bg-transparent lg:border-b-0 lg:-mx-0 lg:px-0 lg:py-0 lg:backdrop-blur-none transition-all duration-300">
                {/* Search Widget */}
                <div className="mx-auto max-w-lg">
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
                        handleMainSearchChange(e.target.value);
                      }}
                    />
                  </div>
                </div>

                {/* Mobile Filter Toggle Button */}
                <div className="mt-3.5 flex justify-center lg:hidden">
                  <button
                    onClick={() => setIsMobileSidebarOpen(true)}
                    className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    <svg className="h-4 w-4 text-[#27a8c4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 8.293A1 1 0 013 7.586V4z" />
                    </svg>
                    Filter by Category: <span className="text-[#176579] font-extrabold">{selectedCategory}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-3 gap-1.5 xs:gap-2.5 sm:gap-4 lg:gap-6">
                  {displayedProducts.map((product, idx) => (
                    <article
                      key={`${product.name}-${product.image}-${idx}`}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl directory-glass-card"
                    >
                      <div className="directory-glass-sheen" />
                      {/* Image Frame */}
                      <div className="relative aspect-square sm:aspect-[4/3] w-full overflow-hidden bg-white border-b border-slate-100 p-1.5 sm:p-4">
                        <Image
                          src={`/images/${product.image}`}
                          alt={product.name}
                          fill
                          className="object-contain p-2 sm:p-4 transition-transform duration-500 group-hover:scale-105"
                          sizes="350px"
                        />
                        <div className="absolute left-1 top-1 sm:left-3 sm:top-3 rounded-full bg-slate-900/65 px-1.5 py-0.5 sm:px-3 sm:py-1 text-[7px] sm:text-[9px] font-bold tracking-[0.08em] text-white border border-white/20 shadow-[0_4px_12px_rgba(0,0,0,0.1)] backdrop-blur-md uppercase hidden xs:inline-block">
                          {product.category}
                        </div>
                      </div>

                      {/* Body Content */}
                      <div className="flex flex-1 flex-col p-1.5 sm:p-4">
                        <h3 className="line-clamp-2 text-[10px] sm:text-xs md:text-sm font-bold sm:font-semibold leading-tight sm:leading-snug text-slate-800 transition-colors duration-300 group-hover:text-[#176579] min-h-[26px] xs:min-h-[30px] sm:min-h-[36px] lg:min-h-[40px] overflow-hidden">
                          {product.name}
                        </h3>

                        {/* B2B Sourcing Specs Row Layout (Imbalance and Spacing Fix) */}
                        <div className="my-1.5 sm:my-4 hidden xs:grid grid-cols-2 gap-1.5 sm:gap-3 border-t border-b border-slate-100/80 py-1 sm:py-3">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#27a8c4]/10 text-[#27a8c4]">
                              <Package className="h-3.5 w-3.5" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-[7px] sm:text-[8px] font-bold uppercase tracking-wider text-slate-400">MOQ</div>
                              <div className="text-[10px] sm:text-xs font-bold text-slate-700 truncate">{product.moq}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#27a8c4]/10 text-[#27a8c4]">
                              <Globe className="h-3.5 w-3.5" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-[7px] sm:text-[8px] font-bold uppercase tracking-wider text-slate-400">Origin</div>
                              <div className="text-[10px] sm:text-xs font-bold text-slate-700 truncate">{product.region.replace(" Sourcing Hub", "")}</div>
                            </div>
                          </div>
                        </div>

                        {/* Premium Inquire Sourcing Action Button (High-Contrast CTA Fix) */}
                        <button
                          onClick={() => setInquiryProduct(product)}
                          className="mt-auto w-full rounded-lg sm:rounded-xl bg-gradient-to-r from-[#27a8c4] to-[#176579] hover:from-[#3cd5f7] hover:to-[#27a8c4] py-1.5 sm:py-2.5 text-[9px] sm:text-xs font-bold text-white transition-all duration-300 shadow-[0_4px_12px_rgba(39,168,196,0.15)] hover:shadow-[0_4px_20px_rgba(39,168,196,0.25)] hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <span className="xs:hidden">Inquire</span>
                          <span className="hidden xs:inline">Inquire Sourcing</span>
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
        <div className="fixed inset-0 z-[60] flex items-end justify-center lg:items-center p-0 lg:p-4 bg-slate-900/40 backdrop-blur-sm animate-[timeline-fade-in_200ms_ease-out]">
          <div className="w-full lg:max-w-lg max-h-[92vh] lg:max-h-none overflow-hidden rounded-t-3xl lg:rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-2xl backdrop-blur-md animate-[product-category-in_300ms_cubic-bezier(0.16,1,0.3,1)_both] flex flex-col">
            {/* Drag Handle for Mobile */}
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4 lg:hidden shrink-0" />

            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4 shrink-0">
              <div>
                <span className="text-[10px] font-bold tracking-[0.16em] text-[#27a8c4] uppercase">
                  RFQ CONSOLE
                </span>
                <h3 className="text-base lg:text-lg font-bold text-slate-900 mt-1">
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

            {/* Scrollable Container */}
            <div className="flex-1 overflow-y-auto mt-4 pr-0.5" style={{ scrollbarWidth: "none" }}>
              {/* Product overview card (mobile only) */}
              <div className="lg:hidden bg-gradient-to-br from-white to-slate-50/80 rounded-2xl p-4 border border-slate-150/50 flex gap-4 items-center mb-5 shadow-[0_8px_30px_rgba(15,23,42,0.03)]">
                <div className="relative h-20 w-20 rounded-xl overflow-hidden border border-slate-200/60 bg-white shrink-0 shadow-sm">
                  <Image
                    alt={inquiryProduct.name}
                    className="object-cover"
                    fill
                    sizes="80px"
                    src={`/images/${inquiryProduct.image}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
                    {inquiryProduct.category}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 truncate mt-0.5">
                    {inquiryProduct.name}
                  </h4>
                  
                  {/* Compact specs rows */}
                  <div className="mt-2.5 flex gap-2.5 text-[10px] text-slate-600 font-medium">
                    <span className="bg-[#27a8c4]/8 px-2.5 py-1 rounded-lg border border-[#27a8c4]/15 text-[10px] font-semibold text-[#176579] shadow-sm">
                      MOQ: <span className="font-extrabold">{inquiryProduct.moq}</span>
                    </span>
                    <span className="bg-slate-100/60 px-2.5 py-1 rounded-lg border border-slate-200/50 text-[10px] font-semibold text-slate-700 shadow-sm">
                      Origin: <span className="font-extrabold">{inquiryProduct.region.replace(" Sourcing Hub", "")}</span>
                    </span>
                  </div>
                </div>
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
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                    <label className="block text-[10px] font-bold tracking-wider text-slate-500 uppercase flex items-start min-h-[28px] leading-tight">
                      Target Quantity (MOQ: {inquiryProduct.moq})
                    </label>
                    <label className="block text-[10px] font-bold tracking-wider text-slate-500 uppercase flex items-start min-h-[28px] leading-tight">
                      Sourcing Timeline
                    </label>

                    <input
                      type="number"
                      required
                      min={parseInt(inquiryProduct.moq)}
                      className="block w-full h-11 rounded-xl border border-slate-200/85 bg-white px-4 py-2.5 text-xs text-slate-900 focus:border-[#27a8c4] focus:ring-4 focus:ring-[#27a8c4]/8 focus:outline-none transition-all duration-200 shadow-sm"
                      value={inquiryForm.qty}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, qty: e.target.value })}
                    />
                    <select
                      className="block w-full h-11 rounded-xl border border-slate-200/85 bg-white px-4 py-2.5 text-xs text-slate-900 focus:border-[#27a8c4] focus:ring-4 focus:ring-[#27a8c4]/8 focus:outline-none transition-all duration-200 shadow-sm appearance-none bg-[url('data:image/svg+xml;utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23475569%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:14px_14px] bg-[right_16px_center] bg-no-repeat pr-10"
                      value={inquiryForm.timeline}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, timeline: e.target.value })}
                    >
                      <option>Urgent (1-2 Weeks)</option>
                      <option>1 Month</option>
                      <option>2-3 Months</option>
                      <option>Planning / Ongoing Sourcing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-1.5">
                      Your Contact Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="buyer@company.com"
                      className="block w-full rounded-xl border border-slate-200/85 bg-white px-4 py-3 text-xs text-slate-900 focus:border-[#27a8c4] focus:ring-4 focus:ring-[#27a8c4]/8 focus:outline-none transition-all duration-200 shadow-sm"
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-1.5">
                      Custom Specifications / Branding Requests
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Enter packaging design requests, logo embossing, shipping terms (FOB/DDP), or target price limits..."
                      className="block w-full rounded-xl border border-slate-200/85 bg-white px-4 py-3 text-xs text-slate-900 focus:border-[#27a8c4] focus:ring-4 focus:ring-[#27a8c4]/8 focus:outline-none resize-none transition-all duration-200 shadow-sm"
                      value={inquiryForm.details}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, details: e.target.value })}
                    />
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex gap-3 pb-4">
                    <button
                      type="button"
                      onClick={() => setInquiryProduct(null)}
                      className="flex-1 rounded-xl border border-slate-250 bg-slate-50/40 py-3 text-xs font-bold text-slate-600 hover:bg-slate-100/80 hover:text-slate-800 transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 rounded-xl bg-gradient-to-r from-[#27a8c4] to-[#176579] py-3 text-xs font-bold text-white transition-all shadow-[0_4px_16px_rgba(39,168,196,0.25)] hover:opacity-95 hover:shadow-[0_6px_20px_rgba(39,168,196,0.35)] cursor-pointer"
                    >
                      Send Request
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button (FAB) for Categories Filter on Mobile */}
      <button
        onClick={() => setIsMobileSidebarOpen(true)}
        className="fixed bottom-6 right-6 z-40 lg:hidden flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#27a8c4] to-[#176579] text-white shadow-lg shadow-[#27a8c4]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        aria-label="Open filter categories"
      >
        <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 8.293A1 1 0 013 7.586V4z" />
        </svg>
      </button>

      {/* Mobile Drawer Sidebar */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-[60] flex lg:hidden">
          {/* Backdrop overlay */}
          <div
            onClick={() => setIsMobileSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 animate-[timeline-fade-in_200ms_ease-out]"
          />

          {/* Drawer panel */}
          <aside
            className="relative flex h-full w-[85vw] max-w-[320px] flex-col bg-white p-5 shadow-2xl animate-[product-category-in_300ms_cubic-bezier(0.16,1,0.3,1)_both]"
          >
            {/* Drawer Header */}
            <div className="flex flex-col gap-3.5 pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-extrabold tracking-[0.2em] text-[#176579] uppercase">
                  Filter Categories
                </h2>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all cursor-pointer"
                  aria-label="Close filters"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Real-time Category Search Input */}
              <div className="relative rounded-xl border border-slate-200/80 bg-slate-50/50 p-1.5 transition-all duration-300 focus-within:border-[#27a8c4]/65">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search categories..."
                  className="block w-full border-0 bg-transparent py-1.5 pl-8 pr-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0"
                  value={categorySearchQuery}
                  onChange={(e) => setCategorySearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Drawer Body - Scrollable category items */}
            <div className="sidebar-scrollbar flex-1 overflow-y-auto space-y-1.5 pr-1 select-none">
              {categoriesList
                .filter((cat) => cat.name.toLowerCase().includes(categorySearchQuery.toLowerCase()))
                .map((cat) => {
                  const isSelected = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.name}
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      setVisibleCount(24);
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`group flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition-all duration-300 ${
                      isSelected
                        ? "bg-[#27a8c4] text-white shadow-[0_4px_16px_rgba(39,168,196,0.25)]"
                        : "text-slate-800 hover:bg-slate-100/70 hover:text-slate-950"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
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
                      <span className="truncate text-left text-[14px] font-bold leading-tight text-slate-800 group-hover:text-[#176579]">
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
        </div>
      )}
    </div>
  );
}
