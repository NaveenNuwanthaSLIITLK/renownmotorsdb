import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import ReactToPrint from 'react-to-print';  

export const ServiceProfile = () => {
  const { id } = useParams();
  const [service, setService] = useState({});
  const navigate = useNavigate('')
  const componentRef = useRef()

  const handlePrint = () => {
    window.print();
  }

  useEffect(() => {
    axios.get(`http://localhost:5000/service/${id}`)
      .then((res) => {
        setService(res.data.data);
        console.log(res.data.data);
        
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDeleteService = () => {
    axios
      .delete(`http://localhost:5000/service/${id}`)
      .then(() => {
        alert("Delete successful");
        navigate(`/servicedetails`)
       
      })
      .catch((error) => {
        alert("There was an error deleting the service");
        console.log(error);
        
      });
}
  return (
    <div>
      <div className='bg-black text-2xl text-white flex flex-row justify-center items-center gap-x-10 h-12 mx-2 mt-5'>
        <h1>{service.number_plate}</h1>
        <h1>{service.model}</h1>
        <h1>{service.brand}</h1>
      </div>

      <div className='mt-2 float-right px-5' >
       <ReactToPrint trigger={()=>(
         <button className='bg-lime-500 text-white px-2 py-1 w-20 rounded-lg'>Print</button>
       )}
       content={()=>componentRef.current}
      />
      </div>
       {/* Print Content */}
     <div  ref={componentRef}>
     <div className='flex flex-col gap-y-2 mt-5 mx-2 justify-start '>
        <h1 className='text-2xl font-semibold' style={{fontFamily:'roboto slab'}}>Renown Motors</h1>

        <div className='text-lg'>
          <p>195, 3/A ,Mayura Mawatha,</p>
          <p>Thalahena, Malabe</p>
        </div>

        <h1 className='text-lg'>+94 777315476</h1>
        <h1 className='text-lg'>www.renownmotors.lk</h1>
      </div>

      <div className='flex flex-row gap-x-5 mt-5 mx-2 items-center'>
        <h1 className='text-xl font-semibold'>Created Date:</h1>
        <h1 className='text-xl'>{service.createdAt && formatDate(service.createdAt)}</h1>
      </div>

      <div className='flex flex-row gap-x-5 mt-3 mb-5 mx-2 items-center'>
      <h1 className='text-xl font-semibold'>Invoice ID:</h1>
      <h1 className='text-lg'>{service._id}</h1>
      </div>

      <fieldset className='border border-black mx-2'>
        <legend className='text-xl text-center font-bold'>Description</legend>
        <div
          dangerouslySetInnerHTML={{ __html: service.services }}
          className='prose-h1:text-2xl prose-p:text-lg mt-2 px-2 prose-h1:font-serif prose-ul:text-xl '
        />
      </fieldset>

      <div className='px-3 mt-14'>
      <table className='w-full border-separate border-spacing-1'>
        <thead>
          <tr className='text-center bg-slate-400 text-xl '>
            <th>No</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Price</th>
          </tr>
        </thead>

        <tbody className=''>
          {service.product_prices && service.product_prices.map((d, i) => (
            <tr key={i} className='text-center border-b  border-black'>
              <td>{i+1}</td>
              <td>{d.product}</td>
              <td>{d.quantity}</td>
              <td>{d.price}</td>
              <td>{d.quantity * d.price}</td>
            </tr>
))}
        </tbody>
      </table>
      </div>

      <div className='flex flex-col justify-center items-center gap-y-5 mt-5 '>
       
       <u>
        
       <div className='flex flex-row justify-center  items-center'>
          <h1 className='text-2xl font-semibold'>TOTAL : Rs </h1>
          <h1 className='text-2xl ml-4'>{service.total_price}</h1>
        </div>
       </u>
        

        <div className='flex flex-row justify-center items-center'>
          <h1 className='text-2xl font-semibold'>Discount : Rs </h1>
          <h1 className='text-xl ml-4'>{service.discount}</h1>
        </div>
      </div>
     </div>

      <div className='flex flex-row gap-x-5  justify-center m-10'>
        <button onClick={handleDeleteService} className='rounded-md bg-red-700 px-3 py-1 text-xl hover:scale-110'>Delete</button>
        <Link to={`/updateservice/${id}`} ><button  className='rounded-md bg-sky-700 px-3 py-1 text-xl hover:scale-110'>Edite</button></Link>
        
      </div>
    </div>
    
  );
};

export default ServiceProfile;
