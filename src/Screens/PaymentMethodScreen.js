import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import SourceList from "../Components/SetupManage/SourceList";
import {
  useLazyPaymentmethodlistQuery,
  useLazySourcegetQuery,
  usePaymentDeleteMutation,
  usePaymentmethodeditMutation,
  useSourceaddMutation,
  useSourcedeleteMutation,
  useSourceeditMutation,
  useTransactionpostMutation,
} from "../Data/Api/api";
import EmptyComp from "../Components/Empty/EmptyComp";
import PageLoad from "../Components/Loading/PageLoad";
import { toast } from "react-toastify";

const PaymentMethodScreen = () => {
  const [show, setShow] = useState(false);
  const [sourcename, setSourcename] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [sourcelistss, setSourcelistss] = useState([]);
  const [sourcedata, setSourceData] = useState(null);
  const [loading, setLoading] = useState(true);

  //   Api
  const [addsource] = useTransactionpostMutation();
  const [viewsource] = useLazyPaymentmethodlistQuery();
  const [Editsource] = usePaymentmethodeditMutation();
  const [DeleteSource] = usePaymentDeleteMutation();

  const handleClose = () => setShow(false);

  const handleShow = (item) => {
    // console.log("kkksjdhffk", item);
    setShow(true);
    if (item) {
      setSourceData(item);
      setIsEditMode(true);
      setSourcename(item?.amountname);
    } else {
      setSourcename("");
      setSourceData(null);
    }
  };
  const handleSave = () => {
    setLoading(true);
    const payload = {
      amountname: sourcename,
    };
    const id = sourcedata?._id;
    // console.log("sourcename", id);

    if (sourcedata) {
      Editsource({ id, payload })
        .unwrap()
        .then((res) => {
          // console.log("mode of amount created successfully", res);
          toast.success(res?.message || "mode of amount created successfully");
          viewsourcelist();
          setShow(false);
        })
        .catch((err) => {
          // console.error("Sources showing errror", err);
        })
        .finally(() => {
          setLoading(true);
        });
    } else {
      addsource(payload)
        .unwrap()
        .then((res) => {
          // console.log("mode of amount created successfully", res);
          toast.success(res?.message || "mode of amount created successfully");
          viewsourcelist();
          setShow(false);
        })
        .catch((err) => {
          // console.error("Sources showing errror", err);
        })
        .finally(() => {
          setLoading(true);
        });
    }
  };

  const handleDelete = (item) => {
    setLoading(true);
    const id = item?._id;
    // console.log("idnj", item, id);
    DeleteSource(id)
      .unwrap()
      .then((res) => {
        // console.log("Deleted Successfully", res);
        toast.success(res?.message || "Deleted Successfully");
        viewsourcelist();
      })
      .catch((err) => {
        // console.error("Delete Error", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const viewsourcelist = () => {
    setLoading(true);
    viewsource()
      .unwrap()
      .then((res) => {
        // console.log("success viewed", res);
        setSourcelistss(res?.data);
      })
      .catch((err) => {
        // console.error("vieed not shoiwng", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    viewsourcelist();
  }, []);

  return (
    <div>
      {loading && <PageLoad />}
      {/* Popup Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditMode ? "Edit Payment Method" : "New Payment Method"}
          </Modal.Title>
          {/* <Modal.Title>New Source</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <fieldset className="out-input rounded-5 h-20">
            <legend className="f3 px-1 fs-xxl-14 fs-xl-10 fs-lg-10 fs-sm-10 fs-xs-10 textani black mb-0">
              New Method
            </legend>
            <div className="d-flex w-100 flex-column gap-3">
              <div className="w-100 px-8 py-3">
                <p className="f6 px-1 fs-xxl-16 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                  Payment Method
                </p>
                <input
                  className="w-100 rounded-2 px-2"
                  type="text"
                  value={sourcename}
                  onChange={(e) => setSourcename(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-end gap-2 px-8 pb-3">
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  style={{ backgroundColor: "#00225D", borderColor: "#00225D" }}
                  onClick={handleSave}
                >
                  {isEditMode ? "Update" : "Add"}
                </Button>
              </div>
            </div>
          </fieldset>
        </Modal.Body>
      </Modal>
      <div>
        <div className="d-flex  w-100 lead-h  ac-je mb-1">
          <Button
            className="refil-text mb-0 white d-flex ac-jc bg-primary3 f4 rounded-3 border-0 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani"
            style={{ backgroundColor: "#00225D", borderColor: "#00225D" }}
            onClick={() => {
              handleShow();
              setIsEditMode(false);
            }}
          >
            + New Payment Method
          </Button>
        </div>
        {!loading && (
          <>
            {sourcelistss?.length == 0 ? (
              <EmptyComp text={"Source Not Found"} />
            ) : (
              <SourceList
                type={"paymentmethod"}
                data={sourcelistss}
                showPopup={show}
                handleShow={handleShow}
                handleDelete={handleDelete}
              />
            )}
          </>
        )}
      </div>
      {/* <StaffRoleScreen />
             <LeadCourseScreen /> */}
    </div>
  );
};

export default PaymentMethodScreen;
