
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Settings, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';

// Example distracted students data
const distractedStudents = [
  { id: 1, name: 'Vivek', app: 'Instagram' },
  { id: 2, name: 'Nithin', app: 'YouTube' },
  { id: 3, name: 'Laxman', app: 'WhatsApp' },
];

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

  const handleLogout = () => {
    toast('Logging out...');
    // Add actual logout logic here if needed
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
              <p className="text-sm text-muted-foreground mb-6">Configure application settings here.</p>
              <Button 
                variant="destructive" 
                className="w-full" 
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
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
            <p className="text-sm text-muted-foreground mb-6">Configure application settings here.</p>
            <Button 
              variant="destructive" 
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
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
              <DrawerTitle>Distracted Students</DrawerTitle>
            </DrawerHeader>
            <div className="p-4">
              {distractedStudents.length > 0 ? (
                <ul className="space-y-3">
                  {distractedStudents.map(student => (
                    <li key={student.id} className="flex items-center p-2 border rounded-md bg-red-50">
                      <div className="h-2 w-2 rounded-full bg-red-500 mr-2 animate-pulse"></div>
                      <span className="font-medium">{student.name}</span>
                      <span className="ml-1 text-sm text-muted-foreground">(using {student.app})</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No distracted students detected.</p>
              )}
            </div>
          </DrawerContent>
        </Drawer>
      );
    }
    
    return (
      <Dialog open={notificationsOpen} onOpenChange={setNotificationsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Distracted Students</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {distractedStudents.length > 0 ? (
              <ul className="space-y-3">
                {distractedStudents.map(student => (
                  <li key={student.id} className="flex items-center p-2 border rounded-md bg-red-50">
                    <div className="h-2 w-2 rounded-full bg-red-500 mr-2 animate-pulse"></div>
                    <span className="font-medium">{student.name}</span>
                    <span className="ml-1 text-sm text-muted-foreground">(using {student.app})</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No distracted students detected.</p>
            )}
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
              DV
            </div>
            <span className="text-sm font-medium">Dr. Vasu</span>
          </div>
        </div>
      </div>
      
      {renderNotifications()}
      {renderSettings()}
    </header>
  );
};

export default Header;
