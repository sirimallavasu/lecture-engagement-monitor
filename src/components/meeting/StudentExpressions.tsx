
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smile, Meh, Frown } from 'lucide-react';

interface Student {
  id: number;
  name: string;
  expression: 'happy' | 'neutral' | 'sad';
}

interface StudentExpressionsProps {
  students: Student[];
}

const StudentExpressions: React.FC<StudentExpressionsProps> = ({ students }) => {
  const getExpressionIcon = (expression: Student['expression']) => {
    switch (expression) {
      case 'happy':
        return <Smile className="h-5 w-5 text-engagement-positive" />;
      case 'neutral':
        return <Meh className="h-5 w-5 text-engagement-neutral" />;
      case 'sad':
        return <Frown className="h-5 w-5 text-engagement-negative" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Expressions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {students.map((student) => (
            <div key={student.id} className="border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-sm truncate">{student.name}</p>
                {getExpressionIcon(student.expression)}
              </div>
              <div className="bg-muted rounded-md p-2 text-xs">
                Expression: <span className="font-medium">{student.expression}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentExpressions;
