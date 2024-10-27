"use client";

import Data from '@/components/corsedata/page';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const handleVisibility = () => {
    setVisible(!visible);
  };
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = { email, password };

    console.log("userdata", userData)

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('Bearer', data.token);
        localStorage.setItem('email', data.data.email);
        router.push('/');
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen pt-28">
      <div className="bg-white p-8 border border-[#C1C1C1] rounded-[20px] shadow-md xl:w-[40%] md:w-[60%] w-11/12 flex flex-col items-center">
        <form onSubmit={handleLogin} className='md:w-[79%]'>
          <h2 className="text-[32px] font-semibold text-center mb-5">Login</h2>
          <h6 className='text-[24px] font-medium text-center'>Welcome back to ECOMMERCE</h6>
          <h6 className='text-center mb-4'>The next gen business marketplace</h6>
          <div className="mb-5">
            <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mb-5 relative">
            <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
            <input
              type={visible ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded pr-10"
            />
            <button
              type="button"
              onClick={handleVisibility}
              className="absolute top-9 right-3 underline flex items-center text-blue-500 font-medium hover:text-blue-600"
            >
              {visible ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            className="w-full mt-5 bg-black p-3 text-white rounded-[6px] font-inter text-base font-medium leading-[19.36px] tracking-[0.07em] text-center">
            Login
          </button>
          <p className="text-center py-5">
            Don't have an account? <a href="/register" className="text-[#000000] font-medium">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
