import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginScreen from "./Screens/LoginScreen";
import "./assets/scss/styles.scss";
import "./assets/scss/Font.scss";
import "./assets/scss/styles.scss";
import "./assets/scss/responcive.scss";
import "./assets/scss/keyframes.scss";
import "./assets/scss/custome.scss";
import "./assets/scss/fontSize.scss";
import "./assets/scss/width.scss";
import "./assets/scss/fonrmsstyle.scss";
import "./assets/scss/height.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterScreen from "./Screens/RegisterScreen";
import Layout from "./Components/Layout/Layout";
import ResetPasswordScreen from "./Screens/ResetPasswordScreen";
import ResetPasswordotpScreen from "./Screens/ResetPasswordotpScreen";
import LeadsListScreen from "./Screens/LeadsListScreen";
import LeadManageDetailScreen from "./Screens/LeadManageDetailScreen";
import PaymentUpdates from "./Screens/PaymentUpdates";
import PaymentDetails from "./Screens/PaymentDetails";
import PaymentList from "./Screens/PaymentList";
import Sourcescreen from "./Screens/Sourcescreen";
import FollowupScreen from "./Screens/FollowupScreen";
import CloseFollowupScreen from "./Screens/CloseFollowupScreen";
import CloseFollowupDetailScreen from "./Screens/CloseFollowupDetailScreen";
import FollowupDetailScreen from "./Screens/FollowupDetailScreen";
import Staff from "./Screens/Staff";
import StaffForm from "./Screens/StaffForm";
import AdminDashboard from "./Screens/AdminDashboard";
import SourceScreen from "./Screens/SourceScreen";
import StaffRoleScreen from "./Screens/StaffRoleScreen";

const ReactRoute = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<RegisterScreen />} /> */}
      <Route path="/" element={<LoginScreen />} />
      <Route path="/resetpassword" element={<ResetPasswordScreen />} />
      <Route path="/otp-resetpassword" element={<ResetPasswordotpScreen />} />
      <Route element={<Layout />}>
      <Route path="/admindashboard" element={<AdminDashboard />} />
        {/* <Route
          path="/telecallers/dashboard"
          element={<TelecallersDashboardScreen />}
        /> */}
        <Route path="/telecallers/leeds" element={<LeadsListScreen />} />
        <Route
          path="/telecallers/leeds/add"
          element={<LeadManageDetailScreen />}
        />
        <Route
          path="/telecallers/payment-updates"
          element={<PaymentUpdates />}
        />
        <Route
          path="/telecallers/payment-updates/payment-list"
          element={<PaymentList />}
        />
        <Route
          path="/telecallers/payment-updates/payment-list/payment-detalis"
          element={<PaymentDetails />}
        />
         <Route path="/telecallers/followup" element={<FollowupScreen />} />
        <Route
          path="/telecallers/close_followup"
          element={<CloseFollowupScreen />}
        />
        <Route
          path="/telecallers/close_followup/details"
          element={<CloseFollowupDetailScreen />}
        />
        <Route
          path="/telecallers/followup/details"
          element={<FollowupDetailScreen />}
        />
        <Route path="/source" element={<Sourcescreen />} />
        <Route
          path="/staff"
          element={<Staff />}
        />
         <Route
          path="/staffform"
          element={<StaffForm />}
        />
         <Route
          path="/source"
          element={<SourceScreen />}
        />
        <Route
          path="/staffrole"
          element={<StaffRoleScreen />}
        />
      </Route>
    </Routes>
  );
};

export default ReactRoute;
