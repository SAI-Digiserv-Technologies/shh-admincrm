import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Status colors
const statusColors = {
  "Not Interested": "bg-red-600",
  "Follow-up": "bg-yellow-400 text-black",
  "Close Follow-up": "bg-blue-300 text-black",
  "Interested": "bg-blue-900",
  "Enrollment": "bg-lime-400 text-black",
  "Switched-off": "bg-sky-600",
  "Discontinues": "bg-gray-500"
};

// Mock leads with `source` added
const mockLeads = Array.from({ length: 15 }, (_, i) => ({
  id: 3242 + i,
  name: "Ramya Annamalai",
  phone: "+91 99625 36958",
  course: "Digital Marketing",
  source: ["Instagram", "Facebook", "YouTube"][i % 3],
  assignedTo: ["Sankari", "Meena", "Arun"][i % 3],
  city: "Chennai",
  status: [
    "Not Interested",
    "Follow-up",
    "Close Follow-up",
    "Interested",
    "Enrollment",
    "Switched-off",
    "Discontinues",
    "Not Interested",
    "Follow-up",
    "Close Follow-up",
    "Interested",
    "Enrollment",
    "Switched-off",
    "Discontinues",
    "Follow-up"
  ][i]
}));

export default function LeadManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 5;

  const totalPages = Math.ceil(mockLeads.length / leadsPerPage);
  const startIndex = (currentPage - 1) * leadsPerPage;
  const endIndex = startIndex + leadsPerPage;
  const currentLeads = mockLeads.slice(startIndex, endIndex);

  // Extract unique filter values
  const courses = [...new Set(mockLeads.map((lead) => lead.course))];
  const sources = [...new Set(mockLeads.map((lead) => lead.source))];
  const assignedToList = [...new Set(mockLeads.map((lead) => lead.assignedTo))];
  const statusList = [...new Set(mockLeads.map((lead) => lead.status))];

  return (
    <div className="bg-white min-h-screen ">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-slate-800">Lead Management</h1>
        <div className="flex flex-wrap gap-2">
          {/* Course Dropdown */}
          <select className="px-4 py-2 bg-blue-900 text-white rounded-md shadow-sm">
            <option>Course</option>
            {courses.map((course, index) => (
              <option key={index}>{course}</option>
            ))}
          </select>

          {/* Source Dropdown */}
          <select className="px-4 py-2 bg-blue-900 text-white rounded-md shadow-sm">
            <option>Source</option>
            {sources.map((source, index) => (
              <option key={index}>{source}</option>
            ))}
          </select>

          {/* Assigned To Dropdown */}
          <select className="px-4 py-2 bg-blue-900 text-white rounded-md shadow-sm">
            <option>Assigned To</option>
            {assignedToList.map((assignee, index) => (
              <option key={index}>{assignee}</option>
            ))}
          </select>

          {/* Status Dropdown */}
          <select className="px-4 py-2 bg-blue-900 text-white rounded-md shadow-sm">
            <option>Status</option>
            {statusList.map((status, index) => (
              <option key={index}>{status}</option>
            ))}
          </select>

          <button className="bg-pink-600 text-white px-4 py-2 rounded-md shadow-sm">
            + New Leads
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-7 overflow-x-auto rounded-lg border">
        <table className="min-w-[1000px] w-full text-xl text-center h-full">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="px-3 py-2">S.no</th>
              <th className="px-3 py-2">Lead ID</th>
              <th className="px-3 py-2">Student Name</th>
              <th className="px-3 py-2">Phone Number</th>
              <th className="px-3 py-2">Course</th>
           
              <th className="px-3 py-2">Assigned To</th>
              <th className="px-3 py-2">City</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentLeads.map((lead, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-indigo-100" : "bg-indigo-50"
                } text-slate-700 font-medium`}
              >
                <td className="px-3 py-2">{startIndex + index + 1}</td>
                <td className="px-3 py-2">{lead.id}</td>
                <td className="px-3 py-2">{lead.name}</td>
                <td className="px-3 py-2 text-blue-700">{lead.phone}</td>
                <td className="px-3 py-2">{lead.course}</td>
              
                <td className="px-3 py-2">{lead.assignedTo}</td>
                <td className="px-3 py-2">{lead.city}</td>
                <td className="px-3 py-2">
                  <span
                    className={`text-xl px-3 py-1 rounded-full text-white font-semibold inline-block ${
                      statusColors[lead.status] || "bg-gray-400"
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          className="p-2 rounded-full border border-gray-300 hover:bg-gray-200 disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={20} />
        </button>

        <span className="text-lg font-medium text-slate-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="p-2 rounded-full border border-gray-300 hover:bg-gray-200 disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
