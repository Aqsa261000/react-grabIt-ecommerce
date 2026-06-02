import api from "../api/axiosClient";

export const signupUser=async(data)=>{
const res = await api.post("/users",data)
return res.data
}

export const loginUser=async(data)=>{
    const res = await api.get(`/users?emailAddress=${data.emailAddress}`)

const user = res.data[0];
if(!user){
    throw new Error("User not found")
}
if(user.password !== data.password){
    throw new Error("Wrong password")
}

return user;
}