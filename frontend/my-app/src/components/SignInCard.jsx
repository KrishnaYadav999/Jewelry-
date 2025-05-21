import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignInCard = ({ onClose, onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [step, setStep] = useState('email-password');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  // Handle login and send OTP
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const response = await axios.post('https://jewelry-backend-gq4y.onrender.com/api/auth/login', { email, password });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token); // Save token to local storage
        alert('OTP has been sent to your email.');
        setStep('otp');
        setError('');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMsg);
    }
  };

  // Handle OTP input change
  const handleOtpChange = (value, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1); // Only keep the last entered digit
    setOtp(updatedOtp);
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (!email || !enteredOtp) {
      setError('Email and OTP are required.');
      return;
    }
    if (enteredOtp.length !== 4) {
      setError('Please enter a valid 4-digit OTP.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/otp/verify-otp',
        { email, otp: enteredOtp }
      );

      if (response.status === 200) {
        alert(response.data.message || 'OTP verified successfully!');
        setError('');

        const userData = response.data.user;
        setStep('account');
        
        // Pass the user data and token to the account page via navigate
        navigate('/', { state: { user: userData, token: localStorage.getItem('token') } });
      } else {
        setError(response.data?.message || 'Failed to verify OTP.');
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || 'Failed to verify OTP. Please try again.';
      setError(errorMsg);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full md:w-[600px] flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/2">
          <img
            src="https://zerakijewels.com/cdn/shop/files/New_arrivals_BANNER_ANKLETS.jpg?v=1723196559&width=1400"
            alt="Sign In"
            className="h-48 w-full object-cover md:h-full"
          />
        </div>
        <div className="w-full p-6">
          <h2 className="text-xl font-semibold mb-4">Login</h2>

          {error && (
            <div className="text-red-500 mb-4">
              <p>{error}</p>
            </div>
          )}

          {step === 'email-password' ? (
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              >
                Send OTP
              </button>
            </form>
          ) : step === 'otp' ? (
            <form onSubmit={handleVerifyOtp}>
              <div className="mb-4 text-center">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  Enter OTP
                </label>
                <div className="flex justify-center space-x-2 mt-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      className="w-10 h-10 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxLength={1}
                      inputMode="numeric"
                      required
                    />
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              >
                Verify OTP
              </button>
            </form>
          ) : null}

         <div className="mt-4 text-center">
  <p className="text-gray-500">
    Don't have an account?{' '}
    <Link to="/register" className="text-blue-500 hover:underline">
      Register
    </Link>
  </p>
</div>
          <button onClick={onClose} className="mt-4 text-gray-500 hover:text-gray-900">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInCard;
