import React, { useState } from 'react'
import axios from 'axios'

export const VehicalPartRegister = () => {

    const [item_name, setItem] = useState('')
    const [quantity,setQuantity] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/item", {
          item_name,
          quantity
        }).then(response => {
          console.log(response);
          alert("Submit Successful");
          window.location.reload();
        }).catch(err => {
          console.log(err);
        });
      };
  return (
    <section className='flex flex-col justify-center items-center px-5  '>

    <h1 className='text-5xl font-serif text-black mb-10 mt-20 lg:mt-8 xl:mt-10'>Register</h1>
  
  <form className='flex flex-col gap-y-2 w-full h-72 lg:w-4/6 lg:h-96  justify-center items-center  bg-black rounded-lg'  onSubmit={handleSubmit}>
    
        
        <input onChange={(e)=>setItem(e.target.value)} className='bg-transparent text-white p-3 w-64 border-2 border-white rounded-md' type="text" placeholder='Item Name' />
        <input onChange={(e)=>setQuantity(e.target.value)} className='bg-transparent text-white p-3 w-64 border-2 border-white rounded-md' type="text" placeholder='Quantity' />
       
        <button type='submit' className='text-white border-2 border-white px-6 py-1 mt-9 rounded-lg '>Register</button>
      
    

  </form>
 </section>
  )
}
