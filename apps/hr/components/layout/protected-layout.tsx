'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { HrShell } from '@/components/layout/hr-shell';
import { useAuth } from '@/components/providers/auth-provider';
import { ROUTES } from '@/constants/routes';

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === 'guest') {
      router.replace(ROUTES.LOGIN);
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (status === 'guest') {
    return null;
  }

  return <HrShell>{children}</HrShell>;
}
