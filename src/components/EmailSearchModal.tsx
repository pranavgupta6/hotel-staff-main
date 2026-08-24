import React, { useState } from 'react';
import type { StaffMember } from '../types/staff';
import { apiService } from '../services/api';
import { Mail, Search, X, User, AlertCircle, ArrowRight } from 'lucide-react';
import StatusBadge from './StatusBadge';
import ShiftBadge from './ShiftBadge';

interface EmailSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStaff: (member: StaffMember) => void;
}

export default function EmailSearchModal({
  isOpen,
  onClose,
  onSelectStaff,
}: EmailSearchModalProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<StaffMember | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      setLoading(true);
      setError(null);
      setSearched(true);
      const staffMember = await apiService.getStaffByEmail(email.trim());
      setResult(staffMember);
    } catch (err: any) {
      setError(err.message || 'Error occurred while looking up email');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-amber-400 font-semibold">
            <Mail className="w-5 h-5" />
            <h3>Direct Email Search</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
              <input
                type="email"
                required
                placeholder="Enter exact email (e.g., manager@hotel.com)"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSearched(false);
                  setError(null);
                }}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold rounded-xl text-sm transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Search
                </>
              )}
            </button>
          </form>

          {/* Results section */}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-rose-950/30 border border-rose-900/40 rounded-xl text-xs text-rose-300">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {searched && !loading && !error && (
            <div>
              {result ? (
                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 font-bold">
                        {result.fullName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-100">{result.fullName}</h4>
                        <p className="text-xs text-slate-400">{result.email}</p>
                      </div>
                    </div>
                    <StatusBadge status={result.status} />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-800/60">
                    <div>
                      <span className="text-slate-500">Employee Code:</span>{' '}
                      <span className="text-slate-300 font-mono">{result.employeeCode}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Role:</span>{' '}
                      <span className="text-slate-300">{result.role}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Department:</span>{' '}
                      <span className="text-slate-300">{result.department}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Shift:</span>{' '}
                      <ShiftBadge shift={result.shift} />
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectStaff(result)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-xl border border-slate-700 transition-colors"
                  >
                    View Full Profile & Actions
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center py-8 space-y-2">
                  <User className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-sm font-medium text-slate-300">No staff member found</p>
                  <p className="text-xs text-slate-500">
                    No member registered with <span className="text-amber-400/80">{email}</span>.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
