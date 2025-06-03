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
  const [isOpen, setIsOpen] = useState(false);
  const [exportImp, setExportImp] = useState(null);

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
              onClick={() => setIsOpen(!isOpen)}
              className="refil-text mb-0 white d-flex ac-jc bg-primary3 f4 rounded-3 border-0 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani"
            >
              Add Enquiry
            </button>
            {isOpen && (
              <ul
                className="dropdown-menu show position-absolute mt-1"
                style={{ display: "block" }}
              >
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      setIsOpen(false);
                      setExportImp("import");
                    }}
                  >
                    Import CSV File
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/enquiries/add", { state: { type: "add" } });
                    }}
                  >
                    Add New Enquiry
                  </button>
                </li>
              </ul>
            )}
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
