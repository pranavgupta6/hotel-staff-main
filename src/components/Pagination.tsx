import type { PaginationMeta } from '../types/staff';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export default function Pagination({
  meta,
  onPageChange,
  onLimitChange,
}: PaginationProps) {
  const { page, totalPages, total, limit } = meta;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 bg-slate-900/60 border border-slate-800/80 rounded-2xl text-xs text-slate-400 shadow-sm">
      {/* Items Per Page selector */}
      <div className="flex items-center gap-2">
        <span>Rows per page:</span>
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="px-2 py-1 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-amber-500/50"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <span className="hidden sm:inline text-slate-500">|</span>
        <span>
          Showing <strong className="text-slate-200">{Math.min((page - 1) * limit + 1, total)}</strong> -{' '}
          <strong className="text-slate-200">{Math.min(page * limit, total)}</strong> of{' '}
          <strong className="text-slate-200">{total}</strong> staff
        </span>
      </div>

      {/* Page Navigation Controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(1)}
          disabled={page <= 1}
          title="First Page"
          className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-950 transition-colors"
        >
          <ChevronsLeft className="w-4 h-4 text-slate-300" />
        </button>
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          title="Previous Page"
          className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-950 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-slate-300" />
        </button>

        <span className="px-3 py-1 text-slate-300 font-medium">
          Page {page} of {totalPages || 1}
        </span>

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          title="Next Page"
          className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-950 transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-slate-300" />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={page >= totalPages}
          title="Last Page"
          className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-950 transition-colors"
        >
          <ChevronsRight className="w-4 h-4 text-slate-300" />
        </button>
      </div>
    </div>
  );
}
