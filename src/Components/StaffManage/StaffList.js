import React, { useEffect, useState } from "react";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Switch from "@mui/material/Switch";
import { usersList } from "../../Data/DummyJson";
 
const StaffList = ({res}) => {
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
 
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = res.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(res.length / usersPerPage);
 
    return (
        <>
            {openDropdown !== null && (
                <button onClick={() => handleDropdownClick(null)} className="droppopp border-0" />
            )}
            <div className="table-container rounded-3 mt-2">
                <table className="responsive-table rounded-3">
                    <thead>
                        <tr>
                            <th className="py-3 px-2">Name</th>
                            <th className="py-3 px-2">Email ID</th>
                            <th className="py-3 px-2">Phone Number</th>
                            <th className="py-3 px-2">Role</th>
                            <th className="py-3 px-2">Status</th>
                            <th className="py-3 px-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user) => (
                            <tr key={user.id} style={{ background: openDropdown === user.id ? "#0b146b59" : "#ffffff59" }}>
                                <td className="text-center border-0 py-2 px-2">{user.name}</td>
                                <td className="text-center border-0 py-2 px-2">{user.email}</td>
                                <td className="text-center border-0 py-2 px-2">{user.phone}</td>
                                <td className="text-center border-0 py-2 px-2">{user.role}</td>
 
                                <td className="text-center border-0 py-2 px-2">
                                    <Switch
                                        checked={statusToggle[user.id] || user.status}
                                        onChange={() => handleStatusToggle(user.id)}
                                        sx={{
                                            "& .MuiSwitch-thumb": {
                                                backgroundColor: statusToggle[user.id] || user.status ? "#00FF00" : "#FF0000", // Poison Green for ON, Poison Red for OFF
                                            },
                                            "& .MuiSwitch-track": {
                                                backgroundColor: statusToggle[user.id] || user.status ? "#00ff00" : "#FF9999", // Lighter shades for track
                                            },
                                            "& .Mui-checked + .MuiSwitch-track": {
                                                backgroundColor: "#99FF99", // Green track when ON
                                            },
                                            "& .MuiSwitch-switchBase.Mui-checked": {
                                                color: "#00FF00", // Ensures the thumb remains green when checked
                                            },
                                            "& .MuiSwitch-switchBase": {
                                                color: "#FF0000", // Ensures the thumb remains red when unchecked
                                            },
                                        }}
                                    />
 
                                </td>
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
            <div className="pagination d-flex justify-content-center mt-3">
                <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className={`${currentPage === 1 ? "opacity-25" : "opacity-100"} px-3 py-1 mx-1 border-0 rounded white bg-primary3`}>
                    <ArrowBackIosNewOutlinedIcon />
                </button>
                <span className="px-3 py-1 mx-1">Page {currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className={`${currentPage === totalPages ? "opacity-25" : "opacity-100"} px-3 py-1 mx-1 border-0 rounded white bg-primary3`}>
                    <ArrowForwardIosOutlinedIcon />
                </button>
            </div>
        </>
    );
};
 
export default StaffList;