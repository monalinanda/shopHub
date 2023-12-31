import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addProductDetails } from "../utils/sanityDataSlice";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  let foundProduct;
  let index;

  const increaseQty = () => {
    setQty((prevQt) => prevQt + 1);
  };
  const dicreaseQty = () => {
    setQty((prevQt) => {
      if (prevQt - 1 <= 1) return 1;
      return prevQt - 1;
    });
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItems(updatedCartItems);
    } else {
      //product.quantity = quantity;
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const toggleCartItemQuanitity = (id, value, qtyNum) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((newItem) => newItem._id !== id);

    if (value === "inc") {
      setCartItems([
        ...newCartItems,
        {
          ...foundProduct,
          quantity: foundProduct.quantity
            ? foundProduct.quantity + 1
            : qtyNum + 1,
        },
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity ? foundProduct.quantity > 1 : qtyNum > 1) {
        setCartItems([
          ...newCartItems,
          {
            ...foundProduct,
            quantity: foundProduct.quantity
              ? foundProduct.quantity - 1
              : qtyNum - 1,
          },
        ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        onAdd,
        increaseQty,
        dicreaseQty,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        toggleCartItemQuanitity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
