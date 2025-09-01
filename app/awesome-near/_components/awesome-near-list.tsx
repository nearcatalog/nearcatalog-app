import type { AwesomeNearItem } from '@/lib/awesome-near';
import SectionHeading from '@/components/ui/section-heading';
import AwesomeNearCard from './awesome-near-card';

export default function AwesomeNearList({ 
    data, 
    searchQuery,
    selectedCategory
}: { 
    data: { 
        categories: Set<string>; 
        profiles: AwesomeNearItem[]; 
    },
    searchQuery?: string;
    selectedCategory?: string;
}) {
    // First filter by category if selected
    let filteredProfiles = selectedCategory
        ? data.profiles.filter(profile => profile.category === selectedCategory)
        : data.profiles;

    // Then filter by search query if provided
    filteredProfiles = searchQuery 
        ? filteredProfiles.filter((profile) => {
            const searchLower = searchQuery.toLowerCase();
            return (
                profile.name.toLowerCase().includes(searchLower) ||
                profile.description?.toLowerCase().includes(searchLower) ||
                profile.category.toLowerCase().includes(searchLower) ||
                profile.username?.toLowerCase().includes(searchLower)
            );
        })
        : filteredProfiles;

    return (
        <div className="container mx-auto px-4 py-8">
            {Array.from(data.categories).map((category: string) => {
                const categoryProfiles = filteredProfiles.filter(
                    (profile) => profile.category === category
                );

                if (categoryProfiles.length === 0) return null;

                return (
                    <section key={category} className="mb-12">
                        <h2 className="text-xl font-semibold tracking-tight mb-2">
                            {category}
                            <span className="ml-2 text-sm text-muted-foreground font-normal">
                                {`${categoryProfiles.length} ${categoryProfiles.length === 1 ? 'item' : 'items'}`}
                            </span>
                        </h2>
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categoryProfiles.map((profile) => (
                                <AwesomeNearCard key={profile.url} item={profile} />
                            ))}
                        </div>
                    </section>
                );
            })}
        </div>
    );
}
