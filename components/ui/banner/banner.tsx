"use client";

import "./banner.css" 

import { useState } from "react";

export default function Banner() {
    const [bannerVisible, setBannerVisible] = useState(true);
    
    return (
        bannerVisible && (
          <>
            <div id="near-event">
              <div className="near-event-banner">
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
                  onClick={() => {
                    console.log("set banner hide: ", bannerVisible);
                    setBannerVisible(false);
                  }}
                >
                  [&times;]
                </button>
                <a
                  href="https://1t-agents.devpost.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="One Trillion Agents Hackathon - Bring order to chaos. Buidl the resistance"
                >
                  <img
                    src="https://indexer.nearcatalog.xyz/wp-content/uploads/2025/01/nearaihackathon.jpeg"
                    alt="One Trillion Agents Hackathon - Bring order to chaos. Buidl the resistance"
                  />
                </a>
              </div>
            </div>
          </>
        )
      );
}
