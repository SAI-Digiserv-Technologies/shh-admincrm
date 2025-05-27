import React, { useEffect, useState } from "react";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { leadsList, leadstatus } from "../../Data/DummyJson";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";

const LeadeList = ({ leadlist }) => {
  const navigate = useNavigate();
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
  const currentLeads = leadlist.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(leadlist.length / leadsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case "Interested":
        return "bg-intrest";
      case "Enrollment":
        return "bg-enroll";
      case "Not interested":
      case "Not responsing":
        return "bg-not";
      case "Not reachable":
        return "bg-notintrest";
      case "Switched Off":
        return "bg-switchoff";
      case "Follow Ups":
        return "bg-follow";
      case "Close Follow Ups":
        return "bg-closefollow";
      case "Discontinue":
        return "bg-disconnected";
      default:
        return "bg-enquiry";
    }
  };

  return (
    <>
      {openDropdown !== null && (
        <button
          onClick={() => handleDropdownClick(null)}
          className="droppopp border-0"
        />
      )}

      <div className="table-container rounded-3 mt-2">
        <table className="responsive-table rounded-3">
          <thead>
            <tr>
              <th className="py-3 px-2">S.No</th>
              <th className="py-3 px-2">Lead ID</th>
              <th className="py-3 px-2">Name</th>
              <th className="py-3 px-2">Email ID</th>
              <th className="py-3 px-2">Walk in</th>
              <th className="py-3 px-2">Passing Year</th>
              <th className="py-3 px-2">Contact</th>
              <th className="py-3 px-2">Telecaller</th>
              <th className="py-3 px-2">Source</th>
              <th className="py-3 px-2">Course</th>
              <th className="py-3 px-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentLeads.map((lead, index) => (
              <tr
                key={lead?._id}
                className="cp"
                style={{
                  background:
                    openDropdown === lead._id ? "#0b146b59" : "#ffffff59",
                }}
                onClick={() =>
                  navigate("/enquiries/details", {
                    state: { type: "edit", data: lead },
                  })
                }
              >
                <td
                  data-label="S.No"
                  className="text-center py-2 px-2 primary3 f4"
                >
                  {indexOfFirstLead + index + 1}
                </td>
                <td
                  data-label="Lead ID"
                  className="text-center py-2 px-2 primary3 f4"
                >
                  {lead?.lead_id || "-"}
                </td>
                <td
                  data-label="Name"
                  className="text-center py-2 px-2 primary3 f4"
                >
                  {lead?.name || "-"}
                </td>
                <td
                  data-label="Email ID"
                  className="text-center py-2 px-2 primary3 f4"
                >
                  {lead?.email || "-"}
                </td>
                <td
                  data-label="Walk in"
                  className="text-center py-2 px-2 primary3 f4"
                >
                  {new Date(lead?.createdAt).toISOString().split("T")[0] || "-"}
                </td>
                <td
                  data-label="Passing Year"
                  className="text-center py-2 px-2 primary3 f4"
                >
                  {lead?.passedout || "-"}
                </td>
                <td
                  data-label="Contact"
                  className="text-center py-2 px-2 primary3 f4"
                >
                  {lead?.phonenumber || "-"}
                </td>
                <td className="text-center py-2 px-2 primary3 f4">
                  {lead?.assignedto?.name || "-"}
                </td>
                <td
                  data-label="Source"
                  className="text-center py-2 px-2 primary3 f4"
                >
                  {lead?.source || "-"}
                </td>
                <td
                  data-label="Course"
                  className="text-center py-2 px-2 primary3 f4"
                >
                  {lead?.interested_course?.addcourse || "-"}
                </td>
                <td
                  data-label="Status"
                  className="text-center py-2 px-2 primary3 f5"
                >
                  <div className="w-100 ac-jc d-flex">
                    <button
                      onClick={(e) => {
                        if (lead?.status !== "Enrollment") {
                          e.stopPropagation();
                          handleDropdownClick(lead._id);
                        }
                      }}
                      className={`table-drop border-0 d-flex ac-jc px-3 rounded-5 ${getStatusColor(
                        lead?.status
                      )}`}
                    >
                      <p className="mb-0">{lead?.status}</p>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {leadlist?.length > leadsPerPage && (
        <div className="pagination d-flex justify-content-center mt-3">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`${
              currentPage === 1 ? "opacity-25" : "opacity-100"
            } px-3 py-1 mx-1 border-0 rounded white bg-primary3`}
          >
            <ArrowBackIosNewOutlinedIcon />
          </button>
          <span className="px-3 py-1 mx-1">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`${
              currentPage === totalPages ? "opacity-25" : "opacity-100"
            } px-3 py-1 mx-1 border-0 rounded white bg-primary3`}
          >
            <ArrowForwardIosOutlinedIcon />
          </button>
        </div>
      )}
    </>
  );
};

export default LeadeList;
