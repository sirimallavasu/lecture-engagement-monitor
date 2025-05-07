
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

const formSchema = z.object({
  className: z.string().min(3, { message: "Class name is required (min 3 characters)" }),
  classId: z.string().min(2, { message: "Class ID is required (min 2 characters)" }),
  password: z.string().min(4, { message: "Password must be at least 4 characters" }),
  description: z.string().optional(),
});

type CreateClassModalProps = {
  onClassCreated: (classData: any) => void;
};

const CreateClassModal = ({ onClassCreated }: CreateClassModalProps) => {
  const [open, setOpen] = React.useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      className: '',
      classId: '',
      password: '',
      description: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, this would call an API to create a class
    const newClass = {
      ...values,
      id: values.classId,
      title: values.className,
      schedule: 'Custom Schedule',
      students: 0,
      date: 'Upcoming',
      createdAt: new Date().toISOString(),
    };
    
    // Store in localStorage for persistence across page reloads
    const teacherClasses = JSON.parse(localStorage.getItem('teacherClasses') || '[]');
    teacherClasses.push(newClass);
    localStorage.setItem('teacherClasses', JSON.stringify(teacherClasses));
    
    // Call the callback to update UI
    onClassCreated(newClass);
    
    toast.success('Class created successfully!');
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2" />
          Create New Class
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Class</DialogTitle>
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
                    <Input placeholder="Introduction to Computer Science" {...field} />
                  </FormControl>
                  <FormMessage />
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
                    <Input placeholder="CS101" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="A brief introduction to computer science concepts" {...field} />
                  </FormControl>
                  <FormMessage />
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
                    <Input type="text" placeholder="1234" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end pt-2">
              <Button type="submit">Create Class</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClassModal;
