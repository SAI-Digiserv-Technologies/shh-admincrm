import React, { useEffect, useState } from "react";
import {
  calendericon,
  leadicon,
  sandclock,
  speakericon,
} from "../assets/images";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import PieChartcomp from "../Components/Dashboard/PieChartcomp";
import LeadReport from "../Components/Dashboard/LeadReport";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLazyGetUserQuery } from "../Data/Api/api";
import PageLoad from "../Components/Loading/PageLoad";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dashLeadData, setDashLeadData] = useState({
    pending: 0,
    converted: 0,
    upcommin: 0,
    allfollow: 0,
    aria: [],
    Tdypending: 0,
    Tdyconverted: 0,
    updatesLeads: 0,
  });
  const [leedview] = useLazyGetUserQuery();

  const getapi = () => {
    leedview()
      .unwrap()
      .then((res) => {
        console.log("Res", res);
        // AllData
        const fulldata = res?.data;
        console.log("resfulldata", fulldata, res?.data);

        const allPendingLeads = fulldata.filter(
          (lead) => lead.status == "Enquiry"
        );
        const allenrolledLeads = fulldata.filter(
          (lead) => lead.status == "Enrollement"
        );

        const allfollowLeads = fulldata.filter(
          (lead) => lead.status == "Follow Ups"
        );

        console.log("allfollowLeads", allfollowLeads);

        const today = new Date();
        const todayDateOnly = today.toISOString().split("T")[0];
        // Updated
        const updatesLeads = fulldata?.filter((lead) => {
          const leadDate = new Date(lead?.updatedAt)
            .toISOString()
            .split("T")[0];
          return leadDate === todayDateOnly;
        });

        // Today only start
        const todaysLeads = res?.data?.filter((lead) => {
          const leadDate = new Date(lead?.createdAt)
            .toISOString()
            .split("T")[0];
          return leadDate === todayDateOnly;
        });
        const TdyPendingdLeads = todaysLeads.filter(
          (lead) => lead.status == "Enquiry"
        );
        const enrolledLeads = updatesLeads.filter(
          (lead) => lead.status == "Enrollement"
        );
        // Today only end
        console.log("TodayFull lead", todaysLeads);
        console.log("TdyPending lead", TdyPendingdLeads);
        console.log("Tdyenrolled lead", enrolledLeads);
        console.log("Full lead", fulldata);
        console.log("Pending lead", allPendingLeads);
        console.log("enrolled lead", allenrolledLeads);
        console.log("updatesLeads", updatesLeads);

        setDashLeadData({
          pending: allPendingLeads?.length,
          converted: allenrolledLeads?.length,
          upcommin: fulldata?.length,
          allfollow: allfollowLeads?.length,
          aria: fulldata,
          Tdypending: TdyPendingdLeads?.length,
          Tdyconverted: enrolledLeads?.length,
          updatesLeads: updatesLeads?.length,
        });
      })
      .catch((err) => {
        console.log("response not gentrated", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getapi();
  }, []);
  return (
    <div>
      {loading && <PageLoad />}

      <div className="topbox-const  gap-3">
        <div className="bash-box rounded-3 p-md-3 p-2 bg-primary3 d-flex gap-4">
          <div>
            <p className=" mb-0 f5 fs-xxl-22 fs-xl-22 fs-lg-20 fs-sm-18 fs-xs-18 textani white">
              Total
            </p>
            <p className="mb-0 f5 fs-xxl-22 fs-xl-22 fs-lg-20 fs-sm-18 fs-xs-18 textani white">
              Leads
            </p>
            <p className="mt-md-4 mt-2 mb-0 f7 fs-xxl-29 fs-xl-29 fs-lg-28 fs-sm-25 fs-xs-22 textani white">
              {dashLeadData?.upcommin || 0}
            </p>
          </div>
          <div className="imgcont d-flex ac-jc">
            <img src={speakericon} />
          </div>
          {/* <button className="iconabsolute border-0 d-flex ac-jc rounded-5">
            <EastOutlinedIcon className="primary3" />
          </button> */}
        </div>
        <div className="bash-box rounded-3 p-md-3 p-2 bg-primary3 d-flex gap-4">
          <div>
            <p className=" mb-0 f5 fs-xxl-22 fs-xl-22 fs-lg-20 fs-sm-18 fs-xs-18 textani white">
              Enrolled
            </p>
            <p className="mb-0 f5 fs-xxl-22 fs-xl-22 fs-lg-20 fs-sm-18 fs-xs-18 textani white">
              Leads
            </p>
            <p className="mt-md-4 mt-2 mb-0 f7 fs-xxl-29 fs-xl-29 fs-lg-28 fs-sm-25 fs-xs-22 textani white">
              {dashLeadData?.converted}
            </p>
          </div>
          <div className="imgcont d-flex ac-jc">
            <img src={sandclock} />
          </div>
          {/* <button className="iconabsolute border-0 d-flex ac-jc rounded-5">
            <EastOutlinedIcon className="primary3" />
          </button> */}
        </div>
        <div className="bash-box rounded-3 p-md-3 p-2 bg-primary3 d-flex gap-4">
          <div>
            <p className=" mb-0 f5 fs-xxl-22 fs-xl-22 fs-lg-20 fs-sm-18 fs-xs-18 textani white">
              Follow-up
            </p>
            <p className="mb-0 f5 fs-xxl-22 fs-xl-22 fs-lg-20 fs-sm-18 fs-xs-18 textani white">
              Leads
            </p>
            <p className="mt-md-4 mt-2 mb-0 f7 fs-xxl-29 fs-xl-29 fs-lg-28 fs-sm-25 fs-xs-22 textani white">
              {dashLeadData?.allfollow}
            </p>
          </div>
          <div className="imgcont d-flex ac-jc">
            <img src={leadicon} />
          </div>
          {/* <button className="iconabsolute border-0 d-flex ac-jc rounded-5">
            <EastOutlinedIcon className="primary3" />
          </button> */}
        </div>
        <div className="bash-box rounded-3 p-md-3 p-2 bg-primary3 d-flex gap-4">
          <div>
            <p className=" mb-0 f5 fs-xxl-22 fs-xl-22 fs-lg-20 fs-sm-18 fs-xs-18 textani white">
              Total-
            </p>
            <p className="mb-0 f5 fs-xxl-22 fs-xl-22 fs-lg-20 fs-sm-18 fs-xs-18 textani white">
              walk in
            </p>
            <p className="mt-md-4 mt-2 mb-0 f7 fs-xxl-29 fs-xl-29 fs-lg-28 fs-sm-25 fs-xs-22 textani white">
              {dashLeadData?.pending || 0}
            </p>
          </div>
          <div className="imgcont d-flex ac-jc">
            <img src={calendericon} />
          </div>
          {/* <button className="iconabsolute border-0 d-flex ac-jc rounded-5">
            <EastOutlinedIcon className="primary3" />
          </button> */}
        </div>
      </div>
      <div className="d-flex w-100 flex-md-row ac-jb flex-column py-3">
        <div className="w-40">
          <LeadReport dashLeadData={dashLeadData} />
        </div>
        <div className="w-60">
          <PieChartcomp dashLeadData={dashLeadData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
