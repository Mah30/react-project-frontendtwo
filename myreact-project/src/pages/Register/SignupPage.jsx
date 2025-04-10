import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";
/* import { Button } from "flowbite-react";
 */

const API_URL = import.meta.env.VITE_API_URL;

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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 to-blue-200 p-4">
      <Card className="w-full max-w-sm md:max-w-md lg:max-w-lg p-8 flex flex-col justify-between h-[600px] bg-white/90 backdrop-blur shadow-xl border border-white rounded-xl">
        <form onSubmit={handleSignupSubmit} className="space-y-4">
          
          <h3 className="text-center text-2xl font-bold text-gray-800 mb-4">Sign Up for Fitness</h3>
  
          {/* Nome */}
          <label className="label" htmlFor="firstname">First Name</label>

            <input
              className="input"
              type="text"
              name="firstname"
              id="firstname"
              value={firstName}
              onChange={handleFirstName}
              placeholder="Your first name"
              autoComplete="off"
            />
  
            <input
              className="input"
              type="text"
              name="lastname"
              id="lastname"
              value={lastName}
              onChange={handleLastName}
              placeholder="Your last name"
              autoComplete="off"
            />
    
          {/* Email */}
          <label className="label" htmlFor="email">Email</label>
            <input
              className="input"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleEmail}
              placeholder="you@example.com"
              autoComplete="off"
            />
  
          {/* Senha */}
          <label className="label" htmlFor="password">Password</label>
            <input
              className="input"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handlePassword}
              placeholder="••••••••"
              autoComplete="off"
            />
  
          {/* Botão de criação */}
          <button className="w-full bg-green-600 text-white rounded py-2 font-bold hover:bg-green-700 transition mt-4" type="submit">
            Create Account
          </button>
  
          {/* Botão de voltar */}
          <Link to="/" className="block text-center text-sm text-blue-600 hover:underline mt-2">
            ⬅ Back to Home
          </Link>
        </form>
  
        {/* Mensagens */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {success && <p className="text-green-500 text-center mt-4">{success}</p>}
  
        {/* Link para login */}
        <div className="flex justify-end mt-2">
          <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline font-medium">
                Log in
              </Link>
          </p>
        </div>
        
      </Card>
    </div>
  );
  
}

export default SignupPage;
