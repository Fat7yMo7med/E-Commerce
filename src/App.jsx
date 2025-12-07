import { Children, useState } from 'react'
import reactLogo from './assets/react.svg'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Products from './components/Products/Products';
import Carts from './components/Carts/Carts';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import Brand from './components/Brand/Brand';
import Register from './components/Register/Register';
import UserContextProvider from './context/userContext.jsx';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes.jsx';
import ProductDetails from './components/ProductDetails/ProductDetails.jsx'
import CartContextProvider from './context/cartContext'
import { Toaster } from 'react-hot-toast'


function App() {

  let Paths = createBrowserRouter([
    {path: '', element: <Layout />, children: [
      { index: true, element: <ProtectedRoutes> <Products/> </ProtectedRoutes> },
      {path: 'carts', element: <ProtectedRoutes> <Carts/> </ProtectedRoutes> },
      {path: 'login', element: <Login /> },
      {path: 'register', element: <Register /> },
      { path: 'brand', element: <ProtectedRoutes> <Brand /> </ProtectedRoutes> },
      { path: 'productDetails/:id', element: <ProtectedRoutes> <ProductDetails /> </ProtectedRoutes> },
      { path: '*', element: <NotFound /> },
      ]
    }])

  return (
    <>
      <CartContextProvider>
          <UserContextProvider>
          <RouterProvider router={Paths}></RouterProvider>
          <Toaster/>
          </UserContextProvider>
      </CartContextProvider>
    </>
  )
}

export default App
