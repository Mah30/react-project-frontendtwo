import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Booking from "../Bookings/Booking";
import { SessionContext } from "../../SessionContext/SessionContext";
import DeleteClass from "./DeleteClass";
import { Button } from "flowbite-react";


const API_URL = import.meta.env.VITE_API_URL;


const ClassesDetails = () => {

    const { token, tokenPayload } = useContext(SessionContext) //para verificar se é admin

    const { classId } = useParams(); 
    const [classData, setClassData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();

  
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
            setClassData(data); 
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
    if (error) return <p>Error: {error}</p>;
   
   
    return ( 
        <div>
        <h1>{classData.name}</h1>
        <p><strong>Capacity:</strong> {classData.capacity}</p>
        <p><strong>Duration:</strong> {classData.duration} minutes</p>
        <p><strong>Schedule:</strong></p>
        
        <ul>
          {classData.schedule.map((date, index) => (
            <li key={index}>{new Date(date).toLocaleString()}</li>
          ))}
        </ul>
        
        <p><strong>Bookings:</strong> {classData.bookings.length}</p>
  
        
        <Link to="/classes">
          <Button color="blue">Back to Classes</Button>
        </Link>

         {
          tokenPayload.isAdmin ? (
          <Link to={`/classes/${classId}/update`}>
             <Button>Edit Class</Button>
             <DeleteClass classId={classId} onDelete={() => setTimeout(() => navigate("/classes"), 1000)} />
          </Link> 
          
         ):(

         /* Componente de reserva reutilizável */
      <Booking classId={classId} onBookingSuccess={() => console.log("Booking successful")} /> 

    )}

      </div>
    );
  };
 
export default ClassesDetails;