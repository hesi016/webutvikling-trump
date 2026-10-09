
import { useContext, useState } from "react";

import StaffService from "../services/StaffService";
import ImageUploadService from "../services/ImageUploadService";
import IStaffContext from "../interfaces/IStaffContext";
import IStaff from "../interfaces/IStaff";
import { StaffContext } from "../contexts/StaffContext";

    const AddStaff  = () => {
        const {addStaff} = useContext(StaffContext) as IStaffContext;

        const UploadStatus ={
            Idle:  "Idle",
            Uploading: "Uploading",
            Finished: "Finished",
            Error: "Error",
        };
      
    const [newStaff, setNewStaff] = useState<IStaff>({
        id: 0,
        firstName: "",
        lastName: "",
        profileImage: "",
        position: "",
        status:""
    });

    const[image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [status, setStatus] = useState<string>(UploadStatus.Idle);


    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewStaff({ ...newStaff, [name]: value });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files? e.target.files[0] : null;
        setImage(file);
    
        if(file) {
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        } else {
            setPreviewUrl(null);
        }
    };
    
    const handleAddNewStaff= async () => {
        setStatus(UploadStatus.Uploading);

            try{
              let uploadedImage = "";
              if(image) {
                const response = await ImageUploadService.uploadImage(image);
                uploadedImage = response.fileName;
              }

                const newAddedStaff: IStaff = {
                    ...newStaff,
                    profileImage: uploadedImage
                };

                await StaffService.addStaff(newAddedStaff);

                setNewStaff({
                    id: 0,
                    firstName: "",
                    lastName: "",
                    profileImage: "",
                    position: "",
                    status:""
                });
                setImage(null);
                setPreviewUrl(null); 
                setStatus(UploadStatus.Finished);

                alert("New staff member was added to the team!");
            } catch (error) {
              console.error("Upload error:", error);
              setStatus(UploadStatus.Error);
              alert("Failed to add new staff member. Please try again!");
            }
        }

    return (
    <section className="p-4 sm:p-6 bg-white shadow-md rounded-md max-w-lg sm:max-w-md md:max-w-lg lg:max-w-4xl mx-auto">
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-1">First Name</label>
                <input 
                    type="text"
                    name="firstName"
                    value={newStaff.firstName}
                    onChange={handleUserInput}
                    placeholder="Enter first name"
                    className="shadow appearance-none border rounded w-full py-2 sm:py-1 md:py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                    />  

            <label className="block text-gray-700 text-sm font-bold mb-1">Last Name</label>
                <input 
                    type="text"
                    name="lastName"
                    value={newStaff.lastName}
                    onChange={handleUserInput}
                    placeholder="Enter last name"
                    className="shadow appearance-none border rounded w-full py-2 sm:py-1 md:py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                    />  

            <label className="block text-gray-700 text-sm font-bold mb-1">Position</label>
                <input 
                    type="text"
                    name="position"
                    value={newStaff.position}
                    onChange={handleUserInput}
                    placeholder="Enter position"
                    className="shadow appearance-none border rounded w-full py-2 sm:py-1 md:py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                    />  

            <label className="block text-gray-700 text-sm font-bold mb-1">Status</label>
                <select
                    name="status"
                    value={newStaff.status}
                    onChange={handleUserInput}
                    className="shadow appearance-none border rounded w-full py-2 sm:py-1 md:py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                    >
                    <option value="" disabled>Select Status</option>
                    <option value="active">Active</option>
                    <option value="retired">Retired</option>
                </select>

            <label className="block text-gray-700 text-sm font-bold mb-1 mt-4">Upload Staff Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full p-2 border-gray-300 rounded mb-4"
                />

            {previewUrl && (
                <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Image Preview</label>
                    <img
                        src={previewUrl}
                        alt="Selected preview"
                        className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-lg"
                    />
                </div>
            )}
                <button 
                    onClick={handleAddNewStaff} 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 sm:py-2 sm:px-3 md:py-2 md:px-4 lg:py-2 lg:px-5 rounded focus:outline-none focus:shadow-outline"
                    >
                    Legg til
                </button>
            </div>
        </section>
    )  
}
export default AddStaff;