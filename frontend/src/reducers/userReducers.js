
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

        case types.userTypes.USER_LOGOUT:
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
            return { loading: false, user: action.payload }

        case types.userTypes.USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        case types.userTypes.USER_DETAILS_RESET:
            return { user : {} }

        default:
            return state;
    }
}

export const userUpdateProfileDetailsReducer = ( state = { } , action ) => {

    switch ( action.type ) {

        case types.userTypes.USER_UPDATE_PROFILE_REQUEST:
            return { ...state, loading: true }

        case types.userTypes.USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }

        case types.userTypes.USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload }

        case types.userTypes.USER_UPDATE_PROFILE_RESET:
            return {}

        default:
            return state;
    }
}

export const userListReducer = ( state = { loading : true, users : [] }, action ) => {

    switch (action.type) {
  
      case types.userTypes.USER_LIST_REQUEST:
        return {  loading: true, }
  
      case types.userTypes.USER_LIST_SUCCESS:
        return { loading: false, users: action.payload, }
  
      case types.userTypes.USER_LIST_FAIL:
        return {  loading: false, users: action.payload,  }

      case types.userTypes.USER_LIST_RESET:
        return {  loading: true, users: [] ,  }
  
      default:
        return state
    }
}

export const userDeleteReducer = (state = {}, action) => {

    switch (action.type) {

      case types.userTypes.USER_DELETE_REQUEST:
        return { loading: true }

      case types.userTypes.USER_DELETE_SUCCESS:
        return { loading: false, success: true }

      case types.userTypes.USER_DELETE_FAIL:
        return { loading: false, error: action.payload }

      default:
        return state
    }
}

export const userUpdateReducer = ( state = { user: {} } , action ) => {

    switch ( action.type ) {

        case types.userTypes.USER_UPDATE_REQUEST:
            return { ...state, loading: true }

        case types.userTypes.USER_UPDATE_SUCCESS:
            return { loading: false, success: true }

        case types.userTypes.USER_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case types.userTypes.USER_UPDATE_RESET:
            return { user : {} }

        default:
            return state;
    }
}
