import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const [errorMessage, setErrorMessage] = useState("");

  const Add_Product = async () => {
    try {
      console.log(productDetails);

      let responseData;
      let product = productDetails;
      let formData = new FormData();
      formData.append("product", image);

      await fetch("https://quickbuy-b8c7.onrender.com/upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      })
        .then((resp) => resp.json())
        .then((data) => {
          responseData = data;
          console.log("DAta Updated", responseData);
        });
      console.log("Response Status:", responseData.success);

      if (responseData.success) {
        product.image = responseData.image_url;
        console.log(product);
        await fetch("https://quickbuy-b8c7.onrender.com/addproduct", {
          method: "POST",
          headers: {
            // Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            data.success ? console.log("Product Added") : console.log("Failed");
          });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message);
      alert(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          type="text"
          name="name"
          value={productDetails.name}
          onChange={changeHandler}
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-itemfield">
        <p>Product description</p>
        <input
          type="text"
          name="description"
          value={productDetails.description}
          onChange={changeHandler}
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            type="number"
            name="old_price"
            value={productDetails.old_price}
            onChange={changeHandler}
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            type="number"
            name="new_price"
            value={productDetails.new_price}
            onChange={changeHandler}
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product category</p>
        <select
          value={productDetails.category}
          name="category"
          className="add-product-selector"
          onChange={changeHandler}
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <p>Product image</p>
        <label htmlFor="file-input">
          <img
            className="addproduct-thumbnail-img"
            src={!image ? upload_area : URL.createObjectURL(image)}
            alt=""
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          accept="image/*"
          hidden
        />
      </div>
      {errorMessage && (
        <div className="error-message">
          <p>Error: {errorMessage}</p>
        </div>
      )}
      <button className="addproduct-btn" onClick={Add_Product}>
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
