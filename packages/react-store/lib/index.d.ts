export declare const createStore: <State, Mutations extends {
    [key: string]: (state: State, ...payload: any) => void;
}>({ state: initialState, mutations, }: {
    state: State;
    mutations: Mutations;
}) => () => {
    state: State;
    commit<T extends keyof Mutations, P extends Mutations[T] extends infer T_1 ? T_1 extends Mutations[T] ? T_1 extends (state: State, ...payload: infer P_1) => void ? P_1 : never : never : never>(type: T, ...payload: P): void;
};
