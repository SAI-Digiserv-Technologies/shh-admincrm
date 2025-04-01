import React, { useEffect, useState } from "react";
import { droparrow } from "../../assets/images";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { PaymentUpdateList, PaymentUpdatesListStatus } from "../../Data/DummyJson";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { useNavigate } from "react-router-dom";

const  PaymentUpdatesList = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("status");

  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 5;

  const navigate = useNavigate()

  const handleDropdownClick = (leadId) => {
    setOpenDropdown(openDropdown === leadId ? null : leadId);
  };

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

  const handleStatusChange = (leadId, status) => {
    setSelectedStatus((prevStatuses) => ({
      ...prevStatuses,
      [leadId]: status, // Update status for the specific lead
    }));
    setOpenDropdown(null); // Close dropdown after selection
  };

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = PaymentUpdateList.slice(indexOfFirstLead, indexOfLastLead);

  const totalPages = Math.ceil(PaymentUpdateList.length / leadsPerPage);

  return (
    <>
      {openDropdown !== null && (
        <button
          onClick={() => {
            handleDropdownClick(null);
          }}
          className="droppopp border-0 "
        />
      )}
      <div className="table-container rounded-3 mt-2">
        <table className="responsive-table rounded-3">
          <thead className="">
            <tr className="">
              <th className="py-3 px-2">Lead ID</th>
              <th className="py-3 px-2">Name</th>
              <th className="py-3 px-2">Course</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {currentLeads.map((lead) => (
              <tr
                style={
                  openDropdown === lead.id
                    ? {
                        background: "#0b146b59",
                      }
                    : {
                        background: "#ffffff59",
                      }
                }
                key={lead.id}
              >
                <td
                  className="text-center border-0 py-2 px-2 primary3 f5"
                  data-label="Lead ID"
                >
                  {lead.id}
                </td>
                <td
                  className="text-center border-0 py-2 px-2 primary3 f5"
                  data-label="Name"
                >
                  {lead.name}
                </td>
                <td
                  className="text-center border-0 py-2 px-2 primary3 f5"
                  data-label="Course"
                >
                  {lead.course}
                </td>
                <td
                  className="text-center border-0 py-2 px-2 primary3 f5"
                  data-label="Status"
                >
                  <div className="w-100 ac-jc d-flex">
                    <button
                      onClick={() => handleDropdownClick(lead.id)}
                      className="table-drop bg-white border-0 d-flex ac-jb px-3 rounded-5"
                    >
                      <p className="mb-0 ">
                        {selectedStatus[lead.id] || "Select Status"}
                      </p>
                      <div className="drop-img d-flex ac-jc">
                        <img src={droparrow} />
                      </div>
                      {openDropdown === lead.id && (
                        <div className="dropdrowncont rounded-2">
                          {PaymentUpdatesListStatus?.map((item) => {
                            return (
                              <button
                                onClick={() =>
                                  handleStatusChange(lead.id, item.name)
                                }
                                className="list w-100 border-0 py-2 bg-white"
                              >
                                <p className="mb-0">{item?.name}</p>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </button>
                  </div>
                </td>
                <td
                  className="text-center border-0 py-3 px-2"
                  data-label="Action"
                >
                  <div className="d-flex ac-jc gap-3">
                   
                    <button onClick={()=>{
                      navigate("/telecallers/payment-updates/payment-list")
                    }} className="border-0 bg-primary3 white rounded-2 action-box">
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
            currentPage == totalPages ? "opacity-25" : "opacity-100"
          } px-3 py-1 mx-1 border-0 rounded white bg-primary3`}
        >
          <ArrowForwardIosOutlinedIcon />
        </button>
      </div>
    </>
  );
};

export default PaymentUpdatesList;
