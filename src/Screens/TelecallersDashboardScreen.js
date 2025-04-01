import React from "react";
import { calendericon, leadicon, sandclock } from "../assets/images";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import PieChartcomp from "../Components/Dashboard/PieChartcomp";
import LeadReport from "../Components/Dashboard/LeadReport";

const TelecallersDashboardScreen = () => {
  return (
    <div>
      <div className="topbox-const">
        <div className="bash-box rounded-3 p-md-3 p-2 bg-primary3 d-flex gap-4">
          <div>
            <p className=" mb-0 f5 fs-xxl-22 fs-xl-22 fs-lg-20 fs-sm-18 fs-xs-18 textani white">
              Pending
            </p>
            <p className="mb-0 f5 fs-xxl-22 fs-xl-22 fs-lg-20 fs-sm-18 fs-xs-18 textani white">
              Leads
            </p>
            <p className="mt-md-4 mt-2 mb-0 f7 fs-xxl-29 fs-xl-29 fs-lg-28 fs-sm-25 fs-xs-22 textani white">
              35
            </p>
          </div>
          <div className="imgcont d-flex ac-jc">
            <img src={sandclock} />
          </div>
          <button className="iconabsolute border-0 d-flex ac-jc rounded-5">
            <EastOutlinedIcon className="primary3" />
          </button>
        </div>
        <div className="bash-box rounded-3 p-md-3 p-2 bg-primary3 d-flex gap-4">
          <div>
            <p className=" mb-0 f5 fs-xxl-22 fs-xl-22 fs-lg-20 fs-sm-18 fs-xs-18 textani white">
              Converted
            </p>
            <p className="mb-0 f5 fs-xxl-22 fs-xl-22 fs-lg-20 fs-sm-18 fs-xs-18 textani white">
              Leads
            </p>
            <p className="mt-md-4 mt-2 mb-0 f7 fs-xxl-29 fs-xl-29 fs-lg-28 fs-sm-25 fs-xs-22 textani white">
              750
            </p>
          </div>
          <div className="imgcont d-flex ac-jc">
            <img src={leadicon} />
          </div>
          <button className="iconabsolute border-0 d-flex ac-jc rounded-5">
            <EastOutlinedIcon className="primary3" />
          </button>
        </div>
        <div className="bash-box rounded-3 p-md-3 p-2 bg-primary3 d-flex gap-4">
          <div>
            <p className=" mb-0 f5 fs-xxl-22 fs-xl-22 fs-lg-20 fs-sm-18 fs-xs-18 textani white">
              Upcoming
            </p>
            <p className="mb-0 f5 fs-xxl-22 fs-xl-22 fs-lg-20 fs-sm-18 fs-xs-18 textani white">
              Leads
            </p>
            <p className="mt-md-4 mt-2 mb-0 f7 fs-xxl-29 fs-xl-29 fs-lg-28 fs-sm-25 fs-xs-22 textani white">
              1230
            </p>
          </div>
          <div className="imgcont d-flex ac-jc">
            <img src={calendericon} />
          </div>
          <button className="iconabsolute border-0 d-flex ac-jc rounded-5">
            <EastOutlinedIcon className="primary3" />
          </button>
        </div>
      </div>
      <div className="d-flex w-100 flex-md-row ac-jb flex-column py-3">
        <div className="w-40">
          <LeadReport />
        </div>
        <div className="w-60">
          <PieChartcomp />
        </div>
      </div>
    </div>
  );
};

export default TelecallersDashboardScreen;
