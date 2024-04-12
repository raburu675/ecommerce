import React, { useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import Modal from './modal';
import White from './white';
import Cart from './cart';

function Nav({cart=[],setCart}) {

  //create state that will hold the products in an empty array
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

    //white
    { id: 1, name:"Gran Verano auivgnon Blanc", price:1500, quantity:"750ml", abv:"ABV: 40%",url:"https://storage.googleapis.com/zoneke/products/gran-verano-sauvignon-blanc.webp",initialNumber:1 },
    { id: 2, name:"Sileni Estates Straits", price:5200, quantity:"750ml", abv:"ABV: 40%", url:"https://storage.googleapis.com/zoneke/products/Sileni-estates-straits.webp" ,initialNumber:1},
    { id: 3, name:"Nederburg Chenin Blanc", price:1950, quantity:"750ml", abv:"ABV: 35%" ,url:"https://storage.googleapis.com/zoneke/products/nederburg-chenin-blanc.webp" ,initialNumber:1},
    { id: 4, name:"Cella cask White", price:1900, quantity:"750ml", abv:"ABV: 40%",url:"https://soys.co.ke/PImages/HYAYJ-0.jpg",initialNumber:1 },    
    { id: 5, name:"Four cousins white", price:1300, quantity:"750ml", abv:"ABV: 35%",url:"https://storage.googleapis.com/drinksvine/products/four-cousins-white-sweet.webp" ,initialNumber:1},

    //sparkling
    { id: 17, name:"Belaire Brut Fantome", price:5450, quantity:"750ml", abv:"ABV: 12%",url:"https://storage.googleapis.com/zoneke/products/-Belaire-Brut-Fantome.webp" ,initialNumber:1},
    { id: 18, name:"Belaire Bleu", price:5800, quantity:"750ml", abv:"ABV: 12%",url:"https://storage.googleapis.com/zoneke/products/Belaire-Bleu.webp" ,initialNumber:1},
    { id: 19, name:"Luc Belaire Rose Fantome", price:5500, quantity:"750ml", abv:"ABV: 12.5%",url:"https://storage.googleapis.com/zoneke/products/Luc-Belaire-Rose-Fantome.webp" ,initialNumber:1},
    { id: 20, name:"Belaire Brut", price:5350, quantity:"750ml", abv:"ABV: 12.5%",url:"https://storage.googleapis.com/zoneke/products/luc-belaire-brut.webp" ,initialNumber:1},
    { id: 21, name:"Moet & Chandon Imperial Brut", price:1500, quantity:"750ml", abv:"ABV: 12%",url:"https://storage.googleapis.com/zoneke/products/moet-&-chandon-imperial-brut.webp",initialNumber:1 },
    { id: 22, name:"Dom Perignon", price:5200, quantity:"750ml", abv:"ABV: 12%", url:"https://storage.googleapis.com/zoneke/products/laurent-pierre.webp" ,initialNumber:1},
    { id: 23, name:"Louis Roederer Blanc De Blancs", price:1950, quantity:"750ml", abv:"ABV: 12%" ,url:"https://storage.googleapis.com/zoneke/products/Louis-roederer-blanc-de-blancs-2013.webp" ,initialNumber:1},
    { id: 24, name:"Nicolas Feuillatte Graphic Ice Silver", price:1900, quantity:"750ml", abv:"ABV: 12%",url:"https://storage.googleapis.com/zoneke/products/Nicolas-Feuillatte-Graphic-Ice-Silver.webp",initialNumber:1 },    
    { id: 25, name:"Laurent Pierre", price:1300, quantity:"750ml", abv:"ABV: 12%",url:"https://storage.googleapis.com/zoneke/products/laurent-pierre.webp" ,initialNumber:1},

    //white
    { id: 26, name:"Casal Mendes Rose 75cl", price:1500, quantity:"750ml", abv:"ABV: 12%",url:"https://www.oaks.delivery/wp-content/uploads/casalmendesrose.webp-240x240.jpg",initialNumber:1 },
    { id: 27, name:"La Vieille Ferme Réserve Rosé Sparkling", price:5200, quantity:"750ml", abv:"ABV: 12%", url:"https://www.oaks.delivery/wp-content/uploads/la-vieille-ferme-reserve-rose-240x240.jpg" ,initialNumber:1},
    { id: 28, name:"Miraval Studio Rosé 75cl", price:3559, quantity:"750ml", abv:"ABV: 12%" ,url:"https://www.oaks.delivery/wp-content/uploads/studio-by-miraval-rose-240x240.jpg" ,initialNumber:1},
    { id: 29, name:"Zevenwacht 7even Rosé 2020 75cl", price:1900, quantity:"750ml", abv:"ABV: 12%",url:"https://www.oaks.delivery/wp-content/uploads/New-Project-27-240x240.jpg",initialNumber:1 },    
    { id: 30, name:"Leopard’s Leap Chardonnay Pinot Noir 2022", price:1680, quantity:"750ml", abv:"ABV: 12%",url:"https://www.oaks.delivery/wp-content/uploads/Leopards-Leap-Chardonnay-Pinot-Noir-2022-750ml-240x240.png" ,initialNumber:1},
])
const [searchTerm, setSearchTerm] = useState('');

const [selectedProduct, setSelectedProduct] = useState(false)

//state to hold the cart
const [ displayCart,setDisplayCart ] = useState(false)

  //function to open cart
const openCart = (product) => {
  setSelectedProduct(product);
  setDisplayCart(true)
}

//function to close cart
const closeCart = () => {
  setDisplayCart(false)
}

//state to hold the buy product modal
const [ modal,setModal ] = useState(false)

//function to trigger the modals visibility
const handleOpenModal = (product) => {
    setSearchTerm('')
    setSelectedProduct(product)
    setModal(true)
    console.log("opened modal",selectedProduct)
}
const handleCloseModal = () => {
    setModal(false)
}

 // Calculate cart length
 const cartLength = cart.reduce((total, item) => total + item.initialNumber, 0);

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
        <div >
        <Cart
        cart={cart}
        displayCart={displayCart}
        setDisplayCart={setDisplayCart}
        closeCart={closeCart}
        increment={increment}
        decrement={decrement}
        clearCart={clearCart}
        removeFromCart={removeFromCart}
        />

        <Modal
        modal={modal}
        addToCart={addToCart}
        handleCloseModal={handleCloseModal}
        handleOpenModal={handleOpenModal}
        selectedProduct={selectedProduct}
        />

        <div className='fixed font-vollkorn z-20 flex flex-col items-center items-center border-b w-full bg-white'>
        <nav className='w-full   sm:w-2/3 flex justify-between py-4 bg-white text-black h-16 flex items-center'>
         <Link to='/' className=' font-semibold text-xs sm:text-lg  pl-2'>HOME</Link>
         <div className='relative'>
                <input
                id='searchBar'
                type='text'
                placeholder='Search here...'
                autoComplete='off'
                value={searchTerm}
                className='px-20  text-xs sm:text-sm sm:px-60 py-1 bg-gray-100  sm:h-10 text-black text-center rounded-full border focus:outline-none focus:border-blue-400 '
                onChange={(e) => setSearchTerm(e.target.value)}
                />

               <div className='absolute flex flex-col text-center   w-full rounded-3xl py-2' >
               {
                products.filter((val) => {
                  if (searchTerm === ''){
                    return null
                  }else if(val.name.toLowerCase().includes(searchTerm.toLowerCase())){
                    return val.name
                  }
                })
                .map((val, key) => {
                  return (
                    <button 
                      key={key} 
                      className='py-2 z-50 rounded border border-gray-400 w-full bg-white text-black text-xs sm:text-sm'
                      onClick={()=>handleOpenModal(val)}
                      >
                      {val.name}
                    </button>
                  ) 
                })
               }
              </div>
         </div>
               
         
          <div className='flex pr-2'>
          <img 
          alt='CART'
          src='https://img.icons8.com/?size=64&id=KqV6G325egdQ&format=png'
          className='w-full h-6 font-semibold cursor-pointer '
          onClick={()=>openCart()}
          />
          <p className="text-xs sm:text-sm font-semibold ">({cartLength})</p>
          </div>
        </nav>

        
        <div className=' fixed mt-16 z-30   border-t border-black border-b mx-2 w-full flex justify-center py-2 sm:py-4 bg-white '>
            <div className='w-full sm:w-1/3 flex justify-around text-xs sm:text-sm'>
            <Link to='/white' className='hover:text-rose-800 hover:underline '>White</Link>
            <Link to='/red' className='hover:text-rose-800 hover:underline '>Red</Link>
            <Link to='/sparkling' className='hover:text-rose-800 hover:underline '>Champagne</Link>
            <Link to='/rose' className='hover:text-rose-800 hover:underline '>Rose`</Link>
            </div>
        </div>
        </div>    
        
        </div>
  )
}
export default Nav;