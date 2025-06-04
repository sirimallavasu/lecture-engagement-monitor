
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Users, BookOpen, BarChart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import CreateClassModal from '@/components/teacher/CreateClassModal';
import ClassList from '@/components/teacher/ClassList';
import LectureMaterialsManager from '@/components/teacher/LectureMaterialsManager';
import EngagementReports from '@/components/teacher/EngagementReports';

const TeacherDashboard = () => {
  const { user, profile } = useAuth();
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch teacher's classes
  const fetchClasses = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .eq('teacher_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClasses(data || []);
    } catch (error) {
      console.error('Error fetching classes:', error);
      toast.error('Failed to load classes');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [user]);

  const handleClassCreated = (newClass: any) => {
    setClasses(prev => [newClass, ...prev]);
    toast.success('Class created successfully!');
  };

  const selectedClass = classes.find((cls: any) => cls.id === selectedClassId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 transition-colors">
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {profile?.name || 'Teacher'}</p>
          </div>
          <CreateClassModal onClassCreated={handleClassCreated} />
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{classes.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Across all classes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Engagement</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="classes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="reports">Engagement Reports</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="classes" className="space-y-6">
            <ClassList 
              classes={classes} 
              onClassSelect={setSelectedClassId}
              selectedClassId={selectedClassId}
            />
          </TabsContent>
          
          <TabsContent value="materials" className="space-y-6">
            {selectedClass ? (
              <LectureMaterialsManager classData={selectedClass} />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Lecture Materials</CardTitle>
                  <CardDescription>
                    Select a class from the Classes tab to manage its materials
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-6">
            {selectedClass ? (
              <EngagementReports classData={selectedClass} />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Engagement Reports</CardTitle>
                  <CardDescription>
                    Select a class from the Classes tab to view student engagement reports
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Teacher Settings</CardTitle>
                <CardDescription>Manage your account and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Settings panel coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeacherDashboard;
