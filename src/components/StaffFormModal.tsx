import React, { useState, useEffect } from 'react';
import type {
  StaffMember,
  CreateStaffInput,
  RoleType,
  ShiftType,
  StatusType,
} from '../types/staff';
import { apiService } from '../services/api';
import { useToast } from '../context/ToastContext';
import { X, User, Mail, Phone, Calendar, Shield, Clock, AlertCircle } from 'lucide-react';

interface StaffFormModalProps {
  isOpen: boolean;
  initialData?: StaffMember | null;
  onClose: () => void;
  onSuccess: () => void;
}

const ROLES: RoleType[] = [
  'General Manager',
  'Front Desk',
  'Housekeeping',
  'Chef',
  'Waiter',
  'Security',
  'Maintenance',
];

const SHIFTS: ShiftType[] = ['Morning', 'Evening', 'Night'];

const STATUSES: StatusType[] = ['Active', 'On Leave', 'Inactive'];

export default function StaffFormModal({
  isOpen,
  initialData,
  onClose,
  onSuccess,
}: StaffFormModalProps) {
  const { showToast } = useToast();
  const isEditing = Boolean(initialData);

  const [formData, setFormData] = useState<CreateStaffInput>({
    fullName: '',
    email: '',
    phone: '',
    role: 'Front Desk',
    shift: 'Morning',
    status: 'Active',
    joiningDate: new Date().toISOString().split('T')[0],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        fullName: initialData.fullName || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        role: (initialData.role as RoleType) || 'Front Desk',
        shift: (initialData.shift as ShiftType) || 'Morning',
        status: (initialData.status as StatusType) || 'Active',
        joiningDate: initialData.joiningDate
          ? new Date(initialData.joiningDate).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
      });
    } else {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        role: 'Front Desk',
        shift: 'Morning',
        status: 'Active',
        joiningDate: new Date().toISOString().split('T')[0],
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.fullName.trim()) {
      setError('Full Name is required');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('A valid email address is required');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return;
    }

    try {
      setLoading(true);
      if (isEditing && initialData) {
        await apiService.updateStaff(initialData.id, formData);
        showToast('Staff member updated successfully', 'success');
      } else {
        await apiService.createStaff(formData);
        showToast('New staff member added successfully', 'success');
      }
      onSuccess();
    } catch (err: any) {
      const msg = err.message || 'Operation failed. Please check form input.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl space-y-0">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-slate-100">
              {isEditing ? 'Edit Staff Details' : 'Add New Staff Member'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="flex items-center gap-2.5 p-3.5 bg-rose-950/40 border border-rose-900/60 rounded-xl text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" /> Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Sarah Jenkins"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50"
            />
          </div>

          {/* Email & Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-400" /> Email *
              </label>
              <input
                type="email"
                required
                placeholder="sarah@hotel.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-400" /> Phone *
              </label>
              <input
                type="text"
                required
                placeholder="+1 555-0192"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-amber-500/50"
              />
            </div>
          </div>

          {/* Role Select (Auto Department) */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-400" /> Role *
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as RoleType })}
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-amber-500/50"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500">
              Department & employee code will be automatically assigned by the server.
            </p>
          </div>

          {/* Shift, Status & Joining Date Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Shift
              </label>
              <select
                value={formData.shift}
                onChange={(e) => setFormData({ ...formData, shift: e.target.value as ShiftType })}
                className="w-full px-2.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none"
              >
                {SHIFTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as StatusType })}
                className="w-full px-2.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none"
              >
                {STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" /> Joining Date
              </label>
              <input
                type="date"
                required
                value={formData.joiningDate}
                onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                className="w-full px-2.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800/80">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 rounded-xl shadow-lg shadow-amber-500/10 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                  Saving...
                </>
              ) : isEditing ? (
                'Save Changes'
              ) : (
                'Create Staff Member'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
