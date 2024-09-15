import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);

  const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < 300 + 1; i++) {
      cart[i] = 0;
    }
    return cart;
  };

  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    fetch(`https://quikmart-iyy6.onrender.com/allproducts`)
      .then((res) => res.json())
      .then((data) => setAll_Product(data));

    if (localStorage.getItem("auth-token")) {
      fetch(`https://quikmart-iyy6.onrender.com/getcart`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(),
        body: "",
      })
        .then((resp) => resp.json())
        .then((data) => {
          setCartItems(data);
        });
    }
  }, []);

  const addToCart = (itemId) => {
    if (!localStorage.getItem("auth-token")) {
      alert("Please Login");
      return;
    }
    setCartItems((prev) => {
      const newCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
      // console.log(newCart);
      return newCart;
    });
    if (localStorage.getItem("auth-token")) {
      fetch(`https://quikmart-iyy6.onrender.com/addtocart`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((resp) => resp.json())
        .then((data) => console.log(data));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = {
        ...prev,
        [itemId]: prev[itemId] > 0 ? prev[itemId] - 1 : 0,
      };
      // console.log(newCart);
      return newCart;
    });

    if (localStorage.getItem("auth-token")) {
      fetch(`https://quikmart-iyy6.onrender.com/removefromcart`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((resp) => resp.json())
        .then((data) => console.log(data));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        try {
          let itemInfo = all_product.find(
            (product) => product.id === Number(item)
          );
          totalAmount += cartItems[item] * itemInfo.new_price;
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        try {
          let itemInfo = all_product.find(
            (product) => product.id === Number(item)
          );
          totalItem += itemInfo ? cartItems[item] : 0;
        } catch (error) {}
      }
    }
    return totalItem;
  };
  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartItems,
    getTotalCartAmount,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
