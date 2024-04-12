import React,{useState,useEffect} from 'react'
import  ReactDOM  from 'react-dom';
import Cart from './cart';
import Checkout from './checkout';

function Modal({cart=[],setCart,modal,addToCart,selectedProduct,handleCloseModal,}) {
    if (!modal  ) return null;
     //Function to calculate the total price of the items in the cart
     const totalPrice = (selectedProduct) => {
      return cart.reduce((total, item) => {
        return total + item.initialNumber * item.price;
      }, 0);
    };

    //state to hold the quantity of the products
    const [quantity,setQuantity] = useState(1)
    // const [totalPrice, setTotalPrice] = useState(selectedProduct.price);

    //functions to increment and decrement the initialNumber of the products in the Modal
    const increment = () => {
      setQuantity(quantity+1)
    }

    const decrement = () => {
      //ensure quantity doesnt go below 1
      setQuantity(Math.max(quantity-1,1));
      updateTotalPrice();
    }

    useEffect(() => {
      // Update total price whenever quantity changes
      // setTotalPrice(selectedProduct.price * quantity);
    }, [quantity, selectedProduct.price]);

    const updateTotalPrice = () => {
      setTotalPrice(selectedProduct.price * quantity);
    };

    const handleClose = () => {
      // Reset quantity when closing the modal 
      setQuantity(1);
      //reset total price when closing the modal
      setTotalPrice(selectedProduct.price);
      // Call the provided handleCloseModal function
      handleCloseModal();
    };

    const handleAddToCart = () => {
      addToCart(selectedProduct);
      handleCloseModal(); // Close the popup after adding to cart
  };

        //state to hold the checkout
        const [checkout , setCheckout] = useState(false)

        //function to popup the checkout portal
        const openCheckout = () => {
          setCheckout(true)
          console.log('Opened checkout portal ');
        }
      
        const closeCheckout = () => {
          setCheckout(false)
        }

        //create state that holds the quantity times the price of the product and pass to the checkout
        const [ price, setPrice ] = useState(selectedProduct.price * quantity)

  return ReactDOM.createPortal(
    
    <div>
      <Checkout
      totalPrice={totalPrice}
      price={price}
      checkout={checkout}
      openCheckout={openCheckout}
      closeCheckout={closeCheckout}
      />
    {modal && (
        <div className='fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-70 z-30 font-vollkorn '> {/*This div is the overlay that should be transparent */}
        <div className='bg-white w-full sm:w-1/2 mt-24 pb-32 sm:pb-2 sm:mt-60 ml-0 sm:ml-96  rounded-m'>
        <div className='flex justify-between border-b border-black mx-8 '>
               <h1 className='text-red-500 text-sm sm:text-2xl font-medium my-4 sm:my-2'>Buy Product</h1>
               <img 
                     src='https://img.icons8.com/?size=1x&id=111057&format=png' 
                     alt='CLOSE MODAL'
                     className='h-3 sm:h-5 w-3 sm:w-5 left-0 my-2 cursor-pointer'
                     onClick={handleCloseModal}
               />
               </div>
     
               <div className='flex pt-12 sm:pt-2'>
               <div>
                 <img src={selectedProduct.url} 
                 alt='IMG'
                 className=' overflow-hidden text-center object-cover h-80 sm:h-96 sm:px-8 pt-8 mb-8'
                 />
               </div>
     
               <div className='pt-12 text-lg w-full sm:w-3/5  '>
               <h3 className=' py-1 text-2xl sm:text-3xl font-semibold'>{selectedProduct.name}</h3>
               <h3 className=' pt-8 font-medium text-sm sm:text-xl'>{selectedProduct.abv}</h3>
               <h3 className=' pb-4 font-medium text-sm sm:text-xl'>Availability : In stock</h3>
               <div className='flex w-1/4'>
                  <button 
                  className='px-6 text-white bg-black rounded-lg text-sm'
                  onClick={() => decrement(selectedProduct.id)}
                  >
                    -
                  </button>
                  <p className='mx-2'>{quantity}</p>
                  <button 
                  className='px-6 text-black bg-white rounded-lg text-sm border border-gray-400'
                  onClick={() => increment(selectedProduct.id)}
                  >
                    +
                  </button>
               </div>
               
               <div className='flex flex-col py-6 font-semibold '>
               <p className=' font-medium text-sm sm:text-lg'>Quantity:  {selectedProduct.quantity}</p>
               {/* <p>ksh {selectedProduct.price * quantity}</p> */}
               <p className='font-medium text-sm sm:text-lg'>ksh : {selectedProduct.price * quantity}</p>
               </div>
     
               <div className='flex h-8'>
               <button 
               className='h-full px-12 bg-black text-white text-xs rounded-md hover:text-green-100 '
               onClick={openCheckout}
               >
               Buy
               </button>
               
               <button 
               className='mx-4 border border-gray-400 rounded-md text-xs h-full px-8 bg-white text-black '
               onClick={handleAddToCart}
               >
                Add To Cart
               </button>
               </div>
               </div>
               </div>
        </div>
        </div>
    )}
        <Cart
        cart={cart}
        setCart={setCart}
        />
    </div>
    ,
    document.getElementById('modal')
  )
}

export default Modal
