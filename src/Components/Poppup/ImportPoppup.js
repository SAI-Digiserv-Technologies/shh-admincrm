import React, { useState } from "react";
import { useBulkleaduplloadMutation } from "../../Data/Api/api";
import PageLoad from "../Loading/PageLoad";
import { toast } from "react-toastify";

const ImportPoppup = ({ poppupHandle, onImportSuccess }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState([]);
  const [importStats, setImportStats] = useState(null);

  const [bulkUplloadApi] = useBulkleaduplloadMutation();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setApiError([]);
      setImportStats(null);
    } else {
      toast.error("Please select a valid CSV file.");
      e.target.value = "";
      setFile(null);
      setFileName("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please upload a CSV file before submitting.");
      return;
    }

    setLoading(true);
    setApiError([]);
    setImportStats(null);
    
    const formdata = new FormData();
    formdata.append("file", file);

    try {
      const response = await bulkUplloadApi(formdata).unwrap();
      console.log("Upload response:", response);
      
      if (response.data?.errors?.length > 0) {
        setApiError(response.data.errors);
        setImportStats({
          successful: response.data.successful || 0,
          failed: response.data.failed || 0,
          total: (response.data.successful || 0) + (response.data.failed || 0)
        });
        
        toast.warning(`${response.data.successful} leads imported, ${response.data.failed} failed`);
      } else {
        setImportStats({
          successful: response.data?.successful || response.successful || 0,
          failed: response.data?.failed || response.failed || 0,
          total: (response.data?.successful || response.successful || 0) + 
                 (response.data?.failed || response.failed || 0)
        });
        
        toast.success("Leads imported successfully");
        
        if (onImportSuccess && typeof onImportSuccess === 'function') {
          onImportSuccess();
        }
      }
    } catch (err) {
      console.error("Upload error:", err);
      setApiError(err?.data?.errors || [{ error: err?.data?.message || "Failed to import leads" }]);
      toast.error(err?.data?.message || "Failed to import leads");
    } finally {
      setLoading(false);
    }
  };

  const closeAndRefresh = () => {
    if (importStats?.successful > 0) {
      if (onImportSuccess && typeof onImportSuccess === 'function') {
        onImportSuccess();
      }
    }
    poppupHandle(null);
  };

  return (
    <div className="logpoppup d-flex ac-jc">
      {loading && <PageLoad />}
      <button
        className="poppup-layer border-0"
        onClick={() => poppupHandle(null)}
      />
      
      <div className="logout-cont w-md-40 w-80 rounded-3 p-md-3 p-4 d-flex gap-4 ac-jc flex-column">
        {!importStats && apiError.length === 0 && (
          <>
            <h4 className="text-center mb-0">Import Leads</h4>
            <div className="d-flex ac-jc flex-column gap-md-4 gap-2 w-100">
              <div className="custom-file-upload">
                <label 
                  htmlFor="csvFile" 
                  className="d-flex flex-column align-items-center justify-content-center p-3 border rounded-3 cursor-pointer"
                >
                  <span className="mb-2">
                    {fileName ? fileName : "Choose CSV file"}
                  </span>
                  <small className="text-muted">Click or drag file here</small>
                </label>
                <input
                  type="file"
                  id="csvFile"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="upload-input d-none"
                />
              </div>
            </div>
            <a
              download
              href="/Sample.csv"
              className="peimary2 cp f3 text-center fs-xxl-15 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 textani"
            >
              Download sample CSV file to import leads.
            </a>

            <button
              onClick={handleSubmit}
              disabled={!file}
              className={`inner-btn py-2 py-md-2 yes w-md-30 wi-100 border-0 ${!file ? 'bg-secondary' : 'bg-primarys'} white rounded-3 textani f2 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13`}
            >
              Submit
            </button>
          </>
        )}

        {importStats && (
          <>
            <h4 className="text-center mb-0">Import Results</h4>
            <div className="import-stats d-flex flex-column gap-2 w-100">
              <div className="d-flex justify-content-between border-bottom pb-2">
                <span className="f3">Total Leads:</span>
                <span className="f2">{importStats.total}</span>
              </div>
              <div className="d-flex justify-content-between border-bottom pb-2">
                <span className="f3">Successfully Imported:</span>
                <span className="f2 text-success">{importStats.successful}</span>
              </div>
              <div className="d-flex justify-content-between border-bottom pb-2">
                <span className="f3">Failed to Import:</span>
                <span className="f2 text-danger">{importStats.failed}</span>
              </div>
            </div>
            
            {apiError.length > 0 && (
              <div className="error-list mt-3">
                <h5 className="text-danger mb-2">Error Details:</h5>
                <div className="error-items overflow-auto" style={{ maxHeight: "200px" }}>
                  {apiError.map((err, index) => (
                    <div key={index} className="error-item border-bottom pb-2 mb-2">
                      {err?.email && (
                        <p className="red cp f3 mb-1 fs-xxl-15 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13">
                          Email: {err.email}
                        </p>
                      )}
                      <p className="red cp f2 fs-xxl-15 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 mb-0">
                        {err?.error}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="d-flex gap-3 justify-content-center">
              <button
                className="inner-btn py-2 py-md-2 yes border-0 bg-primarys white rounded-3 textani f2 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
                onClick={closeAndRefresh}
              >
                Close
              </button>
              {importStats.failed > 0 && (
                <button
                  className="inner-btn py-2 py-md-2 yes border-0 bg-secondary white rounded-3 textani f2 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
                  onClick={() => {
                    setImportStats(null);
                    setApiError([]);
                    setFile(null);
                    setFileName("");
                  }}
                >
                  Try Again
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ImportPoppup;