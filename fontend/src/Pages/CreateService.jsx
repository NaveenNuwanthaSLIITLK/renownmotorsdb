import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaPlusSquare } from "react-icons/fa";
import axios from 'axios';
import {Link} from 'react-router-dom'

export const CreateService = () => {
  // State to store the value of the input fields
  const [val, setVal] = useState([{ product: '', price: '', quantity: '' }]);
  // State to store the number plate
  const [numberPlate, setNumberPlate] = useState('');
  // State to store the description
  const [description, setDescription] = useState('');
  // State to store all the number plates
  const [allPlates, setAllPlates] = useState([]);
  // State to store the service price
  const [servicePrice, setServicePrice] = useState('');
  // State to store the total price
  const [totalPrice, setTotalPrice] = useState(0);
  // State to store the vehicle
  const [vehicle, setVehicle] = useState('');
  // State to store the discount
  const [discount, setDiscount] = useState('');
  // State to store the items
  const [items, setItems] = useState([]);
  // State to store the suggestions
  const [suggestions, setSuggestions] = useState([]);
  // State to store the error message
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  // Effect to fetch the items from the database
  useEffect(() => {
    axios.get('http://localhost:5000/item')
      .then((res) => {
        setItems(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Effect to fetch the number plates from the database
  useEffect(() => {
    axios.get('http://localhost:5000/vehical')
      .then((res) => {
        setAllPlates(res.data.data);
        console.log(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Effect to fetch the vehicle details from the database based on the number plate
  useEffect(() => {
    if (numberPlate) {
      axios.get(`http://localhost:5000/vehical/number_plate/${numberPlate}`)
        .then((res) => {
          setVehicle(res.data.data[0]);
          console.log(res.data.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [numberPlate]);

  // Function to add a new item
  const handleAdd = () => {
    setVal((prevVal) => [...prevVal, { product: '', price: '', quantity: '' }]);
  };

  // Function to handle the change in the input fields
  const handleChange = (index, field, value) => {
    setVal((prevVal) => {
      const updatedVal = [...prevVal];
      updatedVal[index][field] = value;

      if (field === 'product') {
        const filteredSuggestions = items.filter(item =>
          item.item_name.toLowerCase().startsWith(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
      }

      if (field === 'quantity') {
        const selectedProduct = updatedVal[index].product;
        const item = items.find(item => item.item_name === selectedProduct);
        if (item && Number(value) > item.quantity) {
          setErrorMessage(`Quantity for ${selectedProduct} exceeds available stock of ${item.quantity}.`);
        } else {
          setErrorMessage(''); // Clear the error message if the quantity is valid
        }
      }

      return updatedVal;
    });
  };

  // Function to handle the selection of a suggestion
  const handleSelectSuggestion = (index, suggestion) => {
    setVal((prevVal) => {
      const updatedVal = [...prevVal];
      updatedVal[index].product = suggestion.item_name;
      return updatedVal;
    });
    setSuggestions([]); // Clear the suggestions after selection
  };

  // Effect to calculate the total price
  useEffect(() => {
    const calculatedTotalPrice = Number(servicePrice) + val.reduce((acc, curr) => acc + (Number(curr.price) * Number(curr.quantity)), 0);
    setTotalPrice(calculatedTotalPrice - Number(discount));
  }, [val, servicePrice]);

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Prepare the data for submission
      const serviceData = {
        number_plate: numberPlate,
        services: description,
        model: vehicle ? vehicle.brand : '',
        brand: vehicle ? vehicle.model : '',
        price_of_service: Number(servicePrice),
        product_prices: val,
        total_price: totalPrice,
        discount
      };
  
      // Submit the service data
      const response = await axios.post("http://localhost:5000/service", serviceData);
      console.log(response);
      alert("Submit Successful");
  
      // Update item quantities in the database
      for (const product of val) {
        const selectedItem = items.find(item => item.item_name === product.product);
        if (selectedItem) {
          const newQuantity = selectedItem.quantity - product.quantity;
          await axios.put(`http://localhost:5000/item/${selectedItem._id}`, { quantity: newQuantity });
        }
      }
  
      // Clear the form and reset state
      setNumberPlate('');
      setDescription('');
      setServicePrice('');
      setDiscount('');
      setVal([{ product: '', price: '', quantity: '' }]);
      setTotalPrice(0);
      setErrorMessage('');
  
      // Optionally, refresh the page or redirect
      // window.location.reload();
    } catch (err) {
      console.log(err);
      alert("An error occurred while submitting the data.");
    }
  };
  

  // Function to handle the selection of a number plate
  const handleSelectNumberPlate = (plate) => {
    setNumberPlate(plate);
  };

  return (
    <section className='px-5 flex flex-col gap-y-5 lg:items-center'>
      <div className='flex flex-row items-center py-3'>
        <h1 className='text-4xl font-serif'>Make Service</h1>
        <Link to={`/dashboard`}><button className='bg-black text-white px-4 py-1 ml-16 rounded-md'>Dashboard</button></Link>
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
          />
          <button onClick={() => {}} className='border-2 border-black px-4 font-bold' type='button'>Search</button>
        </div>

        <div className={`${numberPlate ? 'border border-black w-60' : ''}`}>
          {allPlates.filter(item => {
            const searchItem = numberPlate.toLowerCase();
            const plate = item.number_plate.toLowerCase();
            return numberPlate && plate.startsWith(searchItem);
          }).map(item => (
            <div key={item.number_plate} className="hover:bg-gray-500 cursor-pointer" onClick={() => handleSelectNumberPlate(item.number_plate)}>
              {item.number_plate}
            </div>
          ))}
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
                {errorMessage && <div className="text-red-600">{errorMessage}</div>}
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
          <button className='font-sans mb-5 font-bold border border-black w-40 h-10 mt-4' type='submit'>SUBMIT</button>
        </div>
      </form>
    </section>
  );
};