'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { PageHeader } from '@/components/hr/page-header';
import { StatusBadge } from '@/components/hr/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  employeeKpis,
  formatDepartment,
  getEmployeeById,
  payrollInvoices,
  trainingAssessments,
  warningCases,
} from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function EmployeeDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const employee = getEmployeeById(id);

  if (!employee) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-muted-foreground">Employee not found.</p>
        <Button asChild variant="outline">
          <Link href="/employees">Back to employees</Link>
        </Button>
      </div>
    );
  }

  const kpi = employeeKpis.find((k) => k.employeeId === id);
  const payroll = payrollInvoices.filter((p) => p.employeeId === id);
  const training = trainingAssessments.filter((t) => t.employeeId === id);
  const warnings = warningCases.filter((w) => w.employeeId === id);

  const docEntries = Object.entries(employee.documents).filter(([, v]) => v);

  return (
    <div className="space-y-6">
      <PageHeader
        title={employee.fullName}
        description={`${employee.position} · ${formatDepartment(employee.department)}`}
        action={
          <Button asChild variant="outline">
            <Link href="/employees">← All employees</Link>
          </Button>
        }
      />

      <div className="flex flex-wrap gap-2">
        <StatusBadge status={employee.status} />
        <Badge variant="outline">{employee.employeeNumber}</Badge>
        <Badge variant="outline" className="capitalize">
          {employee.salaryModel.replace('_', ' ')}
        </Badge>
        {employee.probationEnd && (
          <Badge variant="warning">
            Probation until {formatDate(employee.probationEnd)}
          </Badge>
        )}
      </div>

      <Tabs defaultValue="personal">
        <TabsList>
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="kpi">KPI</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="disciplinary">Warnings</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <Row label="Email" value={employee.email} />
                <Row label="Mobile" value={employee.mobile} />
                <Row label="Date of Birth" value={formatDate(employee.dateOfBirth)} />
                <Row label="Age" value={String(employee.age)} />
                <Row label="Gender" value={employee.gender} />
                <Row label="Nationality" value={employee.nationality} />
                <Row label="Address" value={employee.address} />
                <Row label="Hire Date" value={formatDate(employee.hireDate)} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <Row label="Name" value={employee.emergencyContact.name} />
                <Row label="Relationship" value={employee.emergencyContact.relationship} />
                <Row label="Mobile" value={employee.emergencyContact.mobile} />
                <Row label="Email" value={employee.emergencyContact.email} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payroll">
          <Card>
            <CardHeader>
              <CardTitle>Payroll Records</CardTitle>
            </CardHeader>
            <CardContent>
              {payroll.length === 0 ? (
                <p className="text-sm text-muted-foreground">No payroll records.</p>
              ) : (
                <div className="space-y-3">
                  {payroll.map((inv) => (
                    <div
                      key={inv.id}
                      className="flex items-center justify-between rounded-lg border border-border p-3"
                    >
                      <div>
                        <p className="text-sm font-medium">{inv.period}</p>
                        {inv.inspectionsCompleted != null && (
                          <p className="text-xs text-muted-foreground">
                            {inv.inspectionsCompleted} inspections completed
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {formatCurrency(inv.total, inv.currency)}
                        </p>
                        <StatusBadge status={inv.status} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kpi">
          {kpi ? (
            <Card>
              <CardHeader>
                <CardTitle>KPI Score: {kpi.score}%</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Badge
                  variant={
                    kpi.riskLevel === 'high'
                      ? 'destructive'
                      : kpi.riskLevel === 'medium'
                        ? 'warning'
                        : 'success'
                  }
                >
                  Risk: {kpi.riskLevel}
                </Badge>
                {kpi.metrics.map((m) => (
                  <div
                    key={m.name}
                    className="flex justify-between rounded-lg border border-border p-3 text-sm"
                  >
                    <span>{m.name}</span>
                    <span>
                      {m.value} / {m.target}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : (
            <p className="text-sm text-muted-foreground">No KPI data available.</p>
          )}
        </TabsContent>

        <TabsContent value="training">
          <Card>
            <CardContent className="pt-6">
              {training.length === 0 ? (
                <p className="text-sm text-muted-foreground">No training assessments.</p>
              ) : (
                training.map((t) => (
                  <div
                    key={t.id}
                    className="flex justify-between border-b border-border py-3 text-sm last:border-0"
                  >
                    <span>Assessment score: {t.score}%</span>
                    <StatusBadge status={t.passed ? 'approved' : 'rejected'} />
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disciplinary">
          {warnings.length === 0 ? (
            <p className="text-sm text-muted-foreground">No warning letters on file.</p>
          ) : (
            warnings.map((w) => (
              <Card key={w.id}>
                <CardContent className="flex items-center justify-between pt-6">
                  <div>
                    <p className="text-sm font-medium">Warning Level {w.level}</p>
                    <p className="text-xs capitalize text-muted-foreground">
                      Trigger: {w.trigger.replace('_', ' ')}
                    </p>
                  </div>
                  <StatusBadge status={w.status} />
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {docEntries.map(([key]) => (
                  <Badge key={key} variant="success" className="capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Badge>
                ))}
                {docEntries.length === 0 && (
                  <p className="text-sm text-muted-foreground">No documents uploaded.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}
