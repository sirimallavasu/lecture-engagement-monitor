
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Settings } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';

const Header: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    toast(`Switched to ${value} view`);
  };
  
  const handleNotificationClick = () => {
    setNotificationsOpen(true);
  };
  
  const handleSettingsClick = () => {
    setSettingsOpen(true);
  };

  // Function to render settings content based on device type
  const renderSettings = () => {
    if (isMobile) {
      return (
        <Drawer open={settingsOpen} onOpenChange={setSettingsOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Settings</DrawerTitle>
            </DrawerHeader>
            <div className="p-4">
              <p className="text-sm text-muted-foreground">Configure application settings here.</p>
            </div>
          </DrawerContent>
        </Drawer>
      );
    }
    
    return (
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">Configure application settings here.</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  // Function to render notifications content based on device type
  const renderNotifications = () => {
    if (isMobile) {
      return (
        <Drawer open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Notifications</DrawerTitle>
            </DrawerHeader>
            <div className="p-4">
              <p className="text-sm text-muted-foreground">You have no new notifications.</p>
            </div>
          </DrawerContent>
        </Drawer>
      );
    }
    
    return (
      <Dialog open={notificationsOpen} onOpenChange={setNotificationsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">You have no new notifications.</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <header className="border-b border-border bg-card text-card-foreground py-2 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">Lecture Engagement Monitor</h1>
          <Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleNotificationClick}
            aria-label="View notifications"
          >
            <Bell className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleSettingsClick}
            aria-label="Open settings"
          >
            <Settings className="h-4 w-4" />
          </Button>
          <div className="ml-4 flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary">
              JD
            </div>
            <span className="text-sm font-medium">Dr. Jane Doe</span>
          </div>
        </div>
      </div>
      
      {renderNotifications()}
      {renderSettings()}
    </header>
  );
};

export default Header;
