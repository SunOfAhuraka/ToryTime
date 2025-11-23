import React, { useState } from "react";

const AddChildModal = ({ onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("👶");
  const [color, setColor] = useState("#FF6B9D");

  const avatars = ["👶", "👧", "👦", "🧒", "👨", "👩", "🐻", "🐱", "🐶", "🦁"];
  const colors = [
    "#FF6B9D",
    "#4A90E2",
    "#9B59B6",
    "#E74C3C",
    "#F39C12",
    "#27AE60",
    "#16A085",
    "#8E44AD",
  ];

  const handleAdd = () => {
    if (name.trim()) {
      onAdd({ name: name.trim(), avatar, color });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className="p-8 rounded-2xl max-w-md w-full"
        style={{ backgroundColor: "#F7EDE2" }}
      >
        <h2 className="text-2xl font-bold mb-6">Add New Child</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2"
              style={{ borderColor: "#5EC4D0" }}
              placeholder="Enter child's name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Choose Avatar
            </label>
            <div className="grid grid-cols-5 gap-2">
              {avatars.map((av) => (
                <button
                  key={av}
                  onClick={() => setAvatar(av)}
                  className={`p-3 rounded-lg text-2xl transition-all ${
                    avatar === av ? "scale-110" : ""
                  }`}
                  style={{ backgroundColor: avatar === av ? color : "#ffffff" }}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Choose Color
            </label>
            <div className="grid grid-cols-4 gap-2">
              {colors.map((col) => (
                <button
                  key={col}
                  onClick={() => setColor(col)}
                  className={`h-12 rounded-lg transition-all ${
                    color === col ? "scale-110 ring-4 ring-offset-2" : ""
                  }`}
                  style={{ backgroundColor: col, ringColor: col }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleAdd}
            className="flex-1 py-3 rounded-lg text-white font-semibold"
            style={{ backgroundColor: "#F28C38" }}
          >
            Add Child
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-lg font-semibold"
            style={{ backgroundColor: "#5EC4D0", color: "white" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddChildModal;
