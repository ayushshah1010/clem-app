import React, { useRef, useState } from 'react';
import { View, Text, Pressable, Animated, StyleSheet, Modal } from 'react-native';
import Svg, { Ellipse, Path, Circle } from 'react-native-svg';
import { colors } from '../theme';

const PET_LINES = ["aww, that's nice", 'she loves that', 'happy clem', 'keep going :)', "she's purring"];

interface PetModeProps {
  visible: boolean;
  onClose: () => void;
}

export function PetMode({ visible, onClose }: PetModeProps) {
  const [tapCount, setTapCount] = useState(0);
  const [cheeksVisible, setCheeksVisible] = useState(false);
  const bounce = useRef(new Animated.Value(1)).current;
  const stretchY = useRef(new Animated.Value(1)).current;
  const textPop = useRef(new Animated.Value(1)).current;

  const line = tapCount === 0 ? 'hi there 🍊' : PET_LINES[tapCount % PET_LINES.length];

  const handlePet = () => {
    setTapCount((c) => c + 1);
    setCheeksVisible(true);
    setTimeout(() => setCheeksVisible(false), 500);

    bounce.setValue(1);
    stretchY.setValue(1);
    Animated.sequence([
      Animated.parallel([
        Animated.timing(bounce, { toValue: 1.14, duration: 130, useNativeDriver: true }),
        Animated.timing(stretchY, { toValue: 0.9, duration: 130, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(bounce, { toValue: 1, duration: 180, useNativeDriver: true }),
        Animated.timing(stretchY, { toValue: 1, duration: 180, useNativeDriver: true }),
      ]),
    ]).start();

    textPop.setValue(0.7);
    Animated.spring(textPop, { toValue: 1, useNativeDriver: true, friction: 5 }).start();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.screen}>
        <Pressable style={styles.backBtn} onPress={onClose}>
          <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
            <Path d="M15 18l-6-6 6-6" stroke={colors.espresso} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </Pressable>

        <Pressable onPress={handlePet} style={styles.mascotZone}>
          <Animated.View style={{ transform: [{ scaleX: bounce }, { scaleY: stretchY }] }}>
            <Svg width={200} height={200} viewBox="0 0 120 120">
              <Ellipse cx={60} cy={68} rx={46} ry={42} fill={colors.clementine} />
              <Path d="M60 26 Q68 6 88 10 Q74 18 70 28 Z" fill={colors.leaf} />
              <Ellipse cx={34} cy={76} rx={9} ry={6} fill={colors.rust} opacity={cheeksVisible ? 0.55 : 0} />
              <Ellipse cx={86} cy={76} rx={9} ry={6} fill={colors.rust} opacity={cheeksVisible ? 0.55 : 0} />
              <Circle cx={44} cy={64} r={5} fill={colors.espresso} />
              <Circle cx={76} cy={64} r={5} fill={colors.espresso} />
              <Path
                d={cheeksVisible ? 'M44 80 Q60 100 76 80' : 'M46 82 Q60 94 74 82'}
                stroke={colors.espresso}
                strokeWidth={4}
                fill="none"
                strokeLinecap="round"
              />
            </Svg>
          </Animated.View>
        </Pressable>

        <Animated.Text style={[styles.affectionLine, { transform: [{ scale: textPop }] }]}>{line}</Animated.Text>
        <Text style={styles.hint}>tap her again</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.peach, alignItems: 'center', justifyContent: 'center' },
  backBtn: {
    position: 'absolute',
    top: 60,
    left: 22,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascotZone: { width: 220, height: 220, alignItems: 'center', justifyContent: 'center' },
  affectionLine: {
    fontFamily: 'Fraunces_500Medium',
    fontSize: 24,
    color: colors.clementine,
    marginTop: 20,
    textAlign: 'center',
  },
  hint: { fontSize: 11, color: colors.espressoSoft, marginTop: 6 },
});
