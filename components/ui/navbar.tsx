"use client";

import GradientButton from "@/components/ui/gradient-button";
import Link from "next/link";
import { useState } from "react";

type Route = {
  name: string;
  href: string;
};

const routes: Route[] = [
  // {
  //   name: "🏠 Ecosystem",
  //   href: "/",
  // },
  {
    name: "🔥 Trending",
    href: "/trending",
  },
  {
    name: '<image src="https://indexer.nearcatalog.org/wp-content/uploads/2024/12/near-icon.webp" alt="NEAR Intents" class="w-6 h-6 inline-block mr-2"> NEAR Intents ',
    href: "/category/near-intents",
  },
  // {
  //   name: '<img src="https://indexer.nearcatalog.org/wp-content/uploads/2024/12/aurora-icon.webp" alt="Aurora Virtual Chain" class="inline-block w-6 h-6 mr-2" /> Virtual Chain',
  //   href: "/category/aurora-virtual-chain",
  // },
    {
    name: '😎 Awesome NEAR',
    href: "/awesome-near",
  },
  {
    name: "🌐 Ecosystem Map",
    href: "/map",
  },
  {
    name: "👷‍♀️ People",
    href: "/people",
  }
];

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);


  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <nav id="narbar" className="navbar sticky top-0 z-20 bg-black/60 backdrop-blur-sm z-50">
        <div className="container mx-auto flex h-16 items-center justify-between gap-2 px-5 md:h-20 md:py-4">
          <Link
            href="/"
            onClick={() => {
              isOpen && toggleDropdown();            }}
            className="md:base min-w-max flex-1 text-base font-bold text-white lg:text-xl"
          >
            📒NEARCatalog
          </Link>

          <div className="mx-auto hidden items-center gap-1 md:flex md:gap-2">
            {routes.map((route, index) => (
              <Link
                key={index}
                href={route.href}
                className="url rounded-full px-2 py-1 text-center font-medium text-white transition-colors duration-300 ease-in-out hover:bg-[#1A1A17] focus:bg-[#282828] lg:px-4 lg:py-2"
                dangerouslySetInnerHTML={{ __html: route.name }}
              />
            ))}
          </div>

          <div className="hidden min-w-max flex-1 shrink-0 items-center justify-end gap-2 md:flex">
            <GradientButton
              target="_blank"
              href={"https://submit.nearcatalog.org"}
              className="btn-submit-project"
            >
              Submit project
            </GradientButton>

            <Link
              aria-label="Search"
              href="/search"
              className="bg=[#1A1A17] hidden h-10 items-center gap-2 rounded-full border border-gray-400 px-4 py-2 text-white transition-colors duration-300 ease-in-out hover:bg-[#2b2d3a] md:flex"
            >
              <i className="bi bi-search flex items-center justify-center text-lg text-white" />
              <span className="hidden lg:block">Search</span>
            </Link>

          </div>

          <div className="align-center flex items-center justify-center gap-4 md:hidden">
            <button className="mr-3" aria-label="Toggle Menu" onClick={toggleDropdown}>
              {isOpen ? (
                <i className="bi bi-x flex items-center justify-center text-3xl text-white" />
              ) : (
                <i className="bi bi-list flex items-center justify-center text-3xl text-white" />
              )}
            </button>

            <Link
              aria-label="Search"
              href="/search"
              className="flex items-center text-white"
            >
              <i className="bi bi-search flex items-center justify-center text-lg" />
            </Link>

          </div>
        </div>
      </nav>
      <div
        className={`fixed ${isOpen ? "max-h-screen" : "invisible max-h-0"} left-0 top-0 z-10 h-screen w-full overflow-y-auto bg-black transition-all duration-300 ease-out md:hidden`}
      >
        <div
          className={`mt-14 ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"} m-4 flex flex-col items-center gap-6 transition-all duration-300 ease-in-out`}
        >
          {routes.map((route, index) => (
            <Link
              key={index}
              href={route.href}
              onClick={() => {
               isOpen && toggleDropdown(); 
              }}
              className="url rounded-full px-2 py-1 text-center font-medium text-white transition-colors duration-300 ease-in-out hover:bg-[#1A1A17] focus:bg-[#282828] lg:px-4 lg:py-2"
              dangerouslySetInnerHTML={{ __html: route.name }}
            />
          ))}

          <GradientButton
            key="submit"
            onClick={() => setIsOpen(false)}
            target="_blank"
            href={"https://submit.nearcatalog.org"}
            className="btn-submit-project"
          >
            Submit Project
          </GradientButton>
        </div>
      </div>
    </>
  );
}
