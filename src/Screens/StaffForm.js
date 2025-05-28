import React, { useEffect, useState } from "react";
import { staffstatus } from "../Data/DummyJson";
import { useAddStaffMutation, useLazyViewrolesQuery } from "../Data/Api/api";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageLoad from "../Components/Loading/PageLoad";

const StaffForm = () => {
  const navigate = useNavigate();
  const [addStaffApi] = useAddStaffMutation();
  const [roleListApi] = useLazyViewrolesQuery();

  const [formData, setFormData] = useState({
    staffName: "",
    staffEmail: "",
    staffPhone: "",
    staffRole: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roleList, setRoleList] = useState([]);

  const inputFields = [
    {
      name: "staffName",
      placeholder: "Name",
      label: "Full Name*",
      type: "text",
    },
    {
      name: "staffEmail",
      placeholder: "Email",
      label: "E-mail Address*",
      type: "email",
    },
    {
      name: "staffPhone",
      placeholder: "Phone",
      label: "Phone Number*",
      type: "number ",
    },
  ];

  const passwordFields = [
    {
      name: "password",
      label: "Password",
      placeholder: "password",
      show: showPassword,
      toggle: setShowPassword,
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      placeholder: "Confirm Password",
      show: showConfirmPassword,
      toggle: setShowConfirmPassword,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update formData
    setFormData((prev) => ({ ...prev, [name]: value }));

    let newErrors = { ...errors };

    // Real-time validation for Name
    if (name === "staffName") {
      newErrors.staffName = value.trim() ? "" : "Name is required";
    }

    // Real-time validation for Email
    if (name === "staffEmail") {
      newErrors.staffEmail = !value.trim()
        ? "Valid email is required"
        : !/\S+@\S+\.\S+/.test(value)
        ? "Invalid email format"
        : "";
    }

    // Real-time validation for Phone
    if (name === "staffPhone") {
      newErrors.staffPhone = !value.trim()
        ? "Phone number is required"
        : !/^[6-9]\d{9}$/.test(value)
        ? "Valid 10-digit phone number required"
        : "";
    }

    // Real-time validation for Role
    if (name === "staffRole") {
      newErrors.staffRole = value ? "" : "Role is required";
    }

    // Real-time validation for Password
    if (name === "password") {
      newErrors.password = !value
        ? "Password is required"
        : value.length < 6
        ? "Password must be at least 6 characters"
        : !/[A-Z]/.test(value)
        ? "Password must contain at least one uppercase letter"
        : !/[a-z]/.test(value)
        ? "Password must contain at least one lowercase letter"
        : !/[0-9]/.test(value)
        ? "Password must contain at least one number"
        : !/[@$!%*?&]/.test(value)
        ? "Password must include at least one special character"
        : "";
    }

    // Real-time validation for Confirm Password
    if (name === "confirmPassword") {
      newErrors.confirmPassword =
        value !== formData.password ? "Passwords do not match" : "";
    }

    // Update the errors state with the new error messages
    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.staffName.trim()) {
      newErrors.staffName = "Name is required";
    }

    // Email validation
    if (
      !formData.staffEmail.trim() ||
      !/\S+@\S+\.\S+/.test(formData.staffEmail)
    ) {
      newErrors.staffEmail = "Valid email is required";
    }

    // Phone validation
    if (
      !formData.staffPhone.trim() ||
      !/^[6-9]\d{9}$/.test(formData.staffPhone)
    ) {
      newErrors.staffPhone = "Valid 10-digit phone number required";
    }

    // Role validation
    if (!formData.staffRole) {
      newErrors.staffRole = "Role is required";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one lowercase letter";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    } else if (!/[@$!%*?&]/.test(formData.password)) {
      newErrors.password =
        "Password must include at least one special character (@, $, !, %, *, ?, &)";
    }

    // Confirm password validation
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addStafffun = () => {
    if (!validateForm()) return;
    const payload = {
      name: formData.staffName,
      email: formData.staffEmail,
      phone: formData.staffPhone,
      role: formData.staffRole,
      password: formData.password,
    };
    setLoading(true);
    // console.log("payload", payload);
    addStaffApi(payload)
      .unwrap()
      .then((res) => {
        // console.log("res", res);
        toast.success(res?.message || "Staff added successfully");
        navigate(-1);
      })
      .catch((err) => {
        // console.log("Err", err);
        toast.error(err?.data?.error || err?.data?.error || "BAD_REQUEST");
        // console.error("Error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getrolesFun = () => {
    roleListApi()
      .unwrap()
      .then((res) => {
        // console.log("Res", res);
        setRoleList(res?.data);
      })
      .catch((err) => {
        // console.log("Err", err);
      });
  };

  useEffect(() => {
    getrolesFun();
  }, []);

  return (
    <>
      {loading && <PageLoad />}
      <div className="detaile-cont">
        <div className="as-jb mt-4 gap-4">
          <div className="w-70 d-flex inputcont ac-jb flex-column gap-4 pb-5">
            <div className="left-box-cont">
              <fieldset className="out-input rounded-5 ac-jc ps-md-5 pe-md-5 px-3 pt-4 pb-5">
                <legend className="f3 px-1 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani black mb-0">
                  New Staff
                </legend>
                <div className="d-flex w-100 ac-jb flex-wrap gap-3">
                  {/* Input Fields */}
                  {inputFields.map((field) => (
                    <div className="w-45 position-relative" key={field.name}>
                      <p className="f6 px-1 primary2 mb-0">{field.label}</p>
                      <input
                        name={field.name}
                        type={field.type}
                        className="w-100 rounded-2 px-2"
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field?.placeholder}
                      />
                      {errors[field.name] && (
                        <div className="error">
                          <p className="mb-0 red f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani ">
                            {errors[field.name]}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Select Role */}
                  <div className="w-45 position-relative">
                    <p className="f6 px-1 primary2 mb-0">Role*</p>
                    <div className="lead_drop">
                      <select
                        name="staffRole"
                        value={formData.staffRole}
                        onChange={handleChange}
                        className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3"
                      >
                        <option value="" disabled hidden>
                          Select Role
                        </option>
                        {roleList?.map((item) => (
                          <option key={item._id} value={item.addroles}>
                            {item.addroles}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.staffRole && (
                      <div className="error">
                        <p className="mb-0 red f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani ">
                          {errors.staffRole}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Password Fields */}
                  {passwordFields.map((field) => (
                    <div
                      className="w-45 position-relative position-relative"
                      key={field.name}
                    >
                      <p className="f6 px-1 primary2 mb-0">{field.label}*</p>
                      <div className="position-relative">
                        <input
                          placeholder={field?.placeholder}
                          name={field.name}
                          type={field.show ? "text" : "password"}
                          className="w-100 rounded-2 px-2 pr-5"
                          value={formData[field.name]}
                          onChange={handleChange}
                        />
                        <button
                          type="button"
                          onClick={() => field.toggle((prev) => !prev)}
                          className="position-absolute end-0 top-50 translate-middle-y me-2 bg-transparent border-0"
                          style={{ cursor: "pointer" }}
                        >
                          {field.show ? (
                            <Eye size={18} />
                          ) : (
                            <EyeOff size={18} />
                          )}
                        </button>
                      </div>
                      {errors[field.name] && (
                        <div className="error">
                          <p className="mb-0 red f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani ">
                            {errors[field.name]}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Submit Button */}
                <div className="cust-sendbtn d-flex ac-jc w-100 p-5">
                  <button
                    className="btn-sub border-0 bg-primary3 white f5 rounded-3 textani px-4 py-2"
                    onClick={addStafffun}
                    disabled={loading}
                  >
                    {loading ? "Please wait..." : "Add"}
                  </button>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffForm;
