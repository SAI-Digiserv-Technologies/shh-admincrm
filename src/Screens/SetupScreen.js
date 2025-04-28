import React, { useState } from "react";
import SrcScreen from "./SrcScreen";
import LeadCourseList from "../Components/SetupManage/LeadCourseList";
import LeadCourseScreen from "./LeadCourseScreen";
import StaffRoleScreen from "./StaffRoleScreen";

const SetupScreen = () => {
  const [selectedTab, setSelectedTab] = useState("role");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const renderListContent = () => {
    switch (selectedTab) {
      case "course":
        return (
          <div className="list-content">
            <LeadCourseScreen />
          </div>
        );
      case "source":
        return (
          <div className="list-content">
            <SrcScreen />
          </div>
        );
      case "role":
        return (
          <div className="list-content">
            <StaffRoleScreen />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="">
      <div className="ac-js d-flex ">
        <button
          onClick={() => handleTabChange("role")}
          className={` ${
            selectedTab === "role"
              ? "bg-primary3 white  "
              : "primary3 bg-transparent "
          }  toggle-btn togbottum `}
        >
          <p className="mb-0">Roles</p>
        </button>
        <button
          onClick={() => handleTabChange("course")}
          className={` ${
            selectedTab === "course"
              ? "bg-primary3 white  "
              : "primary3 bg-transparent "
          }  toggle-btn togbottum `}
        >
          <p className="mb-0">Course</p>
        </button>
        <button
          onClick={() => handleTabChange("source")}
          className={` ${
            selectedTab === "source"
              ? "bg-primary3 white  "
              : "primary3 bg-transparent "
          }  toggle-btn togbottum `}
        >
          <p className="mb-0">Source</p>
        </button>
      </div>
      {renderListContent()}
    </div>
  );
};

export default SetupScreen;
