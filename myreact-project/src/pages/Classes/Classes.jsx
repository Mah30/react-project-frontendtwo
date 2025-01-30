import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "flowbite-react";
import CreateClass from "./CreateClass";
import { SessionContext } from "../../SessionContext/SessionContext";

import AdvancedYoga from "../../assets/images/AdvancedYoga.jpg";
import BasicYoga from "../../assets/images/BasicYoga.jpg";
import CrossFit from "../../assets/images/CrossFit.jpg";
import Fitnessdance from "../../assets/images/Fitnessdance.jpg";
import Jump from "../../assets/images/Jump.jpg";
import Pilates from "../../assets/images/Pilates.jpg";
import RhythmicGymnastics from "../../assets/images/RhythmicGymnastics.jpg";



const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";


const imagesMap = {
  "Advanced Yoga": AdvancedYoga,
  "Basic Yoga": BasicYoga,
  "CrossFit": CrossFit,
  "Fitness dance": Fitnessdance,
  "Jump": Jump,
  "Pilates": Pilates,
  "Rhythmic Gymnastics": RhythmicGymnastics,

}


const Classes = ({ isHomepage, isUserSpace, ClassDetails }) => {
  const [classes, setClasses] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [selectedClass, setSelectedClass] = useState()
  

   const { tokenPayload } = useContext(SessionContext); //p verificar se é admin


  // Função para buscar as classes do backend
  const fetchClasses = async () => {
    try {
      const response = await fetch(`${API_URL}/api/classes/`);
      if (response.ok) {
        const data = await response.json();
        setClasses(data); // Atualiza o estado com os dados das classes
      } else {
        console.error(`HTTP Error: ${response.status}`);
        setError(`HTTP Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Something went wrong:", error);
      setError(error.message);
    } finally {
      setLoading(false); 
    }
  };

  // useEffect p carregar os cursos
    useEffect(() => {
    fetchClasses();
  }, []); 


    /* setLoading(false); */ // Finaliza o carregamento
   
    if (loading) return <p>Loading classes...</p>;
    if (error) return <p>Error loading classes: {error}</p>;


  // Filtra o número de classes a exibir
  const classesToDisplay = isHomepage
    ? classes.slice(0, 3)
    : isUserSpace
    ? classes.slice(0, 2)
    : classes;



  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Your Perfect Class is Here!
      </h1>

      {selectedClass ? (
        <ClassDetails 
          classData={selectedClass}
          onBack={() => setSelectedClass(null)}
        />
      ) : (
        
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {classesToDisplay.map((classData) => (
            <Card key={classData._id} className="max-w-sm mx-auto shadow-lg">
              
              
              <img
                src={imagesMap[classData.name] || "https://placeholder.com/400"} 
                alt={classData.name}
                className="w-full h-52 object-cover rounded-t-lg"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{classData.name}</h3>
                <p className="text-sm text-gray-600">{classData.description || "No description available"}</p>

                <div className="flex justify-end mt-4">
                  <Link to={`/classes/${classData._id}`}>
                    <Button color="blue">View Details</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </section>
      )}

      <CreateClass onCreate={fetchClasses} />
    </div>
  );
};
 
export default Classes;