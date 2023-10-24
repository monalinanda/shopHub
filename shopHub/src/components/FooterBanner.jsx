import React from "react";
import { Link } from "react-router-dom";
import { urlFor } from "../../lib/client";
import { useSelector } from "react-redux";

const FooterBanner = () => {
  const banner = useSelector((store) => store.sanityData.banner);
  const products = useSelector((store=> store.sanityData.products));

  if (!banner) return;
  return (
    <div className="relative  md:min-w-0 bg-gradient-to-r from-orange-400 to-orange-900 m-auto text-white  h-1/2 ml-auto mr-auto md:mt-10 md:rounded-3xl">
      <div className="flex justify-between">
        <div className="md:absolute   md:left-1/4 md:top-1/4">
          <p className=" text-base font-extrabold">{banner[0].discount}</p>
          <h3 className="text-3xl uppercase tracking-wider  font-serif font-semibold">
            {banner[0].largeText1}
          </h3>
          <h3 className="text-5xl uppercase tracking-wider font-serif font-semibold">
            {banner[0].largeText2}
          </h3>
          <p className=" text-xl font-extrabold text-orange-900">
            {banner[0].saleTime}
          </p>
        </div>
        <div>
        <Link to={`product/${products[3].slug.current}`} state={{slug :products[3].slug.current }}>
            <button
              type="button"
              className="absolute z-10 top-96  md:top-64 left-0 md:left-1/4 text-orange-200 bg-orange-700  w-32 h-14 text-lg rounded-full font-bold"
            >
              {banner[0]?.buttonText}
            </button>
          </Link>
        </div>

        <img
          className="absolute   md:w-1/4   md:right-0  md:h-full md:origin-top-left md:rotate-12 "
          src={urlFor(banner[0]?.image).url()}
        />
      </div>
    </div>
  );
};

export default FooterBanner;
