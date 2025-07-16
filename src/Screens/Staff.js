import React, { useEffect, useState } from "react";
import { refileicon } from "../assets/images";
import { useNavigate } from "react-router-dom";
import StaffList from "../Components/StaffManage/StaffList";
import { useLazyViewStaffQuery } from "../Data/Api/api";
import PageLoad from "../Components/Loading/PageLoad";
import EmptyComp from "../Components/Empty/EmptyComp";

const Staff = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  //stafflist
  const [staffLists, setStaffLists] = useState([]);

  const [viewStaffApi] = useLazyViewStaffQuery();

  // get user api (get method)
  const viewStafffun = () => {
    setLoading(true);
    viewStaffApi()
      .unwrap()
      .then((res) => {
        console.log("res", res);
        setStaffLists(res?.telecallers || res?.data || []);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const filteredStaffs = staffLists?.filter((staff) => {
    const staffString = [
      staff?.name,
      staff?.email,
      staff?.phone,
      staff?.role,
      staff?._id,
    ]
      .join(" ")
      .toLowerCase();

    return staffString.includes(searchTerm);
  });

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
              {staffLists?.length > 0 && (
                <div className="search-container">
                  <div className="mb-0 white d-flex ac-jc f4 rounded-3 border-0 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani">
                    <input
                      type="text"
                      className="form-control me-2 search-input"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) =>
                        setSearchTerm(e.target.value.toLowerCase())
                      }
                    />
                  </div>
                </div>
              )}
              <button
                onClick={() => {
                  navigate("/staffform/add", { state: { type: "add" } });
                }}
                className="refil-text mb-0 white d-flex ac-jc bg-primary3 f4 rounded-3 border-0 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani"
              >
                + Add Staf
              </button>
              {/* <button className="refil-box d-flex ac-jc bg-primary3 rounded-3 border-0">
                <img src={refileicon} />
              </button> */}
            </div>
          </div>
          {filteredStaffs.length > 0 ? (
            <StaffList res={filteredStaffs} />
          ) : (
            <EmptyComp text="No matching staff found" />
          )}
        </div>
      )}
    </>
  );
};

export default Staff;
