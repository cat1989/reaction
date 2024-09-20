import * as React from 'react';
export const createStore = function ({ state, mutations, }) {
    const Context = React.createContext({
        state,
        commit: () => { },
    });
    const Store = ({ children, }) => {
        const [initialState, dispatch] = React.useReducer((state, action) => {
            const newState = { ...state };
            const { type, payload, } = action;
            mutations[type](newState, ...payload);
            return newState;
        }, state);
        const value = {
            state: initialState,
            commit: (type, ...payload) => {
                dispatch({
                    type,
                    payload,
                });
            },
        };
        return (React.createElement(Context.Provider, { value: value }, children));
    };
    const useStore = () => React.useContext(Context);
    return {
        Store,
        useStore,
    };
};
