import * as React from 'react';
export declare const createStore: <State, Mutation extends {
    [key: string]: (state: State, ...payload: any) => void;
}>({ state, mutations, }: {
    state: State;
    mutations: Mutation;
}) => {
    Store: React.FC<{
        children?: React.ReactNode | undefined;
    }>;
    useStore: () => {
        state: State;
        commit: <T extends keyof Mutation, P extends Mutation[T] extends infer T_1 ? T_1 extends Mutation[T] ? T_1 extends (state: State, ...payload: infer P_1) => void ? P_1 : never : never : never>(type: T, ...payload: P) => void;
    };
};
