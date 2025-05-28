import React, { useEffect, useState } from "react";

import EnquiryList from "../Components/Enquiry/EnquiryList";
import SourceList from "../Components/SetupManage/SourceList";
import { useNavigate } from "react-router-dom";
import { useLazyGetUserQuery } from "../Data/Api/api";
import EmptyComp from "../Components/Empty/EmptyComp";
import PageLoad from "../Components/Loading/PageLoad";

const EnquiryScreen = () => {
  const navigate = useNavigate();
  const [leadlist, setLeadList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Api
  const [leedview] = useLazyGetUserQuery();

  const getLeadFun = () => {
    setLoading(true);
    leedview()
      .unwrap()
      .then((res) => {
        // console.log("res", res);
        const allPendingLeads = res?.data.filter(
          (lead) => lead.status == "Enquiry"
        );
        setLeadList(allPendingLeads);
      })
      .catch((err) => {
        // console.log("Err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getLeadFun();
  }, []);
  return (
    <>
      {loading ? (
        <PageLoad />
      ) : (
        <div className="lead-head">
          <div className="lead-h d-flex ac-je">
            <button
              onClick={() => {
                navigate("/enquiries/add", { state: { type: "add" } });
              }}
              className="refil-text mb-0 white d-flex ac-jc bg-primary3 f4 rounded-3 border-0 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani"
            >
              + Add Enquiry
            </button>
          </div>
          {leadlist?.length == 0 ? (
            <EmptyComp text={"Enquiry Leads Not Found"} />
          ) : (
            <EnquiryList leadlist={leadlist} />
          )}
          {/* <SourceList /> */}
        </div>
      )}
    </>
  );
};

export default EnquiryScreen;
