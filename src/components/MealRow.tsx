import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors, type, spacing, radius } from '../theme';

export interface Meal {
  id: string;
  name: string;
  time: string;
  photoColors: [string, string];
}

interface MealRowProps {
  meal: Meal;
  onPress?: (meal: Meal) => void;
}

export function MealRow({ meal, onPress }: MealRowProps) {
  return (
    <Pressable
      onPress={() => onPress?.(meal)}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    >
      <View style={[styles.photo, { backgroundColor: meal.photoColors[0] }]} />
      <View>
        <Text style={styles.name}>{meal.name}</Text>
        <Text style={styles.time}>{meal.time}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
  },
  rowPressed: { backgroundColor: colors.peach },
  photo: { width: 28, height: 28, borderRadius: 9 },
  name: { ...type.body, fontFamily: type.body.fontFamily, fontWeight: '600' as const, color: colors.espresso },
  time: { ...type.bodySmall, color: colors.espressoSoft },
});
