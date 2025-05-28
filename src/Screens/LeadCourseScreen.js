import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import LeadCourseList from "../Components/SetupManage/LeadCourseList";
import {
  useCourseaddMutation,
  useCourseUserMutation,
  useDeleteuserMutation,
  useLazyViewUserQuery,
  useTransactionpostMutation,
} from "../Data/Api/api";
import { toast } from "react-toastify";
import EmptyComp from "../Components/Empty/EmptyComp";
import PageLoad from "../Components/Loading/PageLoad";

const LeadCourseScreen = () => {
  const [show, setShow] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [coursedata, setCourseData] = useState(null);
  const [leadcourse, setLeadcourse] = useState([]);
  const [editmode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const [courseadd] = useCourseaddMutation();
  const [courseupdate] = useCourseUserMutation();
  const [courseview] = useLazyViewUserQuery();
  const [Coursedelete] = useDeleteuserMutation();

  const handleClose = () => {
    setShow(false);
    setCourseName("");
    setAmount("");
    setDuration("");
    setCourseData(null);
    setEditMode(false);
  };

  const handleShow = (item) => {
    setShow(true);
    if (item) {
      setCourseData(item);
      setEditMode(true);
      setCourseName(item?.addcourse || "");
      setDuration(item?.duration || "");
      setAmount(item?.amount || "");
    } else {
      setCourseName("");
      setAmount("");
      setDuration("");
      setCourseData(null);
    }
  };

  const handleSave = () => {
    setLoading(true);
    const payload = {
      addcourse: courseName,
      amount,
      duration,
    };
    const id = coursedata?._id;

    if (coursedata) {
      courseupdate({ id, payload })
        .unwrap()
        .then((res) => {
          toast.success(res?.message);
          handleview();
          handleClose();
        })
        .catch((err) => {
          // console.error("Update error:", err);
          toast.error(err?.data?.error || "Failed to update course");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      courseadd(payload)
        .unwrap()
        .then((res) => {
          toast.success(res?.message);
          handleview();
          handleClose();
        })
        .catch((err) => {
          // console.error("Add error:", err);
          toast.error(err?.data?.error || "Failed to add course");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handledelete = (item) => {
    setLoading(true);
    const id = item?._id;
    // console.log("kkaksdfk", id);
    Coursedelete(id)
      .unwrap()
      .then((res) => {
        // console.log("course deleted", res);
        handleview();
      })
      .catch((err) => {
        // console.log("course not deleted", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleview = () => {
    setLoading(true);
    courseview()
      .unwrap()
      .then((res) => {
        // console.log("courssres", res);
        setLeadcourse(res?.data);
      })
      .catch((err) => {
        // console.error("Fetch error:", err);
        toast.error("Failed to load courses");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleview();
  }, []);

  return (
    <div>
      {loading && <PageLoad />}
      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton />
        <Modal.Title className="px-4 pt-3">
          {editmode ? "Edit Course" : "New Course"}
        </Modal.Title>
        <Modal.Body>
          <fieldset className="out-input rounded-5 h-20">
            <legend className="f3 px-1 textani black mb-0">Course Form</legend>
            <div className="d-flex w-100 flex-column gap-3">
              <div className="w-100 px-4 pt-2">
                <p className="f6 px-1 primary2 mb-0">Course Name</p>
                <input
                  className="w-100 rounded-2 px-2"
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </div>
              <div className="w-100 px-4">
                <p className="f6 px-1 primary2 mb-0">Amount</p>
                <input
                  className="w-100 rounded-2 px-2"
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="w-100 px-4">
                <p className="f6 px-1 primary2 mb-0">Duration</p>
                <input
                  className="w-100 rounded-2 px-2"
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-end gap-2 px-4 pb-3">
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  style={{ backgroundColor: "#00225D", borderColor: "#00225D" }}
                  onClick={handleSave}
                >
                  {editmode ? "Update" : "Add"}
                </Button>
              </div>
            </div>
          </fieldset>
        </Modal.Body>
      </Modal>

      {/* Course Header and List */}
      <div>
        <div className="d-flex w-100 lead-h ac-je mb-1 ">
          <Button
            className="refil-text mb-0 white d-flex ac-jc f4 rounded-3 border-0 textani"
            style={{ backgroundColor: "#00225D", borderColor: "#00225D" }}
            onClick={() => {
              handleShow();
              setEditMode(false);
            }}
          >
            + New Coursess
          </Button>
        </div>
        {!loading && (
          <>
            {leadcourse?.length == 0 ? (
              <EmptyComp text={"Course Not Found"} />
            ) : (
              <LeadCourseList
                data={leadcourse}
                handleShow={handleShow}
                handledelete={handledelete}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LeadCourseScreen;
