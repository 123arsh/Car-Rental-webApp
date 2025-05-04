import React from 'react'

const Button = () => {

  return (
    <div className='h-[150px] w-[100%] bg-white rounded-4xl flex justify-center items-center gap-5 shadow-xl ...'>
      {/*Type of Cars*/}
        <select className='h-[45px] w-[200px] border border-black rounded-2xl'>
          <option className='flex justify-center items-center h-[45px] w-[200px] border border-black rounded-2xl text-[#a0a0a0]'> Select Type of Car </option>
          <option className='flex justify-center items-center h-[45px] w-[200px] border border-black rounded-2xl text-black hover:bg-black hover:text-white' value='suv'>SUV</option>
          <option className='flex justify-center items-center h-[45px] w-[200px] border border-black rounded-2xl text-black hover:bg-black hover:text-white' value='coupe'>Coupe</option>
          <option className='flex justify-center items-center h-[45px] w-[200px] border border-black rounded-2xl text-black hover:bg-black hover:text-white' value='sedan'>Sedan</option>
        </select>

        {/*Engine type*/}
        <select className='h-[45px] w-[200px] border border-black rounded-2xl'>
          <option className='flex justify-center items-center h-[45px] w-[200px] border border-black rounded-2xl text-[#a0a0a0]'> Select engine type </option>
          <option className='flex justify-center items-center h-[45px] w-[200px] border border-black rounded-2xl text-black hover:bg-black hover:text-white' value='suv'>Deisel</option>
          <option className='flex justify-center items-center h-[45px] w-[200px] border border-black rounded-2xl text-black hover:bg-black hover:text-white' value='coupe'>Petrol</option>
          <option className='flex justify-center items-center h-[45px] w-[200px] border border-black rounded-2xl text-black hover:bg-black hover:text-white' value='sedan'>CNG</option>
          <option className='flex justify-center items-center h-[45px] w-[200px] border border-black rounded-2xl text-black hover:bg-black hover:text-white' value='sedan'>Electric</option>
        </select>

        {/*Color of the car*/}
        <select className='h-[45px] w-[200px] border border-black rounded-2xl'>
          <option className='flex justify-center items-center h-[45px] w-[200px] border border-black rounded-2xl text-[#a0a0a0]'> Select color </option>
          <option className='flex justify-center items-center h-[45px] w-[200px] border border-black rounded-2xl text-black hover:bg-black hover:text-white' value='suv'>Black</option>
          <option className='flex justify-center items-center h-[45px] w-[200px] border border-black rounded-2xl text-black hover:bg-black hover:text-white' value='coupe'>White</option>
          <option className='flex justify-center items-center h-[45px] w-[200px] border border-black rounded-2xl text-black hover:bg-black hover:text-white' value='sedan'>Grey</option>
          <option className='flex justify-center items-center h-[45px] w-[200px] border border-black rounded-2xl text-black hover:bg-black hover:text-white' value='sedan'>Blue</option>
          <option className='flex justify-center items-center h-[45px] w-[200px] border border-black rounded-2xl text-black hover:bg-black hover:text-white' value='sedan'>Red</option>
        </select>
        <button className='h-[35px] w-[150px] rounded-xl text-white bg-green-700' > Filter </button>
      </div>
  )
}

export default Button