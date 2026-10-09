import React, { useContext } from "react";
import IStaffContext from "../interfaces/IStaffContext";
import { StaffContext,  } from "../contexts/StaffContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import StaffService from "../services/StaffService";


const DeleteStaff: React.FC<{staffId: number}> = ({ staffId }) => {
    const {onDeleteStaff} = useContext(StaffContext) as IStaffContext;
    const handleDeleteStaff = async () => {
        try {
            await StaffService.deleteStaff(staffId);
            onDeleteStaff(staffId);
            alert("Staff member deleted successfully!");  
        } catch (error) {
            console.error("Error deleting staff member", error);   
        }
    }
    return(
        <div className="delete-staff">
            <section className=" flex flex-col gap-4">
                <button 
                    onClick={handleDeleteStaff} 
                    className=" text-black"
                    aria-label="DeleteStaff">
                        <FontAwesomeIcon icon={faTrashCan}/>
                </button>
            </section>
        </div>
    )
 }
export default DeleteStaff;