export default function SocialsEmbed({
    linktree
}) {
    const { website, github, twitter, medium, discord, telegram } = linktree;

    return (
        <div className="flex flex-col gap-4 rounded-lg bg-[#1b1d2a] p-4">
            <h3 className="space-x-2 text-xl font-bold">
                <span>Socials</span>
            </h3>

            <div
                className="overflow-y-auto rounded-xl"
                style={{ maxHeight: "500px", minHeight: "500px" }}
            >


                <div className='items-center'>
                    <div className='flex flex-col'>

                        {website && (
                            <a type='button'
                                className='flex break-inside bg-black text-white border-[#80E9E5] border-2 rounded-full px-6 py-3 mb-4 w-full dark:bg-slate-800 dark:text-white hover:opacity-80'
                                href={website}>
                                <div className='m-auto'>
                                    <div className='flex items-center justify-start flex-1 space-x-4'>
                                        <i className="bi bi-globe text-[#80E9E5]"></i>
                                        <span className='font-medium mb-[-3px]'>Website</span>
                                    </div>
                                </div>
                            </a>
                        )}

                        {twitter && (
                            <a type='button'
                                className='flex break-inside bg-black text-white border-[#80E9E5] border-2 rounded-full px-6 py-3 mb-4 w-full dark:bg-slate-800 dark:text-white hover:opacity-80'
                                href={twitter}>
                                <div className='m-auto'>
                                    <div className='flex items-center justify-start flex-1 space-x-4'>
                                        <i className="bi bi-twitter-x text-[#80E9E5]"></i>
                                        <span className='font-medium mb-[-3px]'>Twitter</span>
                                    </div>
                                </div>
                            </a>
                        )}

                        {github && (
                            <a type='button'
                                className='flex break-inside bg-black text-white border-[#80E9E5] border-2 rounded-full px-6 py-3 mb-4 w-full dark:bg-slate-800 dark:text-white hover:opacity-80'
                                href={github}>
                                <div className='m-auto'>
                                    <div className='flex items-center justify-start flex-1 space-x-4'>
                                        <i className="bi bi-github text-[#80E9E5]"></i>
                                        <span className='font-medium mb-[-3px]'>Github</span>
                                    </div>
                                </div>
                            </a>
                        )}

                        {medium && (
                            <a type='button'
                                className='flex break-inside bg-black text-white border-[#80E9E5] border-2 rounded-full px-6 py-3 mb-4 w-full dark:bg-slate-800 dark:text-white hover:opacity-80'
                                href={medium}>
                                <div className='m-auto'>
                                    <div className='flex items-center justify-start flex-1 space-x-4'>
                                        <i className="bi bi-bookmark-star text-[#80E9E5]"></i>
                                        <span className='font-medium mb-[-3px]'>Whitepaper/Docs</span>
                                    </div>
                                </div>
                            </a>
                        )}

                        {discord && (
                            <a type='button'
                                className='flex break-inside bg-black text-white border-[#80E9E5] border-2 rounded-full px-6 py-3 mb-4 w-full dark:bg-slate-800 dark:text-white hover:opacity-80'
                                href={discord}>
                                <div className='m-auto'>
                                    <div className='flex items-center justify-start flex-1 space-x-4'>
                                        <i className="bi bi-discord text-[#80E9E5]"></i>
                                        <span className='font-medium mb-[-3px]'>Discord</span>
                                    </div>
                                </div>
                            </a>
                        )}

                        {telegram && (
                            <a type='button'
                                className='flex break-inside bg-black text-white border-[#80E9E5] border-2 rounded-full px-6 py-3 mb-4 w-full dark:bg-slate-800 dark:text-white hover:opacity-80'
                                href={telegram}>
                                <div className='m-auto'>
                                    <div className='flex items-center justify-start flex-1 space-x-4'>
                                        <i className="bi bi-telegram text-[#80E9E5]"></i>
                                        <span className='font-medium mb-[-3px]'>Telegram</span>
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