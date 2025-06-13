import React, { useState, useEffect } from 'react';

const List = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  const totalPages = Math.ceil(list.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedList = list.slice(indexOfFirstItem, indexOfLastItem);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
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
        {paginatedList.map((e) => (
          <div
            key={e._id}
            className="flex flex-col md:flex-row w-full max-w-5xl min-h-[400px] bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
          >
            <div className='relative w-full md:w-[400px] h-[300px] bg-white flex items-center justify-center group'>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img
                src={`http://localhost:7000${e.image}`}
                alt={e.name}
                className="w-full h-full object-contain p-4 transition-all duration-500 group-hover:scale-105 relative z-10"
              />
              <div className="absolute top-4 right-4 z-20 flex gap-2">
                <span className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm backdrop-blur-sm ${e.availability ? 'bg-green-100/90 text-green-800' : 'bg-red-100/90 text-red-800'}`}>
                  {e.availability ? 'Available' : 'Unavailable'}
                </span>
                <span className="px-4 py-2 rounded-full text-sm font-medium shadow-sm backdrop-blur-sm bg-blue-100/90 text-blue-800">
                  Premium
                </span>
              </div>
              <div className="absolute bottom-4 left-4 z-20">
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-sm">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Featured</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between flex-1 p-8 bg-gradient-to-br from-white to-gray-50/50">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{e.name}</h1>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-gray-500">Premium Vehicle</p>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      <p className="text-gray-500">Luxury Class</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-gray-500 bg-gray-50 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">Quick View</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 bg-white p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md group">
                    <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors duration-200">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Category</span>
                      <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{e.catagory}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md group">
                    <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors duration-200">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Fuel Type</span>
                      <p className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-200">{e.fuel}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md group">
                    <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors duration-200">
                      <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Color</span>
                      <p className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-200">{e.color}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:scale-105"
                  onClick={() => DisplayTheCard(e)}
                >
                  View Details
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* PAGINATION BUTTONS */}
        <div className="flex w-full items-center justify-center gap-6 mt-10 select-none">
          <button
            className={`relative overflow-hidden px-7 py-3 rounded-full backdrop-blur-md bg-white/60 border border-blue-200 shadow-md text-lg font-semibold transition-all duration-300 flex items-center gap-2
              ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-lg hover:bg-blue-50/80 active:scale-95'}`}
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            style={{ minWidth: 120 }}
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">&#8592;</span>
            <span className="ml-1">Previous</span>
          </button>

          <span className="relative px-6 py-2 rounded-full bg-gradient-to-r from-blue-100 via-white to-blue-100 shadow-inner text-blue-700 font-bold text-lg animate-fade-in">
            <span className="transition-all duration-500 ease-in-out">Page {currentPage} of {totalPages}</span>
          </span>

          <button
            className={`relative overflow-hidden px-7 py-3 rounded-full backdrop-blur-md bg-white/60 border border-blue-200 shadow-md text-lg font-semibold transition-all duration-300 flex items-center gap-2
              ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-lg hover:bg-blue-50/80 active:scale-95'}`}
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            style={{ minWidth: 120 }}
          >
            <span className="mr-1">Next</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">&#8594;</span>
          </button>
        </div>
      </div>

      {/* DETAILS CARD */}
      {visible && (
        <div
          className="h-screen w-full fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm transition-all duration-300"
          onClick={HideTheCard}
        >
          <div
            className="bg-white p-8 rounded-3xl shadow-2xl h-[90vh] w-[90vw] relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors duration-200 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10"
              onClick={HideTheCard}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Top Navigation */}
            <div className="absolute top-6 left-8 flex items-center gap-4">
              {/* Removed Back button */}
              {/* Divider */}
              {/* <div className="h-4 w-px bg-gray-200"></div> */}
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>Save</span>
              </button>
            </div>

            <div className="flex flex-row h-[80vh] items-start gap-8 mt-12">
              {/* Left Section - Fixed */}
              <div className='w-[50%] h-full flex flex-col gap-6'>
                <div className='bg-white rounded-2xl p-6 h-[400px] flex items-center justify-center group relative overflow-hidden shadow-lg'>
                  <img
                    src={`http://localhost:7000${visible.image}`}
                    alt={visible.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='bg-white p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-md'>
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                      <span className='text-gray-500 text-sm font-medium'>Transmission</span>
                    </div>
                    <p className='font-semibold text-gray-900'>{visible.transmission.toUpperCase()}</p>
                  </div>
                  <div className='bg-white p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-md'>
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className='text-gray-500 text-sm font-medium'>Gears</span>
                    </div>
                    <p className='font-semibold text-gray-900'>{visible.gears}-Speed Manual</p>
                  </div>
                </div>
              </div>

              {/* Right Section - Scrollable */}
              <div className='flex flex-col w-[50%] h-[calc(80vh-3rem)] overflow-y-auto pr-4 custom-scrollbar'>
                <div className='flex flex-col gap-6'>
                  <div className='border-b border-gray-100 pb-6'>
                    <div className="flex items-center gap-2 mb-3">
                      <h2 className="text-3xl font-bold text-gray-900">{visible.name}</h2>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">New</span>
                    </div>
                    <div className='flex items-center gap-4'>
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${visible.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {visible.availability ? 'Available' : 'Unavailable'}
                      </span>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">4.8</span>
                      </div>
                      <span className="text-gray-500 font-medium">Premium Vehicle</span>
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='bg-white p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-md'>
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className='text-gray-500 text-sm font-medium'>Drive Train</span>
                      </div>
                      <p className='font-semibold text-gray-900'>{visible.drivetrain.toUpperCase()}</p>
                    </div>
                    <div className='bg-white p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-md'>
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className='text-gray-500 text-sm font-medium'>Category</span>
                      </div>
                      <p className='font-semibold text-gray-900'>{visible.catagory.toUpperCase()}</p>
                    </div>
                    <div className='bg-white p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-md'>
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className='text-gray-500 text-sm font-medium'>Horsepower</span>
                      </div>
                      <p className='font-semibold text-gray-900'>{visible.horsepower}</p>
                    </div>
                    <div className='bg-white p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-md'>
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        <span className='text-gray-500 text-sm font-medium'>Torque</span>
                      </div>
                      <p className='font-semibold text-gray-900'>{visible.torque} Nm</p>
                    </div>
                  </div>
                  <div className='bg-white p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-md'>
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                      </svg>
                      <span className='text-gray-500 text-sm font-medium'>Description</span>
                    </div>
                    <p className='text-gray-700 leading-relaxed text-[15px] font-normal tracking-wide'>{visible.discription}</p>
                  </div>
                  <div className='flex flex-col gap-4 pb-4'>
                    <div className='flex gap-4'>
                      <button className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all duration-300 font-medium flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Enter Details
                      </button>
                      <button className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all duration-300 font-medium flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        Elite Members
                      </button>
                    </div>
                    <button className="w-full px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2 transform hover:scale-[1.02]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Book Car
                    </button>
                  </div>
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
