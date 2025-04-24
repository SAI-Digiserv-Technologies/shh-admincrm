import React, { useEffect, useState } from "react";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { DeleteForeverOutlined, DeleteForeverSharp } from "@mui/icons-material";
import { courselist } from "../../Data/DummyJson";

const LeadCourseList = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({}); 
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
      [leadId]: status, // ✅ FIXED: Update status for specific lead
    }));
    setOpenDropdown(null);
  };

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = courselist.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(courselist.length / leadsPerPage);

  return (
    <>
      {openDropdown !== null && (
        <button onClick={() => handleDropdownClick(null)} className="droppopp border-0" />
      )}
      
      <div className="table-container rounded-3 mt-2">
        <table className="responsive-table rounded-3">
          <thead>
            <tr>
              <th className="py-3 px-2">S.no</th>
              <th className="py-3 px-2"> Course Name</th>
              <th className="py-3 px-2"> Amount</th>
              <th className="py-3 px-2"> Duration</th>
              <th className="py-3 px-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentLeads.map((lead) => (
              <tr key={lead.id} style={{ background: openDropdown === lead.id ? "#0b146b59" : "#ffffff59" }}>
                <td className="text-center border-0 py-2 px-2 primary3 f5">{lead.id}</td>
                <td className="text-center border-0 py-2 px-2 primary3 f5">{lead.coursename}</td>
                <td className="text-center border-0 py-2 px-2 primary3 f5">{lead.amount}</td>
                <td className="text-center border-0 py-2 px-2 primary3 f5">{lead.duration}</td>
               
               

                {/* ACTION BUTTONS */}
                <td className="text-center border-0 py-3 px-2">
                  <div className="d-flex ac-jc gap-3">
                    <button  
                    className="border-0 bg-primary3 white rounded-2 action-box">
                      <ModeEditOutlinedIcon className="fs-xxl-20" />
                    </button>
                    <button className="border-0 bg-primary3 white rounded-2 action-box">
                      <DeleteForeverSharp className="fs-xxl-20" />
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

export default LeadCourseList;
