import React, { useEffect, useState } from "react";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { LeadList as usersList } from "../../Data/DummyJson"; // Renamed import to match usage
import { useNavigate } from "react-router-dom";

const LeadList = ({ data }) => {
  const navigate = useNavigate()
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedRole, setSelectedRole] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [statusToggle, setStatusToggle] = useState({});

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

  const handleDropdownClick = (userId) => {
    setOpenDropdown(openDropdown === userId ? null : userId);
  };

  const handleRoleChange = (userId, role) => {
    setSelectedRole((prevRoles) => ({
      ...prevRoles,
      [userId]: role,
    }));
    setOpenDropdown(null);
  };

  const handleStatusToggle = (userId) => {
    setStatusToggle((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(data.length / usersPerPage)) {
      setCurrentPage(newPage);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(data.length / usersPerPage);

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
              <th className="py-3 px-2">Lead ID</th>
              <th className="py-3 px-2">Student Name</th>
              <th className="py-3 px-2">Phone Number</th>
              <th className="py-3 px-2">Course</th>
              <th className="py-3 px-2">Assigned To</th>
              <th className="py-3 px-2">City</th>
              <th className="py-3 px-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => {
              return (
                <tr
                  key={user.id}
                  onClick={() => {
                    navigate('/leadmanagedetail', { state: { type: "edit", data: user } })
                  }}
                  className="hover-row"
                  style={{
                    backgroundColor: openDropdown === user.id ? "#0b146b59" : "#ffffff59",
                  }}
                >
                  <td className="text-center border-0 py-4 px-3">{indexOfFirstUser + index + 1}</td>
                  <td className="text-center border-0 py-2 px-2">{user.lead_id}</td>
                  <td className="text-center border-0 py-2 px-2">{user.name}</td>
                  <td className="text-center border-0 py-2 px-2">{user.phonenumber}</td>
                  <td className="text-center border-0 py-2 px-2">{user.interested_course?.addcourse}</td>
                  <td className="text-center border-0 py-2 px-2">{user.assignedto || "-"}</td>
                  <td className="text-center border-0 py-2 px-2">{user.city?.name}</td>
                  <td className="text-center border-0 py-2 px-2">
                    {user.status === "Not Interested" ? (
                      <button className="refil-text w-100 mb-0 white d-flex ac-jc bg-[#FF1818] f4 rounded-3 border-0 px-3 py-2 textani">
                        Not Interested
                      </button>
                    ) : user.status === "Follow Up" ? (
                      <button className="refil-text w-100 mb-0 white d-flex ac-jc bg-[#FDCA73] f4 rounded-3 border-0 px-3 py-2 textani ">
                        Follow Up
                      </button>
                    ) : user.status === "Close Follow Up" ? (
                      <button className="refil-text w-100 mb-0 white d-flex ac-jc bg-[#9AC2EA] f4 rounded-3 border-0 px-3 py-2 textani">
                        Close Follow Up
                      </button>
                    ) : user.status === "Enrolment" ? (
                      <button className="refil-text w-100 mb-0 white d-flex ac-jc bg-[#2AFF00] f4 rounded-3 border-0 px-3 py-2 textani">
                        Enrolment
                      </button>
                    ) : (
                      <button className="refil-text w-100 mb-0 white d-flex ac-jc bg-primary3 f4 rounded-3 border-0 px-3 py-2 textani">
                        {user.status}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="pagination d-flex justify-content-center mt-3">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 mx-1 border-0 rounded white bg-primary3 ${currentPage === 1 ? "opacity-25" : "opacity-100"}`}
        >
          <ArrowBackIosNewOutlinedIcon />
        </button>
        <span className="px-3 py-1 mx-1">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 mx-1 border-0 rounded white bg-primary3 ${currentPage === totalPages ? "opacity-25" : "opacity-100"}`}
        >
          <ArrowForwardIosOutlinedIcon />
        </button>
      </div>
    </>
  );
};

export default LeadList;
