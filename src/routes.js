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
import ReportScreen from "./Screens/ReportScreen";
import LeadmanagementScreen from "./Screens/LeadmanageScreeen";
import EnquiryScreen from "./Screens/EnquiryScreen";
import AdminProfileScreen from "./Screens/AdminProfileScreen";
import SrcScreen from "./Screens/SrcScreen";
import StaffDetails from "./Screens/StaffDetails";
import useUser from "./Data/Local/userDetail";
import PaymentScreen from "./Screens/PaymentScreen";
import TransactionScreen from "./Screens/TransactionScreen";
import PageNotFoundScreen from "./Screens/PageNotFoundScreen";
import StafDetaileScreen from "./Screens/StafDetaileScreen";
import StafReportScreen from "./Screens/StafReportScreen";
import LeadAddScreen from "./Screens/LeadAddScreen";
import AllReportScreen from "./Screens/AllReportScreen";
import SetupScreen from "./Screens/SetupScreen";
import PaymentProofListScreen from "./Screens/PaymentProofListScreen";
import PaymentAddScreen from "./Screens/PaymentAddScreen";
import NotificationScreen from "./Screens/NotificationScreen";
import ProfileScreen from "./Screens/ProfileScreen";

const ReactRoute = () => {
  const { user, setUser } = useUser();
  console.log("ndsmmds", user);

  return (
    <Routes>
      <Route path="*" element={<PageNotFoundScreen />} />

      {user?.admin?.token == null ? (
        <>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/resetpassword" element={<ResetPasswordScreen />} />
          <Route
            path="/otp-resetpassword"
            element={<ResetPasswordotpScreen />}
          />
        </>
      ) : (
        <>
          <Route path="/resetpassword" element={<ResetPasswordScreen />} />
          <Route
            path="/otp-resetpassword"
            element={<ResetPasswordotpScreen />}
          />
          <Route element={<Layout />}>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/leadslist" element={<LeadsListScreen />} />
            <Route path="/leadcourse" element={<LeadCourseScreen />} />
            <Route
              path="/leadmanagedetail"
              element={<LeadManageDetailScreen />}
            />
            <Route path="/payment-updates" element={<PaymentUpdates />} />
            <Route
              path="/payment-updates/payment-list"
              element={<PaymentList />}
            />
            <Route
              path="/payment-updates/payment-list/payment-detalis"
              element={<PaymentDetails />}
            />
            <Route path="/followup" element={<FollowupScreen />} />
            <Route path="/closefollowup" element={<CloseFollowupScreen />} />
            <Route
              path="/close_followup/details"
              element={<CloseFollowupDetailScreen />}
            />
            <Route
              path="/followup/details"
              element={<FollowupDetailScreen />}
            />
            <Route path="/staff" element={<Staff />} />
            <Route path="/staffform/detail" element={<StafDetaileScreen />} />
            <Route path="/staffform/add" element={<StaffForm />} />
            <Route path="/staffrole" element={<StaffRoleScreen />} />
            <Route path="/telecaller" element={<Telecallerprofile />} />
            <Route
              path="/telecallerprofile"
              element={<Telecallerprofilepage />}
            />
            <Route path="/leadmanage" element={<LeadmanagementScreen />} />
            {/* <Route path="/report" element={<ReportScreen />} /> */}
            <Route path="/report" element={<AllReportScreen />} />
            <Route path="/staf-report" element={<StafReportScreen />} />
            {/* <Route path="/paymentproof" element={<Paymentproofscreen />} /> */}
            <Route path="/paymentproof" element={<PaymentProofListScreen />} />
            <Route path="/enquiries" element={<EnquiryScreen />} />
            <Route path="/enquiries/add" element={<LeadAddScreen />} />
            <Route path="/enquiries/details" element={<LeadAddScreen />} />
            {/* <Route path="/adminprofile" element={<AdminProfileScreen />} /> */}
            <Route path="/adminprofile" element={<ProfileScreen />} />
            <Route path="/source" element={<SrcScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/transaction" element={<TransactionScreen />} />
            <Route path="/setup" element={<SetupScreen />} />
            <Route path="/payment/add" element={<PaymentAddScreen />} />
            <Route path="/payment/detail" element={<PaymentAddScreen />} />
            <Route path="/notification" element={<NotificationScreen />} />
          </Route>
        </>
      )}
    </Routes>
  );
};

export default ReactRoute;
