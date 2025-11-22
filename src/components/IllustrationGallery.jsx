import React from "react";
import { Trash2 } from "lucide-react";

const IllustrationGallery = ({ stories }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Recent Illustrations
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stories.map((story) => (
          <div key={story.id} className="relative group">
            <img
              src={story.illustration}
              alt={story.title}
              className="w-full h-32 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-all rounded-lg flex items-center justify-center">
              <button className="bg-white text-red-600 p-2 rounded-lg">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IllustrationGallery;
