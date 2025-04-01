import React from "react";
import { refileicon } from "../assets/images";
import { useNavigate } from "react-router-dom";

import PaymentUpdatesList from "../Components/PaymentManage/PaymentUpdatesList";
import PaymentList from "./PaymentList";

const PaymentUpdates = () => {
  const navigate = useNavigate();
  return (
    <div className="lead-head">
      <div className="lead-h d-flex ac-jb">
        <p className=" mb-0 f7 primary3 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani">
        Payment Updates
        </p>
        <div className="d-flex ac-jb gap-3">

          <button className="refil-box d-flex ac-jc bg-primary3 rounded-3 border-0">
            <img src={refileicon} />
          </button>
        </div>
      </div>
      <PaymentUpdatesList />
     

      
    </div>
  );
};

export default PaymentUpdates;
