import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './global.css'
import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";

import { Banner } from './Components/Banner/index.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Banner />
  },


]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)
