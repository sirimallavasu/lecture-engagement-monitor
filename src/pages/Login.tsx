
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || '/student';

  useEffect(() => {
    // Check if coming from verification success
    const params = new URLSearchParams(location.search);
    if (params.get('verified') === 'true') {
      toast.success('Email verified successfully! You can now log in.');
    }
  }, [location]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic client-side validation
    if (!email.trim()) {
      toast.error('Please enter your email address');
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      toast.error('Please enter your password');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Attempting login with:', email.trim());
      
      // Try Supabase login first
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        console.error('Supabase login error:', error);
        
        // If it's a network error, try local authentication
        if (error.message.includes('Failed to fetch') || error.message.includes('network')) {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            const userData = JSON.parse(storedUser);
            if (userData.email === email.trim()) {
              toast.success('Login successful (offline mode)!');
              navigate('/student');
              return;
            }
          }
          toast.error('Network issue detected. Please check your connection.');
          return;
        }
        
        throw error;
      }

      if (data.user) {
        toast.success('Login successful!');
        navigate('/student');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle network errors with fallback
      if (error.message.includes('Failed to fetch') || error.message.includes('network')) {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          if (userData.email === email.trim()) {
            toast.info('Using offline mode');
            navigate('/student');
            return;
          }
        }
        toast.error('Network connection issue. Please try again.');
      } else if (error.message.includes('Email not confirmed')) {
        toast.error('Please verify your email before logging in.');
      } else if (error.message.includes('Invalid login credentials')) {
        toast.error('Invalid email or password. Please try again.');
      } else {
        toast.error('Failed to sign in. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-gray-900 transition-colors px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your student account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your-email@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/reset-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
