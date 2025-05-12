import React, { useEffect, useState } from "react";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { DeleteForeverOutlined } from "@mui/icons-material";

// Dummy data
const staffrolelist = [
  { id: 1,TransactionMethod : "Admin" },
  { id: 2, TransactionMethod: "Manager" },
  { id: 3, TransactionMethod: "HR" },
  { id: 4, TransactionMethod: "Developer" },
  { id: 5, TransactionMethod: "Designer" },
  { id: 6, TransactionMethod: "Tester" },
  { id: 7, TransactionMethod: "Sales" },
  { id: 8, TransactionMethod: "Support" },
];

const StaffRoleList = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(staffrolelist);
  const [editRoleId, setEditRoleId] = useState(null);
  const [editedRoleName, setEditedRoleName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const leadsPerPage = 5;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".action-box")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleEdit = (lead) => {
    setEditRoleId(lead.id);
    setEditedRoleName(lead.rolename);
    setShowModal(true);
  };

  const handleSave = (id) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, rolename: editedRoleName } : item
    );
    setData(updatedData);
    setEditRoleId(null);
    setEditedRoleName("");
    setShowModal(false);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this role?");
    if (confirmDelete) {
      const updated = data.filter((item) => item.id !== id);
      setData(updated);
    }
  };

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = data.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(data.length / leadsPerPage);

  const closeModal = () => {
    setShowModal(false);
    setEditRoleId(null);
    setEditedRoleName("");
  };

  return (
    <>
      <div className="table-container rounded-3 mt-2">
        <table className="responsive-table rounded-3">
          <thead>
            <tr>
              <th className="py-3 px-2">S.no</th>
              <th className="py-3 px-2">Transaction Method</th>
              <th className="py-3 px-2">Options</th>
            </tr>
          </thead>
          <tbody>
            {currentLeads.map((lead) => (
              <tr key={lead.id} style={{ background: "#ffffff59" }}>
                <td className="text-center py-2 px-2">{lead.id}</td>
                <td className="text-center py-2 px-2">{lead.rolename}</td>
                <td className="text-center py-2 px-2">
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="border-0 bg-[#00225d] text-white rounded-2 px-2 action-box"
                      onClick={() => handleEdit(lead)}
                    >
                      <ModeEditOutlinedIcon />
                    </button>
                    <button
                      className="border-0 bg-[#00225d] text-white rounded-2 px-2 action-box"
                      onClick={() => handleDelete(lead.id)}
                    >
                      <DeleteForeverOutlined />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination d-flex justify-content-center mt-3">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 mx-1 border-0 rounded bg-[#00225d] text-white"
        >
          <ArrowBackIosNewOutlinedIcon />
        </button>
        <span className="px-3 py-1 mx-1">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 mx-1 border-0 rounded bg-[#00225d] text-white"
        >
          <ArrowForwardIosOutlinedIcon />
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal-content">
            <div className="custom-modal-header">
              <span className="custom-modal-title">New Role</span>
              <span className="custom-close-btn" onClick={closeModal}>
                &times;
              </span>
            </div>
            <div className="custom-modal-body">
              <label className="form-label text-primary fw-bold mb-2">Role Name</label>
              <input
                type="text"
                value={editedRoleName}
                onChange={(e) => setEditedRoleName(e.target.value)}
                className="custom-input"
                placeholder="Enter role name"
              />
              <div className="d-flex justify-content-end gap-2 mt-4">
                <button className="custom-btn cancel" onClick={closeModal}>
                  Cancel
                </button>
                <button className="custom-btn add" onClick={() => handleSave(editRoleId)}>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inline Styles */}
      <style jsx>{`
        .custom-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100vw;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        .custom-modal-content {
          background: white;
          width: 400px;
          max-width: 90%;
          border-radius: 12px;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
          padding: 20px;
          position: relative;
          border: 1px solid #d3bebe;
        }

        .custom-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #ccc;
          padding-bottom: 8px;
          margin-bottom: 12px;
        }

        .custom-modal-title {
          font-size: 16px;
          font-weight: 500;
          color: #333;
        }

        .custom-close-btn {
          font-size: 22px;
          cursor: pointer;
          color: #888;
        }

        .custom-modal-body {
          padding: 10px 0;
        }

        .custom-input {
          width: 100%;
          padding: 10px;
          border: 1px solid #e0bfbf;
          border-radius: 10px;
          box-shadow: 0 0 5px rgba(153, 0, 0, 0.1);
          outline: none;
          font-size: 14px;
        }

        .custom-btn {
          padding: 6px 16px;
          border-radius: 6px;
          font-size: 14px;
          border: none;
          cursor: pointer;
        }

        .custom-btn.cancel {
          background-color: #6c757d;
          color: white;
        }

        .custom-btn.add {
          background-color: #002c6e;
          color: white;
        }

        .custom-btn:hover {
          opacity: 0.9;
        }
      `}</style>
    </>
  );
};

export default StaffRoleList;
