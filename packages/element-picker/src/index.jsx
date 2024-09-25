import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { Router } from './router'

const container = document.createElement("div")
document.body.appendChild(container)

createRoot(container).render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>
)
