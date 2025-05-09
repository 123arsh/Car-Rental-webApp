import React, { useState, useEffect } from 'react'

const List = () => {
      const [list, setList] = useState([]);

      useEffect(()=>{
        fetch('http://localhost:7000/car/list')
        .then((res)=>{
          console.log('Succesfully fetched the data')
          return res.json()
        })
        .then((data)=>{
          console.log(data)
          setList(data.carsData)
      })
        .catch((error)=>(
          console.log('Something broke the code here...', error)
        )) 
      }, []);

    return (
        <div>
            <div className='flex flex-col h-screen w-full gap-10'>
              {list.map((e)=>(
                <div key={e._id} className='flex h-[250vh] w-[85%] border border-black rounded-4xl'>

                  <div className='flex justify-center items-center border border-black h-[250px] w-[250p] ml-[40px]'>
                    <img src={`http://localhost:7000${e.carImage}`} alt={e.name} />
                  </div>
                  <div>
                    <h1>{e.name}</h1>
                    <h3>{e.engineType}</h3>
                    <h3>{e.colorOfCar}</h3>
                    <h3>{e.typeofCar}</h3>
                  </div>
                </div>
              ))}
            </div>
        </div>
    )
}

export default List;