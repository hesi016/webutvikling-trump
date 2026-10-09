
import React from "react";
import AddStaff from "../component/AddStaff";

const CreateStaffPage: React.FC = () => {
    return(
        <main className="bg-gradient-to-b from-blue-800 via-indigo-900 to-blue-800 min-h-screen flex flex-col items-center rounded-2xl">
        <header className="text-center mt-6 px-4">
          <h1 className="text-3xl sm:text-4xl font-bold mt-6 italic text-white drop-shadow-lg">
                Expand the inner Circle
                </h1>
            </header>
            <section className="mt-10 p-6 sm:p-8 w-full max-w-4xl bg-blue-100 shadow-2xl rounded-xl">
            <AddStaff/>
            </section>
         </main>
    );
};
export default CreateStaffPage;