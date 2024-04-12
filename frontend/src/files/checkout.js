import React from 'react'
import axios from 'axios'
import  ReactDOM  from 'react-dom'

function Checkout({checkout,closeCheckout,totalPrice}) {

  // const initiatePayment = () => {
  //   try {
  //     const generateToken = async () => {
  //       try {
  //         const response = await axios.get('http://localhost:8000/generateToken');
  //         return response.data.token;
  //       } catch (error) {
  //         console.error(error);
  //         throw new Error('Failed to generate token');
  //       }
  //     };
      
  //     const initiateStkPush = async (phone, amount) => {
  //       try {
  //         const response = await axios.post('http://localhost:8000/stkPush', {
  //           phone: phone,
  //           amount: amount
  //         });
  //         return response.data;
  //       } catch (error) {
  //         console.error(error);
  //         throw new Error('Failed to initiate STK push');
  //       }
  //     };
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error('Failed to initiate STK push');
  //   }
  // }

  const initiatePayment = async (e,phoneNumber,amount) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/stkPush', {
        phoneNumber: phoneNumber,
        amount: amount,
        name: name
    });
    console.log(response.data);
    // Handle response as needed
    } catch (error) {
      console.log(error)
    }
  }
  
  return ReactDOM.createPortal(
<div>
    {checkout && (
      <div  className='fixed  flex justify-center items-center top-0 left-0 h-[100vh] bottom-0 right-0 bg-black bg-opacity-70 z-50' >
        <div className='w-full sm:w-1/3 mx-3 sm:mx-0  h-[50vh] bg-black rounded-md'>
        <form onSubmit={initiatePayment} className=' flex  flex-col text-white font-vollkorn'>
          <div className='flex justify-between bg-white py-4'>
          <h1 className='text-black text-xl font-vollkorn px-2 font-semibold text-xs sm:text-sm '>PAYMENT INFO</h1>
          <img 
          src='https://img.icons8.com/?size=1x&id=111057&format=png' 
          alt='close checkout'
          className='h-4 sm:h-6 cursor-pointer px-2'
          onClick={closeCheckout}
          />
          </div>

          <input
          className='border-b rounded:md py-4 bg-black text-white px-2 outline-none text-xs sm:text-sm'
          name='name'
          id='name'
          autoComplete='off'
          placeholder='name'
          />
          
          <input
          className='border-b rounded:md py-4 bg-black text-white px-2 outline-none text-xs sm:text-sm'
          name='phoneNumber'
          id='phoneNumber'
          autoComplete='off'
          placeholder='phone number'
          />
          
          <input
          className='border-b rounded:md py-4 bg-black text-white px-2 outline-none text-xs sm:text-sm'
          name='amount'
          id='amount'
          autoComplete='off'
          placeholder='amount'
          value={totalPrice()} // Call totalPrice function here to get the total price
          readOnly // Make the input field read-only
          />
          
          <input
          className='border-b rounded:md py-4 bg-black text-white px-2 outline-none text-xs sm:text-sm'
          name='address'
          id='address'
          autoComplete='off'
          placeholder='address'
          />
          
          <textarea
          class=" border-none  text-17 rounded-5 border-b-1 border-gray-500 bg-black text-white outline-none font-vollkorn px-2 py-2 pb-8 text-xs sm:text-sm"
          name='message'
          id='message'
          placeholder='Instructions'
          rows={5}
          />
          <button className='px-6  py-4 bg-red-500 text-xs sm:text-sm'>Place Order</button>
        </form>
        </div>
      
  </div>
    )}
    </div>,
    document.getElementById('checkout')
  )
}

export default Checkout;