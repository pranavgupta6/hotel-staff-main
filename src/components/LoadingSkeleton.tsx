interface LoadingSkeletonProps {
  viewMode: 'table' | 'cards';
}

export default function LoadingSkeleton({ viewMode }: LoadingSkeletonProps) {
  if (viewMode === 'cards') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-52 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 animate-pulse flex flex-col justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-slate-800" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-slate-800 rounded w-2/3" />
                <div className="h-3 bg-slate-800/60 rounded w-1/3" />
              </div>
            </div>
            <div className="space-y-2 py-4">
              <div className="h-3 bg-slate-800/60 rounded w-full" />
              <div className="h-3 bg-slate-800/60 rounded w-4/5" />
            </div>
            <div className="h-4 bg-slate-800 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 animate-pulse space-y-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="flex items-center justify-between gap-4 py-2 border-b border-slate-800/40">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-9 h-9 rounded-xl bg-slate-800" />
            <div className="space-y-1.5 flex-1">
              <div className="h-3.5 bg-slate-800 rounded w-1/3" />
              <div className="h-2.5 bg-slate-800/60 rounded w-1/4" />
            </div>
          </div>
          <div className="h-3.5 bg-slate-800 rounded w-1/5 hidden sm:block" />
          <div className="h-3.5 bg-slate-800 rounded w-1/6" />
          <div className="h-6 bg-slate-800 rounded-full w-20" />
        </div>
      ))}
    </div>
  );
}
