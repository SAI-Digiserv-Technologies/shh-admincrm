import React, { useEffect, useRef, useState } from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { leadstatus } from "../Data/DummyJson";

const LeadManageDetailScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages((prevMessages) => [...prevMessages, newMessage]); // Append message
      setNewMessage(""); // Clear input
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent new line in textarea
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="detaile-cont ">
      <div className="d-flex as-jb mt-4 gap-4 det-layer ">
        <form className="w-70 d-flex inputcont ac-jb flex-column gap-4 pb-5">
          <div className="left-box-cont">
            <fieldset className="out-input rounded-5 d-flex ac-jc ps-md-5 pe-md-5 px-3 pt-4 pb-5">
              <legend className="f3 px-1 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani black mb-0">
                New Lead
              </legend>
              <div className="d-flex w-100 ac-jb flex-wrap gap-3">
                <div className="w-45">
                  <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                    Student Name
                  </p>
                  <input className="w-100 rounded-2 px-2" />
                </div>
                <div className="w-45">
                  <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                    E-mail Address
                  </p>
                  <input className="w-100 rounded-2 px-2" />
                </div>
                <div className="w-45">
                  <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                    Phone Number
                  </p>
                  <input className="w-100 rounded-2 px-2" />
                </div>
                <div className="w-45">
                  <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                    Source
                  </p>
                  <div className="lead_drop">
                    <select className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13">
                      <option value="" disabled hidden>
                        Select Source
                      </option>
                      {leadstatus?.map((item) => {
                        return (
                          <option
                            key={item.id}
                            className="light_gray w-100 rounded-2 px-2"
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="w-45">
                  <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                    Status
                  </p>
                  <div className="lead_drop">
                    <select className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13">
                      <option value="" disabled hidden>
                        Select Status
                      </option>
                      {leadstatus?.map((item) => {
                        return (
                          <option
                            key={item.id}
                            className="light_gray w-100 rounded-2 px-2"
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="w-45">
                  <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                    Assigned
                  </p>
                  <div className="lead_drop">
                    <select className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13">
                      <option value="" disabled hidden>
                        Select Assigned
                      </option>
                      {leadstatus?.map((item) => {
                        return (
                          <option
                            key={item.id}
                            className="light_gray w-100 rounded-2 px-2"
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </fieldset>

            <div className="cust-sendbtn d-flex ac-jc w-100 ">
              <button type="submit" className="btn-sub  bg-primary3 white f4 fs-xxl-18 fs-xl-18 fs-lg-17 fs-sm-16 fs-xs-15 rounded-3 textani">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadManageDetailScreen;
