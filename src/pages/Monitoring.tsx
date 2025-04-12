
import React from 'react';
import ResourceMetricsCard from '@/components/monitoring/ResourceMetricsCard';

// Generate sample time series data
const generateTimeSeriesData = (baseLine: number, variance: number, dataPoints: number = 12) => {
  const now = new Date();
  const data = [];
  for (let i = dataPoints; i > 0; i--) {
    const time = new Date(now.getTime() - i * 5 * 60000); // 5 minutes apart
    const value = Math.max(0, baseLine + (Math.random() * variance * 2) - variance);
    data.push({
      timestamp: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      value: Math.round(value * 10) / 10
    });
  }
  return data;
};

const Monitoring = () => {
  // Sample data for metrics
  const cpuDataAWS = generateTimeSeriesData(45, 20);
  const memoryDataAWS = generateTimeSeriesData(65, 15);
  const cpuDataAzure = generateTimeSeriesData(35, 25);
  const memoryDataAzure = generateTimeSeriesData(70, 10);
  
  // Calculate current, avg, and max values
  const calculateStats = (data: {value: number}[]) => {
    const values = data.map(item => item.value);
    return {
      current: values[values.length - 1],
      average: Math.round(values.reduce((sum, val) => sum + val, 0) / values.length * 10) / 10,
      max: Math.round(Math.max(...values) * 10) / 10
    };
  };
  
  const awsCpuStats = calculateStats(cpuDataAWS);
  const awsMemoryStats = calculateStats(memoryDataAWS);
  const azureCpuStats = calculateStats(cpuDataAzure);
  const azureMemoryStats = calculateStats(memoryDataAzure);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Monitoring</h2>
        <p className="text-muted-foreground">Real-time metrics from your cloud resources</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ResourceMetricsCard 
          title="CPU Usage"
          provider="aws"
          description="EC2 Instance CPU Utilization"
          unit="%"
          data={cpuDataAWS}
          current={awsCpuStats.current}
          average={awsCpuStats.average}
          max={awsCpuStats.max}
          status={awsCpuStats.current > 80 ? 'critical' : awsCpuStats.current > 60 ? 'warning' : 'normal'}
        />
        <ResourceMetricsCard 
          title="Memory Usage"
          provider="aws"
          description="EC2 Instance Memory Utilization"
          unit="%"
          data={memoryDataAWS}
          current={awsMemoryStats.current}
          average={awsMemoryStats.average}
          max={awsMemoryStats.max}
          status={awsMemoryStats.current > 80 ? 'critical' : awsMemoryStats.current > 60 ? 'warning' : 'normal'}
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <ResourceMetricsCard 
          title="CPU Usage"
          provider="azure"
          description="VM CPU Utilization"
          unit="%"
          data={cpuDataAzure}
          current={azureCpuStats.current}
          average={azureCpuStats.average}
          max={azureCpuStats.max}
          status={azureCpuStats.current > 80 ? 'critical' : azureCpuStats.current > 60 ? 'warning' : 'normal'}
        />
        <ResourceMetricsCard 
          title="Memory Usage"
          provider="azure"
          description="VM Memory Utilization"
          unit="%"
          data={memoryDataAzure}
          current={azureMemoryStats.current}
          average={azureMemoryStats.average}
          max={azureMemoryStats.max}
          status={azureMemoryStats.current > 80 ? 'critical' : azureMemoryStats.current > 60 ? 'warning' : 'normal'}
        />
      </div>
    </div>
  );
};

export default Monitoring;
