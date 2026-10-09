// Kalle på Apiet i React(få tilgang til databasen)

import axios from "axios";
import IStaff from "../interfaces/IStaff";

const StaffService = (
    () => {
        const staff_url ="http://localhost:5027/api/Staff";

        const getStaff = async()=> {
            try{
                const response = await axios.get<IStaff[]>(staff_url);
                return response.data;
            } catch (error){
                console.error("Error fetching staff:", error);
                throw error;
            }
        }

        const getStaffById = async(id: number)=> {
            try {
                const response = await axios.get<IStaff>(`${staff_url}/${id}`);
                return response.data;
            } catch (error) {
                console.error(`Error fetching staff by ID ${id} :`, error);
                throw error;
            }    
        }

        const getStaffByStatus = async(status: string)=> {
            try {
                const response = await axios.get<IStaff[]>(`${staff_url}/status/${status}`);
                return response.data;
            } catch (error) {
                console.error(`Error fetching staff by status ${status} :`, error);
                throw error;
            }
        }
        
        const addStaff = async (newStaff: IStaff) => {
            try {
                const response = await axios.post<IStaff>(staff_url, newStaff);
                return response.data; 
            } catch (error) {
                console.log("Error adding staff:", error);
                throw error;
            }
        }

        const updateStaff = async(updatedStaff: IStaff) => {
            try {
                const response = await axios.put<IStaff>(`${staff_url}/${updatedStaff.id}`, updatedStaff);
                return response.data;
            } catch (error) {
                console.error("There was an error updating the staff:", error)
                throw error;
            }
        }

        const deleteStaff = async (id: number) => {
            try {
                const response = await axios.delete(`${staff_url}/${id}`);
                return response.data;
            } catch (error) {
                console.error("Error deleting staff member", error)
                throw error;
            }
        }

        return {
            getStaff,
            getStaffById,
            getStaffByStatus,
            addStaff,
            updateStaff,
            deleteStaff
        }
    }
)();
export default StaffService;