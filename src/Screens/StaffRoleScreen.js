import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import SourceList from "../Components/SetupManage/SourceList";
import StaffRoleList from "../Components/SetupManage/StaffRoleList";
import { useEditrolesMutation, useLazyViewrolesQuery, useRolesMutation } from "../Data/Api/api";

const StaffRoleScreen = () => {
    const [show, setShow] = useState(false);
    const [addroles, setAddroles] = useState("");
    const [stafflist, setStafflist] = useState([]);
    const [RolesApi] = useRolesMutation();
    const [viewRoles] = useLazyViewrolesQuery();
    const [Editroles] = useEditrolesMutation();
    const handleClose = () => setShow(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleShow = () => setShow(true);

    const handleSave = () => {
        const payload = {
            addroles
        }
        RolesApi(payload)
            .unwrap()
            .then((res) => {
                console.log("Roles added successfully", res);

            }).catch((err) => {
                console.error("Error throwing", err);

            })
        handleClose();
    };

    const viewroles = () => {
        viewRoles()
            .unwrap()
            .then((res) => {
                console.log("viewed successfully", res);
                setStafflist(res?.data);

            })
            .catch((err) => {
                console.log("logges notshowin", err);

            })
    }

    // const editroles = () => {
    //     Editroles()
    //         .unwrap()
    //         .then((res))
    // }


    useEffect(() => {
        viewroles()
    })

    return (
        <div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditMode ? "Edit Role" : "New Role"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <fieldset className="out-input rounded-5 h-20">
                        <div className="d-flex w-100 flex-column gap-3">
                            <div className="w-100 px-8 py-3">
                                <p className="f6 px-1 fs-xxl-16 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                                    Role Name
                                </p>
                                <input
                                    className="w-100 rounded-2 px-2"
                                    type="text"
                                    value={addroles}
                                    onChange={(e) => setAddroles(e.target.value)}
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
                    <p className="mb-0 f7 primary3 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani">
                        Role
                    </p>
                    <Button
                        className="refil-text mb-0 white d-flex ac-jc bg-primary3 f4 rounded-3 border-0 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani"
                        style={{ backgroundColor: "#00225D", borderColor: "#00225D" }}
                        onClick={handleShow}
                    >
                        + New Role
                    </Button>
                </div>
                <StaffRoleList data={stafflist}  />
            </div>
        </div>
    );
};

export default StaffRoleScreen;
