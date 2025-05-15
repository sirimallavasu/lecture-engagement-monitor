
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Link as LinkIcon, Play, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface CurrentLectureViewProps {
  lecture: {
    title: string;
    instructor: string;
    startTime: string;
    endTime: string;
    progress: number;
  };
  materials: {
    id: number;
    title: string;
    type: string;
  }[];
}

const CurrentLectureView: React.FC<CurrentLectureViewProps> = ({ lecture, materials }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div>Current Lecture</div>
          <div className="text-sm font-normal text-muted-foreground">
            Progress: {lecture.progress}%
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={lecture.progress} className="h-2" />
        
        <div className="pt-2">
          <h3 className="font-medium">Lecture Materials</h3>
          <ul className="mt-2 space-y-2">
            {materials.map(material => (
              <li key={material.id} className="border rounded-md p-2 flex justify-between items-center">
                <div className="flex items-center">
                  {material.type === 'pdf' ? (
                    <FileText className="h-5 w-5 text-red-500 mr-2" />
                  ) : (
                    <LinkIcon className="h-5 w-5 text-blue-500 mr-2" />
                  )}
                  <span>{material.title}</span>
                </div>
                <div className="flex space-x-2">
                  {material.type === 'pdf' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => toast.success(`Downloading ${material.title}`)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => toast.success(`Opening ${material.title}`)}
                  >
                    {material.type === 'pdf' ? (
                      <Play className="h-4 w-4" />
                    ) : (
                      <LinkIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentLectureView;
