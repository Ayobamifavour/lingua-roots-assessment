import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';
import { Question } from '../data/lessonData';
import ProgressBar from './ProgressBar';
import XPBadge from './XPBadge';
import AnswerOption from './AnswerOption';
import FeedbackBanner from './FeedbackBanner';
import ContinueButton from './ContinueButton';

type Props = {
  questions: Question[];
  onFinish: () => void;
};

export default function LessonScreen({ questions, onFinish }: Props) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [xp, setXp] = useState(0);
  const [complete, setComplete] = useState(false);

  const question = questions[questionIndex];
  const isLast = questionIndex === questions.length - 1;
  const isCorrect = selected === question?.correctAnswer;

  function handleSelect(option: string) {
    if (answered) return;
    setSelected(option);
  }

  function handleCheck() {
    if (!selected) return;
    setAnswered(true);
    if (selected === question.correctAnswer) {
      setXp((prev) => prev + question.xpReward);
    }
  }

  function handleContinue() {
    if (isLast) {
      setComplete(true);
      return;
    }
    setQuestionIndex((prev) => prev + 1);
    setSelected(null);
    setAnswered(false);
  }

  function statusFor(option: string) {
    if (!answered) return selected === option ? 'selected' : 'idle';
    if (option === question.correctAnswer) return 'correct';
    if (option === selected) return 'incorrect';
    return 'idle';
  }

  if (complete) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.completeContainer}>
          <Text style={styles.completeTitle}>Lesson complete!</Text>
          <Text style={styles.completeSubtitle}>You earned {xp} XP</Text>
          <View style={styles.completeButton}>
            <ContinueButton label="Back to Levels" disabled={false} onPress={onFinish} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <ProgressBar current={questionIndex + (answered ? 1 : 0)} total={questions.length} />
        <View style={styles.headerRow}>
          <Text style={styles.headerCount}>
            {questionIndex + 1} / {questions.length}
          </Text>
          <XPBadge xp={xp} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.prompt}>{question.prompt}</Text>

        {question.options.map((option) => (
          <AnswerOption
            key={option}
            label={option}
            status={statusFor(option)}
            disabled={answered}
            onPress={() => handleSelect(option)}
          />
        ))}

        {answered && <FeedbackBanner isCorrect={isCorrect} correctAnswer={question.correctAnswer} />}
      </ScrollView>

      <View style={styles.footer}>
        {!answered ? (
          <ContinueButton label="Check" disabled={!selected} onPress={handleCheck} />
        ) : (
          <ContinueButton label={isLast ? 'Finish' : 'Continue'} disabled={false} onPress={handleContinue} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 20, paddingTop: 12 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  headerCount: { color: colors.textSecondary, fontWeight: '600' },
  content: { padding: 20, paddingBottom: 40 },
  prompt: { fontSize: 22, fontWeight: '700', color: colors.textPrimary, marginBottom: 24 },
  footer: { padding: 20 },
  completeContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  completeTitle: { fontSize: 26, fontWeight: '700', color: colors.textPrimary, marginBottom: 8 },
  completeSubtitle: { fontSize: 18, color: colors.forest, fontWeight: '600', marginBottom: 24 },
  completeButton: { width: '100%' },
});