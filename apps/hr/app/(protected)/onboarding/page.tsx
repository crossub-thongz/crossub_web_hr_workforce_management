'use client';

import { FileText, Sparkles, Upload } from 'lucide-react';

import { PageHeader } from '@/components/hr/page-header';
import { StatusBadge } from '@/components/hr/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { employees, formatDepartment } from '@/lib/mock-data';

const onboardingEmployees = employees.filter(
  (e) => e.status === 'onboarding' || !e.profileComplete,
);

const REQUIRED_SECTIONS = [
  'Personal Information',
  'Identification Documents',
  'Address Verification',
  'Emergency Contact',
  'Education',
  'Employment Documents',
];

function profileProgress(emp: (typeof employees)[0]): number {
  const docs = Object.values(emp.documents).filter(Boolean).length;
  const personal = emp.fullName && emp.email && emp.mobile ? 1 : 0;
  const emergency = emp.emergencyContact.name ? 1 : 0;
  const total = 6 + REQUIRED_SECTIONS.length;
  const completed = docs + personal + emergency + (emp.profileComplete ? 4 : 0);
  return Math.min(100, Math.round((completed / total) * 100));
}

export default function OnboardingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Employee Onboarding"
        description="First-login profile completion, document uploads, and AI-generated employment contracts."
        action={
          <Button variant="outline">
            <Upload className="size-4" />
            Manual backfill (existing employees)
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              AI Contract Generation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Based on country, position, department, and salary, the system automatically generates:
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>Employment Agreement</li>
              <li>NDA</li>
              <li>Job Description</li>
            </ul>
            <Button size="sm" className="mt-2">
              <FileText className="size-4" />
              Generate for pending hires
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inspector Training Path</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="rounded-lg border border-border p-3">
              <p className="font-medium">New Inspector (Without Licence)</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Senior training → Assessment → Approval → Eligible to work
              </p>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="font-medium">Licensed Inspector</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Immediate deployment → AI quality monitoring
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Onboarding ({onboardingEmployees.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {onboardingEmployees.map((emp) => {
            const progress = profileProgress(emp);
            return (
              <div
                key={emp.id}
                className="rounded-lg border border-border p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{emp.fullName}</p>
                    <p className="text-sm text-muted-foreground">
                      {emp.position} · {formatDepartment(emp.department)}
                    </p>
                  </div>
                  <StatusBadge status={emp.status} />
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Profile completion</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {REQUIRED_SECTIONS.map((section) => (
                    <Badge
                      key={section}
                      variant={progress > 50 ? 'success' : 'muted'}
                      className="text-[10px]"
                    >
                      {section}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
