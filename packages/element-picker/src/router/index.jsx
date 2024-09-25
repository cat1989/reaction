import * as React from 'react'
import routes from './routes'
import { createHashRouter, RouterProvider } from 'react-router-dom'

const router = createHashRouter(routes)

export const Router = () => {
    return (
        <RouterProvider router={router}></RouterProvider>
    )
}
