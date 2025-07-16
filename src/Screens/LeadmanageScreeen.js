import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LeadList from "../Components/LeadManage/LeadeList";
import { useLazyGetUserQuery } from "../Data/Api/api";
import PageLoad from "../Components/Loading/PageLoad";
import EmptyComp from "../Components/Empty/EmptyComp";

const LeadmanageScreeen = () => {
  const navigate = useNavigate();
  const [leadlists, setLeadlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [originalLeadList, setOriginalLeadList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [leadviewapi] = useLazyGetUserQuery();

  const handleleadview = () => {
    setLoading(true);
    leadviewapi()
      .unwrap()
      .then((res) => {
        const allPendingLeads = res?.data.filter(
          (lead) => lead.status !== "Enquiry"
        );
        setOriginalLeadList(allPendingLeads);
        setLeadlists(allPendingLeads);
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

  // 🔍 Live Search as you type
  useEffect(() => {
    const search = searchText.toLowerCase();
    const filtered = originalLeadList.filter((lead) =>
      lead.name?.toLowerCase().includes(search) ||
      lead.email?.toLowerCase().includes(search) ||
      lead.phonenumber?.toLowerCase().includes(search) ||
      lead?.assignedto?.name?.toLowerCase().includes(search) ||
      lead?.interested_course?.addcourse?.toLowerCase().includes(search)
    );
    setLeadlists(filtered);
  }, [searchText, originalLeadList]);

  return (
    <>
      {originalLeadList?.length > 0 && (
        <div className="lead-head">
          <div className="lead-h d-flex ac-je">
            <div className="d-flex gap-3 flex-wrap">
              <input
                type="text"
                placeholder="Search Leads"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="form-control"
                style={{ width: "250px" }}
              />
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
