import React from 'react';
import {AiOutlineShopping} from "react-icons/ai";
import { useStateContext } from "../utils/StateContext";
import Cart from './Cart';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { totalQuantities , setShowCart ,showCart} = useStateContext();
  return (
   <div className="flex justify-between bg-gradient-to-r from-cyan-500 to-blue-500 h-20 items-center p-5">
    <Link to="/"><h2 className="text-4xl font-extrabold  ">SHOPHUB STORE</h2></Link>
    <button type="button" className=" font-bold text-2xl" onClick={()=>setShowCart(true)}><AiOutlineShopping/>
    <span className="font-normal  text-base ">{totalQuantities}</span>
    </button>
    {showCart && <Cart/>}
   </div>
  )
}

export default Navbar