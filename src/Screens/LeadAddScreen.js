import React, { useEffect, useRef, useState } from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import {
  courselist,
  leadaddform,
  leadsformtatus,
  leadstatus,
} from "../Data/DummyJson";
import { calendar_icon, time_icon } from "../assets/images";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { City, State } from "country-state-city";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useLazyCourse_listQuery,
  useLazyGetUserviewQuery,
  useLazyLead_viewQuery,
  useLazyNotes_listQuery,
  useLazySource_listQuery,
  useLazyViewStaffQuery,
  useLeadaddMutation,
  useLeadeditMutation,
  useNotes_postMutation,
  useNotesdeleteMutation,
} from "../Data/Api/api";
import { toast } from "react-toastify";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import PageLoad from "../Components/Loading/PageLoad";
import { NULL } from "sass";

const LeadAddScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const type = location?.state?.type;
  const view = location?.state?.view;
  const routData = location?.state?.data;
  const status = routData?.status;
  console.log("locatiroutDataon", location, routData);

  const scrollRef = useRef(null);

  const [sourceLis, setSourceList] = useState([]);
  const [courseList, setCourceList] = useState([]);
  const [staflist, setStafList] = useState([]);
  const [fullData, setFulldata] = useState(null);
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
    status: status == "Enquiry" || type == "add" ? "Enquiry" : "",
    followupdate: "",
    followuptime: "",
    enrollement_date: "",
    interested_course: "",
  });
  const [editbtn, setEditbtn] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoadin] = useState(false);

  // Api
  const [leadaddApi] = useLeadaddMutation();
  const [leadeditApi] = useLeadeditMutation();
  const [leadViewApi] = useLazyGetUserviewQuery();
  const [getSourceApi] = useLazySource_listQuery();
  const [getCourceApi] = useLazyCourse_listQuery();
  const [viewStaffApi] = useLazyViewStaffQuery();

  const states = State.getStatesOfCountry("IN");
  const cities = formFeald?.state?.isoCode
    ? City.getCitiesOfState("IN", formFeald?.state?.isoCode)
    : [];
  // const pin = PostalCodes?.getPostalCode("IN", {
  //   city: formFeald?.city?.name,
  //   state: formFeald?.state?.name,
  // });
  // console.log("pin", pin);

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

  const fealdOnChange = (field, value) => {
    console.log("value", value);
    if (field === "assignto") {
      setFormFeald((state) => ({
        ...state,
        assignto: value, // value should be full object (id + name)
      }));
    } else {
      setFormFeald((state) => ({
        ...state,
        [field]: value,
      }));
    }
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
      //
      case "degree":
        if (!stringValue && (formFeald?.passedout || formFeald?.college_name)) {
          errorMsg =
            "Degree is required when Passout year or College name is entered!";
        }
        break;

      case "passedout":
        if (formFeald?.degree && !stringValue) {
          errorMsg = "Passed Out year is required when Degree is entered!";
        } else if (stringValue) {
          const currentYear = new Date().getFullYear(); // Get current year like 2025
          const yearRegex = /^(19|20)\d{2}$/;
          if (!yearRegex.test(stringValue)) {
            errorMsg = "Please enter a valid 4-digit year.";
          } else if (parseInt(stringValue) > currentYear) {
            errorMsg = "Passed Out year cannot be in the future.";
          }
        }
        break;

      case "college_name":
        if (formFeald?.degree && !stringValue) {
          errorMsg = "College name is required when Degree is entered!";
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
          errorMsg = "Pincode is required!";
        } else if (!/^\d{6}$/.test(stringValue)) {
          errorMsg = "Pincode must be exactly 6 digits!";
        }
        break;
      case "address":
        if (!stringValue) {
          errorMsg = "address is required!";
        }
        break;

      case "assignto":
        if (!stringValue) {
          errorMsg = "Assignedto is required!";
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
          errorMsg = "Interested Course is required!";
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

  console.log("formFealerrorsd", formFeald, errors);

  const handleSubmit = () => {
    const isValid = Object.keys(formFeald).every((field) =>
      validateInput(field, formFeald[field])
    );
    if (isValid) {
      console.log("SuccccformFeald", formFeald);
      let payload = {
        name: formFeald?.name,
        email: formFeald?.email,
        phonenumber: formFeald?.phoneno,
        status: formFeald?.status,
        source: formFeald?.source,
        degree: formFeald?.degree,
        passedout: formFeald?.passedout,
        college_name: formFeald?.college_name,
        address: formFeald?.address,
        state: formFeald?.state,
        city: formFeald?.city,
        pincode: formFeald?.pincode,
        followupdate: "",
        followuptime: "",
        enrollement_date: "",
      };
      if (formFeald?.assignto?._id) {
        payload.assignedto = formFeald?.assignto?._id;
      }
      if (formFeald?.interested_course?.addcourse) {
        payload.interested_course = formFeald?.interested_course;
      }
      if (formFeald?.status === "Follow Ups") {
        payload.followupdate = formFeald?.followupdate;
        payload.followuptime = formFeald?.followuptime;
      }
      if (formFeald?.status === "Enrollement") {
        payload.enrollement_date = formFeald?.enrollement_date;
      }

      console.log("payload", payload);
      setLoadin(true);
      if (type == "edit") {
        const id = routData?._id;
        leadeditApi({ payload, id })
          .unwrap()
          .then((res) => {
            console.log("EditRes", res);
            toast.success(res?.message || "Lead updated successfully");
            navigate(-1);
            setEditbtn(true);
          })
          .catch((err) => {
            console.log("Reserr", err);
            toast.error(err?.data?.error || "BAD_REQUEST");
          })
          .finally(() => {
            setLoadin(false);
            scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
          });
      } else {
        leadaddApi(payload)
          .unwrap()
          .then((res) => {
            console.log("Res", res);
            toast.success(res?.message || "Lead created successfully");
            navigate(-1);
          })
          .catch((err) => {
            console.log("Reserr", err);
            toast.error(err?.data?.error || "BAD_REQUEST");
          })
          .finally(() => {
            setLoadin(false);
            scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
          });
      }
    }
  };
  const handleChange = (e) => {
    const selectedObject = JSON.parse(e.target.value);
    setFormFeald((prev) => ({
      ...prev,
      interested_course: selectedObject,
    }));
  };

  const dataGetFun = () => {
    setLoadin(true);
    const id = routData?._id;
    console.log("id", id);
    leadViewApi(id)
      .unwrap()
      .then((res) => {
        console.log("viewRes", res);
        setFulldata(res?.lead);
        setFormFeald({
          name: res?.lead?.name,
          email: res?.lead?.email,
          phoneno: res?.lead?.phonenumber,
          source: res?.lead?.source,
          degree: res?.lead?.degree,
          passedout: res?.lead?.passedout,
          college_name: res?.lead?.college_name,
          state: res?.lead?.state,
          city: res?.lead?.city,
          pincode: res?.lead?.pincode,
          address: res?.lead?.address,
          assignto: res?.lead?.assignedto,
          status: res?.lead?.status,
          followupdate: res?.lead?.followupdate,
          followuptime: res?.lead?.followuptime,
          enrollement_date: res?.lead?.enrollement_date,
          interested_course: res?.lead?.interested_course,
        });

        console.log("formFeald", formFeald);
        getSourceFun();
      })
      .catch((err) => {
        console.log("Err", err);
      })
      .finally(() => {
        setLoadin(false);
      });
  };

  const getSourceFun = () => {
    setLoadin(true);
    getSourceApi()
      .unwrap()
      .then((res) => {
        console.log("souRes", res, res?.data);
        setSourceList(res?.data);
        getCourceApi()
          .unwrap()
          .then((course) => {
            console.log("Coures", course);
            setCourceList(course?.data);
            viewStaffApi()
              .unwrap()
              .then((res) => {
                const staf = res?.telecallers;
                const activeStaf = staf?.filter((item) => item?.active == true);
                setStafList(activeStaf);
                console.log("StafRes", res, activeStaf);
              })
              .catch((err) => {
                console.log("Err", err);
              });
          })
          .catch((err) => {
            console.log("Err", err);
          });
      })
      .catch((err) => {
        console.log("Err", err);
      })
      .finally(() => {
        setLoadin(false);
      });
  };

  console.log("courseList", courseList);

  useEffect(() => {
    if (status == "Enquiry" || type == "add") {
      fealdOnChange("status", "Enquiry");
    }
    if (type == "edit" || type == "view") {
      setEditbtn(true);
      dataGetFun();
      getSourceFun();
    } else {
      getSourceFun();
    }
  }, []);

  console.log("fulcourseListlData", courseList, formFeald?.interested_course);

  return (
    <div ref={scrollRef} className="detaile-cont">
      {loading && <PageLoad />}
      {/* {type == "edit" && !loading && (
        <div className="w-100 d-flex ac-je">
          <button
            onClick={() => {
              navigate("/telecallers/payment-proof", {
                state: { type: "view", data: routData },
              });
            }}
            className="f3 px-1 bg-primarys rounded-2 border-0 px-3 py-1  fs-xxl-17  fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13 textani white mb-0"
          >
            Payment Proof
          </button>
        </div>
      )} */}
      {!loading && (
        <div className="d-flex as-jb mt-1 gap-4 det-layer">
          <div className="w-70 d-flex inputcont ac-jb flex-column gap-4 pb-5">
            <div className="left-box-cont ">
              <fieldset className="out-input rounded-5 d-flex ac-jc  ps-md-5 pe-md-5 px-3 pt-4 pb-5 position-relative">
                <legend className="f3 px-1 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani black mb-0">
                  Personal Details
                </legend>
                {type == "edit" && view !== "lead" && editbtn && (
                  <button
                    onClick={() => {
                      setEditbtn(false);
                    }}
                    className="edit_conts rounded-5 d-flex ac-jc border-0 "
                  >
                    <ModeEditOutlineOutlinedIcon className=" fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani white mb-0" />
                  </button>
                )}
                <div className="d-flex w-100 ac-jb flex-wrap gap-3">
                  {leadaddform?.map((item) => {
                    return (
                      <>
                        {item?.formFeald == "assignto" &&
                        !formFeald?.assignto &&
                        type !== "add" ? null : item?.type == "dropdown" ? (
                          <div className="w-45">
                            <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                              {item?.lable}
                            </p>
                            <div className="lead_drop position-relative">
                              <select
                                disabled={type == "edit" && editbtn}
                                value={
                                  item?.formFeald == "assignto"
                                    ? formFeald?.assignto?._id ||
                                      formFeald?.assignto // Display the _id for assignto
                                    : formFeald?.[item?.formFeald] || "" // Display the value for other fields
                                }
                                onChange={(e) => {
                                  if (item?.formFeald == "assignto") {
                                    const selectedId = e.target.value; // Get the _id of the selected staff member
                                    const selectedStaf = staflist.find(
                                      (s) => s._id == selectedId
                                    ); // Find the full staff object by _id
                                    console.log("selectedStaf", selectedStaf);

                                    fealdOnChange("assignto", selectedStaf); // Send the full object to update the state
                                  } else {
                                    fealdOnChange(
                                      item?.formFeald,
                                      e.target.value
                                    ); // For other fields, just send the value
                                  }
                                }}
                                className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
                              >
                                <option value="" disabled hidden>
                                  Select {item?.formFeald}
                                </option>

                                {/* Conditional List Rendering */}
                                {(item?.formFeald == "source"
                                  ? sourceLis
                                  : item?.formFeald == "assignto"
                                  ? staflist
                                  : item?.list
                                )?.map((option) => (
                                  <option
                                    key={option?.id || option?._id} // Use id or _id as the key
                                    className="light_gray w-100 rounded-2 px-2"
                                    value={
                                      item?.formFeald == "assignto"
                                        ? option?._id // For assignto, send the _id
                                        : option?.sourcename || option?.name // For others, use sourcename or name
                                    }
                                  >
                                    {option?.name || option?.sourcename}{" "}
                                    {/* Display name or sourcename */}
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
                                disabled={type == "edit" && editbtn}
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
                                  Select {item?.selectplace}
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
                                disabled={type == "edit" && editbtn}
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
                              disabled={type == "edit" && editbtn}
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
                      Status*
                    </p>
                    <div className="lead_drop position-relative">
                      {type == "edit" && fullData?.status == "Enrollement" ? (
                        <select
                          disabled
                          value={fullData?.status}
                          // onChange={(e) => {
                          //   fealdOnChange("status", e.target.value);
                          // }}
                          className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
                        >
                          <option value="" disabled hidden selected>
                            Select Status
                          </option>
                          {leadstatus?.map((item) => {
                            return (
                              <option
                                key={item?.id}
                                className="light_gray w-100 rounded-2 px-2"
                                value={item.name}
                              >
                                {item?.name}
                              </option>
                            );
                          })}
                        </select>
                      ) : (
                        <select
                          disabled
                          value={formFeald?.status}
                          onChange={(e) => {
                            if (status == "Enquiry" || type == "add") {
                              fealdOnChange("status", "Enquiry");
                            } else {
                              fealdOnChange("status", e.target.value);
                            }
                          }}
                          className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
                        >
                          <option value="" disabled hidden selected>
                            {status == "Enquiry" || type == "add"
                              ? "Enquiry"
                              : "Select Status"}
                          </option>
                          {leadsformtatus?.map((item) => {
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
                      )}
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
                      Interested Course*
                    </p>
                    <div className="lead_drop position-relative">
                      {fullData?.status == "Enrollement" ? (
                        <select
                          disabled
                          value={formFeald?.interested_course?._id || ""}
                          onChange={(e) => {
                            const selectedId = e.target.value;
                            const selectedCourse = courseList.find(
                              (s) => s._id == selectedId
                            );

                            fealdOnChange("interested_course", selectedCourse); // ⭐ Store FULL object
                          }}
                          className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
                        >
                          <option value="" disabled hidden>
                            Select Interested Course
                          </option>

                          {courseList?.map((item) => (
                            <option
                              key={item?._id}
                              value={item._id} // ⭐ Only ID goes inside <option>
                              className="light_gray w-100 rounded-2 px-2"
                            >
                              {item?.addcourse} {/* ⭐ Show course name */}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <select
                          disabled={type == "edit" && editbtn}
                          value={formFeald?.interested_course?._id || ""}
                          onChange={(e) => {
                            const selectedId = e.target.value;
                            const selectedCourse = courseList.find(
                              (s) => s._id == selectedId
                            );

                            fealdOnChange("interested_course", selectedCourse); // ⭐ Store FULL object
                          }}
                          className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
                        >
                          <option value="" disabled hidden selected>
                            Select Interested Course
                          </option>
                          {courseList?.map((item) => (
                            <option
                              key={item?._id}
                              value={item._id} // ⭐ Only ID goes inside <option>
                              className="light_gray w-100 rounded-2 px-2"
                            >
                              {item?.addcourse} {/* ⭐ Show course name */}
                            </option>
                          ))}
                        </select>
                      )}
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
                        Follow-up*
                      </p>
                      <div className="d-flex ac-jc input_one rounded-2 gap-3 px-2">
                        <div className="d-flex ac-jb w-50 gap-1 ">
                          <div className="insideinpput d-flex ac-jc">
                            <img src={calendar_icon} />
                          </div>
                          <input
                            disabled={type == "edit" && editbtn}
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
                            disabled={type == "edit" && editbtn}
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
                        Enrollement Date*
                      </p>
                      <div className="d-flex ac-js input_twoss rounded-2 px-2 gap-2">
                        <div className="insideinpput d-flex ac-jc">
                          <img src={calendar_icon} />
                        </div>
                        {fullData?.status == "Enrollement" ? (
                          <input
                            disabled
                            type={"date"}
                            value={fullData?.enrollement_date}
                            // onChange={(e) => {
                            //   fealdOnChange("enrollement_date", e.target.value);
                            // }}
                            placeholder="Conversion Date"
                            className="w-100  f4 black fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani"
                          />
                        ) : (
                          <input
                            disabled={type == "edit" && editbtn}
                            type={"date"}
                            value={formFeald?.enrollement_date}
                            onChange={(e) => {
                              fealdOnChange("enrollement_date", e.target.value);
                            }}
                            placeholder="Conversion Date"
                            className="w-100  f4 black fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani"
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </fieldset>
            </div>
            {!editbtn && (
              <div className="cust-sendbtn d-flex ac-jc w-100">
                <button
                  onClick={() => {
                    handleSubmit();
                  }}
                  className="btn-sub border-0 bg-primary3 white f4 fs-xxl-18 fs-xl-18 fs-lg-17 fs-sm-16 fs-xs-15 rounded-3 textani"
                >
                  {type == "add" ? "Submit" : "Update"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadAddScreen;
