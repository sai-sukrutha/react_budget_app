import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { dispatch, budget, currency } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    // Note: I added Change button for Budget as the change should only be reflected after entering all digits of budget, other wise it gives the error budget is less for each digit or increment
    const handleBudgetChange = () => {
        dispatch({
            type: 'SET_BUDGET',
            payload: parseInt(newBudget),
        });
    }
    return (
        <div className='alert alert-secondary'>
            {
                // The value near budget span shows the stable(current) value of budget. 
                // The value in input shows the changes we are trying to make now
            }
            <span>Budget: {currency} {budget}</span>
            <input type="number" step="10" value={newBudget} onChange={(event) => setNewBudget(event.target.value)}></input>
            <button className="btn btn-secondary btn-sm" onClick={handleBudgetChange} style={{ marginLeft: '2rem', marginTop: '0.25rem' }}>
                Change Budget
            </button>
        </div>
    );
};


export default Budget;