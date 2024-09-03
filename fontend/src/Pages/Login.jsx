import React, { useContext, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import UserContext from '../UserContext'


export const Login = () => {

  const navigate = useNavigate()
  const [number_plate, setNumber_plate] = useState('')
  const {setCurrentUser} = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    
        try {
            const response = await axios.post("http://localhost:5000/vehical/login", {
                number_plate
            }, { withCredentials: true });

            const user = await response.data
            setCurrentUser(user)
            
            if (response.data.status) {
                navigate(`/vehicalprofile`);
            } else {
                alert("Invalid credentials");
            }


        } catch (error) {
            alert("Error logging in");
        }
    
};
  return (
   <section className='flex flex-col justify-center items-center px-5  '>

      <h1 className='text-5xl font-serif text-black mb-10 mt-20 lg:mt-8 xl:mt-10'>Login</h1>
    <form className='flex flex-col w-full h-52 lg:w-4/6 lg:h-96  justify-center items-center  bg-black rounded-lg'  onSubmit={handleSubmit}>
      
          
          <input onChange={(e)=>setNumber_plate(e.target.value)} className='bg-transparent text-white p-3 w-64 border-2 border-white rounded-md' type="text" placeholder='Number Plate' />
          <button type='submit' className='text-white border-2 border-white px-6 py-1 mt-9 rounded-lg '>login</button>
        
      
      
    </form>
   </section>
  )
}
