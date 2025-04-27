
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardWidgetProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  loading?: boolean;
  href?: string;
}

export const DashboardWidget = ({
  title,
  value,
  icon,
  loading = false,
  href
}: DashboardWidgetProps) => {
  const Content = (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {loading ? (
          <Skeleton className="h-8 w-16 mt-1" />
        ) : (
          <p className="text-2xl font-bold">{value.toLocaleString()}</p>
        )}
      </div>
      <div className="rounded-full p-2 bg-muted">
        {loading ? <RefreshCcw className="h-5 w-5 animate-spin" /> : icon}
      </div>
    </div>
  );

  if (href) {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="pt-6">
          <Link to={href} className="block">
            {Content}
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        {Content}
      </CardContent>
    </Card>
  );
};
