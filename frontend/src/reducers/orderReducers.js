import { types } from "../types/types";


const initialState = {
   /*  orders : [],
    error : [] */
}


export const orderCreateReducer = (state = initialState, action) => {
    switch (action.type) {

      case types.orderTypes.ORDER_CREATE_REQUEST:
        return {  loading: true, }

      case types.orderTypes.ORDER_CREATE_SUCCESS:
        return { loading: false, success: true, order: action.payload, }

      case types.orderTypes.ORDER_CREATE_FAIL:
        return {  loading: false, error: action.payload,  }

      case types.orderTypes.ORDER_CREATE_RESET:
        return {}

      default:
        return state
    }
  }
  

export const orderDetailsReducer = ( state = { loading : true, orderItems : [], shippingAddress : {} }, action ) => {

    switch (action.type) {

      case types.orderTypes.ORDER_DETAILS_REQUEST:
        return { ...state,  loading: true, }

      case types.orderTypes.ORDER_DETAILS_SUCCESS:
        return { loading: false, success: true, order: action.payload, }

      case types.orderTypes.ORDER_DETAILS_FAIL:
        return {  loading: false, error: action.payload,  }

      case types.orderTypes.ORDER_DETAILS_RESET:
        return {}

      default:
        return state
    }
}