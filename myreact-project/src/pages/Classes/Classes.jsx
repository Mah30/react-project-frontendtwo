import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Classes = ({ isHomepage, isUserSpace }) => {
  const [classes, setClasses] = useState([]); // Estado para armazenar as classes
  const [loading, setLoading] = useState(true); // Indica se os dados estão carregando
  const [error, setError] = useState(null); // Armazena erros, caso ocorram
  const [selectedClass, setSelectedClass] = useState()

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
      setLoading(false); // Finaliza o estado de carregamento
    }
  };

  // carrega as classes aqui
    useEffect(() => {
    fetchClasses();
  }, []); 

    /* setClasses(mockClasses) */; // Insere os títulos fornecidos no estado
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
        
        <section>
          <ul>
            {classesToDisplay.map((classData) => (
              <li key={classData._id}>
                <Link to={`/class/${classData._id}`}>{classData.name}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};
 
export default Classes;