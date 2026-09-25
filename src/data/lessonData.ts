export type Question = {
  id: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
  xpReward: number;
};

export type Level = {
  id: string;
  title: string;
  questions: Question[];
};

export const levels: Level[] = [
  {
    id: 'level1',
    title: 'Level 1 · Greetings',
    questions: [
      { id: 'q1', prompt: 'What does "Ekaaro" mean in English?', options: ['Good morning', 'Good night', 'Thank you', 'Goodbye'], correctAnswer: 'Good morning', xpReward: 10 },
      { id: 'q2', prompt: 'What does "E kaasan" mean in English?', options: ['Good afternoon', 'Good morning', 'See you soon', 'Sorry'], correctAnswer: 'Good afternoon', xpReward: 10 },
      { id: 'q3', prompt: 'What does "O da bo" mean in English?', options: ['Hello', 'Goodbye', 'Please', 'Welcome'], correctAnswer: 'Goodbye', xpReward: 10 },
      { id: 'q4', prompt: 'What does "Pele" mean in English?', options: ['Sorry', 'Thank you', 'Water', 'House'], correctAnswer: 'Sorry', xpReward: 10 },
      { id: 'q5', prompt: 'What does "E se" mean in English?', options: ['Please', 'Thank you', 'Goodbye', 'Welcome'], correctAnswer: 'Thank you', xpReward: 10 },
    ],
  },
  {
    id: 'level2',
    title: 'Level 2 · Numbers',
    questions: [
      { id: 'q1', prompt: 'What number is "Ookan"?', options: ['One', 'Two', 'Three', 'Four'], correctAnswer: 'One', xpReward: 10 },
      { id: 'q2', prompt: 'What number is "Eeji"?', options: ['One', 'Two', 'Three', 'Five'], correctAnswer: 'Two', xpReward: 10 },
      { id: 'q3', prompt: 'What number is "Eeta"?', options: ['Two', 'Three', 'Four', 'Five'], correctAnswer: 'Three', xpReward: 10 },
      { id: 'q4', prompt: 'What number is "Eerin"?', options: ['Three', 'Four', 'Five', 'Six'], correctAnswer: 'Four', xpReward: 10 },
      { id: 'q5', prompt: 'What number is "Aarun"?', options: ['Four', 'Five', 'Six', 'Seven'], correctAnswer: 'Five', xpReward: 10 },
    ],
  },
  {
    id: 'level3',
    title: 'Level 3 · Food',
    questions: [
      { id: 'q1', prompt: 'What does "Iresi" mean in English?', options: ['Rice', 'Meat', 'Water', 'Bread'], correctAnswer: 'Rice', xpReward: 10 },
      { id: 'q2', prompt: 'What does "Eran" mean in English?', options: ['Fish', 'Meat', 'Egg', 'Fruit'], correctAnswer: 'Meat', xpReward: 10 },
      { id: 'q3', prompt: 'What does "Omi" mean in English?', options: ['Fire', 'Water', 'Earth', 'Air'], correctAnswer: 'Water', xpReward: 10 },
      { id: 'q4', prompt: 'What does "Ogede" mean in English?', options: ['Banana', 'Orange', 'Yam', 'Bean'], correctAnswer: 'Banana', xpReward: 10 },
      { id: 'q5', prompt: 'What does "Eyin" mean in English?', options: ['Egg', 'Chicken', 'Milk', 'Corn'], correctAnswer: 'Egg', xpReward: 10 },
    ],
  },
];