import site from "@/config/site";
import { FAQ_ENABLED, FaqItem } from "@/lib/seo/faq";

const BASE_URL = site.url;

export function FaqPageSchema({ items }: { items: FaqItem[] }) {
  if (!FAQ_ENABLED || items.length === 0) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NEAR Catalog",
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function SpeakableSchema({
  cssSelector = [".answer-block", ".faq-question"],
}: {
  cssSelector?: string[];
} = {}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleSchema({
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified,
}: {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: image ? [image] : undefined,
    datePublished,
    dateModified,
    author: {
      "@type": "Organization",
      name: "NEAR Catalog Editorial",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "NEAR Catalog",
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/favicon.ico` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NEAR Catalog",
    url: "https://nearcatalog.xyz",
    logo: "https://nearcatalog.xyz/favicon.ico",
    sameAs: [
      "https://x.com/nearcatalog",
      "https://github.com/nearcatalog",
      "https://t.me/nearcatalogchat"
    ],
    description: "NEAR Catalog is #1 ecosystem directory for NEAR Protocol, showcasing NEAR projects, teams, people and contributors.",
    contact: {
      "@type": "ContactPoint",
      url: "https://nearcatalog.xyz",
      contactType: "Customer Service"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProjectSchema({
  project,
  dateModified,
}: {
  project: {
    profile: {
      name: string;
      tagline: string;
      image?: { url: string };
      tags?: Record<string, string>;
    };
    slug: string;
  };
  dateModified?: string;
}) {
  const tags = project.profile.tags ? Object.keys(project.profile.tags) : [];
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.profile.name,
    description: project.profile.tagline,
    image: project.profile.image?.url || `${BASE_URL}/favicon.ico`,
    url: `${BASE_URL}/project/${project.slug}`,
    applicationCategory: "BlockchainApplication",
    operatingSystem: "Web",
    keywords: tags.join(", "),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: "NEAR Catalog",
      url: BASE_URL,
    },
  };
  if (dateModified) schema.dateModified = dateModified;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebPageSchema({ 
  title, 
  description, 
  url 
}: { 
  title: string;
  description: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: description,
    url: url,
    publisher: {
      "@type": "Organization",
      name: "NEAR Catalog",
      url: "https://nearcatalog.xyz"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
