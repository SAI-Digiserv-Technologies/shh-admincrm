import React from "react";
import Paymentproof from "../assets/images/Proofimg.png"; // ✅ Ensure this path and file exist

const PaymentScreen = () => {
  const fields = [
    { label: "Name", type: "text", placeholder: "Sankari" },
    { label: "Course", type: "text", placeholder: "Digital Marketing" },
    { label: "Amount", type: "text", placeholder: "25,000" },
    { label: "Paid Amount", type: "text", placeholder: "Paid Amount" },
    { label: "Balance Amount", type: "text", placeholder: "Balance" },
    {
      label: "Mode",
      type: "select",
      options: ["Select Mode", "UPI", "Card", "Cash"]
    },
    { label: "Email ID", type: "email", placeholder: "sankari@gmail.com" },
    { label: "Transaction ID", type: "text", placeholder: "Transaction ID" },
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
        
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 border border-gray-400 rounded-3xl p-8 shadow-md">
          <h2 className="text-xl font-semibold mb-6 text-[#070148]">Payment</h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((field, index) => (
              <div className="flex flex-col" key={index}>
                <label className="text-sm mb-1 text-gray-700">{field.label}</label>
                {field.type === "select" ? (
                  <select className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    {field.options.map((option, idx) => (
                      <option key={idx} value={option === "Select Mode" ? "" : option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                )}
              </div>
            ))}
          </form>

          <div className="flex justify-center mt-8">
            <button className="bg-[#070148] text-white px-6 py-2 rounded-md hover:bg-[#12075f] transition">
              Submit
            </button>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="w-full lg:w-1/3 flex justify-center">
          <img
            src={Paymentproof}
            alt="Payment Proof"
            className="w-60 max-w-sm rounded-xl shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;
