
import StaffList from "../component/StaffList";
import React, { useContext, useState } from "react";
import { StaffContext } from "../contexts/StaffContext";
import IStaffContext from "../interfaces/IStaffContext";


const StaffPage: React.FC = () => {
     const {fetchStaffByStatus} = useContext(StaffContext) as IStaffContext;
     const [selectedStatus, setSelectedStatus] = useState<string>("");

     const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) =>{
          const status = e.target.value;
          setSelectedStatus(status);
          fetchStaffByStatus(status === "All statuses" ? "All statuses" : status);    
        }

     return (
          <main className="bg-gradient-to-b from-blue-800 via-indigo-900 to-blue-800 min-h-screen flex flex-col items-center rounded-2xl">
              <header className="w-full max-w-6xl p-6 flex flex-col items-center sm:flex-row sm:items-center sm:justify-between relative">
                <nav className="mb-4 sm:mb-0">
                    <select
                      value={selectedStatus}
                      onChange={handleStatusFilter}
                      className="bg-white text-black rounded-lg shadow-md py-2">

                      <option>All statuses</option>
                      <option value="active">Active</option>
                      <option value="retired">Retired</option>
                    </select>
                </nav>
                <h1 className="text-3xl sm:text-4xl font-bold italic text-white drop-shadow-lg text-right lg:text-center lg:mx-auto">
                Trump's Inner Circle
                </h1>
            </header>
            <section className="mt-10 p-8 w-full max-w-6xl bg-blue-100 shadow-2xl rounded-xl sm:mt-6 sm:p-6 md:p-8">
            <StaffList />
              </section>
          </main>
      );
  };
  export default StaffPage;