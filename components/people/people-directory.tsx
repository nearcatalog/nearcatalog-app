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

            <div className="mb-12 mt-8 flex flex-col gap-6">
                {/* Search & Filter Row */}
                <div className="flex flex-col gap-4 lg:flex-row">
                    <div className="relative flex-grow group">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                            <i className="bi bi-search text-accent-primary group-focus-within:drop-shadow-[0_0_8px_rgba(0,255,163,0.5)]"></i>
                        </div>
                        <input
                            type="text"
                            className="block w-full border border-border-default bg-bg-surface p-4 pl-12 text-sm text-white cyber-mono focus:border-accent-primary focus:outline-none transition-all placeholder:text-text-secondary/50 uppercase tracking-widest"
                            placeholder="SEARCH PEOPLE..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="relative w-full lg:w-72 group">
                        <select
                            className="block w-full appearance-none border border-border-default bg-bg-surface p-4 pl-5 pr-12 text-[10px] font-black uppercase tracking-widest text-white cyber-mono focus:border-accent-primary focus:outline-none transition-all"
                            value={filterOrganization}
                            onChange={(e) => setFilterOrganization(e.target.value)}
                        >
                            {organizations.map(org => (
                                <option key={org} value={org} className="bg-bg-base text-white">{org.toUpperCase()}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                            <i className="bi bi-chevron-down text-accent-primary group-focus-within:drop-shadow-[0_0_8px_rgba(0,255,163,0.5)]"></i>
                        </div>
                    </div>
                </div>

                {/* Submission Action */}
                <div className="flex items-center justify-center">
                    <a
                        href="https://submit.nearcatalog.xyz/people-on-near/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 border border-accent-primary bg-accent-primary/10 px-8 py-3 text-sm font-black uppercase tracking-[0.25em] text-accent-primary transition-all hover:bg-accent-primary hover:text-black hover:shadow-[0_0_20px_rgba(0,255,163,0.4)] cyber-mono"
                    >
                        <i className="bi bi-plus-lg"></i>
                        NEW SUBMISSION
                    </a>
                </div>
            </div>

            {/* People cards grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPeople.map((person, index) => (
                    <div
                        key={index}
                        className="group flex flex-col border border-border-default bg-bg-surface p-6 transition-all duration-300 hover:border-accent-primary hover:shadow-[0_0_15px_rgba(0,255,163,0.15)]"
                    >
                        <div className="mb-6 flex items-center gap-4">
                            {/* Avatar with fallback */}
                            <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-border-default bg-bg-base shrink-0 shadow-lg">
                                {person.avatar ? (
                                    <Image
                                        src={person.avatar}
                                        alt={`${person.name}'s avatar`}
                                        className="h-full w-full object-cover"
                                        width={80}
                                        height={80}
                                        unoptimized
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-bg-surface text-accent-primary">
                                        <span className="text-3xl font-black cyber-mono">
                                            {person.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="overflow-hidden flex flex-col gap-1">
                                <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-accent-primary transition-colors leading-snug">{person.name}</h3>
                                <p className="text-[10px] font-bold text-accent-primary cyber-mono uppercase tracking-widest truncate mt-0.5 opacity-70">{person.jobTitle}</p>
                            </div>
                        </div>
                        <div className="space-y-1.5 cyber-mono text-[10px] uppercase tracking-widest text-text-secondary">
                            {person.description && <p className="leading-relaxed">{person.description}</p>}
                            {person.team && <p className="text-white">Team: <span className="text-accent-primary">{person.team}</span></p>}
                            <p>
                                Org{person.organization?.includes(',') ? 's' : ''}: <span className="text-white">{person.organization ? formatOrganizations(person.organization) : 'N/A'}</span>
                            </p>
                            {person.preferredContact && <p>Contact: <span className="text-white">{person.preferredContact}</span></p>}
                        </div>

                        <div className="mt-8 pt-6 border-t border-border-default flex flex-wrap gap-4">
                            {person.email && (
                                <a
                                    href={`mailto:${person.email}`}
                                    className="text-text-secondary hover:text-accent-primary transition-colors"
                                    title={person.email}
                                >
                                    <i className="bi bi-envelope text-lg"></i>
                                </a>
                            )}
                            {person.telegram && (
                                <a
                                    href={person.telegram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-text-secondary hover:text-accent-primary transition-colors"
                                >
                                    <i className="bi bi-telegram text-lg"></i>
                                </a>
                            )}
                            {person.twitter && (
                                <a
                                    href={person.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-text-secondary hover:text-accent-primary transition-colors"
                                >
                                    <i className="bi bi-twitter-x text-lg"></i>
                                </a>
                            )}
                             {person.discord && (
                                <a
                                    href={person.discord}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-text-secondary hover:text-accent-primary transition-colors"
                                >
                                    <i className="bi bi-discord text-lg"></i>
                                </a>
                            )}
                             {person.website && (
                                <a
                                    href={person.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-text-secondary hover:text-accent-primary transition-colors"
                                >
                                    <i className="bi bi-globe text-lg"></i>
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