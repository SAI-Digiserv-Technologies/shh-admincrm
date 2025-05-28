import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Helper to format month names
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const ChartWithReport = ({ leadList = [] }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    if (leadList.length > 0) {
      const monthStatusCount = {};

      leadList.forEach((lead) => {
        if (lead.createdAt && lead.status) {
          const date = new Date(lead.createdAt);
          const month = monthNames[date.getMonth()]; // Example: "Jan"

          if (!monthStatusCount[month]) {
            monthStatusCount[month] = {};
          }

          if (!monthStatusCount[month][lead.status]) {
            monthStatusCount[month][lead.status] = 0;
          }

          monthStatusCount[month][lead.status]++;
        }
      });

      // Convert to array format suitable for Recharts
      const formattedData = Object.keys(monthStatusCount).map((month) => ({
        name: month,
        ...monthStatusCount[month], // Spread statuses like Enrollment, Enquiry, etc.
      }));

      setChartData(formattedData);

      // Calculate the total leads, Enrolled leads, Enquiry leads, and Follow Up leads
      const availableMonths = Object.keys(monthStatusCount).map((month) => {
        const monthData = monthStatusCount[month];
        const totalLeads = Object.values(monthData).reduce(
          (acc, val) => acc + val,
          0
        );
        const enrolledLeads = monthData["Enrollment"] || 0; // Default to 0 if no Enrollment
        const enquiryLeads = monthData["Enquiry"] || 0; // Default to 0 if no Enquiry
        const followUpLeads = monthData["Follow Ups"] || 0; // Default to 0 if no Follow Ups

        // Calculate the percentage of enrolled leads
        const enrollmentPercentage =
          totalLeads > 0 ? (enrolledLeads / totalLeads) * 100 : 0;

        return {
          month,
          totalLeads,
          enrolledLeads,
          enquiryLeads,
          followUpLeads,
          enrollmentPercentage,
          color: getColorForMonth(month),
        };
      });

      setReportData(availableMonths);
    }
  }, [leadList]);

  // Function to get a random color for the month (you can modify this logic)
  const getColorForMonth = (month) => {
    const colors = {
      Jan: "orange",
      Feb: "skyblue",
      Mar: "blue",
      Apr: "hotpink",
      May: "green",
      Jun: "red",
      Jul: "purple",
      Aug: "yellow",
      Sep: "pink",
      Oct: "brown",
      Nov: "gray",
      Dec: "cyan",
    };
    return colors[month] || "gray";
  };

  // console.log("reportData", reportData);

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#b9a8d3",
        padding: "20px",
        borderRadius: "10px",
        color: "#000",
      }}
      className="ac-jc mb-3"
    >
      {/* Left Side Chart */}
      <div style={{ flex: 1 }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="Enrollment"
              fill="#82ca9d"
              background={{ fill: "transparent" }}
            />
            {/* You can add more <Bar /> if you have more statuses */}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Right Side Monthly Report */}
      <div
        style={{
          marginLeft: "20px",
          background: "#fff",
          padding: "20px",
          textAlign: "center",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        }}
        className="px-4"
      >
        <h3>Monthly Report (Last Available Months)</h3>

        <div
          className="d-flex ac-jc gap-3"
          style={{
            marginTop: "20px",
          }}
        >
          {reportData.map((item, index) => (
            <div
              key={index}
              style={{
                width: "80px",
                height: "300px",
                border: `2px solid ${item.color}`,
                position: "relative",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Colored Bar */}
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  height: `${item.enrollmentPercentage}%`, // Height based on enrollment percentage
                  width: "100%",
                  backgroundColor: item.color,
                }}
              ></div>

              {/* Tooltip on Hover */}
              {hoveredIndex === index && (
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#333",
                    color: "#fff",
                    padding: "8px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    width: "120px",
                    zIndex: 10,
                  }}
                >
                  <div>Total: {item.totalLeads}</div>
                  <div>Enquiry: {item.enquiryLeads}</div>
                  <div>Enrollment: {item.enrolledLeads}</div>
                  <div>Follow Ups: {item.followUpLeads}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Labels */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "10px",
          }}
        >
          {reportData.map((item, index) => (
            <span
              key={index}
              style={{
                color: item.color,
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              {item.month}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartWithReport;
