import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Add from "../../Pages/Add/Add";
import "./Update.css";

const Update = ({ show, handleClose, data, type }) => {
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <div className="addmodal">
          {/* Pass productData instead of data */}
          <Add productData={data} type={type} />
         
        </div>
      </Modal>
    </div>
  );
};

export default Update;
