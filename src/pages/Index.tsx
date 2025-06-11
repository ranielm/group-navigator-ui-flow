
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import Sidebar from '@/components/Sidebar';
import DashboardContent from '@/components/DashboardContent';
import AddGroupModal from '@/components/AddGroupModal';
import { toast } from 'sonner';

const Index = () => {
  const [selectedGroup, setSelectedGroup] = useState('performance');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGroupSelect = (groupId: string) => {
    setSelectedGroup(groupId);
    console.log('Selected group:', groupId);
  };

  const handleAddGroup = () => {
    setIsModalOpen(true);
  };

  const handleSaveGroup = (groupData: any) => {
    console.log('New group data:', groupData);
    toast.success(`Measurement group "${groupData.name}" created successfully!`);
    // In a real app, you would save this to your backend/state management
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar 
          onGroupSelect={handleGroupSelect}
          onAddGroup={handleAddGroup}
          selectedGroup={selectedGroup}
        />
        <DashboardContent selectedGroup={selectedGroup} />
        <AddGroupModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveGroup}
        />
      </div>
    </SidebarProvider>
  );
};

export default Index;
