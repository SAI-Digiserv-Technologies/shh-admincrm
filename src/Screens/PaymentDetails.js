import React, { useEffect, useState } from "react";
import PaymentReceipt from "../Components/PaymentManage/PaymentReceipt";
import { useLazyPayment_detaileQuery } from "../Data/Api/api";
import PageLoad from "../Components/Loading/PageLoad";
import { useLocation } from "react-router-dom";

const PaymentDetails = () => {
  const location = useLocation();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);

  // console.log("location", location);
  const routeData = location?.state?.data;

  const [paymentdetail] = useLazyPayment_detaileQuery();

  const getPayDataFun = () => {
    setLoading(true);
    const id = routeData?._id;
    paymentdetail(id)
      .unwrap()
      .then((res) => {
        // console.log("Leadsres", res);
        setPaymentData(res?.data);
      })
      .catch((err) => {
        // console.log("Err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getPayDataFun();
  }, []);
  return (
    <div className="lead-head">
      {loading ? <PageLoad /> : <PaymentReceipt paymentData={paymentData} />}
    </div>
  );
};

export default PaymentDetails;
