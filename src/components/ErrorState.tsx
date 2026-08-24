import { AlertOctagon, RotateCw } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-rose-950/20 border border-rose-900/40 rounded-2xl text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
        <AlertOctagon className="w-8 h-8" />
      </div>

      <div className="space-y-1.5 max-w-md">
        <h3 className="text-lg font-bold text-slate-100">Failed to Load Staff Data</h3>
        <p className="text-xs text-rose-300 font-mono bg-rose-950/40 p-2.5 rounded-xl border border-rose-900/40">
          {message}
        </p>
      </div>

      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl transition-all shadow-md shadow-amber-500/10"
      >
        <RotateCw className="w-3.5 h-3.5" />
        Retry Loading Data
      </button>
    </div>
  );
}
