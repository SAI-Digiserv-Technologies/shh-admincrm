import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PaymentReceipt = () => {
  return (
    <div className="container mt-4 p-4 border rounded shadow-sm bg-white" style={{ maxWidth: "400px" }}>
      <div className="mb-3">
        <p><strong>Name</strong> : Ramya Annamalai</p>
        <p><strong>Mobile number</strong> : +91 9876543210</p>
        <p><strong>Email</strong> : ramyaannamalai@fmail.com</p>
        <p><strong>Amount Paid</strong> : ₹ 8000</p>
        <p><strong>Mode of Payment</strong> : Ramya Annamalai</p>
        <p><strong>Transaction Id</strong> : Ramya Annamalai</p>
        <p><strong>Date</strong> : 30/02/2025</p>
      </div>
      <button className="btn btn-success w-100">Print</button>
    </div>
  );
};

export default PaymentReceipt;
