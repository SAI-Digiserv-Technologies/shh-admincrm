import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StaffList from "../Components/StaffManage/StaffList";
import LeadList from "../Components/LeadManage/LeadeList";
import { useLazyGetUserQuery, useLazyViewUserQuery } from "../Data/Api/api";
import PageLoad from "../Components/Loading/PageLoad";
import EmptyComp from "../Components/Empty/EmptyComp";
import ListNotFound from "./ListNotFound";

const Leadmanage = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [leadlists, setLeadlists] = useState([])
  const [loading, setLoading] = useState(true)
  const [leadviewapi] = useLazyGetUserQuery();
  const handleOptionClick = (field, value) => {
    navigate("/leadmanagedetail", { state: { type: "add", field, value } });
    setOpenDropdown(null);
  };
  const fieldOptions = {
    Course: ["React", "Angular", "Node.js"],
    Sourse: ["Google Ads", "Facebook", "Referral"],
    AssignedTo: ["Staff A", "Staff B", "Staff C"],
    Status: ["Not Interested", "Follow Up", "Converted"],
  };
  const handleleadview = () => {
    setLoading(true)
    leadviewapi()
      .unwrap().then(res => {
        console.log("viewing", res);
        setLeadlists(res?.data);
      }).catch((err) => {
        console.log("error", err);
      }).finally(() => {
        setLoading(false)
      })
  };

  useEffect(() => {
    handleleadview();
  }, [])

  return (
    <>
      {loading ? <PageLoad /> :
        leadlists?.length !== 0 ? <ListNotFound text={"Leads Not Found"} /> :
          <div className="lead-head">
            <div className="lead-h d-flex ac-jb">
              <p className=" mb-0 f7 primary3 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani">
                Lead Management
              </p>
              <div className="d-flex gap-3 flex-wrap">
                {Object.keys(fieldOptions).map((field) => (
                  <div key={field} className="position-relative">
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === field ? null : field)
                      }
                      className="refil-text mb-0 white d-flex ac-jc bg-primary3 f4 rounded-3 border-0 px-3 py-2 textani"
                    >
                      {field}
                    </button>

                    {openDropdown === field && (
                      <ul className="dropdown-menu show mt-1" style={{ display: "block" }}>
                        {fieldOptions[field].map((option, idx) => (
                          <li key={idx}>
                            <button
                              className="dropdown-item"
                              onClick={() => handleOptionClick(field, option)}
                            >
                              {option}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                <button
                  onClick={() => navigate("/leadmanagedetail", { state: { type: "add" } })}
                  className="refil-text mb-0 white d-flex ac-jc bg-[#8e005c] f4 rounded-3 border-0 px-3 py-2 textani"
                >
                  + New Lead
                </button>
              </div>
            </div>
            <LeadList data={leadlists} />
          </div>}
    </>
  );
};

export default Leadmanage;
