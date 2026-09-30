import { useState } from 'react';
import HomeScreen from '../components/HomeScreen';
import LessonPathScreen from '../components/LessonPathScreen';
import LessonScreen from '../components/LessonScreen';
import { levels } from '../data/lessonData';

type Screen = 'home' | 'path' | 'lesson';

export default function Index() {
  const [screen, setScreen] = useState<Screen>('home');
  const currentLevel = levels[0];

  if (screen === 'home') {
    return (
      <HomeScreen
        userName="Favour"
        streakDays={3}
        wordsLearned={12}
        cowriesEarned={240}
        currentLesson={6}
        onContinue={() => setScreen('path')}
      />
    );
  }

  if (screen === 'path') {
    return <LessonPathScreen lessonNumber={6} onSelectLesson={() => setScreen('lesson')} />;
  }

  return (
    <LessonScreen
      questions={currentLevel.questions}
      onFinish={() => setScreen('home')}
    />
  );
}