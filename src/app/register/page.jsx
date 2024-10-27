"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import OTPInput from 'react-otp-input';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [register, setRegister] = useState(false)

  const correctOtp = '12345678';

  const handleOtpChange = (otp) => setOtp(otp);

  const handleOtp = (e) => {
    e.preventDefault();
    setError(otp === correctOtp ? 'OTP Verified Successfully!' : 'Correct otp - 12345678');
    setTimeout(() => {
      setError('');
      router.push('/login');
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { email, name, password };

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('User registered successfully!');
        setRegister(true)
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen pt-36">
      {register ? (
        <div className="bg-white p-8 border border-[#C1C1C1] rounded-[20px] shadow-md xl:w-[40%] md:w-[60%] w-11/12 pb-28 flex flex-col items-center">
          <h2 className="text-[32px] font-semibold text-center mb-5">Verify your email</h2>
          <h6 className='text-center'>Enter the 8 digit code you have received on</h6>
          <h6 className='text-center mb-4'>dev***@revispy.com</h6>
          <div className='md:w-[79%] mb-5'>
            <h2 className="text-[16px] mb-1 w-full">Enter OTP</h2>
            <OTPInput
              value={otp}
              onChange={handleOtpChange}
              numInputs={8}
              isInputNum
              shouldAutoFocus
              renderInput={(props) => (
                <input
                  {...props}
                  className="!w-12 h-12 text-center border border-gray-300 rounded-md mx-1"
                />
              )}
            />
            <button
              onClick={handleOtp}
              className="w-full mt-5 bg-black p-3 text-white rounded-[6px] font-inter text-base font-medium leading-[19.36px] tracking-[0.07em] text-center"
            >
              Verify
            </button>
            {error && <p className="mt-4">{error}</p>}
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 border border-[#C1C1C1] rounded-[20px] shadow-md xl:w-[40%] md:w-[60%] w-11/12 pb-24 flex flex-col items-center">
          <h2 className="text-[32px] font-semibold text-center mb-4">Create your account</h2>
          {message && <p className="text-red-500 text-center mb-4">{message}</p>}
          <form onSubmit={handleSubmit} className='md:w-[79%]'>
            <div className="mb-5">
              <label className="text-[16px] text-black mb-1" htmlFor="text">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="mb-5">
              <label className="text-[16px] text-black mb-1" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="mb-5">
              <label className="text-[16px] text-black mb-1" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-5 bg-black p-3 text-white rounded-[6px] font-inter text-base font-medium leading-[19.36px] tracking-[0.07em] text-center"
            >
              Create account
            </button>
            <p className="text-center text-[#333333] mt-5">
              Already have an account? <a href="/login" className="text-[#000000] font-medium">Login</a>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default Register;
