export const congratsMessages = [
  "Great job completing that task! 🎉",
  "Another one bites the dust! 💪",
  "You're on fire! Keep it up! 🔥",
  "Task completed like a boss! 😎",
  "Way to go! You're making progress! ⭐",
  "Mission accomplished! 🚀",
  "You're crushing it! 💫",
  "One step closer to your goals! 🎯",
  "Success looks good on you! 🌟",
  "That's what I call productivity! 📈"
];

export const getRandomCongrats = () => {
  const randomIndex = Math.floor(Math.random() * congratsMessages.length);
  return congratsMessages[randomIndex];
}; 