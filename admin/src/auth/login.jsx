import React, { useState } from 'react';
import { FaUserShield, FaLock, FaTools, FaCheckCircle } from 'react-icons/fa';

const adminFeatures = [
  {
    icon: <FaUserShield className="text-blue-500 text-2xl" />,
    title: "Admin Access",
    description: "Manage users, cars, and requests"
  },
  {
    icon: <FaLock className="text-green-500 text-2xl" />,
    title: "Secure Panel",
    description: "Only authorized admins allowed"
  },
  {
    icon: <FaTools className="text-purple-500 text-2xl" />,
    title: "Powerful Tools",
    description: "Approve, reject, and manage requests"
  },
  {
    icon: <FaCheckCircle className="text-orange-500 text-2xl" />,
    title: "Instant Actions",
    description: "Update car status and notify users"
  }
];

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (form.username === 'admin' && form.password === 'admin123') {
        setError('');
        if (onLogin) onLogin();
      } else {
        setError('Invalid credentials');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-white'>
      <div className='container mx-auto px-4 py-8'>
        <div className='flex flex-col md:flex-row items-center justify-center gap-8'>
          {/* Left Section - Branding */}
          <div className='w-full md:w-1/2 text-center md:text-left'>
            <div className='space-y-8'>
              <div className='space-y-4'>
                <h1 className='text-4xl md:text-5xl font-bold text-gray-800'>
                  Welcome to Admin Panel
                </h1>
                <p className='text-lg text-gray-600'>
                  Log in to manage car rental requests, users, and more.
                </p>
              </div>
              {/* Features Grid */}
              <div className='grid grid-cols-2 gap-6 mt-8'>
                {adminFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className='bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300'
                  >
                    <div className='flex items-center gap-3 mb-2'>
                      {feature.icon}
                      <h3 className='font-semibold text-gray-800'>{feature.title}</h3>
                    </div>
                    <p className='text-sm text-gray-600'>{feature.description}</p>
                  </div>
                ))}
              </div>
              {/* Trust Badges */}
              <div className='mt-8 p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100'>
                <div className='flex flex-wrap justify-center md:justify-start gap-4'>
                  <div className='flex items-center gap-2'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <span className='text-sm text-gray-600'>Admin Only</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <span className='text-sm text-gray-600'>Secure Access</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <span className='text-sm text-gray-600'>Instant Updates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Section - Login Form */}
          <div className='w-full md:w-1/2 max-w-md'>
            {error && (
              <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4'>
                {error}
              </div>
            )}
            <form className='bg-white rounded-2xl shadow-xl p-8 space-y-6' onSubmit={handleSubmit}>
              <h2 className='text-3xl font-bold text-center text-gray-800 mb-8'>Admin Login</h2>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Username</label>
                <input
                  value={form.username}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  onChange={handleChange}
                  type='text'
                  name='username'
                  placeholder='Enter admin username'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
                <div className='relative'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    value={form.password}
                    onChange={handleChange}
                    name='password'
                    placeholder='Enter Password'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2'
                  >
                    <span className='sr-only'>{showPassword ? 'Hide Password' : 'Show Password'}</span>
                    <svg
                      className='h-5 w-5 text-gray-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      {showPassword ? (
                        <>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.236.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                          />
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                          />
                        </>
                      ) : (
                        <>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                          />
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                          />
                        </>
                      )}
                    </svg>
                  </button>
                </div>
              </div>
              <button
                type='submit'
                className='w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                    Logging in...
                  </div>
                ) : (
                  'Login'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;