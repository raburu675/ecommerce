import React,{useState} from 'react'
import Checkout from './checkout';

function Cart({cart=[],increment,decrement,clearCart,removeFromCart,displayCart,closeCart}) {
  //Function to calculate the total price of the items in the cart
    const totalPrice = () => {
      return cart.reduce((total, item) => {
        return total + item.initialNumber * item.price;
      }, 0);
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

   
  return (
    <div>
      <Checkout
      totalPrice={totalPrice}
      checkout={checkout}
      openCheckout={openCheckout}
      closeCheckout={closeCheckout}
      />
    

      {displayCart && (
        <div className='fixed z-20 flex mt-24 sm:mt-28  w-full'>
          <div 
          className='w-0 sm:w-2/3 bg-blue-800 opacity-10 '
          onClick={()=>closeCart()}
          >
          </div>

          <div className='w-full sm:w-1/3 flex  flex-col bg-white h-[100vh]'>  
              <div className='flex  border  bg-rose-950 text-white py-2 sm:py-4'>
                <div className='w-1/2'>
                <p className='pl-2  text-sm'>Product</p>
                </div>

                <div className='flex w-1/2 text-sm'>
                  <div className=' w-1/3'>
                    <p>Price</p>
                  </div>
                  <div className=' w-1/3'>
                    <p>Quantity</p>
                  </div>
                  <div className=' w-1/3'>
                    <p>Total</p>
                  </div>
                  <img
                  alt='img'
                  src='https://img.icons8.com/?size=50&id=111057&format=png'
                  className='h-4 w-6 bg-white cursor-pointer'
                  onClick={()=>closeCart()}
                  />
                </div>
              </div>

              {/*div to hold the cart items  */}
              <div className='z-10 min-h-[60vh] sm:min-h-[67vh] overflow-scroll '>
                {cart.map((item,index) => (
                   <div className='flex'  key={index}>
                     <div className='flex text-xs font-semibold w-1/2' >
                      <div className='flex items-center w-full '>
                        <img
                        src={item.url}
                        className='h-12 my-2 mx-2'
                        alt='Product'
                        />
                        <p className='text-xs font-semibold px-2 my-2'>{item.name}</p>
                        <p className='text-xs font-semibold px-2 my-2'>{item.quantity}</p>
                      </div>
                      </div>
                      

                      <div className='flex items-center text-xs font-semibold justify-between my-4 w-1/2 '>
                        <div className='w-1/3'>
                          <p className='pl-1' >ksh : {item.price}</p>
                        </div>

                        <div className='flex justify-center items-center rounded-md w-1/3 '>
                          <button
                            className='w-5 h-5 bg-red-900 rounded-lg'
                            onClick={() => decrement(item.id)}
                          >
                            -
                          </button>
                          <div className='px-4'>{item.initialNumber}</div>
                          <button
                            className='w-5 h-5 bg-blue-900 rounded-lg'
                            onClick={() => increment(item.id)}
                          >
                            +
                          </button>
                        </div>

                        <div className='pl-4 w-1/3'>
                          <h2>ksh : {item.initialNumber * item.price}</h2>
                        </div>

                        <img
                          src='https://img.icons8.com/?size=80&id=WG1DCzrcvFoF&format=png'
                          className='h-4 cursor-pointer mx-2  ' 
                          alt='Remove from cart'
                          onClick={() => removeFromCart(item.id)}
                        />
                      </div>
                   </div>
                ))}
              </div>

              <div className='z-20 flex flex-col w-full items-end '>
                  <div className='border-b  border-black w-full'></div>
                  <button className='px-12 py-2 bg-red-800 rounded-md text-white my-1 text-center text-sm'
                  onClick={()=>clearCart()}
                  >Clear Cart</button>
                  <div className='w-44 rounded-md py-2 bg-black text-white my-1 text-center text-sm'>Total: ksh{totalPrice()}</div>
                  <button 
                  className='px-12 py-2 bg-black text-white rounded-md text-center text-sm hover:text-green-400 mb-1'
                  onClick={()=> openCheckout()}
                  >Proceed to checkout</button>
              </div>
          </div>   
        </div>
      )}
    </div>
  )
}

export default Cart