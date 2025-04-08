import React, { useState } from "react";

const TelecallerProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "Keerthana",
    email: "Sujatha@gmail.com",
    phone: "9962515695",
    role: "Telecaller",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const profileFields = [
    { label: "Name", name: "name", type: "text", fullWidth: true },
    { label: "Email Address", name: "email", type: "email", fullWidth: true },
    { label: "Phone Number", name: "phone", type: "tel", fullWidth: false },
    { label: "Role", name: "role", type: "text", fullWidth: false },
  ];

  const handleProfileChange = (name, value) => {
    setProfile({ ...profile, [name]: value });
  };

  const handlePasswordChange = (name, value) => {
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleSubmit = () => {
    const { newPassword, confirmPassword } = passwords;
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    alert("Password updated successfully!");
    setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white border-2 border-blue-400 rounded-xl p-6 flex justify-between items-center shadow-sm mb-8">
        <div className="flex items-center gap-4">
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h2 className="text-xl font-bold text-blue-800">
              {profile.name.toUpperCase()}
            </h2>
            <p className="text-sm text-gray-600">{profile.role}</p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Email ID:</span> {profile.email}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Phone:</span> {profile.phone}
            </p>
          </div>
        </div>
        <button
          className="text-red-500 text-lg hover:scale-110 transition"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "✖️" : "✏️"}
        </button>
      </div>

      {/* Forms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left - Profile Form */}
        <div className="bg-white border rounded-xl p-6 shadow-md">
          <h3 className="text-md font-semibold mb-4">Telecaller</h3>

          {profileFields.map((field, index) => {
            if (!field.fullWidth && index % 2 === 0) {
              return (
                <div className="flex gap-4" key={field.name}>
                  {[profileFields[index], profileFields[index + 1]].map(
                    (f) =>
                      f && (
                        <div className="w-1/2" key={f.name}>
                          <label className="block text-sm font-medium">
                            {f.label}
                          </label>
                          <input
                            type={f.type}
                            value={profile[f.name]}
                            disabled={!isEditing}
                            onChange={(e) =>
                              handleProfileChange(f.name, e.target.value)
                            }
                            className={`w-full p-2 border rounded-md mb-3 ${
                              isEditing
                                ? "bg-white"
                                : "bg-gray-100 cursor-not-allowed"
                            }`}
                          />
                        </div>
                      )
                  )}
                </div>
              );
            }

            if (field.fullWidth) {
              return (
                <div key={field.name}>
                  <label className="block text-sm font-medium">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={profile[field.name]}
                    disabled={!isEditing}
                    onChange={(e) =>
                      handleProfileChange(field.name, e.target.value)
                    }
                    className={`w-full p-2 border rounded-md mb-3 ${
                      isEditing
                        ? "bg-white"
                        : "bg-gray-100 cursor-not-allowed"
                    }`}
                  />
                </div>
              );
            }

            return null;
          })}

          {isEditing && (
            <button
              onClick={handleSave}
              className="w-full py-2 rounded-md mt-2 shadow bg-blue-900 text-white hover:bg-blue-800 transition"
            >
              Save
            </button>
          )}
        </div>

        {/* Right - Password Form */}
        <div className="bg-white border rounded-xl p-6 shadow-md">
          <h3 className="text-md font-semibold mb-4">Change Password</h3>

          <label className="block text-sm font-medium">Old Password</label>
          <div className="relative mb-3">
            <input
              type={showOldPassword ? "text" : "password"}
              value={passwords.oldPassword}
              onChange={(e) =>
                handlePasswordChange("oldPassword", e.target.value)
              }
              className="w-full p-2 border rounded-md pr-10"
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-xs text-blue-600"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? "Hide" : "Show"}
            </button>
          </div>

          <label className="block text-sm font-medium">New Password</label>
          <input
            type="password"
            value={passwords.newPassword}
            onChange={(e) =>
              handlePasswordChange("newPassword", e.target.value)
            }
            className="w-full p-2 border rounded-md mb-3"
          />

          <label className="block text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            value={passwords.confirmPassword}
            onChange={(e) =>
              handlePasswordChange("confirmPassword", e.target.value)
            }
            className="w-full p-2 border rounded-md mb-3"
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-900 text-white w-full py-2 rounded-md shadow hover:bg-blue-800 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TelecallerProfilePage;
