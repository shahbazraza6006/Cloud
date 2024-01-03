import React from "react";
import Image from "react-bootstrap/esm/Image";
import pic2 from "../../assets/pic2.jpg";
import "./Product.css";
const Product= () => {
    return(
        <div>
            <h1>Product</h1>
            <div className="productos">
            <div >
                <Image className="mainproduct" src={pic2} rounded />
                
                
            </div>
            <div className="productinfo">
                <h2>Title</h2>
                <p>Description</p>
                <p>Price</p>
                <button>Add to Cart</button>
                <button>Buy Now</button>
            </div>
            </div>
           
        </div>
    )
}

export default Product;