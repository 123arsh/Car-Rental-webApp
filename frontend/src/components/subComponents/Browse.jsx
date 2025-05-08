import React, { useState, useEffect } from 'react';

const Browse = () => {
  const [carsData, setCarsData] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      fetch('http://localhost:7000/car/CarsData')
        .then((res) => {
          console.log('Successfully fetched data..', res);
          return res.json();
        })
        .then((data) => {
          setCarsData(data);
        })
        .catch((error) => console.log('Something went wrong', error));
    }
  }, [visible]); // <- runs only when `visible` becomes true

  return (
    <div className='flex flex-col items-center w-full border border-black p-4'>
      <button
        type='button'
        onClick={() => setVisible(true)}
        className='h-[50px] w-[250px] border border-black rounded-xl bg-black text-white cursor-pointer hover:bg-[#282828] hover:h-[51px] hover:w-[251px] hover:text-[16px]'
      >
        Browse Available Cars
      </button>

      {visible && (
        <div className='h-screen w-full grid grid-cols-1 md:grid-cols-4 gap-5 mt-8'>
          {carsData.map((e, i) => (
            <div
              key={i}
              className='h-[350px] w-[350px] border border-black rounded-2xl p-2'
            >
              <img
                className='h-[250px] w-full object-cover'
                src={e.carImage}
                alt='Car'
              />
              <h1 className='font-bold'>{e.name}</h1>
              <h3>{`${e.typeofCar} | ${e.engineType}`}</h3>
              <h3>{e.colorOfCar}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Browse;
