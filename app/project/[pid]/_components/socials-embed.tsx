import Image from "next/image";

export default function SocialsEmbed({
    linktree
}: { linktree: any }) {
    const { website, github, twitter, medium, discord, telegram, potlock } = linktree || {};

    return (
        <div className="flex flex-col gap-4 rounded-sm border border-border-default bg-bg-surface p-4">
            <h3 className="text-sm text-text-secondary uppercase tracking-widest font-bold">
                <span>Socials</span>
            </h3>

            <div
                className="overflow-y-auto w-full no-scrollbar"
                style={{ maxHeight: "300px" }}
            >


                <div className='items-center'>
                    <div className='flex flex-col'>

                        {website && (
                            <a type='button'
                                className='flex break-inside bg-transparent text-text-primary border-border-default border rounded-sm px-4 py-3 mb-2 w-full transition-colors hover:border-accent-primary hover:text-accent-primary hover:shadow-[0_0_10px_rgba(0,255,163,0.2)]'
                                rel="noreferrer nofollow"
                                href={website}>
                                <div className='m-auto w-full'>
                                    <div className='flex items-center text-center justify-center flex-1 space-x-3'>
                                        <i className="bi bi-globe text-accent-primary"></i>
                                        <span className='font-bold uppercase tracking-wider text-xs cyber-mono'>Website</span>
                                    </div>
                                </div>
                            </a>
                        )}
                        
                        {potlock && (
                            <a type='button'
                                className='flex break-inside bg-transparent text-text-primary border-border-default border rounded-sm px-4 py-3 mb-2 w-full transition-colors hover:border-accent-primary hover:text-accent-primary hover:shadow-[0_0_10px_rgba(0,255,163,0.2)]'
                                rel="noreferrer nofollow"
                                href={potlock}>
                                <div className='m-auto w-full'>
                                    <div className='flex items-center text-center justify-center flex-1 space-x-3'>
                                        <Image 
                                            src="https://indexer.nearcatalog.xyz/wp-content/uploads/2025/05/potlock.png" 
                                            alt="Potlock" 
                                            width={16}
                                            height={16}
                                            className="w-4 h-4 grayscale contrast-200" 
                                            unoptimized
                                        />
                                        <span className='font-bold uppercase tracking-wider text-xs cyber-mono'>Potlock</span>
                                    </div>
                                </div>
                            </a>
                        )}


                        {twitter && (
                            <a type='button'
                                className='flex break-inside bg-transparent text-text-primary border-border-default border rounded-sm px-4 py-3 mb-2 w-full transition-colors hover:border-accent-primary hover:text-accent-primary hover:shadow-[0_0_10px_rgba(0,255,163,0.2)]'
                                rel="noreferrer nofollow"
                                href={twitter}>
                                <div className='m-auto w-full'>
                                    <div className='flex items-center text-center justify-center flex-1 space-x-3'>
                                        <i className="bi bi-twitter-x text-accent-primary"></i>
                                        <span className='font-bold uppercase tracking-wider text-xs cyber-mono'>Twitter</span>
                                    </div>
                                </div>
                            </a>
                        )}

                        {github && (
                            <a type='button'
                                className='flex break-inside bg-transparent text-text-primary border-border-default border rounded-sm px-4 py-3 mb-2 w-full transition-colors hover:border-accent-primary hover:text-accent-primary hover:shadow-[0_0_10px_rgba(0,255,163,0.2)]'
                                rel="noreferrer nofollow"
                                href={github}>
                                <div className='m-auto w-full'>
                                    <div className='flex items-center text-center justify-center flex-1 space-x-3'>
                                        <i className="bi bi-github text-accent-primary"></i>
                                        <span className='font-bold uppercase tracking-wider text-xs cyber-mono'>Github</span>
                                    </div>
                                </div>
                            </a>
                        )}

                        {medium && (
                            <a type='button'
                                className='flex break-inside bg-transparent text-text-primary border-border-default border rounded-sm px-4 py-3 mb-2 w-full transition-colors hover:border-accent-primary hover:text-accent-primary hover:shadow-[0_0_10px_rgba(0,255,163,0.2)]'
                                rel="noreferrer nofollow"
                                href={medium}>
                                <div className='m-auto w-full'>
                                    <div className='flex items-center text-center justify-center flex-1 space-x-3'>
                                        <i className="bi bi-bookmark-star text-accent-primary"></i>
                                        <span className='font-bold uppercase tracking-wider text-xs cyber-mono'>Whitepaper/Docs</span>
                                    </div>
                                </div>
                            </a>
                        )}

                        {discord && (
                            <a type='button'
                                className='flex break-inside bg-transparent text-text-primary border-border-default border rounded-sm px-4 py-3 mb-2 w-full transition-colors hover:border-accent-primary hover:text-accent-primary hover:shadow-[0_0_10px_rgba(0,255,163,0.2)]'
                                href={discord}
                                rel="noreferrer nofollow"
                                >
                                <div className='m-auto w-full'>
                                    <div className='flex items-center text-center justify-center flex-1 space-x-3'>
                                        <i className="bi bi-discord text-accent-primary"></i>
                                        <span className='font-bold uppercase tracking-wider text-xs cyber-mono'>Discord</span>
                                    </div>
                                </div>
                            </a>
                        )}

                        {telegram && (
                            <a type='button'
                                className='flex break-inside bg-transparent text-text-primary border-border-default border rounded-sm px-4 py-3 mb-2 w-full transition-colors hover:border-accent-primary hover:text-accent-primary hover:shadow-[0_0_10px_rgba(0,255,163,0.2)]'
                                rel="noreferrer nofollow"
                                href={telegram}>
                                <div className='m-auto w-full'>
                                    <div className='flex items-center text-center justify-center flex-1 space-x-3'>
                                        <i className="bi bi-telegram text-accent-primary"></i>
                                        <span className='font-bold uppercase tracking-wider text-xs cyber-mono'>Telegram</span>
                                    </div>
                                </div>
                            </a>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}