import React, { useEffect, useState } from 'react';
const carsList = [
  {
    index: 1,
    name: "BMW M4 Compitition",
    typeofCar: "Sedan",
    engineType: "diesel",
    colorOfCar: "blue",
    carImage: "/images/m4compitition.png"
  },
  {
    index: 2,
    name: "Mercedes GLA",
    typeofCar: "coupe",
    engineType: "petrol",
    colorOfCar: "white",
    carImage: "/images/gla.png"
  },
  {
    index: 3,
    name: "BMW 2 Series LBW",
    typeofCar: "coupe",
    engineType: "diesel",
    colorOfCar: "black",
    carImage: "/images/2serieslbw.png"
  },
  {
    index: 4,
    name: "BMW X7",
    typeofCar: "coupe",
    engineType: "petrol",
    colorOfCar: "white",
    carImage: "/images/x7.png"
  },
];
  const FeturedCars = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
  
    useEffect(() => {
      setData(carsList);
      setLoading(false);
    }, []);
  
  return (
    <div className='flex flex-col h-[500px] w-full gap-5'>
      <h1 className='text-4xl font-serif mt-5 ml-8'>Fetured Cars</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 w-[90%] mx-auto m-10">
      {loading ? (
        <p>Loading ...</p>
      ) : (
        data.map((e, i) => (
          <div key={i} className="aspect-square shadow-md flex flex-col rounded-lg">
            <img
              src={e.carImage}
              alt="cars"
              className="object-contain w-full h-2/3"
            />
            <div className="p-4">
              <h1 className="text-2xl font-serif mb-2">{e.name}</h1>
              <h2 className="font-serif text-[#666666]">{e.engineType}</h2>
            </div>
          </div>
        ))
      )}
      </div>
    </div>  
  );
}
export default FeturedCars;
