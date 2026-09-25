import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

type Status = 'idle' | 'selected' | 'correct' | 'incorrect';

type Props = {
  label: string;
  status: Status;
  disabled: boolean;
  onPress: () => void;
};

export default function AnswerOption({ label, status, disabled, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.option, styleForStatus(status)]}
    >
      <Text style={[styles.label, status === 'idle' ? styles.labelIdle : styles.labelActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

function styleForStatus(status: Status) {
  switch (status) {
    case 'selected':
      return { borderColor: colors.forest, backgroundColor: colors.card };
    case 'correct':
      return { borderColor: colors.correct, backgroundColor: colors.correctBg };
    case 'incorrect':
      return { borderColor: colors.incorrect, backgroundColor: colors.incorrectBg };
    default:
      return { borderColor: colors.cardBorder, backgroundColor: colors.card };
  }
}

const styles = StyleSheet.create({
  option: {
    borderWidth: 2,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  labelIdle: {
    color: colors.textPrimary,
  },
  labelActive: {
    color: colors.textPrimary,
  },
});