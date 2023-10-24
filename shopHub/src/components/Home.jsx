import MainBanner from "./MainBanner";
import FooterBanner from "./FooterBanner";
import {client} from "../../lib/client";
import { useFetchDeatils } from "../hooks/useFetchDetails";
import Product from "./Product"
import Navbar from "./Navbar";
import Footer from "./Footer";




const Home = () => {
 useFetchDeatils(client);
 
  return (
   <>
    
    <Navbar/>
    <div className=" md:p-10 h-screen">
    <MainBanner/>
      <div className="flex flex-col items-center font-mono  ">
        <h2 className="text-2xl  font-extrabold text-orange-400">Best Selling Products</h2>
        <p>Latest Mobile Phones For You</p>
      </div>
      <div className="w-full flex justify-around items-center  flex-wrap md:flex-nowrap">
       <Product/>
      </div>
      <FooterBanner/>
      <Footer/>
      </div>
     </>
  
  )
}

export default Home