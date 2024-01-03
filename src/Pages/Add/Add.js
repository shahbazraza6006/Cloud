// import React, { useEffect, useState } from "react";
// import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
// import Card from 'react-bootstrap/Card';
// import { useDispatch } from "react-redux";
// import { createProduct, updateProduct } from "../../Features/ProductSlice";

// import "./Add.css";


// const Add = ({ productData, type }) => {
//   const dispatch = useDispatch();

//   const initialFormData = {
//     name: "",
//     description: "",
//     quantity: "",
//     price: "",
//     image: "",
//   };

//   const [data, setData] = useState(initialFormData);
//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     if (type === "edit" && productData) {
//       setData({
//         name: productData.name,
//         description: productData.description,
//         quantity: productData.quantity,
//         price: productData.price,
//         image: productData.image,
      
        
//       });
//     } else {
//       setData(initialFormData);
//     }
//     console.log("Product Data", productData)
//     console.log("data", productData.name, productData.description, productData.quantity, productData.price, productData.image)
//     console.log("type", type)
//     console.log("product id", productData._id)
//   }, [productData, type]);

//   const handleChange = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const productDatas = {
//       name: data.name,
//       description: data.description,
//       quantity: data.quantity,
//       price: data.price,
//       image: image,
//     };

//     if (type === "update") {
//       dispatch(updateProduct(data._id,data));
//     } else {
//       dispatch(createProduct(productDatas));
//     }
//   };

//   return (
//     <div>
//       <Card className="carding">
//         <Card.Text>
//           <Row>
//             <h2>{type === "update" ? "Edit" : "Add"}</h2>
           
//             <Col>
//               <Form.Group className="mb-3" controlId="formBasicEmail">
//                 <Form.Label>Product Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter Product Name"
//                   name="name"
//                   value={data.name}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <Form.Group className="mb-3" controlId="formBasicEmail">
//                 <Form.Label>Product Description</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter Product Description"
//                   name="description"
//                   value={data.description}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <Form.Group className="mb-3" controlId="formBasicEmail">
//                 <Form.Label>Product Quantity</Form.Label>
//                 <Form.Control
//                   type="number"
//                   placeholder="Enter Product Price"
//                   name="quantity"
//                   value={data.quantity}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             </Col>
//             <Col>
//               <Form.Group className="mb-3" controlId="formBasicEmail">
//                 <Form.Label>Product Price</Form.Label>
//                 <Form.Control
//                   type="number"
//                   placeholder="Enter Product Price"
//                   name="price"
//                   value={data.price}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <Form.Group className="mb-3" controlId="formBasicEmail">
//                 <Form.Label>Product Image</Form.Label>
//                 {type === "update" ? (
//                   <>
//                     {data.image ? (
//                       <div key="image-container">
//                         <img className="imgadd"
//                           src={`http://localhost:4000/${data.image}`}
//                           alt="product"
//                           key="data-image"
//                         />
//                       </div>
//                     ) : null}
//                     <input
//                       type="file"
//                       onChange={handleImageChange}
//                       accept="image/*"
//                       key="file-input"
//                     />
//                   </>
//                 ) : (
//                   <>
//                     <input
//                       type="file"
//                       onChange={handleImageChange}
//                       accept="image/*"
//                       key="file-input"
//                     />
//                   </>
//                 )}
//               </Form.Group>
//             </Col>
//           </Row>

//           <Button variant="primary" type="submit" onClick={handleSubmit}>
//             {type === "update" ? "Update" : "Submit"}
//           </Button>
//         </Card.Text>
//       </Card>
//     </div>
//   );
// };

// export default Add;

import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { createProduct, updateProduct } from "../../Features/ProductSlice";
import { useDispatch } from "react-redux";
import './Add.css'
const Add = ({ productData, type }) => {
  const initialFormData = {
    name: "",
    description: "",
    quantity: "",
    price: "",
    image: "",
  };
  const dispatch = useDispatch();
const [image, setImage] = useState(null);
  const [data, setData] = useState(initialFormData);

  useEffect(() => {
    if (type === "update" && productData) {
      setData(productData);
    } else {
      setData(initialFormData);
    }
  }, [productData, type]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const mydata = {
          name: data.name,
          description: data.description,
          quantity: data.quantity,
          price: data.price,
          image: image,
        };
      
        if (type === "update") {
          dispatch(updateProduct({ data_id: data._id, data: mydata }));
          window.location.reload();
        } else {
          dispatch(createProduct(mydata));
        }
      };
      
  return (
    <div>
      <h2>{type === "update" ? "Edit" : "Add"}</h2>
      <Form>
        <Form.Group className="mb-3" controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Product Name"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="productDescription">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Product Description"
            name="description"
            value={data.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="productQuantity">
          <Form.Label>Product Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Product Quantity"
            name="quantity"
            value={data.quantity}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="productPrice">
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Product Price"
            name="price"
            value={data.price}
            onChange={handleChange}
          />
        </Form.Group>
        {type === "update" && data.image && (
          <div>
            <p>Current Image:</p>
            <img
              className="imgadd"
              src={`http://localhost:4000/${data.image}`}
              alt="product"
            />
          </div>
        )}
        <Form.Group className="mb-3" controlId="productImage">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            name="image"
            onChange={handleImageChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          {type === "update" ? "Update" : "Submit"}
        </Button>
      </Form>
    </div>
  );
};

export default Add;
