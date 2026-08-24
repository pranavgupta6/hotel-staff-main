import { useState, useEffect } from 'react';
import type { FilterOptions, FetchStaffParams } from '../types/staff';
import { apiService } from '../services/api';
import { Search, RotateCcw, ArrowUpDown } from 'lucide-react';

interface FilterBarProps {
  params: FetchStaffParams;
  onParamsChange: (newParams: Partial<FetchStaffParams>) => void;
  onReset: () => void;
  totalCount: number;
}

export default function FilterBar({
  params,
  onParamsChange,
  onReset,
  totalCount,
}: FilterBarProps) {
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [searchInput, setSearchInput] = useState(params.q || '');

  useEffect(() => {
    async function loadFilterOptions() {
      try {
        const opts = await apiService.getFilters();
        setFilterOptions(opts);
      } catch (err) {
        console.error('Failed to load filter dropdown values:', err);
      }
    }
    loadFilterOptions();
  }, []);

  // Sync internal search input if parent params reset
  useEffect(() => {
    setSearchInput(params.q || '');
  }, [params.q]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onParamsChange({ q: searchInput });
  };

  const hasActiveFilters = Boolean(
    params.q || params.role || params.department || params.shift || params.status
  );

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-4 shadow-sm">
      {/* Top row: Search Bar & Quick Reset */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name, email, or employee code..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onBlur={() => onParamsChange({ q: searchInput })}
            className="w-full pl-10 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
          />
        </form>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-xs text-slate-400 font-medium">
            Showing <strong className="text-slate-200">{totalCount}</strong> staff records
          </span>

          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-medium rounded-xl border border-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Bottom row: Dropdown Selects */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 border-t border-slate-800/60">
        {/* Role Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">Role</label>
          <select
            value={params.role || ''}
            onChange={(e) => onParamsChange({ role: e.target.value })}
            className="w-full px-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
          >
            <option value="">All Roles</option>
            {filterOptions?.roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Department Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">Department</label>
          <select
            value={params.department || ''}
            onChange={(e) => onParamsChange({ department: e.target.value })}
            className="w-full px-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
          >
            <option value="">All Departments</option>
            {filterOptions?.departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Shift Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">Shift</label>
          <select
            value={params.shift || ''}
            onChange={(e) => onParamsChange({ shift: e.target.value })}
            className="w-full px-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
          >
            <option value="">All Shifts</option>
            {filterOptions?.shifts.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">Status</label>
          <select
            value={params.status || ''}
            onChange={(e) => onParamsChange({ status: e.target.value })}
            className="w-full px-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
          >
            <option value="">All Statuses</option>
            {filterOptions?.statuses.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Field */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">Sort By</label>
          <select
            value={params.sort || 'joiningDate'}
            onChange={(e) => onParamsChange({ sort: e.target.value })}
            className="w-full px-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
          >
            <option value="joiningDate">Joining Date</option>
            <option value="fullName">Full Name</option>
            <option value="employeeCode">Employee Code</option>
            <option value="role">Role</option>
          </select>
        </div>

        {/* Sort Order */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">Order</label>
          <button
            type="button"
            onClick={() => onParamsChange({ order: params.order === 'asc' ? 'desc' : 'asc' })}
            className="w-full px-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-200 hover:border-slate-700 flex items-center justify-between transition-colors"
          >
            <span>{params.order === 'asc' ? 'Ascending (A-Z)' : 'Descending (Z-A)'}</span>
            <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
