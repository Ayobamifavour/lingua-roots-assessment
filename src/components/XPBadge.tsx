import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  xp: number;
};

export default function XPBadge({ xp }: Props) {
  return (
    <View style={styles.badge}>
      <Text style={styles.star}>★</Text>
      <Text style={styles.text}>{xp} XP</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gold,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  star: {
    color: colors.white,
    marginRight: 4,
    fontSize: 14,
  },
  text: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
});