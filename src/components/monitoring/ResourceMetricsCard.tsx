
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

interface DataPoint {
  timestamp: string;
  value: number;
}

interface ResourceMetricsCardProps {
  title: string;
  provider: 'aws' | 'azure';
  description: string;
  unit: string;
  data: DataPoint[];
  average: number;
  max: number;
  current: number;
  status: 'normal' | 'warning' | 'critical';
  className?: string;
}

const ResourceMetricsCard: React.FC<ResourceMetricsCardProps> = ({
  title,
  provider,
  description,
  unit,
  data,
  average,
  max,
  current,
  status,
  className
}) => {
  const statusColors = {
    normal: {
      text: 'text-success',
      bg: 'bg-success/10',
      border: 'border-success/30',
      stroke: 'hsl(var(--success))'
    },
    warning: {
      text: 'text-warning',
      bg: 'bg-warning/10',
      border: 'border-warning/30',
      stroke: 'hsl(var(--warning))'
    },
    critical: {
      text: 'text-destructive',
      bg: 'bg-destructive/10',
      border: 'border-destructive/30',
      stroke: 'hsl(var(--destructive))'
    }
  };

  const statusConfig = statusColors[status];

  return (
    <Card className={cn("overflow-hidden", statusConfig.border, className)}>
      <CardHeader className={cn("pb-2", statusConfig.bg)}>
        <div className="flex justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {title}
              <Badge variant={provider === 'aws' ? "default" : "secondary"}>
                {provider.toUpperCase()}
              </Badge>
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Badge className={cn(statusConfig.text, "bg-background")}>
            {status === 'normal' ? 'Healthy' : status === 'warning' ? 'Warning' : 'Alert'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="mb-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm font-medium">Current</p>
            <p className={cn("text-2xl font-bold", statusConfig.text)}>{current}{unit}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Average</p>
            <p className="text-2xl font-bold">{average}{unit}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Max</p>
            <p className="text-2xl font-bold">{max}{unit}</p>
          </div>
        </div>
        
        <div className="h-36">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 5,
                left: 5,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="timestamp" 
                tick={{fontSize: 10}} 
                stroke="hsl(var(--muted-foreground))" 
              />
              <YAxis 
                tick={{fontSize: 10}} 
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: '0.5rem',
                  color: 'hsl(var(--card-foreground))'
                }}
                formatter={(value) => [`${value}${unit}`, 'Value']}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={statusConfig.stroke} 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceMetricsCard;
