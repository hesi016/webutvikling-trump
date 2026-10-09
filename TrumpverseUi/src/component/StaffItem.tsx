import IStaff from "../interfaces/IStaff";
import { FC } from "react";
import DeleteStaff from "./DeleteStaff";
import UpdateStaff from "./UpdateStaff";

const StaffItem: FC<{ staff: IStaff }> = ({ staff }) => {
  const image_url = "http://localhost:5027/images";
  const statusColor = staff.status.toLowerCase() === "retired" ? "text-red-600" : "text-green-600";

  return (
    <article className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">

      <section className="border-4 border-blue-800 text-black text-center shadow-lg rounded-xl p-6 w-64 h-80 flex flex-col 
    justify-between bg-gradient-to-b from-blue-50 to-white hover:shadow-xl transform hover:scale-105 
    transition-transform duration-300 ease-in-out sm:w-56 sm:h-72 md:w-60 md:h-76 lg:w-64 lg:h-80"
    >

      <div className="absolute top-2 right-10"> <UpdateStaff staffId={staff.id}></UpdateStaff></div>
      <div className="absolute top-2 right-4"> <DeleteStaff staffId={staff.id}></DeleteStaff></div> 

        <header>
          <p className="text-xl font-extrabold text-blue-900 mb-1">{staff.firstName}</p>
          <p className="text-lg font-semibold text-blue-900">{staff.lastName}</p>
        </header>

        {staff.profileImage && (
          <figure className="rounded-full w-32 h-32 mx-auto border-4 border-red-900 shadow-md mb-4 flex justify-center items-center overflow-hidden">
          {staff.profileImage && 
          <img src={`${image_url}/${staff.profileImage}`} alt={` Picture of${staff.firstName} ${staff.lastName}`} />}
          </figure>
        )}

        <section>
          <p className="text-sm font-bold text-gray-800">{staff.position}</p>
          <p className= {`uppercase text-sm font-semibold ${statusColor}`}>{staff.status}</p>
        </section>
      </section>
    </article>
  );
};
export default StaffItem;