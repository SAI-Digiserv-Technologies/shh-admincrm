import React from "react";
import ProfileAdminForm from "../Components/AdminManage/ProfileAdminForm";

const AdminProfileScreen = () => {
  return (
    <div>
    <div className="bg-gray-300 rounded-2xl p-6 flex flex-col items-center w-full  shadow-md ">
      <div className="w-20 h-20 bg-[#00225D] rounded-full flex items-center justify-center">
        
        <svg
          className="w-30 h-20 text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12 2a5 5 0 11-5 5 5 5 0 015-5zm0 7a3 3 0 100-6 3 3 0 000 6zm-7 13a7 7 0 1114 0H5z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <h2 className="text-lg font-bold text-[#00225D] mt-3">Sujatha Venkatesh</h2>
      <p className="text-gray-700 text-sm">Admin</p>
      <p className="text-gray-900 font-semibold mt-2">
        Email ID:{" "}
        <a href="mailto:admin@gmail.com" className="text-blue-500">
          admin@gmail.com
        </a>
      </p>
      <p className="text-gray-900 font-semibold">
        Phone:{" "}
        <a href="tel:9962515695" className="text-blue-500">
          9962515695
        </a>
      </p>
      
      </div>
      <div className="">
        <ProfileAdminForm />
      </div>
    </div>
  );
};

export default AdminProfileScreen;


