import axios from "axios";

import { logout } from './userActions'
import { types } from "../types/types";



export const createOrder = ( order ) => async ( dispatch, getState ) => {
    
    try {
        dispatch({  type: types.orderTypes.ORDER_CREATE_REQUEST });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers : {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}orders/`,  order , config )
        dispatch({ type: types.orderTypes.ORDER_CREATE_SUCCESS , payload : data });
        //localStorage.setItem( 'userInfo', JSON.stringify(data) )
    } catch (e) {

        const message =
            e.response && e.response.data.message
            ? e.response.data.message
            : e.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: types.orderTypes.ORDER_CREATE_FAIL,
            payload: message,
        })
    }

}




export const getOrderDetails = ( id ) => async ( dispatch, getState ) => {
    
    try {
        dispatch({  type: types.orderTypes.ORDER_DETAILS_REQUEST });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers : {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}orders/${id}` , config )
        dispatch({ type: types.orderTypes.ORDER_DETAILS_SUCCESS , payload : data });

    } catch (e) {

        const message =
            e.response && e.response.data.message
            ? e.response.data.message
            : e.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: types.orderTypes.ORDER_DETAILS_FAIL,
            payload: message,
        })
    }

}
