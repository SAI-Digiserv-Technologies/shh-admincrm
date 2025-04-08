import React from "react";

const Telecallerprofille = () => {
  return (
    <div className="flex flex-col items-center p-4 bg-white min-h-screen">
      {/* Profile Header */}
      <div className=" w-full max-w-5xl bg-gray-100 rounded-lg p-6">
        <div className="flex flex-col items-center">
          <div className="w-5 h-5 bg-blue-600 rounded-sm flex items-center justify-center text-white text-2xl">
            👤
          </div>
          <h2 className="text-xl font-bold mt-2">SUJATHA</h2>
          <p className="text-gray-600">Telecaller</p>
          <p className="font-bold">Email ID: <span className="text-blue-600">sujatha@gmail.com</span></p>
          <p className="font-bold">Phone: <span className="text-blue-600">9962515695</span></p>
        </div>
        {/* Icons */}
        <div className="absolute top-2 right-2 flex space-x-2">
          <span className="text-yellow-500 cursor-pointer">✏️</span>
          <span className="text-red-500 cursor-pointer">🗑️</span>
        </div>
      </div>

      {/* Edit Form */}
      <div className="bg-white p-6 mt-4 rounded-lg shadow-lg w-full max-w-3xl">
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input type="text" className="w-full p-2 border rounded" defaultValue="Keerthana" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email Address</label>
            <input type="email" className="w-full p-2 border rounded" defaultValue="Sujatha@gmail.com" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input type="text" className="w-full p-2 border rounded" defaultValue="9962515695" />
            </div>

            <div>
              <label className="block text-gray-700">Profile Image</label>
              <input type="file" className="w-full p-2 border rounded" />
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            <button className="text-red-500">Reset Password</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Telecallerprofille;
