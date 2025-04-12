
import React from 'react';
import StatusCard from '@/components/dashboard/StatusCard';
import DeploymentHistory from '@/components/dashboard/DeploymentHistory';
import ResourceUsage from '@/components/dashboard/ResourceUsage';

const Dashboard = () => {
  // Sample data for resource usage chart
  const resourceData = [
    { name: 'CPU', aws: 35, azure: 28 },
    { name: 'Memory', aws: 65, azure: 72 },
    { name: 'Storage', aws: 42, azure: 58 },
    { name: 'Network', aws: 78, azure: 45 },
    { name: 'Database', aws: 22, azure: 30 },
  ];

  // Sample deployment history
  const deploymentEvents = [
    {
      id: '1',
      provider: 'aws' as const,
      timestamp: '2023-04-12 09:15 AM',
      status: 'success' as const,
      description: 'EC2 Instances Deployed',
      user: 'alex@example.com'
    },
    {
      id: '2',
      provider: 'azure' as const,
      timestamp: '2023-04-11 02:30 PM',
      status: 'warning' as const,
      description: 'VM Scale Set Update',
      user: 'maria@example.com'
    },
    {
      id: '3',
      provider: 'aws' as const,
      timestamp: '2023-04-10 11:45 AM',
      status: 'error' as const,
      description: 'S3 Bucket Creation Failed',
      user: 'john@example.com'
    },
    {
      id: '4',
      provider: 'azure' as const,
      timestamp: '2023-04-09 03:20 PM',
      status: 'success' as const,
      description: 'Network Configuration Updated',
      user: 'alex@example.com'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Welcome to your multi-cloud deployment dashboard</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <StatusCard 
          title="Web Application"
          provider="aws"
          status="success"
          lastDeployed="April 12, 2023 09:15 AM"
          resourceCount={7}
        />
        <StatusCard 
          title="Web Application"
          provider="azure"
          status="warning"
          lastDeployed="April 11, 2023 02:30 PM"
          resourceCount={5}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <DeploymentHistory 
          events={deploymentEvents}
          className="md:col-span-1"
        />
        <ResourceUsage 
          data={resourceData} 
          className="md:col-span-2"
        />
      </div>
    </div>
  );
};

export default Dashboard;
