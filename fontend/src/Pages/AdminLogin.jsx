import React from 'react'

export const AdminLogin = () => {
  return (
    <section className='flex flex-col justify-center items-center px-5  '>

      <h1 className='text-5xl font-serif text-black mb-10 mt-20'>Login</h1>
    <div className='flex flex-col w-full h-52 justify-center items-center lg:w-4/6 lg:h-96  bg-black rounded-lg'>
      
          
          <input className='bg-transparent text-white p-3 w-64 border-2 border-white rounded-md' type="text" placeholder='User Name' />
          <input className='bg-transparent text-white p-3 w-64 mt-3 border-2 border-white rounded-md' type="password" placeholder='Password' />
          <button type='submit' className='text-white border-2 border-white px-6 py-1 mt-9 rounded-lg '>login</button>
        
      

    </div>
   </section>
  )
}
