import { types } from "../types/types";
import axios from "axios";

export const addToCart = ( id, qty ) => async ( dispatch, getState ) => {

    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}products/${id}`)

    dispatch({
        type : types.cartTypes.CART_ADD_ITEM,
        pasyload : {
            product : data.id,
            name : data.name,
            image : data.image,
            countInStock : data.countInStock,
            qty
        }
    })

    localStorage.setItem( 'cartItems', JSON.stringify(getState().cart.cartItems))

}


