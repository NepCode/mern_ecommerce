


import { types } from "../types/types";


const initialState = {
    products : []
}


export const productListReducer = ( state = initialState , action ) => {

    switch ( action.type ) {

        case types.PRODUCT_LIST_REQUEST:
            return {
                products: [],
                loading: true
            }

        case types.PRODUCT_LIST_SUCCESS:
            return {
                products: action.payload,
                loading: false
            }

        case types.PRODUCT_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }

}