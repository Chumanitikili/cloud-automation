
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DeploymentPanel from '@/components/deploy/DeploymentPanel';

const Deploy = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Deployment</h2>
        <p className="text-muted-foreground">Manage your cloud infrastructure deployments</p>
      </div>

      <Tabs defaultValue="aws" className="space-y-4">
        <TabsList>
          <TabsTrigger value="aws">AWS</TabsTrigger>
          <TabsTrigger value="azure">Azure</TabsTrigger>
        </TabsList>
        <TabsContent value="aws">
          <DeploymentPanel provider="aws" />
        </TabsContent>
        <TabsContent value="azure">
          <DeploymentPanel provider="azure" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Deploy;
