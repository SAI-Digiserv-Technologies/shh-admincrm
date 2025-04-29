import React, { useEffect, useRef, useState } from "react";
import ListPayment from "../Components/PaymentManage/ListPayment";
import { useLocation } from "react-router-dom";
import NewInvoice from "../Components/Invoice/NewInvoice";
import { useLazyPayment_historyQuery } from "../Data/Api/api";
import PageLoad from "../Components/Loading/PageLoad";
import EmptyComp from "../Components/Empty/EmptyComp";
import { dataLoader } from "@amcharts/amcharts4/core";

const PaymentList = () => {
  const location = useLocation();
  const invoiceRef = useRef();

  const [paymentDatas, setPaymentDatas] = useState({});
  const [loading, setLoadin] = useState(true);
  const [historyData, setHistoryData] = useState([]);

  const routeData = location?.state?.data;
  console.log("routeData", routeData);
  const lead_id = routeData?.lead_id;
  const today = new Date().toISOString().split("T")[0];

  // Api
  const [paymentHistoryApi] = useLazyPayment_historyQuery();

  const handlePrint = (data) => {
    setPaymentDatas(data);
    console.log("dataddataata", data);

    setTimeout(() => {
      const content = invoiceRef?.current?.innerHTML;
      if (!content || !content?.trim()) {
        console.error("Invoice content is empty.");
        return;
      }

      const printWindow = window?.open("", "_blank");
      printWindow.document.write(`
        <html>
          <head>
            <title>Payment Invoice</title>
            <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="${window.location.origin}/css/invoice.css" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" />
            <style>
              @page {
                margin: 0;
                size: auto;
              }
              @media print {
                * {
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                }
                  @page {
                margin: 0;
                size: auto;
              }
                body {
                  background: #fff;
                  width: 100%;
                  align-items: center;
                  justify-content: flex-start;
                  display: flex;
                  flex-direction: column;
              }
                .layer-from {
                  width: 100%;
                }
                .footer-section {
                  position: fixed;
                  bottom: 0;
                  left: 0;
                  width: 100%;
                  background-color: #fff;
                  padding: 20px 40px;
                }
                .line {
                  width: 100%;
                  height: 2px;
                  background-color: #D0D3DD;
                  margin: 10px 0;
                }
                .footer-text {
                  font-size: 12px;
                  text-align: center;
                  margin-top: 10px;
                  color: #333;
                }
              }
            </style>
          </head>
          <body>
            <div class="layer-from">
              ${content}
            </div>
  
            <div class="footer-section">
              <p style="color: #0ABFAD; font-size: 13px; font-weight: bold; margin-bottom: 4px;">
                Terms & Conditions:
              </p>
              <div class="d-flex justify-content-between mb-2">
                <p style="width: 50%; margin: 0; font-size: 12px; color: #000;">
                  A finance charge of 1.5% will be made on unpaid balances after 30 days.
                </p>
                <div style="text-align: left;">
                  <p style="margin: 0; font-size: 14px; font-weight: bold;">${routeData?.Manager_Name}</p>
                  <p style="margin: 0; font-size: 13px;">Manager</p>
                </div>
              </div>
              <p style="margin: 0; font-size: 13px;">Generated on: <strong> ${today} </strong></p>
              <div class="line"></div>
              <div class="footer-text">
                Invoice was created on a computer and is valid without the signature and seal.
              </div>
            </div>
      
           <script>
        window.onload = function () {
          window.print();

          // Close the window after short delay (even if cancelled)
          setTimeout(() => {
            window.close();
          }, 500);
        };
      </script>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }, 500);
  };

  const dataGetFun = () => {
    setLoadin(true);
    const id = lead_id;
    paymentHistoryApi(id)
      .unwrap()
      .then((res) => {
        console.log("Histres", res);
        setHistoryData(res?.payment_history);
      })
      .catch((err) => {
        console.log("Err", err);
      })
      .finally(() => {
        setLoadin(false);
      });
  };

  useEffect(() => {
    dataGetFun();
  }, []);

  return (
    <div className="lead-head">
      {loading && <PageLoad />}
      {!loading && (
        <div className="lead-h d-flex ac-jb">
          {/* <p className=" mb-0 f7 primary3 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani">
          Payment List
        </p> */}
          <button
            onClick={() => {
              handlePrint(historyData);
            }}
            className="bg-primary3 white f5 py-1 px-3 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani boredr-0 rounded-2"
          >
            Download Invoice
          </button>
        </div>
      )}
      {!loading && historyData?.length == 0 ? (
        <EmptyComp text={"Payments Not Found"} />
      ) : (
        <ListPayment historyData={historyData} />
      )}
      <div style={{ display: "none" }}>
        <NewInvoice invoiceRef={invoiceRef} paymentData={routeData} />
      </div>
    </div>
  );
};

export default PaymentList;
