import React, { useRef } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

import { useStateContext } from "../utils/StateContext";
import { urlFor } from "../../lib/client";
//import getStripe from '../lib/getStripe';

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
    qty,
  } = useStateContext();

  const makePayment = async () => {
    const stripe = await loadStripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    );

    const body = {
      products: cartItems,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      "http://localhost:8232/api/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <div
      className="fixed top-0  right-0 z-100 w-screen transition backdrop-opacity-10 backdrop-invert bg-white/30"
      ref={cartRef}
    >
      <div className="relative float-right  md:w-4/12  h-screen  md:p-10  p-2 bg-slate-100">
        <button
          type="button"
          className="flex items-center"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="ml-1">Your Cart </span>
          <span className="ml-1 text-orange-700 ">
            ({totalQuantities} items)
          </span>
        </button>

        {cartItems.length < 1 && (
          <div className=" text-center">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="mt-5">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="flex gap-5 items-center" key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  className="cart-product-image md:w-2/6  w-1/3"
                />
                <div className="item-desc w-full">
                  <div className="flex  justify-around ">
                    <p className="md:text-lg text-sm font-semibold text-sky-800">
                      {item.name}
                    </p>
                    <p>&#8377; {item.price}</p>
                  </div>

                  <div className="flex justify-around mt-5">
                    <p className="flex w-2/4 h-9 items-center  justify-around border border-black-300  cursor-pointer font-bold">
                      <span
                        className="minus"
                        onClick={() =>
                          toggleCartItemQuanitity(item._id, "dec", qty)
                        }
                      >
                        <AiOutlineMinus />
                      </span>
                      <span className="num">
                        {item.quantity ? item.quantity : 1}
                      </span>
                      <span
                        className="plus"
                        onClick={() =>
                          toggleCartItemQuanitity(item._id, "inc", qty)
                        }
                      >
                        <AiOutlinePlus />
                      </span>
                    </p>

                    <button
                      type="button"
                      className="text-red-700"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {cartItems.length >= 1 && (
          <div className="absolute bottom-10 md:right-24  right-8">
            <div className="flex justify-between">
              <p className="font-semibold text-lg text-sky-800 ">
                Subtoatal :{" "}
              </p>
              <p className="font-semibold text-lg text-sky-800">
                &#8377; {totalPrice}
              </p>
            </div>
            <button
              className="text-center md:w-96  w-80 bg-orange-700 md:h-10 h-8 text-orange-200 m-auto transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-orange-600 duration-300 rounded-2xl mt-5  "
              type="button"
              onClick={makePayment}
            >
              PAY WITH STRIPE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
