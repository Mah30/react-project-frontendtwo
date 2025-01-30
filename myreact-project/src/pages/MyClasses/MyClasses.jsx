import { useState, useEffect } from 'react';
import DeleteBooking from '../Bookings/DeleteBooking';


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const MyClasses = () => {
  const [classes, setClasses] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  // Função para buscar as classes do estudante autenticado
  const fetchUserClasses = async () => {
    setLoading(true);
    setError(null); 

    try {
        const token = localStorage.getItem('authToken'); // Recupera o token armazenado

       
        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }


      const response = await fetch(`${API_URL}/api/bookings/student`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`, // 
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch classes');
      }

      const bookings = await response.json();

      // Extraindo apenas as informações das classes a partir das reservas
      const bookedClasses = bookings.map((booking) => ({
        ...booking.class,
        bookingId: booking._id,
      }));
      setClasses(bookedClasses); // Atualiza o estado com as classes
    } catch (err) {
      console.error("Error fetching user classes:", err);
      setError(err.message); // Captura erros
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  // useEffect para carregar as classes automaticamente ao montar o componente (opcional)
  useEffect(() => {
    fetchUserClasses();
  }, []);


  return (
    <div>
     <h1>My Classes</h1>

      {/* Exibe erro, se houver */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Exibe carregando, se aplicável */}
      {loading && <p>Loading...</p>}

      {/* Lista as classes do estudante */}
      <ul>
        {classes.length === 0 && !loading && <p>No classes found.</p>}
        {classes.map((classItem) => (
            
          <li key={classItem.bookingId}>
            <h3>{classItem.name}</h3>
            { classItem.schedule ? 
            <p>
              <strong>Schedule:</strong>{" "}
              {classItem.schedule.map((date) =>
                new Date(date).toLocaleString()
              ).join(", ")}
            </p>
            : <p>No schedule defined yet</p>
}
            <p>
              <strong>Duration:</strong> {classItem.duration} minutes
            </p>
            <div>
                <DeleteBooking bookingId={classItem.bookingId} onDelete={fetchUserClasses} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyClasses;