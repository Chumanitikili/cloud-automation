
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Configure your deployment environment</p>
      </div>

      <Tabs defaultValue="credentials" className="space-y-4">
        <TabsList>
          <TabsTrigger value="credentials">Cloud Credentials</TabsTrigger>
          <TabsTrigger value="terraform">Terraform Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="credentials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AWS Credentials</CardTitle>
              <CardDescription>Configure your Amazon Web Services authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="aws-access-key">Access Key ID</Label>
                  <Input id="aws-access-key" placeholder="AKIAIOSFODNN7EXAMPLE" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aws-secret-key">Secret Access Key</Label>
                  <Input id="aws-secret-key" type="password" placeholder="••••••••••••••••" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="aws-region">Default Region</Label>
                <Input id="aws-region" defaultValue="us-east-1" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch id="aws-profile" />
                  <Label htmlFor="aws-profile">Use AWS Profile from ~/.aws/credentials</Label>
                </div>
                <Button variant="outline" size="sm" onClick={() => {
                  toast.success("AWS credentials verified", {
                    description: "Successfully authenticated with AWS"
                  });
                }}>
                  Test Connection
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Azure Credentials</CardTitle>
              <CardDescription>Configure your Microsoft Azure authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="azure-subscription-id">Subscription ID</Label>
                  <Input id="azure-subscription-id" placeholder="00000000-0000-0000-0000-000000000000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="azure-tenant-id">Tenant ID</Label>
                  <Input id="azure-tenant-id" placeholder="00000000-0000-0000-0000-000000000000" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="azure-client-id">Client ID</Label>
                  <Input id="azure-client-id" placeholder="00000000-0000-0000-0000-000000000000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="azure-client-secret">Client Secret</Label>
                  <Input id="azure-client-secret" type="password" placeholder="••••••••••••••••" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch id="azure-cli" />
                  <Label htmlFor="azure-cli">Use Azure CLI authentication</Label>
                </div>
                <Button variant="outline" size="sm" onClick={() => {
                  toast.success("Azure credentials verified", {
                    description: "Successfully authenticated with Azure"
                  });
                }}>
                  Test Connection
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="terraform" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Terraform Configuration</CardTitle>
              <CardDescription>Configure your Terraform settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tf-path">Terraform Path</Label>
                <Input id="tf-path" defaultValue="/usr/local/bin/terraform" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tf-state-path">State Files Path</Label>
                <Input id="tf-state-path" defaultValue="./terraform" />
              </div>
              <Separator className="my-4" />
              <div className="space-y-4">
                <h4 className="font-medium">Backend Configuration</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tf-backend-type">Backend Type</Label>
                    <Input id="tf-backend-type" defaultValue="s3" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tf-backend-bucket">S3 Bucket Name</Label>
                    <Input id="tf-backend-bucket" defaultValue="my-terraform-states" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tf-backend-region">S3 Region</Label>
                    <Input id="tf-backend-region" defaultValue="us-east-1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tf-backend-key">State Key</Label>
                    <Input id="tf-backend-key" defaultValue="terraform.tfstate" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h4 className="font-medium">Email Notifications</h4>
                <div className="space-y-2">
                  <Label htmlFor="email-recipients">Recipients</Label>
                  <Input id="email-recipients" placeholder="admin@example.com, team@example.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-success" defaultChecked />
                    <Label htmlFor="notify-success">Successful Deployments</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-failed" defaultChecked />
                    <Label htmlFor="notify-failed">Failed Deployments</Label>
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-4">
                <h4 className="font-medium">Slack Integration</h4>
                <div className="space-y-2">
                  <Label htmlFor="slack-webhook">Webhook URL</Label>
                  <Input id="slack-webhook" placeholder="https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slack-channel">Channel</Label>
                  <Input id="slack-channel" defaultValue="#deployments" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="slack-enabled" />
                  <Label htmlFor="slack-enabled">Enable Slack notifications</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset</Button>
              <Button onClick={() => {
                toast.success("Notification settings saved", {
                  description: "Your notification preferences have been updated"
                });
              }}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
