import React, { useState } from "react";

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Lead Follow-up Reminder",
      message: "You have a follow-up scheduled with Priya S. today at 4:00 PM.",
      timestamp: "2025-04-05T10:00:00Z",
      type: "lead-reminder",
      leadName: "Priya S.",
      followUpTime: "4:00 PM",
      followUpDate: "2025-04-05",
      isRead: false,
    },
    {
      id: 2,
      title: "Upcoming Lead Call",
      message: "Reminder: Call with lead Arjun Kumar at 6:30 PM.",
      timestamp: "2025-04-05T09:00:00Z",
      type: "lead-reminder",
      leadName: "Arjun Kumar",
      followUpTime: "6:30 PM",
      followUpDate: "2025-04-05",
      isRead: false,
    },
    {
      id: 3,
      title: "Missed Lead Follow-up",
      message: "You missed a follow-up with Riya Sharma yesterday.",
      timestamp: "2025-04-04T20:00:00Z",
      type: "lead-missed",
      leadName: "Riya Sharma",
      followUpTime: "3:00 PM",
      followUpDate: "2025-04-04",
      isRead: true,
    },
    {
      id: 4,
      title: "Lead Follow-up Complete",
      message: "You successfully completed follow-up with Vishal M.",
      timestamp: "2025-04-03T18:00:00Z",
      type: "lead-complete",
      leadName: "Vishal M.",
      followUpTime: "2:00 PM",
      followUpDate: "2025-04-03",
      isRead: true,
    },
    {
      id: 4,
      title: "Lead Follow-up Complete",
      message: "You successfully completed follow-up with Vishal M.",
      timestamp: "2025-04-03T18:00:00Z",
      type: "lead-complete",
      leadName: "Vishal M.",
      followUpTime: "2:00 PM",
      followUpDate: "2025-04-03",
      isRead: true,
    },
    {
      id: 4,
      title: "Lead Follow-up Complete",
      message: "You successfully completed follow-up with Vishal M.",
      timestamp: "2025-04-03T18:00:00Z",
      type: "lead-complete",
      leadName: "Vishal M.",
      followUpTime: "2:00 PM",
      followUpDate: "2025-04-03",
      isRead: true,
    },
    {
      id: 4,
      title: "Lead Follow-up Complete",
      message: "You successfully completed follow-up with Vishal M.",
      timestamp: "2025-04-03T18:00:00Z",
      type: "lead-complete",
      leadName: "Vishal M.",
      followUpTime: "2:00 PM",
      followUpDate: "2025-04-03",
      isRead: true,
    },
    {
      id: 4,
      title: "Lead Follow-up Complete",
      message: "You successfully completed follow-up with Vishal M.",
      timestamp: "2025-04-03T18:00:00Z",
      type: "lead-complete",
      leadName: "Vishal M.",
      followUpTime: "2:00 PM",
      followUpDate: "2025-04-03",
      isRead: true,
    },
  ]);

  const handleMarkAsRead = (id) => {
    const updatedNotifications = notifications.map((noti) =>
      noti.id === id ? { ...noti, isRead: true } : noti
    );
    setNotifications(updatedNotifications);
  };

  return (
    <div className="container mt-4">
      {/* <p className=" mb-2 f7 black fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani">
        Notification
      </p> */}
      <div className="notification-container rounded-3 mb-3">
        <div className="notification-list">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`notification-card ${!item.isRead ? "unread" : ""}`}
              onClick={() => handleMarkAsRead(item.id)}
            >
              <div className="noti-header">
                <h4 className="f6 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
                  {item.title}
                </h4>
              </div>
              <p className="f3 fs-xxl-13 fs-xl-13 fs-lg-13 fs-sm-12 fs-xs-12 textani black">
                {item.message}
              </p>
              <span className="noti-time f4 fs-xxl-13 fs-xl-13 fs-lg-13 fs-sm-12 fs-xs-12 textani">
                {item.followUpDate} | {item.followUpTime}
              </span>
              {!item.isRead && <span className="dot"></span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationScreen;
