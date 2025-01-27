import { useContext, useState } from "react";
import { SessionContext } from "../../SessionContext/SessionContext";

const API_URL = import.meta.env.VITE_API_URL;

const DeleteBooking = ({ bookingId, onDelete }) => {

    const { token } = useContext(SessionContext)

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const deleteBooking = async () => {
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await fetch(`${API_URL}/api/bookings/${bookingId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if (response.ok) {
                const result = await response.json();
                setSuccessMessage("Successfully deleted the booking!");
                if (onDelete) {
                  setTimeout(() => onDelete(result), 1000); 
                }
              } else {
                const errorData = await response.json();
                setError(errorData.message || "Failed to delete the booking.");
              }
        } catch (error) {
            console.error("Error deleting booking:", error);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            {successMessage ? <p style={{ color: "green" }}>{successMessage}</p> : (
                <>
                {error && <p style={{ color: "red" }}>{error}</p>}

                <button onClick={deleteBooking} disabled={loading || successMessage}>
                    {loading ? "Deleting..." : "Delete Booking"}
                </button>
                </>
            )}
        </div>
    );
}

export default DeleteBooking;