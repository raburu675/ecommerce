import React from 'react'
import ReactDOM from 'react-dom';
import Cart from './cart';

function CartPopup({cart=[],setCart,addToCart,cartPopup,selectedProduct,setSelectedProduct,closeCartPopup}) {

  if (!cartPopup) return null;

  const handleAddToCart = () => {
    addToCart(selectedProduct);
    closeCartPopup(); // Close the popup after adding to cart
};
  return ReactDOM.createPortal(
      <div className='fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-70 z-30'>
      <div className='bg-white w-full sm:w-1/2 my-52 sm:mt-72 sm:ml-96  rounded-md'>
          <div className='flex justify-center py-2 border-b border-black mx-8'>
          <h1 className='font-vollkorn text-3xl font-medium my-2'>{selectedProduct.name}</h1>
          </div>

         <div className='mx-8'>
          <h3 className='px-2 text-2xl font-vollkorn py-2 font-medium'>ksh{selectedProduct.price}</h3>
          <div className='flex'>
          <h3 className='px-2 font-medium text-2xl font-vollkorn py-2'>Quantity : <span className='bg-slate-600 rounded text-white px-4'>{selectedProduct.quantity}</span></h3>
          <h3 className='px-2 py-4 font-medium'>{selectedProduct.abv}</h3> 
          </div>
          <h3 className='px-2 font-medium text-2xl font-vollkorn py-2 font-semibold'>Availability: <span className='text-green-800'>In stock</span></h3>
          <div className='w-full flex justify-between'>
          <button  
              onClick={handleAddToCart}
              className='py-2 my-2 border bg-red-700 rounded-lg text-white bg-black text-sm px-8 '
              >
              Add to cart
          </button>
          <button
          onClick={closeCartPopup}
          className='py-2 my-2 border bg-slate-600 rounded-lg text-white bg-black text-sm px-8 '
          >
          Cancel
          </button>
          </div>
         </div>
      </div>

        <Cart
        cart={cart}
        setCart={setCart}
        />        
    </div>
    ,
    document.getElementById('cart-popup')
  )
}
export default CartPopup;