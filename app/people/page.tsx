import { Metadata } from "next";
import { Person } from "@/lib/types";
import { fetchPeopleData } from "@/lib/near-catalog";

export const revalidate = 14400; // 4 hours

export const metadata: Metadata = {
  title: "People on NEAR Directory",
  description:
    "Connect with teams, members and organizations across the NEAR ecosystem",
};

import PeopleDirectory from "@/components/people/people-directory";



const fetchedPeople: Person[] = await fetchPeopleData();

export default function PeoplePage() {
    return <PeopleDirectory peopleData={fetchedPeople} />;
}