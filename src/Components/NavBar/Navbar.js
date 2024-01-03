import React from "react";

import './navbar.css'
import { useState } from "react";
import Cart from "../Cart/Cart";
import { useSelector} from "react-redux";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
   
    navigate("/login");
    window.location.reload();
    
  };
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const cart = useSelector((state) => state.cart.count);
    const cartos = useSelector((state) => state.cart.cart);
    console.log(cartos)
   console.log(cart)

   
    const handleClose = () => setShow(false);
    return(
        <div className="mainnav">
          <div className="left" >
            <h2><span className="M">M</span>ale Fashion</h2>
          </div>
          <div className="right">
            <ul>
                <li><a href="#p" id="h">Home</a></li>
                <li ><a id="h"  href="#p">Products</a></li>
                
                {/* <li><img className="imgcart" src={carts} /></li> */}
               
                
                <li><a  href="/cart" >Cart ({cart}) </a></li>
       

            </ul>
          </div>
          <div className="rights">
          <li><a href="/" onClick={handleLogout}>Sign Out</a></li>
          
          </div>
          <Cart show={show}   handleClose={handleClose} />
    
        </div>
    )
}

export default Navbar;