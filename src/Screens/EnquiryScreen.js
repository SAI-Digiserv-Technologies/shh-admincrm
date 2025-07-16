import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyGetUserQuery } from "../Data/Api/api";
import EnquiryList from "../Components/Enquiry/EnquiryList";
import PageLoad from "../Components/Loading/PageLoad";
import EmptyComp from "../Components/Empty/EmptyComp";
import ExportPoppup from "../Components/Poppup/ExportPoppup";
import ImportPoppup from "../Components/Poppup/ImportPoppup";

const EnquiryScreen = () => {
  const navigate = useNavigate();
  const [leadlist, setLeadList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exportImp, setExportImp] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [leedview] = useLazyGetUserQuery();

  useEffect(() => {
    getLeadFun();
  }, []);

  const getLeadFun = () => {
    setLoading(true);
    leedview()
      .unwrap()
      .then((res) => {
        const filtered = res?.data.filter((lead) => lead.status === "Enquiry");
        setLeadList(filtered || []);
      })
      .catch((err) => console.log("Lead fetch error:", err))
      .finally(() => setLoading(false));
  };

 const formatLeadsForCSV = (leads) =>
    leads.map((lead) => ({
      Lead_ID: lead?.lead_id || "-",
      Name: lead?.name || "-",
      Email: lead?.email || "-",
      Phone: lead?.phonenumber || "-",
      Address: lead?.address || "-",
      Source: lead?.source || "-",
      College: lead?.college_name || "-",
      Degree: lead?.degree || "-",
      Course: lead?.interested_course?.addcourse || "-",
      Course_Amount: lead?.interested_course?.amount || "-",
      Duration: lead?.interested_course?.duration || "-",
      Paid_Amount: lead?.paid_amount ?? 0,
      Balance_Amount: lead?.balance_amount ?? 0,
      Fully_Paid: lead?.fullyPaid ? "Yes" : "No",
      Status: lead?.status || "-",
      Created_At: new Date(lead?.createdAt).toLocaleDateString("en-IN"),
      Assign_To:
        lead?.assignedto?.name ||
        lead?.assignedto?.phone ||
        lead?.assignedto?.email ||
        lead?.assignedto?._id,
    }));

      const today = new Date().toISOString().split("T")[0];


  const exportToCSV = (data, filename = "enquiries.csv") => {
    if (!data || data.length === 0) {
      alert("No data to export");
      return;
    }

    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(",")];

    data.forEach((row) => {
      const values = headers.map((key) =>
        `"${(row[key] ?? "").toString().replace(/"/g, '""')}"`
      );
      csvRows.push(values.join(","));
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  
  const filteredLeads = leadlist?.filter((lead) => {
    const leadString = [
      lead?.lead_id,
      lead?.name,
      lead?.email,
      lead?.phonenumber,
      lead?.address,
    ]
      .join(" ")
      .toLowerCase();
    return leadString.includes(searchTerm.toLowerCase());
  });

    const exportFun = (type) => {
    if (type === "yes") {
      setLoading(true);
      setExportImp(null);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else if (type === "import") {
    } else {
      setExportImp(null);
    }
  };

  return (
    <div className="lead-head pt-1">
      {loading && <PageLoad />}
      
           {exportImp == "export" && <ExportPoppup poppupHandle={exportFun} />}
           {exportImp == "import" && <ImportPoppup poppupHandle={exportFun} />}

      {!loading && (
        <div className="lead-h d-flex ac-jb">
          <div className="d-flex ac-je w-100 gap-3">
            {leadlist?.length > 0 && (
              <div className="search-container">
                <input
                  type="text"
                  className="form-control me-2 search-input"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}
            {leadlist?.length > 0 && (
              <button
                onClick={() =>
                  exportToCSV(formatLeadsForCSV(leadlist), "enquiries.csv")
                }
                className="refil-text mb-0 white d-flex ac-jc bg-primary3 f4 rounded-3 border-0"
              >
                Export
              </button>
            )}

            <div className="position-relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="refil-text mb-0 white d-flex ac-jc bg-primary3 f4 rounded-3 border-0"
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
          </div>
        </div>
      )}

      {!loading && (
        <div className="pt-4">
          {filteredLeads.length > 0 ? (
            <EnquiryList leadlist={filteredLeads} />
          ) : (
            <EmptyComp text="Enquiry Leads Not Found" />
          )}
        </div>
      )}
    </div>
  );
};

export default EnquiryScreen;
