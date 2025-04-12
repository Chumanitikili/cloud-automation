
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, CloudCog, Play, AlertTriangle, XCircle, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface DeploymentPanelProps {
  provider: 'aws' | 'azure';
  className?: string;
}

type Step = {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'success' | 'warning' | 'error';
};

const DeploymentPanel: React.FC<DeploymentPanelProps> = ({ provider, className }) => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("plan");
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState<Step[]>([
    { id: '1', name: 'Initialize', status: 'pending' },
    { id: '2', name: 'Plan', status: 'pending' },
    { id: '3', name: 'Apply', status: 'pending' },
    { id: '4', name: 'Verify', status: 'pending' }
  ]);
  
  const [logs, setLogs] = useState<string[]>([
    `> Terraform version: 1.5.7`,
    `> Working directory: ./${provider}`,
    `> Ready to deploy infrastructure to ${provider.toUpperCase()}`
  ]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, message]);
  };

  const updateStep = (id: string, status: Step['status']) => {
    setSteps(prev => prev.map(step => 
      step.id === id ? { ...step, status } : step
    ));
  };

  const simulateDeployment = () => {
    setIsDeploying(true);
    setProgress(0);
    
    // Reset steps
    setSteps(steps.map(step => ({ ...step, status: 'pending' })));
    
    // Initialize
    updateStep('1', 'running');
    addLog(`[${new Date().toLocaleTimeString()}] Starting ${provider} deployment...`);
    
    let progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 150);

    // Initialize step
    setTimeout(() => {
      updateStep('1', 'success');
      addLog(`[${new Date().toLocaleTimeString()}] ✓ Initialization complete`);
      addLog(`[${new Date().toLocaleTimeString()}] > terraform init -backend-config="${provider}-backend.tfvars"`);
      
      // Plan step
      updateStep('2', 'running');
      addLog(`[${new Date().toLocaleTimeString()}] Running terraform plan...`);
      setTimeout(() => {
        updateStep('2', 'success');
        addLog(`[${new Date().toLocaleTimeString()}] ✓ Plan created successfully`);
        addLog(`[${new Date().toLocaleTimeString()}] > terraform plan -var-file="${provider}-vars.tfvars" -out=${provider}.plan`);
        
        // Apply step
        updateStep('3', 'running');
        addLog(`[${new Date().toLocaleTimeString()}] Applying infrastructure changes...`);
        setTimeout(() => {
          const success = Math.random() > 0.3; // 70% chance of success
          
          if (success) {
            updateStep('3', 'success');
            addLog(`[${new Date().toLocaleTimeString()}] ✓ Infrastructure applied successfully`);
            addLog(`[${new Date().toLocaleTimeString()}] > terraform apply -auto-approve ${provider}.plan`);
            
            // Verify step
            updateStep('4', 'running');
            addLog(`[${new Date().toLocaleTimeString()}] Verifying deployment...`);
            setTimeout(() => {
              updateStep('4', 'success');
              addLog(`[${new Date().toLocaleTimeString()}] ✓ Verification complete`);
              addLog(`[${new Date().toLocaleTimeString()}] > Deployment to ${provider.toUpperCase()} completed successfully!`);
              setIsDeploying(false);
              toast.success(`${provider.toUpperCase()} Deployment Successful`, {
                description: "Infrastructure has been provisioned successfully."
              });
            }, 3000);
          } else {
            // Simulate failure
            updateStep('3', Math.random() > 0.5 ? 'warning' : 'error');
            addLog(`[${new Date().toLocaleTimeString()}] ⚠ Issue encountered during apply`);
            addLog(`[${new Date().toLocaleTimeString()}] > Error: Failed to create ${provider === 'aws' ? 'EC2 instance' : 'VM'} due to quota limits`);
            setIsDeploying(false);
            
            toast.error(`${provider.toUpperCase()} Deployment Issue`, {
              description: "Failed to create resources. Check logs for details."
            });
          }
        }, 7000);
      }, 5000);
    }, 3000);
  };
  
  const getStatusIcon = (status: Step['status']) => {
    switch (status) {
      case 'success': return <CheckCircle2 className="h-5 w-5 text-success" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-warning" />;
      case 'error': return <XCircle className="h-5 w-5 text-destructive" />;
      case 'running': return <div className="h-5 w-5 rounded-full border-2 border-t-transparent border-primary animate-spin" />;
      default: return <div className="h-5 w-5 rounded-full border border-muted" />;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CloudCog className="h-5 w-5 text-primary" />
              {provider.toUpperCase()} Deployment
            </CardTitle>
            <CardDescription>
              Manage infrastructure on {provider === 'aws' ? 'Amazon Web Services' : 'Microsoft Azure'}
            </CardDescription>
          </div>
          <Button
            onClick={simulateDeployment}
            disabled={isDeploying}
            variant={isDeploying ? "outline" : "default"}
            className="gap-2"
          >
            {isDeploying ? (
              <>
                <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-current animate-spin" />
                Deploying...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Deploy
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      
      {isDeploying && (
        <div className="px-6 pb-2">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-right mt-1 text-muted-foreground">{progress}%</p>
        </div>
      )}
      
      <CardContent>
        <div className="mb-6 space-y-4">
          <div className="grid grid-cols-4 gap-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted mb-2">
                  {getStatusIcon(step.status)}
                </div>
                <span className="text-xs">{step.name}</span>
                
                {index < steps.length - 1 && (
                  <div 
                    className={`pipeline-connector w-full left-1/2 top-5 ${
                      step.status === 'success' ? 'active' : ''
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        
        <Tabs defaultValue="plan" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full mb-4">
            <TabsTrigger value="plan" className="flex-1">Plan</TabsTrigger>
            <TabsTrigger value="variables" className="flex-1">Variables</TabsTrigger>
            <TabsTrigger value="logs" className="flex-1">Logs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="plan" className="space-y-4">
            <Alert>
              <AlertTitle className="flex items-center gap-2">
                <CloudCog className="h-4 w-4" />
                Terraform Plan
              </AlertTitle>
              <AlertDescription>
                Infrastructure to be provisioned:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  {provider === 'aws' ? (
                    <>
                      <li>VPC with 2 public and 2 private subnets</li>
                      <li>EC2 t2.micro with Auto Scaling Group (min: 2, max: 4)</li>
                      <li>Application Load Balancer</li>
                      <li>S3 bucket for static assets</li>
                    </>
                  ) : (
                    <>
                      <li>Virtual Network with 2 subnets</li>
                      <li>Linux VM (Standard_B1s) with Scale Set</li>
                      <li>Load Balancer</li>
                      <li>Blob Storage for static content</li>
                    </>
                  )}
                </ul>
              </AlertDescription>
            </Alert>
            <Alert>
              <AlertTitle className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                Changes Required
              </AlertTitle>
              <AlertDescription>
                <p className="mb-2">This deployment will create new resources:</p>
                <code className="block p-2 bg-muted text-sm mt-1">
                  {provider === 'aws' ? 
                    '+ aws_instance.web_server\n+ aws_s3_bucket.assets\n+ aws_lb.web_balancer\n+ aws_autoscaling_group.web_asg' :
                    '+ azurerm_linux_virtual_machine.web_server\n+ azurerm_storage_account.assets\n+ azurerm_lb.web_balancer\n+ azurerm_virtual_machine_scale_set.web_vmss'}
                </code>
              </AlertDescription>
            </Alert>
          </TabsContent>
          
          <TabsContent value="variables" className="space-y-4">
            <div className="rounded-md border">
              <div className="p-4 bg-muted/50">
                <h3 className="font-medium mb-1">Configuration Variables</h3>
                <p className="text-sm text-muted-foreground">Key variables for {provider.toUpperCase()} deployment</p>
              </div>
              <Separator />
              <div className="p-4">
                <pre className="text-sm overflow-auto">
                  {provider === 'aws' ? 
                    `# AWS Variables
region = "us-east-1"
instance_type = "t2.micro"
vpc_cidr = "10.0.0.0/16"
environment = "staging"
min_capacity = 2
max_capacity = 4
enable_nat_gateway = true`
                    : 
                    `# Azure Variables
location = "East US"
vm_size = "Standard_B1s"
vnet_address_space = "10.0.0.0/16"
environment = "staging"
min_capacity = 2
max_capacity = 4
enable_bastion = true`}
                </pre>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="logs" className="space-y-4">
            <div className="terminal h-60 max-h-60">
              {logs.map((log, index) => (
                <span key={index} className="terminal-line">
                  {log}
                </span>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={() => toast.info("Output refreshed", {
            description: "Latest state information loaded from remote backend."
          })}
        >
          <RotateCcw className="h-4 w-4" />
          Refresh
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          disabled={isDeploying}
          className="gap-2 text-destructive hover:text-destructive"
          onClick={() => {
            toast.warning("Destroy command would remove all infrastructure", {
              description: "This is a simulated warning and no resources will be destroyed."
            });
          }}
        >
          <XCircle className="h-4 w-4" />
          Destroy
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DeploymentPanel;
