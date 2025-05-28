
import React, { useEffect, useRef, useState } from "react";
import { staffstatus } from "../Data/DummyJson";
import { useAddStaffMutation, useEditStaffMutation, useLazyParticularviewStaffQuery, } from "../Data/Api/api";
import { toast } from "react-toastify";
import { Edit2Icon, Eye, EyeOff } from "lucide-react";
import { useLocation } from "react-router-dom";

const StaffDetailsForm = ({ setStaffViewPro, setStaffName, staffName,
    setStaffEmail, staffEmail,
    setStaffPhone, staffPhone,
    setStaffRole, staffRole,
    setLoading, loading,
    id,
    editStafffun
 }) => {


    const [addStaffApi] = useAddStaffMutation();

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

    // Staff api (post method)
    const addStafffun = () => {
        setLoading(true)
        const payload = {
            "name": staffName,
            "email": staffEmail,
            "phone": staffPhone,
            "role": staffRole,

        }
        addStaffApi(payload).unwrap().then(res => {
            // console.log("res", res);
            toast.success(res?.message || "login Successfully")

        }).catch(err => {
            // console.log('err', err);


        }).finally(() => {
            setLoading(false)

        })


    }
    // Role api call
    const staffRolefun = (e) => {
        // console.log(e, e.target.value);
        setStaffRole(e.target.value)
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="detaile-cont ac-jc ">

            <div className="ac-jc mt-4 gap-4  d-flex">
                <div className="w-70 d-flex inputcont ac-jc flex-column gap-4 pb-5">
                    <div className="left-box-cont ac-jc">
                        <fieldset className="out-input rounded-5 ac-jc ps-md-5 pe-md-5 px-3 pt-4 pb-5">
                            <legend className="f3 px-1 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani black mb-0">
                                Staff
                            </legend>
                            <div className="d-flex w-100 ac-jb flex-wrap gap-3">
                                <div className="w-45">
                                    <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                                        Full Name
                                    </p>
                                    <input className="w-100 rounded-2 px-2" value={staffName} onChange={(e) => { setStaffName(e.target.value) }} />
                                </div>
                                <div className="w-45">
                                    <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                                        E-mail Address
                                    </p>
                                    <input className="w-100 rounded-2 px-2" value={staffEmail} onChange={(e) => { setStaffEmail(e.target.value) }} />
                                </div>
                                <div className="w-45">
                                    <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                                        Phone Number
                                    </p>
                                    <input className="w-100 rounded-2 px-2" value={staffPhone} onChange={(e) => { setStaffPhone(e.target.value) }} />
                                </div>
                                <div className="w-45">
                                    <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                                        Role
                                    </p>
                                    <div className="lead_drop">
                                        <select value={staffRole} onChange={staffRolefun} className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13">
                                            <option value="" disabled hidden>
                                                Select Status
                                            </option>
                                            {staffstatus?.map((item) => (
                                                <option key={item.id} className="light_gray w-100 rounded-2 px-2" value={item.name}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Password Field */}
                                {/* <div className="w-45 position-relative">
                                     <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                                         Password
                                     </p>
                                     <div className="position-relative">
                                         <input
                                             type={showPassword ? "text" : "password"}
                                             className="w-100 rounded-2 px-2 pr-5"
                                             value={password}
                                             onChange={handlePasswordChange}
                                         />
                                         <button
                                             type="button"
                                             onClick={toggleShowPassword}
                                             className="position-absolute end-0 top-50 translate-middle-y me-2 bg-transparent border-0"
                                             style={{ cursor: "pointer" }}
                                         >
                                             {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                         </button>
                                     </div>
                                 </div> */}

                                {/* Confirm Password Field */}
                                {/* <div className="w-45 position-relative">
                                     <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                                         Confirm Password
                                     </p>
                                     <div className="position-relative">
                                         <input
                                             type={showConfirmPassword ? "text" : "password"}
                                             className="w-100 rounded-2 px-2 pr-5"
                                             value={confirmPassword}
                                             onChange={handleConfirmPasswordChange}
                                         />
                                         <button
                                             type="button"
                                             onClick={toggleShowConfirmPassword}
                                             className="position-absolute end-0 top-50 translate-middle-y me-2 bg-transparent border-0"
                                             style={{ cursor: "pointer" }}
                                         >
                                             {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                         </button>
                                     </div>
                                     {passwordError && <p className="text-danger mt-1">{passwordError}</p>}
                                 </div> */}
                            </div>


                            <div className="cust-sendbtn d-flex ac-jc w-100 p-5">
                                <button
                                    className="btn-sub border-0 bg-primary3 white f5 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-12 rounded-3 textani px-4 py-2"
                                    // disabled={password !== confirmPassword || password === ""}
                                    onClick={() => {
                                        editStafffun()
                                    }}
                                >

                                    Save
                                </button>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffDetailsForm;
