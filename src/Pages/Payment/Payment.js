import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Payment.css';
import { useSelector } from 'react-redux/';
import Modal from 'react-bootstrap/Modal';
import { paymentdetailsdone } from '../../Features/CartSlice';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
const PaymentForm = ({show,handleClose}) => {
 const navigate = useNavigate();
  const [currency, setCurrency] = useState('USD');
  const [description, setDescription] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const bill = useSelector((state) => state.cart.totalbill);
  const amount = bill;
 const [error,seterror] = useState(null);
    
   

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
   const errors = {};
   let hasError = false;
  
   
    if (!description) {
        errors.description = "Description is required";
        hasError = true;
        }
    if (hasError) {
        seterror(errors);
        return;
    }



    try {

      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        console.error(error);
      } else {
     console.log(amount)
        const paymentDetails = {
          amount,
          currency,
          description,
          paymentMethodId: paymentMethod.id,
        };
  console.log("sata",paymentDetails)
       dispatch(paymentdetailsdone(paymentDetails));
navigate("/")
        
      }
    } catch (error) {
      console.error('Payment processing error:', error.message);
 
    }
  };
  

  return (
    <div className='paymentfarm'>
        <Modal show={show} onHide={handleClose}>
        <form >
      <div className='mydov'>
        <h2 style={{marginLeft:"200px"}}>CheckOut</h2>
        <label style={{margin:"10px"}} htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={bill}
         
        />
       
      </div>
      <div>
        <label style={{margin:"10px"}} htmlFor="currency">Currency:</label>
        <select
        style={{ marginLeft:"22px" }}
       
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
         
        </select>

      </div>
      <div className='mydov'>
        <label style={{margin:"10px"}} htmlFor="description">Description:</label>
        <input style={{marginLeft:"5px"}}
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {error && <p className="error">{error.description}</p>}
      </div>
      <div className='card-element-container'>
        <label  style={{margin:"10px"}} htmlFor="cardElement">Card Details:</label>
        <CardElement
          id="cardElement"
          style={{margin:"10px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}
          options={{
            style: {
                
              base: {
                theme: 'dark',
                fontSize: '19px',
              
                color: '#424770',
                
                '::placeholder': {
                  color: '#aab7c4',
                  
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
            hidePostalCode: true,
          }}
        />
      </div>
      
      <button style={{marginLeft:"200px",marginBottom:"20px"}} onClick={handleSubmit} type="submit">Pay</button>
    </form>
        </Modal>
    </div>
    
  );
};

export default PaymentForm;
