# react-store
```shell
pnpm add react-store
```
## How to use?
```tsx
import * as React from 'react'
import { createStore } from 'react-store'

const state = {
    count: 0,
}

type State = typeof state

const mutations = {
    increment(state: State) {
        state.count++
    },
}

const useStore = createStore({
    state,
    mutations,
})

const App: React.FC = () => {
    const {
        state,
    } = useStore()
    return (
        <div>{state.count}</div>
    )
}
```
```tsx
import { createStore } from 'react-store'

const useStore = createStore({
    state: {
        count: 0,
    },
    mutations: {
        increment(state) {
            state.count++
        },
    },
})

const App: React.FC = () => {
    const {
        state,
    } = useStore()
    return (
        <div>{state.count}</div>
    )
}
```
