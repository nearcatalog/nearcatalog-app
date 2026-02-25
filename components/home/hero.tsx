// import HomeStats from "@/components/home/stats";
import GradientButton from "@/components/ui/gradient-button";
import HomeImages from "@/components/home/images";
import SearchInput from "../search-input";
import Discover from "./discover";

export default function HomeHero() {
  return (
    <>
      <section id="home-hero" className="container relative z-[5] mx-auto mt-16 mb-0 flex flex-col items-center justify-center gap-6 sm:my-8">
        <HomeImages />
        <h1 className="z-[5] text-balance text-center text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-white">
          Discover NEAR Ecosystem
        </h1>
        {/* <HomeStats /> */}
        <GradientButton
          target="_blank"
          href={"https://submit.nearcatalog.org"}
          className="z-[5] btn-submit-project"
        >
          Submit project
        </GradientButton>
      </section>
    </>
  );
}
