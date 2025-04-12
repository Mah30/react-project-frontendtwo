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
      if (!token) {
        console.warn("No token found. Skipping fetch.");
        return;
      }

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
    }, [classId, token]);
  
    if (loading) return <p>Loading class details...</p>;
    if (error) return <p>Error: {error}</p>;
   
   
    return (
      <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg text-gray-800">
        <h1 className="text-3xl font-bold mb-4 text-blue-800">{classData.name}</h1>
    
        <div className="space-y-2 mb-6">
          <p><strong>Capacity:</strong> {classData.capacity}</p>
          <p><strong>Duration:</strong> {classData.duration} minutes</p>
          
          <div>
            <p className="font-semibold">Schedule:</p>
            <ul className="list-disc list-inside">
              {classData.schedule.map((date, index) => (
                <li key={index}>{new Date(date).toLocaleString()}</li>
              ))}
            </ul>
          </div>
    
          <p><strong>Bookings:</strong> {classData.bookings.length}</p>
        </div>
    
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <Link to="/classes">
            <Button color="blue">Back to Classes</Button>
          </Link>
    
          {tokenPayload.isAdmin ? (
            <>
              <Link to={`/classes/${classId}/update`}>
                <Button>Edit Class</Button>
              </Link>
    
              <DeleteClass
                classId={classId}
                onDelete={() => setTimeout(() => navigate("/classes"), 1000)}
              />
            </>
          ) : (
            <Booking
              classId={classId}
              onBookingSuccess={() => console.log("Booking successful")}
            />
          )}
        </div>
      </div>
    );
  };
 
export default ClassesDetails;