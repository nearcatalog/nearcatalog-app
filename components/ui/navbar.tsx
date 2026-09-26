"use client";

import GradientButton from "@/components/ui/gradient-button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  CyberBook,
  CyberFire,
  CyberNear,
  CyberGlasses,
  CyberGlobe,
  CyberPeople,
  CyberMenu,
  CyberClose,
} from "@/components/icons/cyber-icons";

type Route = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

const routes: Route[] = [
  {
    name: "Trending",
    href: "/trending",
    icon: <CyberFire className="h-6 w-6 text-accent-primary" />,
  },
  {
    name: "NEAR Intents",
    href: "/category/near-intents",
    icon: <CyberNear className="h-6 w-6 text-accent-primary" />,
  },
  {
    name: "Awesome NEAR",
    href: "/awesome-near",
    icon: <CyberGlasses className="h-6 w-6 text-accent-primary" />,
  },
  {
    name: "People",
    href: "/people",
    icon: <CyberPeople className="h-6 w-6 text-accent-primary" />,
  },
  {
    name: "[ Bio ]",
    href: "https://bio.nearcatalog.xyz/",
    icon: (
      <div className="relative">
        <CyberGlobe className="h-6 w-6 text-accent-primary transition-transform duration-500 group-hover:rotate-180" />
        <span className="absolute -right-1 -top-1 flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00FFA3] opacity-75"></span>
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00FFA3] shadow-[0_0_6px_#00FFA3]"></span>
        </span>
      </div>
    ),
  },
];

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <header className="sticky top-0 z-[100] w-full border-b border-white/5 bg-black/75 backdrop-blur-md">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-12">
              <Link className="group flex items-center gap-2.5" href="/">
                <div className="rounded-[4px] bg-[#00FFA3] px-3 py-1.5 shadow-[0_0_20px_rgba(0,255,163,0.4)]">
                  <span className="text-xs font-black uppercase tracking-tighter text-black">
                    NEAR Catalog
                  </span>
                </div>
              </Link>
              <nav className="hidden items-center gap-10 xl:flex">
                {routes.map((route, index) => (
                  <Link
                    key={index}
                    href={route.href}
                    target={
                      route.href.startsWith("http") ? "_blank" : undefined
                    }
                    className={`relative flex items-center font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/90 transition-colors hover:text-white ${route.name === "[ Bio ]" ? "text-[#00FFA3] hover:text-[#00FFA3]" : ""}`}
                  >
                    <span
                      className={
                        route.name === "[ Bio ]" ? "animate-pulse" : ""
                      }
                    >
                      {route.name}
                    </span>
                    {route.name === "[ Bio ]" && (
                      <span className="absolute -right-2.5 -top-1 flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00FFA3] opacity-75"></span>
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00FFA3] shadow-[0_0_6px_#00FFA3]"></span>
                      </span>
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="hidden flex-1 items-center justify-end gap-6 xl:flex">
              <a
                href="https://submit.nearcatalog.xyz"
                target="_blank"
                rel="noreferrer"
                className="secondary-btn"
              >
                SUBMIT PROJECT
              </a>
              <button
                className="search-input group relative flex w-48 !max-w-[200px] cursor-pointer items-center !pl-10 text-left text-white/50 transition-all hover:border-accent-primary hover:text-white"
                onClick={() => router.push("/search")}
                aria-label="Search System"
              >
                <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center">
                  <i className="bi bi-search text-xs text-accent-primary/50 transition-all group-hover:text-accent-primary group-hover:drop-shadow-[0_0_8px_rgba(0,255,163,0.8)]"></i>
                </div>
                <span className="truncate font-mono text-[11px] tracking-wider">
                  SEARCH_SYSTEM...
                </span>
              </button>
            </div>

            <div className="flex items-center gap-3 xl:hidden">
              <Link
                aria-label="Search"
                href="/search"
                className="text-white/60 transition-colors hover:text-white"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </Link>

              <button
                className="flex h-10 w-10 items-center justify-center rounded-[4px] border border-accent-primary/20 bg-accent-primary/5 text-accent-primary transition-all hover:border-accent-primary hover:shadow-[0_0_15px_rgba(0,255,163,0.3)]"
                aria-label="Toggle Menu"
                onClick={toggleDropdown}
              >
                <CyberMenu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[110] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md transition-all duration-500 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-6 top-6 rounded-[4px] border border-accent-primary/20 bg-accent-primary/5 p-2 text-accent-primary transition-colors hover:text-white"
        >
          <CyberClose className="h-6 w-6" />
        </button>

        <div className="mx-auto w-full max-w-4xl px-4 text-center">
          <div className="cockpit-panel mb-6 inline-block w-full max-w-sm border border-accent-primary/20 px-6 py-10 shadow-[0_0_40px_rgba(0,255,163,0.05)]">
            <div className="mb-8 flex items-center justify-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-primary shadow-[0_0_10px_#00FFA3]"></span>
              </span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-accent-primary">
                NEAR CATALOG
              </span>
            </div>

            <div className="mb-8 flex w-full flex-col items-center gap-2">
              {routes.map((route, index) => (
                <Link
                  key={index}
                  href={route.href}
                  target={route.href.startsWith("http") ? "_blank" : undefined}
                  onClick={() => setIsOpen(false)}
                  className="group flex w-full items-center justify-center gap-3 border border-white/10 bg-transparent p-4 transition-all duration-300 hover:border-accent-primary hover:text-accent-primary hover:shadow-[0_0_15px_rgba(0,255,163,0.2)] active:scale-[0.98]"
                >
                  <div className="text-accent-primary">{route.icon}</div>
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors group-hover:text-accent-primary">
                    {route.name}
                  </span>
                </Link>
              ))}
            </div>

            <div className="w-full">
              <a
                href="https://submit.nearcatalog.xyz"
                target="_blank"
                rel="noreferrer"
                className="block w-full border border-[#FF6B00] py-3 text-center font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6B00] transition-all duration-300 hover:bg-[#FF6B00]/10 hover:shadow-[0_0_15px_rgba(255,107,0,0.2)] active:scale-[0.98]"
                onClick={() => setIsOpen(false)}
              >
                Submit Project
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
