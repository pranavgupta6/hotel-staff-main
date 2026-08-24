export type ShiftType = 'Morning' | 'Evening' | 'Afternoon' | 'Night';
export type StatusType = 'Active' | 'On Leave' | 'Inactive' | 'Terminated';
export type RoleType = 
  | 'General Manager' 
  | 'Manager'
  | 'Front Desk' 
  | 'Receptionist'
  | 'Housekeeping' 
  | 'Housekeeper'
  | 'Chef' 
  | 'Waiter' 
  | 'Security' 
  | 'Maintenance';

export interface StaffMember {
  id: string;
  _id?: string;
  employeeCode: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  shift: ShiftType;
  status: StatusType;
  joiningDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateStaffInput {
  fullName: string;
  email: string;
  phone: string;
  role: RoleType;
  shift: ShiftType;
  status: StatusType;
  joiningDate: string;
}

export interface UpdateStaffInput {
  fullName: string;
  email: string;
  phone: string;
  role: RoleType;
  shift: ShiftType;
  status: StatusType;
  joiningDate: string;
}

export interface FilterOptions {
  roles: string[];
  departments: string[];
  roleDepartment: Record<string, string>;
  shifts: ShiftType[];
  statuses: StatusType[];
  sortFields: string[];
}

export interface StaffStats {
  total: number;
  active: number;
  onLeave: number;
  inactive: number;
  totalStaff?: number;
  activeStaff?: number;
  onLeaveStaff?: number;
  byRole?: Record<string, number>;
  byDepartment?: Record<string, number>;
  byStatus?: Record<string, number>;
  byShift?: Record<string, number>;
}

export interface FetchStaffParams {
  q?: string;
  role?: string;
  department?: string;
  shift?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: PaginationMeta;
  error?: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
}
