
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface JoinClassModalProps {
  onJoinSuccess?: (classDetails: { id: string; name: string }) => void;
}

const JoinClassModal: React.FC<JoinClassModalProps> = ({ onJoinSuccess }) => {
  const [classId, setClassId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock joining a class
    setTimeout(() => {
      // For demo purposes, any password works with these class IDs
      if (classId === 'CS101' || classId === 'MATH202' || classId === 'PHYS303') {
        const classNames: Record<string, string> = {
          'CS101': 'Introduction to Data Structures',
          'MATH202': 'Advanced Calculus',
          'PHYS303': 'Quantum Physics',
        };
        
        toast.success(`Successfully joined ${classNames[classId]}`);
        
        if (onJoinSuccess) {
          onJoinSuccess({
            id: classId,
            name: classNames[classId],
          });
        }
        
        setOpen(false);
        setClassId('');
        setPassword('');
      } else {
        toast.error('Invalid class ID or password');
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Join a Class</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Join a Class</DialogTitle>
            <DialogDescription>
              Enter the class ID and password provided by your instructor.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="class-id" className="text-right">
                Class ID
              </Label>
              <Input
                id="class-id"
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                className="col-span-3"
                placeholder="e.g., CS101"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="col-span-3"
                placeholder="Enter class password"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Joining..." : "Join Class"}
            </Button>
          </DialogFooter>
          
          <div className="mt-4 text-xs text-muted-foreground border-t pt-2">
            <p className="font-medium">Demo Class IDs:</p>
            <p>CS101 - Introduction to Data Structures</p>
            <p>MATH202 - Advanced Calculus</p>
            <p>PHYS303 - Quantum Physics</p>
            <p className="mt-1">(Any password works for demo)</p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JoinClassModal;
