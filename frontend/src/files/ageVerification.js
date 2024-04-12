import React, { useState,useEffect } from 'react';

function AgeVerificationModal({ isOpen, onClose, onAgeSubmit }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const isAgeVerified = localStorage.getItem('ageVerified');
    if (isAgeVerified) {
      setVerified(true);
    }
  }, []);

  const handleAgeVerification = (age) => {
    if (age >= 18) {
      localStorage.setItem('ageVerified', true);
      onAgeSubmit(age); // Call onAgeSubmit function with age as argument
      onClose(); // Close the modal
    } else {
      setErrorMessage('You must be at least 18 years old to use this website.');
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-30'>
      <img
      src='https://www.foodandwine.com/thmb/oQRJxb0Zaivwa4H56xRouBsrOWY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Bold-Red-Wines-to-Buy-For-the-Cold-Weather-Right-Now-FT-BLOG1222-17a594fa47ee470cb0483dda1fe9dfd5.jpg'
      className='fixed z-10 w-full h-full'
      />
      <div className="fixed z-20 inset-0 bg-black opacity-80 flex"></div>
      <div className="relative w-full sm:w-2/3  rounded-lg z-20 flex flex-col items-center">
        <h2 className="text-sm sm:text-6xl font-semibold mb-4 text-white">Are you atleast 18 years old?</h2>
        <h2 className="text-sm sm:text-2xl sm:font-semibold mb-4 text-white mx-6">Kindly verify your age !<br/>You cannot access this website if ou're under 18 years old</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <div className="flex justify-center w-full">
          <button
            className="bg-green-800  text-white px-8 text-xs sm:text-sm sm:px-24  py-2 rounded-md mx-4"
            onClick={() => handleAgeVerification(18)}
          >
            Above 18
          </button>
          <button
            className="bg-red-800 text-white sm:px-24 py-2 mx-4 px-8 text-xs sm:text-sm rounded-md"
            onClick={() => setErrorMessage('You must be at least 18 years old to use this website.')}
          >
            Below 18
          </button>
        </div>
      </div>
    </div>
  );
}

export default AgeVerificationModal;
