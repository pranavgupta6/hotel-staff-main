import { UserX, RefreshCw, UserPlus } from 'lucide-react';

interface EmptyStateProps {
  onResetFilters: () => void;
  hasFilters: boolean;
  onAddStaff?: () => void;
}

export default function EmptyState({ onResetFilters, hasFilters, onAddStaff }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-slate-900/40 border border-slate-800/80 rounded-2xl text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
        <UserX className="w-8 h-8" />
      </div>

      <div className="space-y-1.5 max-w-sm">
        <h3 className="text-lg font-bold text-slate-100">No Staff Members Found</h3>
        <p className="text-xs text-slate-400">
          {hasFilters
            ? "We couldn't find any staff records matching your current filter criteria."
            : 'No staff members have been added to the directory system yet.'}
        </p>
      </div>

      <div className="flex items-center gap-3">
        {hasFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset All Filters
          </button>
        )}

        {onAddStaff && (
          <button
            onClick={onAddStaff}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl transition-all shadow-md shadow-amber-500/10"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Add Staff Member
          </button>
        )}
      </div>
    </div>
  );
}
