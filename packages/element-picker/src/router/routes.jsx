import * as React from 'react'
import { Index } from '../views/index'
import { About } from '../views/about'

export default [
    {
        path: '/',
        element: <Index />,
    },
    {
        path: '/about',
        element: <About />,
    },
]
