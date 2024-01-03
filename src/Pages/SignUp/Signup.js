import React from "react";
import Card from "react-bootstrap/Card";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createUser } from "../../Features/UserSlice";
import { useState } from "react";
import "./Signup.css";

const Signup = () => {
   const [error, seterror] = useState("");
    const [users,setUsers] = useState({
        name:"",
        email:"",
        phonenumber:"",
        address:"",
        gender: "",
        username:"",
        password:"",
        type:"user"
    });
    const dispatch = useDispatch();
    const handleChange = (e) => {
        e.preventDefault();
        setUsers({...users,[e.target.name]:e.target.value});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = {};
        let hasError = false;
        if (!users.name) {
          errors.name = "Name is required";
          hasError = true;
        }
        if (!users.email) {
          errors.email = "Email is required";
          hasError = true;
        }
        if (!users.phonenumber) {
          errors.phonenumber = "Phone Number is required";
          hasError = true;
        }
        else if (users.phonenumber.length < 7) {
          errors.phonenumber = "PhoneNumber must include 11 characters ";
          hasError = true;
        }
        if (!users.address) {
          errors.address = "Address is required";
          hasError = true;
        }
        if(!users.gender){
          errors.gender = "Gender is Required";
          hasError= true;
        }
        if (!users.username) {
          errors.username = "Username is required";
          hasError = true;
        }
        else if (users.username.length < 7) {
          errors.username = "Username must be at least 7 characters long";
          hasError = true;
        }
        if (!users.password) {
          errors.password = "Password is required";
          hasError = true;
        }
        else if (users.password.length < 7) {
          errors.password = "Password must be at least 7 characters long";
          hasError = true;
        }
        else if (!/[A-Z]/.test(users.password)) {
          errors.password = "Password must contain at least one capital letter";
          hasError = true;
        } else if (!/[0-9]/.test(users.password)) {
          errors.password = "Password must contain at least one number";
          hasError = true;
        } else if (!/[^A-Za-z0-9]/.test(users.password)) {
          errors.password = "Password must contain at least one special character";
          hasError = true;
        }
        if (hasError) {
         seterror(errors);
          return;
        }
        
        dispatch(createUser(users));
    }
  return (
    <div className="total">
      <h1>Signup</h1>
      <Card className="signcard">
        <Card.Body>
          <Card.Text>
            <Row className="signrow">
              <Col>
                <p>Name : </p>
              </Col>
              <Col>
                <Form.Control type="text" name="name" placeholder="Enter Name" onChange={handleChange} />
                { error.name && <p className="error">{error.name}</p> }
              </Col>
            </Row>
            <Row className="signrow">
                <Col>
                <p>Email : </p>
                </Col>
                <Col>
                <Form.Control type="email" name="email" placeholder="Enter Email" onChange={handleChange} />
                { error.email && <p className="error">{error.email}</p> }
                </Col>
            </Row>
            <Row className="signrow">
                <Col>
                <p>Phone : </p>
                </Col>
                <Col>
                <Form.Control type="text" name="phonenumber" placeholder="Enter Phone" onChange={handleChange}/>
                { error.phonenumber && <p className="error">{error.phonenumber}</p> }
                </Col>
            </Row>
            <Row className="signrow">
                <Col>
                <p>Address : </p>
                </Col>
                <Col>
                <Form.Control type="text" name="address" placeholder="Enter Address" onChange={handleChange} />
                { error.address && <p className="error">{error.address}</p> }
                </Col>
            </Row>
            <Row className="signrow">
                <Col>
                <p>Gender : </p>
                </Col>
                <Col>
                <Form.Control type="text" name="gender" placeholder="Enter Gender" onChange={handleChange}/>
                {error.gender && <p className="error">{error.gender}</p>}
                </Col>
            </Row>

            <Row className="signrow">
                <Col>
                <p>Username : </p>
                </Col>
                <Col>
                <Form.Control type="text" name="username" placeholder="Enter Username" onChange={handleChange}/>
                { error.username && <p className="error">{error.username}</p> }
                </Col>
            </Row>
            <Row className="signrow">
                <Col>
                <p>Password : </p>
                </Col>
                <Col>
                <Form.Control type="password" name="password" placeholder="Enter Password" onChange={handleChange}/>
                { error.password && <p className="error">{error.password}</p> }
                </Col>
            </Row>
            <Row  hidden="true" value="user" name="type" onChange={handleChange} ></Row>
            <Row className="signrow">
                <Col>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
                </Button>
                </Col>
            </Row>
          </Card.Text>
          <Card.Text>
            <Row className="signrow">
              <Col>
                <p>Already have an account? <a href="/login">Login</a></p>
              </Col>
            
               
             
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Signup;
