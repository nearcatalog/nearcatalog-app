import { getAwesomeNearData } from '@/lib/awesome-near';
import AwesomeNearList from './_components/awesome-near-list';
import SectionHeading from '@/components/ui/section-heading';
import { BreadcrumbSchema } from '@/components/seo/json-ld';
import { awesomeNearCrumbs } from '@/lib/seo/breadcrumbs';

export const revalidate = 14400; // 4 hours

export const metadata = {
    title: 'Awesome NEAR | NEARCatalog',
    description: 'A curated list of awesome frameworks, libraries, software, and resources on NEAR.',
    alternates: { canonical: '/awesome-near' },
};

export default async function AwesomeNearPage({
    searchParams = {},
}: {
    searchParams?: { search?: string; category?: string }
}) {

    const [data, params] = await Promise.all([
        getAwesomeNearData(),
        Promise.resolve(searchParams)
    ]);
    const searchQuery = params?.search;
    const selectedCategory =  params?.category;
    const categories = Array.from(data.categories);

    return (
        <main className="flex min-h-screen flex-col mt-16">
            <BreadcrumbSchema items={awesomeNearCrumbs()} />
            <h1 className="sr-only">Awesome NEAR resources</h1>
            <div className="container mx-auto px-4">

                <SectionHeading
                    title="Awesome NEAR 😎 "
                    description="A curated list of awesome frameworks, libraries, software, and resources on NEAR. By the community!
"
                />

                <div className='mb-12 mt-8 flex flex-col gap-6'>
                    <form className="w-full">
                        <div className="relative w-full group">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                <i className="bi bi-search text-accent-primary group-focus-within:drop-shadow-[0_0_8px_rgba(0,255,163,0.5)]"></i>
                            </div>
                            <input
                                type="text"
                                name="search"
                                defaultValue={searchQuery}
                                className="block w-full border border-border-default bg-bg-surface p-4 pl-12 text-sm text-white cyber-mono focus:border-accent-primary focus:outline-none transition-all placeholder:text-text-secondary/50 uppercase tracking-widest"
                                placeholder="SEARCH RESOURCES..."
                            />
                        </div>
                    </form>
                </div>


                <div className="mb-12 flex flex-wrap items-center justify-center gap-1.5">
                    <a
                        href="/awesome-near"
                        className={`project-tag flex items-center justify-center gap-1 transition-all duration-300 rounded-[2px] border py-1.5 px-3 text-[10px] font-mono font-bold tracking-[0.1em] ${!selectedCategory
                            ? "border-accent-primary bg-accent-primary/20 text-accent-primary shadow-[0_0_15px_rgba(0,255,163,0.25)] scale-[1.05]"
                            : "border-white/10 bg-white/5 text-white/60 hover:scale-[1.05] hover:border-accent-primary hover:bg-accent-primary/10 hover:text-accent-primary hover:shadow-[0_0_10px_rgba(0,255,163,0.2)]"
                            }`}
                    >
                        ALL CATEGORIES
                    </a>
                    {categories.map(category => (
                        <a
                            key={category}
                            href={`/awesome-near?category=${encodeURIComponent(category)}`}
                            className={`project-tag flex items-center justify-center gap-1 transition-all duration-300 rounded-[2px] border py-1.5 px-3 text-[10px] font-mono font-bold tracking-[0.1em] ${selectedCategory === category
                                ? "border-accent-primary bg-accent-primary/20 text-accent-primary shadow-[0_0_15px_rgba(0,255,163,0.25)] scale-[1.05]"
                                : "border-white/10 bg-white/5 text-white/60 hover:scale-[1.05] hover:border-accent-primary hover:bg-accent-primary/10 hover:text-accent-primary hover:shadow-[0_0_10px_rgba(0,255,163,0.2)]"
                                }`}
                        >
                            {category}
                        </a>
                    ))}
                </div>

                <div className="flex justify-center mb-12">
                    <a
                        href="https://github.com/nearcatalog/awesome-near"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 border border-accent-primary bg-accent-primary/10 px-8 py-3 text-sm font-black uppercase tracking-[0.25em] text-accent-primary transition-all hover:bg-accent-primary hover:text-black hover:shadow-[0_0_20px_rgba(0,255,163,0.4)] cyber-mono"
                    >
                        <i className="bi bi-plus-lg"></i>
                        CONTRIBUTE
                    </a>
                </div>
            </div>
            <AwesomeNearList
                data={data}
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
            />
        </main>
    );
}
