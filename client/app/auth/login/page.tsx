'use client'
// Import necessary dependencies and components
import useAuthStore from '@/zustand/useAuthStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';

// Define the functional component 'Page'
const Page: FC = () => {
  const router = useRouter()
  const {isLoggedin} = useAuthStore()
  // State to hold login form data
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    let isLoggedin:any = localStorage.getItem('Auth');
    isLoggedin = JSON.parse(isLoggedin);
    isLoggedin = isLoggedin?.state?.isLoggedin;
    if(isLoggedin){
      router.push('/')
    }else{
      router.push('/auth/login')
    }
  }, [])
  

  // Use the useAuthStore hook to get the state and actions
  const { login } = useAuthStore();

  // Handler for input change in the login form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Handler for form submission
  const handleSubmit = async () => {
    // Wait for the login function to complete
    try {
      await Promise.all([login(loginData)]);
      // Redirect to homepage upon successful login
      if(isLoggedin){
        router.push('/');
      }
      else{
        router.push('/auth/login')
      }
    } catch (error: any) {
      // Handle error here if needed
      console.error(error.message);
      // You can show an error message to the user or handle the error in other ways
    }
  };

  // JSX for the login page
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Sign in
        </h1>
        <div className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              id='email' name='email'
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              id='password' name='password'
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={handleInputChange}
            />
          </div>
          <Link
            href="/auth/forget-password"
            className="text-xs text-purple-600 hover:underline"
          >
            Forget Password?
          </Link>
          <div className="mt-6" onClick={handleSubmit}>
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Login
            </button>
          </div>
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-purple-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

// Export the 'Page' component as the default export
export default Page;
