import { Link } from 'react-router-dom'
import { useState } from 'react'

const Enterdetail = () => {
  const [check, setCheck] = useState(false);


  return (
        <div className='flex justify-center items-center w-full h-screen bg-[#f8f8f8]'>
            <div className='w-[75vw] h-[90vh] border border-black rounded-2xl bg-white'>
                <form>
                    <div className='flex flex-col w-full gap-10'> 
                        <div className='flex flex-row h-[100px] justify-center gap-10 border-b border-[#b8b8b8] mt-10'>
                            <div className='flex flex-col'>
                            <label>Full Name</label>
                            <div className='flex flex-row justify-around'>
                                <input type='text' className='h-[40px] w-[250px] rounded-2xl border border-black pl-5' placeholder='First Name'/>

                                <input type='text' className='h-[40px] w-[250px] rounded-2xl border border-black pl-5' placeholder='Last Name'/>
                            </div>
                            </div>
                            <div className='h-[70px] border-r-1 border-[#b8b8b8]'></div>
                            <div className='flex flex-col'>
                                <label>Contact</label>
                                <div className='flex flex-row justify-around'>
                                    <input type='text' className='h-[40px] w-[250px] rounded-2xl border border-black pl-5' placeholder='+91 00000 00000'/>
                                    <input type='email' className='h-[40px] w-[250px] rounded-2xl border border-black pl-5' placeholder='example@gmail.com'/>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row justify-center gap-10 border-b border-[#b8b8b8] h-[100px]'>
                            <div className='flex flex-col'>
                            <lable>Documents</lable>
                            <div className='flex flex-row justify-around'>
                                <input type='file' className='h-[40px] w-[250px] rounded-2xl border border-black pl-5' placeholder='Adhar Card'/>
                                <input type='file' className='h-[40px] w-[250px] rounded-2xl border border-black pl-5' placeholder='Driving Licence' />
                            </div>
                        </div>
                        <div className='h-[70px] border-r-1 border-[#b8b8b8]'></div>
                        <div className='flex flex-col'>
                            <label>Pickup Date</label>
                            <div>
                                <input type='date' className='h-[40px] w-[250px] rounded-2xl border border-black pl-5' placeholder='Start Date'/>
                                <input type='date' className='h-[40px] w-[250px] rounded-2xl border border-black pl-5' placeholder='End Date'/>
                            </div>
                        </div>
                        </div>
                        <div className='flex items-center flex-col h-[200px] w-full border-b-2 border-[#b8b8b8]'>
                            <div className='w-full'><label className='ml-8'>Policy</label></div>
                            <div className='h-[70%] w-[95%] border border-black rounded-2xl'>
                                <Link to='/policy' className='h-[50px] w-[350px] rounded-2xl border border-black'>Read Before Booking Car</Link>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center items-center w-full'>                        
                        <button type='submit' className='h-[42px] w-[350px] border border-black rounded-xl m-auto'>Submit Data</button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default Enterdetail