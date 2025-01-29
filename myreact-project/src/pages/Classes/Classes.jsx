import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CreateClass from "./CreateClass";
import { SessionContext } from "../../SessionContext/SessionContext";



const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Classes = ({ isHomepage, isUserSpace, ClassDetails }) => {
  const [classes, setClasses] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [selectedClass, setSelectedClass] = useState()
  

   const { tokenPayload } = useContext(SessionContext); 


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
    ? classes.slice(0, 4)
    : isUserSpace
    ? classes.slice(0, 2)
    : classes;



  return (
    <div>
      {selectedClass ? (
        <ClassDetails 
          classData={selectedClass}
          onBack={() => setSelectedClass(null)}
        />
      ) : (
        
        <section style={{display: "-ms-grid", gridTemplateColumns:"repeatauto-fit, minmax(250px, 1fr))", gap: "16px", padding: "20px" }}>
          <ul>

            {classesToDisplay.map((classData) => (
              <li key={classData._id}>

                <Link to={`/classes/${classData._id}`}>{classData.name}

                {tokenPayload?.isAdmin && (
                <button 
                style={{ 
                  marginRight: "10px", 
                  padding: "8px 12px", 
                  backgroundColor: "#4CAF50", 
                  color: "white", 
                  border: "none", 
                  cursor: "pointer" }}>
                      Update
                </button>
                )}

                </Link>

              </li>
            ))}
          </ul>
        </section>
      )}

      <CreateClass onCreate={fetchClasses} />
    </div>
  );
};
 
export default Classes;