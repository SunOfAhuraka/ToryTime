import React, { useState } from "react";
import { api } from "../../api/client";

const AddChildModal = ({ onClose, onChildAdded }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("👶");
  const avatars = ["👶", "👧", "👦", "🐻", "🦁"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createChild({ name, avatar, color: "#FF6B9D" });
      onChildAdded(); // Refresh parent list
      onClose();
    } catch (err) {
      alert("Failed to add child");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-brand-card p-8 rounded-3xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Add Child</h2>
        <input
          className="w-full p-3 rounded-xl border-2 mb-4"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex gap-2 mb-6">
          {avatars.map((a) => (
            <button
              key={a}
              onClick={() => setAvatar(a)}
              className={`p-2 text-2xl rounded-lg ${
                avatar === a ? "bg-white shadow" : ""
              }`}
            >
              {a}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-brand-primary text-white py-3 rounded-xl font-bold"
          >
            Add
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 py-3 rounded-xl font-bold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddChildModal;
