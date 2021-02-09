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

        case types.productTypes.PRODUCT_DETAILS_RESET:
            return {  product : {} }

        default:
            return state;
    }

}


export const productDeleteReducer = ( state = { } , action ) => {

    switch ( action.type ) {

        case types.productTypes.PRODUCT_DELETE_REQUEST:
            return { loading: true }

        case types.productTypes.PRODUCT_DELETE_SUCCESS:
            return { loading: false, success : true }

        case types.productTypes.PRODUCT_DELETE_FAIL:
            return { loading: false, error : action.payload }

        default:
            return state;
    }
}

export const productCreateReducer = ( state = { } , action ) => {

    switch ( action.type ) {

        case types.productTypes.PRODUCT_CREATE_REQUEST:
            return { loading: true }

        case types.productTypes.PRODUCT_CREATE_SUCCESS:
            return { loading: false, success : true, product: action.payload }

        case types.productTypes.PRODUCT_CREATE_FAIL:
            return { loading: false, error : action.payload }

        case types.productTypes.PRODUCT_CREATE_RESET:
            return {}
            
        default:
            return state;
    }
}

export const productUpdateReducer = ( state = { product : {} } , action ) => {

    switch ( action.type ) {

        case types.productTypes.PRODUCT_UPDATE_REQUEST:
            return { loading: true }

        case types.productTypes.PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success : true, product: action.payload }

        case types.productTypes.PRODUCT_UPDATE_FAIL:
            return { loading: false, error : action.payload }

        case types.productTypes.PRODUCT_UPDATE_RESET:
            return { product : {} }
            
        default:
            return state;
    }
}