import React, { useState } from 'react';

const initialState = {
    open: false,
    message: ''
}


export const Context = React.createContext(initialState);

function ContextProvider(props) {
    const [authState, setAuthState] = useState(initialState)
    return (
        <Context.Provider value={{ authState, setAuthState }}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider;

