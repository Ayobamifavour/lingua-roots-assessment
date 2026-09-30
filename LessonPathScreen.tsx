import React from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import Svg, { Path, Ellipse, Rect, Line } from 'react-native-svg';
import { colors } from '../theme/colors';

type Props = {
  lessonNumber: number;
  onSelectLesson: () => void;
};

export default function LessonPathScreen({ lessonNumber, onSelectLesson }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.mapWrapper}>
        <View style={styles.mapContainer}>
          <Svg width="100%" height="100%" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
            <Rect x="0" y="0" width="90" height="600" fill="#2E6B2E" />
            <Ellipse cx="30" cy="80" rx="60" ry="50" fill="#3D7A3D" />
            <Ellipse cx="20" cy="220" rx="55" ry="60" fill="#4A8C4A" />
            <Ellipse cx="35" cy="380" rx="60" ry="55" fill="#3D7A3D" />
            <Ellipse cx="20" cy="520" rx="55" ry="60" fill="#4A8C4A" />

            <Rect x="330" y="0" width="70" height="600" fill="#4A8C4A" />
            <Ellipse cx="380" cy="100" rx="55" ry="60" fill="#5FA35F" />
            <Ellipse cx="390" cy="280" rx="60" ry="65" fill="#3D7A3D" />
            <Ellipse cx="375" cy="450" rx="55" ry="60" fill="#5FA35F" />

            <Path
              d="M200,0 C150,60 250,100 200,150 C150,200 250,240 190,290 C140,330 250,380 200,430 C150,470 250,520 200,600"
              stroke={colors.path}
              strokeWidth="46"
              fill="none"
              strokeLinecap="round"
            />

            <Line x1="150" y1="205" x2="250" y2="205" stroke="#7A5230" strokeWidth="10" />
            <Line x1="150" y1="205" x2="160" y2="185" stroke="#7A5230" strokeWidth="6" />
            <Line x1="250" y1="205" x2="240" y2="185" stroke="#7A5230" strokeWidth="6" />
            <Line x1="175" y1="205" x2="182" y2="185" stroke="#7A5230" strokeWidth="4" />
            <Line x1="200" y1="205" x2="200" y2="185" stroke="#7A5230" strokeWidth="4" />
            <Line x1="225" y1="205" x2="218" y2="185" stroke="#7A5230" strokeWidth="4" />
          </Svg>

          <Pressable
            style={[styles.lessonNode, { top: '24%', left: '50%', transform: [{ translateX: -44 }, { translateY: -30 }] }]}
            onPress={onSelectLesson}
          >
            <View style={styles.lessonBadge}>
              <Text style={styles.lessonBadgeText}>Lesson</Text>
              <Text style={styles.lessonNumber}>{lessonNumber}</Text>
            </View>
          </Pressable>

          <View style={[styles.iconMarker, { top: '43%', left: '50%', transform: [{ translateX: -18 }] }]}>
            <Text style={styles.iconEmoji}>⏳</Text>
          </View>

          <View style={[styles.scrollMarker, { top: '20%', left: '68%' }]}>
            <Text style={styles.iconEmoji}>📜</Text>
          </View>
          <View style={[styles.scrollMarker, { top: '58%', left: '68%' }]}>
            <Text style={styles.iconEmoji}>📜</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#2E6B2E' },
  mapWrapper: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  mapContainer: { width: '100%', maxWidth: 420, aspectRatio: 400 / 600, position: 'relative' },
  lessonNode: { position: 'absolute' },
  lessonBadge: {
    backgroundColor: '#7A4B1E',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.gold,
  },
  lessonBadgeText: { color: colors.white, fontSize: 11, fontWeight: '700' },
  lessonNumber: { color: colors.gold, fontSize: 20, fontWeight: '800' },
  iconMarker: { position: 'absolute' },
  scrollMarker: { position: 'absolute' },
  iconEmoji: { fontSize: 28 },
});