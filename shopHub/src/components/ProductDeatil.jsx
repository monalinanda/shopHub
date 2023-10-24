import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Product from "./Product";
import { useProductDeatils } from "../hooks/useProductDeatils";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { urlFor } from "../../lib/client";
import { client } from "../../lib/client";
import { useFetchDeatils } from "../hooks/useFetchDetails";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { useStateContext } from "../utils/StateContext";

const ProductDeatil = () => {
  const location = useLocation();
  const { slug } = location.state;
  useProductDeatils(slug);
  useFetchDeatils(client);
  const productDetails = useSelector(
    (store) => store.sanityData.productDetails
  );
  const products = useSelector((store) => store.sanityData.products);
  const [index, setIndex] = useState(0);
  const { increaseQty, dicreaseQty, qty, onAdd } = useStateContext();
  if (!productDetails) return;

  return (
    <div>
      <Navbar />
      <div className=" md:pl-60 mt-10  p-5">
        <div className="md:flex">
          <div className="md:w-3/5">
            <img
              className="md:w-auto w-3/5 md:bg-black  rounded-2xl  h-64  md:h-96 m-auto md:m-0"
              src={urlFor(productDetails[0]?.image[index]).url()}
            />
            <div class=" md:w-5/6  bg-gray-100 max-h-screen overflow-x-auto flex  mt-5 rounded-lg">
              {productDetails[0].image.map((item, i) => (
                <img
                  className="md:w-24 bg-slate-300 m-5 cursor-pointer h-36 md:h-auto"
                  src={urlFor(item).url()}
                  onMouseEnter={() => setIndex(i)}
                />
              ))}
            </div>
          </div>
          <div className="desc">
            <h1 className=" font-bold  text-2xl m-2">
              {productDetails[0].name}
            </h1>
            <div className="flex items-center ">
              <div className="flex text-orange-700 m-2">
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
              </div>
              <p className="font-light text-gray-500">(20)</p>
            </div>
            <h4 className="m-2">Specifications</h4>
            <p className="  md:w-1/2 text-justify  font-medium  text-sm md:break-all text-gray-700 m-2">
              {productDetails[0].details}
            </p>
            <p className=" font-extrabold text-xl  text-black m-2">
              {" "}
              Price : &#8377; {productDetails[0].price}
            </p>
            <div className="flex items-center">
              <h3>Quantity:</h3>
              <p className="flex w-1/5 h-9 items-center  justify-around border border-gray-300 ml-5 cursor-pointer font-bold">
                <span className="minus" onClick={dicreaseQty}>
                  <AiOutlineMinus />
                </span>
                <span className="num">{qty}</span>
                <span className="plus" onClick={increaseQty}>
                  <AiOutlinePlus />
                </span>
              </p>
            </div>
            <div className="flex  mt-5">
              <button
                type="button"
                className=" md:w-52 md:h-14 text-orange-700 border border-orange-700 mr-5"
                onClick={() => onAdd(productDetails[0], qty)}
              >
                Add to Cart
              </button>
              <button className=" md:w-52 md:h-14 bg-orange-700 " type="button">
                Buy Now
              </button>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-2xl  font-extrabold text-orange-400 text-center">
            You may also Like
          </h1>
          {products && (
            <div className="w-full flex justify-around items-center  flex-wrap md:flex-nowrap">
              <Product />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDeatil;
