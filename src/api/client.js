import axios from "axios";

const API_URL = "https://torytime-backend.onrender.com/api";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach Token to every request EXCEPT auth endpoints
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  // Check if the URL is for login or register
  const isAuthRequest =
    config.url.includes("/auth/login/") ||
    config.url.includes("/auth/register/");

  if (token && !isAuthRequest) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const api = {
  login: (credentials) => apiClient.post("/auth/login/", credentials),

  // Registration
  register: (userData) => apiClient.post("/auth/register/", userData),

  // Fetch the current user's details
  getProfile: async () => {
    try {
      const res = await apiClient.get("/users/me/");
      return res.data;
    } catch (e) {
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
