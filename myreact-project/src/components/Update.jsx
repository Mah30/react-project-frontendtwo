import { useState } from "react";

const UpdateForm = ({ classId, initialData, onUpdateSuccess }) => {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/classes/${classId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Dados enviados ao backend
      });

      if (response.ok) {
        const updatedClass = await response.json();
        onUpdateSuccess(updatedClass); // Chama callback após sucesso
      } else {
        console.error(`HTTP Error: ${response.status}`);
        setError("Failed to update class");
      }
    } catch (error) {
      console.error("Error updating class:", error);
      setError("An error occurred while updating the class");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Class</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Capacity:
          <input
            type="number"
            name="capacity"
            value={formData.capacity || ""}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Duration:
          <input
            type="number"
            name="duration"
            value={formData.duration || ""}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Class"}
      </button>
    </form>
  );
};

export default UpdateForm;
