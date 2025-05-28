import React, { useEffect, useRef, useState } from "react";
import ListPayment from "../Components/PaymentManage/ListPayment";
import { useLocation } from "react-router-dom";
import NewInvoice from "../Components/Invoice/NewInvoice";
import { useLazyPayment_historyQuery } from "../Data/Api/api";
import PageLoad from "../Components/Loading/PageLoad";
import EmptyComp from "../Components/Empty/EmptyComp";
import html2pdf from "html2pdf.js";

const PaymentList = () => {
  const location = useLocation();
  const invoiceRef = useRef();

  const [paymentDatas, setPaymentDatas] = useState({});
  const [loading, setLoading] = useState(true);
  const [historyData, setHistoryData] = useState([]);

  const routeData = location?.state?.data || {};
  const lead_id = routeData?.lead_id;
  const today = new Date().toLocaleDateString();

  // Inline styles converted from your CSS
  const styles = {
    invoiceWrapper: {
      fontFamily: "'Poppins', sans-serif",
      background: "#fff",
      padding: 20,
      width: "100%",
      boxSizing: "border-box",
    },
    layerFrom: {
      width: "100%",
    },
    footerSection: {
      marginTop: "20%",
      backgroundColor: "#fff",
      padding: "20px 0",
      boxSizing: "border-box",
    },
    line: {
      width: "100%",
      height: 2,
      backgroundColor: "#D0D3DD",
      margin: "10px 0",
    },
    footerText: {
      fontSize: 12,
      textAlign: "center",
      marginTop: 10,
      color: "#333",
    },
    termsHeader: {
      color: "#0ABFAD",
      fontSize: 13,
      fontWeight: "bold",
      marginBottom: 4,
    },
    termsText: {
      width: "50%",
      margin: 0,
      fontSize: 12,
      color: "#000",
    },
    managerName: {
      margin: 0,
      fontSize: 14,
      fontWeight: "bold",
    },
    managerTitle: {
      margin: 0,
      fontSize: 13,
    },
    generatedOn: {
      margin: 0,
      fontSize: 13,
    },
    flexBetween: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 8,
      alignItems: "center",
    },
  };

  // API call hook
  const [paymentHistoryApi] = useLazyPayment_historyQuery();

  // Fetch payment history
  const dataGetFun = () => {
    setLoading(true);
    paymentHistoryApi(lead_id)
      .unwrap()
      .then((res) => {
        setHistoryData(res?.payment_history || []);
      })
      // .catch((err) => console.error("Error fetching payment history:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    dataGetFun();
  }, []);

  // Handle printing/downloading PDF
  const handlePrint = () => {
    if (!invoiceRef.current) {
      // console.error("Invoice ref not found");
      return;
    }

    const content = invoiceRef.current.innerHTML;
    if (!content.trim()) {
      // console.error("Invoice content is empty.");
      return;
    }

    const opt = {
      margin: 0,
      filename: `Invoice_${routeData?.invoice_no || "NA"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] },
    };

    html2pdf().set(opt).from(invoiceRef.current).save();
  };

  return (
    <div className="lead-head">
      {loading && <PageLoad />}
      {!loading && (
        <div className="lead-h d-flex ac-jb" style={{ marginBottom: 20 }}>
          <button
            onClick={handlePrint}
            className="bg-primary3 white f5 py-1 px-3 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani boredr-0 rounded-2"
          >
            Download Invoice
          </button>
        </div>
      )}

      {!loading && historyData.length === 0 ? (
        <EmptyComp text={"Payments Not Found"} />
      ) : (
        <ListPayment historyData={historyData} />
      )}

      {/* Hidden invoice section */}
      <div style={{ display: "none" }}>
        <div ref={invoiceRef} style={styles.invoiceWrapper}>
          {/* Your invoice content here */}
          <NewInvoice paymentData={routeData} />
          {/* Footer Section */}
          <div style={styles.footerSection}>
            <p style={styles.termsHeader}>Terms & Conditions:</p>
            <div style={styles.flexBetween}>
              <p style={styles.termsText}>
                A finance charge of 1.5% will be made on unpaid balances after
                30 days.
              </p>
              <div style={{ textAlign: "left" }}>
                <p style={styles.managerName}>{routeData?.Manager_Name}</p>
                <p style={styles.managerTitle}>Manager</p>
              </div>
            </div>
            <p style={styles.generatedOn}>
              Generated on: <strong>{today}</strong>
            </p>
            <div style={styles.line}></div>
            <div style={styles.footerText}>
              Invoice was created on a computer and is valid without the
              signature and seal.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentList;
