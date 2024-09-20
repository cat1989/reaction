import * as React from 'react'

export const createStore = function<State, Mutation extends {
    [key: string]: (state: State, ...payload: any) => void;
}>({
    state,
    mutations,
}: {
    state: State;
    mutations: Mutation;
}) {
    type MutationType = keyof Mutation
    type Payload<T> = T extends (state: State, ...payload: infer P) => void ? P : never
    type StoreContext = {
        state: State;
        commit: <T extends MutationType, P extends Payload<Mutation[T]>>(type: T, ...payload: P) =>void;
    }
    const Context = React.createContext<StoreContext>({
        state,
        commit: () => {},
    })
    type StoreProps = React.PropsWithChildren<{}>
    type Action = {
        type: MutationType;
        payload?: any;
    }
    const Store: React.FC<StoreProps> = ({
        children,
    }: StoreProps) => {
        const [initialState, dispatch] = React.useReducer((state: State, action: Action) => {
            const newState = {...state}
            const {
                type,
                payload,
            } = action
            mutations[type](newState, ...payload)
            return newState
        }, state)
        const value: StoreContext = {
            state: initialState,
            commit: <T extends MutationType, P extends Payload<Mutation[T]>>(type: T, ...payload: P) => {
                dispatch({
                    type,
                    payload,
                })
            },
        }
        return (
            <Context.Provider
                value={value}
            >{children}</Context.Provider>
        )
    }
    const useStore = () => React.useContext(Context)
    return {
        Store,
        useStore,
    }
}
