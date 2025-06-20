import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Loader2, User, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { mockUsers } from '@/data/mockUsers';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'user' | 'librarian'>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'Email is required';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return '';
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const isFormValid = () => {
    return email && password && !emailError && !passwordError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    
    setEmailError(emailErr);
    setPasswordError(passwordErr);
    
    if (emailErr || passwordErr) {
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password && (u.role === selectedRole || (selectedRole === 'librarian' && u.role === 'admin'))
      );

      if (user) {
        // Save session
        sessionStorage.setItem('user', JSON.stringify(user));
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.name}! Logged in as ${selectedRole}.`,
        });

        // For now, just show success - no dashboard redirect
        console.log('Login successful:', user);
      } else {
        toast({
          title: "Login Failed",
          description: `Invalid credentials for ${selectedRole} account. Please try again.`,
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const getUsersByRole = (role: 'user' | 'librarian') => {
    if (role === 'librarian') {
      return mockUsers.filter(u => u.role === 'librarian' || u.role === 'admin');
    }
    return mockUsers.filter(u => u.role === 'user');
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
      {/* Role Selection */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-gray-700 mb-3 block">
          Select Login Type
        </Label>
        <RadioGroup
          value={selectedRole}
          onValueChange={(value: 'user' | 'librarian') => setSelectedRole(value)}
          className="flex space-x-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="user" id="user" />
            <Label htmlFor="user" className="flex items-center space-x-2 cursor-pointer">
              <User className="h-4 w-4" />
              <span>User</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="librarian" id="librarian" />
            <Label htmlFor="librarian" className="flex items-center space-x-2 cursor-pointer">
              <Users className="h-4 w-4" />
              <span>Librarian</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Login Container */}
      <div className={`p-6 rounded-xl border-2 transition-all duration-300 mb-6 ${
        selectedRole === 'user' 
          ? 'border-blue-200 bg-blue-50/50' 
          : 'border-purple-200 bg-purple-50/50'
      }`}>
        <div className="flex items-center mb-4">
          {selectedRole === 'user' ? (
            <User className="h-5 w-5 text-blue-600 mr-2" />
          ) : (
            <Users className="h-5 w-5 text-purple-600 mr-2" />
          )}
          <h3 className={`font-semibold ${
            selectedRole === 'user' ? 'text-blue-800' : 'text-purple-800'
          }`}>
            {selectedRole === 'user' ? 'User Login' : 'Librarian Login'}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder={selectedRole === 'user' ? 'user@example.com' : 'librarian@example.com'}
                value={email}
                onChange={handleEmailChange}
                className={`pl-10 h-12 rounded-xl border-2 transition-all duration-200 ${
                  emailError 
                    ? 'border-red-300 focus:border-red-500' 
                    : `border-gray-200 ${selectedRole === 'user' ? 'focus:border-blue-500' : 'focus:border-purple-500'}`
                }`}
              />
            </div>
            {emailError && (
              <p className="text-red-500 text-sm animate-fade-in">{emailError}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                className={`pl-10 pr-12 h-12 rounded-xl border-2 transition-all duration-200 ${
                  passwordError 
                    ? 'border-red-300 focus:border-red-500' 
                    : `border-gray-200 ${selectedRole === 'user' ? 'focus:border-blue-500' : 'focus:border-purple-500'}`
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm animate-fade-in">{passwordError}</p>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link
              to="/reset-password"
              className={`text-sm transition-colors ${
                selectedRole === 'user' 
                  ? 'text-blue-600 hover:text-blue-700' 
                  : 'text-purple-600 hover:text-purple-700'
              }`}
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={!isFormValid() || isLoading}
            className={`w-full h-12 rounded-xl text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
              selectedRole === 'user'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Signing In...
              </div>
            ) : (
              `Sign In as ${selectedRole === 'user' ? 'User' : 'Librarian'}`
            )}
          </Button>
        </form>
      </div>

      {/* Demo Credentials */}
      <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
        <p className="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</p>
        <div className="space-y-1 text-xs text-gray-600">
          <div className="mb-2">
            <p className="font-medium text-blue-700">User Accounts:</p>
            {getUsersByRole('user').map(user => (
              <p key={user.id}><strong>{user.name}:</strong> {user.email} / password123</p>
            ))}
          </div>
          <div>
            <p className="font-medium text-purple-700">Librarian Accounts:</p>
            {getUsersByRole('librarian').map(user => (
              <p key={user.id}><strong>{user.name}:</strong> {user.email} / password123</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
