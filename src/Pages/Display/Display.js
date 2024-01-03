import React from "react";
import Cards from "../../Components/Cards/Cards";
import pic1 from "../../assets/pic1.jpg";
import Card from "react-bootstrap/Card";
import { useSelector, useDispatch } from "react-redux";
import "./Display.css";
import { getProduct } from "../../Features/ProductSlice.js";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState } from "react";

const Display = () => {
  
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  console.log("Display Page", products);
  useEffect(() => {
    dispatch(getProduct()).catch((error) => {
      console.error("Error fetching products:", error);
    });
  }, []);

  return (
    <div className="display-container">
      <h1>Display {}</h1>
      <Card>
        <Card.Header><a className="backa" href="/admin">Back</a></Card.Header>
        <div className="cardinging">
          {products.length > 0 ? (
            products.map((product) => {
              return (
                <Cards
                  key={product._id}
                  image={`http://localhost:4000/${product.image}`}
                  name={product.name}
                  description={product.description}
                  quantity={product.quantity}
                    price={product.price}
                  type="display"
                  idProduct={product._id}
                  producto={product}
                />
              );
            })
          ) : (         
         <Spinner variant="secondary" className="spinor" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner> 
            
          )}
        </div>
      </Card>
    </div>
  );
};

export default Display;
