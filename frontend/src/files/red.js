import React,{useState,useEffect} from 'react'
import Modal from './modal'
import Cart from './cart'
import CartPopup from './cartPopup'
import Nav from './nav'

function Red() {
    const [products] = useState([
        //red
        { id: 6,name:"Gran Verano Cabernet Sauvignon", price:1500, quantity:"750ml", abv:"ABV: 40%", url:"https://storage.googleapis.com/zoneke/products/gran-verano-cabernet-sauvignon.webp",initialNumber:1},
        { id: 7, name:"Frontera cabernet Sauvignon", price:1650, quantity:"750ml", abv:"ABV: 35%" ,url:"https://storage.googleapis.com/zoneke/products/frontera-caberbet-sauvignon.webp" ,initialNumber:1},
        { id: 8,name:"Offley Reserve Port", price:3499, quantity:"750ml", abv:"ABV: 40%", url:"https://storage.googleapis.com/zoneke/products/Offley-reserve-port.webp",initialNumber:1},
        { id: 9, name:"Porcupine Ridge Carbanet Sauvignon", price:"2900", quantity:"750ml", abv:"ABV: 40%", url:"https://jayswines.com/wp-content/uploads/2020/09/NEDERBURG-MERLOT-1.jpg" ,initialNumber:1},
        { id: 10, name:"Robertson winery rose red", price:1900, quantity:"750ml", abv:"ABV: 35%",url:"https://storage.googleapis.com/drinksvine/products/robertson-winery-rose.webp",initialNumber:1 },
        { id: 11, name:"Four cousins red", price:1300, quantity:"750ml", abv:"ABV: 35%",url:"https://soys.co.ke/PImages/LHOUP-0.jpg" ,initialNumber:1},
        { id: 12,name:"4th Street", price:850, quantity:"750ml", abv:"ABV: 40%", url:"https://cdnprod.mafretailproxy.com/sys-master-root/h06/he9/12462980923422/41697_Main.jpg_480Wx480H",initialNumber:1},
        { id: 13,name:"Asconi pastrol", price:2080, quantity:"750ml", abv:"ABV: 40%", url:"https://storage.googleapis.com/drinksvine/products/asconi-pastoral.webp",initialNumber:1},
        { id: 14, name:"Cella cask Red", price:2300, quantity:"750ml", abv:"ABV: 35%" ,url:"https://jayswines.com/wp-content/uploads/2020/09/cellar-cask-red.png" ,initialNumber:1},
        { id: 15, name:"Sileni Estates Pinot Noir", price:5800, quantity:"750ml", abv:"ABV: 40%",url:"https://storage.googleapis.com/zoneke/products/Sileni-estates-pinot-noir.webp",initialNumber:1 },
        { id: 16, name:"Nerderberg", price:850, quantity:"750ml", abv:"ABV: 40%", url:"https://jayswines.com/wp-content/uploads/2020/09/NEDERBURG-MERLOT-1.jpg" ,initialNumber:1},  
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
            <h2 className='text-center my-2 sm:my-8 text-rose-800 text-4xl font-vollkorn border-b border-gray-400'>Red Wines Available</h2>
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

export default Red