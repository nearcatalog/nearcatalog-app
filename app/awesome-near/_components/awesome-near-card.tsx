import Image from "next/image";
import Link from "next/link";
import { AwesomeNearItem } from "@/lib/awesome-near";

// Making this a server component by not using any client-side features
export default function AwesomeNearCard({ item }: { item: AwesomeNearItem }) {
    return (
        <Link 
            href={item.url} 
            target="_blank"
            rel="nofollow noopener noreferrer"
            referrerPolicy="no-referrer-when-downgrade"
            className="group flex h-full flex-col border border-border-default bg-bg-surface p-6 transition-all duration-300 hover:border-accent-primary hover:shadow-[0_0_15px_rgba(0,255,163,0.15)]"
        >
            <div className="mb-4 flex items-center gap-4">
                {/* Image/Icon for the project */}
                <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-border-default/50 bg-bg-base shrink-0 shadow-lg group-hover:shadow-accent-primary/10 transition-shadow">
                    {item.type === 'github' && item.username ? (
                        <Image
                            src={`https://github.com/${item.username}.png`}
                            alt={`${item.name}'s avatar`}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            width={80}
                            height={80}
                            unoptimized
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-accent-primary bg-bg-surface/50">
                            <i className="bi bi-box text-3xl"></i>
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-accent-primary transition-colors leading-snug">{item.name}</h3>
                    {item.type === 'github' && (
                        <p className="flex items-center gap-2 text-[10px] font-bold text-accent-primary cyber-mono uppercase tracking-[0.2em] mt-1 opacity-70">
                            <i className="bi bi-github"></i>
                            {item.username}
                        </p>
                    )}
                </div>
            </div>
            {item.description && (
                <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">{item.description}</p>
            )}
        </Link>
    );
}
