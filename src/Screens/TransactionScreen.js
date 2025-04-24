import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import SourceList from "../Components/SetupManage/SourceList";
import StaffRoleList from "../Components/SetupManage/StaffRoleList";

const TransactionScreen = () => {
    const [show, setShow] = useState(false);
    const [sourceName, setSourceName] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSave = () => {
        console.log("Saved Source:", sourceName);
        handleClose();
    };

    return (
        <div >
            {/* Button to Open Popup */}


            {/* Popup Modal */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    {/* <Modal.Title>New Source</Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <fieldset className="out-input rounded-5 h-20">
                        <legend className="f3 px-1 fs-xxl-14 fs-xl-10 fs-lg-10 fs-sm-10 fs-xs-10 textani black mb-0" >
                             Transaction Method
                        </legend>
                        <div className="d-flex w-100 flex-column gap-3">
                            <div className="w-100 px-8 py-3">
                                <p className="f6 px-1 fs-xxl-16 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                                Transaction Method
                                </p>
                                <input
                                    className="w-100 rounded-2 px-2"
                                    type="text"
                                    value={sourceName}
                                    onChange={(e) => setSourceName(e.target.value)}

                                />
                            </div>
                            <div className="d-flex justify-content-end gap-2 px-8 pb-3">
                                <Button variant="secondary" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button style={{ backgroundColor: "#00225D", borderColor: "#00225D" }} onClick={handleSave}>
                                    Add
                                </Button>
                            </div>
                        </div>
                    </fieldset>
                </Modal.Body>

            </Modal>
            <div>
            <div style={{ alignItems: 'flex-end', width: '100%' }} className="d-flex  w-100 lead-h  ac-jb">
                    <p className=" mb-0 f7 primary3 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani">
                       Transaction
                    </p>
                    <Button className="refil-text mb-0 white d-flex ac-jc bg-primary3 f4 rounded-3 border-0 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani" style={{ backgroundColor: "#00225D", borderColor: "#00225D" }} onClick={handleShow}>
                        + New Transaction
                    </Button    >
                </div>
                <StaffRoleList />
            </div>
           
        </div>
    );
};

export default TransactionScreen;
