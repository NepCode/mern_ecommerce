import { types } from "../types/types";


export const ShowModal = ( modal ) => async ( dispatch, getState ) => {

    
    dispatch({
        type : types.modalTypes.SHOW_MODAL,
        payload : modal
    })

}

export const HideModal = (  ) => ( dispatch, getState ) => {

    dispatch({
        type: types.modalTypes.HIDE_MODAL,
        payload: {}
    })

}

export const OPTION_BUTTON_MODAL = (  param  ) => ( dispatch, getState ) => {

    dispatch({
        type: types.modalTypes.OPTION_BUTTON_MODAL,
        payload: param
    })

}

