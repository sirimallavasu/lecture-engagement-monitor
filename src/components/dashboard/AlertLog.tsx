
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { showNotification } from '@/services/notificationService';

interface Alert {
  id: number;
  timestamp: string;
  student: string;
  type: 'distraction' | 'expression';
  message: string;
}

interface AlertLogProps {
  alerts: Alert[];
}

const AlertLog: React.FC<AlertLogProps> = ({ alerts }) => {
  const previousAlertCount = useRef(alerts.length);
  
  useEffect(() => {
    // Check if new alerts have been added
    if (alerts.length > previousAlertCount.current) {
      // Get the new alerts (those at the beginning of the array)
      const newAlerts = alerts.slice(0, alerts.length - previousAlertCount.current);
      
      // Show notification for each new alert
      newAlerts.forEach(alert => {
        showNotification({
          id: alert.id,
          title: `Student Alert: ${alert.type === 'distraction' ? 'Distraction' : 'Expression'}`,
          message: `${alert.student}: ${alert.message}`,
          type: alert.type,
          studentName: alert.student
        });
      });
    }
    
    // Update the previous count
    previousAlertCount.current = alerts.length;
  }, [alerts]);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Recent Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[250px]">
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="border-b pb-2">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-medium text-sm">{alert.student}</p>
                  <Badge variant={alert.type === 'distraction' ? 'destructive' : 'outline'}>
                    {alert.type === 'distraction' ? 'App Usage' : 'Expression'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{alert.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
              </div>
            ))}
            {alerts.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No alerts to display</p>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AlertLog;
