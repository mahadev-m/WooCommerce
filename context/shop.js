import React, { useState, useEffect } from "react";

export const ShopContext = React.createContext();

const ShopContextProvider = (props) => {
  const [store, setStore] = useState([]);
  const [value, setValue] = useState(0);
  useEffect(() => {
    setValue(store.reduce((acc, product) => acc + product.quantity, 0));
  }, [store, value]);
  // Decrement Function
  const Decrement = (product) => {
    setStore((prevStore) =>
      prevStore.find(({ id }) => id === product.id)?.quantity > 1
        ? prevStore.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        : prevStore.filter(({ id }) => id !== product.id)
    );
  };
  // Increment Function
  const addProductToCart = (product) =>
    !store.find(({ id }) => id === product.id)
      ? (setStore((prevData) => [...prevData, { ...product, quantity: 1 }]),
        setValue(value + 1))
      : setStore((prevStore) =>
          prevStore.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
  return (
    <ShopContext.Provider value={{ addProductToCart, Decrement, value, store }}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
