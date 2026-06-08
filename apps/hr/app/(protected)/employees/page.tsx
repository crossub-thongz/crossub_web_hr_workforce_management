'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

import { PageHeader } from '@/components/hr/page-header';
import { StatusBadge } from '@/components/hr/status-badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { employees, formatDepartment } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

export default function EmployeesPage() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return employees;
    return employees.filter(
      (e) =>
        e.fullName.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.employeeNumber.toLowerCase().includes(q) ||
        e.department.includes(q),
    );
  }, [query]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employees"
        description="Independent employee profiles with payroll, KPI, training, and disciplinary records."
      />

      <div className="relative max-w-sm">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name, email, or ID..."
          className="pl-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="p-4 font-medium">Employee</th>
                  <th className="p-4 font-medium">Department</th>
                  <th className="p-4 font-medium">Position</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Compensation</th>
                  <th className="p-4 font-medium">Profile</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((emp) => (
                  <tr
                    key={emp.id}
                    className="border-b border-border transition-colors hover:bg-secondary/30"
                  >
                    <td className="p-4">
                      <Link
                        href={`/employees/${emp.id}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {emp.fullName}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {emp.employeeNumber} · {emp.email}
                      </p>
                    </td>
                    <td className="p-4">{formatDepartment(emp.department)}</td>
                    <td className="p-4">{emp.position}</td>
                    <td className="p-4">
                      <StatusBadge status={emp.status} />
                    </td>
                    <td className="p-4">
                      <span className="capitalize">{emp.salaryModel.replace('_', ' ')}</span>
                      {emp.baseSalary > 0 && (
                        <p className="text-xs text-muted-foreground">
                          {formatCurrency(emp.baseSalary, emp.currency)}/mo
                        </p>
                      )}
                    </td>
                    <td className="p-4">
                      <StatusBadge
                        status={emp.profileComplete ? 'active' : 'onboarding'}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
