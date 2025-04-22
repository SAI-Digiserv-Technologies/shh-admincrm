import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import SourceList from "../Components/SetupManage/SourceList";
import { useLazySourcegetQuery, useSourceaddMutation } from "../Data/Api/api";

const SrcScreen = () => {
    const [show, setShow] = useState(false);
    const [sourcename, setSourcename] = useState("");
    const [addsource] = useSourceaddMutation();
    const [isEditMode, setIsEditMode] = useState(false);
    const [sourcelistss, setSourcelistss] = useState([]);
    const [viewsource] = useLazySourcegetQuery()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSave = () => {
        const payload = {
            sourcename
        }
        addsource(payload)
            .unwrap()
            .then((res) => {
                console.log("Sources added successfully", res);

            }).catch((err) => {
                console.error("Sources showing errror", err);

            })

        console.log("Saved Source:", sourcename);
        handleClose();
    };

    const viewsourcelist = () => {
        viewsource()
          .unwrap()
          .then((res) => {
            console.log("success viewed", res);
            setSourcelistss(res?.data)
          }).catch((err) => {
            console.error("vieed not shoiwng", err);
    
          })
      }
    
    useEffect(() =>{
      viewsourcelist();
    },[])
    

    return (
        <div >
            {/* Popup Modal */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditMode ? "Edit Role" : "New Role"}</Modal.Title>

                    {/* <Modal.Title>New Source</Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <fieldset className="out-input rounded-5 h-20">
                        <legend className="f3 px-1 fs-xxl-14 fs-xl-10 fs-lg-10 fs-sm-10 fs-xs-10 textani black mb-0" >
                            New Source
                        </legend>
                        <div className="d-flex w-100 flex-column gap-3">
                            <div className="w-100 px-8 py-3">
                                <p className="f6 px-1 fs-xxl-16 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                                    Source Name
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
                <div style={{ alignItems: 'flex-end', width: '100%' }} className="d-flex  w-100 lead-h  ac-jb">
                    <p className=" mb-0 f7 primary3 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani">
                        Source
                    </p>
                    <Button className="refil-text mb-0 white d-flex ac-jc bg-primary3 f4 rounded-3 border-0 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani" style={{ backgroundColor: "#00225D", borderColor: "#00225D" }} onClick={handleShow}>
                        + New Source
                    </Button    >
                </div>
                <SourceList data={sourcelistss} />
            </div>
            {/* <StaffRoleScreen />
             <LeadCourseScreen /> */}
        </div>
    );
};

export default SrcScreen