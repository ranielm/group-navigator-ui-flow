
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, Activity, TrendingUp, Users } from 'lucide-react';

interface AddGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (group: any) => void;
}

const AddGroupModal: React.FC<AddGroupModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'BarChart3',
    refreshInterval: '60',
    alertThreshold: '',
    metrics: ''
  });

  const iconOptions = [
    { value: 'BarChart3', label: 'Bar Chart', icon: <BarChart3 className="w-4 h-4" /> },
    { value: 'Activity', label: 'Activity', icon: <Activity className="w-4 h-4" /> },
    { value: 'TrendingUp', label: 'Trending Up', icon: <TrendingUp className="w-4 h-4" /> },
    { value: 'Users', label: 'Users', icon: <Users className="w-4 h-4" /> }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: formData.name.toLowerCase().replace(/\s+/g, '-'),
      metrics: formData.metrics.split(',').map(m => m.trim()).filter(m => m)
    });
    setFormData({
      name: '',
      description: '',
      icon: 'BarChart3',
      refreshInterval: '60',
      alertThreshold: '',
      metrics: ''
    });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Measurement Group</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Group Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., API Performance"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <Select value={formData.icon} onValueChange={(value) => handleInputChange('icon', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center space-x-2">
                        {option.icon}
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Brief description of what this group measures"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="metrics">Metrics (comma-separated)</Label>
            <Textarea
              id="metrics"
              value={formData.metrics}
              onChange={(e) => handleInputChange('metrics', e.target.value)}
              placeholder="e.g., Response Time, Throughput, Error Rate"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="refreshInterval">Refresh Interval (seconds)</Label>
              <Select value={formData.refreshInterval} onValueChange={(value) => handleInputChange('refreshInterval', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="60">1 minute</SelectItem>
                  <SelectItem value="300">5 minutes</SelectItem>
                  <SelectItem value="900">15 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="alertThreshold">Alert Threshold</Label>
              <Input
                id="alertThreshold"
                value={formData.alertThreshold}
                onChange={(e) => handleInputChange('alertThreshold', e.target.value)}
                placeholder="e.g., >500ms, <95%"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Create Group
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGroupModal;
