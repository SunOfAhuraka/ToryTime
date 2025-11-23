// ============================================================================
// MOCK DATA - Simulating Multi-Tenant Structure
// ============================================================================

export const GLOBAL_STORIES = [
  {
    id: "global_1",
    title: "The Lion and the Mouse",
    author: "Aesop",
    coverImage:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI4MCIgZmlsbD0iI0ZGRDcwMCIvPjx0ZXh0IHg9IjEwMCIgeT0iMTQwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IiNGRjg4MDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPjxzdHJvbmcgcG9pbnRlci1ldmVudHM9Im5vbmUiPjwvc3Ryb25nPvCfpoE8L3RleHQ+PC9zdmc+",
    category: "Fables",
    ageRange: "4-7",
    duration: "5 min",
    defaultAudio: "https://example.com/default_lion_mouse.mp3",
    script: `Once upon a time, a mighty lion was sleeping in the forest. A tiny mouse ran across his paw and woke him up. The lion grabbed the mouse angrily. "Please let me go!" squeaked the mouse. "I promise I'll help you someday." The lion laughed but let him go. Days later, the lion was caught in a hunter's net. The mouse heard his roars and gnawed through the ropes to free him. "You saved me!" said the lion. The mouse replied, "Little friends can be great friends."`,
    quiz: [
      {
        question: "Where was the lion sleeping?",
        options: [
          "In the forest",
          "In a cave",
          "By the river",
          "On a mountain",
        ],
        correctAnswer: 0,
      },
      {
        question: "How did the mouse help the lion?",
        options: [
          "Brought him food",
          "Gnawed through the ropes",
          "Called for help",
          "Scared the hunter away",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is the moral of the story?",
        options: [
          "Big is always better",
          "Little friends can be great friends",
          "Never trust anyone",
          "Sleep is important",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "global_2",
    title: "The Tortoise and the Hare",
    author: "Aesop",
    coverImage:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI4MCIgZmlsbD0iIzRDQUY1MCIvPjx0ZXh0IHg9IjEwMCIgeT0iMTQwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IiMyRTdEMzIiIHRleHQtYW5jaG9yPSJtaWRkbGUiPjxzdHJvbmcgcG9pbnRlci1ldmVudHM9Im5vbmUiPjwvc3Ryb25nPvCfkKLwn5CHPC90ZXh0Pjwvc3ZnPg==",
    category: "Fables",
    ageRange: "4-7",
    duration: "6 min",
    defaultAudio: "https://example.com/default_tortoise_hare.mp3",
    script: `A hare was making fun of a tortoise for being slow. "Let's have a race," said the tortoise calmly. The hare laughed and agreed. When the race began, the hare sprinted ahead. He was so far ahead that he decided to take a nap. The tortoise kept walking slowly but steadily. When the hare woke up, he saw the tortoise crossing the finish line! "Slow and steady wins the race," said the tortoise with a smile.`,
    quiz: [
      {
        question: "Why did the hare take a nap?",
        options: [
          "He was tired",
          "He was winning by a lot",
          "The tortoise told him to",
          "It was bedtime",
        ],
        correctAnswer: 1,
      },
      {
        question: "Who won the race?",
        options: ["The hare", "The tortoise", "They tied", "Nobody"],
        correctAnswer: 1,
      },
      {
        question: 'What does "slow and steady wins the race" mean?',
        options: [
          "Always run fast",
          "Persistence pays off",
          "Take many naps",
          "Racing is fun",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "global_3",
    title: "The Three Little Pigs",
    author: "Traditional",
    coverImage:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI4MCIgZmlsbD0iI0ZGOTgwMCIvPjx0ZXh0IHg9IjEwMCIgeT0iMTQwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IiNFNjUxMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPjxzdHJvbmcgcG9pbnRlci1ldmVudHM9Im5vbmUiPjwvc3Ryb25nPvCfkLc8L3RleHQ+PC9zdmc+",
    category: "Fairy Tales",
    ageRange: "3-6",
    duration: "8 min",
    defaultAudio: "https://example.com/default_three_pigs.mp3",
    script: `Three little pigs set out to build their homes. The first pig built his house with straw. The second used sticks. The third pig worked hard and built his house with bricks. A big bad wolf came and huffed and puffed, blowing down the straw house and the stick house! But when he tried to blow down the brick house, it stood strong. The three pigs were safe inside, and they learned that hard work pays off.`,
    quiz: [
      {
        question: "What did the third pig use to build his house?",
        options: ["Straw", "Sticks", "Bricks", "Stone"],
        correctAnswer: 2,
      },
      {
        question: "What happened to the straw and stick houses?",
        options: [
          "They stood strong",
          "The wolf blew them down",
          "They caught fire",
          "The pigs sold them",
        ],
        correctAnswer: 1,
      },
      {
        question: "What lesson does this story teach?",
        options: [
          "Build quickly",
          "Hard work pays off",
          "Wolves are friendly",
          "Straw is strong",
        ],
        correctAnswer: 1,
      },
    ],
  },
];

// Database simulation - in production, this would be backend storage
export const PARENT_DATABASE = {
  "parent@storytime.com": {
    id: "parent_001",
    email: "parent@storytime.com",
    password: "demo",
    name: "Sarah Johnson",
    children: [
      { id: "child_1", name: "Emma", avatar: "👧", color: "#FF6B9D" },
      { id: "child_2", name: "Noah", avatar: "👦", color: "#4A90E2" },
    ],
    recordings: {
      child_1: {
        global_1: { blobUrl: null, recordedAt: "2024-01-15" },
      },
    },
    customStories: [],
    quizScores: {},
  },
  "john@storytime.com": {
    id: "parent_002",
    email: "john@storytime.com",
    password: "demo123",
    name: "John Smith",
    children: [
      { id: "child_3", name: "Sophia", avatar: "👧", color: "#9B59B6" },
    ],
    recordings: {},
    customStories: [],
    quizScores: {},
  },
};
