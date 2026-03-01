"use client";
import Image from "next/image";
import "./banner.css" 

import { useState } from "react";

type BannerType = "text" | "image";

interface BannerProps {
  type?: BannerType;
}

export default function Banner({ type = "text" }: BannerProps) {
    const [bannerVisible, setBannerVisible] = useState(true);
    
    if (!bannerVisible) return null;

    return (
      <div id="near-event">
        {type === "text" ? (
          <div className="near-event-banner near-event-banner-text" style={{background: "linear-gradient(90deg, #65D56E 0%, #59C2E8 50%, #F98372 75%, #F1B139 100%)"}}> 
            <div className="w-full" style={{ opacity: 1 }}>
              <div className="block w-full mx-auto max-w-[1480px]">
                <div className="px-3 md:px-28 py-2 md:py-1 flex flex-row items-center justify-between gap-3">
                  <div className="flex-grow flex flex-col md:flex-row md:items-center justify-start md:justify-between gap-2 md:gap-6">
                    <h3 className="text-black text-sm md:text-base form-label-m text-center md:text-left">
                      NEARCON, the flagship gathering of the NEAR ecosystem, February 23–24 in San Francisco
                    </h3>
                    <a
                      target="_blank"
                      className="animated-text-hover group relative block overflow-hidden font-grotesk text-xs md:text-base leading-normal no-underline transform transition-all duration-150 text-white font-medium rounded px-2 py-1 md:py-2 bg-black shrink-0 mx-auto md:mr-0 md:ml-auto text-center"
                      rel="noopener noreferrer"
                      href="https://nearcon.org/"
                    >
                      <div className="relative md:pl-2">
                        <span className="anim-characters-span block py-0 md:py-1 pr-1 md:pr-2 relative transition-all duration-300 delay-150" aria-label="NEARCON 2026">
                          NEARCON 2026
                        </span>
                      </div>
                    </a>
                  </div>
                  <button
                    onClick={() => setBannerVisible(false)}
                    className="p-1 md:py-2 md:px-6 flex justify-center items-center relative bg-transparent border-none cursor-pointer text-white"
                    aria-label="Close"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" className="block">
                      <path d="M204.24,195.76a6,6,0,1,1-8.48,8.48L128,136.49,60.24,204.24a6,6,0,0,1-8.48-8.48L119.51,128,51.76,60.24a6,6,0,0,1,8.48-8.48L128,119.51l67.76-67.75a6,6,0,0,1,8.48,8.48L136.49,128Z"></path>
                    </svg>
                    <span className="sr-only">Close</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="near-event-banner near-event-banner-image">
            <button
              className=""
              style={{
                position: "absolute",
                top: "-15px",
                right: "0",
                background: "black",
                border: "none",
                color: "#00EC97",
                fontSize: "12px",
                cursor: "pointer",
                zIndex: 9999999,
                fontWeight: "bold",
              }}
              onClick={() => setBannerVisible(false)}
            >
              [&times;]
            </button>
            <a
              href="https://onetrillionagents.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="One Trillion Agents Hackathon - Bring order to chaos. Buidl the resistance"
            >
              <Image
                src="https://indexer.nearcatalog.org/wp-content/uploads/2025/01/nearaihackathon.jpeg"
                alt="One Trillion Agents Hackathon - Bring order to chaos. Buidl the resistance"
                width={1200}
                height={400}
              />
            </a>
          </div>
        )}
      </div>
    );
}
