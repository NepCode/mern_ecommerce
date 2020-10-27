import { types } from "../types/types";
import axios from "axios";

export const listProducts = () => {

    return async ( dispatch ) => {
       
        try {
            dispatch({  type: types.productTypes.PRODUCT_LIST_REQUEST });
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}products`)
            dispatch({ type: types.productTypes.PRODUCT_LIST_SUCCESS, payload : data });
        } catch (e) {
            console.log(e)
            dispatch({
                type : types.productTypes.PRODUCT_LIST_FAIL,
                payload : e
            })
        }

    }
} 


export const listProductDetails = (id) => async (dispatch) => {

    try {
        dispatch({  type: types.productTypes.PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}products/${id}`)
        dispatch({ type: types.productTypes.PRODUCT_DETAILS_SUCCESS, payload : data });
    } catch (e) {
        dispatch({
            type : types.productTypes.PRODUCT_DETAILS_FAIL,
            payload : e.message
        })
    }

}
