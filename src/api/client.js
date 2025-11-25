import axios from "axios";

const API_URL = "https://torytime-backend.onrender.com/api";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach Token to every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  login: (credentials) => apiClient.post("/auth/login/", credentials),

  // Fetch the current user's details
  getProfile: async () => {
    // Assuming backend endpoint exists or filtering users.
    // For now, returning mock structure if backend isn't fully ready
    try {
      const res = await apiClient.get("/users/me/");
      return res.data;
    } catch (e) {
      // Fallback for prototype
      return { is_staff: localStorage.getItem("user_role") === "admin" };
    }
  },

  getChildren: () => apiClient.get("/children/"),
  createChild: (data) => apiClient.post("/children/", data),

  getStories: () => apiClient.get("/stories/"),
  createStory: (data) => apiClient.post("/stories/", data),
  deleteStory: (id) => apiClient.delete(`/stories/${id}/`),

  uploadRecording: (formData) =>
    apiClient.post("/recordings/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  checkAudio: (storyId, childId) =>
    apiClient.get(
      `/recordings/check_audio/?story_id=${storyId}&child_id=${childId}`
    ),
};

export default apiClient;
