
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { Check, X, Mail } from 'lucide-react';

const Verify = () => {
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const email = params.get('email');

    if (!token || !email) {
      setStatus('error');
      setErrorMessage('Invalid verification link');
      return;
    }

    // Verify token
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const userIndex = registeredUsers.findIndex((user: any) => 
      user.email === decodeURIComponent(email) && user.verificationToken === token
    );

    if (userIndex === -1) {
      setStatus('error');
      setErrorMessage('Invalid or expired verification link');
      return;
    }

    // Mark user as verified
    registeredUsers[userIndex].emailVerified = true;
    registeredUsers[userIndex].verifiedAt = new Date().toISOString();
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

    // Show success
    setStatus('success');
    
    // Auto redirect after 3 seconds
    setTimeout(() => {
      navigate('/login?verified=true');
    }, 3000);
  }, [location, navigate]);

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
