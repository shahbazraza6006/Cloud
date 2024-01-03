import React from "react";

import Card from "react-bootstrap/Card";
import Offcanvas from "react-bootstrap/Offcanvas";
import Spinner from "react-bootstrap/Spinner";
import Cards from "../../Components/Cards/Cards";
import Carousel from "react-bootstrap/Carousel";
import { useState } from "react";
import pic1 from "../../assets/pic1.jpg";
import pic2 from "../../assets/pic2.jpg";
import pic4 from "../../assets/pic4.jpg";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Navbar from "../../Components/NavBar/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Cart from "../../Components/Cart/Cart";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../Features/ProductSlice.js";
import { useEffect } from "react";
import "./home.css";
const Home = () => {
  const [show, setShow] = useState(false);
  const title = process.env.REACT_APP_TITLE;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  console.log("Display Page", products);
  useEffect(() => {
    dispatch(getProduct()).catch((error) => {
      console.error("Error fetching products:", error);
    });
  }, []);
  return (
    <div>
      <Navbar />
   
      <div className="slidemain" id="h">
        <div>
          <Carousel className="caraousel">
            <Carousel.Item>
              <Image
                className="imgs"
                intervals={300}
                rounded
                src={pic1}
                alt="pic1"
              />
              <Carousel.Caption className="captions">
                <h2>HeadPhone</h2>
                <h6>
                  Wide, natural soundstage Feather-light comfort Leather/metal
                  premium finish Detachable 3 m cable
                </h6>
            
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Image
                className="imgs"
                intervals={300}
                rounded
                src={pic2}
                alt="pic2"
              />
              <Carousel.Caption className="captions">
                <h2>K800 Ultra</h2>
                <h6>
                  K800 Ultra Smart Watch Series 8 49mm 1.99" HD Big Screen Men
                  Women Smartwatch Magnetic Charging Bluetooth Call Watch.
                </h6>
              
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Image
                className="imgs"
                intervals={300}
                rounded
                src={pic4}
                alt="pic3"
              />
              <Carousel.Caption className="captions">
                <h2>Nike Shoes</h2>
                <h6>Nike Men's Sneaker, Black/Black/Anthracite, 11.5</h6>
             
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
      <div className="products" id="p">
        <h1>Products</h1>
        <div className="cardproducts">

        
      
     
     
        <div className="cardinging myhomecard">
          
          {products.length > 0 ? (
            products && products.map((product) => {
              return (
                <Cards
                  key={product._id}
                  image={`http://localhost:4000/${product.image}`}
                  name={product.name}
                  description={product.description}
                  quantity={product.quantity}
                    price={product.price}
                  type="userdisplay"
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
      
    </div>
        </div>
      </div>
   
  );
};

export default Home;
