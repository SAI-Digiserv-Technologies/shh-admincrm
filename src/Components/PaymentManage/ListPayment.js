import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { paymentList } from "../../Data/DummyJson";

const ListPayment = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 5;
  const navigate = useNavigate();

  const totalPages = Math.ceil(paymentList.length / leadsPerPage);

  // Pagination Logic
  const currentLeads = paymentList.slice(
    (currentPage - 1) * leadsPerPage,
    currentPage * leadsPerPage
  );

  // Function to determine button color based on payment mode
  const getPaymentModeColor = (mode) => {
    switch (mode.toLowerCase()) {
      case "bank":
        return { backgroundColor: "#f3ff70", color: "#000" }; // Yellow
      case "upi":
        return { backgroundColor: "#7cf2ff", color: "#000" }; // Light Blue
      case "net banking":
        return { backgroundColor: "#70ff87", color: "#000" }; // Green
      case "credit card":
        return { backgroundColor: "#ff69b4", color: "#000" }; // **Pink (Hot Pink)**
      default:
        return { backgroundColor: "#ccc", color: "#000" }; // Default Gray
    }
  };

  return (
    <>
      <div className="table-container rounded-3 mt-2">
        <table className="responsive-table rounded-3">
          <thead>
            <tr>
              <th className="py-3 px-2">S.No</th>
              <th className="py-3 px-2">Name</th>
              <th className="py-3 px-2">Payment Number</th>
              <th className="py-3 px-2">Date</th>
              <th className="py-3 px-2">Amount</th>
              <th className="py-3 px-2">Mode</th>
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
                <td className="text-center border-0 py-2 px-2">{lead.paymentNumber}</td>
                <td className="text-center border-0 py-2 px-2">{lead.date}</td>
                <td className="text-center border-0 py-2 px-2">{lead.amount}</td>

                {/* Payment Mode Button */}
                <td className="text-center border-0 py-2 px-2">
                  <button
                    className="rounded-pill border-0 text-center"
                    style={{
                      ...getPaymentModeColor(lead.ModeOfPayment),
                      minWidth: "120px",
                      height: "35px",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {lead.ModeOfPayment}
                  </button>
                </td>

                {/* Action Button */}
                <td className="text-center border-0 py-3 px-2">
                  <button
                    onClick={() =>
                      navigate("/telecallers/payment-updates/payment-list/payment-detalis")
                    }
                    className="border-0 rounded-2 text-center"
                    style={{
                      backgroundColor: "#00225d", // Dark Blue
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
          className={`${
            currentPage === 1 ? "opacity-50" : "opacity-100"
          } px-3 py-1 mx-1 border-0 rounded text-white`}
          style={{ backgroundColor: "#00225d" }} // Dark Blue
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
            currentPage === totalPages ? "opacity-50" : "opacity-100"
          } px-3 py-1 mx-1 border-0 rounded text-white`}
          style={{ backgroundColor: "#00225d" }} // Dark Blue
        >
          <ArrowForwardIosOutlinedIcon />
        </button>
      </div>
    </>
  );
};

export default ListPayment;
