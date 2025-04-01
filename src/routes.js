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
import TelecallersDashboardScreen from "./Screens/TelecallersDashboardScreen";
import Layout from "./Components/Layout/Layout";
import ResetPasswordScreen from "./Screens/ResetPasswordScreen";
import ResetPasswordotpScreen from "./Screens/ResetPasswordotpScreen";
import LeadsListScreen from "./Screens/LeadsListScreen";
import LeadManageDetailScreen from "./Screens/LeadManageDetailScreen";
import PaymentUpdates from "./Screens/PaymentUpdates";
import PaymentDetails from "./Screens/PaymentDetails";
import PaymentList from "./Screens/PaymentList";

const ReactRoute = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<RegisterScreen />} /> */}
      <Route path="/" element={<LoginScreen />} />
      <Route path="/resetpassword" element={<ResetPasswordScreen />} />
      <Route path="/otp-resetpassword" element={<ResetPasswordotpScreen />} />
      <Route element={<Layout />}>
        <Route
          path="/telecallers/dashboard"
          element={<TelecallersDashboardScreen />}
        />
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
      </Route>
    </Routes>
  );
};

export default ReactRoute;
