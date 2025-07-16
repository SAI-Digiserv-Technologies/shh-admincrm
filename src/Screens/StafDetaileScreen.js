import React, { useEffect, useRef, useState } from "react";
import { profileFieald } from "../Data/DummyJson";
import { useLocation, useNavigate } from "react-router-dom";
import useToken from "../Data/Local/userToken";
import useUser from "../Data/Local/userDetail";
import {
  useEditStaffMutation,
  useLazyParticularviewStaffQuery,
  useLazyTelecaller_viewQuery,
  useLazyViewrolesQuery,
  useProfileEditMutation,
  useLazyGetStaffAttendanceByIdQuery,
} from "../Data/Api/api";
import { toast } from "react-toastify";
import PageLoad from "../Components/Loading/PageLoad";
import ProfileTop from "../Components/StaffManage/ProfileTop";
import ActivePoppup from "../Components/StaffManage/ActivePoppup";

const StafDetaileScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location?.state?.data;

  const [formFeald, setFormFeald] = useState({
    name: "",
    email: "",
    phoneno: "",
    role: "",
  });
  const [loading, setLoadin] = useState(true);
  const [errors, setErrors] = useState({});
  const [edit, setEdit] = useState(false);
  const [fullData, setFullData] = useState(null);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imageObj, setImageObj] = useState(null);
  const [active, setAcvtive] = useState(null);
  const [activePoppup, setAcvtivePoppup] = useState(false);
  const [rolelist, setRoleList] = useState([]);
  const [attendanceData, setAttendanceData] = useState(null);
  const [attLoading, setAttLoading] = useState(false);
  const [getAttendanceApi] = useLazyGetStaffAttendanceByIdQuery();
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  const [filteredAttendance, setFilteredAttendance] = useState([]);

  //   Api
  const [profile_viewApi] = useLazyParticularviewStaffQuery();
  const [profileEditApi] = useEditStaffMutation();
  const [roleListApi] = useLazyViewrolesQuery();

  // ✅ UTC to IST Conversion
  const convertUtcToIst = (timeStr) => {
    if (!timeStr || typeof timeStr !== "string") return "-";

    const cleaned = timeStr.replace(/[^0-9.:]/g, "").replace(".", ":").trim();
    const [hourStr, minStr] = cleaned.split(":");
    let hours = parseInt(hourStr, 10);
    let minutes = parseInt(minStr, 10);

    if (isNaN(hours) || isNaN(minutes)) return "-";

    // Add 5 hours 30 mins to convert UTC -> IST
    let totalMinutes = hours * 60 + minutes + 330;

    if (totalMinutes >= 1440) totalMinutes -= 1440;

    const istHours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
    const istMinutes = String(totalMinutes % 60).padStart(2, "0");

    return `${istHours}:${istMinutes}`;
  };

  // ✅ Calculate Total Working Hours
  const calculateTotalHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return "-";

    const inTime = convertUtcToIst(checkIn);
    const outTime = convertUtcToIst(checkOut);

    const [inHour, inMin] = inTime.split(":").map(Number);
    const [outHour, outMin] = outTime.split(":").map(Number);

    const inTotal = inHour * 60 + inMin;
    const outTotal = outHour * 60 + outMin;

    let total = outTotal >= inTotal
      ? outTotal - inTotal
      : outTotal + 1440 - inTotal;

    const hrs = Math.floor(total / 60);
    const mins = total % 60;

    return `${hrs}h ${mins}m`;
  };
  console.log("Filtered attendance with calculations:", filteredAttendance.map(item => ({
    ...item,
    calculatedHours: calculateTotalHours(item.checkIn, item.checkOut)
  })));

  // Filter attendance when attendanceData or filter dates change
  useEffect(() => {
    if (!attendanceData?.attendance) {
      setFilteredAttendance([]);
      return;
    }

    let filtered = attendanceData.attendance;

    if (filterStartDate) {
      filtered = filtered.filter(
        (item) => new Date(item.date) >= new Date(filterStartDate)
      );
    }
    if (filterEndDate) {
      filtered = filtered.filter(
        (item) => new Date(item.date) <= new Date(filterEndDate)
      );
    }
    setFilteredAttendance(filtered);
  }, [attendanceData, filterStartDate, filterEndDate]);

  const fealdOnChange = (field, value) => {
    setFormFeald((state) => ({
      ...state,
      [field]: value,
    }));
    validateInput(field, value);
  };

  const fetchAttendance = () => {
    if (!data?._id) return;
    setAttLoading(true);
    getAttendanceApi(data._id)
      .unwrap()
      .then((res) => {
        console.log("Attendance data received:", res);
        setAttendanceData(res);
      })
      .catch((err) => {
        console.error("Attendance fetch error", err);
      })
      .finally(() => {
        setAttLoading(false);
      });
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
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMsg,
    }));

    return !errorMsg;
  };

  const handleSubmit = () => {
    const isValid = Object.keys(formFeald).every((field) =>
      validateInput(field, formFeald[field])
    );
    if (isValid) {
      setEdit(false);
    }
  };

  const getUserDataFun = () => {
    setLoadin(true);
    const id = data?._id;
    profile_viewApi(id)
      .unwrap()
      .then((res) => {
        setFullData(res);
        setFormFeald({
          name: res?.name,
          email: res?.email,
          phoneno: res?.phone,
          role: res?.role,
        });
        setImage(res?.profileimage);
        setAcvtive(res?.active);
        roleListApi()
          .unwrap()
          .then((res) => {
            setRoleList(res?.data);
          })
          .catch((err) => {
            console.log("Role list error:", err);
          });
      })
      .catch((err) => {
        console.log("User data error:", err);
      })
      .finally(() => {
        setLoadin(false);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageObj(file);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const editToggle = (item, type) => {
    if (item == "save") {
      setLoadin(true);
      let formdata = new FormData();
      formdata.append("name", formFeald?.name);
      formdata.append("role", formFeald?.role);
      {
        type == "yes" && formdata.append("active", active ? false : true);
      }
      if (imageObj) {
        formdata.append("image", imageObj);
      }
      const payload = {
        name: formFeald?.name,
        role: formFeald?.role,
        active: active ? false : true,
      };

      for (let [key, value] of formdata.entries()) {
        console.log(`${key}:`, value);
      }
      const id = data?._id;
      profileEditApi({ formdata: formdata, id: id })
        .unwrap()
        .then((res) => {
          toast.success(res?.message || "Telecaller updated successfully");
          if (!activePoppup) {
            setEdit(!edit);
          }
          getUserDataFun();
        })
        .catch((err) => {
          console.log("Edit error:", err);
        })
        .finally(() => {
          setLoadin(false);
        });
    } else {
      setEdit(!edit);
    }
  };

  useEffect(() => {
    getUserDataFun();
    fetchAttendance();
  }, []);

  const toggleActiveFun = (type) => {
    if (type == "btn") {
      setAcvtivePoppup(true);
    } else if (type == "yes") {
      setAcvtivePoppup(false);
      setLoadin(true);
      editToggle("save", type);
    } else if (type == "no") {
      setAcvtivePoppup(false);
    }
  };

  return (
    <>
      {loading ? (
        <PageLoad />
      ) : (
        <div className="d-flex flex-column ac-jc pro-ss">
          {activePoppup && (
            <ActivePoppup
              cont={!active ? "Active" : "Deactivate"}
              poppupHandle={toggleActiveFun}
            />
          )}

          {!loading && (
            <ProfileTop
              toggleActiveFun={toggleActiveFun}
              active={active}
              image={image}
              edit={edit}
              editToggle={editToggle}
              handleButtonClick={handleButtonClick}
              handleImageChange={handleImageChange}
              fileInputRef={fileInputRef}
              fullData={fullData}
            />
          )}
          {edit && (
            <div className="w-50 my-4">
              <fieldset className="out-input w-100 rounded-5 d-flex ac-jc flex-column  ps-md-5 pe-md-5 px-3 pt-4">
                <legend className="f3 px-1 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani black mb-0">
                  Staff Edit
                </legend>
                <div className="w-90">
                  {profileFieald?.map((item) => {
                    return (
                      <>
                        {item?.type == "select" ? (
                          <div className="w-100 lead_drop position-relative mx-3">
                            <p className="f6 px-1 mb-2 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2">
                              {item?.lable}
                            </p>
                            <select
                              value={formFeald?.[item?.formFeald] || ""}
                              onChange={(e) => {
                                fealdOnChange(item?.formFeald, e.target.value);
                              }}
                              className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13 black"
                            >
                              <option value="" disabled hidden selected>
                                Select {item?.lable}
                              </option>
                              {rolelist?.map((option) => (
                                <option
                                  key={option?._id}
                                  className="light_gray w-100 rounded-2 px-2"
                                  value={option?.addroles}
                                >
                                  {option?.addroles}
                                </option>
                              ))}
                            </select>
                            <div className="error">
                              <p className="mb-2 red f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani ">
                                {errors?.[item?.formFeald]}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="w-100 position-relative mx-3">
                            <p className="f6 px-1 mb-2 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2">
                              {item?.lable}
                            </p>
                            <input
                              type={item?.type}
                              value={formFeald?.[item?.formFeald]}
                              onChange={(e) => {
                                fealdOnChange(item?.formFeald, e.target.value);
                              }}
                              disabled={
                                edit && item?.formFeald !== "email"
                                  ? false
                                  : item?.formFeald == "email" && true
                              }
                              placeholder={item?.placeholder}
                              className={`${edit ? "opacity-100" : "opacity-50"} w-100 px-2 rounded-2 mb-2 f4 black fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani`}
                            />

                            <div className="error">
                              <p className="mb-2 red f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani ">
                                {errors?.[item?.formFeald]}
                              </p>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })}
                </div>
                <div className="position-relative d-flex ac-jc my-4 w-100">
                </div>
              </fieldset>
            </div>
          )}
        </div>
      )}
      {!loading && !attLoading && attendanceData?.attendance && attendanceData.attendance.length > 0 && (
        <div className="my-4 w-75 mx-auto">
          <h4 className="mb-3 f3 fs-xxl-20 fs-xl-18 fs-lg-17 fs-sm-16 fs-xs-15 black">
            Attendance History
          </h4>

          {/* Date filters */}
          <div className="d-flex mb-3 gap-3 align-items-center">
            <div>
              <label htmlFor="startDate" className="me-2">
                Start Date:
              </label>
              <input
                type="date"
                id="startDate"
                value={filterStartDate}
                onChange={(e) => setFilterStartDate(e.target.value)}
                className="form-control"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="me-2">
                End Date:
              </label>
              <input
                type="date"
                id="endDate"
                value={filterEndDate}
                onChange={(e) => setFilterEndDate(e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          <table className="table table-bordered table-hover">
            <thead className="bg-light">
              <tr>
                <th>Date</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Total Hours</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{convertUtcToIst(item.checkIn)}</td>
                  <td>{convertUtcToIst(item.checkOut)}</td>
                  <td>{calculateTotalHours(item.checkIn, item.checkOut)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      )}
    </>
  );
};

export default StafDetaileScreen;