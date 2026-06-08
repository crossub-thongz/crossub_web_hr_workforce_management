'use client';

import { Receipt, Upload } from 'lucide-react';

import { PageHeader } from '@/components/hr/page-header';
import { StatusBadge } from '@/components/hr/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { expenseClaims } from '@/lib/mock-data';
import { formatCurrency, formatDateTime } from '@/lib/utils';

const WORKFLOW = [
  'Submitted',
  'Manager Review',
  'Finance Review',
  'Approved',
  'Paid',
];

export default function ExpensesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Expense Claim Management"
        description="Reimbursement requests with receipt uploads and multi-stage approval."
        action={
          <Button>
            <Upload className="size-4" />
            Submit claim
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="size-4" />
            Approval Workflow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {WORKFLOW.map((step, i) => (
              <div key={step} className="flex items-center gap-2 text-sm">
                <span className="rounded-md border border-border px-2 py-1">
                  {step}
                </span>
                {i < WORKFLOW.length - 1 && (
                  <span className="text-muted-foreground">→</span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Claims</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {expenseClaims.map((claim) => (
            <div
              key={claim.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border p-4"
            >
              <div>
                <p className="font-medium">{claim.title}</p>
                <p className="text-xs text-muted-foreground">
                  {claim.employeeName} · {claim.receipts} receipts ·{' '}
                  {formatDateTime(claim.submittedAt)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-bold">
                  {formatCurrency(claim.amount, claim.currency)}
                </p>
                <StatusBadge status={claim.status} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
