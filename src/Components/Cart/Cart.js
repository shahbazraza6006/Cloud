import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { useSelector } from "react-redux";
import "./Cart.css";
const Cart = ({ show, handleClose }) => {
  const cart = useSelector((state) => state.cart.cart);

  return (
    <div>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Card>
            <Card.Body>
              <Card.Text>
                {cart.map((item) => (
                  <div className="cart">
                    <div className="cartimg">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="cartname">
                      <h3>{item.name}</h3>
                    </div>
                    <div className="cartprice">
                      <h3>{item.price}</h3>
                    </div>
                  </div>
                ))}
              </Card.Text>
            </Card.Body>
          </Card>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
          <Button variant="primary" className="checkout">CheckOut</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Cart;
