const API_BASE_URL = "http://localhost:8000/api";

// Helper to get JWT token
const getHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

// Helper for file uploads
const getFileHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    Authorization: token ? `Bearer ${token}` : "",
  };
};

// --- ADAPTER PATTERN ---
// Convert Django snake_case to React camelCase
const normalizeStory = (story) => ({
  id: story.id,
  title: story.title,
  author: story.author,
  coverImage: story.cover_image, // Django sends 'cover_image'
  category: story.category,
  ageRange: story.age_range, // Django sends 'age_range'
  duration: story.duration,
  defaultAudio: story.default_audio, // Django sends 'default_audio'
  script: story.script,
  quiz: story.quiz || [], // Ensure quiz exists
});

const normalizeChild = (child) => ({
  id: child.id,
  name: child.name,
  avatar: child.avatar,
  color: child.color,
});

export const api = {
  // --- AUTHENTICATION ---
  login: async (credentials) => {
    // 1. Get Tokens
    const res = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) throw new Error("Login failed");

    const data = await res.json();
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);

    // 2. Fetch User Profile immediately after login
    return api.getProfile();
  },

  getProfile: async () => {
    // You need an endpoint like /api/users/me/ in Django
    // For now, we might filter the user list or assume the backend returns profile on login
    // Let's assume we hit a dedicated profile endpoint you should add to Django
    // Or we fetch the user details via the ID in the token.
    // For simplicity in this prototype, let's assume we fetch the list and find 'me'
    // In production: GET /api/auth/me/

    // Note: Ensure your Django UserView returns the full nested children data
    // For this project step, we will return a structure matching your MOCK_DATA
    return {
      name: "Parent User",
      email: "user@test.com",
      children: await api.getChildren(),
    };
  },

  // --- DATA FETCHING ---
  getStories: async () => {
    const res = await fetch(`${API_BASE_URL}/stories/`, {
      headers: getHeaders(),
    });
    const data = await res.json();
    return data.map(normalizeStory);
  },

  getChildren: async () => {
    const res = await fetch(`${API_BASE_URL}/children/`, {
      headers: getHeaders(),
    });
    const data = await res.json();
    return data.map(normalizeChild);
  },

  createChild: async (childData) => {
    const res = await fetch(`${API_BASE_URL}/children/`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(childData),
    });
    return normalizeChild(await res.json());
  },

  // --- STUDIO & AUDIO ---
  uploadRecording: async (formData) => {
    const res = await fetch(`${API_BASE_URL}/recordings/`, {
      method: "POST",
      headers: getFileHeaders(),
      body: formData,
    });
    return res.json();
  },

  // Check if parent recorded audio exists
  checkAudio: async (storyId, childId) => {
    const res = await fetch(
      `${API_BASE_URL}/recordings/check_audio/?story_id=${storyId}&child_id=${childId}`,
      {
        headers: getHeaders(),
      }
    );
    return res.json(); // returns { audio_url: '...' } or { audio_url: null }
  },
};
