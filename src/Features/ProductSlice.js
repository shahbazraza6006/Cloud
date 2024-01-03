import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  responseStatus: "",
  responseMessage: "",
};

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (products, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("name", products.name);
    formData.append("description", products.description);
    formData.append("quantity", products.quantity);
    formData.append("price", products.price);
    formData.append("image", products.image);
    const token = localStorage.getItem("token");
    const type = localStorage.getItem("type");
    console.log("user Type Slice", type);
    const headers = {
      "Content-Type": "Multi-part/form-data",
      type: type,
      token: token,
    };


    
    try {
      console.log("My Image", products.image);
      const response = axios
        .post("http://backendcloud-env.eba-igk2dppf.us-east-1.elasticbeanstalk.com/product/add", formData, { headers })
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            alert("Product Added Successfully");
            window.location.reload();
          } else {
            alert("Error in Adding Product");
          }
        });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      token: token,
    };
    console.log("Token Slice", token);

    try {
      const response = await axios.get("http://backendcloud-env.eba-igk2dppf.us-east-1.elasticbeanstalk.com/product/get", {
        headers,
      });
      return response.data.product;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (productId, { rejectWithValue }) => {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        token: token,
      };
  
      try {
        await axios.delete(`http://backendcloud-env.eba-igk2dppf.us-east-1.elasticbeanstalk.com/product/delete/${productId}`, {
          headers,
        });
  
        // Fetch the updated list of products after deletion
        const response = await axios.get("http://backendcloud-env.eba-igk2dppf.us-east-1.elasticbeanstalk.com/product/get", {
          headers,
        });
  
        return response.data.product;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ data_id, data }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
   
       
    const userType = localStorage.getItem("userType");
    const headers = {
        "Content-Type": "multipart/form-data",
      token: token,
    };
    console.log("Token Slice", token);
    console.log("user id", data_id);
  console.log("update", data);
    try {
      const response = await axios.put(
        `http://backendcloud-env.eba-igk2dppf.us-east-1.elasticbeanstalk.com/product/update/${data_id}`,
        data,
        { headers }
      );
   window.location.reload();
   console.log("response", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [createProduct.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "Loading",
      };
    },
    [createProduct.fulfilled]: (state, action) => {
      return {
        ...state,
        responseStatus: "Success",
        responseMessage: action.payload,
        products: action.payload,
      };
    },
    [createProduct.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "Failed",
        responseMessage: action.payload,
      };
    },
    [getProduct.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "Loading",
      };
    },
    [getProduct.fulfilled]: (state, action) => {
      return {
        ...state,
        responseStatus: "Success",
        responseMessage: action.payload,
        products: action.payload,
      };
    },
    [getProduct.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "Failed",
        responseMessage: action.payload,
        products: [],
      };
    },
    [deleteProduct.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "Loading",
      };
    },
    [deleteProduct.fulfilled]: (state, action) => {
      return {
        ...state,
        responseStatus: "Success",
        responseMessage: action.payload,
        products: action.payload,
      };
    },
    [deleteProduct.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "Failed",
        responseMessage: action.payload,
      };
    },
    [updateProduct.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "Loading",
      };
    },
    [updateProduct.fulfilled]: (state, action) => {
      return {
        ...state,
        responseStatus: "Success",
        responseMessage: action.payload,
        products: action.payload,
      };
    },
    [updateProduct.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "Failed",
        responseMessage: action.payload,
      };
    },
  },
});

export default ProductSlice.reducer;
