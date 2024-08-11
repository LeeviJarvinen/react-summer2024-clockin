import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Layout = () => {
  return (
    <>
        <ToastContainer/>
        <Outlet/>
    </>
  )
}

export default Layout