import React from "react";
import Card from "react-bootstrap/Card";
import "./FinalCart.css";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearlocal
} from "../../Features/CartSlice";
import { Button } from "react-bootstrap";
import { totalbillCount } from "../../Features/CartSlice";
import { useNavigate } from "react-router-dom";
import PaymentForm from "../Payment/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
const FinalCart = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const count = useSelector((state) => state.cart.count);
  const quan = useSelector((state) => state.cart.quantity);
  const bills = useSelector((state) => state.cart.totalbill);
  const billa = localStorage.getItem("totalbill");
  console.log("cartcount", count);
  console.log("bills", billa);

  const [textshow, setTextShow] = useState(false);
  const handleToggleText = () => {
    setTextShow((prevShow) => !prevShow);
  };
  const [show, setshow] = React.useState(false);
  const handleShow = (item) => {
    dispatch(totalbillCount(item));
    setshow(true);
  };
  const handleClose = () =>{ setshow(false)
   window.location.reload(); 
  };
  const dispatch = useDispatch();

  const stripePromise = loadStripe(
    "pk_test_51N9QRVBquH5sItVXMWlOhSp0cfFec2SA9xr53X0R7Q5rjn6uWjLNuidJsfG90BZHnd46CJdeJs529qRR92kMBciF00WvzvsX6S"
  );
  const handleIncrement = (item) => {
    dispatch(incrementQuantity(item));
  };
  const handleClear = () => {
    dispatch(clearlocal());
  };
  const handleDecrement = (item) => {
    dispatch(decrementQuantity(item));
    
  };

  const handleremove = (item) => {
    dispatch(removeFromCart(item));
 
  };
  let mybill=0;
  
  cart.map((item) => mybill = bills);
console.log("mybill",mybill);
  let subtotals = 150;
  let totalPrice = 0;
  const buy = bills + subtotals;
  return (
    <div>
      <h1>FinalCart</h1>
      <div className="carting">
        <div className="rightcart">
          <Card>
            <Card.Header>
              <a href="/">Back</a>
              <div className="clearbtn">
              {
                bills === 0 ? <p> </p> :  <button onClick={handleClear}>Clear Cart</button>
              }
              </div>
              
             
            </Card.Header>
            <Card.Body>
              <Card.Text>
                {cart.length === 0 && <h1>Cart is Empty</h1>}
                {console.log("cart of final cart", cart)}
                {cart &&
                  cart.map((item) => (
                    <div className="cart" key={item.id}>
                     <br></br>
                      <div className="cartdata">
                       
                        <div className="cartimg">

                          <img
                            className="imgcart"
                            src={`http://backendcloud-env.eba-igk2dppf.us-east-1.elasticbeanstalk.com//${item.image}`}
                            alt="image"
                          />
                          <div className="mymy">
                            <div className="detailcart">
                              <div className="cartname">
                                <h3
                                  style={{
                                    overflow: "hidden",
                                    maxHeight: textshow ? "none" : "50px",
                                    whiteSpace: textshow ? "normal" : "nowrap",
                                    textOverflow: textshow
                                      ? "none"
                                      : "ellipsis",
                                    cursor: "pointer",
                                  }}
                                >
                                  <span>Name:</span> {item.name}
                                </h3>
                              </div>
                              <div className="cartdescription">
                                {/* <h3><span>Quantity :</span> {item.quantity}</h3> Display the quantity */}
                              </div>
                              <div>
                                <h3
                                  style={{
                                    overflow: "hidden",
                                    maxHeight: textshow ? "none" : "50px",
                                    whiteSpace: textshow ? "normal" : "nowrap",
                                    textOverflow: textshow
                                      ? "none"
                                      : "ellipsis",
                                    cursor: "pointer",
                                  }}
                                  onClick={handleToggleText}
                                >
                                  {" "}
                                  <span>Description :</span>{" "}
                                  {textshow
                                    ? item.description
                                    : item.description.slice(0, 25) + "..."}
                                </h3>
                              </div>
                              <div className="cartprice">
                                <h3
                                  style={{
                                    overflow: "hidden",
                                    maxHeight: textshow ? "none" : "50px",
                                    whiteSpace: textshow ? "normal" : "nowrap",
                                    textOverflow: textshow
                                      ? "none"
                                      : "ellipsis",
                                    cursor: "pointer",
                                  }}
                                >
                                  <span>Price : </span> {item.price}
                                </h3>
                              </div>
                              <div className="btnincre">
                                <button onClick={() => handleIncrement(item)}>
                                  +
                                </button>
                                <p>{item.quantity}</p>
                                <button onClick={() => handleDecrement(item)}>
                                  -
                                </button>
                                {/* <p>{(price *= item.price)}</p> */}
                              </div>
                              <br></br>
                            </div>
                            <div>
                              
                              <div>
                                <Button className="btnremove"
                                  varient="danger"
                                  onClick={() => handleremove(item)}
                                >
                                  {" "}
                                  Remove from Cart
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="leftcart">
          <Card>
            <Card.Body>
              <Card.Text>
                <div className="billsdiv">
                  <h2>Bill</h2>
                 
                  {/* <h1>test {JSON.stringify(cart)}</h1> */}
                  
                 
                 

                 
                  <p>Price : { bills   }</p>
                  <p>Shipping: {bills=== 0 ? "No Charges" : subtotals}</p>
                  <p>
                    Total:{" "}
                    {bills + subtotals === 150
                      ? "No Bill"
                      : bills + subtotals }
                  </p>
                 
                  {bills + subtotals === 150 ? (
                    <h2>No Bill Found</h2>
                  ) : (
                    <button
                      onClick={() =>
                        handleShow(
                          count > 0
                            ?buy
                            : buy
                        )
                      }
                    >
                      Buy Now
                    </button>
                  )}
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
      <Elements stripe={stripePromise}>
        <PaymentForm
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
        />
      </Elements>
    </div>
  );
};

export default FinalCart;
