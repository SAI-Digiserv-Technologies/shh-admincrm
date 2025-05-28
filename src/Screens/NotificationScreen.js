import React, { useEffect, useState } from "react";
import {
  useLazyNotification_listQuery,
  useMessageReadMutation,
} from "../Data/Api/api";
import EmptyComp from "../Components/Empty/EmptyComp";
import PageLoad from "../Components/Loading/PageLoad";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { saveNotificationSlice } from "../Data/Redux/slice/notificationSlice";

const NotificationScreen = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // Api
  const [notificationliatApi] = useLazyNotification_listQuery();
  const [notificationread] = useMessageReadMutation();

  // const handleMarkAsRead = (id) => {
  //   const updatedNotifications = notifications.map((noti) =>
  //     noti.id === id ? { ...noti, isRead: true } : noti
  //   );
  //   setNotifications(updatedNotifications);
  // };

  const notificationGetFun = () => {
    setLoading(true);
    notificationliatApi()
      .unwrap()
      .then((res) => {
        // console.log("notires", res);
        const notread = res?.data?.notifications?.filter(
          (item) => !item?.isRead
        );
        dispatch(saveNotificationSlice(notread || []));
        setNotifications(res?.data?.notifications || []);
      })
      .catch((err) => {
        // console.log("Err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // paymentDetails

  const notificatioRead = (item) => {
    // console.log("temsss", item);
    const data = item?.paymentDetails;
    if (item?.isRead) {
      if (data?.status == "Approved") {
        toast.info("Payment Proof Approved");
      } else {
        navigate("/paymentproof");
      }
    } else {
      setLoading(true);
      const id = item?._id;
      notificationread(id)
        .unwrap()
        .then((res) => {
          // console.log("Res", res);
          notificationGetFun();
          if (data?.status == "Approved") {
            toast.info("Payment Proof Approved");
          } else {
            navigate("/paymentproof");
          }
        })
        .catch((err) => {
          // console.log("err", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    notificationGetFun();
  }, []);

  return (
    <>
      {loading && <PageLoad />}
      {notifications?.length == 0 && !loading ? (
        <EmptyComp text={"Notification Not Found"} />
      ) : (
        !loading && (
          <div className="container mt-4">
            <div className="notification-container rounded-3 mb-3">
              <div className="notification-list">
                {notifications.map((item) => {
                  const isoString = item?.createdAt;
                  const dateObj = new Date(isoString);
                  const istDate = new Date(
                    dateObj.toLocaleString("en-US", {
                      timeZone: "Asia/Kolkata",
                    })
                  );
                  const dateOnly = istDate.toLocaleDateString("en-CA"); // Format: 2025-05-03
                  const timeOnly = istDate.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true, // This gives AM/PM format
                  });
                  return (
                    <div
                      key={item?._id}
                      className={`notification-card ${
                        !item?.isRead ? "unread" : ""
                      }`}
                      onClick={() => notificatioRead(item)}
                    >
                      <div className="noti-header">
                        <h4 className="f6 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
                          {item?.type == "payment_proof" &&
                            "Payment Proof Added!"}
                        </h4>
                      </div>
                      <p className="f3 fs-xxl-13 fs-xl-13 fs-lg-13 fs-sm-12 fs-xs-12 textani black">
                        {item?.message}
                      </p>
                      <span className="noti-time f4 fs-xxl-13 fs-xl-13 fs-lg-13 fs-sm-12 fs-xs-12 textani">
                        {dateOnly} | {timeOnly}
                      </span>
                      {!item?.isRead && <span className="dot"></span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default NotificationScreen;
