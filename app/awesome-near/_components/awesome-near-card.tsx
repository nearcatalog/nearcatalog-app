import Image from "next/image";
import Link from "next/link";
import { AwesomeNearItem } from "@/lib/awesome-near";

// Making this a server component by not using any client-side features
export default function AwesomeNearCard({ item }: { item: AwesomeNearItem }) {
    return (
        <Link 
            href={item.url} 
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-full flex-col rounded-lg bg-[#18191E] p-6 transition-all hover:scale-[1.02] hover:bg-[#1E1F24]"
        >
            <div className="mb-4 flex items-center gap-3">
                {/* Image/Icon for the project */}
                <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                    {item.type === 'github' && item.username ? (
                        <Image
                            src={`https://github.com/${item.username}.png`}
                            alt={`${item.name}'s avatar`}
                            className="h-full w-full object-cover"
                            width={64}
                            height={64}
                            unoptimized
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[#2a2d3e] text-[#80E9E5]">
                            <i className="bi bi-box text-2xl"></i>
                        </div>
                    )}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">{item.name}</h3>
                    {item.type === 'github' && (
                        <p className="flex items-center gap-2 text-sm text-[#80E9E5]">
                            <i className="bi bi-github"></i>
                            {item.username}
                        </p>
                    )}
                </div>
            </div>
            {item.description && (
                <p className="text-sm text-gray-300">{item.description}</p>
            )}
        </Link>
    );
}
