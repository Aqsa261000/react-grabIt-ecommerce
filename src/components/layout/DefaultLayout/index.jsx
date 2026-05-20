import React from 'react'
import { Footer, Navbar } from '../../common'
import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
  return (
    <div className='flex flex-col h-screen'>
        <Navbar/>
        <div className='flex-1'>
        <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default DefaultLayout
