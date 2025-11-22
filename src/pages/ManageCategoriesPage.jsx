import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Plus, Edit, Trash2 } from "lucide-react";

const ManageCategoriesPage = ({ user }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([
    { id: 1, name: "Fables", count: 5 },
    { id: 2, name: "Folk Tales", count: 8 },
    { id: 3, name: "Creation Stories", count: 3 },
    { id: 4, name: "Legends", count: 6 },
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleAdd = () => {
    if (!newCategory.trim()) return;
    setCategories([
      ...categories,
      { id: Date.now(), name: newCategory, count: 0 },
    ]);
    setNewCategory("");
  };

  const handleEdit = (id) => {
    const category = categories.find((c) => c.id === id);
    setEditingId(id);
    setEditValue(category.name);
  };

  const handleSaveEdit = (id) => {
    setCategories(
      categories.map((c) => (c.id === id ? { ...c, name: editValue } : c))
    );
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-8">
        <button
          onClick={() => navigate("/admin")}
          className="mb-6 flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow hover:shadow-lg transition-all font-semibold"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Manage Categories
          </h1>

          <div className="flex space-x-4 mb-8">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              placeholder="Enter new category name"
            />
            <button
              onClick={handleAdd}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600"
            >
              <Plus className="inline w-5 h-5 mr-2" />
              Add Category
            </button>
          </div>

          <div className="space-y-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100"
              >
                {editingId === category.id ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none mr-4"
                  />
                ) : (
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{category.name}</h3>
                    <p className="text-gray-600">{category.count} stories</p>
                  </div>
                )}
                <div className="flex space-x-2">
                  {editingId === category.id ? (
                    <button
                      onClick={() => handleSaveEdit(category.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(category.id)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCategoriesPage;
