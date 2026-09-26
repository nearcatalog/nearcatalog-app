import { Suspense } from "react";
import HomeHero from "@/components/home/hero";
// import EcosystemSupport from "@/components/home/ecosystem";
import HotProjects from "@/components/home/hot-projects";
import Discover from "@/components/home/discover";
import NewsHomeSection from "@/components/home/news-section";

export default function Home() {

  return (
    <main className="relative flex flex-col items-center">
      <HomeHero />
      <HotProjects />
      <Suspense fallback={<div className="h-20 w-full" />}>
        <NewsHomeSection />
      </Suspense>
      {/* <EcosystemSupport /> */}
      <Discover />
    </main>
  );
}
