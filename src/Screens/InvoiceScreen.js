import React, { useState } from "react";
import {
  Download,
  ChevronLeft,
  ChevronRight,
  FileDown,
  Filter,
} from "lucide-react"; // Filter icon added
import { Button, FormControl } from "react-bootstrap";

const InvoiceScreen = () => {
  // Simulated data
  const allData = [
    { name: "Ramya Annamalai", course: "Digital Marketing", paid: 25000, balance: 0, status: "Fully Paid" },
    { name: "Karthik Kumar", course: "Web Development", paid: 15000, balance: 10000, status: "Partially Paid" },
    { name: "Sneha Ravi", course: "Graphic Design", paid: 20000, balance: 5000, status: "Partially Paid" },
    { name: "Arjun Das", course: "UI/UX", paid: 30000, balance: 0, status: "Fully Paid" },
    { name: "Nisha Menon", course: "Data Science", paid: 18000, balance: 2000, status: "Partially Paid" },
    { name: "Vikram Singh", course: "AI & ML", paid: 25000, balance: 0, status: "Fully Paid" },
    { name: "Meena Iyer", course: "Cloud Computing", paid: 10000, balance: 15000, status: "Partially Paid" },
    { name: "Gautam Rao", course: "Cybersecurity", paid: 25000, balance: 0, status: "Fully Paid" },
    { name: "Divya Sharma", course: "Product Management", paid: 12000, balance: 13000, status: "Partially Paid" },
    { name: "Ravi Shankar", course: "Networking", paid: 25000, balance: 0, status: "Fully Paid" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const filteredData = allData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // Export data to CSV function
  const exportToCSV = () => {
    const headers = ["Name", "Course", "Paid Amount", "Balance Amount", "Status"];
    const rows = filteredData.map(item => [
      item.name,
      item.course,
      item.paid.toLocaleString(),
      item.balance.toFixed(2),
      item.status,
    ]);
    let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n";
    rows.forEach(row => {
      csvContent += row.join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "invoices.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Invoice</h2>
        <div className="flex items-center gap-4">
          <Button
            className="bg-[#730AC6] text-white rounded-md px-4 py-2 text-sm"
            onClick={exportToCSV} // Trigger export on button click
          >
            Export
          </Button>
          <div className="bg-[#070148] text-white p-2 rounded cursor-pointer">
          <Filter size={18} />
        </div>
        </div>
      </div>

      

      {/* Invoice Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-[#070148] text-white">
            <tr>
              <th className="px-4 py-2">S.no</th>
              <th className="px-4 py-2">Student Name</th>
              <th className="px-4 py-2">Course</th>
              <th className="px-4 py-2">Paid Amount</th>
              <th className="px-4 py-2">Balance Amount</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Invoice</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-[#E4E4FB]" : "bg-white"
                } border-b`}
              >
                <td className="px-4 py-3">{(currentPage - 1) * recordsPerPage + index + 1}</td>
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.course}</td>
                <td className="px-4 py-3">{item.paid.toLocaleString()}</td>
                <td className="px-4 py-3">{item.balance.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                      item.status === "Fully Paid"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div
                    className="bg-red-500 p-2 rounded-full inline-block cursor-pointer"
                    onClick={() => alert(`Downloading invoice for ${item.name}`)}
                  >
                    <Download size={16} className="text-white" />
                  </div>
                </td>
              </tr>
            ))}
            {currentData.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          className="p-2 rounded-full border border-gray-300 hover:bg-gray-200 disabled:opacity-50"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={20} />
        </button>

        <button
          className="p-2 rounded-full border border-gray-300 hover:bg-gray-200 disabled:opacity-50"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </>
  );
};

export default InvoiceScreen;
