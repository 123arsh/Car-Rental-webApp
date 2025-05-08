import React from 'react'

const Reviews = () => {
  return (
    <div className='flex flex-row justify-center items-center gap-10 h-[400px] border border-black'>
        <div className='h-[150px] w-[330px] border border-black'>
            <img className='h-[35px]' src='/images/user.png'/>
            <h1>Arsh</h1>
            <p>dorve my dream so sertified with there services</p>
        </div>
        <div className='h-[150px] w-[330px] border border-black'>
            <img className='h-[35px]' src='/images/user.png'/>
            <h1>Shivanshu</h1>
            <p>Great expierence, and great services</p>
        </div>
        <div className='h-[150px] w-[330px] border border-black'>
            <img className='h-[35px]' src='/images/user.png'/>
            <h1>Danish</h1>
            <p>Its difficult to find car that you want but they have one so satisfied</p>
        </div>
        <div className='h-[150px] w-[330px] border border-black'>
            <img className='h-[35px]' src='/images/user.png'/>
            <h1>Abhi</h1>
            <p>never thought of driving my dream car but thay made my dream true</p>
        </div>
    </div>
  )
}

export default Reviews