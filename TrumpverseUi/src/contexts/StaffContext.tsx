import { createContext, useState, ReactNode, FC, useEffect,  } from "react";
import IStaffContext from "../interfaces/IStaffContext";
import IStaff from "../interfaces/IStaff";
import StaffService from "../services/StaffService";

export const StaffContext = createContext<IStaffContext | null>(null);

interface Props {
    children: ReactNode
}

export const StaffProvider : FC<Props>  = ({ children }) => {
    const [staffList, setStaffList] = useState<IStaff[]>([]);

    const getStaff = async () => {
        try {
            const staffList = await StaffService.getStaff();
            setStaffList(staffList || []);
        } catch (error) {
            console.error("Failed to get Staff:", error);  
        }
    }
    useEffect(() => {
        getStaff();
    }, []);
    
    const addStaff = async (newStaff: IStaff) => {
        try {
            const addedStaff = await StaffService.addStaff(newStaff);
            setStaffList((prev) => [...prev, newStaff]);
        } catch (error) {
            console.error("Error adding staff:", error);
        }
    }
    
    const onUpdateStaff= async (editedStaff: IStaff) => {
        try {
            const updatedStaff = await StaffService.updateStaff(editedStaff);
            setStaffList((current) =>
                current ? current.map((staffMember) => 
                    staffMember.id === updatedStaff.id ? updatedStaff : staffMember )
            : []
            );
        } catch (error) {
            console.error("Error updating staff:", error)
        }
    }

    const onDeleteStaff = async (id: number) => {
        try {
            await StaffService.deleteStaff(id);
            setStaffList((current) =>  {
                const updatedList =   current.filter((staffMember) => staffMember.id !== id) 
                return updatedList
            });
        } catch (error) {
            console.error("Error deleting staff", error);
        }
    }

    const fetchStaffByStatus = async (status: string) => {
        try {
            let staffByStatus;
    
            if (status === "" || status === "All statuses") {
                const allStaff = await StaffService.getStaff();
                staffByStatus = allStaff.filter(staff =>
                    staff.status.toLowerCase() === "active" || staff.status.toLowerCase() === "retired"
                );
            } else {
                staffByStatus = await StaffService.getStaffByStatus(status);
            }
            setStaffList(staffByStatus || []);
        } catch (error) {
            console.error("Error fetching staff by status:", error);
            setStaffList([]);
        }
    };

    return (
        <StaffContext.Provider 
            value={{ staffList, getStaff, addStaff, onUpdateStaff, onDeleteStaff, fetchStaffByStatus}}>
                    {children}
        </StaffContext.Provider>
    );
};