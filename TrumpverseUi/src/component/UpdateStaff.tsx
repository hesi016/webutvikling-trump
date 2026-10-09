import React, { useContext, useState } from "react";
import { StaffContext } from "../contexts/StaffContext";
import IStaffContext from "../interfaces/IStaffContext";
import StaffService from "../services/StaffService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import ImageUploadService from "../services/ImageUploadService";

const UpdateStaff: React.FC<{ staffId: number }> = ({ staffId }) => {
  const { onUpdateStaff } = useContext(StaffContext) as IStaffContext;

  const [showPopup, setShowPopup] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [staffData, setStaffData] = useState({
    id: staffId,
    firstName: "",
    lastName: "",
    position: "",
    status: "Active",
    profileImage: "",
  });

  const loadStaffData = async () => {
    try {
      const staff = await StaffService.getStaffById(staffId);
      setStaffData(staff);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStaffData({ ...staffData, [name]: value });
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const response = await ImageUploadService.uploadImage(file);
      setStaffData((prevState) => ({
        ...prevState,
        profileImage: response.fileName,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateStaff = async () => {
    try {
      await StaffService.updateStaff(staffData);
      onUpdateStaff(staffData);
      setShowPopup(false);
    } catch (error) {
      console.error("Error updating staff:", error);
    }
  };

  return (
    <div className="update-staff">
    <div
      role="button"
      onClick={() => {
        setShowPopup(true);
        loadStaffData();
      }}
      className="text-black cursor-pointer"
      aria-label="Update staff details"
    >
      <FontAwesomeIcon icon={faPenToSquare} />
    </div>

      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
        >
          <div
            className="bg-white rounded-xl shadow-lg p-6 w-64 h-80 overflow-y-auto border-4 border-blue-800 text-black text-center"
          >
            <header className="relative mb-4">
              <h3 className="text-xl font-bold">
                Update Staff
              </h3>
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-3 right-3 text-gray-500"
              >
                ✕
              </button>
            </header>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateStaff();
              }}
              className="space-y-4"
            >
              <section>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={staffData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300"
                />
              </section>

              <section>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={staffData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300"
                />
              </section>

              <section>
                <label
                  htmlFor="position"
                  className="block text-sm font-medium text-gray-700"
                >
                  Position
                </label>
                <input
                  type="text"
                  name="position"
                  value={staffData.position}
                  onChange={handleInputChange}
                  placeholder="Position"
                  className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300"
                />
              </section>

              <section>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  name="status"
                  value={staffData.status}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300"
                >
                  <option value="Active">Active</option>
                  <option value="Retired">Retired</option>
                </select>
              </section>

              <section>
                <label
                  htmlFor="imageUpload"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="mt-1 w-full"
                  onChange={(e) =>
                    e.target.files && handleImageUpload(e.target.files[0])
                  }
                />
                {uploading && <p className="text-sm text-blue-500">Uploading...</p>}
                {staffData.profileImage && (
                  <img
                    src={`http://localhost:5027/images/${staffData.profileImage}`}
                    alt="Profile"
                    className="rounded-lg shadow-md w-32 h-32 object-cover mx-auto mt-2"
                  />
                )}
              </section>

              <footer className="flex justify-between mt-6">
                <button
                  className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition ml-4"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="w-1/2 bg-gray-300 text-gray-800 px-4 py-2 rounded-md shadow hover:bg-gray-400 transition ml-4"
                >
                  Cancel
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default UpdateStaff;