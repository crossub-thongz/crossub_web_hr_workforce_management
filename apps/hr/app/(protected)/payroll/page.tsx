'use client';

import { ArrowRight, Banknote } from 'lucide-react';

import { PageHeader } from '@/components/hr/page-header';
import { StatusBadge } from '@/components/hr/status-badge';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { payrollInvoices } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

const WORKFLOW = [
  'Invoice Approved',
  'Payroll Approved',
  'Finance Approved',
  'Batch Payment',
  'Wise API',
  'Payment Completed',
];

const SALARY_MODELS = [
  { name: 'Monthly Salary', examples: 'IT, HR, Customer Service' },
  { name: 'Commission-Based', examples: 'Leasing Team' },
  { name: 'Per-Task', examples: 'Property Inspectors ($/inspection)' },
  { name: 'Hybrid', examples: 'Base + KPI Bonus + Commission' },
];

const CURRENCIES = ['AUD', 'MYR', 'RMB', 'USD', 'SGD'];

export default function PayrollPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Payroll System"
        description="Multi-currency salary management, invoice generation, and Wise batch payment workflow."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>May 2026 Payroll Invoices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {payrollInvoices.map((inv) => (
              <div
                key={inv.id}
                className="rounded-lg border border-border p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{inv.employeeName}</p>
                    <p className="text-xs text-muted-foreground">{inv.period}</p>
                  </div>
                  <p className="text-lg font-bold">
                    {formatCurrency(inv.total, inv.currency)}
                  </p>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
                  {inv.baseSalary > 0 && (
                    <span>Base: {formatCurrency(inv.baseSalary, inv.currency)}</span>
                  )}
                  {inv.commission > 0 && (
                    <span>Commission: {formatCurrency(inv.commission, inv.currency)}</span>
                  )}
                  {inv.kpiBonus > 0 && (
                    <span>KPI Bonus: {formatCurrency(inv.kpiBonus, inv.currency)}</span>
                  )}
                  {inv.allowances > 0 && (
                    <span>Allowances: {formatCurrency(inv.allowances, inv.currency)}</span>
                  )}
                  {inv.inspectionsCompleted != null && (
                    <span>{inv.inspectionsCompleted} inspections</span>
                  )}
                </div>
                <div className="mt-2">
                  <StatusBadge status={inv.status} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Banknote className="size-4" />
                Wise Payment Flow
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {WORKFLOW.map((step, i) => (
                <div key={step} className="flex items-center gap-2 text-sm">
                  <Badge variant="muted" className="size-5 justify-center p-0 text-[10px]">
                    {i + 1}
                  </Badge>
                  <span>{step}</span>
                  {i < WORKFLOW.length - 1 && (
                    <ArrowRight className="ml-auto size-3 text-muted-foreground" />
                  )}
                </div>
              ))}
              <p className="mt-2 text-xs text-muted-foreground">
                Future integration — batch payments to avoid individual processing.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Supported Currencies</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {CURRENCIES.map((c) => (
                <Badge key={c} variant="outline">
                  {c}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compensation Models</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SALARY_MODELS.map((m) => (
              <div key={m.name} className="rounded-lg border border-border p-4">
                <p className="text-sm font-medium">{m.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{m.examples}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Inspectors: weekly settlement based on completed inspections (Uber/DoorDash model).
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
