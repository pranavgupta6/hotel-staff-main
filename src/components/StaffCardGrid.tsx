import type { StaffMember, StatusType } from '../types/staff';
import StatusBadge from './StatusBadge';
import ShiftBadge from './ShiftBadge';
import { Mail, Phone, Calendar, Building, Eye, Edit2, Trash2, Power } from 'lucide-react';

interface StaffCardGridProps {
  staff: StaffMember[];
  onViewDetails: (member: StaffMember) => void;
  onEdit: (member: StaffMember) => void;
  onDelete: (member: StaffMember) => void;
  onToggleStatus: (id: string, currentStatus: StatusType) => void;
}

export default function StaffCardGrid({
  staff,
  onViewDetails,
  onEdit,
  onDelete,
  onToggleStatus,
}: StaffCardGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {staff.map((member) => (
        <div
          key={member.id}
          className="bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-5 space-y-4 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
        >
          {/* Header row: Avatar + Name + Status */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-lg shrink-0">
                {member.fullName.charAt(0)}
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-slate-100 truncate group-hover:text-amber-400 transition-colors">
                  {member.fullName}
                </h3>
                <span className="text-xs font-mono text-amber-400/90 font-medium">
                  {member.employeeCode}
                </span>
              </div>
            </div>
            <StatusBadge status={member.status} />
          </div>

          {/* Role & Department info */}
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/50 space-y-1.5 text-xs">
            <div className="flex justify-between items-center text-slate-300">
              <span className="text-slate-500">Role:</span>
              <span className="font-medium text-slate-200">{member.role}</span>
            </div>
            <div className="flex justify-between items-center text-slate-300">
              <span className="text-slate-500 flex items-center gap-1">
                <Building className="w-3 h-3 text-slate-400" /> Dept:
              </span>
              <span className="font-medium text-slate-200">{member.department}</span>
            </div>
            <div className="flex justify-between items-center text-slate-300">
              <span className="text-slate-500">Shift:</span>
              <ShiftBadge shift={member.shift} />
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-1.5 text-xs text-slate-400">
            <div className="flex items-center gap-2 truncate">
              <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="truncate">{member.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>{member.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>Joined: {new Date(member.joiningDate).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between gap-2">
            <button
              onClick={() => onToggleStatus(member.id, member.status)}
              title="Toggle Active/On Leave Status"
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
            >
              <Power className="w-3.5 h-3.5" />
              <span>Status</span>
            </button>

            <div className="flex items-center gap-1">
              <button
                onClick={() => onViewDetails(member)}
                title="View Full Profile"
                className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => onEdit(member)}
                title="Edit Staff Member"
                className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(member)}
                title="Delete Staff Member"
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
