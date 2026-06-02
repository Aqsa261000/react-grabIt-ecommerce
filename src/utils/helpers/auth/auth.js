export const setAuth = (user,token)=>{
    localStorage.setItem("token",token)
    localStorage.setItem("user",JSON.stringify(user))
}

export const getToken = () => {
    return localStorage.getItem("token")
}

export const getUser = () => {
    return JSON.parse(localStorage.getItem("user"))
}

export const clearAuth = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
}