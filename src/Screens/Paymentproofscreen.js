import React, { useState } from 'react';
import { FaClock } from 'react-icons/fa';

const paymentData = [
  { name: 'Student Name', size: '87.26KB', date: '12/12/2024', time: '7:30 AM' },
  { name: 'Ramya', size: '87.26KB', date: '12/12/2024', time: '7:30 AM' },
  { name: 'Sujatha', size: '87.26KB', date: '12/12/2024', time: '7:30 AM' },
  { name: 'Keerthana', size: '87.26KB', date: '12/12/2024', time: '7:30 AM' },
  { name: 'Sankari', size: '87.26KB', date: '12/12/2024', time: '7:30 AM' },
];

export default function PaymentProof() {
  const [selectedIndex, setSelectedIndex] = useState(1); // Default selection

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4">Payment Proof</h2>

      <div className="space-y-4">
        {paymentData.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`flex items-center justify-between p-4 rounded-xl shadow-md cursor-pointer transition-all duration-200 
              ${selectedIndex === index ? 'bg-blue-100 border-2 border-blue-500' : 'bg-white'}
            `}
          >
            <div className="flex items-center space-x-3">
              <img
                src="https://via.placeholder.com/40x50.png?text=PDF"
                alt="Proof"
                className="w-10 h-14 object-cover rounded"
              />
              <div>
                <div className="font-semibold">{item.name}</div>
                <div className="text-xs text-gray-500">Size: {item.size}</div>
              </div>
            </div>
            <div className="text-right text-sm text-gray-500">
              <div>{item.date}</div>
              <div className="flex items-center justify-end space-x-1">
                <FaClock className="w-3.5 h-3.5" />
                <span>{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Arrows */}
      <div className="flex justify-center mt-6 space-x-2">
        <div className="w-3 h-3 bg-blue-900 rounded-full" />
        <div className="w-3 h-3 bg-blue-900 rounded-full" />
      </div>
    </div>
  );
}
