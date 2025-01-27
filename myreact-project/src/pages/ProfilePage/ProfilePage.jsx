import { useContext, useEffect, useState } from "react";

import { Card } from "flowbite-react";
import { SessionContext } from "../../SessionContext/SessionContext";


const API_URL = import.meta.env.VITE_API_URL;



const ProfilePage= () => {
  const { token } = useContext(SessionContext)

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  /* const [password, setPassword] = useState(''); */
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  
  
  const studentId = JSON.parse(atob(token.split(".")[1])).studentId;

  const loadProfile = async () => {
    try {
        const response = await fetch(`${API_URL}/api/students/${studentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (response.ok) {
            const student = await response.json();
            setFirstName(student.firstName);
            setLastName(student.lastName);
            setEmail(student.email);
        } else {
            setError(`Unable to load profile: ${await response.json()}`)
        }
    } catch (error) {
        setError(`Unable to load profile: ${error}`)
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  // Atualiza o estado de valor inserido pelo usuário
  const handleFirstName = (event) => setFirstName(event.target.value);
  const handleLastName = (event) => setLastName(event.target.value);
  const handleEmail = (event) => setEmail(event.target.value);
  /* const handlePassword = (event) => setPassword(event.target.value); */

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    /* submitCallback({firstName, lastName, email, password})  */

    const updateStudent = { 
      firstName,
      lastName,
      email
    }

    /* if (password) {
        updateStudent.password = password;
    } */

      try {
        const registerResponse = await fetch(
        `${API_URL}/api/students/${studentId}`, /* newStudent, */ {
          method: "PUT", // Método HTTP
          headers: {
            "Content-Type": "application/json", // Define o tipo de conteúdo
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateStudent), // Converte o obj em JSON
        });
  
        if (!registerResponse.ok) {
          const newStudentData = await registerResponse.json();
          throw new Error(newStudentData.message || 'Error while registering the user');

        }
        // Redireciona a pessoa para a página de login após o cadastro bem-sucedido
        setSuccess("Profile updated successful!");
      } catch (error) {
        console.error("Error during update profile:", error.message);
        setError(error.message || "An unexpected error occurred.");
      }
  }


  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm md:max-w-md lg:max-w-lg p-8 ..." >

        <form onSubmit={handleUpdateProfile} className="p-4">
          <h3 className="text-center font-bold mb-4">My Profile</h3>

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
{/*           <label className="label" htmlFor="password">Password</label>
          <input
            className="input"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePassword}
            autoComplete="off"
          /> */}


          {/* Botão para criar conta */}
          <button className="mt-4" type="submit">Save Changes</button>
        </form>

        {/* Mensagem de erro exibida se houver um erro */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Mensagem de sucesso */}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
      </Card>
    </div>
  );
}
 export default ProfilePage;