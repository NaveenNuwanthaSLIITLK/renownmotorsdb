import React, { useState } from 'react'
import axios from 'axios';

export const DeleteComfirm = ({ id, onClose }) => {

    const handleDeleteVehicle = () => {
        axios
          .delete(`http://localhost:5000/vehical/${id}`)
          .then(() => {
            alert("Delete successful");
            window.location.reload()
            onClose(); // Close the modal after successful delete
          })
          .catch((error) => {
            alert("There was an error deleting the vehicle");
            console.log(error);
            onClose(); // Close the modal on error as well
          });
    }
  return (
    <section className='fixed bg-black inset-0 bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center'>
        <div className='bg-red-700 rounded-lg w-96 h-48 flex flex-col justify-center items-center'>
            <h1 className='text-2xl'>Do you want to delete ?</h1>
            <div className='flex flex-row gap-x-2 mt-2'>
            <button className='bg-blue-800  px-4 py-1 rounded-lg text-xl font-semibold' onClick={handleDeleteVehicle} >yes</button>
            <button className='bg-green-600 px-4 py-1 rounded-lg text-xl font-semibold' onClick={onClose}>no</button>
            </div>
        </div>
    </section>
  )
}
