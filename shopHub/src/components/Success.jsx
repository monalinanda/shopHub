import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { BsBagCheckFill } from 'react-icons/bs';

import { useStateContext } from '../utils/StateContext';
import { runFireworks } from '../utils/canvasConfetti';

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  
  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <div className="h-screen flex items-center ">
      <div className=" w-1/2 bg-slate-300 flex  flex-col items-center justify-center m-auto  p-10 md:h-1/2">
        <p className=" text-green-700">
          <BsBagCheckFill />
        </p>
        <h2 className=" capitalize  mt-4 font-semibold text-2xl font-sans text-sky-800">Thank you for your order!</h2>
        <p className=" font-semibold text-base mt-3">Check your email inbox for the receipt.</p>
        <p className="text-center  text-base mt-3">
          If you have any questions, please email :
          <a className=" text-red-700 mt-3" href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <Link to="/">
          <button type="button" width="300px" className= " bg-red-700 text-white  rounded-xl p-2 mt-3" >
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success