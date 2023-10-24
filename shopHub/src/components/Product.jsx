import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { urlFor } from "../../lib/client";

const Product = () => {
  const products = useSelector((store) => store.sanityData.products);
  if (!products) return;
  return (
    <>
      {products?.map((product) => (
        <div key={product._id} className="md:h-80 m-4 md:p-10 w-24 md:w-auto">
          <Link
            to={`/product/${product.slug.current}`}
            state={{ slug: product.slug.current }}
          >
            <img
              className=" bg-slate-200  h-full rounded-md"
              src={urlFor(product.image[0]).url()}
              alt={product.name}
            />

            <p>{product.name}</p>
            <p>&#8360; {product.price}</p>
          </Link>
        </div>
      ))}
    </>
  );
};

export default Product;
