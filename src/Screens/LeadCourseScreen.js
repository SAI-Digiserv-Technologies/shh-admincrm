import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import LeadCourseList from "../Components/SetupManage/LeadCourseList";
import {
  useCourseaddMutation,
  useCourseUserMutation,
  useLazyViewUserQuery,
} from "../Data/Api/api";
import { toast } from "react-toastify";

const LeadCourseScreen = () => {
  const [show, setShow] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [coursedata, setCourseData] = useState(null);
  const [leadcourse, setLeadcourse] = useState([]);
  const [editmode, setEditMode] = useState(false);


  const [courseadd] = useCourseaddMutation();
  const [courseupdate] = useCourseUserMutation();
  const [courseview] = useLazyViewUserQuery();

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
          handleClose();
          handleview();
        })
        .catch((err) => {
          console.error("Update error:", err);
          toast.error(err?.data?.error || "Failed to update course");
        });
    } else {
      courseadd(payload)
        .unwrap()
        .then((res) => {
          toast.success(res?.message);
          handleClose();
          handleview();
        })
        .catch((err) => {
          console.error("Add error:", err);
          toast.error(err?.data?.error || "Failed to add course");
        });
    }
  };

  const handleview = () => {
    courseview()
      .unwrap()
      .then((res) => {
        setLeadcourse(res?.data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        toast.error("Failed to load courses");
      });
  };

  useEffect(() => {
    handleview();
  }, []);

  return (
    <div>
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
        <div
          className="d-flex w-100 lead-h ac-jb"
          style={{ alignItems: "flex-end" }}
        >
          <p className="mb-0 f7 primary3 textani">Course</p>
          <Button
            className="refil-text mb-0 white d-flex ac-jc f4 rounded-3 border-0 textani"
            style={{ backgroundColor: "#00225D", borderColor: "#00225D" }}
            onClick={() =>{ handleShow()
              setEditMode(false)
            }}
          >
            + New Course
          </Button>
        </div>
        <LeadCourseList data={leadcourse} handleShow={handleShow} />
      </div>
    </div>
  );
};

export default LeadCourseScreen;
