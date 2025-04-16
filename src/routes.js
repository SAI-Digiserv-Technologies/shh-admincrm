import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginScreen from "./Screens/LoginScreen";
import "./assets/scss/styles.scss";
import "./assets/scss/Font.scss";
import "./assets/scss/responcive.scss";
import "./assets/scss/keyframes.scss";
import "./assets/scss/custome.scss";
import "./assets/scss/fontSize.scss";
import "./assets/scss/width.scss";
import "./assets/scss/fonrmsstyle.scss";
import "./assets/scss/height.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./Components/Layout/Layout";
import ResetPasswordScreen from "./Screens/ResetPasswordScreen";
import ResetPasswordotpScreen from "./Screens/ResetPasswordotpScreen";
import LeadsListScreen from "./Screens/LeadsListScreen";
import LeadManageDetailScreen from "./Screens/LeadManageDetailScreen";
import PaymentUpdates from "./Screens/PaymentUpdates";
import PaymentDetails from "./Screens/PaymentDetails";
import PaymentList from "./Screens/PaymentList";
import FollowupScreen from "./Screens/FollowupScreen";
import CloseFollowupScreen from "./Screens/CloseFollowupScreen";
import CloseFollowupDetailScreen from "./Screens/CloseFollowupDetailScreen";
import FollowupDetailScreen from "./Screens/FollowupDetailScreen";
import Staff from "./Screens/Staff";
import StaffForm from "./Screens/StaffForm";
import AdminDashboard from "./Screens/AdminDashboard";
import StaffRoleScreen from "./Screens/StaffRoleScreen";
import Telecallerprofile from "./Screens/Telecallerprofile";
import Telecallerprofilepage from "./Screens/Telecallerprofilepage";
import Paymentproofscreen from "./Screens/Paymentproofscreen";
import LeadCourseScreen from "./Screens/LeadCourseScreen";
<<<<<<< HEAD
=======
import ReportScreen from "./Screens/ReportScreen";
import LeadmanagementScreen from "./Screens/LeadmanageScreeen";
>>>>>>> c003d225bc2a60bcee8fcf6437295773f14e8d44
// import SourceScreen from "./Screens/Sourcescreen";

const ReactRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/resetpassword" element={<ResetPasswordScreen />} />
      <Route path="/otp-resetpassword" element={<ResetPasswordotpScreen />} />
      <Route element={<Layout />}>
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/leadslist" element={<LeadsListScreen />} />
        <Route path="/leadcourse" element={<LeadCourseScreen />} />
        <Route path="/leadmanagedetail" element={<LeadManageDetailScreen />} />
        <Route path="/payment-updates" element={<PaymentUpdates />} />
        <Route path="/payment-updates/payment-list" element={<PaymentList />} />
        <Route path="/payment-updates/payment-list/payment-detalis" element={<PaymentDetails />} />
        <Route path="/followup" element={<FollowupScreen />} />
        <Route path="/closefollowup" element={<CloseFollowupScreen />} />
        <Route path="/close_followup/details" element={<CloseFollowupDetailScreen />} />
        <Route path="/followup/details" element={<FollowupDetailScreen />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/staffform" element={<StaffForm />} />
        <Route path="/staffrole" element={<StaffRoleScreen />} />
        {/* <Route path="/source" element={<SourceScreen />} /> */}
        <Route path="/telecaller" element={<Telecallerprofile />} />
        <Route path="/telecallerprofile" element={<Telecallerprofilepage />} />
        
        <Route path="/leadmanage" element={<LeadmanagementScreen />} />
        <Route path="/report" element={<ReportScreen />} />
        
        <Route path="/paymentproof" element={<Paymentproofscreen />} />


      </Route>
    </Routes>
  );
};

export default ReactRoute;
