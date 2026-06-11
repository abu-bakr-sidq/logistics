"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Mail } from "lucide-react";
import { allProducts, type Product } from "@/data/products";

const navItems = [
  { label: "HOME", href: "/#home", id: "home" },
  { label: "EXPLORE PRODUCTS", href: "/categories", id: "categories" },
  { label: "PROCESS", href: "/#sourcing-process", id: "sourcing-process" },
  { label: "ABOUT US", href: "/about", id: "about" },
];

export function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [underlineStyle, setUnderlineStyle] = useState<React.CSSProperties>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const isManualScroll = useRef(false);
  const [showNavbarSearch, setShowNavbarSearch] = useState(false);
  const [navSearchValue, setNavSearchValue] = useState("");
  const [mounted, setMounted] = useState(false);

  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const desktopSearchRef = useRef<HTMLDivElement | null>(null);
  const mobileSearchRef = useRef<HTMLDivElement | null>(null);

  // Trigger loading spinner on search input
  useEffect(() => {
    const query = navSearchValue.trim();
    if (query.length >= 2) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 500); // 500ms searching duration
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
    }
  }, [navSearchValue]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter products for suggestions (query length >= 2)
  const suggestions = useMemo(() => {
    const query = navSearchValue.trim().toLowerCase();
    if (query.length < 2) return [];
    return allProducts
      .filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      )
      .slice(0, 5);
  }, [navSearchValue]);

  // Click outside listener to dismiss suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedOutsideDesktop =
        !desktopSearchRef.current || !desktopSearchRef.current.contains(target);
      const clickedOutsideMobile =
        !mobileSearchRef.current || !mobileSearchRef.current.contains(target);
      if (clickedOutsideDesktop && clickedOutsideMobile) {
        setIsInputFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = (product: Product) => {
    setIsInputFocused(false);
    setNavSearchValue("");
    if (typeof window !== "undefined") {
      if (pathname === "/categories") {
        window.dispatchEvent(
          new CustomEvent("select-product-suggestion", { detail: product })
        );
      } else {
        window.location.href = `/categories?category=${encodeURIComponent(product.category)}`;
      }
    }
  };

  // Listen to scroll to show/hide the compact search input in Navbar
  useEffect(() => {
    const handleScroll = () => {
      let scrollY = 0;
      if (typeof window !== "undefined") {
        scrollY = window.scrollY;
      }
      const mainEl = document.querySelector("main");
      if (mainEl && mainEl.scrollTop > scrollY) {
        scrollY = mainEl.scrollTop;
      }
      
      // Threshold where we show the search input (e.g. scrolled past search bar)
      // Home page search bar is at ~350px. Explore page search bar is at ~220px.
      // So 250px is a perfect general threshold.
      if (scrollY > 250) {
        setShowNavbarSearch(true);
      } else {
        setShowNavbarSearch(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    const mainEl = document.querySelector("main");
    if (mainEl) {
      mainEl.addEventListener("scroll", handleScroll, { passive: true });
    }

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (mainEl) {
        mainEl.removeEventListener("scroll", handleScroll);
      }
    };
  }, [pathname]);

  // Sync search input from CategoriesDirectory to Navbar
  useEffect(() => {
    const handleMainSearchSync = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setNavSearchValue(customEvent.detail || "");
    };

    window.addEventListener("main-search", handleMainSearchSync);
    return () => {
      window.removeEventListener("main-search", handleMainSearchSync);
    };
  }, []);

  // Synchronize Navbar search input with URL search query on mount or pathname change
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q");
      if (q) {
        setNavSearchValue(q);
      } else {
        setNavSearchValue("");
      }
    }
  }, [pathname]);

  const handleNavbarSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNavSearchValue(val);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("navbar-search", { detail: val }));
    }
  };

  const handleNavbarSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsInputFocused(false);
    if (pathname !== "/categories") {
      window.location.href = `/categories?q=${encodeURIComponent(navSearchValue)}`;
    } else {
      // Blur the active element to close mobile keyboard
      if (typeof document !== "undefined" && document.activeElement) {
        (document.activeElement as HTMLElement).blur();
      }
    }
  };

  // Handle initial page load with hash fragments (e.g. from categories page)
  useEffect(() => {
    if (pathname === "/" && typeof window !== "undefined" && window.location.hash) {
      const hashId = window.location.hash.replace("#", "");
      const targetItems = navItems.filter(item => item.id === hashId);
      if (targetItems.length > 0) {
        isManualScroll.current = true;
        
        const timerId = setTimeout(() => {
          setActiveSection(hashId);
        }, 0);
        
        // Re-enable scroll spy after the page has finished scrolling to the hash
        const timeoutId = setTimeout(() => {
          isManualScroll.current = false;
        }, 1250);
        
        return () => {
          clearTimeout(timerId);
          clearTimeout(timeoutId);
        };
      }
    }
  }, [pathname]);

  // Scroll spy listener
  useEffect(() => {
    const mainEl = document.querySelector("main");
    if (!mainEl) return;

    const handleScroll = () => {
      if (isManualScroll.current) return;
      if (pathname !== "/") return;

      const scrollPosition = mainEl.scrollTop + 200; // Scroll offset padding

      // Check which section is in view
      const spyItems = navItems.filter(item => item.href.startsWith("/#"));
      for (let i = spyItems.length - 1; i >= 0; i--) {
        const item = spyItems[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    mainEl.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => mainEl.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Sliding underline active position tracking
  useEffect(() => {
    const updateUnderline = () => {
      const navElement = document.getElementById("desktop-nav");
      if (!navElement) return;

      const activeLink = navElement.querySelector(".active-nav-link") as HTMLElement;
      if (activeLink) {
        setUnderlineStyle({
          left: activeLink.offsetLeft,
          width: activeLink.offsetWidth,
          opacity: 1,
        });
      } else {
        setUnderlineStyle(prev => ({ ...prev, opacity: 0 }));
      }
    };

    // Small delay to ensure client layout hydration is complete
    const timeoutId = setTimeout(updateUnderline, 50);

    window.addEventListener("resize", updateUnderline);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateUnderline);
    };
  }, [activeSection, pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string, href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        isManualScroll.current = true;
        setActiveSection(targetId);
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${targetId}`);
        
        // Re-enable scroll spy after smooth scroll animation completes
        setTimeout(() => {
          isManualScroll.current = false;
        }, 850);
      }
    }
  };

  return (
    <header
      className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between bg-white px-4 sm:px-8 lg:px-16 shadow-[0_8px_24px_rgba(0,0,0,0.08)] text-slate-950"
    >
      {/* Left Container: Logo and Desktop Search */}
      <div className="flex items-center gap-4 lg:gap-6 shrink-0">
        {/* Brand Logo */}
        <Link
          className={`relative block h-14 w-32 shrink-0 sm:h-[60px] sm:w-36 -ml-1.5 sm:ml-0 ${
            showNavbarSearch ? "hidden lg:block" : "block"
          }`}
          href="/"
          aria-label="AFFHAN home"
          onClick={() => setMobileMenuOpen(false)}
          prefetch={false}
        >
          <Image
            className="object-contain object-left"
            src="/images/logo.png"
            alt="AFFHAN"
            fill
            sizes="144px"
            priority
          />
        </Link>

        {/* Desktop Search (Only visible on lg and above) */}
        {showNavbarSearch && (
          <div ref={desktopSearchRef} className="relative hidden lg:block">
            <form
              onSubmit={handleNavbarSearchSubmit}
              className="relative flex items-center h-9 w-48 xl:w-64 rounded-full bg-slate-100 border border-slate-200/80 px-3 transition-all duration-300 focus-within:w-56 xl:focus-within:w-72 focus-within:border-[#27a8c4]/60 focus-within:bg-white focus-within:shadow-[0_0_12px_rgba(39,168,196,0.15)]"
            >
              <Search size={15} className="text-slate-400 shrink-0" />
              <input
                type="search"
                value={navSearchValue}
                onFocus={() => setIsInputFocused(true)}
                onChange={handleNavbarSearchChange}
                placeholder="Search products..."
                className="w-full bg-transparent pl-2 text-[12px] text-slate-800 outline-none placeholder:text-slate-400"
              />
            </form>
            {isInputFocused && navSearchValue.trim().length >= 2 && (
              <div
                onWheel={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                className="absolute top-full left-0 z-[100] mt-2 w-full min-w-[280px] max-h-60 overflow-y-auto rounded-2xl border border-slate-200/80 bg-white p-1.5 shadow-[0_20px_45px_rgba(15,23,42,0.12)]"
              >
                {isSearching ? (
                  <div className="flex items-center justify-center py-8 gap-2.5 text-slate-500 font-medium text-xs">
                    <svg className="animate-spin h-4 w-4 text-[#27a8c4]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </div>
                ) : suggestions.length > 0 ? (
                  suggestions.map((product, idx) => (
                    <button
                      key={`desktop-suggest-${idx}`}
                      type="button"
                      onClick={() => handleSuggestionClick(product)}
                      className="flex w-full items-center gap-3 rounded-xl p-2 hover:bg-slate-50 transition-colors text-left cursor-pointer"
                    >
                      <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg border border-slate-150 bg-white">
                        <Image
                          src={`/images/${product.image}`}
                          alt={product.name}
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-bold text-slate-800">
                          {product.name}
                        </span>
                        <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                          {product.category}
                        </span>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-6 text-xs text-slate-400 font-medium">
                    No matching products found
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Search Input (only shown on mobile if showNavbarSearch is true) */}
      {showNavbarSearch && (
        <div ref={mobileSearchRef} className="flex-1 mx-2 relative lg:hidden">
          <form
            onSubmit={handleNavbarSearchSubmit}
            className="w-full relative flex items-center h-9 rounded-full bg-slate-100 border border-slate-200/85 px-2.5 transition-all duration-300 focus-within:border-[#27a8c4]/60 focus-within:bg-white focus-within:shadow-[0_0_12px_rgba(39,168,196,0.15)]"
          >
            <Search size={15} className="text-slate-400 shrink-0" />
            <input
              type="search"
              value={navSearchValue}
              onFocus={() => setIsInputFocused(true)}
              onChange={handleNavbarSearchChange}
              placeholder="Search..."
              className="w-full bg-transparent pl-1.5 text-[12px] text-slate-800 outline-none placeholder:text-slate-400"
            />
          </form>
          {isInputFocused && navSearchValue.trim().length >= 2 && (
            <div
              onWheel={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="absolute top-full left-0 right-0 z-[100] mt-2 max-h-60 overflow-y-auto rounded-2xl border border-slate-200/80 bg-white p-1.5 shadow-[0_20px_45px_rgba(15,23,42,0.12)]"
            >
              {isSearching ? (
                <div className="flex items-center justify-center py-8 gap-2.5 text-slate-500 font-medium text-xs">
                  <svg className="animate-spin h-4 w-4 text-[#27a8c4]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </div>
              ) : suggestions.length > 0 ? (
                suggestions.map((product, idx) => (
                  <button
                    key={`mobile-suggest-${idx}`}
                    type="button"
                    onClick={() => handleSuggestionClick(product)}
                    className="flex w-full items-center gap-3 rounded-xl p-2 hover:bg-slate-50 transition-colors text-left cursor-pointer"
                  >
                    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg border border-slate-150 bg-white">
                      <Image
                        src={`/images/${product.image}`}
                        alt={product.name}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-bold text-slate-800">
                        {product.name}
                      </span>
                      <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                        {product.category}
                      </span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-slate-400 font-medium">
                  No matching products found
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Desktop Navigation Link Row */}
      <nav
        id="desktop-nav"
        className="relative hidden items-center gap-6 text-[12px] font-bold tracking-[0.12em] lg:flex xl:gap-8 text-slate-950 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2"
        aria-label="Main navigation"
      >
        {navItems.map((item) => {
          const isActive = item.href.startsWith("/#")
            ? (pathname === "/" && activeSection === item.id)
            : (pathname === item.href);
          return (
            <Link
              key={item.id}
              onClick={(e) => handleNavClick(e, item.id, item.href)}
              className={`relative py-1.5 transition-colors duration-300 uppercase ${
                isActive
                  ? "text-[#176579] active-nav-link"
                  : "text-slate-600 hover:text-[#27a8c4]"
              }`}
              href={item.href}
              prefetch={false}
            >
              {item.label}
            </Link>
          );
        })}

        {/* Dynamic sliding underline bar */}
        <span
          style={underlineStyle}
          className="absolute -bottom-1 h-[2.5px] rounded-full bg-[#176579] transition-all duration-300 ease-out pointer-events-none"
        />
      </nav>

      {/* Right Container: Desktop Contact and Mobile Actions */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Desktop Contact Us button */}
        <Link
          onClick={(e) => handleNavClick(e, "contact", "/contact")}
          className="hidden lg:block px-4 py-2 rounded-xl text-[11px] font-bold tracking-[0.08em] transition-all duration-300 hover:scale-102 hover:shadow-[0_4px_16px_rgba(39,168,196,0.25)] bg-[#176579] text-white hover:bg-[#27a8c4] shrink-0"
          href="/contact"
          prefetch={false}
        >
          CONTACT US
        </Link>

      {/* Mobile Actions Container */}
      <div className="flex items-center gap-1.5 lg:hidden">
        {mounted && (
          <>
            {/* Search Shortcut */}
            {!showNavbarSearch && pathname !== "/" && (
              <Link
                href="/categories"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center text-slate-700 hover:text-[#27a8c4] transition-colors rounded-xl"
                aria-label="Search catalog"
                prefetch={false}
              >
                <Search size={20} strokeWidth={2} />
              </Link>
            )}

            {/* Shopping Bag / Products Shortcut (Contextual: links to contact page if already on categories page) */}
            <Link
              href={pathname === "/categories" ? "/contact" : "/categories"}
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center text-slate-700 hover:text-[#27a8c4] transition-colors rounded-xl"
              aria-label={pathname === "/categories" ? "Contact us" : "Explore products"}
              prefetch={false}
            >
              {pathname === "/categories" ? (
                <Mail size={20} strokeWidth={2} />
              ) : (
                <ShoppingBag size={20} strokeWidth={2} />
              )}
            </Link>
          </>
        )}

        {/* Mobile Menu Toggle (Hamburger) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/40 bg-slate-50 text-slate-800 hover:bg-slate-100 transition-all duration-300 cursor-pointer"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <div className="relative h-5 w-5">
            <span
              className={`absolute left-0 top-1/2 h-[2px] w-5 -mt-[1px] rounded-full bg-slate-800 transition-all duration-300 ${
                mobileMenuOpen ? "rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-[2px] w-5 -mt-[1px] rounded-full bg-slate-800 transition-all duration-300 ${
                mobileMenuOpen ? "-rotate-45" : "translate-y-1.5"
              }`}
            />
          </div>
        </button>
      </div>
    </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="absolute left-0 top-16 z-40 flex w-full flex-col border-b border-slate-200/60 bg-white/95 py-6 px-6 backdrop-blur-xl text-slate-800 shadow-xl animate-[product-category-in_260ms_cubic-bezier(0.16,1,0.3,1)_both]">
          <div className="flex flex-col gap-4 text-xs font-bold tracking-[0.14em]">
            {navItems.map((item) => {
              const isActive = item.href.startsWith("/#")
                ? (pathname === "/" && activeSection === item.id)
                : (pathname === item.href);
              return (
                <Link
                  key={item.id}
                  onClick={(e) => handleNavClick(e, item.id, item.href)}
                  className={`py-1 transition-colors uppercase ${
                    isActive
                      ? "text-[#27a8c4]"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  href={item.href}
                  prefetch={false}
                >
                  {item.id === "sourcing-process" ? "PROCESS OF SOURCING" : item.label}
                </Link>
              );
            })}
            <hr className="border-slate-100" />
            <Link
              onClick={(e) => handleNavClick(e, "contact", "/contact")}
              className="mt-2 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#27a8c4] to-[#176579] py-3 text-xs font-bold text-white transition-all duration-300"
              href="/contact"
              prefetch={false}
            >
              CONTACT US
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
