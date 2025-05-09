
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  const handleJoinClass = () => {
    if (!user) {
      toast.info('Please sign in to join a class');
      navigate('/login', { state: { redirectTo: '/video-meeting' } });
    } else {
      navigate('/video-meeting');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-background p-4 text-center">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Classroom Engagement Monitor
        </h1>
        <p className="text-xl text-muted-foreground max-w-md mx-auto">
          AI-powered real-time student engagement analytics for modern educators
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {user ? (
          <>
            <Button asChild size="lg">
              <Link to={profile?.role === 'teacher' ? '/teacher' : '/student'}>
                Go to Dashboard
              </Link>
            </Button>
            <Button variant="outline" size="lg" onClick={() => signOut()}>
              Log Out
            </Button>
          </>
        ) : (
          <>
            <Button asChild size="lg">
              <Link to="/login">
                Log In
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/signup">
                Sign Up
              </Link>
            </Button>
          </>
        )}
        <Button variant="outline" size="lg" onClick={handleJoinClass}>
          Join Class
        </Button>
      </div>
    </div>
  );
};

export default Index;
