import React,{useState,useEffect} from 'react'
import Cart from './cart';
import Nav from './nav';

function Home() {
  //Check if there are items stored in local storage, otherwise initialize with an empty array
    const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
    const [cart, setCart] = useState(initialCart);

     useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
      }, [cart]);
  return (
    <div className='font-vollkorn'>
        <div className='fixed inset-0 flex items-center justify-center '>
            <img
            src='https://cdn.pixabay.com/photo/2016/11/19/21/01/beauty-1841162_1280.jpg'
            className='fixed z-10 w-full h-full'
            />
            <div className="fixed z-20 inset-0 bg-black opacity-80 h-full"></div>
            <div className="relative w-full sm:w-2/3  rounded-lg z-20 flex flex-col items-center flex flex-col mt-20 ">
                <h2 className=" text-sm sm:text-xl text-white my-2">SPEACIALIZING IN ONLY</h2>
                <h2 className="text-5xl sm:text-9xl text-white my-2">The Finest Wines</h2>
                <button className='text-white my-2 bg-rose-950 px-12 py-2 text-sm rounded-lg'>SHOP NOW</button>
            </div>
            </div>
            <Nav
            cart={cart}
            setCart={setCart}
            />
            
            <Cart
            cart={cart}
            setCart={setCart}
            />
    </div>
  )
}
export default Home;