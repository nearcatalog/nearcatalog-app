import { fetchProject } from "@/lib/near-catalog";
import Image from "next/image";
import DiscoverMore from "./_components/discover-more";
import LinkTree from "./_components/linktree";
import PriceInfo from "./_components/price-info";
import ProjectHeader from "./_components/project-header";
import TokenInfo from "./_components/token-info";
import SocialsEmbed from "./_components/socials-embed";
import Markdown from "react-markdown";
import ErrorImage from "@/public/assets/images/error.webp";
import remarkGfm from "remark-gfm";
import { ProjectSchema } from "@/components/seo/json-ld";

interface ProjectPageProps {
  params: {
    pid: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { pid } = await params;
  const projectData = await fetchProject(pid);

  if (!projectData) {
    return (
      <div className="my-32 flex flex-col items-center justify-center gap-4 font-medium text-[#BEBDBE]">
        <Image
          src={ErrorImage}
          alt={"Not found error"}
          width={182}
          height={144}
          placeholder="blur"
        />
        <h2>Sorry, we could not find the results for:</h2>
        <p className="text-2xl uppercase">{pid}</p>
      </div>
    );
  }

  const { profile } = projectData;

  const phaseRaw = profile?.phase, phaseKey = (phaseRaw || "").toLowerCase();

  const phaseStyles: Record<string, string> = {
    "mainnet": "bg-emerald-500/20 text-emerald-400",
    "still building": "bg-amber-500/20 text-amber-400",
    "inactive": "bg-gray-500/20 text-gray-400",
  };

  const formatPhase = (p?: string) =>
    p
      ? p
        .split(/\s+/)
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ")
      : "";
  const tokenTicket = profile.tokens ? Object.keys(profile.tokens)[0] : false;
  const tokenInfo =
    tokenTicket && profile.tokens ? profile.tokens[tokenTicket] : {};

  return (
    <main id="project-detail" className="container mx-auto my-4 flex flex-col gap-4 px-4 lg:my-12">
      <ProjectSchema project={projectData} />
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <ProjectHeader projectData={projectData} />
        <LinkTree project={projectData} />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-8">
          <div className="rounded-lg bg-[#1b1d2a] p-4">
            <h2 className="flex flex-wrap items-center gap-3 min-w-0 mb-3 text-xl font-bold">
              About {profile.name}
              {phaseRaw && (
                <div
                  className={`flex items-center gap-2 rounded-full px-3 py-1 shrink-0 ${phaseStyles[phaseKey] || "bg-slate-500/20 text-slate-400"
                    }`}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-current"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
                  </span>
                  <span className="text-sm font-medium">
                    {formatPhase(phaseRaw)}
                  </span>
                </div>
              )}
            </h2>
            <div id="project-content" className="prose prose-invert min-h-[15.625rem] max-w-none">
              <Markdown remarkPlugins={[remarkGfm]}>
                {profile?.description}
              </Markdown>
            </div>
          </div>
          <DiscoverMore pid={pid} />
        </div>
        <div id="project-rightside" className="flex flex-col gap-4 lg:col-span-4">
          <PriceInfo tokenInfo={tokenInfo} name={profile.name} />
          <TokenInfo tokenInfo={tokenInfo} />
          <SocialsEmbed linktree={profile?.linktree} />
        </div>
      </div>
    </main>
  );
}
