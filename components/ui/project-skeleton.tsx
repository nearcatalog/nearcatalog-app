export default function ProjectSkeleton() {
  return (
    <div className="grow-1 min-h-[140px] flex w-full shrink-0 flex-col items-start justify-start gap-3 overflow-hidden border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent px-5 py-5">
      <div className="flex w-full items-center gap-3">
        <div className="size-12 shrink-0 animate-pulse bg-white/5"></div>
        <div className="flex w-full flex-col gap-2">
          <div className="h-4 w-3/4 animate-pulse bg-white/5"></div>
          <div className="h-3 w-1/3 animate-pulse bg-white/5"></div>
        </div>
      </div>
      <div className="h-3 w-full animate-pulse bg-white/5"></div>
      <div className="h-3 w-4/5 animate-pulse bg-white/5"></div>
    </div>
  );
}
