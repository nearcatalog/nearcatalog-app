import SectionHeading from "@/components/ui/section-heading";
import { fetchAllProjects, fetchCategories, fetchProjectCategory } from "@/lib/near-catalog";
import { ProjectCategory } from "@/lib/types";
import SearchImage from "@/public/assets/images/search.webp";
import ErrorImage from "@/public/assets/images/error.webp";
import Image from "next/image";
import CategoryProjectsList from "./_components/category-projects-list";
import { BreadcrumbSchema, FaqPageSchema, SpeakableSchema } from "@/components/seo/json-ld";
import FaqSection from "@/components/seo/faq-section";
import { categoryFaqs } from "@/lib/seo/faq";
import { categoryCrumbs } from "@/lib/seo/breadcrumbs";

interface CategoryPageProps {
  params: {
    cid: string;
  };
}

export async function generateMetadata({
  params,
}: {
  params: { cid: string };
}) {
  const { cid } = await params;
  const categoryData: ProjectCategory = await fetchProjectCategory(cid);

  if (!categoryData.cat_title) {
    return {
      title: "Category Not Found",
      description: `Sorry, we could not find the category: ${cid}`,
    };
  }

  return {
    title: `${categoryData.cat_title} Projects in NEAR Catalog`,
    description:
      categoryData.cat_desc ||
      `Explore ${categoryData.cat_title} projects in the NEAR ecosystem. Discover innovative blockchain applications and tools built on NEAR Protocol.`,
    keywords: [cid, "NEAR", "NEAR Projects", categoryData.cat_title],
    openGraph: {
      title: `${categoryData.cat_title} Projects - NEAR Catalog`,
      description:
        categoryData.cat_desc ||
        `Explore ${categoryData.cat_title} projects in the NEAR ecosystem.`,
      type: "website",
      url: `https://nearcatalog.xyz/category/${cid}`,
    },
    twitter: {
      card: "summary",
      title: `${categoryData.cat_title} Projects - NEAR Catalog`,
      description:
        categoryData.cat_desc ||
        `Explore ${categoryData.cat_title} projects in the NEAR ecosystem.`,
    },
    alternates: {
      canonical: `/category/${cid}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { cid } = await params;

  if (!cid) {
    return <div>Category ID not found</div>;
  }

  const categoryData: ProjectCategory = await fetchProjectCategory(cid);
  const fetchCats = await fetchCategories();
  const allProjects = await fetchAllProjects();

  const activeProjects = Object.values(allProjects).filter(
    (project) => project.profile?.phase?.toLowerCase() !== "inactive"
  );

  const activeTags: Record<string, string> = {};
  activeProjects.forEach((project) => {
    Object.keys(project.profile.tags).forEach((key) => {
      if (!activeTags[key]) {
        activeTags[key] = project.profile.tags[key];
      }
    });
  });

  var allCategories: Record<string, string> = {};
  const priorities = ["near-intents", "near-ai", "defi"];
  
  Object.keys(fetchCats)
    .filter((cat) => activeTags[cat])
    .sort((a, b) => {
      const aPriority = priorities.indexOf(a);
      const bPriority = priorities.indexOf(b);
      if (aPriority !== -1 && bPriority !== -1) return aPriority - bPriority;
      if (aPriority !== -1) return -1;
      if (bPriority !== -1) return 1;
      return fetchCats[a].localeCompare(fetchCats[b]);
    })
    .forEach((cat) => {
      allCategories[cat] = fetchCats[cat];
    });

  if (!categoryData.cat_title) {
    return (
      <div className="my-32 flex flex-col items-center justify-center gap-4 font-medium text-[#BEBDBE]">
        <Image
          src={ErrorImage}
          alt={"Not found error"}
          width={182}
          priority
          placeholder="blur"
          height={144}
          sizes="182px"
        />
        <h2>Sorry, we could not find the category:</h2>
        <p className="text-2xl uppercase">{cid}</p>
      </div>
    );
  }

  return (
    <main className="container relative mx-auto px-4 py-12" id="top">
      {/* <Image
        className="absolute right-1/2 top-0 z-0 h-[8.8125rem] w-[13.8125rem] -translate-y-1/3 translate-x-1/2 object-cover md:right-0 md:h-[13.875rem] md:w-[21.6875rem] md:translate-x-0"
        src={SearchImage}
        alt={"Discover All Projects"}
        style={{ userSelect: "none" }}
        placeholder="blur"
        width={347}
        priority
        height={222}
        sizes="(min-width: 768px) 221px, 347px"
      /> */}
      <BreadcrumbSchema items={categoryCrumbs(cid, categoryData.cat_title)} />
      <SpeakableSchema />
      <FaqPageSchema items={categoryFaqs(cid, categoryData.cat_title, Object.values(categoryData.data || {}))} />
      <h1 className="sr-only">{categoryData.cat_title} projects on NEAR Protocol</h1>
      <div className="relative z-[1] flex flex-col gap-4">
        <div className="mx-auto flex max-w-[800px] flex-col items-center text-center">
          <SectionHeading
            title={categoryData.cat_title}
            description={categoryData.cat_desc}
          />
          <p className="answer-block mt-2 text-sm text-text-secondary" data-answer="true">
            Browse {Object.keys(categoryData.data || {}).length} {categoryData.cat_title} projects on NEAR Protocol catalogued by NEAR Catalog.
          </p>
        </div>
        
        {/* Optional: Add Featured Project placeholder here if desired in the future */}
        
        <CategoryProjectsList projects={categoryData.data} tags={allCategories} />
        <FaqSection items={categoryFaqs(cid, categoryData.cat_title, Object.values(categoryData.data || {}))} />
      </div>
    </main>
  );
}
