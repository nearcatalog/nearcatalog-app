import TopNews from "../top-news/top-news";
import { NewsType } from "@/lib/types";
import { fetchShortNews } from "@/lib/near-catalog";

function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export default async function NewsHomeSection() {
    const news: Record<string, NewsType> | null = await fetchShortNews();

    if (!news) return <></>;

    // Convert the news object to an array, shuffle it, and convert it back to an object
    const shuffledNews = Object.fromEntries(
        shuffleArray(Object.entries(news))
    );

    return <TopNews news={shuffledNews} />;
}