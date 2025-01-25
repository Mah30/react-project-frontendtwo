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
/*   const [isChecked, setIsChecked] = useState(false); */

  const navigate = useNavigate(); // Hook do React Router para redirecionamento

  // Atualiza o estado de valor inserido pelo usuário
  const handleFirstName = (event) => setFirstName(event.target.value);
  const handleLastName = (event) => setLastName(event.target.value);
  const handleEmail = (event) => setEmail(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    /* submitCallback({firstName, lastName, email, password})  */

    const newStudent = { 
      firstName,
      lastName,
      email,
      password }

      try {
        const registerResponse = await fetch(
        `${API_URL}/auth/signup`, /* newStudent, */ {
          method: "POST", // Método HTTP
          headers: {
            "Content-Type": "application/json", // Define o tipo de conteúdo
          },
          body: JSON.stringify(newStudent), // Converte o obj em JSON
        });
  
        if (!registerResponse.ok) {
          const newStudentData = await registerResponse.json();
          throw new Error(newStudentData.message || 'Error while registering the user');

        }
        // Redireciona a pessoa para a página de login após o cadastro bem-sucedido
        setSuccess("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);

      } catch (error) {
        console.error("Error during signup:", error.message);
        setError(error.message || "An unexpected error occurred.");
      }
  }
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm md:max-w-md lg:max-w-lg p-8 ..." >

        <form onSubmit={handleSignupSubmit} className="p-4">
          <h3 className="text-center font-bold mb-4">Sign Up</h3>

          {/* Campo de entrada para nome */}
          <label className="label" htmlFor="firstname">Name</label>
          <input
            className="input"
            type="text"
            name="name"
            id="firstname"
            value={firstName}
            onChange={handleFirstName}
            placeholder="Type your first name"
            autoComplete="off"
          />
            <input
            className="input"
            type="text"
            name="name"
            id="lastname"
            value={lastName}
            onChange={handleLastName}
            placeholder="Type your last name"
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

        {/* Mensagem de sucesso */}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        {/* Link para a página de login */}
        <p className="ml-4"> 
          Already have an account? 
          <span>
            <Link to="/login">
              Log in
            </Link>
          </span>
        </p>
      </Card>
    </div>
  );
}

export default SignupPage;
