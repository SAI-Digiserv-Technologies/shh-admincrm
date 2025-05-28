import React, { useEffect, useRef, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { topmain, topnoti, topsetting } from "../../assets/images";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useDispatch, useSelector } from "react-redux";
import { saveHeaderTitleSlice } from "../../Data/Redux/slice/headerTitleSlice";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import { useLazyNotification_listQuery } from "../../Data/Api/api";

const TopHeader = ({ toggleFun }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location?.pathname;
  const headerTitleSlice = useSelector((state) => state?.saveHeaderTitleSlice);
  const notifications = useSelector((state) => state?.saveNotificationSlice);
  // console.log("headerTitleSlice", headerTitleSlice, path, notifications);
  const logoutRef = useRef(null);

  // Api
  const [notificationliatApi] = useLazyNotification_listQuery();

  useEffect(() => {
    if (path == "/admindashboard" || path == "/") {
      dispatch(saveHeaderTitleSlice("Dashboard"));
    } else if (path == "/staff") {
      dispatch(saveHeaderTitleSlice("Stafs"));
    } else if (path == "/enquiries") {
      dispatch(saveHeaderTitleSlice("Enquiry"));
    } else if (path == "/leadmanage") {
      dispatch(saveHeaderTitleSlice("Lead Management"));
    } else if (path == "/payment-updates") {
      dispatch(saveHeaderTitleSlice("Payment Updates"));
    } else if (path == "/paymentproof") {
      dispatch(saveHeaderTitleSlice("Payment Proof"));
    } else if (path == "/staffform/detail") {
      dispatch(saveHeaderTitleSlice("Staf Detail"));
    } else if (path == "/staffform/add") {
      dispatch(saveHeaderTitleSlice("Staf Add"));
    } else if (path == "/staf-report") {
      dispatch(saveHeaderTitleSlice("Staf Report"));
    } else if (path == "/setup") {
      dispatch(saveHeaderTitleSlice("Setup"));
    } else if (path == "/report") {
      dispatch(saveHeaderTitleSlice("Over All Reports"));
    } else if (path == "/notification") {
      dispatch(saveHeaderTitleSlice("Notification"));
    } else if (path == "/adminprofile") {
      dispatch(saveHeaderTitleSlice("Profile"));
    } else if (path == "/enquiries/details") {
      dispatch(saveHeaderTitleSlice("Enquiries Details"));
    } else if (path == "/enquiries/add") {
      dispatch(saveHeaderTitleSlice("Enquiries Add"));
    } else if (path == "/leadmanage/details") {
      dispatch(saveHeaderTitleSlice("Lead Details"));
    } else if (path == "/payment-updates/payment-list") {
      dispatch(saveHeaderTitleSlice("Payments"));
    } else if (path == "/payment-updates/payment-list/payment-detalis") {
      dispatch(saveHeaderTitleSlice("Payment Details"));
    } else if (path == "/payment/add") {
      dispatch(saveHeaderTitleSlice("New Payment"));
    } else {
      dispatch(saveHeaderTitleSlice("Not A heading"));
    }
  }, [headerTitleSlice, location, window]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (logoutRef.current && !logoutRef.current.contains(event.target)) {
        setLogoutToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [logoutToggle, setLogoutToggle] = useState(false);
  return (
    <div className="top-header px-md-5 px-3 py-md-3 py-3 d-flex ae-jb gap-md-0 gap-3 flex-column flex-md-row">
      <div className="w-md-40 wi-100 d-flex ac-js gap-md-4 gap-3">
        <button
          onClick={() => {
            toggleFun();
          }}
          className="ressidenav border-0 bg-primary3 rounded-2"
        >
          <MenuOpenOutlinedIcon className="white" />
        </button>
        <div className="d-flex ac-jc">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="border-0 bg-transparent mb-0 f7 primary3 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani"
          >
            <ArrowBackIosNewOutlinedIcon />
          </button>
          <p className="mb-0 f7 primary3 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani">
            {headerTitleSlice}
          </p>
        </div>
        {/* <div className="serach-cont d-flex ac-jb w-100 py-md-2 py-1 px-md-3 px-2 rounded-5">
          <input
            placeholder="Seaarch.."
            className="search-input serachgray border-0 w-100 f3 fs-xxl-18 fs-xl-17 fs-lg-17 fs-sm-16 fs-xs-15 black"
          />
          <SearchOutlinedIcon className="serachgray fs-3" />
        </div> */}
      </div>
      <div className="icon-cont d-flex ac-jc gap-md-3 gap-2">
        <button className="icon-bg d-flex ac-jc border-0 bg-primary3 rounded-5">
          {notifications?.length > 0 && (
            <div className="inner-text rounded-5 d-flex ac-jc">
              <p className="white mb-0 f7 fs-xxl-10 fs-xl-10 fs-lg-9 fs-sm-8 fs-xs-8 textani">
                {notifications?.length}
              </p>
            </div>
          )}
          <img
            src={topnoti}
            onClick={() => {
              navigate("/notification");
            }}
          />
        </button>
        <button
          onClick={() => {
            navigate("/setup");
          }}
          className="icon-bg d-flex ac-jc border-0 bg-yellow rounded-5 positopn-relative"
        >
          <img src={topsetting} />
        </button>

        <button
          onClick={() => {
            navigate("/report");
          }}
          className="icon-bg d-flex ac-jc border-0 bg-green rounded-5"
        >
          <TrendingUpOutlinedIcon className="white fs-2" />
        </button>
      </div>
    </div>
  );
};

export default TopHeader;
