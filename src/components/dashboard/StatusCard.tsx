
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2, AlertTriangle, XCircle, Clock } from "lucide-react";
import { Link } from 'react-router-dom';

export type DeploymentStatus = 'success' | 'warning' | 'error' | 'pending' | 'initializing';

interface StatusCardProps {
  title: string;
  provider: 'aws' | 'azure';
  status: DeploymentStatus;
  lastDeployed?: string;
  resourceCount?: number;
  className?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  provider,
  status,
  lastDeployed,
  resourceCount = 0,
  className
}) => {
  const statusConfig = {
    success: {
      icon: CheckCircle2,
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/30',
      label: 'Deployed'
    },
    warning: {
      icon: AlertTriangle,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/30',
      label: 'Warning'
    },
    error: {
      icon: XCircle,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      borderColor: 'border-destructive/30',
      label: 'Failed'
    },
    pending: {
      icon: Clock,
      color: 'text-muted-foreground',
      bgColor: 'bg-muted/50',
      borderColor: 'border-muted',
      label: 'Pending'
    },
    initializing: {
      icon: Clock,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/30',
      label: 'Initializing'
    }
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;
  
  return (
    <Card className={cn("overflow-hidden transition-all", 
      config.borderColor, 
      className
    )}>
      <CardHeader className={cn("pb-2", config.bgColor)}>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex gap-2 items-center">
              {title}
              <Badge variant={
                provider === 'aws' ? "default" : "secondary"
              }>
                {provider.toUpperCase()}
              </Badge>
            </CardTitle>
            <CardDescription>
              {lastDeployed ? `Last deployed: ${lastDeployed}` : 'Not deployed yet'}
            </CardDescription>
          </div>
          <StatusIcon className={cn("h-6 w-6", config.color)} />
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Resources</span>
          <span className="font-medium">{resourceCount}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Badge variant="outline" className={cn("flex gap-1 items-center", config.color)}>
          <StatusIcon className="h-3 w-3" />
          {config.label}
        </Badge>
        <Button 
          variant="ghost" 
          size="sm" 
          asChild 
          className={cn("gap-1", config.color)}
        >
          <Link to={`/deploy/${provider}`}>
            View details
            <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StatusCard;
