"use client";
import { useState } from "react";
import SectionHeading from "@/components/ui/section-heading";
import { Person } from "@/lib/types";
import Image from "next/image";

function PeopleDirectory({ peopleData }: { peopleData: Person[] }) {
    // Define priority organizations (order matters - first in array has highest priority)
    const priorityOrgs = ["NEAR Foundation", "NEAR Dev"];

    // First randomize the whole list, then sort to show priority organizations first
    const peopleData1 = [...peopleData]
        .sort(() => Math.random() - 0.5) // Random shuffle first
        .sort((a, b) => {
            // Check priority level for person A
            let aPriority = -1;
            if (a.organization) {
                const aOrgs = a.organization.split(",").map(org => org.trim());
                for (let i = 0; i < priorityOrgs.length; i++) {
                    if (aOrgs.some(org => org.toLowerCase().includes(priorityOrgs[i].toLowerCase()))) {
                        aPriority = i;
                        break;
                    }
                }
            }

            // Check priority level for person B
            let bPriority = -1;
            if (b.organization) {
                const bOrgs = b.organization.split(",").map(org => org.trim());
                for (let i = 0; i < priorityOrgs.length; i++) {
                    if (bOrgs.some(org => org.toLowerCase().includes(priorityOrgs[i].toLowerCase()))) {
                        bPriority = i;
                        break;
                    }
                }
            }

            // Sort by priority (lower index = higher priority)
            if (aPriority !== -1 && bPriority !== -1) {
                return aPriority - bPriority; // Both have priority, sort by priority order
            } else if (aPriority !== -1 && bPriority === -1) {
                return -1; // A has priority, B doesn't
            } else if (aPriority === -1 && bPriority !== -1) {
                return 1; // B has priority, A doesn't
            }
            return 0; // Neither has priority, keep random order
        });

    const [searchQuery, setSearchQuery] = useState("");
    const [filterOrganization, setFilterOrganization] = useState<string>("All Organizations");

    // Get unique organizations for filter dropdown, handling comma-separated values
    const allOrganizations = new Set<string>();
    allOrganizations.add("All Organizations");

    peopleData1.forEach(person => {
        if (person.organization) {
            // Split organization by comma and trim whitespace
            const orgs = person.organization.split(",").map(org => org.trim());
            orgs.forEach(org => {
                if (org) allOrganizations.add(org);
            });
        }
    });

    const organizations = Array.from(allOrganizations);

    const filteredPeople = peopleData1.filter(person => {
        const matchesSearch =
            (person.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (person.jobTitle?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (person.email?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (person.team?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (person.description?.toLowerCase() || "").includes(searchQuery.toLowerCase());

        // For organization filtering, check if any of the person's organizations match the filter
        let matchesOrganization = filterOrganization === "All Organizations";

        if (!matchesOrganization && person.organization) {
            const personOrgs = person.organization.split(",").map(org => org.trim());
            matchesOrganization = personOrgs.includes(filterOrganization);
        }

        return matchesSearch && matchesOrganization;
    });

    // Function to display organizations with proper formatting
    const formatOrganizations = (orgString: string) => {
        return orgString.split(',').map(org => org.trim()).join(', ');
    };

    return (
        <section className="container mx-auto my-16 px-4">
            <SectionHeading
                title="People on NEAR Directory"
                description="Connect with teams, members and organizations across the NEAR ecosystem"
            />

            <div className="mb-8 mt-6 flex flex-col gap-4 sm:flex-row">
                {/* Search input */}
                <div className="relative flex-grow">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <i className="bi bi-search text-[#80E9E5]"></i>
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-full border-2 border-[#80E9E5] bg-black p-4 pl-10 text-sm text-white focus:border-[#80E9E5] focus:outline-none"
                        placeholder="Search by name, title, description, or team..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Organization filter dropdown */}
                <div className="relative w-full sm:w-64">
                    <select
                        className="block w-full appearance-none rounded-full border-2 border-[#80E9E5] bg-black p-4 pl-5 pr-10 text-sm text-white focus:border-[#80E9E5] focus:outline-none"
                        value={filterOrganization}
                        onChange={(e) => setFilterOrganization(e.target.value)}
                    >
                        {organizations.map(org => (
                            <option key={org} value={org}>{org}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                        <i className="bi bi-chevron-down text-[#80E9E5]"></i>
                    </div>
                </div>
            </div>

            <div className="mb-8 flex items-center justify-center">
                <a
                    href="https://submit.nearcatalog.org/people-on-near/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#80E9E5] to-[#52DCD4] px-4 py-2 text-sm font-medium text-black transition-transform hover:scale-105"
                >
                    <i className="bi bi-plus-circle mr-2"></i>
                    New Submission
                </a>
            </div>

            {/* People cards grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPeople.map((person, index) => (
                    <div
                        key={index}
                        className="flex flex-col rounded-lg border-2 border-[#80E9E5] bg-[#1b1d2a] p-6 transition-all hover:scale-[1.01]"
                    >
                        <div className="mb-4 flex items-center gap-3">
                            {/* Avatar with fallback */}
                            <div className="relative h-16 w-16 overflow-hidden rounded-full">
                                {person.avatar ? (
                                    <Image
                                        src={person.avatar}
                                        alt={`${person.name}'s avatar`}
                                        className="h-full w-full object-cover"
                                        width={64}
                                        height={64}
                                        unoptimized
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-[#2a2d3e] text-[#80E9E5]">
                                        <span className="text-2xl font-bold">
                                            {person.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">{person.name}</h3>
                                <p className="text-lg font-medium text-[#80E9E5]">{person.jobTitle}</p>
                            </div>
                        </div>
                        {
                            person.description && <p className="mb-1 text-sm text-gray-300">{person.description}</p>
                        }
                        {
                            person.team && <p className="mb-1 text-sm text-gray-300">Team: {person.team}</p>
                        }
                        {/* Format organizations display */}
                        <p className="mb-1 text-sm text-gray-300">
                            Organization{person.organization?.includes(',') ? 's' : ''}: {person.organization ? formatOrganizations(person.organization) : 'N/A'}
                        </p>
                        {
                            person.preferredContact && <p className="mb-1 text-sm text-gray-300">Preferred Contact: {person.preferredContact}</p>
                        }

                        <div className="mt-4 flex flex-col gap-2">
                            {person.email && (
                                <a
                                    href={`mailto:${person.email}`}
                                    className="flex items-center gap-2 text-white hover:text-[#80E9E5]"
                                >
                                    <i className="bi bi-envelope text-[#80E9E5]"></i>
                                    <span className="text-sm">{person.email}</span>
                                </a>
                            )}

                            {person.telegram && (
                                <a
                                    href={person.telegram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-white hover:text-[#80E9E5]"
                                >
                                    <i className="bi bi-telegram text-[#80E9E5]"></i>
                                    <span className="text-sm">Telegram</span>
                                </a>
                            )}

                            {person.twitter && (
                                <a
                                    href={person.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-white hover:text-[#80E9E5]"
                                >
                                    <i className="bi bi-twitter-x text-[#80E9E5]"></i>
                                    <span className="text-sm">Twitter</span>
                                </a>
                            )}

                            {person.discord && (
                                <a
                                    href={person.discord}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-white hover:text-[#80E9E5]"
                                >
                                    <i className="bi bi-discord text-[#80E9E5]"></i>
                                    <span className="text-sm">Discord</span>
                                </a>
                            )}

                            {person.website && (
                                <a
                                    href={person.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-white hover:text-[#80E9E5]"
                                >
                                    <i className="bi bi-globe text-[#80E9E5]"></i>
                                    <span className="text-sm">Website</span>
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {filteredPeople.length === 0 && (
                <div className="mt-10 text-center">
                    <p className="text-lg text-gray-400">No team members found matching your search.</p>
                </div>
            )}
        </section>
    );
}

export default function PeoplePage({ peopleData }: { peopleData: Person[] }) {
    return <PeopleDirectory peopleData={peopleData} />;
}