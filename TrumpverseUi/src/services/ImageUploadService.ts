import axios from "axios";

const ImageUploadService = (
    ()=> {
        const imageUploadEndpoint = "http://localhost:5027/uploadImage";
        const uploadImage = async (file: File) => {
            const formData = new FormData();
            formData.append("file", file);
          
            try {
              const response = await axios.post<{ fileName: string }>("http://localhost:5027/UploadImage", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
              return response.data; 
            } catch (error) {
              console.error("Error uploading image:", error);
              throw error;
            }
          };
          
        return {
            uploadImage
        }
    }  
)();

export default ImageUploadService; 