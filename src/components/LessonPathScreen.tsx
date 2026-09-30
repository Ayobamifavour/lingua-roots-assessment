// @ts-nocheck
// LessonPathScreen.tsx  (requires react-native-svg)
import React, { useEffect, useMemo, useRef } from 'react';
import { View, Text, Animated, Easing, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import Svg, { Defs, ClipPath, RadialGradient, LinearGradient, Stop, Rect, Path, Circle, Ellipse, G, Line } from 'react-native-svg';

const W = 315;
const H = 446;
const PATH_D =
  'M152 -22 C138 20 128 66 138 100 C150 135 176 150 168 188 C160 222 150 240 147 262 C142 290 148 316 150 340 C152 356 150 368 149 378';
const DRUM = { x: 115, y: 219 };
const SIGN = { x: 112, y: 97 };
const SPARK = { x: 167, y: 7 };

const rng = (seed) => () => (seed = (seed * 9301 + 49297) % 233280) / 233280;

const LEAF = 'M0 0 C8 -12 24 -12 34 0 C24 12 8 12 0 0Z';
const LEAF_HI = 'M0 0 C8 -12 24 -12 34 0 C20 -3 8 -3 0 0Z';

const Leaf = ({ x, y, r = 0, s = 1, fill, hi, d = LEAF }) => (
  <G transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <Path d={d} fill={fill} />
    {hi ? <Path d={LEAF_HI} fill={hi} opacity={0.7} /> : null}
    <Path d="M2 0 L30 0" stroke="#000" strokeOpacity={0.12} strokeWidth={0.8} />
  </G>
);

const Frond = ({ x, y, r = 0, s = 1, n = 11, len = 110, dark = '#2a7a16', light = '#57b52c' }) => {
  const leaflets = [];
  for (let i = 1; i <= n; i++) {
    const t = i / (n + 1);
    const px = t * len;
    const ll = len * 0.34 * (1 - t * 0.65);
    const w = ll * 0.18;
    const d = `M0 0 C${ll * 0.3} ${-w} ${ll * 0.7} ${-w} ${ll} 0 C${ll * 0.7} ${w} ${ll * 0.3} ${w} 0 0Z`;
    leaflets.push(
      <Path key={`a${i}`} d={d} fill={i % 2 ? dark : light} transform={`translate(${px} 0) rotate(-58)`} />,
      <Path key={`b${i}`} d={d} fill={i % 2 ? light : dark} transform={`translate(${px} 0) rotate(58)`} />
    );
  }
  return (
    <G transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <Path d={`M0 0 Q${len * 0.5} -3 ${len} 0`} stroke={dark} strokeWidth={2} fill="none" />
      {leaflets}
    </G>
  );
};

const edgeX = (y) => 92 + 6 * Math.sin(y / 40);

const LeafLite = ({ x, y, r, s, fill }) => (
  <Path d={LEAF} fill={fill} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} />
);

const Foliage = () => {
  const layers = useMemo(() => {
    const rand = rng(11);
    const make = (count, palette, sMin, sSpan) =>
      Array.from({ length: count }, (_, i) => {
        const y = rand() * (H + 10) - 5;
        return {
          key: i, x: rand() * (edgeX(y) + 2) - 6, y, r: rand() * 360,
          s: sMin + rand() * sSpan,
          fill: palette[Math.floor(rand() * palette.length)],
        };
      });
    return [
      make(140, ['#1f6a12', '#2a7a16', '#2f8a1a'], 0.55, 0.4),
      make(230, ['#3fa023', '#57b52c', '#4aa826', '#68c22f'], 0.4, 0.3),
      make(200, ['#7ccc38', '#8fd44a', '#a6dc3c'], 0.35, 0.25),
      make(90, ['#c5ea4a', '#d6f26a', '#b4e04a'], 0.3, 0.2),
    ];
  }, []);
  const edge = Array.from({ length: 23 }, (_, i) => `L${edgeX(i * 20)} ${i * 20}`).join(' ');
  return (
    <G>
      <Path d={`M0 0 ${edge} L0 ${H}Z`} fill="#2c8a18" />
      {layers.map((L, li) => L.map(({ key, ...p }) => <LeafLite key={`${li}-${key}`} {...p} />))}
      <Path d="M10 250 C40 270 30 320 62 340 C90 356 84 392 100 416" stroke="#1a5a10" strokeWidth={1.6} fill="none" />
      <Path d="M30 170 C60 195 56 230 84 250 C100 262 96 290 106 304" stroke="#1a5a10" strokeWidth={1.4} fill="none" />
      <Path d="M20 320 C50 316 62 350 46 390" stroke="#2f8a1a" strokeWidth={1.4} fill="none" />
    </G>
  );
};

const RightJungle = () => (
  <G>
    <Rect x={196} y={20} width={9} height={420} fill="#4a7a10" opacity={0.1} />
    <Rect x={214} y={60} width={6} height={380} fill="#4a7a10" opacity={0.08} />
    <Path d="M215 170 L232 170 L240 250 L206 250Z" fill="#4a7a10" opacity={0.1} />
    <Path d="M180 300 L230 300 L244 372 L172 372Z" fill="#4a7a10" opacity={0.08} />
    <Path d="M315 0 L262 0 C244 60 250 140 252 200 C254 280 262 340 315 400Z" fill="#7db518" />
    <Path d="M315 0 L292 0 C262 70 266 160 274 230 C284 300 300 350 315 372Z" fill="#96c81e" />
    <Path d="M315 0 L300 0 C280 90 286 240 315 340Z" fill="#c2e64a" />
    <Ellipse cx={263} cy={238} rx={21} ry={96} fill="#3f8a14" />
    <Ellipse cx={266} cy={238} rx={15} ry={86} fill="#8cc63a" />
    <Ellipse cx={268} cy={238} rx={8} ry={72} fill="#b7dc4a" opacity={0.85} />
    <Path d="M258 150 C252 200 254 280 262 330" stroke="#2c7d18" strokeWidth={3} fill="none" />
    <Path d="M315 396 L315 446 L240 446 C238 420 244 392 262 380Z" fill="#2c7d18" />
  </G>
);

const Bush = ({ cx, cy, r, dark, mid, light, pointed = false, n = 16 }) => {
  const pieces = useMemo(() => {
    const rand = rng(Math.round(cx * 7 + cy));
    const out = [];
    for (let ring = 0; ring < 3; ring++) {
      const rr = r * (0.72 - ring * 0.26);
      const count = n - ring * 4;
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2 + rand() * 0.4;
        out.push({
          key: `${ring}-${i}`,
          x: cx + Math.cos(a) * rr * 0.7, y: cy + Math.sin(a) * rr * 0.7,
          r: (a * 180) / Math.PI + (rand() - 0.5) * 30,
          s: (r / 60) * (1 - ring * 0.15) * (0.9 + rand() * 0.3),
          fill: ring === 0 ? dark : ring === 1 ? mid : light,
        });
      }
    }
    return out;
  }, [cx, cy, r, n]);
  return (
    <G>
      <Ellipse cx={cx + 3} cy={cy + r * 0.9} rx={r * 0.9} ry={r * 0.18} fill="#4a7a10" opacity={0.22} />
      <Circle cx={cx} cy={cy} r={r * 0.85} fill={dark} />
      {pieces.map(({ key, ...p }) => (
        <LeafLite key={key} {...p} />
      ))}
    </G>
  );
};

const Trail = () => (
  <G>
    <Path d={PATH_D} stroke="#7a4d20" strokeWidth={46} strokeLinecap="round" fill="none" transform="translate(3 4)" opacity={0.3} />
    <Path d={PATH_D} stroke="#b98447" strokeWidth={44} strokeLinecap="round" fill="none" />
    <Path d={PATH_D} stroke="#cf9a5b" strokeWidth={38} strokeLinecap="round" fill="none" />
    <Path d={PATH_D} stroke="#d9a866" strokeWidth={14} strokeLinecap="round" fill="none" opacity={0.35} transform="translate(-5 0)" />
  </G>
);

const Bridge = () => {
  const P0 = [122, 132], P1 = [165, 102], P2 = [192, 182];
  const pt = (t) => [
    (1 - t) ** 2 * P0[0] + 2 * (1 - t) * t * P1[0] + t ** 2 * P2[0],
    (1 - t) ** 2 * P0[1] + 2 * (1 - t) * t * P1[1] + t ** 2 * P2[1],
  ];
  return (
    <G>
      <Path d={`M${P0[0]} ${P0[1] + 4} Q${P1[0]} ${P1[1] + 4} ${P2[0]} ${P2[1] + 4}`} stroke="#3a2008" strokeWidth={20} fill="none" opacity={0.25} />
      <Path d={`M${P0[0]} ${P0[1]} Q${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]}`} stroke="#c88b4a" strokeWidth={20} fill="none" />
      {Array.from({ length: 12 }, (_, i) => {
        const [x, y] = pt(i / 11);
        return <Line key={i} x1={x - 9} y1={y - 3} x2={x + 9} y2={y + 4} stroke="#6b3d17" strokeWidth={1.8} />;
      })}
      <Path d={`M${P0[0] - 6} ${P0[1] - 8} Q${P1[0] - 6} ${P1[1] - 10} ${P2[0] - 6} ${P2[1] - 8}`} stroke="#5a3210" strokeWidth={2.4} fill="none" />
      <Path d={`M${P0[0] + 8} ${P0[1] + 6} Q${P1[0] + 8} ${P1[1] + 4} ${P2[0] + 8} ${P2[1] + 6}`} stroke="#5a3210" strokeWidth={2.4} fill="none" />
      {[0, 0.5, 1].map((t, i) => {
        const [x, y] = pt(t);
        return <Line key={`p${i}`} x1={x - 7} y1={y - 8} x2={x - 7} y2={y + 4} stroke="#5a3210" strokeWidth={2.4} />;
      })}
    </G>
  );
};

const Scroll = ({ x, y, r = 0 }) => (
  <G transform={`translate(${x} ${y}) rotate(${r})`}>
    <Rect x={-10} y={-19} width={20} height={38} rx={2} fill="#f6dfaa" stroke="#c9a566" strokeWidth={1.2} />
    <Ellipse cx={0} cy={-19} rx={11} ry={3} fill="#e9c882" stroke="#b58c4a" strokeWidth={1.2} />
    <Ellipse cx={0} cy={19} rx={11} ry={3} fill="#e9c882" stroke="#b58c4a" strokeWidth={1.2} />
    <Line x1={-5} y1={-7} x2={5} y2={-7} stroke="#c9a566" strokeWidth={1.2} />
    <Line x1={-5} y1={0} x2={5} y2={0} stroke="#c9a566" strokeWidth={1.2} />
    <Line x1={-5} y1={7} x2={3} y2={7} stroke="#c9a566" strokeWidth={1.2} />
  </G>
);

const Padlock = ({ x, y, k = 0.6 }) => (
  <G transform={`translate(${x} ${y}) scale(${k})`}>
    <Circle r={16} cy={4} fill="#fff7c0" opacity={0.55} />
    <Path d="M-5 -2 V-6 a5 5 0 0 1 10 0 V-2" stroke="#8a6a10" strokeWidth={2.2} fill="none" />
    <Rect x={-8} y={-2} width={16} height={12} rx={2.5} fill="#f2c318" stroke="#8a6a10" strokeWidth={1.5} />
    <Circle cx={0} cy={4} r={1.8} fill="#8a6a10" />
  </G>
);

const TalkingDrum = ({ x, y, k = 0.5 }) => (
  <G transform={`translate(${x} ${y}) scale(${k})`}>
    <Path d="M-15 -20 C-5 -6 -5 6 -15 20 L15 20 C5 6 5 -6 15 -20Z" fill="#8a3d14" stroke="#2b1a0c" strokeWidth={2.5} />
    <Path d="M-10 -14 L8 14 M-2 -16 L12 12 M5 -18 L14 4 M-13 -4 L4 16" stroke="#f2b632" strokeWidth={1.8} />
    <Ellipse cx={0} cy={-20} rx={15} ry={4.5} fill="#f0d29a" stroke="#2b1a0c" strokeWidth={2.5} />
    <Ellipse cx={0} cy={20} rx={15} ry={4.5} fill="#e2bd78" stroke="#2b1a0c" strokeWidth={2.5} />
    <Path d="M-15 -20 C-5 -6 -5 6 -15 20 M15 -20 C5 -6 5 6 15 20" stroke="#2b1a0c" strokeWidth={2.5} fill="none" />
  </G>
);

const GlowDefs = () => (
  <Defs>
    <RadialGradient id="drumGlow" cx="50%" cy="50%" r="50%">
      <Stop offset="0" stopColor="#ffffff" stopOpacity="1" />
      <Stop offset="0.5" stopColor="#fffbd0" stopOpacity="0.6" />
      <Stop offset="1" stopColor="#fffbd0" stopOpacity="0" />
    </RadialGradient>
    <RadialGradient id="spark" cx="50%" cy="50%" r="50%">
      <Stop offset="0" stopColor="#fff" stopOpacity="1" />
      <Stop offset="1" stopColor="#fff" stopOpacity="0" />
    </RadialGradient>
  </Defs>
);

const Pulse = ({ style, children, from = 0.92, to = 1.12, duration = 1600 }) => {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(v, { toValue: 1, duration, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(v, { toValue: 0, duration, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [v, duration]);
  return (
    <Animated.View
      pointerEvents="none"
      style={[style, {
        opacity: v.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }),
        transform: [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [from, to] }) }],
      }]}
    >
      {children}
    </Animated.View>
  );
};

export default function LessonPathScreen({ lessonNumber = 6, locked = true, onSelectLesson }) {
  const { width, height } = useWindowDimensions();
  // "cover" scaling so the scene fills the whole screen on web and mobile
    const scale = Math.min(width / W, height / H) * 0.95;
  const cardW = W * scale;
  const cardH = H * scale;
  const s = scale;
  const px = (n) => n * s;

  return (
    <View style={styles.screen}>
      <View style={{ width: cardW, height: cardH, overflow: 'visible' }}>
        <Svg width={cardW} height={cardH} viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
          <Defs>
            <RadialGradient id="bg" cx="58%" cy="55%" r="70%">
              <Stop offset="0" stopColor="#eef0a0" />
              <Stop offset="0.45" stopColor="#c4de5c" />
              <Stop offset="1" stopColor="#7db52a" />
            </RadialGradient>
          </Defs>
          <Defs>
            <ClipPath id="card"><Rect x={0} y={0} width={W} height={H} /></ClipPath>
          </Defs>
          <G clipPath="url(#card)">
            <Rect width={W} height={H} fill="url(#bg)" />
            <RightJungle />
            <Bush cx={236} cy={58} r={30} dark="#1d4a18" mid="#2f6b25" light="#4f8f3a" pointed n={18} />
            <Bush cx={259} cy={357} r={22} dark="#1d4a18" mid="#2f6b25" light="#4f8f3a" pointed n={16} />
            <Foliage />
            <Bush cx={94} cy={141} r={32} dark="#2d4a2b" mid="#4b7a42" light="#6c9a5e" n={20} />
          </G>

          <Trail />

          <G clipPath="url(#card)">
            <Bridge />
            <Bush cx={162} cy={38} r={27} dark="#2a7a16" mid="#57b52c" light="#8fd44a" n={18} />
            <Bush cx={187} cy={283} r={27} dark="#2f8a1a" mid="#57b52c" light="#8fd44a" n={18} />
            <Scroll x={168} y={100} r={53} />
            <Scroll x={129} y={294} r={50} />

            <Path d="M88 394 C110 398 130 408 150 422" stroke="#5a3210" strokeWidth={8} strokeLinecap="round" fill="none" />
            <Path d="M88 392 C110 396 130 406 150 419" stroke="#8a5a2a" strokeWidth={2.5} strokeLinecap="round" fill="none" />

            <Frond x={165} y={452} r={-118} n={10} len={72} dark="#2a7a16" light="#57b52c" />
            <Frond x={172} y={452} r={-92} n={10} len={78} dark="#3fa023" light="#7ccc38" />
            <Frond x={180} y={452} r={-62} n={10} len={78} dark="#2f8a1a" light="#57b52c" />
            <Frond x={190} y={452} r={-32} n={10} len={72} dark="#3fa023" light="#7ccc38" />

            <Frond x={66} y={8} r={22} n={10} len={68} dark="#2a7a16" light="#57b52c" />
            <Frond x={96} y={0} r={42} n={9} len={60} dark="#3fa023" light="#7ccc38" />
            <Frond x={272} y={0} r={155} n={9} len={62} dark="#2f8a1a" light="#57b52c" />
            <Frond x={300} y={4} r={140} n={8} len={55} dark="#3fa023" light="#7ccc38" />
          </G>
        </Svg>

        <Pulse style={[styles.abs, { left: px(DRUM.x - 32), top: px(DRUM.y - 32), width: px(64), height: px(64) }]}>
          <Svg width="100%" height="100%" viewBox="-32 -32 64 64">
            <GlowDefs />
            <Circle r={32} fill="url(#drumGlow)" />
          </Svg>
        </Pulse>

        <Svg width={cardW} height={cardH} viewBox={`0 0 ${W} ${H}`} style={styles.abs} pointerEvents="none">
          <G transform={`translate(${SIGN.x} ${SIGN.y}) rotate(-6)`}>
            <Rect x={-20} y={-13} width={40} height={26} rx={2} fill="#7a4319" stroke="#2b1a0c" strokeWidth={1.2} />
          </G>
          <Padlock x={SIGN.x + 2} y={SIGN.y + 18} />
          <TalkingDrum x={DRUM.x} y={DRUM.y} />
          <Padlock x={DRUM.x + 2} y={DRUM.y + 17} />
        </Svg>

        <Pulse from={0.7} to={1.2} duration={1200}
          style={[styles.abs, { left: px(SPARK.x - 14), top: px(SPARK.y - 14), width: px(28), height: px(28) }]}>
          <Svg width="100%" height="100%" viewBox="-14 -14 28 28">
            <GlowDefs />
            <Circle r={14} fill="url(#spark)" />
            <Path d="M0 -12 L2 0 L0 12 L-2 0Z M-12 0 L0 -2 L12 0 L0 2Z" fill="#fff" />
          </Svg>
        </Pulse>

        <View pointerEvents="none"
          style={[styles.abs, styles.signText, {
            left: px(SIGN.x - 20), top: px(SIGN.y - 13), width: px(40), height: px(26),
            transform: [{ rotate: '-6deg' }],
          }]}>
          <Text style={[styles.signSmall, { fontSize: px(7) }]}>Lesson</Text>
          <Text style={[styles.signBig, { fontSize: px(13) }]}>{lessonNumber}</Text>
        </View>

                <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Lesson ${lessonNumber}${locked ? ', locked' : ''}`}
          onPress={() => onSelectLesson?.()}
          style={[styles.abs, { left: px(SIGN.x - 28), top: px(SIGN.y - 20), width: px(56), height: px(65) }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4f4f4', overflow: 'hidden' },
  abs: { position: 'absolute', left: 0, top: 0 },
  signText: { alignItems: 'center', justifyContent: 'center' },
  signSmall: { color: '#fff3d6', fontWeight: '700' },
  signBig: { color: '#fff3d6', fontWeight: '900' },
});