
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, XCircle, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DeploymentStatus } from './StatusCard';

interface DeploymentEvent {
  id: string;
  provider: 'aws' | 'azure';
  timestamp: string;
  status: DeploymentStatus;
  description: string;
  user: string;
}

interface DeploymentHistoryProps {
  events: DeploymentEvent[];
  className?: string;
}

const DeploymentHistory: React.FC<DeploymentHistoryProps> = ({ events, className }) => {
  const statusIcons = {
    success: <CheckCircle2 className="h-4 w-4 text-success" />,
    warning: <AlertTriangle className="h-4 w-4 text-warning" />,
    error: <XCircle className="h-4 w-4 text-destructive" />,
    pending: <Clock className="h-4 w-4 text-muted-foreground" />,
    initializing: <Clock className="h-4 w-4 text-primary" />
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Deployment History</CardTitle>
        <CardDescription>Recent deployment activities</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.length === 0 ? (
          <div className="py-6 text-center text-muted-foreground">
            No deployment history available
          </div>
        ) : (
          events.map((event, index) => (
            <React.Fragment key={event.id}>
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {statusIcons[event.status]}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{event.description}</p>
                    <Badge variant={event.provider === 'aws' ? "default" : "secondary"} className="text-xs">
                      {event.provider.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <p>By {event.user}</p>
                    <p>{event.timestamp}</p>
                  </div>
                </div>
              </div>
              {index < events.length - 1 && <Separator className="my-2" />}
            </React.Fragment>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default DeploymentHistory;
