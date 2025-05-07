import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || '/student';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Normalize email (trim and convert to lowercase)
    const normalizedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    // Mock login - in a real app, this would be an API call
    setTimeout(() => {
      // Demo credentials with normalized comparison
      if ((normalizedEmail === 'student@example.com' || normalizedEmail === 'student') && 
          trimmedPassword === 'password') {
        toast.success('Login successful!');
        localStorage.setItem('user', JSON.stringify({ role: 'student', name: 'Alex Johnson' }));
        navigate(redirectTo);
      } else if ((normalizedEmail === 'teacher@example.com' || normalizedEmail === 'teacher') && 
                trimmedPassword === 'password') {
        toast.success('Login successful!');
        localStorage.setItem('user', JSON.stringify({ role: 'teacher', name: 'Dr. Vasu' }));
        navigate(redirectTo === '/student' ? '/teacher' : redirectTo);
      } else {
        toast.error('Invalid credentials. Try demo accounts: student@example.com or teacher@example.com with password: password');
      }
      setIsLoading(false);
    }, 1000);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="text" 
                placeholder="student@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  placeholder="password" 
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
            <div className="text-xs text-muted-foreground text-center">
              <div className="font-medium mb-1">Demo accounts:</div>
              <div>Email: student@example.com or teacher@example.com</div>
              <div>Password: password</div>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
