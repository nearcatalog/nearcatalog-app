//full screen responsive iframe 

import React from 'react';
import { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/json-ld';
import { mapCrumbs } from '@/lib/seo/breadcrumbs';

export const metadata: Metadata = {
  title: "NEAR Protocol Ecosystem Map",
  description:
    "Explore the NEAR Protocol ecosystem map, powered by NEARCatalog & Shitzu.",
  alternates: { canonical: "/map" },
};


export default function EcosystemMapIframe() {
  return (
    <div>
      <BreadcrumbSchema items={mapCrumbs()} />
      <h1 className="sr-only">NEAR Protocol Ecosystem Map</h1>
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