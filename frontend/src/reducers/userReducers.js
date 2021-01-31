
import { types } from "../types/types";


const initialState = { }

export const userLoginReducer = ( state = initialState , action ) => {

    switch ( action.type ) {

        case types.userTypes.USER_LOGIN_REQUEST:
            return { loading: true }

        case types.userTypes.USER_LOGIN_SUCCESS:
            return {  userInfo: action.payload, loading: false }

        case types.userTypes.USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }

        case types.userTypes.USER_LOGIN_LOGOUT:
            return { userInfo: null }

        default:
            return state;
    }
}

export const userRegisterReducer = ( state = initialState , action ) => {

    switch ( action.type ) {

        case types.userTypes.USER_REGISTER_REQUEST:
            return { loading: true }

        case types.userTypes.USER_REGISTER_SUCCESS:
            return {  userInfo: action.payload, loading: false }

        case types.userTypes.USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state;
    }
}

export const userDetailsReducer = ( state = { user : {} } , action ) => {

    switch ( action.type ) {

        case types.userTypes.USER_DETAILS_REQUEST:
            return { ...state, loading: true }

        case types.userTypes.USER_DETAILS_SUCCESS:
            return {  user: action.payload, loading: false }

        case types.userTypes.USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state;
    }
}