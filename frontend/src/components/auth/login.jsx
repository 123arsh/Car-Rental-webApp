import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();

    const handleSubmits = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:7000/login', {
                email,
                password
            });
            if(response.status == 200 || response.status == 201){
                navigate('/')
            }
        } catch (err) {
            const message = err.response?.data?.message || err.message || 'Something went wrong';
            setError(message);
          
        }
    }
  return (
    <div className='flex h-screen w-full'>

    {/* Left Section */}
        <div className='flex flex-col items-center gap-20 w-[50%] h-screen border border-black '>
            <h1 className='font-sans font-bold text-4xl mt-[40px]'>Login Account</h1>
            <div className='flex mt-[200px]'>
                <img src='/images/car.png' className='h-[100px] w-[100px] animate-spin' alt='Animation'/>
                <span className='flex justify-center h-10 w-[100px] border-b-5 border-black font-bold font-sans text-xl'>Car Rental</span>
                <img src='/images/car.png' className='h-[100px] w-[100px] animate-spin' alt='Animation'/>
            </div>
        </div>

    {/* Right Section */}
        <div className='flex justify-center items-center flex-col w-[50%] border border-yellow'>
        {error && (
                    <p className='text-red-500 font-bold'>{error}</p>
                )}
            <form className='border border-black h-[60vh] rounded-3xl w-[450px]' onSubmit={handleSubmits}>
                <h1 className='font-sans text-3xl m-5 font-bold'>Login</h1>
                <div className=' ml-5'>
                    <div className='flex flex-col'>
                        <label className='font-sans text-xl'>Email ?</label>
                        <input value={email} className='h-[35px] w-[330px] border border-black pl-5 rounded-lg' onChange={(e)=>{setEmail(e.target.value)}}type='email' placeholder='example@gmail.com'/>
                    </div><br/>
                    <div className='flex flex-col'>
                        <label className='font-sans text-xl'>Password</label>
                        <div className='flex h-[35px] w-[330px] border border-black pl-5 rounded-lg'>
                            <input type='password' className='outline-none w-[270px]' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter Password'/>
                            <img src='/images/hide.png' className='h-[18px] w-[18px] mt-[8px]'/>
                        </div>
                    </div><br/>
                    <div className='flex justify-center items-center w-full h-[55px]'>
                        <button type='submit' id='btn' className='h-[40px] w-[200px]  bg-blue-400 rounded-2xl text-white'> Submit </button>
                    </div>
                    </div> 
            </form>
                        <p>Create new Account | 
                            <Link to='/signup' className='text-blue-500'> Signup</Link>
                        </p>
        </div>
    </div>
  )
}

export default Login