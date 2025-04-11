import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";
import {SessionContext} from '../../SessionContext/SessionContext';
/* import { Button } from "flowbite-react"; */
import Space from '../../components/Space';



const API_URL = import.meta.env.VITE_API_URL;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate(); // Hook para redirecionamento

  // Atualiza o estado de valor inserido pelo usuário
  const handleEmail = (event) => setEmail(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);


  const { setToken } = useContext(SessionContext) 


  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const credentials = { 
      email,
      password,
    };

    try {
      const loginResponse = await fetch(
        `${API_URL}/auth/login`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Define o tipo de conteúdo
          },
          body: JSON.stringify(credentials), // Converte o obj em JSON
        }
      );

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        throw new Error(errorData.message || "Login failed.");
      }

      const responseData = await loginResponse.json();

      // Armazena o token no localStorage
      /* localStorage.setItem("authToken", responseData.token); */
      console.log("Token received:", responseData)
      setToken(responseData.token);

     
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate("/profile"), 2000); // Talvez eu altere  "/dashboard" para a página de destino após login

    } catch (error) {
      console.error("Error during login:", error.message);
      setError(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 to-blue-200 p-4">
      <Card className="w-full max-w-sm md:max-w-md lg:max-w-lg p-8 flex flex-col justify-between h-[480px] bg-white/90 backdrop-blur shadow-xl border-white rounded-xl">
        
        <form onSubmit={handleLoginSubmit} className="p-4">
          <h3 className="text-center font-bold mb-4">Log In</h3>

          {/* Campo de entrada para email */}
          <label className="label" htmlFor="email">Email</label>
          <input
            className="input"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleEmail}
            placeholder="Type your email"
            autoComplete="off"
          />

          {/* Campo de entrada para senha */}
          <label className="label" htmlFor="password">Password</label>
          <input
            className="input"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePassword}
            placeholder="Type your password"
            autoComplete="off"
          />

          {/* Botão para fazer login */}
          <button className="w-full bg-green-600 text-white rounded py-2 font-bold hover:bg-green-700 transition mt-4" type="submit">
            Log In
          </button>
          
          <Space />

             {/* Botão de voltar */}
          <Link to="/" className="block text-center text-sm text-blue-600 hover:underline mt-2">
            ⬅ Back to Home
          </Link>
          
        </form>

        {/* Mensagem de erro exibida se houver um erro */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Mensagem de sucesso */}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <div className="flex justify-end mt-2">
          <p className="text-sm text-gray-600">
          Don&lsquo;t have an account? 
         
            <Link to="/signup" className="text-blue-600 hover:underline ml-1">
              Sign up
            </Link>
          
        </p>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;