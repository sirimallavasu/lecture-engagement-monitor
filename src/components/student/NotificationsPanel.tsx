
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface NotificationsPanelProps {
  notifications: {
    id: number;
    message: string;
    timestamp: string;
    type: 'attention' | 'positive' | 'info';
  }[];
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ notifications }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'attention':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'positive':
        return <CheckCircle className="h-4 w-4 text-engagement-positive" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };
  
  const getBadgeStyles = (type: string) => {
    switch (type) {
      case 'attention':
        return 'bg-destructive/20 text-destructive';
      case 'positive':
        return 'bg-engagement-positive/20 text-engagement-positive';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <Bell className="h-4 w-4 mr-2" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] pr-4">
          {notifications.length > 0 ? (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div key={notification.id} className="border rounded-md p-3">
                  <div className="flex items-start gap-2">
                    {getIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex justify-between items-start w-full">
                        <Badge className={getBadgeStyles(notification.type)}>
                          {notification.type === 'attention' ? 'Focus Needed' : 
                           notification.type === 'positive' ? 'Great Work' : 'Info'}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {notification.timestamp}
                        </span>
                      </div>
                      <p className="mt-1 text-sm">{notification.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Bell className="h-8 w-8 text-muted-foreground mb-2 opacity-50" />
              <p className="text-sm text-muted-foreground">No notifications yet</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default NotificationsPanel;
