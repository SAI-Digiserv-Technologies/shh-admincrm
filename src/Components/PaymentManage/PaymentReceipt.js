import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";

const PaymentReceipt = () => {
  const location = useLocation();
  console.log("location", location);

  return (
    <div className="bg-white w-50 shadow rounded-4 p-3 mt-4">
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
        }}
        cellPadding="10"
        className=""
      >
        <tbody>
          <tr>
            <td
              style={{ border: "0", fontWeight: "bold" }}
              className="fs-xxl-18 fs-xl-18 fs-lg-17 fs-sm-16 fs-xs-15 textani f6 black"
            >
              Name
            </td>
            <td style={{ border: "0" }}>
              <strong>:</strong>
            </td>
            <td
              style={{ border: "0" }}
              className="fs-xxl-16 fs-xl-16 fs-lg-16 fs-sm-15 fs-xs-13 textani f3 black"
            >
              Ramya Annamalai
            </td>
          </tr>
          <tr>
            <td
              className="fs-xxl-18 fs-xl-18 fs-lg-17 fs-sm-16 fs-xs-15 textani f6 black"
              style={{ border: "0", fontWeight: "bold" }}
            >
              Mobile Number
            </td>
            <td style={{ border: "0" }}>
              <strong>:</strong>
            </td>
            <td
              className="fs-xxl-16 fs-xl-16 fs-lg-16 fs-sm-15 fs-xs-13 textani f3 black"
              style={{ border: "0" }}
            >
              {" "}
              +91 9876543210
            </td>
          </tr>
          <tr>
            <td
              className="fs-xxl-18 fs-xl-18 fs-lg-17 fs-sm-16 fs-xs-15 textani f6 black"
              style={{ border: "0", fontWeight: "bold" }}
            >
              Email
            </td>
            <td style={{ border: "0" }}>
              <strong>:</strong>
            </td>
            <td
              className="fs-xxl-16 fs-xl-16 fs-lg-16 fs-sm-15 fs-xs-13 textani f3 black"
              style={{ border: "0" }}
            >
              ramyaannamalai@fmail.com
            </td>
          </tr>
          <tr>
            <td
              className="fs-xxl-18 fs-xl-18 fs-lg-17 fs-sm-16 fs-xs-15 textani f6 black"
              style={{ border: "0", fontWeight: "bold" }}
            >
              Amount Paid
            </td>
            <td style={{ border: "0" }}>
              <strong>:</strong>
            </td>
            <td
              className="fs-xxl-16 fs-xl-16 fs-lg-16 fs-sm-15 fs-xs-13 textani f3 black"
              style={{ border: "0" }}
            >
              ₹ 8000
            </td>
          </tr>
          <tr>
            <td
              className="fs-xxl-18 fs-xl-18 fs-lg-17 fs-sm-16 fs-xs-15 textani f6 black"
              style={{ border: "0", fontWeight: "bold" }}
            >
              Mode of Payment
            </td>
            <td style={{ border: "0" }}>
              <strong>:</strong>
            </td>
            <td
              className="fs-xxl-16 fs-xl-16 fs-lg-16 fs-sm-15 fs-xs-13 textani f3 black"
              style={{ border: "0" }}
            >
              Ramya Annamalai
            </td>
          </tr>
          <tr>
            <td
              className="fs-xxl-18 fs-xl-18 fs-lg-17 fs-sm-16 fs-xs-15 textani f6 black"
              style={{ border: "0", fontWeight: "bold" }}
            >
              Transaction ID
            </td>
            <td style={{ border: "0" }}>
              <strong>:</strong>
            </td>
            <td
              className="fs-xxl-16 fs-xl-16 fs-lg-16 fs-sm-15 fs-xs-13 textani f3 black"
              style={{ border: "0" }}
            >
              Ramya Annamalai
            </td>
          </tr>
          <tr>
            <td
              className="fs-xxl-18 fs-xl-18 fs-lg-17 fs-sm-16 fs-xs-15 textani f6 black"
              style={{ border: "0", fontWeight: "bold" }}
            >
              Date
            </td>
            <td style={{ border: "0" }}>
              <strong>:</strong>
            </td>
            <td
              className="fs-xxl-16 fs-xl-16 fs-lg-16 fs-sm-15 fs-xs-13 textani f3 black"
              style={{ border: "0" }}
            >
              30/02/2025
            </td>
          </tr>
        </tbody>
      </table>

      {/* <button
        className="btn btn-success w-100  "
        style={{ backgroundColor: "#00225D", color: "white" }}
      >
        Print
      </button> */}
    </div>
  );
};

export default PaymentReceipt;
