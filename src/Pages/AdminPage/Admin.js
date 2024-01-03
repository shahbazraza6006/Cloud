import React from "react";
import "./Admin.css";

import { useNavigate } from "react-router-dom";
const Admin = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
    window.location.reload();
  };
  return (
    <div className="adminbody">
      <h1>Admin Page</h1>
      <div className="btnbody">
        <div>
          <button className="glowing-btn">
            <a href="/add">
              <span className="glowing-txt">
                A<span className="faulty-letter">D</span>D
              </span>
            </a>
          </button>
          <button className="glowing-btn">
            <a href="/display">
              <span className="glowing-txt">
                D<span className="faulty-letter">I</span>SPLAY
              </span>
            </a>
          </button>
          <button className="glowing-btn">
            <a href="/">
              <span className="glowing-txt">
                U<span className="faulty-letter">S</span>ER VIEW
              </span>
            </a>
          </button>
          <button onClick={handleLogout} className="glowing-btn">
            <span className="glowing-txt">
              L<span className="faulty-letter">O</span>GOUT
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
