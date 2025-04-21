import React, { useEffect, useRef, useState } from "react";
import { staffstatus } from "../Data/DummyJson";
import { useAddStaffMutation, useLazyViewStaffQuery } from "../Data/Api/api";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

const StaffForm = () => {
    const [addStaffApi] = useAddStaffMutation();
    const [editStaffApi] = useLazyViewStaffQuery();


    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    //staff 
    const [staffName, setStaffName] = useState('');
    const [staffEmail, setStaffEmail] = useState('');
    const [staffPhone, setStaffPhone] = useState('');
    const [staffRole, setStaffRole] = useState('');
    const [loading, setLoading] = useState('');

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
            "password": password,

        }
        addStaffApi(payload).unwrap().then(res => {
            console.log("res", res);
            toast.success(res?.message || "login Successfully")

        }).catch(err => {
            console.log('err', err);


        }).finally(() => {
            setLoading(false)

        })


    }
    // Role api call
    const staffRolefun = (e) => {
        console.log(e, e.target.value);
        setStaffRole(e.target.value)
    }

     // edit staff api ( put method )
     const editStafffun = () => {
        const payload = {
            "email": staffEmail,
            "password": password,
        }
        const id="67f4e981569f08895efef0f0"
        setLoading(true)

        editStaffApi(id, payload)
            .unwrap()
            .then(res => {
                console.log("res", res);


            }).catch(err => {
                console.log("err", err);


            }).finally(() => {
                setLoading(false)
            })
    }


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    // password api
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const toggleShowPassword = () => setShowPassword((prev) => !prev);
    // confirm password api
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (e.target.value !== password) {
            setPasswordError("Passwords do not match!");
        } else {
            setPasswordError("");
        }
    };

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

    return (
        <div className="detaile-cont">
            <div className="as-jb mt-4 gap-4">
                <div className="w-70 d-flex inputcont ac-jb flex-column gap-4 pb-5">
                    <div className="left-box-cont">
                        <fieldset className="out-input rounded-5 ac-jc ps-md-5 pe-md-5 px-3 pt-4 pb-5">
                            <legend className="f3 px-1 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani black mb-0">
                                New Staff
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
                                <div className="w-45 position-relative">
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
                                </div>

                                {/* Confirm Password Field */}
                                <div className="w-45 position-relative">
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
                                </div>
                            </div>

                            <div className="cust-sendbtn d-flex ac-jc w-100 p-5">
                                <button
                                    className="btn-sub border-0 bg-primary3 white f5 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-12 rounded-3 textani px-4 py-2"
                                    // disabled={password !== confirmPassword || password === ""}
                                    onClick={() => {
                                        addStafffun()
                                    }}
                                >
                                    Add
                                </button>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffForm;
