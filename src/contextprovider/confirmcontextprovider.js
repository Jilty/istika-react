import React, {useReducer} from "react";
import {initialState, reducer} from "../reducer/confirmreducer";
import ConfirmContext from "../context/confirmcontext";

export const ConfirmContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <ConfirmContext.Provider value={[state, dispatch]}>
            {children}
        </ConfirmContext.Provider>
    );
};