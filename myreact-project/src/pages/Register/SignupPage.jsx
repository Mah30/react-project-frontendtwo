import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";



const API_URL = "http://localhost:3000";

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isChecked, setIsChecked] = useState(false);
 


    const [name, setName] = useState(""); // Estado para o nome
    

    const navigate = useNavigate(); // Hook do React Router para redirecionamento




    // Atualiza o estado com o valor do email inserido pelo usuário
  const handleEmail = (e) => setEmail(e.target.value);

  // Atualiza o estado com o valor da senha inserida pelo usuário
  const handlePassword = (e) => setPassword(e.target.value);

  // Atualiza o estado com o valor do nome inserido pelo usuário
  const handleName = (e) => setName(e.target.value);

  // Lida com a submissão do formulário de cadastro
  const handleSignupSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página

    const requestBody = { 
      firstName,
      lastName,
      email,
      password }; // Cria o corpo da requisição com email, senha e nome

    try {
      // Faz a chamada para o backend usando fetch
      const response = await fetch(`${API_URL}/auth/signup`, {
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

      // Redireciona o usuário para a página de login após o cadastro bem-sucedido
      navigate("/login");
    } catch (error) {
      // Exibe a mensagem de erro recebida do backend
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm md:max-w-md lg:max-w-lg">
        <form onSubmit={handleSignupSubmit} className="p-4">
          <h3 className="text-center font-bold mb-4">Sign Up</h3>

          {/* Campo de entrada para nome */}
          <label className="label" htmlFor="name">Name</label>
          <input
            className="input"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleName}
            autoComplete="off"
          />

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
          <label className="label" htmlFor="password">Password</label>
          <input
            className="input"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePassword}
            autoComplete="off"
          />

          

          {/* Botão para criar conta */}
          <button className="mt-4" type="submit">Create Account</button>
        </form>

        {/* Mensagem de erro exibida se houver um erro */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Link para a página de login */}
        <p className="ml-4">Already have an account? <span><Link to="/login">Log in</Link></span></p>
      </Card>
    </div>
  );
}

export default SignupPage;
