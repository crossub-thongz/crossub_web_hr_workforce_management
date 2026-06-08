export type Currency = 'AUD' | 'MYR' | 'RMB' | 'USD' | 'SGD';

export type PermissionRole =
  | 'hr_manager'
  | 'department_manager'
  | 'director'
  | 'ceo'
  | 'employee';

export type SalaryModel =
  | 'monthly'
  | 'commission'
  | 'per_task'
  | 'hybrid';

export type EmployeeStatus =
  | 'active'
  | 'probation'
  | 'onboarding'
  | 'suspended'
  | 'terminated';

export type Department =
  | 'inspection'
  | 'maintenance'
  | 'leasing'
  | 'customer_service'
  | 'hr'
  | 'it'
  | 'finance';

export interface Employee {
  id: string;
  employeeNumber: string;
  fullName: string;
  email: string;
  mobile: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  nationality: string;
  address: string;
  department: Department;
  position: string;
  status: EmployeeStatus;
  hireDate: string;
  probationEnd?: string;
  salaryModel: SalaryModel;
  baseSalary: number;
  currency: Currency;
  managerId?: string;
  profileComplete: boolean;
  emergencyContact: {
    name: string;
    relationship: string;
    mobile: string;
    email: string;
  };
  documents: {
    passport?: boolean;
    driverLicence?: boolean;
    nationalId?: boolean;
    utilityBill?: boolean;
    bankStatement?: boolean;
    governmentLetter?: boolean;
    degree?: boolean;
    resume?: boolean;
    contract?: boolean;
    nda?: boolean;
  };
}

export interface PayrollInvoice {
  id: string;
  employeeId: string;
  employeeName: string;
  period: string;
  currency: Currency;
  baseSalary: number;
  commission: number;
  kpiBonus: number;
  allowances: number;
  total: number;
  status: 'draft' | 'pending_employee' | 'pending_payroll' | 'pending_finance' | 'approved' | 'paid';
  inspectionsCompleted?: number;
}

export interface KpiMetric {
  id: string;
  department: Department;
  name: string;
  target: number;
  actual: number;
  unit: string;
  period: string;
  trend: 'up' | 'down' | 'stable';
}

export interface EmployeeKpi {
  employeeId: string;
  employeeName: string;
  department: Department;
  score: number;
  metrics: { name: string; value: number; target: number }[];
  riskLevel: 'none' | 'low' | 'medium' | 'high';
}

export interface RecruitmentRequest {
  id: string;
  department: Department;
  position: string;
  reason: 'staff_shortage' | 'expansion' | 'replacement';
  requestedBy: string;
  status: 'draft' | 'hr_review' | 'management_approval' | 'published' | 'filled';
  aiGenerated: boolean;
  applicants: number;
  shortlisted: number;
  createdAt: string;
}

export interface JobApplication {
  id: string;
  recruitmentId: string;
  candidateName: string;
  email: string;
  aiScore: number;
  stage: 'screening' | 'ai_interview' | 'manager_interview' | 'offer' | 'rejected' | 'hired';
  appliedAt: string;
}

export interface TrainingProgram {
  id: string;
  title: string;
  type: 'system' | 'industry' | 'compliance' | 'position_specific';
  department?: Department;
  dueDate: string;
  assignedCount: number;
  completedCount: number;
  aiTrainer: boolean;
}

export interface TrainingAssessment {
  id: string;
  trainingId: string;
  employeeId: string;
  employeeName: string;
  score: number;
  passed: boolean;
  completedAt: string;
}

export interface WarningCase {
  id: string;
  employeeId: string;
  employeeName: string;
  department: Department;
  level: 1 | 2 | 3;
  trigger: 'low_kpi' | 'complaints' | 'policy_violation';
  status: 'ai_draft' | 'manager_review' | 'director_review' | 'ceo_approval' | 'issued';
  aiDraftReady: boolean;
  createdAt: string;
}

export interface DisciplinaryCase {
  id: string;
  employeeId: string;
  employeeName: string;
  warningLevel: number;
  status: 'interview_scheduled' | 'pending_decision' | 'reinstated' | 'terminated' | 'suspended';
  suspended: boolean;
  legalRiskScore: number;
  legalRiskSummary: string;
  interviewDate?: string;
}

export interface ExpenseClaim {
  id: string;
  employeeId: string;
  employeeName: string;
  title: string;
  amount: number;
  currency: Currency;
  status: 'submitted' | 'manager_review' | 'finance_review' | 'approved' | 'paid' | 'rejected';
  submittedAt: string;
  receipts: number;
}

export interface Suggestion {
  id: string;
  employeeId: string;
  employeeName: string;
  title: string;
  content: string;
  category: 'system_improvement' | 'management_improvement' | 'other';
  aiCategory: string;
  forwardedTo: string;
  status: 'submitted' | 'reviewed' | 'rewarded';
  reward?: string;
  submittedAt: string;
}

export interface AiAlert {
  id: string;
  type: 'kpi_decline' | 'complaints' | 'workload' | 'staff_shortage' | 'training_due' | 'payroll';
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  employeeId?: string;
  department?: Department;
  createdAt: string;
}

export interface CommandCenterStats {
  totalEmployees: number;
  onProbation: number;
  activeRecruitment: number;
  trainingDue: number;
  kpiAlerts: number;
  warningCases: number;
  upcomingReviews: number;
  pendingPayroll: number;
  pendingExpenses: number;
  staffShortageAlerts: number;
}

export interface PermissionConfig {
  role: PermissionRole;
  label: string;
  canViewSalary: boolean;
  canViewPayroll: boolean;
  canViewKpi: boolean;
  canViewWarnings: boolean;
  canViewTermination: boolean;
  canApprovePayroll: boolean;
  canApproveWarnings: boolean;
  canTerminate: boolean;
}
