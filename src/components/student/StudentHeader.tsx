import React, { useState } from 'react';
import { Bell, User, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface StudentHeaderProps {
  studentName: string;
  currentLecture: {
    title: string;
    instructor: string;
    startTime: string;
    endTime: string;
    progress: number;
  };
  notifications: {
    id: number;
    message: string;
    timestamp: string;
    type: 'attention' | 'positive' | 'info';
  }[];
}

const StudentHeader: React.FC<StudentHeaderProps> = ({ 
  studentName, 
  currentLecture,
  notifications 
}) => {
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const unreadNotifications = notifications.length;
  
  return (
    <header className="border-b border-border bg-card text-card-foreground py-3 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-primary font-semibold">
            Lecture Engagement Monitor
          </Link>
          <Badge variant="outline" className="bg-primary/10">
            Student View
          </Badge>
        </div>
        
        <div className="flex-1 max-w-md mx-4">
          <div className="text-center">
            <h2 className="text-lg font-medium">{currentLecture.title}</h2>
            <p className="text-sm text-muted-foreground">
              {currentLecture.instructor} • {currentLecture.startTime} - {currentLecture.endTime}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setHelpDialogOpen(true)} 
            className="text-muted-foreground"
          >
            <HelpCircle className="h-4 w-4 mr-1" />
            Help
          </Button>
          
          <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs flex items-center justify-center text-white">
                    {unreadNotifications}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-2 font-medium border-b">Notifications</div>
              {notifications.map(notification => (
                <DropdownMenuItem key={notification.id} className="py-2 px-3 cursor-default">
                  <div>
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant={notification.type === 'attention' ? 'destructive' : 'outline'}
                        className={notification.type === 'positive' ? 'bg-engagement-positive text-white' : ''}
                      >
                        {notification.type === 'attention' ? 'Focus Needed' : 
                          notification.type === 'positive' ? 'Great Work' : 'Info'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                    </div>
                    <p className="mt-1 text-sm">{notification.message}</p>
                  </div>
                </DropdownMenuItem>
              ))}
              {notifications.length === 0 && (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No notifications
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="p-2 font-medium border-b">{studentName}</div>
              <DropdownMenuItem>
                <Link to="/profile" className="flex w-full">My Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info('Settings not implemented yet')}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast('Switched to teacher view')}>
                <Link to="/" className="flex w-full">Switch to Teacher View</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Dialog open={helpDialogOpen} onOpenChange={setHelpDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Help & Support</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">How is my engagement measured?</h3>
                <p className="text-sm text-muted-foreground">
                  Your engagement is measured based on facial expressions, focus time, and app usage during the lecture.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Can the instructor see what I'm doing?</h3>
                <p className="text-sm text-muted-foreground">
                  Instructors can only see engagement metrics and whether you're using non-lecture applications. They cannot see your screen content.
                </p>
              </div>
              <div>
                <h3 className="font-medium">How do I ask a question?</h3>
                <p className="text-sm text-muted-foreground">
                  Use the Question Panel on the right side of your dashboard to submit questions to your instructor.
                </p>
              </div>
            </div>
            <Button 
              className="w-full mt-6" 
              onClick={() => {
                setHelpDialogOpen(false);
                toast.success('Support ticket created');
              }}
            >
              Contact Support
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default StudentHeader;
