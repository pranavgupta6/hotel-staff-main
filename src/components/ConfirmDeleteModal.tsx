import type { StaffMember } from '../types/staff';
import { AlertTriangle, X, Trash2 } from 'lucide-react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  member: StaffMember;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteModal({
  isOpen,
  member,
  isDeleting,
  onClose,
  onConfirm,
}: ConfirmDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-rose-400 font-semibold">
            <AlertTriangle className="w-5 h-5" />
            <h3>Confirm Staff Removal</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors"
            disabled={isDeleting}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-300">
            Are you sure you want to remove <span className="font-semibold text-white">{member.fullName}</span> ({member.employeeCode}) from the system?
          </p>
          <div className="p-3 bg-rose-950/30 border border-rose-900/40 rounded-xl text-xs text-rose-300">
            Warning: This action cannot be undone. All staff details and assignment records will be permanently deleted.
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-900/50 border-t border-slate-800/60">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-lg shadow-rose-600/20 transition-all disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Delete Member
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
