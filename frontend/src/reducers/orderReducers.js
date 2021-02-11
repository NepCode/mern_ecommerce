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


export const orderPayReducer = ( state = { }, action ) => {

    switch (action.type) {

      case types.orderTypes.ORDER_PAY_REQUEST:
        return { loading: true, }

      case types.orderTypes.ORDER_PAY_SUCCESS:
        return { loading: false, success: true }

      case types.orderTypes.ORDER_PAY_FAIL:
        return {  loading: false, error: action.payload,  }

      case types.orderTypes.ORDER_PAY_RESET:
        return {}

      default:
        return state
    }
}


export const ordersListMyReducer = ( state = { loading : true, orders : [] }, action ) => {

  switch (action.type) {

    case types.orderTypes.ORDER_LIST_MY_ORDERS_REQUEST:
      return {  loading: true, }

    case types.orderTypes.ORDER_LIST_MY_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload, }

    case types.orderTypes.ORDER_LIST_MY_ORDERS_FAIL:
      return {  loading: false, error: action.payload,  }

    case types.orderTypes.ORDER_LIST_MY_ORDERS_RESET:
      return {  loading: true, orders:[] }

    default:
      return state
  }
}


export const orderListReducer = (state = { orders: [], loading: true }, action) => {
  
  switch (action.type) {
    case types.orderTypes.ORDER_LIST_REQUEST:
      return {  loading: true, }

    case types.orderTypes.ORDER_LIST_SUCCESS:
      return {  loading: false, orders: action.payload, }

    case types.orderTypes.ORDER_LIST_FAIL:
      return {  loading: false,  error: action.payload, }

    default:
      return state
  }

}