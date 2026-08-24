import { 
  Building2, 
  UserPlus, 
  Search, 
  RotateCw, 
  LayoutGrid, 
  Table as TableIcon,
  Activity
} from 'lucide-react';

interface HeaderProps {
  isHealthOk: boolean | null;
  onCheckHealth: () => void;
  onOpenCreateModal: () => void;
  onOpenEmailSearchModal: () => void;
  onRefresh: () => void;
  viewMode: 'table' | 'cards';
  onToggleViewMode: (mode: 'table' | 'cards') => void;
  isRefreshing: boolean;
}

export default function Header({
  isHealthOk,
  onCheckHealth,
  onOpenCreateModal,
  onOpenEmailSearchModal,
  onRefresh,
  viewMode,
  onToggleViewMode,
  isRefreshing,
}: HeaderProps) {
  return (
    <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo and Brand Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-200 p-0.5 shadow-md shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Building2 className="w-5 h-5 text-amber-400" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-bold tracking-tight text-white font-sans">
                  Grand Horizon
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-full">
                  Staff Operations
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Hotel Staff Management & Directory System
              </p>
            </div>
          </div>

          {/* Right Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Health Badge */}
            <button
              onClick={onCheckHealth}
              title="Click to re-check API status"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-xs text-slate-300 transition-all"
            >
              <Activity className="w-3.5 h-3.5 text-slate-400" />
              <span>API Status:</span>
              {isHealthOk === null ? (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              ) : isHealthOk ? (
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Online
                </span>
              ) : (
                <span className="flex items-center gap-1 text-rose-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  Offline
                </span>
              )}
            </button>

            {/* Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              title="Refresh Staff List"
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-all disabled:opacity-50"
            >
              <RotateCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
            </button>

            {/* View Mode Switcher */}
            <div className="flex items-center p-1 bg-slate-950 rounded-lg border border-slate-800">
              <button
                onClick={() => onToggleViewMode('table')}
                className={`p-1.5 rounded-md transition-all ${
                  viewMode === 'table'
                    ? 'bg-slate-800 text-amber-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Table View"
              >
                <TableIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => onToggleViewMode('cards')}
                className={`p-1.5 rounded-md transition-all ${
                  viewMode === 'cards'
                    ? 'bg-slate-800 text-amber-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Cards View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Find by Email */}
            <button
              onClick={onOpenEmailSearchModal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-medium transition-all shadow-sm"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Find by Email</span>
            </button>

            {/* Add Staff Button */}
            <button
              onClick={onOpenCreateModal}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs transition-all shadow-md shadow-amber-500/20 active:scale-[0.98]"
            >
              <UserPlus className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              <span>Add New Staff</span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}
