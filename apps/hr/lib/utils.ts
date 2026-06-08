import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { Currency } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function displayName(user: {
  firstName?: string | null;
  lastName?: string | null;
  email: string;
}): string {
  const name = [user.firstName, user.lastName].filter(Boolean).join(' ').trim();
  return name || user.email;
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatCurrency(amount: number, currency: Currency = 'AUD'): string {
  const locales: Record<Currency, string> = {
    AUD: 'en-AU',
    MYR: 'ms-MY',
    RMB: 'zh-CN',
    USD: 'en-US',
    SGD: 'en-SG',
  };
  return new Intl.NumberFormat(locales[currency], {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function statusColor(
  status: string,
): 'default' | 'success' | 'warning' | 'destructive' | 'muted' {
  const map: Record<string, 'default' | 'success' | 'warning' | 'destructive' | 'muted'> = {
    active: 'success',
    approved: 'success',
    paid: 'success',
    passed: 'success',
    probation: 'warning',
    onboarding: 'warning',
    pending_employee: 'warning',
    pending_payroll: 'warning',
    pending_finance: 'warning',
    manager_review: 'warning',
    finance_review: 'warning',
    hr_review: 'warning',
    management_approval: 'warning',
    suspended: 'destructive',
    terminated: 'destructive',
    rejected: 'destructive',
    draft: 'muted',
    submitted: 'default',
  };
  return map[status] ?? 'default';
}
