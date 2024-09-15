import React, { useEffect, useState } from "react";
import "./Popular.css";
import Item from "../Item/Item";

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetch("https://quickbuy-b8c7.onrender.com/popularinmen")
      .then((resp) => resp.json())
      .then((data) => setPopularProducts(data));
  }, []);

  return (
    <div className="popular">
      <h1>POPULAR IN MEN</h1>
      <hr />

      <div className="popular-item">
        {popularProducts.map((item, index) => {
          return (
            <Item
              id={item.id}
              key={index}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
