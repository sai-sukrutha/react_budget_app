import React, { createContext, useReducer } from 'react';

// 5. The reducer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
    let budget = 0;
    let total_budget = 0;
    switch (action.type) {
        case 'ADD_EXPENSE':
            total_budget = 0;
            total_budget = state.expenses.reduce(
                (previousExp, currentExp) => {
                    return previousExp + currentExp.cost
                },0
            );
            total_budget = total_budget + action.payload.cost;
            action.type = "DONE";
            if(total_budget <= state.budget) {
                total_budget = 0;
                state.expenses.map((currentExp)=> {
                    if(currentExp.name === action.payload.name) {
                        currentExp.cost = action.payload.cost + currentExp.cost;
                    }
                    return currentExp
                });
                return {
                    ...state,
                };
            } else {
                alert("Cannot increase the allocation! Out of funds");
                return {
                    ...state
                }
            }
        case 'RED_EXPENSE':
            // I changed code(prev code-commented below) as it doesn't show error message when reducing more than what is currently present.
            let isErr = false;
            const red_expenses = [...state.expenses];
            red_expenses.forEach((currentExp) => {
                if(currentExp.name === action.payload.name ) {
                    if (currentExp.cost - action.payload.cost >= 0) {
                        currentExp.cost = currentExp.cost - action.payload.cost;
                        budget = state.budget + action.payload.cost;
                    } else {
                        isErr = true;
                    }
                }
            })
            if (isErr) {
                alert("Cannot Reduce! Value is less than allocated");
                action.type = "DONE";       // TODO: Where to add DONE. Without done, it shows alert twice
                return {
                    ...state
                }
            } else {
                action.type = "DONE";
                return {
                    ...state,
                    expenses: [...red_expenses],
                };
            }

            // const red_expenses = state.expenses.map((currentExp)=> {
            //     if (currentExp.name === action.payload.name && currentExp.cost - action.payload.cost >= 0) {
            //         currentExp.cost =  currentExp.cost - action.payload.cost;
            //         budget = state.budget + action.payload.cost
            //     }   
            //     return currentExp
            // })
            // action.type = "DONE";
            // return {
            //     ...state,
            //     expenses: [...red_expenses],
            // };
        case 'DELETE_EXPENSE':
            action.type = "DONE";
            state.expenses.map((currentExp)=> {
                if (currentExp.name === action.payload) {
                    budget = state.budget + currentExp.cost
                    currentExp.cost =  0;
                }
                return currentExp
            })
            action.type = "DONE";
            return {
                ...state,
                budget
            };
        case 'SET_BUDGET':
            total_budget = 0;
            total_budget = state.expenses.reduce(
                (previousExp, currentExp) => {
                    return previousExp + currentExp.cost
                },0
            );
            // TODO: It works, but the value changes in input ?
            if(action.payload < total_budget) {
                alert('Budget cannot not be lower than Spent so far');
            } else if (action.payload > 20000) {
                alert('Budget should not exceed 20,000');
            } else {
                // No errors, so update
                state.budget = action.payload;
            }
            action.type = "DONE";
            return {
                ...state,
            };
        case 'CHG_CURRENCY':
            action.type = "DONE";
            state.currency = action.payload;
            return {
                ...state
            }

        default:
            return state;
    }
};

// 1. Sets the initial state when the app loads
const initialState = {
    budget: 2000,
    expenses: [
        { id: "Marketing", name: 'Marketing', cost: 50 },
        { id: "Finance", name: 'Finance', cost: 300 },
        { id: "Sales", name: 'Sales', cost: 70 },
        { id: "Human Resource", name: 'Human Resource', cost: 40 },
        { id: "IT", name: 'IT', cost: 500 },
    ],
    currency: '£'
};

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
    // 4. Sets up the app state. takes a reducer, and an initial state
    const [state, dispatch] = useReducer(AppReducer, initialState);
    let remaining = 0;

    if (state.expenses) {
            const totalExpenses = state.expenses.reduce((total, item) => {
            return (total = total + item.cost);
        }, 0);
        remaining = state.budget - totalExpenses;
    }

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                budget: state.budget,
                remaining: remaining,
                dispatch,
                currency: state.currency
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
