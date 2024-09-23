type Mutations<State> = {
    [key: string]: (state: State, ...payload: any) => void;
};
export declare const createStore: <State, M extends Mutations<State>>({ state: initialState, mutations, }: {
    state: State;
    mutations: M;
}) => () => {
    state: State;
    commit<T extends keyof M, P extends M[T] extends infer T_1 ? T_1 extends M[T] ? T_1 extends (state: State, ...payload: infer P_1) => void ? P_1 : never : never : never>(type: T, ...payload: P): void;
};
export {};
