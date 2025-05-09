import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

const Navigation = () => {
  const [userName, setUserName] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        const res = await axios.get(`http://localhost:7000/user/${userId}`);
        const { firstName, lastName } = res.data;
        setUserName(`${firstName} ${lastName}`);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className='flex h-[55px] w-full shadow-2xl shadow-grey-500/20'>
      <div className='flex w-[200px] m-3'>
        <h1 className='font-sans text-lg flex justify-center items-center'>CarRental</h1>
        <img src='/images/car.png' className='h-[15px] w-[15px] mt-1.5 ml-2 animate-spin' alt='Animation'/>
      </div>
      <div className='flex justify-center items-center ml-[700px] gap-[70px]'>
        <h1><a href='/'>Home</a></h1>
        <h1><Link to='/browse'>Browse Cars</Link></h1>
        <h1><Link to='/about'>About</Link></h1>
        <h1><Link to='/contact'>Contact</Link></h1>
        {userName ? (
          <h1 className='text-lg'>Hi, {userName}</h1>
        ) : (
          <h1><a href='#'>Hi, User</a></h1> 
        )}
      </div>
    </div>
  );
};

export default Navigation;
