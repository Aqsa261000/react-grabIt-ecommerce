import { useContext } from "react"
import AuthContext from "../context/Auth/AuthContext"
import { useNavigate } from "react-router-dom"

const useAuthAction=()=>{
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  
  const requireAuth=(action)=>{
    if(!user){
      navigate("/login")
      return
    }
    action()
  }
  return requireAuth
}

export default useAuthAction