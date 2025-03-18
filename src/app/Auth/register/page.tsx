'use client'
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface FormData {
  email: string;
  phone: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  email?: string;
  phone?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

const DarkBlueRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 4) {
      newErrors.username = 'Username must be at least 4 characters';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Form submitted:', formData);
      setFormData({
        email: '',
        phone: '',
        username: '',
        password: '',
        confirmPassword: '',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a192f] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-white">Create your account</h2>
          <p className="text-center text-sm text-blue-300">Join our online shopping platform</p>
        </div>

        <div className="bg-[#112240] p-6 sm:p-8 shadow-xl rounded-lg border border-blue-800">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {['email', 'phone', 'username', 'password', 'confirmPassword'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-blue-300" htmlFor={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  id={field}
                  name={field}
                  type={field.includes('password') ? 'password' : 'text'}
                  value={formData[field as keyof FormData]}
                  onChange={handleChange}
                  className={`block w-full rounded-md px-3 py-2 border bg-[#1a365d] text-white focus:outline-none focus:ring-1 sm:text-sm ${
                    errors[field as keyof FormErrors] ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-blue-700 focus:border-blue-400 focus:ring-blue-400'
                  }`}
                  placeholder={field === 'password' || field === 'confirmPassword' ? '••••••••' : ''}
                />
                {errors[field as keyof FormErrors] && <p className="mt-1 text-sm text-red-400">{errors[field as keyof FormErrors]}</p>}
              </div>
            ))}

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium">
              Create account
            </button>
          </form>

          <div className="mt-6 flex justify-between text-sm">
            <Link href="/Auth/login" className="text-blue-400 hover:text-blue-300">Already have an account? Sign in</Link>
            <Link href="/Auth/forgot-password" className="text-blue-400 hover:text-blue-300">Forgot password?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DarkBlueRegistrationForm;
