import { useState } from 'react';


export const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);

    const reset = ( newFormState = initialState ) => {
        setValues( newFormState );
    }


    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [ target.name ]: target.value
        });

    }

    const setInputValues = ( { newValues }) => {
        setValues( { ...values , newValues })
    }

    return [ values, handleInputChange, reset, setInputValues ];

}