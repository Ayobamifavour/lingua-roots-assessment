import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  isCorrect: boolean;
  correctAnswer: string;
};

export default function FeedbackBanner({ isCorrect, correctAnswer }: Props) {
  return (
    <View style={[styles.banner, { backgroundColor: isCorrect ? colors.correctBg : colors.incorrectBg }]}>
      <Text style={[styles.title, { color: isCorrect ? colors.correct : colors.incorrect }]}>
        {isCorrect ? 'Correct! +10 XP' : 'Not quite'}
      </Text>
      {!isCorrect && (
        <Text style={styles.subtitle}>Correct answer: {correctAnswer}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
});