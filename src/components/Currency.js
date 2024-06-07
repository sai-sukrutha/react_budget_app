import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Currency = () => {
    const { dispatch, currency } = useContext(AppContext);

    const handleCurrencyChange = (value) => {
        dispatch({
            type: 'CHG_CURRENCY',
            payload: value,
        });
    }

    return(
        <div>
            <div className='dropdown'>
                <button class="btn btn-success" type="button" id="dropdownMenuButton" >
                    Currency({currency})
                </button>
                
                <select className="custom-select " id="inputGroupSelect02" onChange={(event) => handleCurrencyChange(event.target.value)}>
                    <option defaultValue value="£" name="pound"> £ Pound</option>
                    <option value="$" name="dollar"> $ Dollar</option> 
                    <option value="€" name="euro"> € Euro</option>
                    <option value="₹" name="rupee"> ₹ Rupee</option>
                </select>
    
            </div>
        </div>
    )
}

export default Currency;