import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { CheckinCard } from '../../components/CheckinCard';
import { DailyStatusRow, DailyStatus } from '../../components/DailyStatusRow';
import { MealRow, Meal } from '../../components/MealRow';
import { RadialFab } from '../../components/RadialFab';
import { PetMode } from '../../components/PetMode';
import { WorkoutLogModal } from '../../components/WorkoutLogModal';
import { ScanMealModal } from '../../components/ScanMealModal';
import { DetectedFood } from '../../services/visionApi';
import { colors, type, spacing } from '../../theme';

const initialMeals: Meal[] = [
  { id: '1', name: 'greek yogurt bowl', time: '8:12am', photoColors: [colors.clementinePale, colors.clementineSoft] },
  { id: '2', name: 'chicken, rice, broccoli', time: '12:40pm', photoColors: [colors.peach, colors.plum] },
];

const PROTEIN_GOAL = 120;

export function TodayScreen() {
  const [petVisible, setPetVisible] = useState(false);
  const [workoutModalVisible, setWorkoutModalVisible] = useState(false);
  const [scanModalVisible, setScanModalVisible] = useState(false);

  const [meals, setMeals] = useState<Meal[]>(initialMeals);
  const [proteinGrams, setProteinGrams] = useState(92);

  const handleLogMeal = (foods: DetectedFood[]) => {
    const mealName = foods.map((f) => f.name).join(', ');
    const scannedProtein = foods.reduce((sum, f) => sum + f.proteinGrams, 0);

    setMeals((prev) => [
      { id: String(Date.now()), name: mealName, time: 'just now', photoColors: [colors.clementinePale, colors.plum] },
      ...prev,
    ]);
    setProteinGrams((prev) => prev + scannedProtein);
  };

  const status: DailyStatus = {
    proteinGrams,
    proteinGoal: PROTEIN_GOAL,
    fuelProgress: 0.88,
    fuelLabel: 'fueled',
    varietyProgress: 0.5,
    varietyLabel: 'growing',
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.greeting}>
          hey <Text style={styles.greetingEm}>maya</Text> 🍊
        </Text>
        <Text style={styles.date}>tuesday · trained today</Text>

        <CheckinCard
          title="nice, you're well fueled"
          subtitle="a little more protein would help"
          onPress={() => setPetVisible(true)}
        />

        <DailyStatusRow status={status} />

        <Text style={styles.mealsLabel}>today</Text>
        {meals.map((meal) => (
          <MealRow key={meal.id} meal={meal} />
        ))}

        <RadialFab
          onScanMeal={() => setScanModalVisible(true)}
          onLogWorkout={() => setWorkoutModalVisible(true)}
        />
      </ScrollView>

      <PetMode visible={petVisible} onClose={() => setPetVisible(false)} />
      <WorkoutLogModal visible={workoutModalVisible} onClose={() => setWorkoutModalVisible(false)} />
      <ScanMealModal
        visible={scanModalVisible}
        onClose={() => setScanModalVisible(false)}
        onLogMeal={handleLogMeal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.cream },
  content: { padding: spacing.xl, paddingTop: 60, minHeight: '100%' },
  greeting: { ...type.greeting, color: colors.espresso },
  greetingEm: { fontStyle: 'italic', color: colors.clementine },
  date: { ...type.bodySmall, color: colors.espressoSoft, marginBottom: spacing.lg },
  mealsLabel: { ...type.label, color: colors.rust, marginBottom: spacing.sm },
});
