
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smile, Meh, Frown, Monitor } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Student {
  id: number;
  name: string;
  expression: 'happy' | 'neutral' | 'sad';
  isDistracted: boolean;
  lastActivity?: string;
}

interface StudentGridProps {
  students: Student[];
}

const StudentGrid: React.FC<StudentGridProps> = ({ students }) => {
  const getExpressionIcon = (expression: Student['expression']) => {
    switch (expression) {
      case 'happy':
        return <Smile className="h-5 w-5 text-engagement-positive" />;
      case 'neutral':
        return <Meh className="h-5 w-5 text-engagement-neutral" />;
      case 'sad':
        return <Frown className="h-5 w-5 text-engagement-negative" />;
      default:
        return null;
    }
  };

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Student Monitoring</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {students.map((student) => (
            <div key={student.id} className="border rounded-lg p-2">
              <div className="relative">
                <div className="bg-gray-200 aspect-video rounded-md flex items-center justify-center">
                  <Monitor className="h-12 w-12 text-gray-400" />
                </div>
                <div className="absolute top-2 right-2 flex space-x-1">
                  {getExpressionIcon(student.expression)}
                  {student.isDistracted && (
                    <Badge variant="destructive" className="h-5 animate-pulse-light">Distracted</Badge>
                  )}
                </div>
              </div>
              <div className="mt-2">
                <p className="font-medium text-sm">{student.name}</p>
                {student.isDistracted && student.lastActivity && (
                  <p className="text-xs text-muted-foreground">Using: {student.lastActivity}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentGrid;
