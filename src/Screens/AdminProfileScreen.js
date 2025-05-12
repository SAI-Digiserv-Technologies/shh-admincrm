import React from "react";
import ProfileAdminForm from "../Components/AdminManage/ProfileAdminForm";
import { profile_dum } from "../assets/images";

const AdminProfileScreen = ({image}) => {
  return (
    <div>
    <div className="bg-gray-300 rounded-2xl p-6 flex flex-col items-center w-full  shadow-md ">
      <div className="w-10 h-10 bg-[#00225D] rounded-full flex items-center justify-center">
        
      <img src={image || profile_dum} />
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


