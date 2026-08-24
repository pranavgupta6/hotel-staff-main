import type { StaffStats } from '../types/staff';
import { Users, UserCheck, UserMinus, Briefcase, Building, Clock } from 'lucide-react';

interface StatsOverviewProps {
  stats: StaffStats | null;
  loading: boolean;
}

export default function StatsOverview({ stats, loading }: StatsOverviewProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-24 bg-slate-900/40 border border-slate-800/80 rounded-2xl animate-pulse p-4 space-y-3"
          >
            <div className="h-4 bg-slate-800 rounded w-1/2"></div>
            <div className="h-8 bg-slate-800 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const total = stats.total ?? stats.totalStaff ?? 0;
  const active = stats.active ?? stats.activeStaff ?? 0;
  const onLeave = stats.onLeave ?? stats.onLeaveStaff ?? 0;

  const cards = [
    {
      title: 'Total Staff',
      value: total,
      subText: 'Registered employees',
      icon: Users,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      title: 'Active Duty',
      value: active,
      subText: `${Math.round((active / (total || 1)) * 100)}% of total team`,
      icon: UserCheck,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'On Leave',
      value: onLeave,
      subText: 'Temporarily inactive',
      icon: UserMinus,
      color: 'text-sky-400',
      bgColor: 'bg-sky-500/10 border-sky-500/20',
    },
    {
      title: 'Departments',
      value: Object.keys(stats.byDepartment || {}).length,
      subText: 'Operational units',
      icon: Building,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10 border-purple-500/20',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, idx) => {
          const Icon = c.icon;
          return (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 flex items-start justify-between shadow-sm hover:border-slate-700 transition-all group"
            >
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {c.title}
                </p>
                <h3 className="text-2xl font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                  {c.value}
                </h3>
                <p className="text-[11px] text-slate-500">{c.subText}</p>
              </div>

              <div
                className={`p-3 rounded-xl border ${c.bgColor} ${c.color} shrink-0`}
              >
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Breakdown Pills: Departments & Shifts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Department Breakdown */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-amber-400" /> By Department
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(stats.byDepartment || {}).map(([dept, count]) => (
              <div
                key={dept}
                className="px-3 py-1.5 bg-slate-950/80 border border-slate-800/80 rounded-xl flex items-center gap-2 text-xs"
              >
                <span className="text-slate-300 font-medium">{dept}</span>
                <span className="bg-slate-800 text-amber-400 px-1.5 py-0.5 rounded font-mono font-semibold text-[11px]">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Shift Breakdown */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> By Shift
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(stats.byShift || {}).map(([shift, count]) => (
              <div
                key={shift}
                className="px-3 py-1.5 bg-slate-950/80 border border-slate-800/80 rounded-xl flex items-center gap-2 text-xs"
              >
                <span className="text-slate-300 font-medium">{shift}</span>
                <span className="bg-slate-800 text-sky-400 px-1.5 py-0.5 rounded font-mono font-semibold text-[11px]">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
