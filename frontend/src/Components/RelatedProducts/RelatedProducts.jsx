import React, { useState, useEffect } from "react";
import "./RelatedProducts.css";
import Item from "../Item/Item";

const RelatedProducts = ({ category, id }) => {
  const [relatedProducts, setrelatedProducts] = useState([]);

  useEffect(() => {
    console.log("Category:", category);
    fetch("https://quikmart-iyy6.onrender.com/relatedproducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set headers
      },
      body: JSON.stringify({ category }), // Send the category in the request body
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("Related products data:", data); // Log the response data
        setrelatedProducts(data);
      });
  }, [category]);

  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {relatedProducts.map((item, index) => {
          return (
            <Item
              key={index}
              id={item.id}
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

export default RelatedProducts;
