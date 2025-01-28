import { useContext, useState } from "react";
import { Card } from "flowbite-react";
import { SessionContext } from "../../SessionContext/SessionContext";


const API_URL = import.meta.env.VITE_API_URL;

const CreateClass = ({onCreate}) => {


  const { token, tokenPayload } = useContext(SessionContext)

  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState("0");
  const [schedule, setSchedule] = useState([]);
  const [duration, setDuration] = useState("0");
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  if (!(tokenPayload && tokenPayload.isAdmin)) {
    return <></>;
  }

  // Atualiza o estado de valor inserido pelo usuário
  const handleName = (event) => setName(event.target.value);
  const handleCapacity = (event) => setCapacity(event.target.value);
  const handleSchedule = (event) => setSchedule(event.target.value);
  const handleDuration = (event) => setDuration(event.target.value);

  const handleCreateClass = async (event) => {
    event.preventDefault();

    const newClass = { 
      name: name,
      capacity: capacity,
      schedule: schedule,
      duration: duration }

      try {
        const createResponse = await fetch(
        `${API_URL}/api/classes`, /* newClass, */ {
          method: "POST", // Método HTTP
          headers: {
            "Content-Type": "application/json", // Define o tipo de conteúdo
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newClass), // Converte o obj em JSON
        });
  
        if (!createResponse.ok) {
          const newClassData = await createResponse.json();
          throw new Error(newClassData.message || 'Error while creating the class');

        }
        // Redireciona a pessoa para a página de login após o cadastro bem-sucedido
        setSuccess("Class created successful!");
        setName("");
        setCapacity("0");
        setSchedule([]);
        setDuration("0");
        if (onCreate) {
          onCreate();
        }

      } catch (error) {
        console.error("Error during create class:", error.message);
        setError(error.message || "An unexpected error occurred.");
      }
  }
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm md:max-w-md lg:max-w-lg p-8 ..." >

        <form onSubmit={handleCreateClass} className="p-4">
          <h3 className="text-center font-bold mb-4">Create new class</h3>

          <label className="label" htmlFor="name">Name</label>
          <input
            className="input"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleName}
            placeholder="Type the name of the class"
            autoComplete="off"
          />

          <label className="label" htmlFor="capacity">Capacity</label>
            <input
            className="input"
            type="text"
            name="capacity"
            id="cacacity"
            value={capacity}
            onChange={handleCapacity}
            placeholder="Type the capacity"
            autoComplete="off"
          />

          <label className="label" htmlFor="schedule">Schedule</label>
          <input
            className="input"
            type="schedule"
            name="schedule"
            id="schedule"
            value={schedule}
            onChange={handleSchedule}
            autoComplete="off"
          />

          <label className="label" htmlFor="duration">Duration</label>
          <input
            className="input"
            type="duration"
            name="duration"
            id="duration"
            value={duration}
            onChange={handleDuration}
            autoComplete="off"
          />


          {/* Botão para criar conta */}
          <button className="mt-4" type="submit">Create Class</button>
        </form>

        {/* Mensagem de erro exibida se houver um erro */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Mensagem de sucesso */}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
      </Card>
    </div>
  );
}

export default CreateClass;
