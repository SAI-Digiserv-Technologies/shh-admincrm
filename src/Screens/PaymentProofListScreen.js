import React, { useEffect, useState } from "react";
import { mini_time, pro_icon, proof_img1 } from "../assets/images";
import { useLocation, useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useLazyAll_proof_listQuery } from "../Data/Api/api";
import PageLoad from "../Components/Loading/PageLoad";
import EmptyComp from "../Components/Empty/EmptyComp";

const PaymentProofListScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("location", location);
  const type = location?.state?.type;
  const RouteData = location?.state?.data;

  const [paymentProofs, setPaymentProofs] = useState([]);
  // const [paymentProofs, setPaymentProofs] = useState([
  //   {
  //     id: 1,
  //     userName: "Arjun Kumar",
  //     paymentDate: "2025-04-04",
  //     paymentTime: "10.00AM",
  //     amount: 1500,
  //     paymentMethod: "GPay",
  //     transactionId: "TXN1234567890",
  //     screenshotUrl: "https://via.placeholder.com/150.png?text=GPay+Proof",
  //     status: "Pending",
  //     verifiedByAdmin: false,
  //   },
  //   {
  //     id: 2,
  //     userName: "Priya Sharma",
  //     paymentDate: "2025-04-03",
  //     paymentTime: "08.00AM",
  //     amount: 1000,
  //     paymentMethod: "PhonePe",
  //     transactionId: "TXN9876543210",
  //     screenshotUrl: "https://via.placeholder.com/150.png?text=PhonePe+Proof",
  //     status: "Verified",
  //     verifiedByAdmin: true,
  //   },
  // ]);
  const [loading, setLoadin] = useState(true);

  // Api
  const [allpaymentListApi] = useLazyAll_proof_listQuery();

  const dataGetFun = () => {
    setLoadin(true);
    allpaymentListApi()
      .unwrap()
      .then((res) => {
        // console.log("ProoRes", res);
        setPaymentProofs(res?.data || []);
      })
      .catch((err) => {
        // console.log("Err", err);
      })
      .finally(() => {
        setLoadin(false);
      });
  };

  const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // convert 0 to 12
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  };
  useEffect(() => {
    dataGetFun();
  }, []);

  return (
    <>
      {loading && <PageLoad />}
      {paymentProofs?.length == 0 && !loading ? (
        <EmptyComp text={"Payment Proof Not Found"} />
      ) : (
        <div className="container mt-4 mb-0 ms-0 me-0">
          {!loading && (
            <>
              {paymentProofs?.length > 0 && (
                <div className="payment-container rounded-3">
                  {
                    <div className="payment-list">
                      {paymentProofs?.map((item) => {
                        const dateObj = new Date(item?.createdAt);
                        const date = dateObj.toISOString().split("T")[0];
                        const time = formatAMPM(dateObj);
                        return (
                          <div
                            onClick={() => {
                              if (item.status == "Pending") {
                                navigate("/payment/add", {
                                  state: { type: "add", data: item },
                                });
                              }
                              // else {
                              //   navigate("/payment/detail", {
                              //     state: { type: "view", data: item },
                              //   });
                              // }
                            }}
                            key={item.id}
                            className={`payment-card d-flex ac-jb w-100  ${
                              !item.status == "Pending" ? "unread" : ""
                            }`}
                          >
                            <div className="d-flex ac-js">
                              <div className="proofimgs d-flex ac-jc me-3">
                                <img
                                  crossOrigin="anonymous"
                                  src={item?.image || proof_img1}
                                />
                              </div>
                              <div>
                                <div className="d-flex noti-header justify-content-between align-items-center mb-2">
                                  <div>
                                    <p className="mb-0 mt-0 fw-bold f5 fs-xxl-18 fs-xl-17 fs-lg-15 fs-sm-14 fs-xs-13 primary3 ">
                                      {item.userName}
                                    </p>
                                  </div>
                                </div>
                                <p className="mb-0 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 f5 black ">
                                  Payment Method:
                                  <span className="f3">
                                    {" "}
                                    {item.paymentmethood}
                                  </span>
                                </p>
                              </div>
                            </div>
                            {/* <p className="mb-1">Transaction ID: {item?.transactionId}</p> */}
                            <div className="h-100 d-flex flex-column ">
                              <span
                                className={`badge d-flex ac-jc f2 fs-xxl-15 fs-xl-15 fs-lg-13 fs-sm-13 fs-xs-12 ${
                                  item.status === "Pending"
                                    ? " pending-btn px-3 py-2"
                                    : "verified-btn px-3 py-2"
                                }`}
                              >
                                {item.status}
                              </span>
                              <p className="fs-xxl-13 mt-3 mb-0 fs-xl-13 fs-lg-13 fs-sm-12 fs-xs-11 f3 black d-flex ac-jc">
                                {date} |
                                <img
                                  className="mx-1"
                                  src={mini_time}
                                  style={{
                                    height: "13px",
                                    width: "13px",
                                  }}
                                />
                                {time}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  }
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default PaymentProofListScreen;
