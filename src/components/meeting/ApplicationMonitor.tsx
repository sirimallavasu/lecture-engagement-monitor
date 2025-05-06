
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Monitor, AlertTriangle } from 'lucide-react';

interface ApplicationUsage {
  id: number;
  studentId: number;
  studentName: string;
  applicationName: string;
  timestamp: string;
  isLectureRelated: boolean;
}

interface ApplicationMonitorProps {
  applications: ApplicationUsage[];
}

const ApplicationMonitor: React.FC<ApplicationMonitorProps> = ({ applications }) => {
  // Filter non-lecture related applications
  const distractions = applications.filter(app => !app.isLectureRelated);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Application Usage Monitor</CardTitle>
        {distractions.length > 0 && (
          <Badge variant="destructive" className="animate-pulse">
            <AlertTriangle className="h-3 w-3 mr-1" />
            {distractions.length} Distractions
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        {distractions.length > 0 ? (
          <div className="space-y-4">
            {distractions.map((app) => (
              <Alert key={app.id} variant="destructive" className="bg-destructive/10">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="flex justify-between">
                  <span>{app.studentName}</span>
                  <span className="text-xs opacity-70">{app.timestamp}</span>
                </AlertTitle>
                <AlertDescription className="flex items-center gap-2">
                  <Monitor className="h-4 w-4" />
                  Using: {app.applicationName}
                </AlertDescription>
              </Alert>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
            <Monitor className="h-8 w-8 mb-2" />
            <p>No distracting applications detected</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApplicationMonitor;
