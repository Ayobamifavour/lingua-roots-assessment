import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  current: number;
  total: number;
};

export default function ProgressBar({ current, total }: Props) {
  const pct = Math.min((current / total) * 100, 100);

  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${pct}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 12,
    borderRadius: 8,
    backgroundColor: colors.progressTrack,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 8,
    backgroundColor: colors.forest,
  },
});