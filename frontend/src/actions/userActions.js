import { types } from "../types/types";
import axios from "axios";

export const login = ( email, password ) => async ( dispatch ) => {
       
        try {
            dispatch({  type: types.userTypes.USER_LOGIN_REQUEST });

            const config = {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}users/login`,  { email, password }, config )
            dispatch({ type: types.userTypes.USER_LOGIN_SUCCESS , payload : data });

            localStorage.setItem( 'userInfo', JSON.stringify(data) )
        } catch (e) {
            dispatch({
                type : types.userTypes.USER_LOGIN_FAIL,
                payload:
                    e.response && e.response.data.message
                    ? e.response.data.message
                    : e.message,
            })
        }
}


export const logout = ( ) => async ( dispatch ) => {
    
   localStorage.removeItem('userInfo')
   dispatch({ type :  types.userTypes.USER_LOGOUT })
   dispatch({ type :  types.userTypes.USER_DETAILS_RESET })
   dispatch({ type :  types.orderTypes.ORDER_LIST_MY_ORDERS_RESET })

}


export const register = ( name, email, password ) => async ( dispatch ) => {
       
    try {
        dispatch({  type: types.userTypes.USER_REGISTER_REQUEST});

        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}users/`,  { name, email, password }, config )
        dispatch({ type: types.userTypes.USER_REGISTER_SUCCESS , payload : data });
        dispatch({ type: types.userTypes.USER_LOGIN_SUCCESS , payload : data });
        localStorage.setItem( 'userInfo', JSON.stringify(data) )
    } catch (e) {

        dispatch({
            type: types.userTypes.USER_REGISTER_FAIL,
            payload:
              e.response && e.response.data.message
                ? e.response.data.message
                : e.message,
        })
    }

}
 
export const getUserDetails = ( id ) => async ( dispatch, getState ) => {
       
    try {
        dispatch({  type: types.userTypes.USER_DETAILS_REQUEST});

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers : {
               
                 Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}users/profile`, config )
        dispatch({ type: types.userTypes.USER_DETAILS_SUCCESS , payload : data });
    } catch (e) {

        const message =
            e.response && e.response.data.message
            ? e.response.data.message
            : e.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: types.userTypes.USER_DETAILS_FAIL,
            payload: message,
        })
    }

}

export const updateUserProfile = ( user ) => async ( dispatch, getState ) => {
       
    try {
        dispatch({  type: types.userTypes.USER_UPDATE_PROFILE_REQUEST});

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers : {
               
                 Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}users/profile`, user,  config )
        dispatch({ type: types.userTypes.USER_UPDATE_PROFILE_SUCCESS , payload : data });
        dispatch({ type: types.userTypes.USER_LOGIN_SUCCESS , payload : data });
        localStorage.setItem( 'userInfo', JSON.stringify(data) )
    } catch (e) {

        const message =
            e.response && e.response.data.message
            ? e.response.data.message
            : e.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: types.userTypes.USER_UPDATE_PROFILE_FAIL,
            payload: message,
        })
    }

}

export const listUsers = (  ) => async ( dispatch, getState ) => {
       
    try {
        dispatch({  type: types.userTypes.USER_LIST_REQUEST});

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers : {
                 Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}users/`, config )
        dispatch({ type: types.userTypes.USER_LIST_SUCCESS , payload : data });
    } catch (e) {

        const message =
            e.response && e.response.data.message
            ? e.response.data.message
            : e.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: types.userTypes.USER_LIST_FAIL,
            payload: message,
        })
    }

}