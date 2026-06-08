'use client';

import { PageHeader } from '@/components/hr/page-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { departmentKpis, employeeKpis, formatDepartment } from '@/lib/mock-data';

const trendIcon = {
  up: '↑',
  down: '↓',
  stable: '→',
};

export default function KpiPage() {
  const byDepartment = departmentKpis.reduce(
    (acc, kpi) => {
      if (!acc[kpi.department]) acc[kpi.department] = [];
      acc[kpi.department].push(kpi);
      return acc;
    },
    {} as Record<string, typeof departmentKpis>,
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="KPI Management"
        description="Department-level KPIs with AI performance monitoring and employee risk detection."
      />

      <Tabs defaultValue="departments">
        <TabsList>
          <TabsTrigger value="departments">By Department</TabsTrigger>
          <TabsTrigger value="employees">Employee Performance</TabsTrigger>
          <TabsTrigger value="ai">AI Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="departments" className="space-y-4">
          {Object.entries(byDepartment).map(([dept, kpis]) => (
            <Card key={dept}>
              <CardHeader>
                <CardTitle>{formatDepartment(dept as Parameters<typeof formatDepartment>[0])}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {kpis.map((kpi) => {
                    const pct = Math.round((kpi.actual / kpi.target) * 100);
                    const onTarget = kpi.name.includes('Complaint') || kpi.name.includes('Vacancy') || kpi.name.includes('Response')
                      ? kpi.actual <= kpi.target
                      : kpi.actual >= kpi.target;
                    return (
                      <div
                        key={kpi.id}
                        className="rounded-lg border border-border p-4"
                      >
                        <div className="flex items-start justify-between">
                          <p className="text-sm font-medium">{kpi.name}</p>
                          <span className="text-xs text-muted-foreground">
                            {trendIcon[kpi.trend]}
                          </span>
                        </div>
                        <p className="mt-2 text-2xl font-bold">
                          {kpi.actual}
                          <span className="text-sm font-normal text-muted-foreground">
                            {' '}
                            / {kpi.target} {kpi.unit}
                          </span>
                        </p>
                        <Badge
                          variant={onTarget ? 'success' : 'warning'}
                          className="mt-2"
                        >
                          {pct}% of target
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="employees">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {employeeKpis.map((emp) => (
              <Card key={emp.employeeId}>
                <CardHeader>
                  <CardTitle className="text-base">{emp.employeeName}</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {formatDepartment(emp.department)} · Score {emp.score}%
                  </p>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge
                    variant={
                      emp.riskLevel === 'high'
                        ? 'destructive'
                        : emp.riskLevel === 'medium'
                          ? 'warning'
                          : 'success'
                    }
                  >
                    {emp.riskLevel} risk
                  </Badge>
                  {emp.metrics.map((m) => (
                    <div
                      key={m.name}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-muted-foreground">{m.name}</span>
                      <span>
                        {m.value}/{m.target}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle>AI Performance Monitoring</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p className="text-muted-foreground">
                AI continuously analyzes productivity, complaints, KPI performance, attendance, and deadlines.
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: 'KPI Decline', detail: 'James O\'Brien — 3 weeks below threshold' },
                  { label: 'Increased Complaints', detail: 'Maintenance dept +40% this month' },
                  { label: 'Abnormal Workload', detail: 'Inspection team overtime pattern detected' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4"
                  >
                    <p className="font-medium text-amber-400">{item.label}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Employees are automatically notified when risks are detected.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
