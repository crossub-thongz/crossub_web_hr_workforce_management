'use client';

import { Check, Shield, X } from 'lucide-react';

import { PageHeader } from '@/components/hr/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { permissionConfigs } from '@/lib/mock-data';

const PERMISSIONS = [
  { key: 'canViewSalary', label: 'Salary Information' },
  { key: 'canViewPayroll', label: 'Payroll Records' },
  { key: 'canViewKpi', label: 'KPI Data' },
  { key: 'canViewWarnings', label: 'Warning Letters' },
  { key: 'canViewTermination', label: 'Termination Records' },
  { key: 'canApprovePayroll', label: 'Approve Payroll' },
  { key: 'canApproveWarnings', label: 'Approve Warnings' },
  { key: 'canTerminate', label: 'Terminate Employment' },
] as const;

export default function PermissionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Access Control"
        description="Fully configurable permission levels for HR Manager, Department Manager, Director, and CEO."
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="size-4" />
            Permission Matrix
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="p-4 font-medium">Permission</th>
                {permissionConfigs.map((role) => (
                  <th key={role.role} className="p-4 font-medium text-center">
                    {role.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PERMISSIONS.map(({ key, label }) => (
                <tr key={key} className="border-b border-border">
                  <td className="p-4">{label}</td>
                  {permissionConfigs.map((role) => {
                    const allowed = role[key];
                    return (
                      <td key={role.role} className="p-4 text-center">
                        {allowed ? (
                          <Check className="mx-auto size-4 text-emerald-400" />
                        ) : (
                          <X className="mx-auto size-4 text-muted-foreground/40" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Protected Data</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>
            Only authorized management personnel can access salary information,
            payroll records, KPI data, warning letters, and termination records.
            Permissions are fully configurable per role and can be extended for
            custom organizational structures.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
