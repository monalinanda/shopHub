import { useEffect } from "react";
 import { addProductDetails } from "../utils/sanityDataSlice";
import { useDispatch } from "react-redux";
import {client} from "../../lib/client";
import { useSelector } from "react-redux";

export const useProductDeatils = (slug)=>{
    const dispatch = useDispatch();
    //const productDetails = useSelector((store=> store.sanityData.productDetails));

    const getProductDetails = async()=>{
        const query = `*[_type == "product" && slug.current == '${slug}']`
        const productDetails = await client.fetch(query);
        dispatch(addProductDetails(productDetails ))
    }
   

    useEffect(()=>{
        getProductDetails()
    },[slug])
}