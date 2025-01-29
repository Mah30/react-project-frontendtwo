import { useContext, useState } from "react";
/* import { Card } from "flowbite-react"; */
import { SessionContext } from "../../SessionContext/SessionContext";


const API_URL = import.meta.env.VITE_API_URL;

const DeleteClass = ({classId, onDelete}) => {


  const { token, tokenPayload } = useContext(SessionContext)

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  if (!(tokenPayload && tokenPayload.isAdmin)) {
    return <></>;
  }

  const handleDeleteClass = async (event) => {
    event.preventDefault();

      try {
        const deleteResponse = await fetch(
        `${API_URL}/api/classes/${classId}`, /* newClass, */ {
          method: "DELETE", // Método HTTP
          headers: {
            "Content-Type": "application/json", // Define o tipo de conteúdo
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!deleteResponse.ok) {
          const data = await deleteResponse.json();
          throw new Error(data.message || 'Error while creating the class');

        }
        // Redireciona a pessoa para a página de login após o cadastro bem-sucedido
        setSuccess("Class deleted successful!");
        if (onDelete) {
          onDelete();
        }

      } catch (error) {
        console.error("Error during delete class:", error.message);
        setError(error.message || "An unexpected error occurred.");
      }
  }
  
  return (
    <>
    <button onClick={handleDeleteClass}>Delete Class</button>

      {/* Mensagem de erro exibida se houver um erro */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Mensagem de sucesso */}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}
    </>
  );
}

export default DeleteClass;
