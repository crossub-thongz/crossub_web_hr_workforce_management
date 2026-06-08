import { Badge } from '@/components/ui/badge';
import { statusColor } from '@/lib/utils';

export function StatusBadge({ status }: { status: string }) {
  const label = status.replace(/_/g, ' ');
  return (
    <Badge variant={statusColor(status)} className="capitalize">
      {label}
    </Badge>
  );
}
