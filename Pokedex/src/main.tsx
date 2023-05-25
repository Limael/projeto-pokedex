import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './global.css'
import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { Pokedex } from './Components/Pokedex/index.js'
import { Banner } from './Components/Banner/index.js'
import { Legendaries } from './Components/Legendaries/index.js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Banner />,
  },
  {
    path: "pokedex",
    element: <Pokedex />,
  },
  {
    path: "legendaries",
    element: <Legendaries />,
  },
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)
