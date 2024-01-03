import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Features/UserSlice";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        seterror("Please enter username and password.");
        return;
      }

      const token = await dispatch(loginUser({ username, password }));
      
      console.log(token);
      const userType = localStorage.getItem("type");
      console.log(userType);
    } catch (error) {
      console.error(error);
      if (error.message === "Incorrect Email or Password") {
        seterror("Incorrect Email or Password. Please try again.");
      } else {
        seterror("Login failed: Unable to connect to the server.");
      }
    }
  };

  return (
    <div className="logdiv">
      <div className="logincard">
        <div className="mylogin">
        <Card className="carding ">
          <Card.Text>
            <Row>
              <h2>Login</h2>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            {error && <p className="error">{error}</p>}

            <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              Login
            </Button>
            <Card.Text>
              <p>
                New Here ? <a href="/signup">Register</a>
              </p>
            </Card.Text>
          </Card.Text>
        </Card>
          </div>
        
      </div>
    </div>
  );
};

export default Login;
