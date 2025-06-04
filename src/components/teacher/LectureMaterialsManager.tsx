
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, FileText, Link2, BookOpen, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface LectureMaterialsManagerProps {
  classData: any;
}

const LectureMaterialsManager = ({ classData }: LectureMaterialsManagerProps) => {
  const [materials, setMaterials] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    url: '',
    description: ''
  });

  const materialTypes = [
    { value: 'slides', label: 'Lecture Slides', icon: FileText },
    { value: 'reading', label: 'Additional Reading', icon: BookOpen },
    { value: 'practice', label: 'Practice Examples', icon: FileText }
  ];

  const fetchMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from('lecture_materials')
        .select('*')
        .eq('class_id', classData.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMaterials(data || []);
    } catch (error) {
      console.error('Error fetching materials:', error);
      toast.error('Failed to load materials');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, [classData.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.type || !formData.url) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('lecture_materials')
        .insert([{
          class_id: classData.id,
          title: formData.title,
          type: formData.type,
          url: formData.url,
          description: formData.description
        }])
        .select()
        .single();

      if (error) throw error;

      setMaterials(prev => [data, ...prev]);
      setFormData({ title: '', type: '', url: '', description: '' });
      setShowAddForm(false);
      toast.success('Material added successfully!');
    } catch (error) {
      console.error('Error adding material:', error);
      toast.error('Failed to add material');
    }
  };

  const handleDelete = async (materialId: string) => {
    try {
      const { error } = await supabase
        .from('lecture_materials')
        .delete()
        .eq('id', materialId);

      if (error) throw error;

      setMaterials(prev => prev.filter((material: any) => material.id !== materialId));
      toast.success('Material deleted successfully!');
    } catch (error) {
      console.error('Error deleting material:', error);
      toast.error('Failed to delete material');
    }
  };

  const getTypeIcon = (type: string) => {
    const typeInfo = materialTypes.find(t => t.value === type);
    return typeInfo ? typeInfo.icon : FileText;
  };

  const getTypeLabel = (type: string) => {
    const typeInfo = materialTypes.find(t => t.value === type);
    return typeInfo ? typeInfo.label : type;
  };

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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lecture Materials</CardTitle>
              <CardDescription>
                Manage materials for {classData.title}
              </CardDescription>
            </div>
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Material
            </Button>
          </div>
        </CardHeader>
        
        {showAddForm && (
          <CardContent className="border-t">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Week 1 Slides"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select material type" />
                    </SelectTrigger>
                    <SelectContent>
                      {materialTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="url">URL/Link *</Label>
                <Input
                  id="url"
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="https://example.com/material.pdf"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Optional description..."
                  rows={3}
                />
              </div>
              
              <div className="flex gap-2">
                <Button type="submit">Add Material</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        )}
      </Card>

      {/* Materials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {materials.map((material: any) => {
          const Icon = getTypeIcon(material.type);
          return (
            <Card key={material.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className="w-5 h-5 text-primary" />
                    <div>
                      <CardTitle className="text-base">{material.title}</CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {getTypeLabel(material.type)}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(material.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {material.description && (
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {material.description}
                  </p>
                )}
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={material.url} target="_blank" rel="noopener noreferrer">
                    <Link2 className="w-4 h-4 mr-2" />
                    Open Material
                  </a>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {materials.length === 0 && !showAddForm && (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No materials yet</h3>
            <p className="text-muted-foreground mb-4">
              Add lecture slides, readings, and practice materials for your students.
            </p>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add First Material
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LectureMaterialsManager;
