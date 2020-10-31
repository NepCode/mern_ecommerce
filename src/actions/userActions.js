import { types } from "../types/types";
import axios from "axios";

export const login = ( email, password ) => async ( dispatch ) => {
       
        try {
            dispatch({  type: types.userTypes.USER_LOGIN_REQUEST });

            const config = {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}auth/login`,  { email, password }, config )
            dispatch({ type: types.userTypes.USER_LOGIN_SUCCESS , payload : data });

            localStorage.setItem( 'userInfo', JSON.stringify(data) )
        } catch (e) {
            console.log(e)
            dispatch({
                type : types.userTypes.USER_LOGIN_FAIL,
                payload : e.message
            })
        }

    }
 