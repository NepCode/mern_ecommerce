import { types } from "../types/types";
import axios from "axios";

export const listProducts = () => {

    return async ( dispatch ) => {
       
        try {
            dispatch({  type: types.PRODUCT_LIST_REQUEST });
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}products`)
            dispatch({ type: types.PRODUCT_LIST_SUCCESS, payload : data });
        } catch (e) {
            console.log(e)
            dispatch({
                type : types.PRODUCT_LIST_FAIL,
                payload : e
            })
        }

    }
} 


export const hello = () => () => {

}
