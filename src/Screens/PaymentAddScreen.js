import React, { useEffect, useState } from "react";
import PageLoad from "../Components/Loading/PageLoad";
import { useLocation, useNavigate } from "react-router-dom";
import { proof_img } from "../assets/images";
import {
  useLazyPaymentproofviewQuery,
  usePaymentaddMutation,
} from "../Data/Api/api";
import { toast } from "react-toastify";

const PaymentAddScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const type = location?.state?.type;
  const routData = location?.state?.data;
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState(null);

  console.log("routData", routData);
  const leadID = routData?.data;

  const [formFeald, setFormFeald] = useState({
    name: "",
    course: "",
    amount: "",
    paidAmount: "",
    balanceAmount: "",
    mode: "",
    email: "",
    transactionId: "",
  });

  // Api
  const [paymentproofView] = useLazyPaymentproofviewQuery();
  const [paymentAdd] = usePaymentaddMutation();

  const fealdOnChange = (field, value) => {
    setFormFeald((state) => ({
      ...state,
      [field]: value,
    }));

    // Trigger validation for the current field
    validateInput(field, value);
  };

  const validateInput = (field, value) => {
    let errorMsg = "";
    const stringValue = String(value).trim();

    switch (field) {
      case "name":
        if (!stringValue) errorMsg = "Name is required!";
        break;
      case "course":
        if (!stringValue) errorMsg = "Course is required!";
        break;
      case "amount":
        if (!stringValue) {
          errorMsg = "Amount is required!";
        } else if (isNaN(Number(stringValue)) || Number(stringValue) <= 0) {
          errorMsg = "Enter a valid amount!";
        }
        break;
      case "paidAmount":
        if (!stringValue) {
          errorMsg = "Paid Amount is required!";
        } else if (isNaN(Number(stringValue)) || Number(stringValue) < 0) {
          errorMsg = "Enter a valid paid amount!";
        }
        break;
      case "balanceAmount":
        if (!stringValue) {
          errorMsg = "Balance Amount is required!";
        } else if (isNaN(Number(stringValue)) || Number(stringValue) < 0) {
          errorMsg = "Enter a valid balance amount!";
        }
        break;
      case "mode":
        if (!stringValue) errorMsg = "Mode is required!";
        break;
      case "email":
        if (!stringValue) {
          errorMsg = "Email is required!";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stringValue)) {
          errorMsg = "Enter a valid Email!";
        }
        break;
      case "transactionId":
        if (formFeald.mode !== "Cash on Delivery" && !stringValue) {
          errorMsg = "Transaction ID is required for online payments!";
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

  const fields = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Enter Name",
      disable: true,
    },
    {
      label: "Course",
      name: "course",
      type: "text",
      placeholder: "Enter Course",
      disable: true,
    },
    {
      label: "Cource Amount",
      name: "courceamount",
      type: "number",
      placeholder: "Cource Amount",
      disable: true,
    },
    {
      label: "Amount",
      name: "amount",
      type: "number",
      placeholder: "Enter Amount",
      disable: false,
    },
    {
      label: "Paid Amount",
      name: "paidAmount",
      type: "number",
      placeholder: "Enter Paid Amount",
      disable: true,
    },
    {
      label: "Balance Amount",
      name: "balanceAmount",
      type: "number",
      placeholder: "Enter Balance Amount",
      disable: true,
    },
    {
      label: "Email ID",
      name: "email",
      type: "email",
      placeholder: "Enter Email ID",
      disable: true,
    },
    {
      label: "Mode",
      name: "mode",
      type: "text",
      disable: true,
      // options: [
      //   {
      //     value: "Cash on Delivery",
      //     label: "Cash on Delivery",
      //   },
      //   {
      //     value: "Online",
      //     label: "Online",
      //   },
      // ],
      placeholder: "Select Mode",
    },
    {
      label: "Transaction ID",
      name: "transactionId",
      type: "text",
      placeholder: "Enter Transaction ID",
    },
  ];

  const proofViewfun = () => {
    setLoading(true);
    const id = routData?._id;
    console.log("idroutData?._id;", routData, routData?._id);
    paymentproofView(id)
      .unwrap()
      .then((res) => {
        console.log("proviewres", res);
        setPaymentData(res?.data);
        setFormFeald({
          name: res?.data?.lead?.name,
          course: res?.data?.lead?.interested_course?.addcourse,
          courceamount: res?.data?.lead?.interested_course?.amount,
          // amount: "4000",
          paidAmount: "1000",
          balanceAmount: "10000",
          mode: res?.data?.payment_proof?.paymentmethood,
          email: res?.data?.lead?.email,
          // transactionId: "",
        });
      })
      .catch((err) => {
        console.log("Err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  console.log("paymentData", paymentData);

  const lead = paymentData?.lead;
  const payment_proof = paymentData?.payment_proof;

  console.log("payment_prleadoof", payment_proof, lead);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Validate all fields before submitting
    let isValid = true;

    Object.keys(formFeald).forEach((field) => {
      const isFieldValid = validateInput(field, formFeald[field]);
      if (!isFieldValid) isValid = false;
    });

    if (isValid) {
      // setLoading(true);
      const payload = {
        leadId: leadID,
        name: lead?.name,
        interested_course: lead?.interested_course,
        amount: formFeald?.amount,
        paid_amount: formFeald?.paidAmount,
        balance_amount: formFeald?.balanceAmount,
        mode_of_amount: payment_proof?.paymentmethood,
        transaction_id: formFeald?.transactionId || "",
        payment_status: "Varifid",
        // remarks: "First installment",
      };
      console.log("payload", payload);
      console.log("payloadlead", lead);
      console.log("payloadleadpayment_proof", payment_proof);
      paymentAdd(payload)
        .unwrap()
        .then((res) => {
          console.log("Addres", res);
          toast.success(res?.message || "Payment saved successfully");
          navigate(-1);
        })
        .catch((err) => {
          console.log("adderr", err);
        });

      // navigate("/payment-success", { state: { data: formFeald } }); // Example: Navigate to a success page
    }
  };

  useEffect(() => {
    proofViewfun();
  }, []);

  return (
    <div className="detaile-cont">
      {loading && <PageLoad />}
      <div className="d-flex as-jb mt-1 gap-4 det-layer">
        <div className="w-70 d-flex inputcont ac-jb flex-column gap-4 pb-5">
          <div className="left-box-cont">
            <fieldset className="out-input rounded-5 d-flex ac-jc ps-md-5 pe-md-5 px-3 pt-4 pb-5 position-relative">
              <legend className="f3 px-1 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani black mb-0">
                Payment Details
              </legend>

              <div className="d-flex w-100 ac-jb flex-wrap gap-3">
                {fields.map((field) =>
                  field.name == "modes" ? (
                    // Mode Field (rendered as a select dropdown)
                    <div
                      className="w-45 position-relative lead_drop"
                      key={field.name}
                    >
                      <p className="f6 px-1 primary2 mb-0">Mode</p>
                      <select
                        value={formFeald.mode}
                        onChange={(e) => fealdOnChange("mode", e.target.value)}
                        className="w-100 rounded-2 px-2 f4 black"
                      >
                        <option value="">Select Mode</option>
                        <option value="Cash on Delivery">
                          Cash on Delivery
                        </option>
                        <option value="Online">Online</option>
                      </select>
                      {errors.mode && (
                        <div className="error">
                          <p className="mb-0 red f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani ">
                            {errors.mode}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    // Other Fields (rendered as regular input)
                    <div className="w-45 position-relative" key={field.name}>
                      <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                        {field.label}
                      </p>
                      <input
                        disabled={field?.disable}
                        type={field.type}
                        value={formFeald[field.name]}
                        onChange={(e) =>
                          fealdOnChange(field.name, e.target.value)
                        }
                        placeholder={field.placeholder}
                        className="w-100 rounded-2 px-2 f4 black fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani"
                      />
                      {errors[field.name] && (
                        <div className="error">
                          <p className="mb-0 red f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani ">
                            {errors[field.name]}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </fieldset>
          </div>
          <div className="cust-sendbtn d-flex ac-jc w-100">
            <button
              onClick={(e) => handleSubmit(e)}
              className="btn-sub border-0 bg-primary3 white f4 fs-xxl-18 fs-xl-18 fs-lg-17 fs-sm-16 fs-xs-15 rounded-3 textani"
            >
              {type === "add" ? "Submit" : "Update"}
            </button>
          </div>
        </div>
        <div className="w-30 d-flex inputcont ac-jc">
          <div
            className="w-100 d-flex ac-jc"
            style={{
              height: "430px",
              width: "200px",
            }}
          >
            <img
              style={{
                height: "100%",
                width: "100%",
                objectFit: "contain",
              }}
              src={payment_proof?.image || proof_img}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentAddScreen;
