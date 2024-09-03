import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export const Dashboard = () => {
    const [services, setServices] = useState([]);
    const [vehicle , setVehicle] = useState([]);
    const [item, setItems] = useState([]);
    

    useEffect(() => {//set services
        axios.get('http://localhost:5000/service')
            .then((res) => {
                const servicesData = res.data.data;
                setServices(servicesData);
               
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    useEffect(()=>{ //set vehices
        axios.get('http://localhost:5000/vehical')
        .then((res) => {
            setVehicle(res.data.data)
        })
    },[vehicle])

    useEffect(()=>{ //set items
        axios.get('http://localhost:5000/item')
        .then((res) => {
            setItems(res.data.data)
})
    },[])


    const total = services.reduce((acc, service) => acc + service.total_price, 0);
    const countOfVehicle  = vehicle.length;
    const countOfItem = item.length;
    const countOfService = services.length;
    
    return (
        <div >

            <div className='bg-black'>
                <h1 className='text-white text-4xl flex flex-row justify-center items-center h-28' style={{fontFamily:"Roboto slab"}}>RENAUL MOTORS</h1>
            </div>
            
           <div>
            <div className='grid grid-cols-2 gap-x-3  gap-y-2 mt-5 mx-2 lg:flex lg:justify-center lg:items-center'>
                <div className='border-4 border-black rounded-lg w-52 flex  flex-col justify-center items-center py-2 hover:scale-110'>
                    <h1 className='text-xl lg:text-xl' style={{fontFamily:"Roboto slab"}}>Total Income</h1>
                    <h2 className='text-3xl lg:text-4xl' style={{fontFamily:"Roboto slab"}}>Rs. {total}</h2>
                </div>

                <Link to={`/vehicaldetails`}>
                    <div className='border-4 border-black rounded-lg w-52 flex  flex-col justify-center items-center py-2 hover:scale-110'>
                        <h1 className='text-xl lg:text-xl' style={{fontFamily:"Roboto slab"}}>Vehicles</h1>
                        <h2 className='text-3xl lg:text-4xl' style={{fontFamily:"Roboto slab"}}>{countOfVehicle}</h2>
                    </div>
                </Link>

                <Link to="/vehiclepartdetails">
                    <div className='border-4 border-black rounded-lg w-52 flex  flex-col justify-center items-center py-2 hover:scale-110 '>
                        <h1 className='text-xl lg:text-xl' style={{fontFamily:"Roboto slab"}}>Items</h1>
                        <h2 className='text-3xl lg:text-4xl' style={{fontFamily:"Roboto slab"}}>{countOfItem}</h2>
                    </div>
                </Link>

                <Link to={`/servicedetails`}>
                    <div className='border-4 border-black rounded-lg w-52 flex  flex-col justify-center items-center py-2 hover:scale-110'>
                        <h1 className='text-xl lg:text-xl' style={{fontFamily:"Roboto slab"}}>Services</h1>
                        <h2 className='text-3xl lg:text-4xl' style={{fontFamily:"Roboto slab"}}>{countOfService}</h2>
                    </div>
                </Link>

                
           </div>
           </div>

           <div className='grid grid-cols-2 gap-3  mx-2 mt-5 lg:flex lg:justify-center lg:items-center '>
                 <Link to={`/createservice`}>
                    <div className='border-4 border-black rounded-lg w-52 flex  flex-col justify-center items-center py-2 hover:scale-110'>
                            <h1 className='lg:text-2xl' style={{fontFamily:"Roboto slab"}}>Create Service</h1>
                            
                    </div>
                 </Link>

                 <Link to={`/vehical`}>
                    <div className='border-4 border-black rounded-lg w-52 flex  flex-col justify-center items-center py-2 hover:scale-110'>
                            <h1 className='lg:text-2xl' style={{fontFamily:"Roboto slab"}}>Vehicle Register</h1>
                            
                    </div>
                 </Link>

                 <Link to={`/itemregister`}>
                    <div className='border-4 border-black rounded-lg w-52 flex  flex-col justify-center items-center py-2 hover:scale-110'>
                            <h1 className='lg:text-2xl' style={{fontFamily:"Roboto slab"}}>Add Vehicle Part</h1>
                            
                    </div>
                 </Link>
           </div>
        </div>
    );
};
