import React from 'react'
import { AuthNavbar } from '../../common'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='flex flex-col h-screen'>
      <AuthNavbar/>
      <div className='flex-1'>
        <Outlet/>
      </div>
    </div>
  )
}

export default AuthLayout
