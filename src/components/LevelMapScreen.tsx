import React from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import Svg, { Path, Circle, Ellipse, Rect, Line } from 'react-native-svg';
import { colors } from '../theme/colors';
import { levels } from '../data/lessonData';

type Props = {
  onSelectLevel: (levelId: string) => void;
};

const NODE_TOP_PCT = [20, 50, 78];
const NODE_LEFT_PCT = [50, 36, 50];

export default function LevelMapScreen({ onSelectLevel }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.titleBar}>
        <Text style={styles.title}>LINGUA ROOTS</Text>
      </View>

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

            <Circle cx="110" cy="150" r="18" fill="#2C5A2C" />
            <Circle cx="290" cy="350" r="16" fill="#2C5A2C" />
          </Svg>

          {levels.map((level, index) => (
            <Pressable
              key={level.id}
              style={[
                styles.node,
                {
                  top: `${NODE_TOP_PCT[index]}%`,
                  left: `${NODE_LEFT_PCT[index]}%`,
                  transform: [{ translateX: -36 }, { translateY: -36 }],
                },
              ]}
              onPress={() => onSelectLevel(level.id)}
            >
              <View style={styles.nodeCircle}>
                <Text style={styles.nodeNumber}>{index + 1}</Text>
              </View>
              <View style={styles.nodeLabelCard}>
                <Text style={styles.nodeLabelText}>{level.title}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#2E6B2E' },
  titleBar: { paddingTop: 16, paddingBottom: 8, alignItems: 'center' },
  title: { color: colors.white, fontSize: 20, fontWeight: '800', letterSpacing: 2 },
  mapWrapper: { flex: 1, alignItems: 'center' },
  mapContainer: { width: '100%', maxWidth: 420, aspectRatio: 400 / 600, position: 'relative' },
  node: { position: 'absolute', width: 72, alignItems: 'center' },
  nodeCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.white,
  },
  nodeNumber: { color: colors.white, fontSize: 24, fontWeight: '800' },
  nodeLabelCard: {
    marginTop: 8,
    backgroundColor: colors.card,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    maxWidth: 130,
  },
  nodeLabelText: { fontSize: 12, fontWeight: '700', color: colors.textPrimary, textAlign: 'center' },
});