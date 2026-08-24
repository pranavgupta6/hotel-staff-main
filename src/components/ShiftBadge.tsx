import type { ShiftType } from '../types/staff';
import { Sun, Moon, Sunrise, Sunset } from 'lucide-react';

interface ShiftBadgeProps {
  shift: ShiftType;
}

export default function ShiftBadge({ shift }: ShiftBadgeProps) {
  const getShiftDetails = () => {
    switch (shift) {
      case 'Morning':
        return {
          icon: Sunrise,
          color: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
        };
      case 'Evening':
      case 'Afternoon':
        return {
          icon: Sunset,
          color: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
        };
      case 'Night':
        return {
          icon: Moon,
          color: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
        };
      default:
        return {
          icon: Sun,
          color: 'bg-slate-500/10 text-slate-300 border-slate-500/30',
        };
    }
  };

  const details = getShiftDetails();
  const Icon = details.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${details.color}`}
    >
      <Icon className="w-3 h-3" />
      {shift}
    </span>
  );
}
