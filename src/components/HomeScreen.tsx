import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  userName: string;
  streakDays: number;
  wordsLearned: number;
  cowriesEarned: number;
  currentLesson: number;
  onContinue: () => void;
};

type Greeting = {
  title: string;
  subtitle: string;
};

export default function HomeScreen({
  userName,
  streakDays,
  wordsLearned,
  cowriesEarned,
  currentLesson,
  onContinue,
}: Props) {
  const greetings: Greeting[] = [
    { title: `Ẹ káàbọ̀, ${userName}!`, subtitle: 'Welcome! Ready to learn Yoruba?' },
    { title: 'Báwo ni?', subtitle: 'How are you?' },
    { title: 'Ó dàbọ̀!', subtitle: 'Goodbye for now — keep practicing!' },
  ];

  const [greetingIndex, setGreetingIndex] = useState(0);
  const greeting = greetings[greetingIndex];

  function handleDrumTap() {
    setGreetingIndex((prev) => (prev + 1) % greetings.length);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.patternStrip} />

      <View style={styles.header}>
        <Text style={styles.logo}>
          <Text style={styles.logoOrange}>Lingua </Text>
          <Text style={styles.logoGreen}>Roots</Text>
        </Text>
        <View style={styles.streakBadge}>
          <Text style={styles.streakText}>🔥 {streakDays} day streak</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.mascotRow}>
          <View style={styles.mascotCircle}>
            <Text style={styles.mascotEmoji}>🦉</Text>
          </View>
          <View style={styles.speechBubble}>
            <Text style={styles.speechTitle}>{greeting.title}</Text>
            <Text style={styles.speechSubtitle}>{greeting.subtitle}</Text>
          </View>
        </View>

        <Pressable style={styles.drumWrapper} onPress={handleDrumTap}>
          <Text style={styles.drumEmoji}>🪘</Text>
        </Pressable>

        <View style={styles.tapLabel}>
          <Text style={styles.tapLabelText}>Tap the talking drum</Text>
        </View>
      </View>

      <Pressable style={styles.continueButton} onPress={onContinue}>
        <Text style={styles.continueText}>Continue Lesson {currentLesson}</Text>
      </Pressable>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statIcon}>📖</Text>
          <Text style={styles.statNumber}>{wordsLearned}</Text>
          <Text style={styles.statLabel}>Words learned</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statIcon}>⭐</Text>
          <Text style={styles.statNumber}>{cowriesEarned}</Text>
          <Text style={styles.statLabel}>Cowries earned</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FDF3DC' },
  patternStrip: { height: 10, backgroundColor: '#2C2C54' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  logo: { fontSize: 20, fontWeight: '800' },
  logoOrange: { color: '#D9531E' },
  logoGreen: { color: colors.forest },
  streakBadge: {
    backgroundColor: '#FFF3D6',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  streakText: { fontSize: 13, fontWeight: '700', color: '#7A4B00' },
  card: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#F6A93B',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    overflow: 'hidden',
  },
  mascotRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  mascotCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.forest,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  mascotEmoji: { fontSize: 26 },
  speechBubble: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 10,
    maxWidth: 220,
  },
  speechTitle: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },
  speechSubtitle: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  drumWrapper: { paddingVertical: 20 },
  drumEmoji: { fontSize: 90 },
  tapLabel: {
    backgroundColor: colors.forest,
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 8,
    marginHorizontal: -20,
    marginBottom: -20,
  },
  tapLabelText: { color: colors.white, fontWeight: '700', fontSize: 13 },
  continueButton: {
    backgroundColor: '#D9531E',
    marginHorizontal: 20,
    marginTop: 24,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueText: { color: colors.white, fontSize: 16, fontWeight: '700' },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 16,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
  },
  statIcon: { fontSize: 18, marginBottom: 4 },
  statNumber: { fontSize: 18, fontWeight: '800', color: colors.textPrimary },
  statLabel: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
});