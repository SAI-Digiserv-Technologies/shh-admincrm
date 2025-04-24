import React, { useEffect, useState } from 'react'
import { profile_dum } from "../assets/images";
import StaffDetailsForm from './StaffDetailsForm';
import { BlocksIcon, Edit, Edit2Icon, Edit3Icon, PencilIcon, PenIcon, UserCheck2Icon } from 'lucide-react';
import Staffpopup from '../Components/StaffManage/Staffpopup';
import { FaPencilAlt, FaUserSlash } from 'react-icons/fa';
import { useEditStaffMutation, useLazyParticularviewStaffQuery } from '../Data/Api/api';
import { useLocation } from 'react-router-dom';


const StaffDetails = () => {

    const [partiViewStaffApi] = useLazyParticularviewStaffQuery();
    const [editStaffApi] = useEditStaffMutation();

    //staff 
    const [staffName, setStaffName] = useState('');
    const [staffEmail, setStaffEmail] = useState('');
    const [staffPhone, setStaffPhone] = useState('');
    const [staffRole, setStaffRole] = useState('');
    const [loading, setLoading] = useState('');

    const location = useLocation()
    console.log(location, "location");
    const type = location?.state?.type
    // console.log(type, "type");
    const id = location?.state?.data?._id
    console.log(id, "id");


    const [staffViewPro, setStaffViewPro] = useState(null);
    console.log(staffViewPro, "staffv");

    const [editBtn, setEditBtn] = useState(false)

    // popup state
    const [staffpopup, setStaffpopup] = useState(false)
    // user icon color state
    const [iconConfirm, setIconConfrim] = useState(false);



    // popup fun
    const handleConfrim = () => {
        console.log("user confirm deletion");
        setStaffpopup(false);
        setIconConfrim(true)

    }
    // Cancel button clicked
    const handleCancel = () => {
        console.log("User cancelled");
        setIconConfrim(false);
        setStaffpopup(false);
    };


    // view staff api (particular get method )
    const partiviewStafffun = () => {
        setLoading(true)
        partiViewStaffApi(id)
            .unwrap()
            .then(res => {
                console.log("Vires", res);
                setStaffName(res?.name)
                setStaffEmail(res?.email)
                setStaffPhone(res?.phone)
                setStaffRole(res?.role)
                setStaffViewPro(res)

            }).catch(err => {
                console.log("err", err);


            }).finally(() => {
                setLoading(false)
            })
    }


    // edit staff api ( put method )
    const editStafffun = () => {
        const payload = {
            "name": staffName,
            "email": staffEmail,
            "phone": staffPhone,
            "role": staffRole,
        }

        setLoading(true)
console.log('payload',payload);

        editStaffApi(id, payload)
            .unwrap()
            .then(res => {
                console.log("res", res);


            }).catch(err => {
                console.log("err", err);


            }).finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        partiviewStafffun()
    }, []);

    return (
        <div>
            <div className="bg-gray-300 rounded-2xl p-6 flex flex-col items-center w-full  shadow-md ">
                <div className='flex items-end justify-end w-full gap-2'>

                    <button onClick={() => { setEditBtn(true) }} className='bg-[#98D87E] rounded-full p-2 text-[#135A05]'> <FaPencilAlt size={16} /> </button>

                    <button onClick={() => {
                        setStaffpopup(true)
                    }}
                        className={iconConfirm ? "text-gray-600" : "text-[#2E00FF]"} ><FaUserSlash size={24} /> </button>
                </div>
                <div className="w-10 h-10 bg-[#00225D] rounded-full flex items-center justify-center">

                    <img src={profile_dum} />
                </div>
                <h2 className="text-lg font-bold text-[#00225D] mt-3">{staffViewPro?.name} </h2>
                <p className="text-gray-700 text-sm fon">{staffViewPro?.role}</p>
                <p className="text-gray-900 font-semibold mt-2">
                    Email ID:{" "}
                    <a href="mailto:admin@gmail.com" className="text-blue-500">
                        {staffViewPro?.email}
                    </a>
                </p>
                <p className="text-gray-900 font-semibold">
                    Phone:{" "}
                    <a href="tel:9962515695" className="text-blue-500">
                        {staffViewPro?.phone}
                    </a>
                </p>

            </div>
            {editBtn && <StaffDetailsForm setStaffViewPro={setStaffViewPro}
                staffName={staffName}
                setStaffName={setStaffName}
                staffEmail={staffEmail}
                setStaffEmail={setStaffEmail}
                staffPhone={staffPhone}
                setStaffPhone={setStaffPhone}
                staffRole={staffRole}
                setStaffRole={setStaffRole}
                setLoading={setLoading}
                loading={loading}
                id={id}
                editStafffun={editStafffun} />}

            <Staffpopup isOpen={staffpopup}
                onClose={handleCancel}
                onConfirm={handleConfrim}
                name={staffViewPro?.name}
            />
        </div>
    )
}

export default StaffDetails