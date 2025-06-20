import React, { useState } from 'react';
import { Mail, ArrowLeft, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockUsers } from '@/data/mockUsers';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetStatus, setResetStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
    setResetStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailErr = validateEmail(email);
    setEmailError(emailErr);
    
    if (emailErr) {
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const userExists = mockUsers.some(user => user.email === email);
      
      if (userExists) {
        setResetStatus('success');
      } else {
        setResetStatus('error');
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const isFormValid = () => {
    return email && !emailError;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">BookVault</h1>
          <p className="text-gray-600">Reset your password</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Forgot Password?</h2>
            <p className="text-gray-600 text-sm">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {resetStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <p className="text-green-800 text-sm">
                  Reset link has been sent to your email 💌
                </p>
              </div>
            </div>
          )}

          {resetStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center">
                <XCircle className="h-5 w-5 text-red-600 mr-2" />
                <p className="text-red-800 text-sm">
                  This email is not registered 😕
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={handleEmailChange}
                  className={`pl-10 h-12 rounded-xl border-2 transition-all duration-200 ${
                    emailError 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-blue-500'
                  }`}
                />
              </div>
              {emailError && (
                <p className="text-red-500 text-sm animate-fade-in">{emailError}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={!isFormValid() || isLoading}
              className="w-full h-12 rounded-xl text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Sending Reset Link...
                </div>
              ) : (
                'Send Reset Link'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Login
            </Link>
          </div>
        </div>

        {/* Demo Information */}
        <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-sm font-medium text-gray-700 mb-2">Demo Emails:</p>
          <div className="space-y-1 text-xs text-gray-600">
            <p>admin@example.com</p>
            <p>librarian@example.com</p>
            <p>john.smith@example.com</p>
            <p>user@example.com</p>
            <p>bob.user@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
