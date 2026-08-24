import type {
  StaffMember,
  CreateStaffInput,
  UpdateStaffInput,
  FilterOptions,
  StaffStats,
  FetchStaffParams,
  ApiResponse,
} from '../types/staff';

const API_BASE_URL = 'https://testaug.onrender.com';

class ApiError extends Error {
  statusCode?: number;
  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    const contentType = response.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { success: response.ok, data: text };
    }

    if (!response.ok || data.success === false) {
      const errorMessage = data?.error || data?.message || `HTTP Error ${response.status}`;
      throw new ApiError(errorMessage, response.status);
    }

    return data;
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error?.message || 'Network error occurred. Please check API connection.');
  }
}

function normalizeMember(item: any): StaffMember {
  if (!item) return item;
  const id = item.id || item._id || '';
  return {
    ...item,
    id,
    _id: id,
  };
}

export const apiService = {
  // Check API health
  async checkHealth(): Promise<boolean> {
    try {
      const res = await request<{ status: string }>('/health');
      return res.data?.status === 'ok';
    } catch {
      return false;
    }
  },

  // Get available filter values
  async getFilters(): Promise<FilterOptions> {
    const res = await request<FilterOptions>('/api/filters');
    return res.data;
  },

  // Get aggregated stats
  async getStats(): Promise<StaffStats> {
    const res = await request<StaffStats>('/api/stats');
    return res.data;
  },

  // Get staff list with optional filters, search & pagination
  async fetchStaff(params: FetchStaffParams = {}): Promise<{ staff: StaffMember[]; meta: ApiResponse<any>['meta'] }> {
    const query = new URLSearchParams();
    if (params.q?.trim()) query.append('q', params.q.trim());
    if (params.role) query.append('role', params.role);
    if (params.department) query.append('department', params.department);
    if (params.shift) query.append('shift', params.shift);
    if (params.status) query.append('status', params.status);
    if (params.page) query.append('page', params.page.toString());
    if (params.limit) query.append('limit', params.limit.toString());
    if (params.sort) query.append('sort', params.sort);
    if (params.order) query.append('order', params.order);

    const queryString = query.toString() ? `?${query.toString()}` : '';
    const res = await request<StaffMember[]>(`/api/staff${queryString}`);
    
    const list = Array.isArray(res.data) ? res.data.map(normalizeMember) : [];
    return {
      staff: list,
      meta: res.meta || { page: 1, limit: 10, total: list.length, totalPages: 1 },
    };
  },

  // Get single staff member by ID
  async getStaffById(id: string): Promise<StaffMember> {
    const res = await request<StaffMember>(`/api/staff/${id}`);
    return normalizeMember(res.data);
  },

  // Get single staff member by Email (helper for requirement 4)
  async getStaffByEmail(email: string): Promise<StaffMember | null> {
    const { staff } = await this.fetchStaff({ q: email.trim(), limit: 100 });
    const exactMatch = staff.find(
      (s) => s.email.toLowerCase() === email.trim().toLowerCase()
    );
    return exactMatch ? normalizeMember(exactMatch) : null;
  },

  // Create new staff member
  async createStaff(input: CreateStaffInput): Promise<StaffMember> {
    const res = await request<StaffMember>('/api/staff', {
      method: 'POST',
      body: JSON.stringify({
        fullName: input.fullName.trim(),
        email: input.email.trim(),
        phone: input.phone.trim(),
        role: input.role,
        shift: input.shift,
        status: input.status,
        joiningDate: input.joiningDate,
      }),
    });
    return normalizeMember(res.data);
  },

  // Full update of staff member (PUT)
  async updateStaff(id: string, input: UpdateStaffInput): Promise<StaffMember> {
    const res = await request<StaffMember>(`/api/staff/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        fullName: input.fullName.trim(),
        email: input.email.trim(),
        phone: input.phone.trim(),
        role: input.role,
        shift: input.shift,
        status: input.status,
        joiningDate: input.joiningDate,
      }),
    });
    return normalizeMember(res.data);
  },

  // Partial status update (PATCH)
  async patchStaffStatus(id: string, status: StaffMember['status']): Promise<StaffMember> {
    const res = await request<StaffMember>(`/api/staff/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    return normalizeMember(res.data);
  },

  // Delete staff member
  async deleteStaff(id: string): Promise<boolean> {
    const res = await request<{ id: string; deleted: boolean }>(`/api/staff/${id}`, {
      method: 'DELETE',
    });
    return res.data?.deleted ?? true;
  },
};
