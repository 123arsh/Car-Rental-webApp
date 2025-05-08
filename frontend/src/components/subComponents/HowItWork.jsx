import React from 'react';

const HowItWork = () => {
  return (
    <div className="w-full py-10 px-4 sm:px-10 bg-white">
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-serif">How it Works</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-15">

        {/* Step 1 */}
        <div className="flex flex-col items-center text-center rounded-lg p-6 w-full max-w-xs"  style={{ boxShadow: '0 4px 8px rgba(34, 197, 94, 0.4)' }}>
          <div className="flex justify-center items-center rounded-full h-14 w-14 bg-green-50 mb-4">
            <img src="/images/quiz.png" alt="Choose your car" className="h-8 w-8" />
          </div>
          <h2 className="text-lg font-serif mb-1">Choose Your Car</h2>
          <p className="text-sm text-gray-600">Find the best one which suits you.</p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center rounded-lg p-6 w-full max-w-xs" style={{ boxShadow: '0 4px 8px rgba(34, 197, 94, 0.4)' }}>
          <div className="flex justify-center items-center rounded-full h-14 w-14 bg-green-50 mb-4">
            <img src="/images/appointment.png" alt="Book Your Car" className="h-8 w-8" />
          </div>
          <h2 className="text-lg font-serif mb-1">Book Your Car</h2>
          <p className="text-sm text-gray-600">Book a car that fits you well.</p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center rounded-lg p-6 w-full max-w-xs"  style={{ boxShadow: '0 4px 8px rgba(34, 197, 94, 0.4)' }}>
          <div className="flex justify-center items-center rounded-full h-14 w-14 bg-green-50 mb-4">
            <img src="/images/hands.png" alt="Drive Away" className="h-8 w-8" />
          </div>
          <h2 className="text-lg font-serif mb-1">Finally Drive Your Car</h2>
          <p className="text-sm text-gray-600">Pick your favorite and drive away.</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWork;
