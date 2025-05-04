import React from 'react'
import Button from './button'

const Hero = () => {
  return (
    <div>
      <div className='relative'>
        <div className='flex h-[40vh] w-full justify-center items-center border-b-1 border-b-black '>
          <h2 className='text-7xl font-bold font-serif'>Drive Your Dream Today</h2>
          <img src='/images/car.png' className='h-[100px] custom-spin' />
        </div>

        {/* Button over the main div */}
        <div className='absolute -bottom-28 left-1/2 transform -translate-x-1/2 '>
          <Button />
        </div>
      </div>
    </div>
  )
}

export default Hero
