import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../Features/ProductSlice";
import Update from "../UpdateModal/Update";
import { addToCart } from "../../Features/CartSlice";

const Cards = ({ image, name, description, quantity, price, type, idProduct, producto }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [productObject, setProductObject] = useState(null);
  const [textshow, setTextShow] = useState(false);
 const cart = useSelector((state) => state.cart.cart);

  const handleShow = (payload) => {
    setShow(true);
    setProductObject(payload);
  };

  const handleDelete = () => {
    dispatch(deleteProduct(idProduct));
  };

  const handleToggleText = () => {
    setTextShow((prevShow) => !prevShow);
  };
  const handleAddToCart = () => {
    dispatch(addToCart(producto));
    
  };

  return (
    <div>
      <Card style={{ width: "18rem", height: "41rem" }}>
    
        <Card.Img variant="top" style={{ height: "25rem" }} src={image} />
        <Card.Body>
          
          <Card.Title>{name}</Card.Title>
          <Card.Text
            style={{
              overflow: "hidden",
              maxHeight: textshow ? "none" : "50px",
              whiteSpace: textshow ? "normal" : "nowrap",
              textOverflow: textshow ? "none" : "ellipsis",
              cursor: "pointer",
            }}
            onClick={handleToggleText}
          >
            {description}
          </Card.Text>
          <Card.Text>Quantity: {quantity}</Card.Text>
          <Card.Text>Price: {price}</Card.Text>
          <div className=" btnscard">
            {type === "display" && <Button variant="primary" onClick={() => handleShow(producto)}>Edit</Button>}
            {type === "display" && (
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            )}
          </div>
          {type === "userdisplay" && <Button variant="primary" onClick={handleAddToCart}>Add to Cart</Button>}
        </Card.Body>
        <Update show={show} handleClose={() => setShow(false)} data={productObject} type="update" handleShow={handleShow} />
      </Card>
    </div>
  );
};

export default Cards;
