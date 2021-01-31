import { types } from "../types/types";
import axios from "axios";

export const addToCart = ( id, qty ) => async ( dispatch, getState ) => {

    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}products/${id}`)

    dispatch({
        type : types.cartTypes.CART_ADD_ITEM,
        payload : {
            product : data.id,
            name : data.name,
            image : data.image,
            price : data.price,
            countInStock : data.countInStock,
            qty
        }
    })

    localStorage.setItem( 'cartItems', JSON.stringify(getState().cart.cartItems))

}

export const removeFromCart = ( id ) => ( dispatch, getState ) => {


    dispatch({
        type: types.cartTypes.CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem( 'cartItems', JSON.stringify(getState().cart.cartItems))


}

