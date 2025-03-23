export const CHATS_DATA = [
  {
    id: 1,
    name: "Group 1",
    avatarColor: "bg-green-400",
    avatarText: "G",
    lastMessage: "User: Hello, there!...",
    time: "30m",
    unread: false,
    isActive: true,
    info: "2 Members",
  },
  {
    id: 2,
    name: "Chat 2",
    avatarColor: "bg-cyan-400",
    avatarText: "C",
    lastMessage: "You: hello",
    time: "32m",
    unread: false,
  },
  {
    id: 3,
    name: "Chat 3",
    avatarColor: "bg-cyan-600",
    avatarText: "C",
    lastMessage: "You: hello",
    time: "35m",
    unread: false,
  },
  {
    id: 4,
    name: "Chat 4",
    avatarColor: "bg-yellow-400",
    avatarText: "C",
    lastMessage: "User: hello",
    time: "40m",
    unread: false,
  },
  {
    id: 5,
    name: "Chat 5",
    avatarColor: "bg-yellow-300",
    avatarText: "C",
    lastMessage: "User: hello",
    time: "50m",
    unread: false,
  },
  {
    id: 6,
    name: "Chat 6",
    avatarColor: "bg-blue-400",
    avatarText: "C",
    lastMessage: "User: hello",
    time: "1h",
    unread: false,
  },
  {
    id: 7,
    name: "Chat 7",
    avatarColor: "bg-yellow-400",
    avatarText: "C",
    lastMessage: "User: hello",
    time: "2h",
    unread: true,
  },
];

export const MESSAGES_CHAT_1 = [
  {
    id: 1,
    content: "Hello, there! How are you doing?",
    fromUser: false,
    sender: "G",
    senderColor: "bg-green-400",
  },
  {
    id: 2,
    content: "Would you like to learn about...",
    fromUser: false,
    sender: "G",
    senderColor: "bg-green-400",
  },
  {
    id: 3,
    content: "Your car's extended warranty?",
    fromUser: false,
    sender: "G",
    senderColor: "bg-green-400",
  },
  { id: 4, content: "My car's extended warranty...?", fromUser: true },
  {
    id: 5,
    content: "You heard that right! Attaboy!",
    fromUser: false,
    sender: "G",
    senderColor: "bg-green-400",
  },
  {
    id: 6,
    content: "We are a car service provider",
    fromUser: false,
    sender: "G",
    senderColor: "bg-green-400",
  },
  {
    id: 7,
    content:
      "with over 20 years of experience across all things car-related! This text is supposed to be long for demonstration purposes so I am just going to yap all over here. Our car services cover everything for anything that moves! Would you believe it? That includes you!! How amazing, is it not? Our service is wonderful! In fact, I was a professional musical composer before I took on a job as a car salesman here and I found that being a car salesman was my actual dream-come-true. I wrote over 90 songs praising our car shop. You can look it up!",
    fromUser: false,
    sender: "G",
    senderColor: "bg-green-400",
  },
  {
    id: 8,
    content: "Yay!",
    fromUser: false,
    sender: "G",
    senderColor: "bg-green-400",
    // typing: true,
  },
];

export const MESSAGES_CHAT_2 = [
  {
    id: 1,
    content: "Welcome to Chat 2!",
    fromUser: false,
    sender: "C",
    senderColor: "bg-cyan-400",
  },
  { id: 2, content: "Hello, nice to meet you!", fromUser: true },
  {
    id: 3,
    content: "Are you interested in our latest product updates?",
    fromUser: false,
    sender: "C",
    senderColor: "bg-cyan-400",
  },
  { id: 4, content: "Yes, I'd like to know more", fromUser: true },
];

export const MESSAGES_CHAT_3 = [
  {
    id: 1,
    content: "This is a technical support chat",
    fromUser: false,
    sender: "C",
    senderColor: "bg-cyan-600",
  },
  { id: 2, content: "I'm having issues with my account", fromUser: true },
  {
    id: 3,
    content: "I'll help you troubleshoot. What's the specific problem?",
    fromUser: false,
    sender: "C",
    senderColor: "bg-cyan-600",
  },
];

export const MESSAGES_CHAT_4 = [
  {
    id: 1,
    content: "Project Discussion - Website Redesign",
    fromUser: false,
    sender: "C",
    senderColor: "bg-yellow-400",
  },
  {
    id: 2,
    content: "I've completed the initial mockups",
    fromUser: true,
  },
  {
    id: 3,
    content: "Great! Let's schedule a review meeting tomorrow",
    fromUser: false,
    sender: "C",
    senderColor: "bg-yellow-400",
  },
];

export const MESSAGES_CHAT_5 = [
  {
    id: 1,
    content: "Good morning team!",
    fromUser: false,
    sender: "C",
    senderColor: "bg-yellow-300",
  },
  {
    id: 2,
    content: "Good morning!",
    fromUser: true,
  },
];

export const MESSAGES_CHAT_6 = [
  {
    id: 1,
    content: "Marketing Campaign Discussion",
    fromUser: false,
    sender: "C",
    senderColor: "bg-cyan-400",
  },
  {
    id: 2,
    content: "I've analyzed the latest metrics",
    fromUser: true,
  },
  {
    id: 3,
    content: "What insights did you find?",
    fromUser: false,
    sender: "C",
    senderColor: "bg-cyan-400",
  },
];

export const MESSAGES_CHAT_7 = [
  {
    id: 1,
    content: "New product launch meeting",
    fromUser: false,
    sender: "C",
    senderColor: "bg-yellow-400",
  },
  {
    id: 2,
    content: "Is everyone prepared for the launch next week?",
    fromUser: false,
    sender: "C",
    senderColor: "bg-yellow-400",
  },
];

export const ALL_MESSAGES = {
  1: MESSAGES_CHAT_1,
  2: MESSAGES_CHAT_2,
  3: MESSAGES_CHAT_3,
  4: MESSAGES_CHAT_4,
  5: MESSAGES_CHAT_5,
  6: MESSAGES_CHAT_6,
  7: MESSAGES_CHAT_7,
};
