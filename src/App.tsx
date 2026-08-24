import { useState, useEffect, useCallback } from 'react';
import type {
  StaffMember,
  StaffStats,
  FetchStaffParams,
  PaginationMeta,
  StatusType,
} from './types/staff';
import { apiService } from './services/api';
import { useToast } from './context/ToastContext';

// Components
import Header from './components/Header';
import StatsOverview from './components/StatsOverview';
import FilterBar from './components/FilterBar';
import StaffTable from './components/StaffTable';
import StaffCardGrid from './components/StaffCardGrid';
import Pagination from './components/Pagination';
import StaffFormModal from './components/StaffFormModal';
import StaffDetailsModal from './components/StaffDetailsModal';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import EmailSearchModal from './components/EmailSearchModal';
import LoadingSkeleton from './components/LoadingSkeleton';
import EmptyState from './components/EmptyState';
import ErrorState from './components/ErrorState';

export default function App() {
  const { showToast } = useToast();

  // Primary State
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [stats, setStats] = useState<StaffStats | null>(null);
  const [meta, setMeta] = useState<PaginationMeta>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  // UI State
  const [loading, setLoading] = useState<boolean>(true);
  const [statsLoading, setStatsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);

  // Filter & Search Params
  const [queryParams, setQueryParams] = useState<FetchStaffParams>({
    page: 1,
    limit: 10,
    q: '',
    role: '',
    department: '',
    shift: '',
    status: '',
    sort: 'joiningDate',
    order: 'desc',
  });

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedStaffForEdit, setSelectedStaffForEdit] = useState<StaffMember | null>(null);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedStaffForDetails, setSelectedStaffForDetails] = useState<StaffMember | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStaffForDelete, setSelectedStaffForDelete] = useState<StaffMember | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isEmailSearchOpen, setIsEmailSearchOpen] = useState(false);

  // Check API Health
  const checkHealth = async () => {
    const isHealthy = await apiService.checkHealth();
    setApiOnline(isHealthy);
  };

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Poll health every 30s
    return () => clearInterval(interval);
  }, []);

  // Fetch Stats
  const loadStats = useCallback(async () => {
    try {
      setStatsLoading(true);
      const data = await apiService.getStats();
      setStats(data);
    } catch (err: any) {
      console.error('Failed to load stats:', err);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  // Fetch Staff List
  const loadStaff = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { staff: data, meta: metaData } = await apiService.fetchStaff(queryParams);
      setStaff(data);
      if (metaData) {
        setMeta(metaData);
      }
    } catch (err: any) {
      const msg = err.message || 'Failed to fetch staff directory.';
      setError(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  }, [queryParams, showToast]);

  useEffect(() => {
    loadStaff();
  }, [loadStaff]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  // Handler: Change Query Params
  const handleQueryChange = (newParams: Partial<FetchStaffParams>) => {
    setQueryParams((prev) => {
      const updated = { ...prev, ...newParams };
      if (!('page' in newParams)) {
        updated.page = 1;
      }
      return updated;
    });
  };

  // Handler: Reset Filters
  const handleResetFilters = () => {
    setQueryParams({
      page: 1,
      limit: 10,
      q: '',
      role: '',
      department: '',
      shift: '',
      status: '',
      sort: 'joiningDate',
      order: 'desc',
    });
  };

  // Handler: Toggle Status Quick Action
  const handleStatusToggle = async (id: string, currentStatus: StatusType) => {
    const newStatus: StatusType = currentStatus === 'Active' ? 'On Leave' : 'Active';
    try {
      setStaff((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
      );
      await apiService.patchStaffStatus(id, newStatus);
      showToast(`Status updated to ${newStatus}`, 'success');
      loadStats();
    } catch (err: any) {
      setStaff((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: currentStatus } : s))
      );
      showToast(err.message || 'Failed to update status', 'error');
    }
  };

  // Handler: Open Add Modal
  const handleOpenAddModal = () => {
    setSelectedStaffForEdit(null);
    setIsFormModalOpen(true);
  };

  // Handler: Open Edit Modal
  const handleOpenEditModal = (member: StaffMember) => {
    setSelectedStaffForEdit(member);
    setIsFormModalOpen(true);
  };

  // Handler: Open Details Modal
  const handleOpenDetailsModal = (member: StaffMember) => {
    setSelectedStaffForDetails(member);
    setIsDetailsModalOpen(true);
  };

  // Handler: Open Delete Confirmation Modal
  const handleOpenDeleteModal = (member: StaffMember) => {
    setSelectedStaffForDelete(member);
    setIsDeleteModalOpen(true);
  };

  // Handler: Confirm Delete
  const handleConfirmDelete = async () => {
    if (!selectedStaffForDelete) return;
    try {
      setIsDeleting(true);
      await apiService.deleteStaff(selectedStaffForDelete.id);
      showToast(`Staff member "${selectedStaffForDelete.fullName}" deleted`, 'success');
      setIsDeleteModalOpen(false);
      setSelectedStaffForDelete(null);
      loadStaff();
      loadStats();
    } catch (err: any) {
      showToast(err.message || 'Failed to delete staff member', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  // Handler: Form Submission Success (Create or Edit)
  const handleFormSuccess = () => {
    setIsFormModalOpen(false);
    setSelectedStaffForEdit(null);
    loadStaff();
    loadStats();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Header Bar */}
      <Header
        isHealthOk={apiOnline}
        onCheckHealth={checkHealth}
        onOpenCreateModal={handleOpenAddModal}
        onOpenEmailSearchModal={() => setIsEmailSearchOpen(true)}
        onRefresh={loadStaff}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        isRefreshing={loading}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI / Statistics Cards */}
        <StatsOverview stats={stats} loading={statsLoading} />

        {/* Filter and Control Bar */}
        <FilterBar
          params={queryParams}
          onParamsChange={handleQueryChange}
          onReset={handleResetFilters}
          totalCount={meta.total}
        />

        {/* Directory Main Section */}
        <section className="space-y-4">
          {error ? (
            <ErrorState message={error} onRetry={loadStaff} />
          ) : loading ? (
            <LoadingSkeleton viewMode={viewMode} />
          ) : staff.length === 0 ? (
            <EmptyState
              onResetFilters={handleResetFilters}
              onAddStaff={handleOpenAddModal}
              hasFilters={
                Boolean(
                  queryParams.q ||
                  queryParams.role ||
                  queryParams.department ||
                  queryParams.shift ||
                  queryParams.status
                )
              }
            />
          ) : (
            <>
              {viewMode === 'table' ? (
                <StaffTable
                  staff={staff}
                  onViewDetails={handleOpenDetailsModal}
                  onEdit={handleOpenEditModal}
                  onDelete={handleOpenDeleteModal}
                  onToggleStatus={handleStatusToggle}
                />
              ) : (
                <StaffCardGrid
                  staff={staff}
                  onViewDetails={handleOpenDetailsModal}
                  onEdit={handleOpenEditModal}
                  onDelete={handleOpenDeleteModal}
                  onToggleStatus={handleStatusToggle}
                />
              )}

              {/* Pagination Component */}
              <Pagination
                meta={meta}
                onPageChange={(page) => handleQueryChange({ page })}
                onLimitChange={(limit) => handleQueryChange({ limit, page: 1 })}
              />
            </>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>© 2026 Grand Horizon Staff Management System • Powered by Render API</p>
      </footer>

      {/* Modals */}
      {isFormModalOpen && (
        <StaffFormModal
          isOpen={isFormModalOpen}
          initialData={selectedStaffForEdit}
          onClose={() => {
            setIsFormModalOpen(false);
            setSelectedStaffForEdit(null);
          }}
          onSuccess={handleFormSuccess}
        />
      )}

      {isDetailsModalOpen && selectedStaffForDetails && (
        <StaffDetailsModal
          isOpen={isDetailsModalOpen}
          member={selectedStaffForDetails}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedStaffForDetails(null);
          }}
          onEdit={(member) => {
            setIsDetailsModalOpen(false);
            handleOpenEditModal(member);
          }}
        />
      )}

      {isDeleteModalOpen && selectedStaffForDelete && (
        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          member={selectedStaffForDelete}
          isDeleting={isDeleting}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedStaffForDelete(null);
          }}
          onConfirm={handleConfirmDelete}
        />
      )}

      {isEmailSearchOpen && (
        <EmailSearchModal
          isOpen={isEmailSearchOpen}
          onClose={() => setIsEmailSearchOpen(false)}
          onSelectStaff={(member) => {
            setIsEmailSearchOpen(false);
            handleOpenDetailsModal(member);
          }}
        />
      )}
    </div>
  );
}
