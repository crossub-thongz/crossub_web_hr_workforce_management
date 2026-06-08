export const ROUTES = {
  LOGIN: '/login',
  COMMAND_CENTER: '/command-center',
  EMPLOYEES: '/employees',
  ONBOARDING: '/onboarding',
  PAYROLL: '/payroll',
  KPI: '/kpi',
  RECRUITMENT: '/recruitment',
  TRAINING: '/training',
  DISCIPLINARY: '/disciplinary',
  EXPENSES: '/expenses',
  SUGGESTIONS: '/suggestions',
  PERMISSIONS: '/permissions',
  PROFILE: '/profile',
} as const;

const PUBLIC = new Set<string>([ROUTES.LOGIN]);

export function isPublicRoute(pathname: string): boolean {
  return PUBLIC.has(pathname);
}
