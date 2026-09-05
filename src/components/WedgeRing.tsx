import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors, type } from '../theme';

interface WedgeRingProps {
  /** 0 to 1. Drives the visual fill only -- never rendered as a raw percentage. */
  progress: number;
  color: string;
  /** What shows inside the ring. Protein: "92g". Fuel/variety: a word, e.g. "fueled". */
  centerLabel: string;
  label: string;
  size?: number;
}

/**
 * The core progress unit across the whole app (protein / fuel / variety).
 * Deliberately never renders a bare percentage for fuel or variety --
 * see product decision: numbers stay directional unless the user opts in
 * via Settings > Advanced > "show exact numbers".
 */
export function WedgeRing({ progress, color, centerLabel, label, size = 56 }: WedgeRingProps) {
  const strokeWidth = 9;
  const radius = size / 2 - strokeWidth / 2 - 2;
  const circumference = 2 * Math.PI * radius;
  const dash = Math.max(0, Math.min(1, progress)) * circumference;

  return (
    <View style={styles.wrap}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.creamDeep}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          fill="none"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <Text style={[styles.centerLabel, { position: 'absolute', width: size, textAlign: 'center' }]}>
        {centerLabel}
      </Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center' },
  centerLabel: { ...type.dataMedium, color: colors.espresso, top: 20 },
  label: { ...type.bodySmall, fontFamily: type.label.fontFamily, color: colors.espresso, marginTop: 6 },
});
