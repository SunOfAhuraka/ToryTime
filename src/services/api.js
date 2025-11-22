// API Service & Mock Data

export const API_BASE_URL = "http://localhost:8000/api";

export const api = {
  // Public endpoints
  getStories: () => fetch(`${API_BASE_URL}/stories/`).then((r) => r.json()),
  getStory: (id) =>
    fetch(`${API_BASE_URL}/stories/${id}/`).then((r) => r.json()),

  // Auth endpoints
  login: (credentials) =>
    fetch(`${API_BASE_URL}/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    }).then((r) => r.json()),

  // Admin endpoints
  createStory: (data, token) =>
    fetch(`${API_BASE_URL}/stories/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  updateStory: (id, data, token) =>
    fetch(`${API_BASE_URL}/stories/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  deleteStory: (id, token) =>
    fetch(`${API_BASE_URL}/stories/${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),

  uploadIllustration: (formData, token) =>
    fetch(`${API_BASE_URL}/stories/upload-illustration/`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    }).then((r) => r.json()),

  createQuiz: (data, token) =>
    fetch(`${API_BASE_URL}/stories/create-quiz/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
};

// Mock data for demo
export const mockStories = [
  {
    id: 1,
    title: "The Lion and the Mouse",
    category: "Fables",
    culture: "African",
    illustration:
      "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=400",
    summary:
      "A small mouse helps a mighty lion, teaching us that kindness matters no matter how small you are!",
    content:
      "Once upon a time, in the vast African savanna, there lived a mighty lion. One day, while the lion was sleeping under a shady tree, a little mouse accidentally ran across his nose. The lion woke up with a roar and caught the mouse with his huge paw.\n\n'Please let me go!' squeaked the mouse. 'I promise I will help you someday!'\n\nThe lion laughed. 'How could a tiny mouse like you ever help a mighty lion like me?' But he was feeling kind that day, so he let the mouse go.\n\nA few days later, the lion got caught in a hunter's net. He roared and struggled, but he couldn't break free. The little mouse heard the lion's roars and came running. Using his sharp little teeth, the mouse chewed through the ropes of the net until the lion was free!\n\n'Thank you, little friend,' said the lion. 'I learned that even the smallest friend can be the greatest friend of all.'",
    audio_url: null,
    quiz: {
      questions: [
        {
          question: "Where did the lion live?",
          options: [
            "In a cave",
            "In the savanna",
            "In a house",
            "In the ocean",
          ],
          correct: 1,
        },
        {
          question: "How did the mouse help the lion?",
          options: [
            "Gave him food",
            "Chewed the ropes",
            "Called for help",
            "Scared the hunters",
          ],
          correct: 1,
        },
        {
          question: "What did the lion learn?",
          options: [
            "To sleep better",
            "Small friends can help too",
            "To catch mice",
            "To climb trees",
          ],
          correct: 1,
        },
      ],
    },
  },
  {
    id: 2,
    title: "Anansi and the Wisdom Pot",
    category: "Folk Tales",
    culture: "West African",
    illustration:
      "https://images.unsplash.com/photo-1577058946099-597dc5bc5984?w=400",
    summary:
      "Anansi the spider tries to keep all the wisdom for himself, but learns an important lesson!",
    content:
      "Long ago in West Africa, there lived a clever spider named Anansi. One day, Anansi decided he wanted to be the wisest creature in the world. So he collected all the wisdom he could find and put it in a large pot.\n\n'I will keep all this wisdom for myself!' said Anansi. 'Then I will be the smartest of all!'\n\nAnansi decided to hide the pot at the top of a tall tree. He tied the pot to his belly and started climbing. But the pot kept getting in his way!\n\nAnansi's young son was watching. 'Father,' he called, 'why don't you tie the pot to your back? Then you can climb more easily!'\n\nAnansi realized his son was right. Then he thought, 'If my young son is already so wise, then I cannot keep all the wisdom to myself!'\n\nSo Anansi tipped over the pot, and all the wisdom scattered across the world. That's why today, everyone has some wisdom to share!",
    audio_url: null,
    quiz: {
      questions: [
        {
          question: "What did Anansi collect in the pot?",
          options: ["Food", "Water", "Wisdom", "Gold"],
          correct: 2,
        },
        {
          question: "Who gave Anansi good advice?",
          options: ["His mother", "His son", "A bird", "Another spider"],
          correct: 1,
        },
        {
          question: "What happened to the wisdom?",
          options: [
            "Anansi kept it",
            "It was stolen",
            "It scattered everywhere",
            "It disappeared",
          ],
          correct: 2,
        },
      ],
    },
  },
  {
    id: 3,
    title: "The Rainbow Serpent",
    category: "Creation Stories",
    culture: "Aboriginal Australian",
    illustration:
      "https://images.unsplash.com/photo-1614607242094-b1b2369d5d68?w=400",
    summary:
      "Learn how the Rainbow Serpent shaped the land and created the rivers and mountains!",
    content:
      "In the Dreamtime, before animals and plants, the Rainbow Serpent slept beneath the ground. One day, she woke up and pushed through the earth's surface.\n\nAs the Rainbow Serpent traveled across the flat land, her huge body carved out rivers and valleys. Where she curled up to rest, she made waterholes and lakes. When she stood up, she made mountains and hills.\n\nThe Rainbow Serpent called all the animals to her. 'You must follow my laws,' she said. 'Those who obey will be rewarded with my gifts. Those who do not will be punished.'\n\nThe animals who obeyed received the gift of life in special forms. Some became birds and flew to the trees. Others became fish and swam in the rivers the Rainbow Serpent had made. Those who disobeyed turned into stone, becoming part of the landscape.\n\nWhen the Rainbow Serpent finished creating the world, she returned to the waterhole. But you can still see her when the rain falls and the sun shines - she appears as a beautiful rainbow in the sky!",
    audio_url: null,
    quiz: null,
  },
];
