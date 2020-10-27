


import { types } from "../types/types";


const initialState = {
    products : [],
    product : {
        reviews : []
    },
    error : []

}


export const productListReducer = ( state = initialState , action ) => {

    switch ( action.type ) {

        case types.productTypes.PRODUCT_LIST_REQUEST:
            return {
                products: [],
                loading: true
            }

        case types.productTypes.PRODUCT_LIST_SUCCESS:
            return {
                products: action.payload,
                loading: false
            }

        case types.productTypes.PRODUCT_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }

}


export const productDetailsReducer = ( state = initialState , action ) => {

    switch ( action.type ) {

        case types.productTypes.PRODUCT_DETAILS_REQUEST:
            return {
                loading : true,
                ...state
            }

        case types.productTypes.PRODUCT_DETAILS_SUCCESS:
            return {
                product : action.payload,
                loading : false
            }

        case types.productTypes.PRODUCT_DETAILS_FAIL:
            return {
                loading : false,
                product : {},
                error: action.payload
            }

        default:
            return state;
    }

}