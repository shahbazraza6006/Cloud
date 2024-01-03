import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";  

const initialState = {
    users: [],
    responseStatus: "",
    responseMessage: ""
}

    export const createUser = createAsyncThunk(
        
    "users/createUser",
    async( users, {rejectWithValue}) => {
       
        console.log(users);
        try{
            const response = await axios.post("http://backendcloud-env.eba-igk2dppf.us-east-1.elasticbeanstalk.com/user/register", users);
           alert("User Created Successfully")
          window.location.href = "/login";
            return response.data;
        }
            catch(error){
alert("User Email Already Exists")
                return rejectWithValue(error.response.data);
            }
    }

    )
    export const loginUser = createAsyncThunk(
        'user/login',
        async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://backendcloud-env.eba-igk2dppf.us-east-1.elasticbeanstalk.com/user/login', {
            username,
            password,
            });
    
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('type', response.data.userType);
            console.log(response.data.userType);
            if(response.data.userType === "admin"){
                window.location.href = "/admin";
            }
            else{
                window.location.href = "/";
            }
        return response.data.token;
      } catch (error) {
        // Handle the rejected case and provide a proper error message
        if (error.response && error.response.data) {
            alert("Incorrect Email or Password")
   
          return rejectWithValue(error.response.data );
        } else {
          return rejectWithValue('Login failed: Unable to connect to the server.');
        }
      }
    }
  );
  

  const UserSlice = createSlice({
    name:"users",
    initialState ,
    reducers:{},
    extraReducers:{
        [loginUser.pending]: (state,action) => {
            return{
                ...state,
                responseStatus: 'Loading'
            };
        },
        [loginUser.fulfilled] : (state,action) => {
            return{
                ...state,
                responseMessage: "Succeeded",
                users: action.payload
            };
        },
        [loginUser.rejected] : (state,action) => {
            return{
                ...state,
                responseMessage: action.payload
            }
        },
        [createUser.pending]: (state,action) => {
            return{
                ...state,
                responseStatus: 'Loading'
            };
        },
        [createUser.fulfilled] : (state,action) => {
            return{
                ...state,
                responseMessage: "Succeeded",
                users: action.payload
            };
        },
        [createUser.rejected] : (state,action) => {
            return{
                ...state,
                responseMessage: action.payload
            }
        }
        

  }


  })

  export default UserSlice.reducer;