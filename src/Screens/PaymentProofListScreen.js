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
  const type = location?.state?.type;
  const RouteData = location?.state?.data;

  const [paymentProofs, setPaymentProofs] = useState([]);
  const [loading, setLoadin] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [allpaymentListApi] = useLazyAll_proof_listQuery();

  const dataGetFun = () => {
    setLoadin(true);
    allpaymentListApi()
      .unwrap()
      .then((res) => {
        setPaymentProofs(res?.data || []);
      })
      .catch((err) => {
        console.error("Error fetching payment proofs", err);
      })
      .finally(() => {
        setLoadin(false);
      });
  };

  const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  };

  useEffect(() => {
    dataGetFun();
  }, []);

  const filteredProofs = paymentProofs.filter((item) => {
    const proofString = [
      item?.userName,
      item?.paymentmethood,
      item?.status,
      item?.transactionId,
    ]
      .join(" ")
      .toLowerCase();
    return proofString.includes(searchTerm);
  });

  return (
    <>
      {loading && <PageLoad />}
      {paymentProofs?.length === 0 && !loading ? (
        <EmptyComp text={"Payment Proof Not Found"} />
      ) : (
        <div className="container mt-4 mb-0 ms-0 me-0">
          {!loading && (
            <>
              {paymentProofs?.length > 0 && (
                <>
                  <div className="mb-3 d-flex justify-content-end">
                    <div style={{ maxWidth: "300px", width: "100%" }}>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search payment proofs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                      />
                    </div>
                  </div>


                  <div className="payment-container rounded-3">
                    <div className="payment-list">
                      {filteredProofs?.map((item) => {
                        const dateObj = new Date(item?.createdAt);
                        const date = dateObj.toISOString().split("T")[0];
                        const time = formatAMPM(dateObj);

                        return (
                          <div
                            onClick={() => {
                              if (item.status === "Pending") {
                                navigate("/payment/add", {
                                  state: { type: "add", data: item },
                                });
                              }
                            }}
                            key={item._id}
                            className={`payment-card d-flex ac-jb w-100 ${item.status !== "Pending" ? "unread" : ""
                              }`}
                          >
                            <div className="d-flex ac-js">
                              <div className="proofimgs d-flex ac-jc me-3">
                                <img
                                  crossOrigin="anonymous"
                                  src={item?.image || proof_img1}
                                  alt="Payment Proof"
                                />
                              </div>
                              <div>
                                <div className="d-flex noti-header justify-content-between align-items-center mb-2">
                                  <p className="mb-0 mt-0 fw-bold f5 fs-xxl-18 fs-xl-17 fs-lg-15 fs-sm-14 fs-xs-13 primary3">
                                    {item.userName}
                                  </p>
                                </div>
                                <p className="mb-0 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 f5 black">
                                  Payment Method:{" "}
                                  <span className="f3">{item.paymentmethood}</span>
                                </p>
                                <p className="mb-0 f5 text-secondary">
                                  Transaction ID: {item.transactionId}
                                </p>
                              </div>
                            </div>

                            <div className="h-100 d-flex flex-column align-items-end justify-content-between text-end">
                              <p className="mb-1 fs-6 text-muted">
                                {date} | {time}
                              </p>
                              <p
                                className={`badge ${item.status === "Verified"
                                    ? "bg-success"
                                    : item.status === "Rejected"
                                      ? "bg-danger"
                                      : "bg-warning text-dark"
                                  }`}
                              >
                                {item.status}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default PaymentProofListScreen;
