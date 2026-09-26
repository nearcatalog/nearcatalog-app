import { fetchRelatedProjects } from "@/lib/near-catalog";
import Image from "next/image";
import ErrorImage from "@/public/assets/images/error.webp";
import DiscoverMoreList from "./discover-more-list";

interface DiscoverMoreProps {
  pid: string;
}

export default async function DiscoverMore({ pid }: DiscoverMoreProps) {
  const relatedProjects = await fetchRelatedProjects(pid);

  if (!relatedProjects) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 font-medium text-[#BEBDBE]">
        <Image
          src={ErrorImage}
          alt={"Not found error"}
          width={182}
          placeholder="blur"
          height={144}
        />
        <h2>Sorry, we could not find the results for:</h2>
        <p className="text-2xl uppercase">{pid}</p>
      </div>
    );
  }
  
  return <DiscoverMoreList relatedProjects={relatedProjects} />;
}
