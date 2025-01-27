import { createContext, useEffect, useState } from "react";

export const SessionContext = createContext(); // Criação do contexto de autenticação

const API_URL = import.meta.env.VITE_API_URL;

const SessionContextProvider = ({ children }) => {
  const [token, setToken] = useState(null); 
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
 
  const verifyToken = async (tokenToVerify) => {
    try {
      const response = await fetch(`${API_URL}/auth/verify`, {
        headers: {
          Authorization: `Bearer ${tokenToVerify}`,
        },
      });
      if (response.ok) {
        setToken(tokenToVerify);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("authToken");
      }
    } catch (error) {
      console.error(error);
      localStorage.removeItem("authToken");
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    if (token){
      setIsAuthenticated(true);
      localStorage.setItem('authToken', token);
    } else {
      setIsAuthenticated(false);
    }
  }, [token])

  useEffect(() => {
    const storageToken = localStorage.getItem('authToken');
    if (storageToken) {
       verifyToken(storageToken); //Aqui desaparece do navbar meu login e signup e apareceu meu profile e logout, 
    } else {
      setIsLoading(false);
    }
  }, [])

  const logout = () => {
    setToken(false);
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
  }
 

  return (
    <SessionContext.Provider value={{ token, setToken, isAuthenticated, isLoading, logout }}>
      {children}
    </SessionContext.Provider>
  );
}



export default SessionContextProvider;

