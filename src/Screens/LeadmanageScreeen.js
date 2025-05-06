import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LeadList from "../Components/LeadManage/LeadeList";
import {
  useLazyGetUserQuery,
  useLazySourcegetQuery,
  useLazyViewStaffQuery,
  useLazyViewUserQuery,
} from "../Data/Api/api";
import PageLoad from "../Components/Loading/PageLoad";
import EmptyComp from "../Components/Empty/EmptyComp";
import { leadstatus, outenqleadstatus } from "../Data/DummyJson";

const LeadmanageScreeen = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [filters, setFilters] = useState({
    Course: "",
    Sourse: "",
    Telecaller: "",
    Status: "",
  });
  const [leadlists, setLeadlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [originalLeadList, setOriginalLeadList] = useState([]);

  // ✅ Added this missing state
  const [getDatas, setGetDatas] = useState({
    course: [],
    source: [],
    staf: [],
  });

  const handleOptionClick = (field, value) => {
    setOpenDropdown(null);
    setLoading(true);

    // Clear the previous filter and apply the new filter
    const updatedFilters = {
      Course: field === "Course" ? value?.addcourse : "",
      Sourse: field === "Sourse" ? value?.sourcename : "",
      Telecaller: field === "Telecaller" ? value?.name : "",
      Status: field === "Status" ? value?.name : "",
    };
    setFilters(updatedFilters);

    // Filter the originalLeadList based on the selected filter alone
    const filteredLeads = originalLeadList.filter((lead) => {
      const courseMatch =
        !updatedFilters.Course ||
        lead?.interested_course?.addcourse === updatedFilters.Course;
      const sourceMatch =
        !updatedFilters.Sourse || lead.source === updatedFilters.Sourse;
      const staffMatch =
        !updatedFilters.Telecaller ||
        lead?.assignedto?.name === updatedFilters.Telecaller;
      const statusMatch =
        !updatedFilters.Status || lead.status === updatedFilters.Status;

      return courseMatch && sourceMatch && staffMatch && statusMatch;
    });

    setLeadlists(filteredLeads); // Update the filtered lead list
    setLoading(false);
  };

  // API hooks
  const [courseview] = useLazyViewUserQuery();
  const [viewsource] = useLazySourcegetQuery();
  const [viewStaffApi] = useLazyViewStaffQuery();
  const [leadviewapi] = useLazyGetUserQuery();

  const datagetFun = () => {
    setLoading(true);
    courseview()
      .unwrap()
      .then((res) => {
        const courcedata = res?.data;
        setGetDatas((prev) => ({ ...prev, course: courcedata }));
        viewsource()
          .unwrap()
          .then((res) => {
            const sourceData = res?.data;
            setGetDatas((prev) => ({ ...prev, source: sourceData }));
            viewStaffApi()
              .unwrap()
              .then((res) => {
                const telecallers = res?.telecallers || res?.data || [];
                setGetDatas((prev) => ({ ...prev, staf: telecallers }));
              })
              .finally(() => {
                setLoading(false);
              });
          });
      });
  };

  const fieldOptions = {
    Course: getDatas?.course,
    Sourse: getDatas?.source,
    Telecaller: getDatas?.staf,
    Status: outenqleadstatus,
  };

  const handleleadview = () => {
    setLoading(true);
    leadviewapi()
      .unwrap()
      .then((res) => {
        const allPendingLeads = res?.data.filter(
          (lead) => lead.status !== "Enquiry"
        );
        setOriginalLeadList(allPendingLeads); // Store the unfiltered list
        setLeadlists(allPendingLeads); // Set the initial unfiltered list to leadlists
        datagetFun();
      })
      .catch((err) => {
        console.error("Lead fetch error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleleadview();
  }, []);

  return (
    <>
      {originalLeadList?.length > 0 && (
        <div className="lead-head">
          <div className="lead-h d-flex ac-je">
            <div className="d-flex gap-3 flex-wrap">
              <div className="position-relative">
                <button
                  onClick={() => handleOptionClick()}
                  className=" mb-0 white d-flex ac-jc bg-primary3 f4 rounded-3 border-0 px-4 py-2 textani"
                >
                  Clear
                </button>
              </div>
              {Object.keys(fieldOptions)?.map((field) => {
                return (
                  <div key={field} className="position-relative">
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === field ? null : field)
                      }
                      className="refil-text mb-0 white d-flex ac-jc bg-primary3 f4 rounded-3 border-0 px-3 py-2 textani"
                    >
                      {field}
                    </button>

                    {openDropdown === field && (
                      <ul
                        className="dropdown-menu show mt-1"
                        style={{ display: "block" }}
                      >
                        {fieldOptions[field]?.map((option, idx) => {
                          return (
                            <li key={idx}>
                              <button
                                className="dropdown-item"
                                onClick={() => handleOptionClick(field, option)}
                              >
                                {option?.addcourse ||
                                  option?.name ||
                                  option?.sourcename}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {loading ? (
        <PageLoad />
      ) : leadlists?.length === 0 ? (
        <EmptyComp text={"Leads Not Found"} />
      ) : (
        <div className="lead-head">
          <LeadList data={leadlists} />
        </div>
      )}
    </>
  );
};

export default LeadmanageScreeen;
