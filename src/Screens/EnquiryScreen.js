import React from "react";

import EnquiryList from "../Components/Enquiry/EnquiryList";

const EnquiryScreen = () => {
 
  return (
    <div className="lead-head">
      <div className="lead-h d-flex ac-jb">
        <p className=" mb-0 f7 primary3 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani">
         Enquiry
        </p>
       
      </div>
      <EnquiryList />
    </div>
  );
};

export default EnquiryScreen;
