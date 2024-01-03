import {configureStore} from '@reduxjs/toolkit';
import UserReducer from '../Features/UserSlice';
import ProductReducer from '../Features/ProductSlice';
import CartReducer from '../Features/CartSlice';
export default configureStore({
    reducer:{
    users: UserReducer,
    products: ProductReducer,
    cart: CartReducer
    }
});  