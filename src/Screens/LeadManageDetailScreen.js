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
      <p className=" mb-0 f7 black fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani">
        Lead Management
      </p>
      <div className="d-flex as-jb mt-4 gap-4 det-layer">
        <div className="w-70 d-flex inputcont ac-jb flex-column gap-4 pb-5">
          <div className="left-box-cont ">
            <fieldset className="out-input rounded-5 d-flex ac-jc  ps-md-5 pe-md-5 px-3 pt-4 pb-5">
              <legend className="f3 px-1 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani black mb-0">
                Personal Details
              </legend>
              <div className="d-flex w-100 ac-jb flex-wrap gap-3">
                <div className="w-45">
                  <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                    Lead ID
                  </p>
                  <input className="w-100 rounded-2 px-2" />
                </div>
                <div className="w-45">
                  <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                    Full Name
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
              </div>
            </fieldset>
          </div>
          <div className="left-box-cont">
            <fieldset className="out-input rounded-5 d-flex ac-jc  ps-md-5 pe-md-5 px-3 pt-4 pb-5">
              <legend className="f3 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani black mb-0">
                Lead Details
              </legend>
              <div className="d-flex w-100 ac-jb flex-wrap gap-3">
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
                    {/* <input className="w-100 rounded-2 px-2" /> */}
                  </div>
                </div>
                <div className="w-45">
                  <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                    Follow-up
                  </p>
                  <div>
                    <div>{/* <img src={} /> */}</div>
                    <input className="w-100 rounded-2 px-2" />
                  </div>
                </div>
                <div className="w-45">
                  <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                    Conversion Date
                  </p>
                  <input className="w-100 rounded-2 px-2" />
                </div>
                <div className="w-45">
                  <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                    Interested Course
                  </p>
                  <input className="w-100 rounded-2 px-2" />
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <div className="w-30 not-cont d-flex as-jb flex-column ">
          <p className="f6 px-1 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani primary2 mb-0">
            Notes
          </p>
          <div className="rounded-2 text-cont h-100 w-100 ">
            <div className="shadow-layer">
              <div
                className={`${
                  messages?.length == 0
                    ? ""
                    : "text-scroll p-3 d-flex flex-column w-100 as-js gap-3"
                } text-scroll p-3 d-flex flex-column w-100 as-js gap-3 rounded-3 `}
              >
                {messages?.length == 0 ? (
                  <div className="">
                    <p className="f4 px-1 fs-xxl-16 fs-xl-17 fs-lg-16 fs-sm-16 fs-xs-15 textani light_blue mb-0">
                      Add Notes here...
                    </p>
                  </div>
                ) : (
                  messages.map((msg, index) => {
                    return (
                      <div
                        key={index}
                        className="px-2 py-3 rounded-2 listlayer"
                      >
                        <p className="f4 px-1 fs-xxl-16 fs-xl-17 fs-lg-16 fs-sm-16 fs-xs-15 textani black mb-0">
                          {msg}
                        </p>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="d-flex ac-jb bg-light_blue text-areacont px-2 w-100 py-2">
                <textarea
                  placeholder="Type here..."
                  className="w-100 border-0"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown} // Detect Enter key
                />
                <button
                  onClick={() => {
                    handleSendMessage();
                  }}
                  className="send-btn border-0 bg-primary3 white rounded-2 d-flex ac-jc"
                >
                  <SendOutlinedIcon className="fs-xxl-18 fs-xl-18 fs-lg-17 fs-sm-16 fs-xs-15" />
                </button>
              </div>
            </div>
          </div>
          <div className="cust-sendbtn d-flex ac-jc w-100">
            <button className="btn-sub border-0 bg-primary3 white f4 fs-xxl-18 fs-xl-18 fs-lg-17 fs-sm-16 fs-xs-15 rounded-3 textani">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadManageDetailScreen;
