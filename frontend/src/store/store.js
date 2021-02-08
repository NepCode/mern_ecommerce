import {createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
//import { composeWithDevTools } from 'redux-devtools-extension'


import { 
    productListReducer,
    productDetailsReducer,
} from '../reducers/productReducers';
import { cartReducer } from '../reducers/cartReducers';
import { 
    userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer, 
    userUpdateProfileDetailsReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer
} from "../reducers/userReducers";
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, ordersListMyReducer } from "../reducers/orderReducers";


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer,
    cart : cartReducer,
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails : userDetailsReducer,
    userUpdateProfile : userUpdateProfileDetailsReducer,
    userList : userListReducer,
    userDelete : userDeleteReducer,
    userUpdate : userUpdateReducer,
    orderCreate : orderCreateReducer,
    orderDetails : orderDetailsReducer,
    orderPay : orderPayReducer,
    orderMyList : ordersListMyReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: { 
        cartItems : cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
     },
    userLogin: { userInfo : userInfoFromStorage}
};

const middleware = [thunk];

export const store = createStore(  
    reducers,
    initialState,
    composeEnhancers(
        applyMiddleware(...middleware),
    )
);

