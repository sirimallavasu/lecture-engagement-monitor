
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { Check, X, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Verify = () => {
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // This page is now handled directly by Supabase
    // The user is automatically redirected here after clicking the email verification link
    // We just need to check if the email is verified and show the appropriate message
    
    const checkEmailVerification = async () => {
      try {
        // Get the current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user?.email_confirmed_at) {
          // Email is verified
          setStatus('success');
          
          // Auto redirect after 3 seconds
          setTimeout(() => {
            navigate('/login?verified=true');
          }, 3000);
        } else {
          // No session or email not verified
          setStatus('error');
          setErrorMessage('Email verification failed or expired. Please try again.');
        }
      } catch (error) {
        console.error('Error checking verification status:', error);
        setStatus('error');
        setErrorMessage('An error occurred while verifying your email.');
      }
    };
    
    checkEmailVerification();
  }, [navigate]);

  const goToLogin = () => {
    navigate('/login');
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Email Verification</CardTitle>
          <CardDescription className="text-center">
            Verifying your email address
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          {status === 'verifying' && (
            <div className="text-center space-y-4">
              <div className="animate-pulse inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <p>Verifying your email address...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Verification Successful</h3>
                <p className="text-muted-foreground mt-1">
                  Your email has been verified successfully!
                </p>
              </div>
              <p className="text-sm">
                Redirecting you to login page in a few seconds...
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/20">
                <X className="h-8 w-8 text-destructive" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Verification Failed</h3>
                <p className="text-muted-foreground mt-1">{errorMessage}</p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          {status === 'success' && (
            <Button className="w-full" onClick={goToLogin}>
              Go to Login
            </Button>
          )}
          
          {status === 'error' && (
            <>
              <Button className="w-full" onClick={goToSignup}>
                Sign Up Again
              </Button>
              <Button variant="outline" className="w-full" onClick={goToLogin}>
                Go to Login
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Verify;
