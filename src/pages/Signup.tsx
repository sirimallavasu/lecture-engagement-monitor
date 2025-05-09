
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Eye, EyeOff, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('student');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
        options: {
          data: {
            name,
            role
          },
        }
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        setVerificationSent(true);
        toast.success('Registration successful! Please check your email to verify your account.');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Failed to sign up. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign up</CardTitle>
          <CardDescription className="text-center">
            Create your account to get started
          </CardDescription>
        </CardHeader>
        {!verificationSent ? (
          <form onSubmit={handleSignup}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="John Doe" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={toggleShowPassword}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">I am a</Label>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={role === 'student' ? 'default' : 'outline'}
                    className="flex-1"
                    onClick={() => setRole('student')}
                  >
                    Student
                  </Button>
                  <Button
                    type="button"
                    variant={role === 'teacher' ? 'default' : 'outline'}
                    className="flex-1" 
                    onClick={() => setRole('teacher')}
                  >
                    Teacher
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create account'}
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        ) : (
          <div className="p-6">
            <div className="flex flex-col items-center justify-center space-y-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="font-medium text-lg">Verification email sent</h3>
                <p className="text-muted-foreground mt-1">
                  We've sent a verification link to <span className="font-medium">{email}</span>
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-center">
                Please check your inbox and click the verification link to complete your registration.
                If you don't see it, check your spam folder.
              </p>
              <div className="flex flex-col gap-2">
                <Button onClick={goToLogin} className="w-full">
                  Go to login
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Signup;
