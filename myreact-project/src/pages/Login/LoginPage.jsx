import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
/* import { AuthContext } from "../context/auth.context"; */
import { Card } from "flowbite-react"; 


const API_URL = ""

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(undefined); 

  const { storeToken, authenticateUser } = useContext(/* AuthContext */); 
  

// Atualiza o estado com o valor do email inserido pelo usuário
const handleEmail = (e) => setEmail(e.target.value);

// Atualiza o estado com o valor da senha inserida pelo usuário
const handlePassword = (e) => setPassword(e.target.value);

// Lida com a submissão do formulário de login
const handleLoginSubmit = async (e) => {
  e.preventDefault(); // Previne o comportamento padrão de recarregar a página

  const requestBody = { email, password }; // Cria o corpo da requisição com email e senha

  try {
    // Faz a chamada para o backend 
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST", // Método HTTP
      headers: {
        "Content-Type": "application/json", // Define o tipo de conteúdo
      },
      body: JSON.stringify(requestBody), // Converte o objeto em JSON
    });

    if (!response.ok) {
      // Se a resposta não estiver ok (status >= 400), lança um erro
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const responseData = await response.json(); // Converte a resposta em JSON

    // Armazena o token recebido no contexto de autenticação
    storeToken(responseData.authToken);

    // Verifica se o usuário está autenticado e redireciona para a página principal
    authenticateUser();
    navigate("/");
  } catch (error) {
    // Exibe a mensagem de erro recebida do backend
    setErrorMessage(error.message);
  }
};

  return ( 
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm md:max-w-md lg:max-w-lg">
        <form onSubmit={handleLoginSubmit} className="p-4">
          <h3 className="text-center font-bold mb-4">Login</h3>

          {/* Campo de entrada para email */}
          <label className="label" htmlFor="email">Email</label>
          <input
            className="input"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleEmail}
            autoComplete="off"
          />

          {/* Campo de entrada para senha */}
          <label htmlFor="password">Password</label>
          <input
            className="input"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePassword}
            autoComplete="off"
          />

          {/* Botão de login */}
          <button className="mt-4" type="submit">Log In</button>
        </form>

        {/* Mensagem de erro exibida se houver um erro */}
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        {/* Link para a página de cadastro */}
        <p className="ml-4">Don&apos;t have an account yet? <span><Link to="/signup">Sign Up</Link></span></p>
      </Card>
    </div>
  )
}


export default LoginPage;
