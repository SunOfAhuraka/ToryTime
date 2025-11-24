import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Users,
  Settings,
  Plus,
  Edit,
  Trash2,
  Search,
  Eye,
  Award,
  Shield,
  LogOut,
  X,
} from "lucide-react";
import { api } from "../../api/client";

// ============================================================================
// ADMIN DASHBOARD
// ============================================================================

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showModal, setShowModal] = useState(null); // 'addStory' or { type: 'edit', data: ... }
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState([]);

  // Mock users data
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "Sarah",
      email: "sarah@test.com",
      children: 2,
      status: "active",
    },
    {
      id: "2",
      name: "John",
      email: "john@test.com",
      children: 1,
      status: "active",
    },
  ]);

  // Fetch Data
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await api.getStories();
      setStories(res.data);
    } catch (error) {
      console.error("Failed to load stories", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleCreateStory = async (storyData) => {
    try {
      const payload = {
        title: storyData.title,
        author: storyData.author,
        category: storyData.category,
        age_range: storyData.ageRange, // Maps frontend camelCase to backend snake_case
        script: storyData.script,
        duration: storyData.duration,

        // FIX: Map the quiz array to match Django's expected field names
        quiz: storyData.quiz.map((q) => ({
          question: q.question,
          options: q.options,
          // Backend expects 'correct_answer_index', frontend has 'correctAnswer'
          correct_answer_index: parseInt(q.correctAnswer),
        })),
      };

      await api.createStory(payload);

      // Refresh data and close modal
      await loadData();
      setShowModal(null);
    } catch (error) {
      console.error("Error creating story:", error.response?.data || error);
      alert("Failed to create story. Check console for details.");
    }
  };

  const handleDeleteStory = async (id) => {
    if (confirm("Delete this story?")) {
      try {
        await api.deleteStory(id);
        setStories((prev) => prev.filter((s) => s.id !== id));
      } catch (error) {
        alert("Delete failed");
      }
    }
  };

  // Computed
  const analytics = {
    totalStories: stories.length,
    totalUsers: users.length,
    totalViews: 1200,
    quizzesCompleted: 450,
  };

  const filteredStories = stories.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-[#F6C7B6]">
        Loading Admin...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F6C7B6]">
      {/* Header */}
      <header className="bg-[#F7EDE2] shadow-md p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-[#F28C38]" />
            <h1 className="text-2xl font-bold text-[#F28C38]">
              Admin Dashboard
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-[#5EC4D0] text-white rounded-lg"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <TabButton
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
            label="Overview"
          />
          <TabButton
            active={activeTab === "stories"}
            onClick={() => setActiveTab("stories")}
            label="Stories"
          />
          <TabButton
            active={activeTab === "users"}
            onClick={() => setActiveTab("users")}
            label="Users"
          />
        </div>

        {activeTab === "overview" && <OverviewTab analytics={analytics} />}

        {activeTab === "stories" && (
          <StoriesTab
            stories={filteredStories}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onAdd={() => setShowModal("addStory")}
            onDelete={handleDeleteStory}
          />
        )}

        {activeTab === "users" && <UsersTab users={users} />}
      </div>

      {/* Modals */}
      {showModal === "addStory" && (
        <StoryModal
          onClose={() => setShowModal(null)}
          onSave={handleCreateStory}
        />
      )}
    </div>
  );
};

const TabButton = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
      active
        ? "bg-[#F28C38] text-white"
        : "bg-[#F7EDE2] text-gray-700 hover:bg-orange-100"
    }`}
  >
    {label}
  </button>
);

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const OverviewTab = ({ analytics }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    <StatCard
      icon={BookOpen}
      title="Stories"
      value={analytics.totalStories}
      color="#F28C38"
    />
    <StatCard
      icon={Users}
      title="Users"
      value={analytics.totalUsers}
      color="#5EC4D0"
    />
    <StatCard
      icon={Eye}
      title="Views"
      value={analytics.totalViews}
      color="#9B59B6"
    />
    <StatCard
      icon={Award}
      title="Quizzes"
      value={analytics.quizzesCompleted}
      color="#27AE60"
    />
  </div>
);

const StatCard = ({ icon: Icon, title, value, color }) => (
  <div className="p-6 rounded-2xl shadow-md bg-[#F7EDE2]">
    <div style={{ color }} className="mb-4">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-gray-600 text-sm">{title}</h3>
    <p className="text-3xl font-bold" style={{ color }}>
      {value}
    </p>
  </div>
);

const StoriesTab = ({
  stories,
  searchQuery,
  setSearchQuery,
  onAdd,
  onDelete,
}) => (
  <div>
    <div className="mb-6 p-4 rounded-2xl bg-[#F7EDE2] flex justify-between items-center">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search stories..."
          className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#5EC4D0] outline-none"
        />
      </div>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-6 py-3 bg-[#F28C38] text-white rounded-lg font-bold hover:opacity-90"
      >
        <Plus size={20} /> Add Story
      </button>
    </div>

    <div className="bg-[#F7EDE2] rounded-2xl overflow-hidden shadow-lg">
      <table className="w-full text-left">
        <thead className="bg-[#F28C38] text-white">
          <tr>
            <th className="p-4">Title</th>
            <th className="p-4">Author</th>
            <th className="p-4">Category</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {stories.map((story) => (
            <tr key={story.id} className="bg-white hover:bg-gray-50">
              <td className="p-4 font-semibold">{story.title}</td>
              <td className="p-4 text-gray-600">{story.author}</td>
              <td className="p-4">
                <span className="bg-[#5EC4D0] text-white px-2 py-1 rounded text-xs">
                  {story.category}
                </span>
              </td>
              <td className="p-4">
                <button
                  onClick={() => onDelete(story.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const UsersTab = ({ users }) => (
  <div className="bg-[#F7EDE2] rounded-2xl overflow-hidden shadow-lg">
    <table className="w-full text-left">
      <thead className="bg-[#5EC4D0] text-white">
        <tr>
          <th className="p-4">Name</th>
          <th className="p-4">Email</th>
          <th className="p-4">Children</th>
          <th className="p-4">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {users.map((user) => (
          <tr key={user.id} className="bg-white">
            <td className="p-4 font-bold">{user.name}</td>
            <td className="p-4 text-gray-600">{user.email}</td>
            <td className="p-4">{user.children}</td>
            <td className="p-4 text-green-600 font-bold">{user.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ============================================================================
// STORY MODAL (The part that wasn't opening)
// ============================================================================

const StoryModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "Fables",
    ageRange: "4-7",
    duration: "5 min",
    script: "",
  });

  const [quiz, setQuiz] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: 0 },
  ]);

  const handleSubmit = () => {
    if (formData.title && formData.script) {
      onSave({ ...formData, quiz: quiz.filter((q) => q.question) });
    } else {
      alert("Title and Script are required");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100] overflow-y-auto">
      <div className="bg-[#F7EDE2] p-8 rounded-2xl w-full max-w-3xl my-8 relative shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#4A4A4A]">
            Add New Global Story
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full"
          >
            <X />
          </button>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          <input
            placeholder="Story Title"
            className="w-full p-3 rounded-xl border-2 border-gray-300 outline-none focus:border-[#F28C38]"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Author"
              className="w-full p-3 rounded-xl border-2 border-gray-300 outline-none focus:border-[#F28C38]"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
            />
            <select
              className="w-full p-3 rounded-xl border-2 border-gray-300 outline-none focus:border-[#F28C38]"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option>Fables</option>
              <option>Fairy Tales</option>
              <option>Adventure</option>
              <option>Educational</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Age Range"
              className="w-full p-3 rounded-xl border-2 border-gray-300 outline-none focus:border-[#F28C38]"
              value={formData.ageRange}
              onChange={(e) =>
                setFormData({ ...formData, ageRange: e.target.value })
              }
            />
            <input
              placeholder="Duration"
              className="w-full p-3 rounded-xl border-2 border-gray-300 outline-none focus:border-[#F28C38]"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
            />
          </div>

          <textarea
            placeholder="Paste Story Script Here..."
            className="w-full p-3 h-32 rounded-xl border-2 border-gray-300 outline-none focus:border-[#F28C38]"
            value={formData.script}
            onChange={(e) =>
              setFormData({ ...formData, script: e.target.value })
            }
          />

          <div className="border-t-2 border-[#5EC4D0] pt-4">
            <div className="flex justify-between mb-4">
              <h3 className="font-bold text-lg">Quiz Questions</h3>
              <button
                onClick={() =>
                  setQuiz([
                    ...quiz,
                    {
                      question: "",
                      options: ["", "", "", ""],
                      correctAnswer: 0,
                    },
                  ])
                }
                className="text-sm bg-[#5EC4D0] text-white px-3 py-1 rounded hover:opacity-90"
              >
                + Add Question
              </button>
            </div>

            {quiz.map((q, i) => (
              <div key={i} className="bg-white p-4 rounded-xl mb-4 border">
                <input
                  placeholder={`Question ${i + 1}`}
                  className="w-full p-2 border rounded mb-2"
                  value={q.question}
                  onChange={(e) => {
                    const newQuiz = [...quiz];
                    newQuiz[i].question = e.target.value;
                    setQuiz(newQuiz);
                  }}
                />
                <div className="grid grid-cols-1 gap-2">
                  {q.options.map((opt, j) => (
                    <div key={j} className="flex gap-2 items-center">
                      <input
                        type="radio"
                        name={`q-${i}`}
                        checked={q.correctAnswer === j}
                        onChange={() => {
                          const newQuiz = [...quiz];
                          newQuiz[i].correctAnswer = j;
                          setQuiz(newQuiz);
                        }}
                      />
                      <input
                        placeholder={`Option ${j + 1}`}
                        className="flex-1 p-2 border rounded"
                        value={opt}
                        onChange={(e) => {
                          const newQuiz = [...quiz];
                          newQuiz[i].options[j] = e.target.value;
                          setQuiz(newQuiz);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 bg-[#F28C38] text-white rounded-xl font-bold hover:opacity-90"
          >
            Save Story
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-white border-2 border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
