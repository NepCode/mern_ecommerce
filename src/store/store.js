import {createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
//import { composeWithDevTools } from 'redux-devtools-extension'


import { productListReducer } from '../reducers/productReducers';


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    productList : productListReducer
});

const initialState = {};

const middleware = [thunk];

export const store = createStore(  
    reducers,
    initialState,
    composeEnhancers(
        applyMiddleware(...middleware),
    )
);

