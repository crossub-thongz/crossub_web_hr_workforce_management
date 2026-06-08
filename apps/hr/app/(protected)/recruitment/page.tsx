'use client';

import { Brain, Sparkles } from 'lucide-react';

import { PageHeader } from '@/components/hr/page-header';
import { StatusBadge } from '@/components/hr/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  formatDepartment,
  jobApplications,
  recruitmentRequests,
} from '@/lib/mock-data';
import { formatDateTime } from '@/lib/utils';

const PIPELINE = [
  'AI Screening',
  'AI Scoring',
  'Shortlisting',
  'AI Interview',
  'Manager Interview',
  'Offer',
  'Onboarding',
];

export default function RecruitmentPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Recruitment Automation"
        description="AI workforce planning, job advertisements, and application processing."
        action={
          <Button>
            <Sparkles className="size-4" />
            New recruitment request
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="size-4 text-primary" />
            Application Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {PIPELINE.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <Badge variant="outline">{step}</Badge>
                {i < PIPELINE.length - 1 && (
                  <span className="text-muted-foreground">→</span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Active Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recruitmentRequests.map((req) => (
              <div
                key={req.id}
                className="rounded-lg border border-border p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{req.position}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDepartment(req.department)} · {req.requestedBy}
                    </p>
                  </div>
                  {req.aiGenerated && (
                    <Badge variant="default">
                      <Sparkles className="mr-1 size-3" />
                      AI Generated
                    </Badge>
                  )}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <StatusBadge status={req.status} />
                  <Badge variant="muted" className="capitalize">
                    {req.reason.replace('_', ' ')}
                  </Badge>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {req.applicants} applicants · {req.shortlisted} shortlisted ·{' '}
                  {formatDateTime(req.createdAt)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Applications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {jobApplications.map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div>
                  <p className="text-sm font-medium">{app.candidateName}</p>
                  <p className="text-xs text-muted-foreground">{app.email}</p>
                </div>
                <div className="text-right">
                  <Badge variant={app.aiScore >= 85 ? 'success' : 'warning'}>
                    AI Score: {app.aiScore}
                  </Badge>
                  <p className="mt-1">
                    <StatusBadge status={app.stage} />
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Future Integrations</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {['SEEK', 'Indeed', 'LinkedIn'].map((board) => (
            <Badge key={board} variant="outline">
              {board}
            </Badge>
          ))}
          <p className="w-full text-sm text-muted-foreground">
            Job descriptions are AI-rewritten, optimized, and published automatically.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
