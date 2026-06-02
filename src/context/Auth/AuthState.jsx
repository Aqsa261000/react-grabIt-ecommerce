import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  clearAuth,
  getToken,
  getUser,
  setAuth,
} from "../../utils/helpers/auth/auth";
import { loginUser } from "../../services/authService";

const AuthState = (props) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading,setLoading]=useState(true)

  useEffect(() => {
    const savedToken = getToken();
    const savedUser = getUser();
    if (savedToken && savedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setToken(savedToken);
      setUser(savedUser);
    }
    setLoading(false)
  }, []);

  const login = async (formData,navigate) => {
    const data = await loginUser(formData);
    const token = `mock_${data.id}_${Date.now()}`;
    setUser(data);
    setToken(token);
    setAuth(data, token);

    navigate("/",{replace:true})
  };

  const logout = () => {
    clearAuth();
    setToken(null);
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, token, login, logout,loading }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;

