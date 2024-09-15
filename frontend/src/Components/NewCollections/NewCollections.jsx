import React, { useEffect, useState } from "react";
import "./NewCollections.css";
import Item from "../Item/Item";
const NewCollections = () => {
  const [new_collection, setNewCollection] = useState([]);

  useEffect(() => {
    fetch("https://quickbuy-b8c7.onrender.com/newcollections")
      .then((resp) => resp.json())
      .then((data) => setNewCollection(data));
  }, []);

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />

      <div className="collections">
        {new_collection.map((item, index) => {
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

export default NewCollections;
