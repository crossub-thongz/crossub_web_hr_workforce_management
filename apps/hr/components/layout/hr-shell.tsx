'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AlertTriangle,
  Banknote,
  BarChart3,
  Brain,
  GraduationCap,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  Receipt,
  Shield,
  UserPlus,
  Users,
} from 'lucide-react';

import { useAuth } from '@/components/providers/auth-provider';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { cn, displayName } from '@/lib/utils';

const NAV = [
  { href: ROUTES.COMMAND_CENTER, label: 'Command Center', icon: LayoutDashboard },
  { href: ROUTES.EMPLOYEES, label: 'Employees', icon: Users },
  { href: ROUTES.ONBOARDING, label: 'Onboarding', icon: UserPlus },
  { href: ROUTES.PAYROLL, label: 'Payroll', icon: Banknote },
  { href: ROUTES.KPI, label: 'KPI Management', icon: BarChart3 },
  { href: ROUTES.RECRUITMENT, label: 'Recruitment', icon: Brain },
  { href: ROUTES.TRAINING, label: 'Training', icon: GraduationCap },
  { href: ROUTES.DISCIPLINARY, label: 'Disciplinary', icon: AlertTriangle },
  { href: ROUTES.EXPENSES, label: 'Expense Claims', icon: Receipt },
  { href: ROUTES.SUGGESTIONS, label: 'Suggestion Box', icon: Lightbulb },
  { href: ROUTES.PERMISSIONS, label: 'Access Control', icon: Shield },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === ROUTES.COMMAND_CENTER) {
    return pathname === href || pathname === '/';
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function HrShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-border bg-card lg:flex">
        <div className="flex h-14 items-center gap-2 border-b border-border px-4">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Brain className="size-4" />
          </div>
          <div>
            <p className="text-sm font-semibold">CROSSUB HR</p>
            <p className="text-[10px] text-muted-foreground">Workforce Management</p>
          </div>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors',
                isActive(pathname, href)
                  ? 'bg-primary/10 font-medium text-primary'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
              )}
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-border p-3">
          <div className="mb-2 truncate px-3 text-xs text-muted-foreground">
            {user ? displayName(user) : 'HR Portal'}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2"
            onClick={() => void logout()}
          >
            <LogOut className="size-4" />
            Sign out
          </Button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col lg:pl-60">
        <header className="sticky top-0 z-20 flex h-14 items-center border-b border-border bg-background/95 px-4 backdrop-blur lg:hidden">
          <p className="text-sm font-semibold">CROSSUB HR</p>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
