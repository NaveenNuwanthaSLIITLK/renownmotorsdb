import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaPlusSquare } from "react-icons/fa";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateService = () => {
  const { id } = useParams(); // Get the service ID from the URL
  const navigate = useNavigate(); // Use useNavigate for navigation

  const [val, setVal] = useState([{ product: '', price: '', quantity: '' }]);
  const [numberPlate, setNumberPlate] = useState('');
  const [description, setDescription] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState('');
  const [vehicle, setVehicle] = useState({});
  const [items, setItems] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(''); // State to store error message
  const [service, setService] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:5000/service')
      .then((res) => setService(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:5000/service/${id}`)
      .then((res) => {
        const data = res.data.data;
        setNumberPlate(data.number_plate);
        setDescription(data.services);
        setServicePrice(data.price_of_service);
        setDiscount(data.discount);
        setTotalPrice(data.total_price);
        setVal(data.product_prices);
        setVehicle({ brand: data.brand, model: data.model });
      })
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    axios.get('http://localhost:5000/item')
      .then((res) => setItems(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const calculatedTotalPrice = Number(servicePrice) + val.reduce((acc, curr) => acc + (Number(curr.price) * Number(curr.quantity)), 0);
    setTotalPrice(calculatedTotalPrice - Number(discount));
  }, [val, servicePrice, discount]);

  const handleChange = (index, field, value) => {
    setVal(prevVal => {
      const updatedVal = [...prevVal];
      updatedVal[index][field] = value;

      if (field === 'product') {
        const filteredSuggestions = items.filter(item =>
          item.item_name.toLowerCase().startsWith(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
      }

      if (field === 'quantity') {
        const item = items.find(item => item.item_name === updatedVal[index].product);
        if (item && Number(value) > item.quantity) {
          setError(`Quantity exceeds available stock for ${item.item_name}`);
        } else {
          setError('');
        }
      }

      return updatedVal;
    });
  };

  const handleAdd = () => {
    setVal(prevVal => [...prevVal, { product: '', price: '', quantity: '' }]);
  };

  const handleSelectSuggestion = (index, suggestion) => {
    setVal(prevVal => {
      const updatedVal = [...prevVal];
      updatedVal[index].product = suggestion.item_name;
      return updatedVal;
    });
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (error) {
      alert('Please resolve the errors before submitting.');
      return;
    }
  
    try {
      // Update the service details
      const serviceResponse = await axios.put(`http://localhost:5000/service/${id}`, {
        number_plate: numberPlate,
        services: description,
        model: vehicle.model,
        brand: vehicle.brand,
        price_of_service: Number(servicePrice),
        product_prices: val,
        total_price: totalPrice,
        discount: Number(discount)
      });
  
      // Fetch the original service data to compare item quantities
      const originalService = service.find(s => s._id === id);
      if (!originalService) throw new Error('Original service data not found');
  
      // Calculate the difference in quantities and update the items
      for (const updatedProduct of val) {
        const originalProduct = originalService.product_prices.find(p => p.product === updatedProduct.product);
        const difference = originalProduct ? originalProduct.quantity - updatedProduct.quantity : -updatedProduct.quantity;
  
        if (difference !== 0) {
          // Fetch the item details to update the quantity
          const item = items.find(item => item.item_name === updatedProduct.product);
          if (item) {
            const newQuantity = item.quantity + difference;
            await axios.put(`http://localhost:5000/item/${item._id}`, { quantity: newQuantity });
          }
        }
      }
  
      alert('Service Updated Successfully');
      navigate('/servicedetails'); // Redirect to the services list or details page
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };
  

  return (
    <section className='px-5 flex flex-col gap-y-5 lg:items-center'>
      <div className='flex flex-col items-center py-3'>
        <h1 className='text-5xl font-serif'>Update Service</h1>
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col mb-5 gap-y-10 w-full rounded-lg lg:w-5/12 lg:px-10 lg:py-5 lg:shadow-md lg:shadow-slate-800'>
        <div className='flex flex-row gap-1'>
          <input 
            className='px-1 py-1 border border-black lg:w-60' 
            type="text" 
            placeholder='Number Plate' 
            value={numberPlate} 
            onChange={(e) => setNumberPlate(e.target.value)} 
            required
            disabled
          />
        </div>
        <ReactQuill value={description} onChange={setDescription} />
        <input 
          className='px-1 py-1 border border-black lg:w-60' 
          type="text" 
          placeholder='Service Price' 
          value={servicePrice}
          onChange={(e) => setServicePrice(e.target.value)} 
          required
        />
        <input 
          className='px-1 py-1 border border-black lg:w-60' 
          type="text" 
          placeholder='Discount Price' 
          value={discount}
          onChange={(e) => setDiscount(e.target.value)} 
        />
        <div className='flex flex-col'>
          {val.map((data, i) => (
            <div className='flex flex-row mb-5' key={i}>
              <div className='flex flex-col'>
                <h1 className='text-2xl'>Item {i + 1}</h1>
                <input 
                  onChange={(e) => handleChange(i, 'product', e.target.value)} 
                  className='px-1 py-1 border border-black mt-2 lg:w-60' 
                  type="text" 
                  placeholder='Vehicle Part' 
                  value={data.product}
                />
                {suggestions.length > 0 && (
                  <div className='shadow-md shadow-slate-400 mt-2'>
                    {suggestions.map((suggestion, sIndex) => (
                      <div key={sIndex} className="hover:bg-gray-500 cursor-pointer border-b" onClick={() => handleSelectSuggestion(i, suggestion)}>
                        {suggestion.item_name}
                      </div>
                    ))}
                  </div>
                )}
                <input 
                  onChange={(e) => handleChange(i, 'price', e.target.value)} 
                  className='border py-1 px-1 border-black mt-2' 
                  placeholder='Product Price' 
                  type="text" 
                  value={data.price}
                />
                <input 
                  onChange={(e) => handleChange(i, 'quantity', e.target.value)} 
                  className='border py-1 px-1 border-black mt-2' 
                  placeholder='Quantity' 
                  type="text" 
                  value={data.quantity}
                />
                {error && <p className='text-red-500'>{error}</p>}
              </div>
              <button className='px-10' type="button" onClick={handleAdd}>
                <FaPlusSquare size={30} />
              </button>
            </div>
          ))}
        </div>
        <div>
          <h1 className='text-2xl font-mono'>Total is : Rs {totalPrice}</h1>
        </div>
        <div className='flex flex-col items-center'>
          <button className='font-sans mb-5 font-bold border border-black w-40 h-10 mt-4' type='submit'>UPDATE</button>
        </div>
      </form>
    </section>
  );
};

export default UpdateService;
