import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme';

interface ProgressDotsProps {
  total: number;
  current: number; // 0-indexed
}

export function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => (
        <View key={i} style={[styles.dot, i === current && styles.dotActive]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 5, justifyContent: 'center', marginBottom: 18 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.creamDeep },
  dotActive: { backgroundColor: colors.clementine, width: 16, borderRadius: 3 },
});
