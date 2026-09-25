import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  onStart: () => void;
};

export default function SplashScreen({ onStart }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LINGUA ROOTS</Text>
      <Text style={styles.subtitle}>Learn languages, rooted in culture</Text>
      <Pressable style={styles.button} onPress={onStart}>
        <Text style={styles.buttonText}>Start</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.forest,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 2,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.85,
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: colors.gold,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 48,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});