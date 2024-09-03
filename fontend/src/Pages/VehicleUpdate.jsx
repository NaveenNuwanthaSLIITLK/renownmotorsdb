import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const VehicleUpdate = () => {

    const [vehicle, setVehicle] = useState('')
    const [vehicles, setVehicles] = useState([])
    const {id} = useParams('')
    const [number_plate, setNumber_plate] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [contact_number, setContact_number] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:5000/vehical/${id}`)
            .then((res) => {
                setVehicle(res.data.data)
                setNumber_plate(res.data.data.number_plate)
                setBrand(res.data.data.brand)
                setModel(res.data.data.model)
                setContact_number(res.data.data.contact_number)
            })
            .catch((err) => console.error(err))
    }, [id])

    useEffect(() => {
        axios.get(`http://localhost:5000/vehical`)
            .then((res) => {
                setVehicles(res.data.data)
            })
            .catch((err) => console.error(err))
    }, [])

    const updateHandle = (e) => {
        e.preventDefault()

        // Check if the number plate already exists
        const numberPlateExists = vehicles.some(vehicle => vehicle.number_plate === number_plate && vehicle._id !== id)
        if (numberPlateExists) {
            setError('This number plate already exists.')
            return
        }

        axios.put(`http://localhost:5000/vehical/${id}`, {
            number_plate,
            brand,
            model,
            contact_number
        })
        .then((res) => {
            alert('Update Successfully')
            window.location.reload()
        })
        .catch((err) => {
            console.error(err)
            alert("Update Failed")
        })
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <div>
                <h1 style={{fontFamily:"Roboto slab"}} className='text-2xl font-bold mt-10'>Update Vehicle Details</h1>
            </div>
            <form className='flex flex-col mt-10 gap-y-7 shadow-lg shadow-slate-400 px-7 py-5 rounded-lg' onSubmit={updateHandle}>
                <input 
                    onChange={(e) => setNumber_plate(e.target.value)} 
                    value={number_plate}
                    className='border border-black w-56 px-2 py-2 rounded-md' 
                    type="text" 
                    name="number_plate"  
                    placeholder="Number Plate" 
                    required
                />
                <input 
                    onChange={(e) => setBrand(e.target.value)} 
                    value={brand}
                    className='border border-black w-56 px-2 py-2 rounded-md' 
                    name="brand"  
                    placeholder="Brand" 
                    required
                />
                <input 
                    onChange={(e) => setModel(e.target.value)} 
                    value={model}
                    className='border border-black w-56 px-2 py-2 rounded-md' 
                    name="model"  
                    placeholder="Model" 
                    required
                />
                <input 
                    onChange={(e) => setContact_number(e.target.value)} 
                    value={contact_number}
                    className='border border-black w-56 px-2 py-2 rounded-md' 
                    name="contact_number"  
                    placeholder="Contact Number" 
                    required
                />

                {error && <p className="text-red-500">{error}</p>}

                <button typeof='submit' className='bg-blue-500 text-white p-2 rounded-md mt-5' type="submit">Update</button>
            </form>
        </div>
    )
}
