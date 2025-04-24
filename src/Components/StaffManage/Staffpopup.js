// components/ConfirmationModal.js
import React from 'react';

const Staffpopup = ({ isOpen, onClose, onConfirm, name }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-slate-800 bg-opacity-60">
            <div className="bg-white rounded-lg p-6 shadow-xl text-center w-30">
                <h2 className="text-xl font-bold mb-2 text-gray-900">Are You Sure</h2>
                <p className="text-red-600 font-semibold mb-4">Do you want to lose {name}?</p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onConfirm}
                        className="bg-[#00225D] text-white px-4 py-2 rounded-md"
                    >
                        YES
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-200 px-4 py-2 rounded-md"
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Staffpopup;
