import React, { useEffect, useState } from "react";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { LeadList as usersList } from "../../Data/DummyJson"; // Renamed import to match usage
import { useNavigate } from "react-router-dom";

const LeadList = ({ data }) => {
  const navigate = useNavigate();
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
    if (newPage >= 1 && newPage <= Math?.ceil(data.length / usersPerPage)) {
      setCurrentPage(newPage);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data?.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math?.ceil(data?.length / usersPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case "Interested":
        return "bg-intrest";
      case "Enrollement":
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
                  key={user?._id}
                  onClick={() => {
                    navigate("/leadmanage/details", {
                      state: { type: "edit", data: user, view: "lead" },
                    });
                  }}
                  className="hover-row cp"
                  style={{
                    backgroundColor:
                      openDropdown === user?._id ? "#0b146b59" : "#ffffff59",
                  }}
                >
                  <td className="text-center py-2 px-2 primary3 f4">
                    {indexOfFirstUser + index + 1}
                  </td>
                  <td className="text-center py-2 px-2 primary3 f4">
                    {user?.lead_id}
                  </td>
                  <td className="text-center py-2 px-2 primary3 f4">
                    {user?.name}
                  </td>
                  <td className="text-center py-2 px-2 primary3 f4">
                    {user?.phonenumber}
                  </td>
                  <td className="text-center py-2 px-2 primary3 f4">
                    {user?.interested_course?.addcourse}
                  </td>
                  <td className="text-center py-2 px-2 primary3 f4">
                    {user?.assignedto?.name || "-"}
                  </td>
                  <td className="text-center py-2 px-2 primary3 f4">
                    {user?.city?.name}
                  </td>
                  <td
                    data-label="Status"
                    className="text-center py-2 px-2 primary3 f4"
                  >
                    <div className="w-100 ac-jc d-flex">
                      <button
                        className={`table-drop border-0 d-flex ac-jc px-3 rounded-5 ${getStatusColor(
                          user?.status
                        )}`}
                      >
                        <p className="mb-0">{user?.status}</p>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      {data?.length > usersPerPage && (
        <div className="pagination d-flex justify-content-center mt-3">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 mx-1 border-0 rounded white bg-primary3 ${
              currentPage === 1 ? "opacity-25" : "opacity-100"
            }`}
          >
            <ArrowBackIosNewOutlinedIcon />
          </button>
          <span className="px-3 py-1 mx-1">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 mx-1 border-0 rounded white bg-primary3 ${
              currentPage === totalPages ? "opacity-25" : "opacity-100"
            }`}
          >
            <ArrowForwardIosOutlinedIcon />
          </button>
        </div>
      )}
    </>
  );
};

export default LeadList;
