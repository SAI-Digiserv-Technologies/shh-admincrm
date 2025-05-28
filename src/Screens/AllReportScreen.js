import React, { useEffect, useState } from "react";
import ChartWithReport from "../Components/Reports/ChartWithReport ";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import {
  calendericon,
  leadicon,
  refileicon,
  sandclock,
  speakericon,
} from "../assets/images";
import { useLazyGetUserQuery } from "../Data/Api/api";
import PageLoad from "../Components/Loading/PageLoad";
import EmptyComp from "../Components/Empty/EmptyComp";

const AllReportScreen = () => {
  const [loading, setLoading] = useState(true);
  const [leadList, setLeadList] = useState([]);

  // Api
  const [leedview] = useLazyGetUserQuery();

  const getAlleadFun = () => {
    setLoading(true);
    leedview()
      .unwrap()
      .then((res) => {
        // console.log("leres", res);
        const data = res?.data;
        setLeadList(data);
      })
      .catch((err) => {
        // console.log("Err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAlleadFun();
  }, []);

  const enrolledLead = leadList?.filter((lead) => lead?.status == "Enrollment");
  const allfollowLeads = leadList.filter((lead) => lead.status == "Follow Ups");

  const allPendingLeads = leadList.filter((lead) => lead.status == "Enquiry");

  return (
    <>
      {loading ? (
        <PageLoad />
      ) : leadList?.length == 0 && !loading ? (
        <EmptyComp text={"Report Not Found"} />
      ) : (
        !loading && (
          <div>
            <div className="w-100 d-flex ac-je mb-2">
              {/* <p className="mb-0 f7 primary1 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani">
          Sankari
        </p> */}
              {/* <button className="refil-box d-flex ac-jc bg-primary3 rounded-3 border-0">
          <img src={refileicon} />
        </button> */}
            </div>
            <div className="topbox-const  gap-3 mb-4">
              <div className="bash-box rounded-3 p-md-3 p-2 bg-primary3 d-flex gap-4">
                <div>
                  <p className=" mb-0 f5 fs-xxl-22 fs-xl-22 fs-lg-20 fs-sm-18 fs-xs-18 textani white">
                    Total
                  </p>
                  <p className="mb-0 f5 fs-xxl-22 fs-xl-22 fs-lg-20 fs-sm-18 fs-xs-18 textani white">
                    Leads
                  </p>
                  <p className="mt-md-4 mt-2 mb-0 f7 fs-xxl-29 fs-xl-29 fs-lg-28 fs-sm-25 fs-xs-22 textani white">
                    {leadList?.length}
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
                    {enrolledLead?.length}
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
                    {allfollowLeads?.length}
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
                    {allPendingLeads?.length}
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
            <ChartWithReport leadList={leadList} />
          </div>
        )
      )}
    </>
  );
};

export default AllReportScreen;
