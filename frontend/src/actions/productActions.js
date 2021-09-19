import { types } from "../types/types";
import axios from "axios";
import { logout } from "./userActions";

export const listProducts = (pageNumber, pageSize = 5) => {
  
    return async ( dispatch ) => {
       
        try {
            dispatch({  type: types.productTypes.PRODUCT_LIST_REQUEST });
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}products` + '?pageNumber='+pageNumber + '&pageSize='+pageSize)
            //const { data } = await axios.get(`${process.env.REACT_APP_API_URL}products` + '?skip='+skip + '&limit='+limit+ '&filterBy='+JSON.stringify(filterValue) + (sortInfo ? '&keyword='+JSON.stringify(sortInfo) : ''))
            dispatch({ type: types.productTypes.PRODUCT_LIST_SUCCESS, payload : data });
        } catch (e) {
         
            const message =
                e.response && e.response.data.message
                ? e.response.data.message
                : e.message

            if (message === 'Not authorized, token failed') {
                dispatch(logout())
            }
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


export const createProduct = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: types.productTypes.PRODUCT_CREATE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const  { data }  = await axios.post(`${process.env.REACT_APP_API_URL}products/`, {}, config )
  
      dispatch({
        type: types.productTypes.PRODUCT_CREATE_SUCCESS,
        payload: data,
      })
    } catch (e) {

        const message =
        e.response && e.response.data.message
        ? e.response.data.message
        : e.message

        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type : types.productTypes.PRODUCT_CREATE_FAIL,
            payload : e
        })
    }
}


export const deleteProduct = ( id ) => async (dispatch, getState) => {
    try {
      dispatch({
        type: types.productTypes.PRODUCT_DELETE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      await axios.delete(`${process.env.REACT_APP_API_URL}products/${id}`, config )
  
      dispatch({
        type: types.productTypes.PRODUCT_DELETE_SUCCESS
      })
    } catch (e) {
     
        const message =
            e.response && e.response.data.message
            ? e.response.data.message
            : e.message

        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type : types.productTypes.PRODUCT_DELETE_FAIL,
            payload : e
        })
    }
}


export const updateProduct = ( product ) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.productTypes.PRODUCT_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const  { data }  = await axios.put(`${process.env.REACT_APP_API_URL}products/${product._id}`,  product , config )

    dispatch({
      type: types.productTypes.PRODUCT_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (e) {

      const message =
      e.response && e.response.data.message
      ? e.response.data.message
      : e.message

      if (message === 'Not authorized, token failed') {
          dispatch(logout())
      }
      dispatch({
          type : types.productTypes.PRODUCT_UPDATE_FAIL,
          payload : e
      })
  }
}