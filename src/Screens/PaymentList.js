import React from 'react'
import ListPayment from '../Components/PaymentManage/ListPayment'

const PaymentList = () => {
  return (
    <div className="lead-head">
    <div className="lead-h d-flex ac-jb">
      <p className=" mb-0 f7 primary3 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani">
      Payment List
      </p>
     
    </div>
    <ListPayment />
   </div>
  )
}

export default PaymentList