import React, { useContext } from 'react'
import AuthContext from '../context/Auth/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'
import { Spinner } from '../components/common'

const RequireAuth = () => {
    const {token,loading} = useContext(AuthContext)
    if (loading)
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner/>
      </div>
    );

    if(!token){
        return <Navigate to="/login" replace />
    }
  return <Outlet/>
}

export default RequireAuth
