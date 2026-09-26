import { Metadata } from "next";
import { Person } from "@/lib/types";
import { fetchPeopleData } from "@/lib/near-catalog";

export const revalidate = 14400; // 4 hours

export const metadata: Metadata = {
  title: "People on NEAR Directory",
  description:
    "Connect with teams, members and organizations across the NEAR ecosystem",
  alternates: { canonical: "/people" },
};

import PeopleDirectory from "@/components/people/people-directory";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { peopleCrumbs } from "@/lib/seo/breadcrumbs";

const fetchedPeople: Person[] = await fetchPeopleData();

export default function PeoplePage() {
    return (
      <>
        <BreadcrumbSchema items={peopleCrumbs()} />
        <PeopleDirectory peopleData={fetchedPeople} />
      </>
    );
}