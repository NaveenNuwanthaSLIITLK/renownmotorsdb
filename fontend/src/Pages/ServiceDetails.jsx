import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ReactToPrint from 'react-to-print';


const ServiceDetails = () => {
  const [services, setServices] = useState([]);
  const pdfRef = useRef(); // Correct initialization of useRef
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
  const componentRef = useRef();

  useEffect(() => {
    axios.get(`http://localhost:5000/service`)
      .then((res) => {
        setServices(res.data.data || []);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  

  const filteredServices = services.filter(service => {
    const searchLower = search.toLowerCase();
    const createdAt = new Date(service.createdAt);
    const selectedDate = date ? new Date(date) : null;
    return (
      (!search || service.number_plate.toLowerCase().includes(searchLower) || 
      service.brand.toLowerCase().includes(searchLower) || 
      service.model.toLowerCase().includes(searchLower)) &&
      (!date || (createdAt.toDateString() === selectedDate.toDateString()))
    );
  });

  const handlePrint= ()=>{
    window.print();
  }

  return (
    <div className='px-2' ref={pdfRef}>
      <div className='bg-black h-20 flex flex-row justify-center items-center'>
        <h1 className='text-3xl text-white'>Service Details</h1>
      </div>

      <div className='mb-2 mt-2 mx-5  w-full '>
        <Link to={`/dashboard`}><button className='bg-black text-white px-6 py-1 rounded-lg'>Dashboard</button></Link>
    </div>
    <div className='mt-2 float-right px-5'>
          <ReactToPrint
            trigger={() => (
              <button className='bg-lime-500 text-black px-2 py-1 w-20 rounded-lg'>Print</button>
            )}
            content={() => componentRef.current}
          />
        </div>
      
      <div className='flex flex-row items-center mb-10'>
        <input 
          onChange={(e) => setSearch(e.target.value)} 
          type="search" 
          placeholder='Search' 
          className='w-auto px-5 h-10 rounded-lg border-2 border-black mx-5 mt-5' 
        />
        <input 
          onChange={(e) => setDate(e.target.value)} 
          className='w-auto px-1 h-10 rounded-lg border-2 border-black mt-5' 
          type="date" 
        />
      </div>
     
     {/* print content */}

     <div className='px-5 ' ref={componentRef}>
     <table className='w-full border-separate border-spacing-1'>
        <thead>
          <tr>
            <th className='border border-black rounded-md text-lg'>No</th>
            <th className='border border-black rounded-md text-lg'>Number Plate</th>
            <th className='border border-black rounded-md text-lg'>Model</th>
            <th className='border border-black rounded-md text-lg'>Brand</th>
            <th className='border border-black rounded-md text-lg'>Total</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.map((service, i) => (
            <tr key={i} className={`${(i+1)%2 === 0 ? 'bg-slate-300':''} text-center hover:bg-orange-300 lg:text-lg`}>
              <td>
                <Link to={`/serviceprofile/${service._id}`}>{i + 1}</Link>
              </td>
              <td>
                <Link to={`/serviceprofile/${service._id}`}>{service.number_plate}</Link>
              </td>
              <td>
                <Link to={`/serviceprofile/${service._id}`}>{service.model}</Link>
              </td>
              <td>
                <Link to={`/serviceprofile/${service._id}`}>{service.brand}</Link>
              </td>
              <td>
                <Link to={`/serviceprofile/${service._id}`}>Rs {service.total_price}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ServiceDetails;
