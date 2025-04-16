import React from "react";
import listnoticon from '../assets/images/listnotImg.png'
import { useNavigate } from "react-router-dom";

const ListNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="lead-head ">
      <div className="lead-h d-flex ac-jb">
        <p className=" mb-0 f7 primary3 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani">
          Lead Management
        </p>
        <div className="d-flex ac-jb gap-3">
          <button
            onClick={() => {
              navigate("/leadmanage", {
                state: { type: "add" },
              });
            }}
            className="refil-text mb-0 white d-flex ac-jc bg-[#8E005C] f4 rounded-3 border-0 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani"
          >
            + Add Lead
          </button>

        </div>

      </div>
      <div className="flex flex-col justify-center items-center w-full h-full mt-10">
        <button className="bg-[#fff] rounded-3 border-0 w-[350px] h-[300px]  flex justify-center items-center">
          <img src={listnoticon} className="w-full h-full object-contain" />
        </button>
        <h1 className="text-[#00225D] mt-4 text-lg font-semibold">No List Found</h1>
      </div>



    </div>
  );
};

export default ListNotFound;
