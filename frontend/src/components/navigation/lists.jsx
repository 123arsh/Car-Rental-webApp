import React, { useState, useEffect } from 'react';

const List = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(null);

  useEffect(() => {
    fetch('http://localhost:7000/car/list')
      .then((res) => res.json())
      .then((data) => {
        setList(data.carsData);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : 'auto';
  }, [visible]);

  const DisplayTheCard = (e) => {
    setVisible(e);
  };

  const HideTheCard = () => {
    setVisible(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full text-3xl text-red-700">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen w-full px-4 py-10 gap-10 bg-[#f6f6f6] relative">
      
      {/* CAR LIST */}
      <div className={`flex flex-col items-center gap-10 w-full ${visible ? 'blur-sm pointer-events-none select-none' : ''}`}>
        {list.map((e) => (
          <div
            key={e._id}
            className="flex flex-col md:flex-row w-full max-w-5xl min-h-[400px] shadow-lg rounded-3xl p-4 gap-4 bg-white"
          >
            {/* Image */}
            <div className='rounded-3xl flex justify-center items-center p-2 w-full md:w-[350px] h-[300px]'>
              <img
                src={`http://localhost:7000${e.image}`}
                alt={e.name}
                className="object-contain h-full"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center gap-4 flex-1 px-4">
              <div className="px-4 py-2 w-full text-center border-b-1 border-[#d1d1d1]">
                <h1 className="font-semibold font-serif text-2xl">{e.name}</h1>
              </div>

              <div className="rounded-xl px-4 py-3 text-lg font-serif">
                <p>Category: {e.catagory}</p>
                <p>Fuel type: {e.fuel}</p>
                <p>Color: {e.color}</p>
                <h1 className={e.availability ? 'text-green-500 text-xl bg-green-50 flex justify-center w-[200px] rounded-lg' : 'text-red-500 text-xl bg-red-50 flex justify-center w-[200px] rounded-lg'}>
                  {e.availability ? 'Available' : 'Unavailable'}
                </h1>
              </div>

              <div className="flex justify-start">
                <button
                  className="relative overflow-hidden border-2 border-black rounded-xl px-6 py-2 group text-xl font-serif cursor-pointer"
                  onClick={() => DisplayTheCard(e)}
                >
                  <span className="absolute inset-0 bg-black transition-transform duration-500 translate-y-full group-hover:translate-y-0 z-0"></span>
                  <span className="relative z-10 text-black group-hover:text-white transition-colors duration-300">
                    View This Car
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {visible && (
        <div
          className="h-screen w-full fixed inset-0 z-50 flex justify-center items-center bg-opacity-50 backdrop-blur-sm"
          onClick={HideTheCard}
        >
          <div
            className="bg-white p-6 rounded-2xl shadow-2xl h-[90vh] w-[90vw] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-4xl"
              onClick={HideTheCard}
            >
              &times;
            </button>
            <div className="flex flex-row h-[80vh] items-center gap-5">
            <div className='border-r-1 border-[#d1d1d1]'>
                <img
                src={`http://localhost:7000${visible.image}`}
                alt={visible.name}
                className="w-[600px]  object-contain rounded-lg"
              />
            </div>
                <div className='flex flex-col w-[50%] h-[90%] gap-5'>
                <div className='flex justify-center border-b-1 border-[#d1d1d1] h-[40px]'><h2 className="text-2xl font-semibold">{visible.name}</h2></div>
                <div className='w-[100%] pl-10'>
                  <h1>Fuel type : {visible.fuel}</h1>
                  <h1>Transmission : {visible.transmission}</h1>
                  <h1>Gears : {visible.gears}-Speed</h1>
                  <h1>Drive Train : {visible.drivetrain}</h1>
                  <h1>Category : {visible.catagory}</h1>
                  <h1>Horsepower : {visible.horsepower}</h1>
                  <h1>Torque : {visible.torque}</h1>
                  <h1>Available : {visible.availability ? 'True' : 'False'}</h1>
                  <h1>Description : {visible.discription}</h1>
                  <h1>Here We display time (Comeing Soon)</h1>
                </div>
                  <div className='flex flex-col gap-5 mt-5'>
                    <div className='flex flex-row justify-around'>
                      <button className='h-[35px] w-[150px] border border-black cursor-pointer'>Enter Details</button>
                      <button className='h-[35px] w-[150px] border border-black cursor-pointer'>Elite Member</button>
                    </div>
                    <button className='w-[100%] h-[35px] border border-black cursor-pointer mt-10'>Book Car</button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
