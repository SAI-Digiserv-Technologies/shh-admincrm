import React, { useState } from "react";
import {
  check,
  Cylinder,
  no_view,
  otpbg,
  otpresetbg,
  resetgirl,
  shh_logo,
  Thorus_Knot,
  view,
} from "../assets/images";
import { useNavigate } from "react-router-dom";

const ResetPasswordotpScreen = () => {
  const navigate = useNavigate();
  const [formFeald, setFormFeald] = useState({
    email: "",
    otp: "",
  });

  const [errors, setErrors] = useState({});

  const fealdOnChange = (field, value) => {
    console.log("field, value", field, value);
    setFormFeald((state) => ({
      ...state,
      [field]: value,
    }));
    validateInput(field, value);
  };
  const validateInput = (field, value) => {
    let errorMsg = "";
    const stringValue = String(value).trim();
    console.log("stringValue", stringValue);
    switch (field) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!stringValue) {
          errorMsg = "E-mail Address is required !";
        } else if (!emailRegex.test(stringValue)) {
          errorMsg = "Enter a valid E-mail Address !";
        }
        break;
      case "otp":
        if (!stringValue) {
          errorMsg = "Otp is required !";
        }
        break;
      default:
        break;
    }

    console.log("errorMsg", errorMsg);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMsg,
    }));

    return !errorMsg;
  };

  const submitHandler = () => {
    const isValid = Object.keys(formFeald).every((field) =>
      validateInput(field, formFeald[field])
    );
    if (isValid) {
      navigate("/resetpassword");
    }
  };
  return (
    <div className="otpresetpass-cont d-flex ac-jc">
      <div className="top-img tranc">
        <img alt="Thorus_Knot" src={otpbg} />
      </div>
      <div className="bottom-img tranc">
        <img alt="Cylinder" src={otpresetbg} />
      </div>
      <div className="form-layer w-md-40 w-90 rounded-5 flex-column d-flex ac-js pt-5">
        <div className="w-100 px-5 d-flex ac-jc flex-column">
          <div className="logo-cont">
            <img src={shh_logo} alt="logo" />
          </div>
          <p className="f7 dark_primary fs-xxl-28 fs-xl-28 fs-lg-20 fs-sm-18 fs-xs-18 textani mb-0">
            Reset Password
          </p>
        </div>
        <div className="w-md-70 w-90">
          <div className="input-form w-100 mt-3">
            <p className="f6 primary2 fs-xxl-14 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 textani mb-1">
              E-mail Address
            </p>
            <input
              placeholder="Email"
              value={formFeald?.email}
              onChange={(e) => fealdOnChange("email", e.target.value)}
              className="rounded-1 px-2 w-100 f4 black fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani "
            />
            <div className="error">
              <p className="mb-0 red f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani ">
                {errors?.email}
              </p>
            </div>
          </div>
          <div className="otpinput-form w-100 d-flex ac-jc mt-4">
            <input
              type="number"
              value={formFeald?.password}
              onChange={(e) => fealdOnChange("otp", e.target.value)}
              placeholder="Enter OTP"
              className="rounded-1 px-2 w-md-60 f4 black fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani "
            />
            <div className="error d-flex ac-jc w-100">
              <p className="mb-0 red f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani ">
                {errors?.password}
              </p>
            </div>
          </div>
          <div className="w-100 d-flex ac-jc mt-4">
            <button
              onClick={() => {
                submitHandler();
              }}
              className="white border-0 btns rounded-5 px-md-5 px-5 f2 fs-xxl-16 fs-xl-16 fs-lg-15 fs-sm-13 fs-xs-13 textani"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordotpScreen;
