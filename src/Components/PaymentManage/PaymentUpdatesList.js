import React, { useEffect, useRef, useState } from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { useNavigate } from "react-router-dom";
import Invoice from "../Invoice/Invoice";
import NewInvoice from "../Invoice/NewInvoice";

const PaymentUpdatesList = ({ PaymentUpdateList }) => {
  const invoiceRef = useRef();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [paymentDatas, setPaymentDatas] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 5;
  const navigate = useNavigate();

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

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = PaymentUpdateList?.slice(
    indexOfFirstLead,
    indexOfLastLead
  );
  const totalPages = Math?.ceil(PaymentUpdateList?.length / leadsPerPage);

  console.log("PaymentUpdateList", PaymentUpdateList);

  const handlePrint = (data) => {
    setPaymentDatas(data);

    setTimeout(() => {
      const content = invoiceRef?.current?.innerHTML;
      if (!content || !content.trim()) {
        console.error("Invoice content is empty.");
        return;
      }

      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <html>
          <head>
            <title>Payment Invoice</title>
            <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="${window.location.origin}/css/invoice.css" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" />
            <style>
              @page {
                margin: 0;
                size: auto;
              }
              @media print {
                * {
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                }
                  @page {
                margin: 0;
                size: auto;
              }
                body {
                  background: #fff;
                  width: 100%;
                  align-items: center;
                  justify-content: flex-start;
                  display: flex;
                  flex-direction: column;
              }
                .layer-from {
                  width: 100%;
                }
                .footer-section {
                  position: fixed;
                  bottom: 0;
                  left: 0;
                  width: 100%;
                  background-color: #fff;
                  padding: 20px 40px;
                }
                .line {
                  width: 100%;
                  height: 2px;
                  background-color: #D0D3DD;
                  margin: 10px 0;
                }
                .footer-text {
                  font-size: 12px;
                  text-align: center;
                  margin-top: 10px;
                  color: #333;
                }
              }
            </style>
          </head>
          <body>
            <div class="layer-from">
              ${content}
            </div>
  
            <div class="footer-section">
              <p style="color: #0ABFAD; font-size: 13px; font-weight: bold; margin-bottom: 4px;">
                Terms & Conditions:
              </p>
              <div class="d-flex justify-content-between mb-2">
                <p style="width: 50%; margin: 0; font-size: 12px; color: #000;">
                  A finance charge of 1.5% will be made on unpaid balances after 30 days.
                </p>
                <div style="text-align: left;">
                  <p style="margin: 0; font-size: 14px; font-weight: bold;">MADHANA GOPAL</p>
                  <p style="margin: 0; font-size: 13px;">Manager</p>
                </div>
              </div>
              <p style="margin: 0; font-size: 13px;">Generated on: <strong>15/04/2025</strong></p>
              <div class="line"></div>
              <div class="footer-text">
                Invoice was created on a computer and is valid without the signature and seal.
              </div>
            </div>
      
           <script>
        window.onload = function () {
          window.print();

          // Close the window after short delay (even if cancelled)
          setTimeout(() => {
            window.close();
          }, 500);
        };
      </script>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }, 500);
  };

  console.log("PaymentUpdateList", PaymentUpdateList);

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
              <tr
                key={lead.id}
                onClick={() =>
                  navigate("/payment-updates/payment-list", {
                    state: { data: lead },
                  })
                }
                className="cp"
                style={{
                  background:
                    openDropdown === lead.id ? "#0b146b59" : "#ffffff59",
                }}
              >
                <td className="text-center border-0 py-2 px-2 primary3 f5">
                  {index + 1 + indexOfFirstLead}
                </td>
                <td className="text-center border-0 py-2 px-2 primary3 f5">
                  {/* {lead?.lead_details?.name} */}
                  {lead?.lead_name}
                </td>
                <td className="text-center border-0 py-2 px-2 primary3 f5">
                  {/* {lead?.lead_details?.course} */}
                  {lead?.course}
                </td>
                <td className="text-center border-0 py-2 px-2 primary3 f5">
                  {/* {lead?.lead_details?.course} */}
                  {lead?.amount}
                </td>
                <td className="text-center border-0 py-2 px-2 primary3 f5">
                  {/* {lead?.lead_details?.course} */}
                  {lead?.paidAmount}
                </td>
                <td className="text-center border-0 py-2 px-2 primary3 f5">
                  {/* {lead?.lead_details?.course} */}
                  {lead?.balanceAmount}
                </td>
                {/* <td className="text-center border-0 py-2 px-2 primary3 f5">
                  <div className="d-flex ac-jc">
                    <div
                      className={`${
                        lead?.balance_amount > 0 ? "bg-ltorange" : "bg-ltgreen"
                      } table-drop border-0 d-flex ac-jc px-3 rounded-5 primary3`}
                    >
                      <p className="mb-0">
                        {lead?.balance_amount > 0
                          ? "Partially Paid"
                          : "Fully Paid"}
                      </p>
                    </div>
                  </div>
                </td> */}
                <td className="text-center border-0 py-2 px-2 primary3 f5">
                  <div className="d-flex ac-jc">
                    <div
                      className={`${
                        lead?.balanceAmount > 0 ? "bg-ltorange" : "bg-ltgreen"
                      } table-drop border-0 d-flex ac-jc px-3 rounded-5 primary3`}
                    >
                      <p className="mb-0">
                        {lead?.balanceAmount > 0
                          ? "Partially Paid"
                          : "Fully Paid"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="text-center border-0 py-3 px-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrint(lead);
                    }}
                    className="border-0 bg-red white rounded-5 action-box2"
                  >
                    <FileDownloadOutlinedIcon className="fs-xxl-30" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {PaymentUpdateList.length > leadsPerPage && (
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

      {/* Render invoice preview for printing (hidden in UI, used for printing) */}
      {paymentDatas && (
        <div ref={invoiceRef} style={{ display: "none" }}>
          <NewInvoice
            invoiceRef={invoiceRef}
            paymentData={paymentDatas?.payment_history}
          />
        </div>
      )}
    </>
  );
};

export default PaymentUpdatesList;
