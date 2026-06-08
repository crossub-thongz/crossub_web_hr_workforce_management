'use client';

import { Gift, Lightbulb, Sparkles } from 'lucide-react';

import { PageHeader } from '@/components/hr/page-header';
import { StatusBadge } from '@/components/hr/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { suggestions } from '@/lib/mock-data';
import { formatDateTime } from '@/lib/utils';

const REWARDS = [
  'Cash Bonus',
  'Gift Card',
  'Salary Increase',
  'Recognition Award',
];

export default function SuggestionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Employee Suggestion Box"
        description="AI categorization routes feedback to IT or Management. Reward program for valuable ideas."
        action={
          <Button>
            <Lightbulb className="size-4" />
            Submit suggestion
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              AI Categorization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="rounded-lg border border-border p-3">
              <p className="font-medium">System Improvement</p>
              <p className="text-xs text-muted-foreground">
                Forwarded to IT Department
              </p>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="font-medium">Management Improvement</p>
              <p className="text-xs text-muted-foreground">
                Forwarded to Management Team
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="size-4" />
              Reward Program
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {REWARDS.map((r) => (
              <Badge key={r} variant="outline">
                {r}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Suggestions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {suggestions.map((s) => (
            <div
              key={s.id}
              className="rounded-lg border border-border p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium">{s.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {s.content}
                  </p>
                </div>
                <StatusBadge status={s.status} />
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <Badge variant="outline">{s.aiCategory}</Badge>
                <Badge variant="muted">→ {s.forwardedTo}</Badge>
                {s.reward && (
                  <Badge variant="success">{s.reward}</Badge>
                )}
              </div>
              <p className="mt-2 text-[10px] text-muted-foreground">
                {s.employeeName} · {formatDateTime(s.submittedAt)}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
