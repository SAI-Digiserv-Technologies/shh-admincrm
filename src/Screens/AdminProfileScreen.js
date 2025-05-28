import React, { useEffect, useState } from "react";
import ProfileAdminForm from "../Components/AdminManage/ProfileAdminForm";
import { profile_dum } from "../assets/images";
import { useLazyProfileViewQuery } from "../Data/Api/api";
import useUser from "../Data/Local/userDetail";
import PageLoad from "../Components/Loading/PageLoad";

const AdminProfileScreen = () => {
  const [loading, setLoading] = useState(true);
  const [fullData, setFullData] = useState(null);
  const { user, setUser } = useUser();

  // Api
  const [profileViewApi] = useLazyProfileViewQuery();

  const profileVIewFun = () => {
    setLoading(true);
    const id = user?.admin?.id;
    profileViewApi(id)
      .unwrap()
      .then((res) => {
        // console.log("Viewdres", res);
        setFullData(res);
      })
      .catch((err) => {
        // console.log("Err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    profileVIewFun();
  }, []);

  return (
    <>
      {loading ? (
        <PageLoad />
      ) : (
        <div>
          <div className="bg-gray-300 rounded-2xl p-6 flex flex-col items-center w-full  shadow-md ">
            {/* <div className="w-10 h-10 bg-[#00225D] rounded-full flex items-center justify-center">
          <img src={profile_dum} />
        </div> */}
            <h2 className="text-lg font-bold text-[#00225D] mt-3">
              {fullData?.name}
            </h2>
            <p className="text-gray-700 text-sm">Admin</p>
            <p className="text-gray-900 font-semibold mt-2">
              Email ID:{" "}
              <a href={fullData?.email} className="text-blue-500">
                {fullData?.email}
              </a>
            </p>
            <p className="text-gray-900 font-semibold">
              Phone:{" "}
              <a href="tel:9962515695" className="text-blue-500">
                {fullData?.phone}
              </a>
            </p>
          </div>
          <div className="">
            <ProfileAdminForm />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminProfileScreen;
