import IStaff from "./IStaff";

interface IStaffContext {
    staffList: IStaff[] | null;
    getStaff: () => void;
    addStaff: (newStaff: IStaff) => void;
    onUpdateStaff: (updatedStaff: IStaff) => void;
    onDeleteStaff: (id: number) => void;
    fetchStaffByStatus: (status: string) => void;
}

export default IStaffContext;