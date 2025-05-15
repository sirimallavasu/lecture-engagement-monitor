
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Link as LinkIcon, Play, Download, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  onAddMaterial?: (material: { title: string; type: string }) => void;
}

const CurrentLectureView: React.FC<CurrentLectureViewProps> = ({ lecture, materials, onAddMaterial }) => {
  const [isAddingMaterial, setIsAddingMaterial] = useState(false);
  const [newMaterial, setNewMaterial] = useState({ title: '', type: 'pdf' });

  const handleAddMaterial = () => {
    if (!newMaterial.title.trim()) {
      toast.error('Please enter a title for the material');
      return;
    }

    if (onAddMaterial) {
      onAddMaterial(newMaterial);
      toast.success(`Added ${newMaterial.title}`);
      setNewMaterial({ title: '', type: 'pdf' });
      setIsAddingMaterial(false);
    }
  };

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
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Lecture Materials</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddingMaterial(true)}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Material
            </Button>
          </div>
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
        
        <Dialog open={isAddingMaterial} onOpenChange={setIsAddingMaterial}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Lecture Material</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="material-title">Title</Label>
                <Input
                  id="material-title"
                  value={newMaterial.title}
                  onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                  placeholder="Lecture Slides, Additional Reading, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="material-type">Type</Label>
                <Select
                  value={newMaterial.type}
                  onValueChange={(value) => setNewMaterial({ ...newMaterial, type: value })}
                >
                  <SelectTrigger id="material-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="link">Web Link</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingMaterial(false)}>Cancel</Button>
              <Button onClick={handleAddMaterial}>Add Material</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default CurrentLectureView;
