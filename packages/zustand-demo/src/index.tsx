import * as React from 'react'
import { createRoot } from 'react-dom/client'
import  { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

const container = document.createElement("div")
document.body.appendChild(container)

type Store = {
    data: {
        count: number;
    };
    increment: () => void;
    setCount: (count: number) => void;
}

const useStore = create(immer<Store>((set) => {
    return {
        data: {
            count: 0,
        },
        increment() {
            set((state) => {
                state.data.count++
            })
        },
        setCount(count: number) {
            set((state) => {
                state.data.count = count
            })
        },
    }
}))

const App: React.FC = () => {
    const count = useStore((state) => state.data.count)
    const increment = useStore((state) => state.increment)
    const setCount = useStore((state) => state.setCount)
    return (
        <section>
            <div>{count}</div>
            <div>
                <button
                    onClick={increment}
                >increment</button>
                <button
                    onClick={() => setCount(1)}
                >setCount</button>
            </div>
        </section>
    )
}

createRoot(container).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
