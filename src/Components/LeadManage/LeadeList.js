import React, { useEffect, useState } from "react";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { leadsList, leadstatus } from "../../Data/DummyJson";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const LeadeList = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({}); // ✅ FIXED: Use an object instead of a string
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 5;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".table-drop")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleDropdownClick = (leadId) => {
    setOpenDropdown(openDropdown === leadId ? null : leadId);
  };

  const handleStatusChange = (leadId, status) => {
    setSelectedStatus((prevStatuses) => ({
      ...prevStatuses,
      [leadId]: status, 
    }));
    setOpenDropdown(null);
  };

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = leadsList.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(leadsList.length / leadsPerPage);

  return (
    <>
      {openDropdown !== null && (
        <button onClick={() => handleDropdownClick(null)} className="droppopp border-0" />
      )}
      
      <div className="table-container rounded-3 mt-2">
        <table className="responsive-table rounded-3">
          <thead>
            <tr>
              <th className="py-3 px-2">Lead ID</th>
              <th className="py-3 px-2">Name</th>
              <th className="py-3 px-2">Course</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentLeads.map((lead) => (
              <tr key={lead.id} style={{ background: openDropdown === lead.id ? "#0b146b59" : "#ffffff59" }}>
                <td className="text-center border-0 py-2 px-2 primary3 f5">{lead.id}</td>
                <td className="text-center border-0 py-2 px-2 primary3 f5">{lead.name}</td>
                <td className="text-center border-0 py-2 px-2 primary3 f5">{lead.course}</td>
                
                {/* STATUS DROPDOWN */}
                <td className="text-center border-0 py-2 px-2 primary3 f5">
                  <div className="w-100 ac-jc d-flex">
                    <button
                      onClick={() => handleDropdownClick(lead.id)}
                      className="table-drop border-0 d-flex ac-jb px-3 rounded-5"
                    >
                      <p className="mb-0">
                        {selectedStatus[lead.id] || lead.status}
                      </p>
                      <div className="drop-img d-flex ac-jc">
                        <ArrowDropDownIcon className="fs-xxl-35 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13" />
                      </div>
                      
                      {openDropdown === lead.id && (
                        <div className="dropdrowncont rounded-2">
                          {leadstatus.map((item) => (
                            <button
                              key={item.name} // ✅ FIXED: Added `key` prop
                              onClick={() => handleStatusChange(lead.id, item.name)}
                              className="list w-100 border-0 py-2 bg-white"
                              style={{ color: "black" }} // ✅ FIXED: Ensure text color is black
                            >
                              <p className="mb-0">{item.name}</p>
                            </button>
                          ))}
                        </div>
                      )}
                    </button>
                  </div>
                </td>

                {/* ACTION BUTTONS */}
                <td className="text-center border-0 py-3 px-2">
                  <div className="d-flex ac-jc gap-3">
                    <button className="border-0 bg-primary3 white rounded-2 action-box">
                      <ModeEditOutlinedIcon className="fs-xxl-20" />
                    </button>
                    <button className="border-0 bg-primary3 white rounded-2 action-box">
                      <RemoveRedEyeOutlinedIcon className="fs-xxl-20" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="pagination d-flex justify-content-center mt-3">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`${currentPage === 1 ? "opacity-25" : "opacity-100"} px-3 py-1 mx-1 border-0 rounded white bg-primary3`}
        >
          <ArrowBackIosNewOutlinedIcon />
        </button>
        <span className="px-3 py-1 mx-1">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`${currentPage === totalPages ? "opacity-25" : "opacity-100"} px-3 py-1 mx-1 border-0 rounded white bg-primary3`}
        >
          <ArrowForwardIosOutlinedIcon />
        </button>
      </div>
    </>
  );
};

export default LeadeList;
