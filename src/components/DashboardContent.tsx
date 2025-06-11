
import React from 'react';
import { TrendingUp, TrendingDown, Activity, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Metric {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ReactNode;
}

interface DashboardContentProps {
  selectedGroup: string;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ selectedGroup }) => {
  const getMetricsForGroup = (groupId: string): Metric[] => {
    const metricsData: Record<string, Metric[]> = {
      'performance': [
        {
          title: 'Response Time',
          value: '245ms',
          change: '-12%',
          changeType: 'decrease',
          icon: <Activity className="w-4 h-4" />
        },
        {
          title: 'Throughput',
          value: '1,247 req/s',
          change: '+8%',
          changeType: 'increase',
          icon: <TrendingUp className="w-4 h-4" />
        },
        {
          title: 'Error Rate',
          value: '0.12%',
          change: '-23%',
          changeType: 'decrease',
          icon: <BarChart3 className="w-4 h-4" />
        }
      ],
      'user-engagement': [
        {
          title: 'Active Users',
          value: '12,847',
          change: '+15%',
          changeType: 'increase',
          icon: <TrendingUp className="w-4 h-4" />
        },
        {
          title: 'Session Duration',
          value: '4m 32s',
          change: '+7%',
          changeType: 'increase',
          icon: <Activity className="w-4 h-4" />
        },
        {
          title: 'Bounce Rate',
          value: '23.4%',
          change: '-5%',
          changeType: 'decrease',
          icon: <TrendingDown className="w-4 h-4" />
        }
      ],
      'system-health': [
        {
          title: 'CPU Usage',
          value: '67%',
          change: '+3%',
          changeType: 'increase',
          icon: <Activity className="w-4 h-4" />
        },
        {
          title: 'Memory Usage',
          value: '4.2GB',
          change: '+12%',
          changeType: 'increase',
          icon: <BarChart3 className="w-4 h-4" />
        },
        {
          title: 'Disk I/O',
          value: '234 MB/s',
          change: '-8%',
          changeType: 'decrease',
          icon: <TrendingUp className="w-4 h-4" />
        }
      ],
      'business-metrics': [
        {
          title: 'Revenue',
          value: '$47,892',
          change: '+18%',
          changeType: 'increase',
          icon: <TrendingUp className="w-4 h-4" />
        },
        {
          title: 'Conversion Rate',
          value: '3.24%',
          change: '+0.8%',
          changeType: 'increase',
          icon: <BarChart3 className="w-4 h-4" />
        },
        {
          title: 'Customer Acquisition',
          value: '1,247',
          change: '+22%',
          changeType: 'increase',
          icon: <Activity className="w-4 h-4" />
        }
      ]
    };

    return metricsData[selectedGroup] || metricsData['performance'];
  };

  const getGroupTitle = (groupId: string): string => {
    const titles: Record<string, string> = {
      'performance': 'Performance Metrics',
      'user-engagement': 'User Engagement',
      'system-health': 'System Health',
      'business-metrics': 'Business Metrics'
    };
    return titles[groupId] || 'Performance Metrics';
  };

  const metrics = getMetricsForGroup(selectedGroup);

  return (
    <div className="flex-1 p-6 bg-background">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">{getGroupTitle(selectedGroup)}</h1>
        <p className="text-muted-foreground">Monitor your key performance indicators</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="transition-all duration-200 hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className="text-muted-foreground">
                {metric.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <div className="flex items-center space-x-1 text-xs">
                {metric.changeType === 'increase' ? (
                  <TrendingUp className="w-3 h-3 text-green-500" />
                ) : metric.changeType === 'decrease' ? (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                ) : (
                  <div className="w-3 h-3 bg-gray-400 rounded-full" />
                )}
                <span className={`${
                  metric.changeType === 'increase' 
                    ? 'text-green-500' 
                    : metric.changeType === 'decrease' 
                    ? 'text-red-500' 
                    : 'text-muted-foreground'
                }`}>
                  {metric.change} from last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
                <Activity className="w-4 h-4 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Metric threshold exceeded</p>
                  <p className="text-xs text-muted-foreground">Response time above 300ms for 5 minutes</p>
                </div>
                <span className="text-xs text-muted-foreground ml-auto">2 min ago</span>
              </div>
              <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Performance improved</p>
                  <p className="text-xs text-muted-foreground">System optimization completed successfully</p>
                </div>
                <span className="text-xs text-muted-foreground ml-auto">1 hour ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardContent;
