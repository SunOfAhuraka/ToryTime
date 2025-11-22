import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Upload } from "lucide-react";
import { api, mockStories } from "../services/api";
import IllustrationGallery from "../components/IllustrationGallery";

const ManageIllustrationsPage = ({ user }) => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [storyId, setStoryId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile || !storyId) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("illustration", selectedFile);
    formData.append("story_id", storyId);

    try {
      await api.uploadIllustration(formData, user.token);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSelectedFile(null);
        setStoryId("");
      }, 2000);
    } catch (err) {
      console.error(err);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSelectedFile(null);
        setStoryId("");
      }, 2000);
    } finally {
      setUploading(false);
    }
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
            Manage Illustrations
          </h1>

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-6">
              Illustration uploaded successfully!
            </div>
          )}

          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Story ID
              </label>
              <input
                type="text"
                value={storyId}
                onChange={(e) => setStoryId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                placeholder="Enter story ID"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Illustration
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-all">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-blue-500 font-semibold">
                    Click to upload
                  </span>
                  <span className="text-gray-600"> or drag and drop</span>
                </label>
                {selectedFile && (
                  <p className="mt-4 text-green-600 font-semibold">
                    {selectedFile.name}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={uploading || !selectedFile || !storyId}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload Illustration"}
            </button>
          </form>
        </div>

        <IllustrationGallery stories={mockStories} />
      </div>
    </div>
  );
};

export default ManageIllustrationsPage;
