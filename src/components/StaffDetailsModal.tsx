import type { StaffMember } from '../types/staff';
import StatusBadge from './StatusBadge';
import ShiftBadge from './ShiftBadge';
import { X, Mail, Phone, Calendar, Building, Shield, Clock, Edit2 } from 'lucide-react';

interface StaffDetailsModalProps {
  isOpen: boolean;
  member: StaffMember;
  onClose: () => void;
  onEdit: (member: StaffMember) => void;
}

export default function StaffDetailsModal({
  isOpen,
  member,
  onClose,
  onEdit,
}: StaffDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl space-y-0">
        {/* Header banner */}
        <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950/40 p-6 border-b border-slate-800 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-2xl shadow-lg">
              {member.fullName.charAt(0)}
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-100">{member.fullName}</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-medium text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {member.employeeCode}
                </span>
                <StatusBadge status={member.status} />
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-6">
          {/* Role & Dept Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-slate-950/60 rounded-xl border border-slate-800/80">
            <div className="space-y-1">
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-amber-400" /> Role
              </span>
              <p className="text-sm font-semibold text-slate-200">{member.role}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-amber-400" /> Department
              </span>
              <p className="text-sm font-semibold text-slate-200">{member.department}</p>
            </div>
          </div>

          {/* Key Information Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Contact & Schedule
            </h4>

            <div className="space-y-2 text-sm text-slate-300">
              <div className="flex items-center justify-between p-2.5 bg-slate-950/40 rounded-lg border border-slate-800/40">
                <span className="text-slate-400 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-500" /> Email Address
                </span>
                <span className="font-mono text-slate-200">{member.email}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-950/40 rounded-lg border border-slate-800/40">
                <span className="text-slate-400 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-500" /> Phone Number
                </span>
                <span className="font-mono text-slate-200">{member.phone}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-950/40 rounded-lg border border-slate-800/40">
                <span className="text-slate-400 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" /> Assigned Shift
                </span>
                <ShiftBadge shift={member.shift} />
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-950/40 rounded-lg border border-slate-800/40">
                <span className="text-slate-400 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-500" /> Date Joined
                </span>
                <span className="text-slate-200">
                  {new Date(member.joiningDate).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* System metadata */}
          <div className="pt-2 text-xs text-slate-500 flex justify-between border-t border-slate-800/60 font-mono">
            <span>ID: {member.id}</span>
            {member.createdAt && (
              <span>Created: {new Date(member.createdAt).toLocaleDateString()}</span>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-900/50 border-t border-slate-800/60">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => onEdit(member)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl shadow-lg shadow-amber-500/10 transition-all"
          >
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
