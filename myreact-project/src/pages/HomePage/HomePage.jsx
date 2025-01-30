import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const HomePage = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(`${API_URL}/api/classes/`);
        if (response.ok) {
          const data = await response.json();
          setClasses(data);
        } else {
          console.error(`HTTP Error: ${response.status}`);
          setError(`HTTP Error: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading classes...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;


  // Mostrar apenas as tres classes
  const classesToDisplay = classes.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Find Your Perfect Class
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {classesToDisplay.map((classData) => (
          <div key={classData._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={classData.image || "https://placeholder.com/400"} 
              alt={classData.name}
              className="w-full h-52 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900">{classData.name}</h2>
              <p className="text-gray-600 text-sm mt-2">
                {classData.description || "A great class to help you learn and grow."}
              </p>

              <Link
                to={`/classes/${classData._id}`}
                className="mt-4 inline-block text-blue-600 hover:underline"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;