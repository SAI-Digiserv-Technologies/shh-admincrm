import React from "react";
import ListPayment from "../Components/PaymentManage/ListPayment";
import { paymentList } from "../Data/DummyJson";

const PaymentList = () => {
  return (
    <div className="lead-head">
      {/* <div className="lead-h d-flex ac-jb">
        <p className=" mb-0 f7 primary3 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani">
          Payment List
        </p>
      </div> */}
      <ListPayment historyData={paymentList} />
    </div>
  );
};

export default PaymentList;
