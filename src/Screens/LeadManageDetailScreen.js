import React, { useEffect, useRef, useState } from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { leadstatus } from "../Data/DummyJson";

const LeadManageDetailScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setNewMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="detaile-cont">
      <div className="d-flex as-jb mt-4 gap-4 det-layer">
        <form className="w-70 d-flex inputcont ac-jb flex-column gap-4 ">
          <div className="left-box-cont">
            <fieldset className="out-input rounded-5 d-flex ac-jc ps-md-5 pe-md-5 px-3 pt-4 pb-5">
              <legend className="f3 px-1 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani black">
                New Lead
              </legend>

              <div className="d-flex w-100 ac-jb flex-wrap gap-3">
                {/* Student Name */}
                <div className="w-45">
                  <p className="f6 px-1 textani primary2 mb-0">Student Name</p>
                  <input className="w-100 rounded-2 px-2" />
                </div>

                {/* Email */}
                <div className="w-45">
                  <p className="f6 px-1 textani primary2 mb-0">E-mail Address</p>
                  <input className="w-100 rounded-2 px-2" />
                </div>

                {/* Phone */}
                <div className="w-45">
                  <p className="f6 px-1 textani primary2 mb-0">Phone Number</p>
                  <input className="w-100 rounded-2 px-2" />
                </div>

                {/* Source */}
                <div className="w-45">
                  <p className="f6 px-1 textani primary2 mb-0">Source</p>
                  <div className="lead_drop">
                    <select className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3">
                      <option value="" disabled hidden>Select Source</option>
                      {leadstatus?.map((item) => (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Status */}
                <div className="w-45">
                  <p className="f6 px-1 textani primary2 mb-0">Status</p>
                  <div className="lead_drop">
                    <select className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3">
                      <option value="" disabled hidden>Select Status</option>
                      {leadstatus?.map((item) => (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Assigned */}
                <div className="w-45">
                  <p className="f6 px-1 textani primary2 mb-0">Assigned</p>
                  <div className="lead_drop">
                    <select className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3">
                      <option value="" disabled hidden>Select Assigned</option>
                      {leadstatus?.map((item) => (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Address */}
                <div className="w-45">
                  <p className="f6 px-1 textani primary2 mb-0">Address</p>
                  <input className="w-100 rounded-2 px-2" />
                </div>

                {/* State */}
                <div className="w-45">
                  <p className="f6 px-1 textani primary2 mb-0">State</p>
                  <div className="lead_drop">
                    <select className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3">
                      <option value="" disabled hidden>Select State</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Karnataka">Karnataka</option>
                    </select>
                  </div>
                </div>

                {/* City */}
                <div className="w-45">
                  <p className="f6 px-1 textani primary2 mb-0">City</p>
                  <div className="lead_drop">
                    <select className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3">
                      <option value="" disabled hidden>Select City</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Coimbatore">Coimbatore</option>
                      <option value="Madurai">Madurai</option>
                    </select>
                  </div>
                </div>

                {/* College Name */}
                <div className="w-45">
                  <p className="f6 px-1 textani primary2 mb-0">College Name</p>
                  <input className="w-100 rounded-2 px-2" />
                </div>

                {/* Degree */}
                <div className="w-45">
                  <p className="f6 px-1 textani primary2 mb-0">Degree</p>
                  <div className="lead_drop">
                    <select className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3">
                      <option value="" disabled hidden>Select Degree</option>
                      <option value="B.Tech">B.Tech</option>
                      <option value="B.Sc">B.Sc</option>
                      <option value="MCA">MCA</option>
                    </select>
                  </div>
                </div>
              </div>
            </fieldset>

            <div className="cust-sendbtn d-flex ac-jc w-100">
              <button
                type="submit"
                className="btn-sub bg-primary3 white f4 fs-xxl-18 fs-xl-18 fs-lg-17 fs-sm-16 fs-xs-15 rounded-3 textani"
              >
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
