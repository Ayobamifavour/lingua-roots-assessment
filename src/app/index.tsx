import React, { useState } from 'react';
import SplashScreen from '../components/SplashScreen';
import LevelMapScreen from '../components/LevelMapScreen';
import LessonScreen from '../components/LessonScreen';
import { levels } from '../data/lessonData';

type Screen = 'splash' | 'levels' | 'lesson';

export default function Index() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [activeLevelId, setActiveLevelId] = useState<string | null>(null);

  if (screen === 'splash') {
    return <SplashScreen onStart={() => setScreen('levels')} />;
  }

  if (screen === 'levels') {
    return (
      <LevelMapScreen
        onSelectLevel={(levelId) => {
          setActiveLevelId(levelId);
          setScreen('lesson');
        }}
      />
    );
  }

  const activeLevel = levels.find((l) => l.id === activeLevelId) ?? levels[0];

  return <LessonScreen questions={activeLevel.questions} onFinish={() => setScreen('levels')} />;
}