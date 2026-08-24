import type { StaffMember, StatusType } from '../types/staff';
import StatusBadge from './StatusBadge';
import ShiftBadge from './ShiftBadge';
import { Eye, Edit2, Trash2, Power, Mail } from 'lucide-react';

interface StaffTableProps {
  staff: StaffMember[];
  onViewDetails: (member: StaffMember) => void;
  onEdit: (member: StaffMember) => void;
  onDelete: (member: StaffMember) => void;
  onToggleStatus: (id: string, currentStatus: StatusType) => void;
}

export default function StaffTable({
  staff,
  onViewDetails,
  onEdit,
  onDelete,
  onToggleStatus,
}: StaffTableProps) {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950/80 text-xs uppercase font-semibold text-slate-400 border-b border-slate-800">
            <tr>
              <th className="py-3.5 px-4">Staff Member</th>
              <th className="py-3.5 px-4 hidden sm:table-cell">Emp Code</th>
              <th className="py-3.5 px-4">Role & Dept</th>
              <th className="py-3.5 px-4 hidden md:table-cell">Shift</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 hidden lg:table-cell">Joining Date</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {staff.map((member) => (
              <tr
                key={member.id}
                className="hover:bg-slate-800/40 transition-colors group"
              >
                {/* Name + Avatar */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm shrink-0">
                      {member.fullName.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-100 group-hover:text-amber-400 transition-colors truncate">
                        {member.fullName}
                      </p>
                      <p className="text-xs text-slate-400 truncate flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-500" />
                        {member.email}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Employee Code */}
                <td className="py-3.5 px-4 font-mono text-xs text-amber-400/90 font-medium hidden sm:table-cell">
                  {member.employeeCode}
                </td>

                {/* Role & Dept */}
                <td className="py-3.5 px-4">
                  <div>
                    <p className="font-medium text-slate-200">{member.role}</p>
                    <p className="text-xs text-slate-400">{member.department}</p>
                  </div>
                </td>

                {/* Shift */}
                <td className="py-3.5 px-4 hidden md:table-cell">
                  <ShiftBadge shift={member.shift} />
                </td>

                {/* Status Badge */}
                <td className="py-3.5 px-4">
                  <StatusBadge status={member.status} />
                </td>

                {/* Joining Date */}
                <td className="py-3.5 px-4 text-xs text-slate-400 hidden lg:table-cell">
                  {new Date(member.joiningDate).toLocaleDateString()}
                </td>

                {/* Actions */}
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onToggleStatus(member.id, member.status)}
                      title="Quick Toggle Status"
                      className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <Power className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onViewDetails(member)}
                      title="View Details"
                      className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(member)}
                      title="Edit Staff"
                      className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(member)}
                      title="Delete Staff"
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
