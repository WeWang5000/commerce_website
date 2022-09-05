import React, { createContext, useContext, useState } from "react";

const Context = createContext();


//!important context.js is global state which make the number active and passible all around the app, ex: good use with number, create global state is very helpful
export const StateContext = ({ children }) => {
  //Ourt application state
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [qty, setQty] = useState(1);
  const [totalQuantities, setTotaltotalQuantities] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  //Increase product countity
  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  //Decrease product quantity
  const decreaseQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  //Add Product To Cart
  const onAdd = (product, quantity) => {
    //Total price
    setTotalPrice(prevTotalPrice => prevTotalPrice + quantity * product.price)

    //Increase the total quantity
    setTotaltotalQuantities(prevTotal => prevTotal + quantity)

    //Check if product is in the cart
    const exist = cartItems.find((item) => item.slug === product.slug);
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? { ...exist, quantity: exist.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }
  };

  //Remove Product
  const onRemove = (product, quantity) => {
    //Total price
    setTotalPrice(prevTotalPrice => prevTotalPrice - quantity * product.price)

    //Decrease the total quantity
    setTotaltotalQuantities(prevTotal => prevTotal - quantity)

    //Check if product is in the cart
    const exist = cartItems.find((item) => item.slug === product.slug);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.slug !== product.slug))
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? { ...exist, quantity: exist.quantity - quantity}
            : item
        )
      )
    }
  };


  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        qty,
        increaseQty,
        decreaseQty,
        cartItems,
        onAdd,
        onRemove,
        totalQuantities,
        totalPrice,
        setQty
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
