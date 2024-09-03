import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DeleteComfirm } from './DeleteComfirm';
import { IoAddCircleOutline } from "react-icons/io5";
import ReactToPrint from 'react-to-print';

export const VehicalDetails = () => {
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const [search, setSearch] = useState('');
  const componentRef = React.createRef();

  useEffect(() => {
    axios
      .get('http://localhost:5000/vehical')
      .then((res) => {
        setVehicles(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDeleteClick = (id) => {
    setVehicleToDelete(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setVehicleToDelete(null);
  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.number_plate.toLowerCase().includes(search.toLowerCase()) ||
    vehicle.brand.toLowerCase().includes(search.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section>
      <div className='bg-black h-20 flex flex-row justify-center items-center'>
        <h1 className='text-white text-3xl' style={{ fontFamily: "Roboto slab" }}>Vehicles</h1>
      </div>

      <Link to={`/vehical`}>
        <div className='float-right flex flex-row items-center mx-5 pt-5'>
          <IoAddCircleOutline size={35} />
          <h1 className='text-xl font-semibold'>Add Vehicle</h1>
        </div>
      </Link>

      

      <div>
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder='Search'
          className='w-80 px-5 h-10 rounded-lg border-2 border-black mx-5 mt-5'
        />

        <div>
          <Link to={`/dashboard`}><button className='bg-black text-white px-2 py-1 rounded-lg mx-5 mt-5'>Dashboard</button></Link>
        </div>
        <div className='mt-2 float-right px-5'>
          <ReactToPrint
            trigger={() => (
              <button className='bg-lime-500 text-black px-2 py-1 w-20 rounded-lg'>Print</button>
            )}
            content={() => componentRef.current}
          />
        </div>
      </div>

      <div ref={componentRef} className='lg:px-10'>
        <table className='w-full border-separate border-spacing-3'>
          <thead>
            <tr>
              <th className='border border-black rounded-lg'>No</th>
              <th className='border border-black rounded-lg text-sm'>Number Plate</th>
              <th className='border border-black rounded-lg'>Brand</th>
              <th className='border border-black rounded-lg'>Model</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map((vehicle, index) => (
              <tr key={index} className='hover:bg-gray-400 hover:text-white lg:text-xl'>
                <td className='border-b-2 border-black text-center'>{index + 1}</td>
                <td className='border-b-2 border-black text-center'>{vehicle.number_plate}</td>
                <td className='border-b-2 border-black text-center'>{vehicle.brand}</td>
                <td className='border-b-2 border-black text-center'>{vehicle.model}</td>
                <td className='flex flex-row gap-x-2 items-center justify-center'>
                  <Link to={`/updatevehicle/${vehicle._id}`}>
                    <button className='text-white border-none bg-blue-700 px-3 py-1 rounded-md'>Edit</button>
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(vehicle._id)}
                    className='bg-red-800 text-white px-3 py-1 rounded-md'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && (
          <DeleteComfirm id={vehicleToDelete} onClose={handleCloseModal} />
        )}
      </div>
    </section>
  );
};
