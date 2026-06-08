'use client';

import { GraduationCap, Sparkles } from 'lucide-react';

import { PageHeader } from '@/components/hr/page-header';
import { StatusBadge } from '@/components/hr/status-badge';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  formatDepartment,
  trainingAssessments,
  trainingPrograms,
} from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';

const TRAINING_TYPES = [
  { type: 'System Training', desc: 'Platform modules and workflows' },
  { type: 'Industry Training', desc: 'Property industry standards' },
  { type: 'Compliance Training', desc: 'Fair Work and regulatory requirements' },
  { type: 'Position-Specific', desc: 'Role-based skills and certifications' },
];

export default function TrainingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Training Management"
        description="AI trainer, quarterly assessments, and inspector certification programs."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TRAINING_TYPES.map((t) => (
          <Card key={t.type}>
            <CardContent className="pt-6">
              <GraduationCap className="mb-2 size-5 text-primary" />
              <p className="text-sm font-medium">{t.type}</p>
              <p className="mt-1 text-xs text-muted-foreground">{t.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Training Programs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {trainingPrograms.map((program) => {
            const pct = Math.round(
              (program.completedCount / program.assignedCount) * 100,
            );
            return (
              <div
                key={program.id}
                className="rounded-lg border border-border p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{program.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Due {formatDate(program.dueDate)}
                      {program.department &&
                        ` · ${formatDepartment(program.department)}`}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="capitalize">
                      {program.type.replace('_', ' ')}
                    </Badge>
                    {program.aiTrainer && (
                      <Badge variant="default">
                        <Sparkles className="mr-1 size-3" />
                        AI Trainer
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>
                      {program.completedCount}/{program.assignedCount} completed
                    </span>
                    <span>{pct}%</span>
                  </div>
                  <Progress value={pct} />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quarterly Assessment Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            Every 3 months the system reminds management. Results are added to KPI records.
          </p>
          <div className="space-y-2">
            {trainingAssessments.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between rounded-lg border border-border p-3 text-sm"
              >
                <span>{a.employeeName}</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{a.score}%</span>
                  <StatusBadge status={a.passed ? 'approved' : 'rejected'} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
