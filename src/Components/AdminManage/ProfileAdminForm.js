import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileAdminForm = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [profileImage, setProfileImage] = useState(null); // Profile Image State

    const messagesEndRef = useRef(null);

    const navigate = useNavigate('')

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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="detaile-cont">
            <div className="mt-4 gap-4 d-flex ac-jc">
                <div className="w-70 d-flex inputcont ac-jb flex-column gap-4 pb-5">
                    <div className="left-box-cont ">
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
                                
                                {/* Profile Image Upload Field */}
                                <div className="w-45">
                                    <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                                        Profile Image
                                    </p>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="w-100 rounded-2 px-2"
                                    />
                                    {profileImage && (
                                        <div className="mt-2">
                                            <img
                                                src={profileImage}
                                                alt="Profile Preview"
                                                className="rounded-circle border w-20 h-20"
                                            />
                                        </div>
                                    )}
                                </div>

                            </div>

                            <div className="cust-sendbtn d-flex ac-je w-100 py-5 gap-3">
                                <button
                                    className="btn-sub border-0 bg-primary3 white f5 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-12 rounded-3 textani px-5 py-2"
                                    disabled={password !== confirmPassword || password === ""}
                                >
                                    Save
                                </button>
                                <button onClick={()=>{ navigate("/otp-resetpassword") }}
                                    className="btn-sub border-0 underline red  f5 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-12 rounded-3 textani py-2">
                                    Reset Password
                                </button>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileAdminForm;
