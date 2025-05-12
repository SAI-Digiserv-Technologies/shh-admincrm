import React, { useEffect, useState } from "react";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { enquiryleadList, leadsList, leadstatus } from "../../Data/DummyJson";
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
  const currentLeads = enquiryleadList.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(enquiryleadList.length / leadsPerPage);

  return (
    <>
      {openDropdown !== null && (
        <button onClick={() => handleDropdownClick(null)} className="droppopp border-0" />
      )}
      
      <div className="table-container rounded-3 mt-2">
        <table className="responsive-table rounded-3">
          <thead>
            <tr>
            <th className="py-3 px-2">S.No</th>
                <th className="py-3 px-2">Name</th>
                <th className="py-3 px-2">Email ID</th>
                <th className="py-3 px-2">DOB</th>
                <th className="py-3 px-2">Walk In</th>
                <th className="py-3 px-2">Passing Year</th>
                <th className="py-3 px-2">Contact</th>
                <th className="py-3 px-2">Source</th>
                <th className="py-3 px-2">Course</th>
            </tr>
          </thead>
          <tbody>
            {currentLeads.map((lead) => (
              <tr key={lead.id} style={{ background: openDropdown === lead.id ? "#0b146b59" : "#ffffff59" }}>
                 <td className="text-center border-0 py-2 px-2 primary3 f5  text-[15px]">{lead?.name}</td>
                  <td className="text-center border-0 py-2 px-2 primary3 f5 text-[15px]">{lead?.email}</td>
                  <td className="text-center border-0 py-2 px-2 primary3 f5 text-[15px]">{lead?.dob}</td>
                  <td className="text-center border-0 py-2 px-2 primary3 f5 text-[15px]">{lead?.walkin}</td>
                  <td className="text-center border-0 py-2 px-2 primary3 f5 text-[15px]">{lead?.passingYear}</td>
                  <td className="text-center border-0 py-2 px-2 primary3 f5 text-[15px]">{lead?.contact}</td>
                  <td className="text-center border-0 py-2 px-2 primary3 f5 text-[15px]">{lead?.source}</td>
                  <td className="text-center border-0 py-2 px-2 primary3 f5 text-[15px]">{lead?.course}</td>
                
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
                              key={item.name} 
                              onClick={() => handleStatusChange(lead.id, item.name)}
                              className="list w-100 border-0 py-2 bg-white"
                              style={{ color: "black" }} 
                            >
                              <p className="mb-0">{item.name}</p>
                            </button>
                          ))}
                        </div>
                      )}
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
