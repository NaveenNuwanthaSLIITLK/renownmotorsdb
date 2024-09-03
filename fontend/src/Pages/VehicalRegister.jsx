import React, { useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

export const VehicalRegister = () => {

    const [number_plate,setNumber_plate] = useState('')
    const [model, setModel] = useState('')
    const [brand, setBrand] = useState('')
    const [contact_number,setNumber]  = useState('')
    const navigate = useNavigate()
   

    const handleSubmit = (e) => {
        e.preventDefault();
       

        axios.post("http://localhost:5000/vehical", {
            number_plate,
            model,
            brand,
            contact_number

        }).then(response => {
            console.log(response);
            alert("Number plate registered successfully");
            navigate('/')
        }).catch(err => {
            console.log(err);
        });
    };
  return (
    <section className='flex flex-col justify-center items-center px-5  '>

    <h1 className='text-5xl font-serif text-black mb-10 mt-20 lg:mt-8 xl:mt-10'>Vehicle Register</h1>

    <div className='mb-5  w-full float-right'>
        <Link to={`/dashboard`}><button className='bg-black text-white px-6 py-1 rounded-lg'>Dashboard</button></Link>
    </div>
   
  <form className='flex flex-col gap-y-2 w-full h-96 lg:w-4/6 lg:h-96  justify-center items-center  bg-black rounded-lg'  onSubmit={handleSubmit}>
    
        
        <input onChange={(e)=>setNumber_plate(e.target.value)} className='bg-transparent text-white p-3 w-64 border-2 border-white rounded-md' type="text" placeholder='Number Plate' />
        <input onChange={(e)=>setModel(e.target.value)} className='bg-transparent text-white p-3 w-64 border-2 border-white rounded-md' type="text" placeholder='Model' />
        <input onChange={(e)=>setBrand(e.target.value)} className='bg-transparent text-white p-3 w-64 border-2 border-white rounded-md' type="text" placeholder='Brand' />
        <input onChange={(e)=>setNumber(e.target.value)} className='bg-transparent text-white p-3 w-64 border-2 border-white rounded-md' type="text" placeholder='Contact Number' />
        <button type='submit' className='text-white border-2 border-white px-6 py-1 mt-9 rounded-l g '>Register</button>

      
        <Link to={`/`}><h1 className='text-white flex flex-row mt-2'>If you have an Account <p className='ml-3'>SIGN IN</p></h1></Link>
    

  </form>

 
 </section>
  )
}
