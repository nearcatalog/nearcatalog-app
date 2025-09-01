import { cache } from 'react'

export interface AwesomeNearItem {
    name: string;
    url: string;
    category: string;
    username: string | null;
    description: string;
    type: 'github' | 'external';
}

interface AwesomeNearData {
    categories: Set<string>;
    profiles: AwesomeNearItem[];
}

class AwesomeNearParser {
    categories: Set<string>;
    profiles: AwesomeNearItem[];

    constructor() {
        this.categories = new Set();
        this.profiles = [];
    }

    parseMarkdown(markdown: string) {
        // Find the Categories section
        const categoriesMatch = markdown.match(/## Categories\n\n([\s\S]*?)(?=\n## |$)/);
        if (!categoriesMatch) {
            throw new Error('Categories section not found');
        }

        const categoriesSection = categoriesMatch[1];
        const categoryBlocks = categoriesSection.split('#### ');
        
        categoryBlocks.forEach(block => {
            if (!block.trim()) return;
            
            const lines = block.split('\n');
            const categoryLine = lines[0].trim();
            
            // Check if the line has an emoji (common emoji patterns)
            if (!categoryLine.match(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/u)) return;
            
            this.categories.add(categoryLine);
            
            // Parse profiles in this category
            const profileLines = lines.slice(1);
            profileLines.forEach(line => {
                line = line.trim();
                if (line.startsWith('- [')) {
                    // Match any URL (not just GitHub) and support italicized author names
                    const match = line.match(/- \[(.*?)\]\((https?:\/\/[^\s)]+)\)(?:\s*-\s*(?:\*(.*?)\*|(.+))?)?/);
                    if (match) {
                        const [_, name, url, italicAuthor, plainDescription] = match;
                        let description = plainDescription;
                        
                        // If we have an italicized author, use that as the description
                        if (italicAuthor) {
                            description = italicAuthor;
                        }
                        
                        // For GitHub URLs, extract username
                        const isGitHub = url.includes('github.com');
                        const username = isGitHub ? url.split('/')[3] : null;
                        
                        // Add if we have the required fields
                        if (name && url) {
                            this.profiles.push({
                                name: name.trim(),
                                url: url.trim(),
                                category: categoryLine,
                                username: username,
                                description: description ? description.trim() : '',
                                type: isGitHub ? 'github' : 'external'
                            });
                        }
                    }
                }
            });
        });

        return {
            categories: this.categories,
            profiles: this.profiles
        };
    }
}

export const getAwesomeNearData = cache(async (): Promise<AwesomeNearData> => {
    const CACHE_TIME = 60 * 60; // 1 hour in seconds
    const url = 'https://raw.githubusercontent.com/nearcatalog/awesome-near/refs/heads/master/README.md';

    try {
        const response = await fetch(url, {
            next: { revalidate: CACHE_TIME }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch awesome-near data');
        }

        const markdown = await response.text();
        const parser = new AwesomeNearParser();
        return parser.parseMarkdown(markdown);
    } catch (error) {
        console.error('Error fetching awesome-near data:', error);
        return {
            categories: new Set(),
            profiles: []
        };
    }
});
