import React from 'react';
import { AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="flex flex-col items-center p-5  text-orange-900 font-small font-serif text-center">
    <p>© Copyright 2023  ShopHub store . All rights reserved</p>
    <div className=" flex">
      <AiFillInstagram />
      <AiOutlineTwitter />
    </div>
  </div>

  )
}

export default Footer