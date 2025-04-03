import React, { useEffect, useRef, useState } from "react";
import { staffstatus } from "../Data/DummyJson";

const StaffForm = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

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

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (e.target.value !== password) {
            setPasswordError("Passwords do not match!");
        } else {
            setPasswordError("");
        }
    };

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
                                        Role
                                    </p>
                                    <div className="lead_drop">
                                        <select className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13">
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
                                <div className="w-45">
                                    <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                                        Password
                                    </p>
                                    <input
                                        type="password"
                                        className="w-100 rounded-2 px-2"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                </div>

                                {/* Confirm Password Field */}
                                <div className="w-45">
                                    <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                                        Confirm Password
                                    </p>
                                    <input
                                        type="password"
                                        className="w-100 rounded-2 px-2"
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                    />
                                    {passwordError && <p className="text-danger mt-1">{passwordError}</p>}
                                </div>
                            </div>

                            <div className="cust-sendbtn d-flex ac-jc w-100 p-5">
                                <button
                                    className="btn-sub border-0 bg-primary3 white f5 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-12 rounded-3 textani px-4 py-2"
                                    disabled={password !== confirmPassword || password === ""}
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
