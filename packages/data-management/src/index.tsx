import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { createStore } from 'react-store'

const state = {
    count: 0,
}

type State = typeof state

const mutations = {
    increment(state: State) {
        state.count++
    },
    setCount(state: State, count: number) {
        state.count = count
    },
    decrement(state: State) {
        state.count--
    },
}

const {
    Store,
    useStore,
} = createStore({
    state,
    mutations,
})

const container = document.createElement("div")
document.body.appendChild(container)

const Index: React.FC = () => {
    const {
        state,
    } = useStore()
    return (
        <div>
            <div>{state.count}</div>
        </div>
    )
}

const App: React.FC = () => {
    const {
        commit,
    } = useStore()
    const [value, setValue] = React.useState('')
    const increment = () => {
        commit("increment")
    }
    const decrement = () => {
        commit("decrement")
    }
    const setCount = () => {
        if (value.match(/^[1-9]\d*$/)) {
            commit("setCount", Number(value))
        }
    }
    return (
        <section>
            <Index />
            <div>
                <div>
                    <input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
                <button
                    onClick={increment}
                >递增</button>
                <button
                    onClick={decrement}
                >递减</button>
                <button
                    onClick={setCount}
                >设置数字</button>
            </div>
        </section>
    )
}

createRoot(container).render(
    <React.StrictMode>
        <Store>
            <App />
        </Store>
    </React.StrictMode>
)
