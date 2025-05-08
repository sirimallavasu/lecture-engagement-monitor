
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { Eye, EyeOff, Mail } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [verificationRequired, setVerificationRequired] = useState(false);
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Normalize email (trim and convert to lowercase)
    const normalizedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();
    
    // Get registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const user = registeredUsers.find((u: any) => u.email === normalizedEmail);
    
    setTimeout(() => {
      if (user) {
        if (user.password === trimmedPassword) {
          if (user.emailVerified) {
            toast.success('Login successful!');
            localStorage.setItem('user', JSON.stringify({ 
              role: user.role, 
              name: user.name,
              email: user.email
            }));
            navigate(user.role === 'teacher' && redirectTo === '/student' ? '/teacher' : redirectTo);
          } else {
            setVerificationRequired(true);
            toast.error('Please verify your email before logging in.');
          }
        } else {
          toast.error('Invalid password. Please try again.');
        }
      } else {
        toast.error('Email not found. Please sign up first.');
      }
      setIsLoading(false);
    }, 1000);
  };

  const resendVerificationEmail = () => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const user = registeredUsers.find((u: any) => u.email === email.trim().toLowerCase());
    
    if (user) {
      // Generate verification token
      const verificationToken = Math.random().toString(36).substring(2, 15);
      
      // Update user with new token
      const updatedUsers = registeredUsers.map((u: any) => {
        if (u.email === user.email) {
          return { ...u, verificationToken };
        }
        return u;
      });
      
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      
      // Simulate sending email
      toast.success('Verification email resent! Please check your inbox.');
      console.log(`Verification link: http://localhost:3000/verify?token=${verificationToken}&email=${encodeURIComponent(user.email)}`);
    } else {
      toast.error('Email not found. Please sign up first.');
    }
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
                placeholder="your-email@example.com" 
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
            {verificationRequired && (
              <div className="text-sm text-destructive">
                <p>Email not verified. Please check your inbox for the verification link or click below to resend.</p>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="mt-2 text-xs w-full"
                  onClick={resendVerificationEmail}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Resend verification email
                </Button>
              </div>
            )}
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
