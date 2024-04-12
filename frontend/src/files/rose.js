import React,{useState,useEffect} from 'react'
import Modal from './modal'
import Cart from './cart'
import CartPopup from './cartPopup'
import Nav from './nav'

function Rose() {
    const [products] = useState([

        //white
        { id: 26, name:"Casal Mendes Rose 75cl", price:50, quantity:"750ml", abv:"ABV: 12%",url:"https://www.oaks.delivery/wp-content/uploads/casalmendesrose.webp-240x240.jpg",initialNumber:1 },
        { id: 27, name:"La Vieille Ferme Réserve Rosé Sparkling", price:5200, quantity:"750ml", abv:"ABV: 12%", url:"https://www.oaks.delivery/wp-content/uploads/la-vieille-ferme-reserve-rose-240x240.jpg" ,initialNumber:1},
        { id: 28, name:"Miraval Studio Rosé 75cl", price:3559, quantity:"750ml", abv:"ABV: 12%" ,url:"https://www.oaks.delivery/wp-content/uploads/studio-by-miraval-rose-240x240.jpg" ,initialNumber:1},
        { id: 29, name:"Zevenwacht 7even Rosé 2020 75cl", price:1900, quantity:"750ml", abv:"ABV: 12%",url:"https://www.oaks.delivery/wp-content/uploads/New-Project-27-240x240.jpg",initialNumber:1 },    
        { id: 30, name:"Leopard’s Leap Chardonnay Pinot Noir 2022", price:1680, quantity:"750ml", abv:"ABV: 12%",url:"https://www.oaks.delivery/wp-content/uploads/Leopards-Leap-Chardonnay-Pinot-Noir-2022-750ml-240x240.png" ,initialNumber:1},
    ])

    const [selectedProduct, setSelectedProduct] = useState(false)

    //state to hold the buy product modal
    const [ modal,setModal ] = useState(false)

    //function to trigger the modals visibility
    const handleOpenModal = (product) => {
        setSelectedProduct(product)
        setModal(true)
        console.log("opened modal",selectedProduct)
    }
    const handleCloseModal = () => {
        setModal(false)
    }

    //state to add addToCart popup
    const[cartPopup,setCartPopup] = useState(false)
    //functions to trigger carts popups vsibility
    const openCartPopup = (product) => {
        setSelectedProduct(product);
        setCartPopup(true)
    }

    //function to close the cartpopup
    const closeCartPopup = () => {
        setCartPopup(false)
    }

    // Check if there are items stored in local storage, otherwise initialize with an empty array
    const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
    const [cart, setCart] = useState(initialCart);

     useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
      }, [cart]);

    //function to add items to the cart
    const addToCart = (product) => {
        console.log("Product:", product);
        //check if the product is already in the cart
        const isAlreadyAdded = cart.some((item) => item.id === product.id);

        if (isAlreadyAdded){
            //set state to hold slide message to show item is already in the cart
            console.log('item is already added')
            // Set state to show error popup
            setShowErrorPopup(true);
        }else{
            setCart([...cart,product]);
            //set state to hold the success slide message
            console.log('product added to cart', product)
            // Set state to show success popup
            setShowSuccessPopup(true);
        }
    }
    //state to hold the error and success message
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    // useEffect to hide popups after 10 seconds
    useEffect(() => {
        const hidePopups = () => {
        setShowSuccessPopup(false);
        setShowErrorPopup(false);
        };

        const timeoutId = setTimeout(hidePopups, 10000);
        return () => clearTimeout(timeoutId);
    }, [showSuccessPopup, showErrorPopup]);
    

    // Define a function 'increment' that updates the quantity of a specific item by 1
    const increment = (itemId) => {
        setCart((prevCart) =>
          // Use 'map' to create a new array with updated quantity for the specified item
          prevCart.map((item) =>
            item.id === itemId ? { ...item, initialNumber: item.initialNumber + 1 } : item
          )
        );    
    };

    // Define a function 'decrement' that updates the quantity of a specific item by 1, with a minimum of 1
    const decrement = (itemId) => {
        setCart((prevCart) =>
        // Use 'map' to create a new array with updated quantity for the specified item
        prevCart.map((item) =>
            item.id === itemId
            ? { ...item, initialNumber: Math.max(item.initialNumber - 1, 1) }
            : item
        ));
    };

    // Define the clearCart function to set the cart state to an empty array
    const clearCart = () => {
        setCart([]);
    };

    //function to remove an item from the cart
    const removeFromCart = (itemId) => {
        //create an array that excludes the item with the specified ID
        const updatedCart = cart.filter((item) => item.id !== itemId)
        //update the cart with the new array
        setCart(updatedCart);
        console.log('item removed', itemId)
        console.log("new item list",updatedCart)
    };
  return (
    <div>
        <Modal
            modal={modal}
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
            selectedProduct={selectedProduct}
            addToCart={addToCart}
            cart={cart}
            setCart={setCart}
            increment={increment}
            decrement={decrement}
            />

            <CartPopup
            cart={cart}
            addToCart={addToCart}
            cartPopup={cartPopup}
            setCartPopup={setCartPopup}
            selectedProduct={selectedProduct}
            closeCartPopup={closeCartPopup}
            />

            <Nav
            cart={cart}
            setCart={setCart}
            addToCart={addToCart}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            increment={increment}
            decrement={decrement}
            clearCart={clearCart}
            removeFromCart={removeFromCart}
            />

            <Cart
            cart={cart}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            />
            
            <div className=' w-full flex flex-col font-vollkorn justify-center items-center pt-24'>
            <h2 className='text-center my-2 sm:my-8 text-rose-800 text-4xl font-vollkorn border-b border-gray-400'>Rose' Wines Available</h2>
            <div className='w-full  sm:w-2/3 flex flex-wrap justify-center'>
                    {products.map((val,id) =>(
                    <div className='w-44 sm:w-60 h-2/6 border border-gray-300 rounded-md my-2 mx-2 bg-white hover:shadow-2xl'>
                    <p className='text-xs flex justify-end py-2 pr-2'>{val.abv}</p>
                    <img src={val.url}
                    alt='IMG'
                    className=' overflow-hidden text-center object-cover h-40 sm:h-60 my-2 px-12 cursor-pointer'
                    onClick={()=>handleOpenModal(val)}
                    />
                    <div class='border-b border-gray-400 ml-0 sm:ml-3 w-11/12'></div>
                    <div className='py-2 flex flex-col items-center'>
                            <p className='pl-2 text-xs uppercase font-semibold'>{val.name}</p>
                            <p className='pl-2 text-xs upprercase font-semibold'>{val.quantity}</p>
                            <p className='pl-2 text-xs font-semibold'>ksh{val.price}</p>
                    </div>
                
                    <div className='flex justify-center'>
                        <button
                         onClick={() => openCartPopup(val)}
                        className='font-semibold px-6 h-7 mx-1 my-2 border border-gray-300 rounded-lg w-3/4 hover:bg-gray-100  text-xs'
                        >add to cart</button>
                    </div>
                    </div>
                    ))}
            </div>

            
            {showSuccessPopup && (
                <div className=" mt-20 py-2 px-2  bg-green-700 z-30">
                {/* Content for success popup */}
                Product added to cart successfully!
                </div>
            )}

            
            {showErrorPopup && (
                <div className="py-2 px-2  bg-red-700 ">
                {/* Content for error popup */}
                Item is already in the cart!
                </div>
            )}
            </div>
    </div>
  )
}

export default Rose