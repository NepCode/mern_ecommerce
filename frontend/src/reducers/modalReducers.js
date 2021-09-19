import React from 'react'
import { types } from "../types/types";

const initialState = {
    modal : {
        status : false,
        title : '',
        description : '',
        variantPrimary : '',
        variantSecondary : '',
        data: null/* ,
        onButtonClick: (React.MouseEvent)  */
    }
}

export const modalReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case types.modalTypes.SHOW_MODAL :
            return {
                ...state,
                modal: action.payload,
            };
        


        case types.modalTypes.HIDE_MODAL :
            return {
                ...state,
                modal : {
                    status : false
                }
            };

        case types.modalTypes.OPTION_BUTTON_MODAL :
            return {
                ...state,
                modal : {
                    data : action.payload
                }
            };



        default:
            return state
    }

}
