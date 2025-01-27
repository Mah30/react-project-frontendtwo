import { useState } from "react";


const API_URL = import.meta.env.VITE_API_URL;


const Booking = ({ classId, onBookingSuccess, }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);



  const handleBooking = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const studentIdFromToken = JSON.parse(atob(localStorage.getItem("authToken").split(".")[1])).studentId; //falta usar a funcao


    try {
      const response = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Token de autenticação
        },
        body: JSON.stringify({
          student: studentIdFromToken, 
          class: classId, 
          date: new Date().toISOString(), // Data at
        }),
      });


      if (response.ok) {
        const result = await response.json();
        setSuccessMessage("Successfully booked the class!");
        if (onBookingSuccess) {
          onBookingSuccess(result); 
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to book the class.");
      }
    } catch (error) {
      console.error("Error booking class:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
     <div>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleBooking} disabled={loading}>
        {loading ? "Processing..." : "Enroll in Class"}
      </button>
    </div>
  );
};

export default Booking;