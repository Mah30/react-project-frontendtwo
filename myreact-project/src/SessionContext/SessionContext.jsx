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
       verifyToken(storageToken); //Esse if-codigo fez desaparecer do navbar meu login e signup e apareceu meu profile e logout, diretamente na homepage. O que há de errado aqui? - Ver video no minuto 42:00
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




/*export const AuthContext = createContext();

 export const AuthProviderWrapper = ({ children }) => {
  const [user, setUser] = useState(null); // Estado do usuário logado
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de autenticação
  const [authError, setAuthError] = useState(null); // Armazena erros de autenticação
  const navigate = useNavigate(); // Hook para redirecionamento

  // Verificar o token ao carregar a aplicação
  const checkAuth = async () => {
    const token = localStorage.getItem("authToken"); // Busca o token no localStorage
    if (token) {
      try {
        const response = await fetch(`${API_URL}/auth/verify`, {
          method: "GET", // Método GET para verificar o token
          headers: {
            Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
          },
        });

        if (!response.ok) {
          throw new Error("Token verification failed");
        }

        const data = await response.json();
        setUser(data.user); // Salva os dados do usuário
        setIsLoggedIn(true); // Marca como logado
      } catch (error) {
        console.error("Error verifying token:", error.message);
        setIsLoggedIn(false);
        setUser(null); // Remove o usuário em caso de falha
      }
    }
  };



  // Função para logout
  const logout = () => {
    localStorage.removeItem("authToken"); // Remove o token do localStorage
    setUser(null); // Remove os dados do usuário
    setIsLoggedIn(false); // Marca como deslogado
    navigate("/login"); // Redireciona para a página de login
  };

  // useEffect para verificar a autenticação ao carregar a aplicação
  useEffect(() => {
    checkAuth(); // Chama a função para verificar o estado de autenticação
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, authError }}>
      {children}
    </AuthContext.Provider>
  );
}; */
