
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Link as LinkIcon, Plus, Download, Eye, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Material {
  id: number;
  title: string;
  type: 'slides' | 'reading' | 'examples';
  description: string;
  url?: string;
  dateAdded: string;
}

const LectureMaterials = () => {
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: 1,
      title: 'Introduction to Data Structures - Slides',
      type: 'slides',
      description: 'Main presentation slides for the lecture',
      dateAdded: '2025-06-02'
    },
    {
      id: 2,
      title: 'Additional Reading on Arrays',
      type: 'reading',
      description: 'Supplementary reading material on array operations',
      url: 'https://example.com/arrays',
      dateAdded: '2025-06-02'
    },
    {
      id: 3,
      title: 'Practice Examples - Coding Exercises',
      type: 'examples',
      description: 'Hands-on coding examples and exercises',
      dateAdded: '2025-06-02'
    }
  ]);

  const [newMaterial, setNewMaterial] = useState({
    title: '',
    type: 'slides' as Material['type'],
    description: '',
    url: ''
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddMaterial = () => {
    if (!newMaterial.title.trim()) {
      toast.error('Please enter a title for the material');
      return;
    }

    const material: Material = {
      id: Date.now(),
      title: newMaterial.title,
      type: newMaterial.type,
      description: newMaterial.description,
      url: newMaterial.url || undefined,
      dateAdded: new Date().toISOString().split('T')[0]
    };

    setMaterials(prev => [...prev, material]);
    setNewMaterial({ title: '', type: 'slides', description: '', url: '' });
    setIsDialogOpen(false);
    toast.success('Material added successfully!');
  };

  const handleDeleteMaterial = (id: number) => {
    setMaterials(prev => prev.filter(material => material.id !== id));
    toast.success('Material deleted');
  };

  const getTypeIcon = (type: Material['type']) => {
    switch (type) {
      case 'slides':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'reading':
        return <LinkIcon className="h-4 w-4 text-green-500" />;
      case 'examples':
        return <FileText className="h-4 w-4 text-purple-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: Material['type']) => {
    switch (type) {
      case 'slides':
        return 'Lecture Slides';
      case 'reading':
        return 'Additional Reading';
      case 'examples':
        return 'Practice Examples';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Lecture Materials</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Material
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Material</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newMaterial.title}
                    onChange={(e) => setNewMaterial(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter material title"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={newMaterial.type}
                    onValueChange={(value) => setNewMaterial(prev => ({ ...prev, type: value as Material['type'] }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select material type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slides">Lecture Slides</SelectItem>
                      <SelectItem value="reading">Additional Reading</SelectItem>
                      <SelectItem value="examples">Practice Examples</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newMaterial.description}
                    onChange={(e) => setNewMaterial(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of the material"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="url">URL (Optional)</Label>
                  <Input
                    id="url"
                    value={newMaterial.url}
                    onChange={(e) => setNewMaterial(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="https://example.com/material"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddMaterial}>
                    Add Material
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {materials.map((material) => (
            <div
              key={material.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-3 flex-1">
                {getTypeIcon(material.type)}
                <div className="flex-1">
                  <h4 className="font-medium">{material.title}</h4>
                  <p className="text-sm text-muted-foreground">{material.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs bg-muted px-2 py-1 rounded">
                      {getTypeLabel(material.type)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Added: {material.dateAdded}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast.success(`Opening ${material.title}`)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                {material.url ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(material.url, '_blank')}
                  >
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                ) : (
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
                  onClick={() => handleDeleteMaterial(material.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {materials.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No materials added yet</p>
              <p className="text-sm">Click "Add Material" to get started</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureMaterials;
