
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, BarChart3, Activity, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MeasurementGroup {
  id: string;
  name: string;
  icon: React.ReactNode;
  metrics: string[];
  expanded: boolean;
}

interface SidebarProps {
  onGroupSelect: (groupId: string) => void;
  onAddGroup: () => void;
  selectedGroup: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onGroupSelect, onAddGroup, selectedGroup }) => {
  const [groups, setGroups] = useState<MeasurementGroup[]>([
    {
      id: 'performance',
      name: 'Performance Metrics',
      icon: <TrendingUp className="w-4 h-4" />,
      metrics: ['Response Time', 'Throughput', 'Error Rate'],
      expanded: true
    },
    {
      id: 'user-engagement',
      name: 'User Engagement',
      icon: <Users className="w-4 h-4" />,
      metrics: ['Active Users', 'Session Duration', 'Bounce Rate'],
      expanded: false
    },
    {
      id: 'system-health',
      name: 'System Health',
      icon: <Activity className="w-4 h-4" />,
      metrics: ['CPU Usage', 'Memory Usage', 'Disk I/O'],
      expanded: false
    },
    {
      id: 'business-metrics',
      name: 'Business Metrics',
      icon: <BarChart3 className="w-4 h-4" />,
      metrics: ['Revenue', 'Conversion Rate', 'Customer Acquisition'],
      expanded: false
    }
  ]);

  const toggleGroup = (groupId: string) => {
    setGroups(groups.map(group => 
      group.id === groupId 
        ? { ...group, expanded: !group.expanded }
        : group
    ));
  };

  const handleGroupClick = (groupId: string) => {
    onGroupSelect(groupId);
    // Auto-expand the selected group
    setGroups(groups.map(group => 
      group.id === groupId 
        ? { ...group, expanded: true }
        : group
    ));
  };

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-full flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="text-lg font-semibold text-sidebar-foreground">Dashboard</h2>
        <p className="text-sm text-sidebar-foreground/70">Measurement Groups</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        {groups.map((group) => (
          <div key={group.id} className="mb-2">
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleGroupClick(group.id)}
                className={`flex items-center flex-1 p-2 rounded-lg text-left transition-colors ${
                  selectedGroup === group.id
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'hover:bg-sidebar-accent/50 text-sidebar-foreground'
                }`}
              >
                <span className="mr-2">{group.icon}</span>
                <span className="text-sm font-medium flex-1">{group.name}</span>
              </button>
              <button
                onClick={() => toggleGroup(group.id)}
                className="p-1 hover:bg-sidebar-accent/50 rounded text-sidebar-foreground/70"
              >
                {group.expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
            
            {group.expanded && (
              <div className="ml-6 mt-1 space-y-1">
                {group.metrics.map((metric, index) => (
                  <div
                    key={index}
                    className="text-xs text-sidebar-foreground/60 py-1 px-2 hover:text-sidebar-foreground transition-colors cursor-pointer"
                  >
                    {metric}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        <Button
          onClick={onAddGroup}
          variant="outline"
          size="sm"
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Group
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
