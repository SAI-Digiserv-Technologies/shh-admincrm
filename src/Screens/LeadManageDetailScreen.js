import React, { useEffect, useRef, useState } from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { courselist, leadaddform, leadstatus } from "../Data/DummyJson";
import { calendar_icon, time_icon } from "../assets/images";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { City, State } from "country-state-city";
import PostalCodes from "postal-codes-js";
import PageLoad from "../Components/Pageload/Pageload";
import { useLocation } from "react-router-dom";
import { useLazyGetUserQuery, useLeadaddMutation, useLoginMutation } from "../Data/Api/api";
import { toast } from "react-toastify";

const LeadManageDetailScreen = () => {
  const [leadaddapi] = useLeadaddMutation();


  const location = useLocation();
  console.log("location", location);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [formFeald, setFormFeald] = useState({
    name: "",
    email: "",
    phoneno: "",
    source: "",
    degree: "",
    passedout: "",
    college_name: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    assignto: "",
    status: "",
    followupdate: "",
    followuptime: "",
    enrollement_date: "",
    interested_course: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoadin] = useState(true);

  const handleSendMessage = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (newMessage.trim() !== "") {
      setMessages((prevMessages) => [...prevMessages, newMessage]); // Append message
      setNewMessage(""); // Clear input
    }
  };

  console.log("formFealdstates", formFeald);

  const states = State.getStatesOfCountry("IN");
  const cities = formFeald?.state?.isoCode
    ? City.getCitiesOfState("IN", formFeald?.state?.isoCode)
    : [];
  // const pin = PostalCodes?.getPostalCode("IN", {
  //   city: formFeald?.city?.name,
  //   state: formFeald?.state?.name,
  // });
  // console.log("pin", pin);

  console.log("citformFealdies", cities, formFeald);

  // const fetchPincode = async (city) => {
  //   console.log("citcitycityy", city);

  //   try {
  //     const res = await fetch(
  //       `https://api.postalpincode.in/postoffice/${city?.name}`
  //     );
  //     const data = await res.json();
  //     if (data?.[0]?.Status === "Success") {
  //       const pincode = data?.[0]?.PostOffice?.[0]?.Pincode;
  //       setFormFeald((prev) => ({
  //         ...prev,
  //         pincode,
  //       }));
  //     } else {
  //       console.log("No pincode found for this city.");
  //     }
  //   } catch (err) {
  //     console.error("Error fetching pincode:", err);
  //   }
  // };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent new line in textarea
      handleSendMessage();
    }
  };

  const fealdOnChange = (field, value) => {
    setFormFeald((state) => ({
      ...state,
      [field]: value,
    }));
    validateInput(field, value);
  };

  const validateInput = (field, value) => {
    let errorMsg = "";
    const stringValue = String(value).trim();

    switch (field) {
      case "name":
        if (!stringValue) errorMsg = " Name is required!";
        break;
      case "email":
        if (!stringValue) {
          errorMsg = "Email is required!";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stringValue)) {
          errorMsg = "Enter a valid Email!";
        }
        break;
      case "phoneno":
        if (!stringValue) {
          errorMsg = "Phone number is required!";
        } else if (!/^[6-9]\d{9}$/.test(stringValue)) {
          errorMsg = "Enter a valid 10-digit phone number!";
        }
        break;
      case "source":
        if (!stringValue) {
          errorMsg = "source is required!";
        }
        break;
      case "status":
        if (!stringValue) {
          errorMsg = "status is required!";
        }
        break;
      case "state":
        if (!stringValue) {
          errorMsg = "state is required!";
        }
        break;
      case "city":
        if (!stringValue) {
          errorMsg = "city is required!";
        }
        break;
      case "pincode":
        if (!stringValue) {
          errorMsg = "pincode is required!";
        }
        break;
      case "address":
        if (!stringValue) {
          errorMsg = "address is required!";
        }
        break;
      case "followupdate":
        if (!stringValue && formFeald?.status == "Follow Ups") {
          errorMsg = "Followup Date and Followup Time is required!";
        }
        break;
      case "followuptime":
        if (!stringValue && formFeald?.status == "Follow Ups") {
          errorMsg = "Followup Date and Followup Time is required!";
        }
        break;
      case "enrollement_date":
        if (!stringValue && formFeald?.status == "Enrollement") {
          errorMsg = "Enrollement Date is required!";
        }
        break;
      case "interested_course":
        if (!stringValue) {
          errorMsg = "Tnterested Course is required!";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMsg,
    }));

    return !errorMsg;
  };

  const editMessage = (index) => {
    const updatedMessage = prompt("Edit your message:", messages[index]); // Show a prompt for editing
    if (updatedMessage !== null) {
      setMessages((prevMessages) =>
        prevMessages.map((msg, i) => (i === index ? updatedMessage : msg))
      );
    }
  };

  const deleteMessage = (index) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      setMessages((prevMessages) => prevMessages.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    const isValid = Object.keys(formFeald).every((field) =>
      validateInput(field, formFeald[field])
    );
    if (isValid) {
      const payload = {
        // "name": "jeeva",
        // "email": "jeeva@gmail.com",
        // "phonenumber": "8868555662",
        // "status": "Enquiry",
        // "source": "Instagram",
        // "assignedto": "Sujatha",
        // "interested_course": "Digital Marketing",
        // "degree": "Bsc Computer Science",
        // "passedout": 2022,
        // "college_name": "dfsdfdsf",
        // "address": "uahsihfiu",
        // "state": "Tamil Nadu",
        // "city": "Chennai",
        // "pincode": "600022"
        "name": formFeald?.name,
        "email": formFeald?.email,
        "phonenumber": formFeald?.phoneno,
        "status": formFeald?.status,
        "source": formFeald?.source,
        "assignedto": formFeald?.assignto,
        "interested_course": formFeald?.interested_course,
        "degree": formFeald?.degree,
        "passedout": formFeald?.passedout,
        "college_name": formFeald?.college_name,
        "address": formFeald?.address,
        "state": formFeald?.state,
        "city": formFeald?.city,
        "pincode": formFeald?.pincode

      }
      leadaddapi(payload)
        .unwrap().then(res => {
          console.log("success", res)
        }).catch((err) => {
          console.log("errthrougimg", err)
        })
      // console.log("SuccccformFeald", formFeald);
    }

  }

 
  const dataGetFun = () => {
    setLoadin(false);
  };
  useEffect(() => {
    setTimeout(() => {
      dataGetFun();
    }, 1000);
  }, []);


  return (
    <div className="detaile-cont">
      {loading && <PageLoad />}
      <div className="d-flex as-jb mt-4 gap-4 det-layer">
        <div className="w-70 d-flex inputcont ac-jb flex-column gap-4 pb-5">
          <div className="left-box-cont ">
            <fieldset className="out-input rounded-5 d-flex ac-jc  ps-md-5 pe-md-5 px-3 pt-4 pb-5">
              <legend className="f3 px-1 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani black mb-0">
                Personal Details
              </legend>
              <div className="d-flex w-100 ac-jb flex-wrap gap-3">
                {/* <div className="w-45">
                  <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                    Lead ID
                  </p>
                  <input className="w-100 rounded-2 px-2" />
                </div> */}
                {leadaddform?.map((item) => {
                  console.log("statesstates", item?.list);
                  return (
                    <>
                      {item?.type == "dropdown" ? (
                        <div className="w-45">
                          <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                            {item?.lable}
                          </p>
                          <div className="lead_drop position-relative">
                            <select
                              value={formFeald?.[item?.formFeald] || ""}
                              onChange={(e) => {
                                fealdOnChange(item?.formFeald, e.target.value);
                              }}
                              className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
                            >
                              <option value="" disabled hidden selected>
                                Select {item?.lable}
                              </option>
                              {item?.list?.map((option) => (
                                <option
                                  key={option?.id}
                                  className="light_gray w-100 rounded-2 px-2"
                                  value={option?.name}
                                >
                                  {option?.name}
                                </option>
                              ))}
                            </select>
                            {errors?.[item?.formFeald] && (
                              <div className="error">
                                <p className="mb-0 red f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani ">
                                  {errors?.[item?.formFeald]}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : item?.type == "citydropdown" ? (
                        <div className="w-45">
                          <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                            {item?.lable}
                          </p>
                          <div className="lead_drop position-relative">
                            <select
                              value={formFeald?.city?.name || ""}
                              // onChange={(e) => {
                              //   fealdOnChange(item?.formFeald, e.target.value);
                              // }}
                              onChange={(e) => {
                                const selectedCity = cities.find(
                                  (c) => c.name === e.target.value
                                );
                                // fetchPincode(selectedCity);
                                fealdOnChange("city", selectedCity); // or selectedCity.name if you prefer just string
                              }}
                              className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
                            >
                              <option value="" disabled hidden selected>
                                Select {item?.lable}
                              </option>
                              {cities?.map((option) => (
                                <option
                                  key={option?.id}
                                  className="light_gray w-100 rounded-2 px-2"
                                  value={option?.name}
                                >
                                  {option?.name}
                                </option>
                              ))}
                            </select>
                            {errors?.[item?.formFeald] && (
                              <div className="error">
                                <p className="mb-0 red f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani ">
                                  {errors?.[item?.formFeald]}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : item?.type == "dropdownstate" ? (
                        <div className="w-45">
                          <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                            {item?.lable}
                          </p>
                          <div className="lead_drop position-relative">
                            <select
                              value={formFeald?.state?.name || ""}
                              // onChange={(e) => {
                              //   fealdOnChange("state", e.target.value);
                              // }}
                              onChange={(e) => {
                                const selectedState = states.find(
                                  (s) => s.name === e.target.value
                                );
                                fealdOnChange("state", selectedState); // Store state object
                                fealdOnChange("city", ""); // Reset city when state changes
                              }}
                              className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
                            >
                              <option value="" disabled hidden selected>
                                Select State
                              </option>
                              {states?.map((option, index) => (
                                <option
                                  key={index}
                                  className="light_gray w-100 rounded-2 px-2"
                                  value={option?.name}
                                >
                                  {option?.name}
                                </option>
                              ))}
                            </select>
                            {errors?.[item?.formFeald] && (
                              <div className="error">
                                <p className="mb-0 red f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani ">
                                  {errors?.[item?.formFeald]}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="w-45 position-relative">
                          <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                            {item?.lable}
                          </p>
                          <input
                            type={item?.type}
                            value={formFeald?.[item?.formFeald]}
                            onChange={(e) => {
                              fealdOnChange(item?.formFeald, e.target.value);
                            }}
                            placeholder={item?.placeholder}
                            className="w-100 rounded-2 px-2 f4 black fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani"
                          />
                          {errors?.[item?.formFeald] && (
                            <div className="error">
                              <p className="mb-0 red f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani ">
                                {errors?.[item?.formFeald]}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  );
                })}
              </div>
            </fieldset>
          </div>
          <div className="left-box-cont w-100">
            <fieldset className="out-input rounded-5 d-flex ac-jc  ps-md-5 pe-md-5 px-3 pt-4 pb-5">
              <legend className="f3 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani black mb-0">
                Lead Details
              </legend>
              <div className="d-flex w-100 ac-jb flex-wrap gap-3">
                <div className="w-45">
                  <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                    Status
                  </p>
                  <div className="lead_drop position-relative">
                    <select
                      value={formFeald?.status}
                      onChange={(e) => {
                        fealdOnChange("status", e.target.value);
                      }}
                      className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
                    >
                      <option value="" disabled hidden selected>
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
                    {errors?.status && (
                      <div className="error">
                        <p className="mb-0 red f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani ">
                          {errors?.status}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-45">
                  <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                    Interested Course
                  </p>
                  <div className="lead_drop position-relative">
                    <select
                      value={formFeald?.interested_course}
                      onChange={(e) => {
                        fealdOnChange("interested_course", e.target.value);
                      }}
                      className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
                    >
                      <option value="" disabled hidden selected>
                        Select Interested Course
                      </option>
                      {courselist?.map((item) => {
                        return (
                          <option
                            key={item.id}
                            className="light_gray w-100 rounded-2 px-2"
                            value={item.coursename}
                          >
                            {item.coursename}
                          </option>
                        );
                      })}
                    </select>
                    {errors?.interested_course && (
                      <div className="error">
                        <p className="mb-0 red f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani ">
                          {errors?.interested_course}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                {formFeald?.status == "Follow Ups" && (
                  <div className="w-45 two_inputs position-relative">
                    <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                      Follow-up
                    </p>
                    <div className="d-flex ac-jc input_one rounded-2 gap-3 px-2">
                      <div className="d-flex ac-jb w-50 gap-1 ">
                        <div className="insideinpput d-flex ac-jc">
                          <img src={calendar_icon} />
                        </div>
                        <input
                          type="date"
                          className="w-100 f4 black fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani"
                          placeholder="Date"
                          value={formFeald?.followupdate}
                          onChange={(e) => {
                            fealdOnChange("followupdate", e.target.value);
                          }}
                        />
                      </div>
                      <div className="v-line" />
                      <div className="d-flex ac-jc w-50 gap-1">
                        <div className="insideinpput d-flex ac-jb">
                          <img src={time_icon} />
                        </div>
                        <input
                          className="w-100 f4 black fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani"
                          placeholder="Time"
                          value={formFeald?.followuptime}
                          onChange={(e) => {
                            fealdOnChange("followuptime", e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    {(errors?.followupdate || errors?.followuptime) && (
                      <div className="error">
                        <p className="mb-0 red f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani ">
                          {errors?.followupdate || errors?.followuptime}
                        </p>
                      </div>
                    )}
                  </div>
                )}
                {formFeald?.status == "Enrollement" && (
                  <div className="w-45">
                    <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                      Enrollement Date
                    </p>
                    <div className="d-flex ac-js input_twoss rounded-2 px-2 gap-2">
                      <div className="insideinpput d-flex ac-jc">
                        <img src={calendar_icon} />
                      </div>
                      <input
                        type={"date"}
                        value={formFeald?.enrollement_date}
                        onChange={(e) => {
                          fealdOnChange("enrollement_date", e.target.value);
                        }}
                        placeholder="Conversion Date"
                        className="w-100  f4 black fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani"
                      />
                    </div>
                  </div>
                )}
              </div>
            </fieldset>
          </div>
          <div className="cust-sendbtn d-flex ac-jc w-100">
            <button
              onClick={() => {
                handleSubmit();
              }}
              className="btn-sub border-0 bg-primary3 white f4 fs-xxl-18 fs-xl-18 fs-lg-17 fs-sm-16 fs-xs-15 rounded-3 textani"
            >
              Submit
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LeadManageDetailScreen;
