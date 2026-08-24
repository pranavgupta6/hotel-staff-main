import type { StatusType } from '../types/staff';

interface StatusBadgeProps {
  status: StatusType;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'On Leave':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
      case 'Inactive':
      case 'Terminated':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusStyles()}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === 'Active'
            ? 'bg-emerald-400 animate-pulse'
            : status === 'On Leave'
            ? 'bg-amber-400'
            : 'bg-rose-400'
        }`}
      />
      {status}
    </span>
  );
}
