
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
            return { userInfo: {} }

        default:
            return state;
    }
}
