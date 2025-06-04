
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Calendar, Eye } from 'lucide-react';

interface ClassListProps {
  classes: any[];
  onClassSelect: (classId: string) => void;
  selectedClassId: string | null;
}

const ClassList = ({ classes, onClassSelect, selectedClassId }: ClassListProps) => {
  if (classes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Classes</CardTitle>
          <CardDescription>
            You haven't created any classes yet. Click "Create New Class" to get started.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your Classes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((classData: any) => (
          <Card 
            key={classData.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedClassId === classData.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => onClassSelect(classData.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{classData.title}</CardTitle>
                  <CardDescription className="mt-2">
                    Class ID: <span className="font-mono">{classData.class_id}</span>
                  </CardDescription>
                </div>
                <Badge variant="secondary">
                  <BookOpen className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {classData.description && (
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {classData.description}
                </p>
              )}
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>0 students</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{new Date(classData.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-4"
                onClick={(e) => {
                  e.stopPropagation();
                  onClassSelect(classData.id);
                }}
              >
                <Eye className="w-4 h-4 mr-2" />
                Manage Class
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClassList;
