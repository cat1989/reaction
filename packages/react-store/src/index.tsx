import * as React from 'react'

type Mutations<State> = {
    [key: string]: (state: State, ...payload: any) => void;
}

// https://react.dev/reference/react/useSyncExternalStore
export const createStore = function<State, M extends Mutations<State>>({
    state: initialState,
    mutations,
}: {
    state: State;
    mutations: M;
}) {
    type MutationType = keyof M
    type Payload<T> = T extends (state: State, ...payload: infer P) => void ? P : never
    type Listener = () => void
    let listeners: Listener[] = []
    let state = {...initialState}
    const store = {
        emit(newState: State) {
            state = {...state, ...newState}
            listeners.forEach((listener) => {
                listener()
            })
        },
        subscribe(listener: Listener) {
            listeners = [...listeners, listener]
            return () => {
                listeners = listeners.filter((l) => l !== listener)
            }
        },
        getSnapshot() {
            return state
        }
    }
    return () => {
        const state = React.useSyncExternalStore(store.subscribe, store.getSnapshot)
        return {
            state,
            commit<T extends MutationType, P extends Payload<M[T]>>(type: T, ...payload: P) {
                const newState = {...state}
                mutations[type](newState, ...payload)
                store.emit(newState)
            },
        }
    }
}
