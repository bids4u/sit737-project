import React from 'react';
import { useForm } from 'react-hook-form';
import { useLogin } from './useLogin'; // Import the custom hook
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { saveAuthResponse } from '../../../utils/authUtils';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

function Login() {
  const navigate = useNavigate(); // Initialize useNavigate
  const {login:setLogin} = useAuth()

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email/Username is required'),
    password: Yup.string().required('Password is required').min(4, 'Password must be at least 4 characters'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { mutate: login, isLoading } = useLogin();

  const onSubmit = (data) => {
    const payload ={identifier:data.email,password:data.password}
    login(payload, {
      onSuccess: (response) => {
        console.log('Login successful:', response);
        saveAuthResponse(response.data);
        setLogin()
        navigate('/private')
        // Handle successful login, e.g., store token, redirect, etc.
      },
      onError: (error) => {
        console.error('Login failed:', error);
        // Handle error (toast notification is already handled by QueryClient)
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]  py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Username or Email
            </label>
            <input
              type="text"
              id="email"
              {...register('email')}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring ${
                errors.email ? 'border-red-500' : ''
              }`}
              placeholder="Enter your username or email"
            />
            {errors.email && <p className="text-red-500 text-xs italic mt-2">{errors.email.message}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password')}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring ${
                errors.password ? 'border-red-500' : ''
              }`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-xs italic mt-2">{errors.password.message}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
            <a href="#" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
