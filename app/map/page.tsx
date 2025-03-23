//full screen responsive iframe 

import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "NEAR Protocol Ecosystem Map",
  description:
    "Explore the NEAR Protocol ecosystem map, powered by NEARCatalog & Shitzu.",
};


export default function EcosystemMapIframe() {
  return (
    <div>
      <iframe
        src="https://nearprotocol.eco"
        width="100%"
        height="1500px"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
}