'use client';

import { AlertTriangle, Gavel, Shield } from 'lucide-react';

import { PageHeader } from '@/components/hr/page-header';
import { StatusBadge } from '@/components/hr/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  disciplinaryCases,
  formatDepartment,
  warningCases,
} from '@/lib/mock-data';
import { formatDateTime } from '@/lib/utils';

const WARNING_FLOW = [
  'AI Draft',
  'Department Manager Review',
  'Director Review',
  'CEO Approval',
  'Issue Warning Letter',
];

const ESCALATION = ['Warning 1', 'Warning 2', 'Automatic Suspension'];

export default function DisciplinaryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Disciplinary Management"
        description="AI warning drafts, escalation framework, legal risk assessment, and CEO override."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Warning Letter Workflow</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {WARNING_FLOW.map((step, i) => (
              <div key={step} className="flex items-center gap-2 text-sm">
                <Badge variant="muted" className="size-5 justify-center p-0 text-[10px]">
                  {i + 1}
                </Badge>
                <span>{step}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Escalation Framework</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {ESCALATION.map((step, i) => (
              <div key={step} className="flex items-center gap-2 text-sm">
                <AlertTriangle
                  className={`size-4 ${i === 2 ? 'text-destructive' : 'text-amber-400'}`}
                />
                <span>{step}</span>
              </div>
            ))}
            <p className="mt-2 text-xs text-muted-foreground">
              At suspension: system access revoked, critical work transferred to AI or designated personnel.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Warning Cases</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {warningCases.map((w) => (
            <div
              key={w.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border p-4"
            >
              <div>
                <p className="font-medium">{w.employeeName}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDepartment(w.department)} · Level {w.level} ·{' '}
                  {w.trigger.replace(/_/g, ' ')}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {w.aiDraftReady && (
                  <Badge variant="default">AI Draft Ready</Badge>
                )}
                <StatusBadge status={w.status} />
                <Button size="sm" variant="outline">
                  Review
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gavel className="size-4" />
            Disciplinary Cases
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {disciplinaryCases.map((c) => (
            <div
              key={c.id}
              className="rounded-lg border border-border p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium">{c.employeeName}</p>
                  <p className="text-xs text-muted-foreground">
                    Warning level {c.warningLevel}
                    {c.interviewDate &&
                      ` · Interview ${formatDateTime(c.interviewDate)}`}
                  </p>
                </div>
                <div className="flex gap-2">
                  {c.suspended && (
                    <Badge variant="destructive">Suspended</Badge>
                  )}
                  <StatusBadge status={c.status} />
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
                <div className="flex items-center gap-2">
                  <Shield className="size-4 text-amber-400" />
                  <p className="text-sm font-medium">
                    Legal AI Review — Risk Score: {c.legalRiskScore}/100
                  </p>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {c.legalRiskSummary}
                </p>
              </div>

              <div className="mt-3 flex gap-2">
                <Button size="sm">Reinstate Access</Button>
                <Button size="sm" variant="destructive">
                  Terminate Employment
                </Button>
              </div>
              <p className="mt-2 text-[10px] text-muted-foreground">
                CEO maintains immediate termination rights for exceptional circumstances.
                Mandatory reason and notes required before submission.
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
