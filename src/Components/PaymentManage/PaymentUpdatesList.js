import React, { useState } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { PaymentUpdateList } from "../../Data/DummyJson";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { useNavigate } from "react-router-dom";

const PaymentUpdatesList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 5;
  const navigate = useNavigate();

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = PaymentUpdateList.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(PaymentUpdateList.length / leadsPerPage);

  return (
    <>
      <div className="table-container rounded-3 mt-2">
        <table className="responsive-table rounded-3">
          <thead>
            <tr>
              <th className="py-3 px-2">S.No</th>
              <th className="py-3 px-2">Name</th>
              <th className="py-3 px-2">Course</th>
              <th className="py-3 px-2">Amount</th>
              <th className="py-3 px-2">Paid Amount</th>
              <th className="py-3 px-2">Balance Amount</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentLeads.map((lead, index) => (
              <tr key={lead.id}>
                <td className="text-center border-0 py-2 px-2">
                  {index + 1 + (currentPage - 1) * leadsPerPage}
                </td>
                <td className="text-center border-0 py-2 px-2">{lead.name}</td>
                <td className="text-center border-0 py-2 px-2">{lead.course}</td>
                <td className="text-center border-0 py-2 px-2">{lead.amount}</td>
                <td className="text-center border-0 py-2 px-2">{lead.PaidAmount}</td>
                <td className="text-center border-0 py-2 px-2">{lead.BalanceAmount}</td>

                <td className="text-center border-0 py-2 px-3">
                  <button
                    className={`px-3 py-1 rounded-pill border-0 text-center`}
                    style={{
                      minWidth: "120px",
                      height: "35px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      backgroundColor:
                        lead.Status.toLowerCase() === "fully paid" ? "#2aff00" :
                        lead.Status.toLowerCase() === "partially paid" ? "#ffbe44" : "#6c757d",
                      color: lead.Status.toLowerCase() === "partially paid" ? "#000" : "#fff",
                    }}
                  >
                    {lead.Status}
                  </button>
                </td>

                <td className="text-center border-0 py-3 px-2">
                  <div className="d-flex justify-content-center gap-3">
                    <button
                      onClick={() => navigate("/telecallers/payment-updates/payment-list")}
                      className="border-0 rounded-2 action-box text-center"
                      style={{
                        backgroundColor: "#00225d",
                        color: "white",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "8px",
                      }}
                    >
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
          className="px-3 py-1 mx-1 border-0 rounded text-white"
          style={{ backgroundColor: "#00225d", width: "40px", height: "40px" }}
        >
          <ArrowBackIosNewOutlinedIcon />
        </button>

        <span className="px-3 py-1 mx-1">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 mx-1 border-0 rounded text-white"
          style={{ backgroundColor: "#00225d", width: "40px", height: "40px" }}
        >
          <ArrowForwardIosOutlinedIcon />
        </button>
      </div>
    </>
  );
};

export default PaymentUpdatesList;
