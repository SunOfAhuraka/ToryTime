import React, { useState } from "react";
import { Lock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const ProfileSelectionPage = () => {
  const { parentData, selectProfile } = useAuth();
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState("");

  const handleParentAccess = () => {
    if (pin === "1234") {
      selectProfile(null, "parent");
      setShowPinModal(false);
      setPin("");
    } else {
      alert("Incorrect PIN. Try: 1234");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-8"
      style={{ backgroundColor: "#F6C7B6" }}
    >
      <div className="w-full max-w-4xl">
        <h1
          className="text-4xl font-bold text-center mb-12"
          style={{ color: "#F28C38" }}
        >
          Who's Reading?
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {parentData?.children.map((child) => (
            <button
              key={child.id}
              onClick={() => selectProfile(child, "child")}
              className="flex flex-col items-center p-6 rounded-2xl transition-transform hover:scale-105"
              style={{ backgroundColor: "#F7EDE2" }}
            >
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-4"
                style={{ backgroundColor: child.color }}
              >
                {child.avatar}
              </div>
              <span className="text-xl font-semibold">{child.name}</span>
            </button>
          ))}

          <button
            onClick={() => setShowPinModal(true)}
            className="flex flex-col items-center p-6 rounded-2xl transition-transform hover:scale-105"
            style={{ backgroundColor: "#F7EDE2" }}
          >
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: "#5EC4D0" }}
            >
              <Lock className="w-12 h-12 text-white" />
            </div>
            <span className="text-xl font-semibold">Parent</span>
          </button>
        </div>
      </div>

      {showPinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className="p-8 rounded-2xl max-w-sm w-full"
            style={{ backgroundColor: "#F7EDE2" }}
          >
            <h2 className="text-2xl font-bold mb-4">Enter PIN</h2>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 mb-4"
              style={{ borderColor: "#5EC4D0" }}
              placeholder="Enter 4-digit PIN"
            />
            <div className="flex gap-4">
              <button
                onClick={handleParentAccess}
                className="flex-1 py-3 rounded-lg text-white font-semibold"
                style={{ backgroundColor: "#F28C38" }}
              >
                Unlock
              </button>
              <button
                onClick={() => {
                  setShowPinModal(false);
                  setPin("");
                }}
                className="flex-1 py-3 rounded-lg font-semibold"
                style={{ backgroundColor: "#5EC4D0", color: "white" }}
              >
                Cancel
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">
              Demo PIN: 1234
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSelectionPage;
