import React, { useEffect, useState } from "react";
import { refileicon } from "../assets/images";
import { useNavigate } from "react-router-dom";
import StaffList from "../Components/StaffManage/StaffList";
import { useLazyViewStaffQuery } from "../Data/Api/api";
import PageLoad from "../Components/Loading/PageLoad";
import EmptyComp from "../Components/Empty/EmptyComp";

const Staff = () => {
  const [viewStaffApi] = useLazyViewStaffQuery();
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);


  //stafflist
  const [staffLists, setStaffLists] = useState([]);

  // get user api (get method)
  const viewStafffun = () => {
    setLoading(true);
    viewStaffApi()
      .unwrap()
      .then((res) => {
        // console.log("res", res);
        setStaffLists(res?.telecallers || res?.data || []);
      })
      .catch((err) => {
        // console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const navigate = useNavigate();

  useEffect(() => {
    viewStafffun();
  }, []);
  return (
    <>
      {loading ? (
        <PageLoad />
      ) : (
        <div className="lead-head">
          <div className="lead-h d-flex ac-jb">
            {/* <p className=" mb-0 f7 primary3 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani">
              Staffs
            </p> */}
            <div className="d-flex ac-je w-100 gap-3">
              {/* <button
                onClick={() => {
                  navigate("/staffform/add", { state: { type: "add" } });
                }}
                className="refil-text mb-0 white d-flex ac-jc bg-primary3 f4 rounded-3 border-0 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani"
              >
                + Add Staff
              </button> */}

              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="refil-text mb-0 white d-flex ac-jc bg-primary3 f4 rounded-3 border-0 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani px-3 py-2"
                >
                  + Add Staff
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 bg-white border rounded shadow z-50">
                    <button
                      className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                      onClick={() => {
                        setShowModal(true);
                        setShowDropdown(false);
                      }}
                    >
                      Import CSV
                    </button>
                    <button
                      className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                      onClick={() => {
                        navigate("/staffform/add", { state: { type: "add" } });
                        setShowDropdown(false);
                      }}
                    >
                      Add Enquiry
                    </button>
                  </div>
                )}
              </div>
              {/* <button className="refil-box d-flex ac-jc bg-primary3 rounded-3 border-0">
                <img src={refileicon} />
              </button> */}
            </div>
          </div>
          {staffLists?.length == 0 ? (
            <EmptyComp text={"Stafs Not Found"} />
          ) : (
            <StaffList res={staffLists} />
          )}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4">Import Staff CSV</h2>

            <div className="mb-4">
              <input
                type="file"
                accept=".csv"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="border border-gray-300 p-2 w-full rounded"
              />
              {selectedFile && (
                <p className="text-sm mt-2 text-green-600">File: {selectedFile.name}</p>
              )}
            </div>

            <div className="flex justify-between items-center">
              <a
                href="/sample.csv"
                download
                className="text-blue-500 hover:underline text-sm"
              >
                Download Sample CSV
              </a>

              <button
                onClick={() => document.querySelector('input[type="file"]').click()}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                + Browse
              </button>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}


    </>
  );
};

export default Staff;
