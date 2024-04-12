import React,{useState,useEffect} from 'react';
import './App.css';
import Nav from './files/nav'
import './style.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import White from './files/white'
import AgeVerification from './files/ageVerification';
import { ReactTyped } from "react-typed";
import { Link } from 'react-router-dom';
import Home from './files/home';
import Cart from './files/cart';
import Red from './files/red';
import Sparkling from './files/sparkling';
import Rose from './files/rose';

function App() {
  //state variable to manage the modal visibility and verififcation
  const [isOpen, setIsOpen] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
    
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(false); //Add state for welcome message

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsModalOpen(true);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle age submission
  const handleAgeSubmit = (age) => {
    setIsOpen(false);
    setIsWelcomeVisible(true); // Show welcome message
    setTimeout(() => {
    setIsWelcomeVisible(false); // Hide welcome message after 5 seconds
    }, 8000);
    setIsModalOpen(false);
  };

  // const handleWelcomeClose = () => {
  //   setIsWelcomeVisible(false);
  // };
  return (  
    //  <div>
    //   <div className=" flex items-center justify-center">      
    //   {isModalOpen && <AgeVerification isOpen={isModalOpen} onAgeSubmit={handleAgeSubmit} onClose={handleCloseModal}/>}
    //   {isWelcomeVisible && 
    //   <div className="fixed inset-0 bg-white z-30 text-4xl font-bold h-[100vh] w-full flex justify-center items-center">
    //     <div className='flex flex-col items-center'>
    //        <h2 className='text-4xl sm:text-8xl my-2'>WELCOME!</h2>
    //        <ReactTyped className='text-sm sm:text-xl' strings={["Shop with us at the untitled liqour shop!"]} typeSpeed={80} />
    //         {/* <ReactTyped        
    //             strings={[
    //               "Search for products",
    //               "Search for categories",
    //               "Search for brands",
    //             ]}
    //             typeSpeed={40}
    //             backSpeed={50}
    //             attr="placeholder"
    //             loop
    //           >
    //             <input type="text" />
    //         </ReactTyped> */}
    //         {/* <div>
    //           <BrowserRouter>
    //              <Link to='/' className='text-white text-2xl px-12 py-4 bg-black rounded-md' onClick={handleWelcomeClose}>Click to continue</Link>
    //           </BrowserRouter>
    //         </div> */}
    //     </div>      
    //   </div>
    //   }
    // </div>

    <div>
      <BrowserRouter>
          {/* <Nav/>           */}
            <Routes className=''>
            <Route path='/' element={<Home/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/white' element={<White/>}/>
            <Route path='/red' element={<Red/>}/>
            <Route path='/sparkling' element={<Sparkling/>}/>
            <Route path='/rose' element={<Rose/>}/>
         </Routes>
        </BrowserRouter>
     </div>
    // <Products/>
        
  );
}

export default App;