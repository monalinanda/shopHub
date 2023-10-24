import React from "react";
import { Link } from "react-router-dom";
import { urlFor } from "../../lib/client";
import { useSelector } from "react-redux";

const MainBanner = () => {
  const banner = useSelector((store) => store.sanityData.banner);
  const products = useSelector((store) => store.sanityData.products);
  if (!banner) return;
  return (
    <div className=' md:min-w-0" bg-gradient-to-r from-slate-400 to-slate-900  h-1/2 ml-auto mr-auto md:mt-10 md:rounded-3xl'>
      <div className="relative w-full h-full   md:p-24 ">
        <p className="absolute  md:text-5xl  text-xl uppercase tracking-wider font-serif font-semibold  left-1/4 md:top-24 top-12 ">
          {banner[0]?.smallText}
        </p>
        <h3 className="absolute  top-20 left-1/4 font-serif  md:text-6xl text-lg font-semibold text-orange-900 italic  md:top-40 ">
          {banner[0]?.midText}
        </h3>
        <img
          className="absolute md:top-0 bottom-0  w-1/2  md:w-2/6  md:h-full right-0   h-3/5"
          src={urlFor(banner[0]?.image).url()}
        />

        <div>
          <Link
            to={`product/${products[3].slug.current}`}
            state={{ slug: products[3].slug.current }}
          >
            <button
              type="button"
              className="absolute z-10 top-56 md:top-64 left-14 md:left-1/3 text-orange-200 bg-orange-700  w-32 h-14 text-lg rounded-full font-bold"
            >
              {banner[0]?.buttonText}
            </button>
          </Link>

          <div className="absolute md:w-1/2  bottom-10 hidden md:block">
            <p className="text-justify font-medium text-xs  text-orange-200 italic ">
              "{banner[0]?.desc}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
