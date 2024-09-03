import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export const UpdateVehiclePart = () => {

    const { id } = useParams()
    const [vehiclePart, setVehiclePart] = useState({})
    const [vehicleParts, setVehicleParts] = useState([])
    const [itemName, setItemName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:5000/item/${id}`)
            .then((res) => {
                const data = res.data.data
                setVehiclePart(data)
                setItemName(data.item_name)
                setQuantity(data.quantity)
            })
            .catch((err) => console.error(err))
    }, [id])

    useEffect(() => {
        axios.get(`http://localhost:5000/item/`)
            .then((res) => {
                const data = res.data.data
                setVehicleParts(data)
            })
            .catch((err) => console.error(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        // Check if the item name already exists (excluding the current item's name)
        const itemNameExists = vehicleParts.some(part => part.item_name.toLowerCase() === itemName.toLowerCase() && part._id !== id)

        if (itemNameExists) {
            setError('This item name already exists.')
            return
        }

        axios.put(`http://localhost:5000/item/${id}`, {
            item_name: itemName,
            quantity: quantity
        })
        .then((res) => {
            console.log(res.data)
            alert('Vehicle Part Updated Successfully')
            window.location.href = '/vehiclepartdetails'
        })
        .catch((err) => {
            console.error(err)
            alert('Something went wrong')
        })
    }

    return (
        <section>
            <div className='flex flex-row justify-center items-center text-2xl mt-10' style={{ fontFamily: 'Roboto slab' }}>
                <h1>Vehicle Part Update</h1>
            </div>

            <div className='flex flex-row justify-center items-center'>
                <form className='rounded-lg flex gap-y-5 flex-col justify-center items-center px-10 py-10 mt-10 shadow-lg shadow-slate-500' onSubmit={handleSubmit}>
                    <input 
                        onChange={(e) => {
                            setItemName(e.target.value)
                            setError('')  // Reset the error message when the user types
                        }} 
                        value={itemName} 
                        className='border border-black py-1 px-2 rounded-md' 
                        type="text" 
                        placeholder='Item Name' 
                        required 
                    />
                    <input 
                        onChange={(e) => setQuantity(e.target.value)} 
                        value={quantity} 
                        className='border border-black py-1 px-2 rounded-md' 
                        type="text" 
                        placeholder='Quantity' 
                        required 
                    />
                    {error && <p className="text-red-500 text-lg">{error}</p>}
                    <button className='bg-blue-500 text-white w-full py-1 px-2 rounded-md' type='submit'>Update</button>
                </form>
            </div>
        </section>
    )
}
