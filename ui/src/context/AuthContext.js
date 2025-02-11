import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const login = (userData) => {
    console.log("userData", userData)
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if(userData) setUser(JSON.parse(userData));

    setLoading(false)
  }, []);


  return (
    <AuthContext.Provider value={ { loading, user, login, logout } }>
      { children }
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
