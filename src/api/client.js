import axios from "axios";

const API_URL = "https://torytime-backend.onrender.com/api";
const LOCAL_API_URL = "http://127.0.0.1:8000/api";

const apiClient = axios.create({
  baseURL: LOCAL_API_URL,
  headers: { "Content-Type": "application/json" },
});

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  isRefreshing = false;
  failedQueue = [];
};

// Attach Token to every request EXCEPT auth endpoints
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  // Check if the URL is for login or register
  const isAuthRequest =
    config.url.includes("/auth/login/") ||
    config.url.includes("/auth/register/") ||
    config.url.includes("/auth/refresh/");

  if (token && !isAuthRequest) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Handle 401 responses and refresh token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired (401) and it's not a refresh request
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        // No refresh token available, redirect to login
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${LOCAL_API_URL}/auth/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = response.data.access;
        localStorage.setItem("access_token", newAccessToken);
        apiClient.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);
        return apiClient(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

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
      console.error("Profile fetch failed:", e);
      // Return fallback with a default ID
      return {
        id: 1, // Default fallback
        is_staff: localStorage.getItem("user_role") === "admin",
        name: "Parent",
      };
    }
  },

  getChildren: () => apiClient.get("/children/"),
  createChild: (data) => apiClient.post("/children/", data),

  getStories: () => apiClient.get("/stories/"),
  createStory: (data) => apiClient.post("/stories/", data),
  deleteStory: (id) => apiClient.delete(`/stories/${id}/`),

  uploadRecording: (formData) =>
    apiClient.post("/recordings/", formData, {
      headers: {
        "Content-Type": undefined,
      },
    }),

  // Fetch recordings with optional query params (e.g., { child_id })
  getRecordings: (params) => apiClient.get("/recordings/", { params }),

  checkAudio: (storyId, childId) =>
    apiClient.get(
      `/recordings/check_audio/?story_id=${storyId}&child_id=${childId}`,
    ),

  // Quiz Results
  saveQuizResult: (data) => apiClient.post("/quiz-results/", data),
  getQuizResults: (params) => apiClient.get("/quiz-results/", { params }),
  getChildQuizResults: (childId) =>
    apiClient.get(`/quiz-results/?child_id=${childId}`),
};

export default apiClient;
