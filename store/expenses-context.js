import {createContext, useReducer} from 'react'


const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 85.99,
        date:  new Date('2022-12-19')
    },
    {
        id: 'e2',
        description: 'A pair of pants',
        amount: 90.99,
        date:  new Date('2022-12-22')
    },
    {
        id: 'e3',
        description: 'A pair of shirts',
        amount: 15.99,
        date:  new Date('2022-12-03')
    },
    {
        id: 'e4',
        description: 'Book',
        amount: 14.99,
        date:  new Date('2022-11-08')
    },
    {
        id: 'e5',
        description: 'Book',
        amount: 22.99,
        date:  new Date('2022-10-18')
    },

]
// step 1                                 //step 2
export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date})=>{},
    deleteExpense: (id)=>{},
    updateExpense: (id, {description, amount, date})=>{},
});

// create reducer function
function expensesReducer(state, action){
    switch(action.type){
        case 'Add':
            const id = new Date().toString() + Math.random().toString()
            return [ {...action.payload, id: id}, ...state]
        case 'Update':
            const updatableExpenseIndex = state.findIndex(
                (expense)=> expense.id === action.payload.id
                );
                const updatableExpense = state[updatableExpenseIndex];
                const updatedItem = {...updatableExpense, ...action.payload.data}
                const updatedExpenses = [...state]
                updatedExpenses[updatableExpenseIndex] = updatedItem;
                return updatedExpenses;
        case 'Delete':
            return state.filter((expense)=> expense.id !== action.payload)
        default:
            return state
    }
}


// step 3
function ExpensesContextProvider({children}){
    // state managemnt logic goes inside here with use reducer

    const [expensesState, dispatch] = useReducer( expensesReducer, DUMMY_EXPENSES);


    function addExpense(expenseData){
        dispatch({type: 'Add',payload: expenseData})
    }
    function deleteExpense(id){
        dispatch({type: 'Delete',payload: id})
    }
    function updateExpense(id, expenseData){
        dispatch({type: 'Update',payload: {id: id, data: expenseData}})
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    }

    return(
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    )
}
// step 4
export default ExpensesContextProvider;