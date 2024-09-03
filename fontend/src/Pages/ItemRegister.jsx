import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const ItemRegister = () => {
    const [item_name, setItem_name] = useState('');
    const [quantity, setQuantity] = useState('');
    const [item, setItem] = useState({});

    useEffect(() => {
        if (item_name) {
            axios.get(`http://localhost:5000/item/item_name/${item_name}`)
                .then((res) => {
                    setItem(res.data.data);
                    console.log(res.data.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [item_name]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!item){
            axios.post("http://localhost:5000/item", {
                item_name,
                quantity
            }).then(response => {
                console.log(response);
                alert("Item registered successfully");
                window.location.reload()
            }).catch(err => {
                console.log(err);
            });
        }
        else if(item){
            axios.put(`http://localhost:5000/item/${item ? item._id :''}`, {
                item_name,
                quantity
            }).then(response => {
                console.log(response);
                alert("Item update successfully");
                window.location.reload()
            }).catch(err => {
                console.log(err);
            });
        }
        
        
    };

    return (
        <section className='flex flex-col justify-center items-center px-5'>
            <h1 className='text-5xl font-serif text-black mb-10 mt-20 lg:mt-8 xl:mt-10'>Item Register</h1>
            <div className='flex flex-row justify-end w-full mb-5 lg:justify-center lg:items-center'>
    <Link to={`/dashboard`}><button className=' bg-black text-white  px-4 py-1  rounded-md'>Dashboard</button></Link>
    </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-y-2 w-full h-72 lg:w-4/6 lg:h-96 justify-center items-center bg-black rounded-lg'>
                <input
                    onChange={(e) => setItem_name(e.target.value)}
                    value={item_name}
                    className='bg-transparent text-white p-3 w-64 border-2 border-white rounded-md'
                    type="text"
                    placeholder='Item Name'
                />
                <input
                    onChange={(e) => setQuantity(e.target.value)}
                    value={quantity}
                    className='bg-transparent text-white p-3 w-64 border-2 border-white rounded-md'
                    type="text"
                    placeholder='Quantity'
                />
                <button type='submit' className='text-white border-2 border-white px-6 py-1 mt-9 rounded-lg'>SUBMIT</button>
            </form>
            
        </section>
    );
};
