
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { Play, Calendar, Users, Clock } from 'lucide-react';

// Mock lectures data
const mockLectures = [
  {
    id: 'CS101',
    title: 'Introduction to Data Structures',
    schedule: '10:00 AM - 11:30 AM',
    students: 24,
    date: 'Today'
  },
  {
    id: 'MATH202',
    title: 'Linear Algebra',
    schedule: '1:00 PM - 2:30 PM',
    students: 18,
    date: 'Today'
  },
  {
    id: 'PHYS303',
    title: 'Quantum Mechanics',
    schedule: '3:00 PM - 4:30 PM',
    students: 15,
    date: 'Tomorrow'
  }
];

const formSchema = z.object({
  className: z.string().min(3, { message: "Class name is required" }),
  classId: z.string().min(2, { message: "Class ID is required" }),
  password: z.string().min(4, { message: "Password must be at least 4 characters" }),
});

const LectureView = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState<typeof mockLectures[0] | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      className: '',
      classId: '',
      password: '',
    },
  });

  const startLecture = (lecture: typeof mockLectures[0]) => {
    setSelectedLecture(lecture);
    form.setValue('className', lecture.title);
    form.setValue('classId', lecture.id);
    form.setValue('password', '1234'); // Default password for demo
    setOpenDialog(true);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, this would call an API to create the class session
    toast.success(`Class ${values.className} started successfully!`);
    setOpenDialog(false);
    
    // Navigate to video meeting page with class details
    navigate('/video-meeting', { 
      state: { 
        isTeacher: true,
        classTitle: values.className,
        classId: values.classId
      } 
    });
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Teacher Lectures</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockLectures.map((lecture) => (
            <Card key={lecture.id} className="overflow-hidden">
              <CardHeader className="bg-primary/5">
                <CardTitle>{lecture.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{lecture.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{lecture.schedule}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{lecture.students} students enrolled</span>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={() => startLecture(lecture)}>
                    <Play className="mr-2" />
                    Start Class
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start Class Session</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="className"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Name</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="classId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class ID</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Password</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end">
                <Button type="submit">Start Session</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LectureView;
