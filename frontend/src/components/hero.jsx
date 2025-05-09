import React from 'react';
import Button from './subComponents/button';
import FeturedCars from './subComponents/feturedCars';
import HowItWork from './subComponents/HowItWork';
import Reviews from './subComponents/Reviews';
import Browse from './subComponents/Browse';
const Hero = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative w-full flex flex-col items-center justify-center h-[40vh] px-4 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <h2 className="text-4xl sm:text-7xl font-bold font-serif">
            Drive Your Dream Today
          </h2>
          <img
            src="/images/car.png"
            alt="Spinning Car"
            className="h-[80px] sm:h-[100px] custom-spin"
          />
        </div>

        {/* Floating Button */}
        <div className="absolute -bottom-14 sm:-bottom-28 left-1/2 transform -translate-x-1/2">
          <Button />
        </div>
      </div>

      {/* Featured Cars */}
      <div className="mt-[100px] sm:mt-[150px]">
        <FeturedCars />
      </div>

      {/* How It Works */}
      <div>
        <HowItWork />
      </div>

      {/* Reviews */}
      {/* <div>
        <Reviews/>
      </div> */}

      {/* Browse cars */}
      {/* <div>
        <Browse/>
      </div> */}
    </div>
  );
};

export default Hero;
