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
import { ArticleSchema, BreadcrumbSchema, FaqPageSchema, ProjectSchema, SpeakableSchema } from "@/components/seo/json-ld";
import FaqSection from "@/components/seo/faq-section";
import { projectFaqs } from "@/lib/seo/faq";
import { projectCrumbs } from "@/lib/seo/breadcrumbs";
import { projectDateModified, toIsoDate } from "@/lib/seo/date-modified";
import site from "@/config/site";
import ImageWithFallback from "@/components/ImageWithFallback";

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

  const dateModified = projectDateModified(projectData);
  const dateModifiedIso = toIsoDate(dateModified);
  const canonicalUrl = `${site.url}/project/${projectData.slug}`;
  const plainBody = (profile.description || "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^\)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^\)]*\)/g, "$1")
    .replace(/[#>*_~\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 500);
  const faqs = projectFaqs(projectData);

  return (
    <main id="project-detail" className="container mx-auto my-4 flex flex-col gap-4 px-4 lg:my-12">
      <ProjectSchema project={projectData} dateModified={dateModifiedIso} />
      <ArticleSchema
        headline={`What is ${profile.name}?`}
        description={plainBody || profile.tagline}
        url={canonicalUrl}
        image={profile.image?.url}
        datePublished={dateModifiedIso}
        dateModified={dateModifiedIso}
      />
      <SpeakableSchema />
      <BreadcrumbSchema items={projectCrumbs(projectData)} />
      <FaqPageSchema items={faqs} />
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-stretch mb-8">
        <ProjectHeader projectData={projectData} />
        <LinkTree project={projectData} />
      </div>

      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[7fr_3fr]">
        <div className="flex flex-col gap-6 lg:col-start-1 lg:row-start-1">
          <div className="relative overflow-hidden rounded-sm bg-bg-base border border-border-default p-6">
            {/* Ambient Backdrop */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.15] saturate-100">
              <ImageWithFallback
                src={profile.image?.url}
                alt={profile.name}
                fill
                className="object-cover blur-3xl scale-150"
              />
            </div>

            <div className="relative z-10">
              <h2 className="flex flex-wrap items-center justify-center lg:justify-start gap-3 min-w-0 mb-4 text-xl font-black tracking-tight text-white">
                What is {profile.name}?
                {phaseRaw && (
                  <div
                    className={`flex items-center gap-1.5 rounded-sm border px-1.5 py-0 shrink-0 opacity-90 ${phaseStyles[phaseKey] || "border-slate-500 text-slate-400"
                      }`}
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full opacity-75 bg-current"></span>
                      <span className="relative inline-flex h-1.5 w-1.5 bg-current"></span>
                    </span>
                    <span className="text-[9px] font-bold tracking-widest cyber-mono uppercase">
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
          </div>
        </div>

        <div id="project-rightside" className="flex flex-col gap-6 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-6 lg:self-start">
          <PriceInfo tokenInfo={tokenInfo} name={profile.name} />
          <TokenInfo tokenInfo={tokenInfo} />
          <SocialsEmbed linktree={profile?.linktree} />
          
          <a
            href={`https://submit.nearcatalog.xyz/feedback/?pid=${projectData.slug}&pname=${profile.name}&title=${profile.name}`}
            target="_blank"
            rel="noreferrer nofollow"
            className="flex items-center justify-center gap-2 rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white/70 transition-all hover:bg-white/10 hover:text-accent-primary hover:border-accent-primary/50"
          >
            <i className="bi bi-flag"></i>
            <span>Suggest Edits / Report</span>
          </a>
        </div>

        <div className="w-full lg:col-start-1 lg:row-start-2">
          <DiscoverMore pid={pid} />
        </div>
      </div>
      <FaqSection items={faqs} />
    </main>
  );
}
