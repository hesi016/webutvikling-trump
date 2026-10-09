import React, { useContext } from "react";
import { StaffContext } from "../contexts/StaffContext";
import IStaffContext from "../interfaces/IStaffContext";
import StaffItem from "./StaffItem";

const StaffList :React.FC = () => {

    const { staffList } = useContext(StaffContext) as IStaffContext;
    const getStaffItems = () => {
        return staffList?.map( ( staffList, i ) => (
        <li key={`staff-${i}`} >
            <StaffItem staff={staffList}/>
        </li> 
        ));
    }
    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {getStaffItems()}
        </ul>
    )
}
export default StaffList;