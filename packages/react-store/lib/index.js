import * as React from 'react';
// https://react.dev/reference/react/useSyncExternalStore
export const createStore = function ({ state: initialState, mutations, }) {
    let listeners = [];
    let state = { ...initialState };
    const store = {
        emit(newState) {
            state = { ...state, ...newState };
            listeners.forEach((listener) => {
                listener();
            });
        },
        subscribe(listener) {
            listeners = [...listeners, listener];
            return () => {
                listeners = listeners.filter((l) => l !== listener);
            };
        },
        getSnapshot() {
            return state;
        }
    };
    return () => {
        const state = React.useSyncExternalStore(store.subscribe, store.getSnapshot);
        return {
            state,
            commit(type, ...payload) {
                const newState = { ...state };
                mutations[type](newState, ...payload);
                store.emit(newState);
            },
        };
    };
};
