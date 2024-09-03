import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../UserContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const VehicalProfile = () => {
  const { currentUser } = useContext(UserContext);
  const [details, setDetails] = useState([]);
  const [vehicle, setVehicle] = useState('')

  useEffect(()=>{
    axios.get(`http://localhost:5000/vehical/number_plate/${currentUser.number_plate}`)
    .then((res=>{
      setVehicle(res.data.data[0])
    }))
  })
  useEffect(() => {
    axios.get(`http://localhost:5000/service/number_plate/${currentUser.number_plate}`)
      .then((res) => {
        setDetails(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUser.number_plate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>

      <div className='flex flex-col justify-center items-center bg-black mx-2 rounded-lg'>
       
        <h1 className='text-3xl text-white'>{vehicle ?  vehicle.brand : '' }</h1>
        <h1 className='text-2xl text-white' >{vehicle ?  vehicle.model : '' }</h1>
        <h1 className='text-xl  text-white'>{currentUser.number_plate}</h1>
      </div>
      
      <div className='mt-2'>
        {details.map((detail, index) => (
          <Link to={`/serviceprofile/${detail._id}`} key={index}>
            <div className='mb-5 flex flex-col px-2 mx-2 border-b-2 border-e-2 border-l-2 border-black'>
            <div className='bg-slate-400 h-auto items-center  flex flex-row px-2'>
              <h1 className='text-xl'>Date: {formatDate(detail.createdAt)}</h1>
              <h1 className='ml-24 text-xl'>Total: Rs {detail.total_price}</h1>
            </div>
            <div>
              <fieldset className='border border-black px-2'>
                <legend className='text-center text-xl font-semibold'>Description</legend>
                <div dangerouslySetInnerHTML={{ __html: detail.services }} className='prose-h1:text-2xl prose-p:text-lg mt-2' />
              </fieldset>
              <div className='mt-2 '>
                {detail.product_prices.map((d, i) => (
                  <div key={i} className='mb-2'>
                    <div className='flex flex-row items-center'>
                      <h1 className='text-lg'>Product:</h1>
                      <h1 className='ml-2'>{d.product}</h1>
                    </div>

                    <div className='flex flex-row items-center'>
                      <h1 className='text-lg'>Price:</h1>
                      <h1 className='ml-2'>{d.price}</h1>
                    </div>

                    <div className='flex flex-row items-center'>
                      <h1 className='text-lg'>Quantity:</h1>
                      <h1 className='ml-2'>{d.quantity}</h1>
                    </div>
                    
                  </div>
                ))}
              </div>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
