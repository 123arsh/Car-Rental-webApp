import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import axios from 'axios';

const Navigation = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:7000/check-auth', {
          withCredentials: true
        });
        setIsAuthenticated(response.data.isAuthenticated);
        if (response.data.user) {
          setUserName(response.data.user.firstName);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUserName('');
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:7000/logout', {}, {
        withCredentials: true
      });
      setIsAuthenticated(false);
      setUserName('');
      navigate('/signup');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleSearch = () => setShowSearch((prev) => !prev);

  const handleNavigation = (path) => {
    if (!isAuthenticated) {
      navigate('/signup');
      return;
    }
    navigate(path);
  };

  return (
    <div className='w-full shadow-2xl shadow-grey-500/20 bg-white'>
      {/* Mobile Header */}
      <div className='flex items-center justify-between p-4 md:hidden'>
        <Link to='/' className='flex items-center'>
          <h1 className='font-sans text-lg'>CarRental</h1>
          <img src='/images/car.png' className='h-[20px] w-[20px] ml-2' alt='Logo' />
        </Link>
        <button onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Header */}
      <div className='hidden md:flex justify-between items-center px-6 py-4'>
        {/* LEFT: Logo */}
        <Link to='/' className='flex items-center'>
          <h1 className='font-sans text-lg'>CarRental</h1>
          <img src='/images/car.png' className='h-[20px] w-[20px] ml-2' alt='Logo' />
        </Link>

        {/* RIGHT: Search Icon, Browse, About, Dropdown */}
        <div className='flex items-center gap-4'>
          {/* Search Icon */}
          {isAuthenticated && !showSearch && (
            <button onClick={toggleSearch} className='focus:outline-none'>
              <Search className='h-6 w-6 text-gray-700 hover:text-blue-600 transition-colors duration-200' />
            </button>
          )}

          {/* Expanding Search Input */}
          {isAuthenticated && (
            <div className={`transition-all duration-500 overflow-hidden ${showSearch ? 'w-[300px] opacity-100' : 'w-0 opacity-0'} h-[40px] border border-black rounded-full flex items-center px-3 bg-white`}>
              {showSearch && (
                <>
                  <input
                    type='text'
                    placeholder='Search by Name'
                    className='w-full focus:outline-none bg-transparent'
                    autoFocus
                  />
                  <img src='/images/search.png' alt='search icon' className='h-5 w-5 cursor-pointer ml-2' />
                </>
              )}
            </div>
          )}
          {showSearch && (
            <button onClick={toggleSearch} className="text-gray-500 hover:text-red-500">x</button>
          )}

          {/* Browse + About */}
          <button 
            onClick={() => handleNavigation('/browse')} 
            className='hover:underline'
          >
            Browse Cars
          </button>
          <button 
            onClick={() => handleNavigation('/about')} 
            className='hover:underline'
          >
            About
          </button>

          {/* Auth Buttons / User Dropdown */}
          {isAuthenticated ? (
            <div className='relative'>
              <button
                onClick={toggleDropdown}
                className='flex items-center gap-1 px-3 py-1 rounded'
              >
                Hi, {userName}
                <img
                  src='/images/da.png'
                  className={`w-4 h-4 transform transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                  alt='arrow'
                />
              </button>
              {dropdownOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-50'>
                  <Link to='/pending-requests' className='block px-4 py-2 hover:bg-gray-100'>Pending Requests</Link>
                  <Link to='/help&support' className='block px-4 py-2 hover:bg-gray-100'>Help & Support</Link>
                  <Link to='/contacts' className='block px-4 py-2 hover:bg-gray-100'>Contacts</Link>
                  <button 
                    onClick={handleLogout}
                    className='w-full text-left px-4 py-2 hover:bg-gray-100'
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className='flex gap-4'>
              <Link 
                to='/login'
                className='px-4 py-2 text-blue-600 hover:text-blue-800'
              >
                Login
              </Link>
              <Link 
                to='/signup'
                className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Content */}
      {mobileMenuOpen && (
        <div className='flex flex-col gap-4 px-4 pb-4 md:hidden'>
          {/* Search Input */}
          {isAuthenticated && (
            <div className='flex h-[45px] w-full border border-black rounded-xl items-center px-3'>
              <input
                type='text'
                placeholder='Search by Name'
                className='w-full focus:outline-none'
              />
              <img src='/images/search.png' alt='search icon' className='h-5 w-5 cursor-pointer ml-2' />
            </div>
          )}

          <button 
            onClick={() => handleNavigation('/browse')} 
            className='hover:underline text-left'
          >
            Browse Cars
          </button>
          <button 
            onClick={() => handleNavigation('/about')} 
            className='hover:underline text-left'
          >
            About
          </button>

          {/* Auth Buttons / Dropdown */}
          {isAuthenticated ? (
            <div className='relative'>
              <button
                onClick={toggleDropdown}
                className='flex items-center gap-1 border border-black px-3 py-1 rounded w-full justify-between'
              >
                Hi, {userName}
                <img
                  src='/images/da.png'
                  className={`w-4 h-4 transform transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                  alt='arrow'
                />
              </button>
              {dropdownOpen && (
                <div className='mt-2 w-full bg-white border border-gray-300 rounded shadow-lg'>
                  <Link to='/pending-requests' className='block px-4 py-2 hover:bg-gray-100'>Pending Requests</Link>
                  <Link to='/help&support' className='block px-4 py-2 hover:bg-gray-100'>Help & Support</Link>
                  <Link to='/contacts' className='block px-4 py-2 hover:bg-gray-100'>Contacts</Link>
                  <button 
                    onClick={handleLogout}
                    className='w-full text-left px-4 py-2 hover:bg-gray-100'
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className='flex flex-col gap-2'>
              <Link 
                to='/login'
                className='px-4 py-2 text-blue-600 hover:text-blue-800 text-center'
              >
                Login
              </Link>
              <Link 
                to='/signup'
                className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center'
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navigation;
