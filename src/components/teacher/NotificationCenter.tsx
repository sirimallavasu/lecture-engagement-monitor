import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, AlertTriangle, Monitor, Clock, X, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Notification {
  id: string;
  type: 'distraction' | 'app_usage';
  studentName: string;
  className: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  severity: 'low' | 'medium' | 'high';
  details?: any;
}

const NotificationCenter = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate real-time notifications (in a real app, this would come from Supabase realtime)
  useEffect(() => {
    const generateMockNotifications = () => {
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'distraction',
          studentName: 'John Smith',
          className: 'Introduction to Computer Science',
          message: 'Student appears distracted with engagement score of 45%',
          timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
          isRead: false,
          severity: 'high',
          details: { engagementScore: 45, duration: '10 minutes' }
        },
        {
          id: '2',
          type: 'app_usage',
          studentName: 'Sarah Johnson',
          className: 'Data Structures',
          message: 'Using Instagram during class time',
          timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
          isRead: false,
          severity: 'medium',
          details: { application: 'Instagram', duration: '5 minutes' }
        },
        {
          id: '3',
          type: 'distraction',
          studentName: 'Mike Wilson',
          className: 'Introduction to Computer Science',
          message: 'Low focus score detected (38%)',
          timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
          isRead: true,
          severity: 'medium',
          details: { focusScore: 38, duration: '15 minutes' }
        }
      ];
      setNotifications(mockNotifications);
      setIsLoading(false);
    };

    generateMockNotifications();

    // Simulate new notifications coming in
    const interval = setInterval(() => {
      const notificationTypes: ('distraction' | 'app_usage')[] = ['distraction', 'app_usage'];
      const severityLevels: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];
      const studentNames = ['Alex Brown', 'Emma Davis', 'Tom Wilson'];
      const messages = [
        'Student engagement dropped to 40%',
        'Using YouTube during class',
        'Low attention detected',
        'Using social media apps'
      ];

      const randomNotification: Notification = {
        id: Date.now().toString(),
        type: notificationTypes[Math.floor(Math.random() * notificationTypes.length)],
        studentName: studentNames[Math.floor(Math.random() * studentNames.length)],
        className: 'Introduction to Computer Science',
        message: messages[Math.floor(Math.random() * messages.length)],
        timestamp: new Date(),
        isRead: false,
        severity: severityLevels[Math.floor(Math.random() * severityLevels.length)],
        details: {}
      };

      setNotifications(prev => [randomNotification, ...prev].slice(0, 20));
    }, 30000); // New notification every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'distraction':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'app_usage':
        return <Monitor className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-amber-600 bg-amber-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="ml-2" variant="destructive">
                  {unreadCount}
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Real-time alerts about student activity and engagement
            </CardDescription>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No notifications</h3>
            <p className="text-muted-foreground">
              You'll see alerts here when students need attention
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start justify-between p-4 border rounded-lg transition-colors ${
                  !notification.isRead ? 'bg-blue-50 border-blue-200' : 'bg-background'
                }`}
              >
                <div className="flex items-start space-x-3 flex-1">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium truncate">{notification.studentName}</h4>
                      <Badge variant="outline" className="text-xs">
                        {notification.className}
                      </Badge>
                      <Badge className={`text-xs ${getSeverityColor(notification.severity)}`}>
                        {notification.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {notification.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  {!notification.isRead && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dismissNotification(notification.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationCenter;
