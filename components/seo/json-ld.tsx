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
  project 
}: { 
  project: { 
    profile: { 
      name: string; 
      tagline: string; 
      image?: { url: string };
      tags?: Record<string, string>;
    }; 
    slug: string;
  } 
}) {
  const tags = project.profile.tags ? Object.keys(project.profile.tags) : [];
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.profile.name,
    description: project.profile.tagline,
    image: project.profile.image?.url || "https://nearcatalog.xyz/favicon.ico",
    url: `https://nearcatalog.xyz/project/${project.slug}`,
    applicationCategory: "BlockchainApplication",
    operatingSystem: "Web",
    keywords: tags.join(", "),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
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
