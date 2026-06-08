'use client';

import {
  AlertTriangle,
  Banknote,
  Brain,
  GraduationCap,
  Receipt,
  UserPlus,
  Users,
  UserX,
} from 'lucide-react';
import Link from 'next/link';

import { PageHeader } from '@/components/hr/page-header';
import { StatCard } from '@/components/hr/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ROUTES } from '@/constants/routes';
import { aiAlerts, commandCenterStats } from '@/lib/mock-data';
import { formatDateTime } from '@/lib/utils';

const severityVariant = {
  info: 'muted' as const,
  warning: 'warning' as const,
  critical: 'destructive' as const,
};

export default function CommandCenterPage() {
  const stats = commandCenterStats;

  return (
    <div className="space-y-8">
      <PageHeader
        title="AI HR Command Center"
        description="Real-time workforce intelligence — management focuses on approvals and strategic decisions."
        action={
          <Button asChild>
            <Link href={ROUTES.RECRUITMENT}>
              <Brain className="size-4" />
              View AI Recruitment
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard label="Total Employees" value={stats.totalEmployees} icon={Users} />
        <StatCard label="On Probation" value={stats.onProbation} icon={UserPlus} trend="Review due this month" />
        <StatCard label="Active Recruitment" value={stats.activeRecruitment} icon={Brain} />
        <StatCard label="Training Due" value={stats.trainingDue} icon={GraduationCap} />
        <StatCard label="KPI Alerts" value={stats.kpiAlerts} icon={AlertTriangle} />
        <StatCard label="Warning Cases" value={stats.warningCases} icon={UserX} />
        <StatCard label="Upcoming Reviews" value={stats.upcomingReviews} icon={Users} />
        <StatCard label="Pending Payroll" value={stats.pendingPayroll} icon={Banknote} />
        <StatCard label="Pending Expenses" value={stats.pendingExpenses} icon={Receipt} />
        <StatCard label="Staff Shortage Alerts" value={stats.staffShortageAlerts} icon={AlertTriangle} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>AI Risk Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start justify-between gap-3 rounded-lg border border-border p-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{alert.title}</p>
                    <Badge variant={severityVariant[alert.severity]}>
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {alert.description}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {formatDateTime(alert.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Approval Queue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: 'Payroll invoices awaiting finance', count: 2, href: ROUTES.PAYROLL },
              { label: 'Warning letters pending CEO approval', count: 1, href: ROUTES.DISCIPLINARY },
              { label: 'Expense claims in finance review', count: 1, href: ROUTES.EXPENSES },
              { label: 'Recruitment requests for management', count: 1, href: ROUTES.RECRUITMENT },
              { label: 'Onboarding profiles incomplete', count: 2, href: ROUTES.ONBOARDING },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-secondary/50"
              >
                <span className="text-sm">{item.label}</span>
                <Badge variant="warning">{item.count}</Badge>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Automation Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'AI Recruitment', status: 'Active', detail: '1 auto-generated request' },
              { name: 'AI Training', status: 'Active', detail: '3 programs with AI trainer' },
              { name: 'AI Performance Monitor', status: 'Active', detail: '5 risk alerts this week' },
              { name: 'AI Payroll Processing', status: 'Active', detail: '4 invoices generated' },
              { name: 'AI Warning Drafts', status: 'Active', detail: '2 drafts ready for review' },
              { name: 'Wise Payment Integration', status: 'Planned', detail: 'Batch payment workflow' },
              { name: 'Job Board Integration', status: 'Planned', detail: 'SEEK, Indeed, LinkedIn' },
              { name: 'Legal AI Review', status: 'Active', detail: '1 termination risk assessment' },
            ].map((item) => (
              <div key={item.name} className="rounded-lg border border-border p-4">
                <p className="text-sm font-medium">{item.name}</p>
                <Badge
                  variant={item.status === 'Active' ? 'success' : 'muted'}
                  className="mt-2"
                >
                  {item.status}
                </Badge>
                <p className="mt-2 text-xs text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
