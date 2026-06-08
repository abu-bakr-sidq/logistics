"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
      {/* Brand Logo */}
      <Link
        className="relative block h-14 w-32 shrink-0 sm:h-[60px] sm:w-36"
        href="/"
        aria-label="AFFHAN home"
        onClick={() => setMobileMenuOpen(false)}
      >
        <Image
          className="object-contain"
          src="/images/logo.png"
          alt="AFFHAN"
          fill
          sizes="144px"
          priority
        />
      </Link>

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

      {/* Action Buttons */}
      <div className="hidden items-center gap-3 lg:flex">
        <Link
          onClick={(e) => handleNavClick(e, "contact", "/contact")}
          className="px-4 py-2 rounded-xl text-[11px] font-bold tracking-[0.08em] transition-all duration-300 hover:scale-102 hover:shadow-[0_4px_16px_rgba(39,168,196,0.25)] bg-[#176579] text-white hover:bg-[#27a8c4]"
          href="/contact"
        >
          CONTACT US
        </Link>
      </div>

      {/* Mobile Menu Toggle (Hamburger) */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/40 bg-slate-50 text-slate-800 hover:bg-slate-100 transition-all duration-300 cursor-pointer lg:hidden"
        aria-label="Toggle navigation menu"
        aria-expanded={mobileMenuOpen}
      >
        <div className="relative flex h-5 w-5 flex-col justify-between overflow-hidden">
          <span
            className={`h-[2px] w-full rounded-full transition-all duration-300 origin-left ${
              mobileMenuOpen ? "rotate-45 translate-x-1" : ""
            } bg-slate-800`}
          />
          <span
            className={`h-[2px] w-full rounded-full transition-all duration-300 ${
              mobileMenuOpen ? "opacity-0 -translate-x-3" : ""
            } bg-slate-800`}
          />
          <span
            className={`h-[2px] w-full rounded-full transition-all duration-300 origin-left ${
              mobileMenuOpen ? "-rotate-45 translate-x-1" : ""
            } bg-slate-800`}
          />
        </div>
      </button>

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
                >
                  {item.label}
                </Link>
              );
            })}
            <hr className="border-slate-100" />
            <Link
              onClick={(e) => handleNavClick(e, "contact", "/contact")}
              className="mt-2 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#27a8c4] to-[#176579] py-3 text-xs font-bold text-white transition-all duration-300"
              href="/contact"
            >
              CONTACT US
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
