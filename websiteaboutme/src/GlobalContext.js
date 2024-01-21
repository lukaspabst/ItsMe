import React, {createContext, useReducer, useContext} from 'react';

const GlobalStateContext = createContext();
const GlobalDispatchContext = createContext();

const globalReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.payload };
        case 'SET_ACTIVE_INDEX':
            return { ...state, activeIndex: action.payload };
        default:
            return state;
    }
};

export const GlobalProvider = ({ children }) => {

    const [state, dispatch] = useReducer(globalReducer, {
        currentPage: 1,
        activeIndex: 0,
    });

    return (
        <GlobalStateContext.Provider value={state}>
            <GlobalDispatchContext.Provider value={dispatch}>
                {children}
            </GlobalDispatchContext.Provider>
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = () => useContext(GlobalStateContext);
export const useGlobalDispatch = () => useContext(GlobalDispatchContext);
