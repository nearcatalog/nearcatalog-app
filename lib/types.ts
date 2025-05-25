export type ProjectId = string;

export type ProjectProfile = {
  name: string;
  tagline: string;
  description: string;
  image: {
    url: string;
  };
  dapp: string;
  linktree: {
    website: string;
    github: string;
    twitter: string;
    medium: string;
    discord: string;
    telegram: string;
    potlock:string;
  };
  lnc: {
    slug: string;
    score: number;
  };
  tags: Record<string, string>;
  tokens: any;
};

export type ProjectRecord = {
  slug: ProjectId;
  profile: ProjectProfile;
};

export type ProjectCategory = {
  cat_title: string;
  cat_desc: string;
  cat_slug: string;
  data: Record<ProjectId, ProjectRecord>;
};


export type NewsType = {
  id?: string;
  title?: string;  
  description: string;
  imageUrl?: string;
  url?: string;
  date?: string; 
}

export type Person = {
  name: string;
  email?: string;
  preferredContact: string;
  telegram?: string;
  discord?: string;
  twitter?:string;
  website?:string;
  organization: string;
  team?: string;
  avatar?: string;
  jobTitle?: string;
  description?:string;
};
