import { useEffect } from "react";
import { addSanityProducts, addSanityBanner } from "../utils/sanityDataSlice";
import { useDispatch } from "react-redux";

export const useFetchDeatils = (client) => {
  const dispatch = useDispatch();

  const getSanityData = async () => {
    const query = '*[_type == "product"]';
    const products = await client.fetch(query);
    dispatch(addSanityProducts(products));

    const bannerQuery = '*[_type == "banner"]';
    const bannerDeatils = await client.fetch(bannerQuery);
    dispatch(addSanityBanner(bannerDeatils));
  };

  useEffect(() => {
    getSanityData();
  }, [client]);
};
