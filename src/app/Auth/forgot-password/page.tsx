'use client';
// components/ForgotPasswordFlow.tsx
import React, { useState } from 'react';
import Link from 'next/link';

// Define interfaces for our form data and errors
interface ForgotPasswordData {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  email?: string;
  otp?: string;
  newPassword?: string;
  confirmPassword?: string;
}

// Define the steps in our forgot password flow
enum ForgotPasswordStep {
  EMAIL_ENTRY,
  OTP_VERIFICATION,
  PASSWORD_RESET,
  SUCCESS
}

const ForgotPasswordFlow: React.FC = () => {
  const [formData, setFormData] = useState<ForgotPasswordData>({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [currentStep, setCurrentStep] = useState<ForgotPasswordStep>(ForgotPasswordStep.EMAIL_ENTRY);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when field is edited
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateEmailStep = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOtpStep = (): boolean => {
    const newErrors: FormErrors = {};
    
    // OTP validation
    if (!formData.otp) {
      newErrors.otp = 'OTP is required';
    } else if (!/^\d{6}$/.test(formData.otp)) {
      newErrors.otp = 'OTP must be 6 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordStep = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Password validation
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateEmailStep()) {
      // In a real application, you would send the email with OTP here
      console.log('Sending OTP to email:', formData.email);
      setCurrentStep(ForgotPasswordStep.OTP_VERIFICATION);
    }
  };

  const handleOtpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateOtpStep()) {
      // In a real application, you would verify the OTP here
      console.log('Verifying OTP:', formData.otp);
      setCurrentStep(ForgotPasswordStep.PASSWORD_RESET);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validatePasswordStep()) {
      // In a real application, you would reset the password here
      console.log('Resetting password:', formData.newPassword);
      setCurrentStep(ForgotPasswordStep.SUCCESS);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case ForgotPasswordStep.EMAIL_ENTRY:
        return (
          <form className="space-y-6" onSubmit={handleEmailSubmit}>
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
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              >
                Send OTP
              </button>
            </div>
          </form>
        );
      
      case ForgotPasswordStep.OTP_VERIFICATION:
        return (
          <form className="space-y-6" onSubmit={handleOtpSubmit}>
            <div>
              <p className="text-sm text-blue-300 mb-4">
                We've sent a 6-digit OTP to {formData.email}
              </p>
              <label htmlFor="otp" className="block text-sm font-medium text-blue-300">
                Enter OTP
              </label>
              <div className="mt-1">
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  maxLength={6}
                  value={formData.otp}
                  onChange={handleChange}
                  className={`block w-full rounded-md px-3 py-2 border bg-navy-800 text-white ${
                    errors.otp ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-blue-700 focus:border-blue-400 focus:ring-blue-400'
                  } shadow-sm focus:outline-none focus:ring-1 focus:ring-opacity-50 sm:text-sm`}
                  style={{ backgroundColor: '#1a365d' }}
                  placeholder="123456"
                />
                {errors.otp && (
                  <p className="mt-1 text-sm text-red-400">{errors.otp}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(ForgotPasswordStep.EMAIL_ENTRY)}
                className="text-sm font-medium text-blue-400 hover:text-blue-300"
              >
                Back to email
              </button>
              <button
                type="button"
                onClick={() => {
                  // In a real application, you would resend the OTP here
                  console.log('Resending OTP to:', formData.email);
                }}
                className="text-sm font-medium text-blue-400 hover:text-blue-300"
              >
                Resend OTP
              </button>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              >
                Verify OTP
              </button>
            </div>
          </form>
        );
      
      case ForgotPasswordStep.PASSWORD_RESET:
        return (
          <form className="space-y-6" onSubmit={handlePasswordSubmit}>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-blue-300">
                New Password
              </label>
              <div className="mt-1">
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className={`block w-full rounded-md px-3 py-2 border bg-navy-800 text-white ${
                    errors.newPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-blue-700 focus:border-blue-400 focus:ring-blue-400'
                  } shadow-sm focus:outline-none focus:ring-1 focus:ring-opacity-50 sm:text-sm`}
                  style={{ backgroundColor: '#1a365d' }}
                  placeholder="••••••••"
                />
                {errors.newPassword && (
                  <p className="mt-1 text-sm text-red-400">{errors.newPassword}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-300">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`block w-full rounded-md px-3 py-2 border bg-navy-800 text-white ${
                    errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-blue-700 focus:border-blue-400 focus:ring-blue-400'
                  } shadow-sm focus:outline-none focus:ring-1 focus:ring-opacity-50 sm:text-sm`}
                  style={{ backgroundColor: '#1a365d' }}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              >
                Reset Password
              </button>
            </div>
          </form>
        );
      
      case ForgotPasswordStep.SUCCESS:
        return (
          <div className="text-center space-y-6">
            <div className="mb-4 text-green-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-xl font-bold text-white">Password Reset Successful</h3>
            </div>
            <p className="text-blue-300">
              Your password has been successfully reset. You can now sign in with your new password.
            </p>
            <div>
              <Link href="/login" className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out">
                Return to Login
              </Link>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8" 
         style={{ backgroundColor: '#0a192f' }}>
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            {currentStep === ForgotPasswordStep.SUCCESS ? 'Success' : 'Reset Your Password'}
          </h2>
          {currentStep !== ForgotPasswordStep.SUCCESS && (
            <p className="mt-2 text-center text-sm text-blue-300">
              {currentStep === ForgotPasswordStep.EMAIL_ENTRY 
                ? 'Enter your email to receive a reset code' 
                : currentStep === ForgotPasswordStep.OTP_VERIFICATION 
                  ? 'Enter the verification code sent to your email' 
                  : 'Create a new password for your account'}
            </p>
          )}
        </div>
        
        <div className="bg-navy-900 p-6 sm:p-8 shadow-xl rounded-lg border border-blue-800" 
             style={{ backgroundColor: '#112240', borderColor: '#1e3a8a' }}>
          {renderStepContent()}
          
          {currentStep !== ForgotPasswordStep.SUCCESS && (
            <div className="mt-6 text-center">
              <div className="text-sm">
                <Link href="/login" className="font-medium text-blue-400 hover:text-blue-300">
                  Remember your password? Sign in
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordFlow;