import { useContext, useState } from "react";
import { Card } from "flowbite-react";
import { SessionContext } from "../../SessionContext/SessionContext";


const API_URL = import.meta.env.VITE_API_URL;

const CreateClass = ({onCreate}) => {


  const { token, tokenPayload } = useContext(SessionContext)

  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState('');
 /*  const [image, setImage] = useState(''); */
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  

  if (!(tokenPayload && tokenPayload.isAdmin)) {
    return <></>;
  }

  // Atualiza o estado de valor inserido pelo usuário
  const handleName = (event) => setName(event.target.value);
  const handleCapacity = (event) => setCapacity(event.target.value);
  const handleSchedule = (event) => setSchedule(event.target.value);
  const handleDuration = (event) => setDuration(event.target.value);
  /* const handleImageChange = (event) => setImageFile(event.target.value); */



  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Pega o primeiro arquivo selecionado
    if (file) {
      setImageFile(file); // Atualiza o estado com o arquivo da imagem
    }
  };

  
  // Função para fazer upload da imagem para o backend (Cloudinary)
  const handleImageUpload = async () => {
    if (!imageFile) {
      setError("Please select an image to upload.");
      return;
    }

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("image", imageFile); //envia img

    try {
      const response = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error uploading image");
      }

      const data = await response.json();
      
      setImageUrl(data.imageUrl); // Salva a URL 
      setUploading(false);
    } catch (error) {
      console.error("Error uploading image:", error.message);
      setError("Failed to upload image. Please try again.");
      setUploading(false);
    }
  };


  // Função para criar a classe no MongoDB
  const handleCreateClass = async (event) => {
    event.preventDefault();

    if (!imageUrl) {
      setError("Please upload an image before creating the class.");
      return;
    }


    const newClass = { 
      name: name,
      capacity: capacity,
      schedule: schedule,
      duration: duration,
      description: description,
      image: imageUrl, }


      try {
        const createResponse = await fetch(
        `${API_URL}/api/classes`, /* newClass, */ {
          method: "POST", // Método HTTP
          headers: {
            "Content-Type": "application/json", // Define o tipo de conteúdo
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newClass), // Converte o obj em JSON
        });
  
        if (!createResponse.ok) {
          const newClassData = await createResponse.json();
          throw new Error(newClassData.message || 'Error while creating the class');

        }
        // Redireciona a pessoa para a página de login após o cadastro bem-sucedido
        setSuccess("Class created successful!");
        setName("");
        setCapacity("");
        setSchedule([]);
        setDuration("");
        setDescription('');
        setImageFile(null);
        setImageUrl("");
    
        setUploading(true);    

        if (onCreate) {
          onCreate();
        }

      } catch (error) {
        console.error("Error during create class:", error.message);
        setError(error.message || "An unexpected error occurred.");
      }
  }
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm md:max-w-md lg:max-w-lg p-8">
        <form onSubmit={handleCreateClass} className="p-4">
          <h3 className="text-center font-bold mb-4">Create new class</h3>

          <label className="label" htmlFor="name">
            Name
          </label>
          <input
            className="input"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleName}
            placeholder="Type the name of the class"
            autoComplete="off"
          />

          <label className="label" htmlFor="capacity">
            Capacity
          </label>
          <input
            className="input"
            type="text"
            name="capacity"
            id="capacity"
            value={capacity}
            onChange={handleCapacity}
            placeholder="Type the capacity"
            autoComplete="off"
          />

          <label className="label" htmlFor="schedule">
            Schedule
          </label>
          <input
            className="input"
            type="text"
            name="schedule"
            id="schedule"
            value={schedule}
            onChange={handleSchedule}
            autoComplete="off"
          />

          <label className="label" htmlFor="duration">
            Duration
          </label>
          <input
            className="input"
            type="text"
            name="duration"
            id="duration"
            value={duration}
            onChange={handleDuration}
            autoComplete="off"
          />

          <label className="label" htmlFor="image">
            Upload Image
          </label>
          <input type="file" name="image" id="image" accept="image/*" onChange={handleImageChange} />

          {uploading && <p className="text-blue-500">Uploading image...</p>}

          {/* Botão para fazer upload da imagem */}
          <button
            type="button"
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleImageUpload}
          >
            Upload Image
          </button>

          {imageUrl && <img src={imageUrl} alt="Preview" className="h-32 object-cover mt-2" />}

          {/* Botão para criar a classe */}
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" type="submit">
            Create Class
          </button>
        </form>

        {/* Mensagem de erro exibida se houver um erro */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Mensagem de sucesso */}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
      </Card>
    </div>
  );
};

export default CreateClass;
