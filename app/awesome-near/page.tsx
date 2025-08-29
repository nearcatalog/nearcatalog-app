import { getAwesomeNearData } from '@/lib/awesome-near';
import AwesomeNearList from './_components/awesome-near-list';
import SectionHeading from '@/components/ui/section-heading';


export const metadata = {
    title: 'Awesome NEAR | NEARCatalog',
    description: 'A curated list of awesome frameworks, libraries, software, and resources on NEAR.',
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
            <div className="container mx-auto px-4">

                <SectionHeading
                    title="Awesome NEAR 😎 "
                    description="A curated list of awesome frameworks, libraries, software, and resources on NEAR. By the community!
"
                />

                <div className='mb-8 mt-6 flex flex-col gap-4 sm:flex-row'>

                    <form className="w-full">
                        <div className="relative w-full">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <i className="bi bi-search text-[#80E9E5]"></i>
                            </div>
                            <input
                                type="text"
                                name="search"
                                defaultValue={searchQuery}
                                className="block w-full rounded-full border-2 border-[#80E9E5] bg-black p-4 pl-10 text-sm text-white focus:border-[#80E9E5] focus:outline-none"
                                placeholder="Search for tools, libraries, or resources..."
                            />
                        </div>
                    </form>
                </div>


                <div className="mb-8 flex flex-wrap items-center justify-center gap-2 md:gap-3">
                    <a
                        href="/awesome-near"
                        className={`rounded-full px-3 py-1 text-xs md:px-4 md:py-1.5 md:text-sm font-medium transition-colors ${!selectedCategory
                            ? 'bg-[#80E9E5]/20 text-[#80E9E5] ring-1 ring-[#80E9E5]'
                            : 'bg-[#2a2d3e] text-gray-300 hover:bg-[#80E9E5]/10 hover:text-[#80E9E5] hover:ring-1 hover:ring-[#80E9E5]'
                            }`}
                    >
                        👷🏼‍♀️ All Categories
                    </a>
                    {categories.map(category => (
                        <a
                            key={category}
                            href={`/awesome-near?category=${encodeURIComponent(category)}`}
                            className={`rounded-full px-3 py-1 text-xs md:px-4 md:py-1.5 md:text-sm font-medium transition-colors ${selectedCategory === category
                                ? 'bg-[#80E9E5]/20 text-[#80E9E5] ring-1 ring-[#80E9E5]'
                                : 'bg-[#2a2d3e] text-gray-300 hover:bg-[#80E9E5]/10 hover:text-[#80E9E5] hover:ring-1 hover:ring-[#80E9E5]'
                                }`}
                        >
                            {category}
                        </a>
                    ))}
                </div>

                <div className="flex justify-center">
                    <a
                        href="https://github.com/nearcatalog/awesome-near"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#80E9E5] to-[#52DCD4] px-4 py-2 text-sm font-medium text-black transition-transform hover:scale-105"
                    >
                        <i className="bi bi-plus-circle mr-2"></i>
                        Contribute
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
