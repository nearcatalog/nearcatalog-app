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
      <NewsHomeSection/>
      {/* <EcosystemSupport /> */}
      <Discover />
    </main>
  );
}
