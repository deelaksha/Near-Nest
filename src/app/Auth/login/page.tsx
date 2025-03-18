'use client';
// components/DarkBlueLoginForm.tsx
import React, { useState } from 'react';
import Link from 'next/link';

// Define interfaces for our form data and errors
interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const DarkBlueLoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    
    // Clear error when field is edited
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Form submission logic would go here
      console.log('Login form submitted:', formData);
    }
  };

  const handleGoogleSignIn = () => {
    // Google sign-in logic would go here
    console.log('Google sign-in clicked');
  };

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8" 
         style={{ backgroundColor: '#0a192f' }}>
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-blue-300">
            Welcome back to our online shopping platform
          </p>
        </div>
        
        <div className="bg-navy-900 p-6 sm:p-8 shadow-xl rounded-lg border border-blue-800" 
             style={{ backgroundColor: '#112240', borderColor: '#1e3a8a' }}>
          
          {/* Google Sign-in Button */}
          <div className="mb-6">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex justify-center items-center gap-3 bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-md border border-gray-300 transition duration-150 ease-in-out"
            >
              {/* Google logo SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span>Sign in with Google</span>
            </button>
          </div>
          
          {/* Divider */}
          <div className="relative my-6">
            <div aria-hidden="true" className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-blue-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-navy-900 text-blue-300" style={{ backgroundColor: '#112240' }}>
                Or continue with
              </span>
            </div>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-blue-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full rounded-md px-3 py-2 border bg-navy-800 text-white ${
                    errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-blue-700 focus:border-blue-400 focus:ring-blue-400'
                  } shadow-sm focus:outline-none focus:ring-1 focus:ring-opacity-50 sm:text-sm`}
                  style={{ backgroundColor: '#1a365d' }}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-blue-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full rounded-md px-3 py-2 border bg-navy-800 text-white ${
                    errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-blue-700 focus:border-blue-400 focus:ring-blue-400'
                  } shadow-sm focus:outline-none focus:ring-1 focus:ring-opacity-50 sm:text-sm`}
                  style={{ backgroundColor: '#1a365d' }}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-700 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-blue-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/Auth/forgot-password" className="font-medium text-blue-400 hover:text-blue-300">
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <div className="text-sm">
              <Link href="/Auth/register" className="font-medium text-blue-400 hover:text-blue-300">
                Don't have an account? Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DarkBlueLoginForm;