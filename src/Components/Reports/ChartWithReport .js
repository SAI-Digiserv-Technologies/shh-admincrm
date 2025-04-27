import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Full Chart Data (for Bar Chart)
const data = [
  { name: "Jan", value: 90 },
  { name: "Feb", value: 80 },
  { name: "Mar", value: 65 },
  { name: "Apr", value: 30 },
  { name: "May", value: 70 },
  { name: "Jun", value: 10 },
  { name: "Jul", value: 20 },
  { name: "Aug", value: 40 },
  { name: "Sep", value: 50 },
  { name: "Oct", value: 80 },
  { name: "Nov", value: 40 },
  { name: "Dec", value: 60 },
];

// Last 4 Month Report Data
const reportData = [
  {
    month: "Jan",
    value: 90,
    color: "orange",
    enrolled: 30,
    followUp: 40,
    closeFollowUp: 20,
  },
  {
    month: "Feb",
    value: 80,
    color: "skyblue",
    enrolled: 25,
    followUp: 35,
    closeFollowUp: 20,
  },
  {
    month: "Mar",
    value: 65,
    color: "blue",
    enrolled: 20,
    followUp: 25,
    closeFollowUp: 20,
  },
  {
    month: "Apr",
    value: 30,
    color: "hotpink",
    enrolled: 10,
    followUp: 15,
    closeFollowUp: 5,
  },
];

const ChartWithReport = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
      {/* Left Side Bar Chart */}
      <div style={{ flex: 1 }} className="">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" background={{ fill: "transparent" }}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.name === "Feb" ? "#f8bbd0" : "#b3e5fc"}
                />
              ))}
            </Bar>
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
        <h3>Monthly Report (Last 4 Months)</h3>

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
                overflow: "hidden",
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
                  height: `${item.value}%`,
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
                  <div>Enrolled: {item.enrolled}</div>
                  <div>Follow-up: {item.followUp}</div>
                  <div>Closed: {item.closeFollowUp}</div>
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
