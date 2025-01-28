import { useContext, useEffect, useState } from "react";
import { Card } from "flowbite-react";
import { SessionContext } from "../../SessionContext/SessionContext";
import { useNavigate, useParams } from "react-router-dom";


const API_URL = import.meta.env.VITE_API_URL;

const UpdateClass = () => {

  const navigate = useNavigate();

  const { classId } = useParams(); 

  const { token } = useContext(SessionContext)

  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState("0");
  const [schedule, setSchedule] = useState([]);
  const [duration, setDuration] = useState("0");
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchClassDetails = async () => {
        try {
          const response = await fetch(`${API_URL}/api/classes/${classId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              }
            }
          );
       

          if (response.ok) {
            const data = await response.json();
            setName(data.name);
            setCapacity(data.capacity);
            setSchedule(data.schedule);
            setDuration(data.duration); 
          } else {
            console.error(`HTTP Error: ${response.status}`);
            setError(`HTTP Error: ${response.status}`);
          }
        } catch (error) {
          console.error("Erro ao buscar detalhes da classe:", error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchClassDetails();
    }, [classId]);

    if (loading) return <p>Loading class details...</p>;

  // Atualiza o estado de valor inserido pelo usuário
  const handleName = (event) => setName(event.target.value);
  const handleCapacity = (event) => setCapacity(event.target.value);
  const handleSchedule = (event) => setSchedule(event.target.value);
  const handleDuration = (event) => setDuration(event.target.value);

  const handleUpdateClass = async (event) => {
    event.preventDefault();

    const newClass = { 
      name: name,
      capacity: capacity,
      schedule: schedule,
      duration: duration }

      try {
        const updateResponse = await fetch(
        `${API_URL}/api/classes/${classId}`, /* newClass, */ {
          method: "PUT", // Método HTTP
          headers: {
            "Content-Type": "application/json", // Define o tipo de conteúdo
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newClass), // Converte o obj em JSON
        });
  
        if (!updateResponse.ok) {
          const newClassData = await updateResponse.json();
          throw new Error(newClassData.message || 'Error while creating the class');

        }
        // Redireciona a pessoa para a página de login após o cadastro bem-sucedido
        setSuccess("Class updated successful!");
        setTimeout(() => navigate(`/classes/${classId}`), 2000);

      } catch (error) {
        console.error("Error during update class:", error.message);
        setError(error.message || "An unexpected error occurred.");
      }
  }
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm md:max-w-md lg:max-w-lg p-8 ..." >

        <form onSubmit={handleUpdateClass} className="p-4">
          <h3 className="text-center font-bold mb-4">Update class</h3>

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
          <button className="mt-4" type="submit">Update Class</button>
        </form>

        {/* Mensagem de erro exibida se houver um erro */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Mensagem de sucesso */}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
      </Card>
    </div>
  );
}

export default UpdateClass;
