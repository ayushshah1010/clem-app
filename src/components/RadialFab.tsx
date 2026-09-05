import React, { useRef, useState } from 'react';
import { View, Text, Pressable, Animated, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { colors } from '../theme';

interface RadialFabProps {
  onScanMeal: () => void;
  onLogWorkout: () => void;
}

/**
 * The + button that expands into two options: scan a meal, log a workout.
 * Ported from the interactive HTML mockup -- same left/right split,
 * same rotate-to-x behavior on the main button.
 */
export function RadialFab({ onScanMeal, onLogWorkout }: RadialFabProps) {
  const [open, setOpen] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    Animated.spring(anim, {
      toValue: open ? 0 : 1,
      useNativeDriver: true,
      friction: 6,
      tension: 80,
    }).start();
    setOpen(!open);
  };

  const close = () => {
    if (!open) return;
    Animated.spring(anim, { toValue: 0, useNativeDriver: true, friction: 6, tension: 80 }).start();
    setOpen(false);
  };

  const rotate = anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '45deg'] });
  const leftX = anim.interpolate({ inputRange: [0, 1], outputRange: [0, -78] });
  const rightX = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 78] });
  const optY = anim.interpolate({ inputRange: [0, 1], outputRange: [0, -18] });
  const optScale = anim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] });
  const optOpacity = anim;

  return (
    <View style={styles.zone} pointerEvents="box-none">
      {open && <Pressable style={StyleSheet.absoluteFill} onPress={close} />}

      <Animated.View
        style={[
          styles.option,
          {
            transform: [{ translateX: leftX }, { translateY: optY }, { scale: optScale }],
            opacity: optOpacity,
          },
        ]}
        pointerEvents={open ? 'auto' : 'none'}
      >
        <Animated.Text style={[styles.label, { opacity: optOpacity }]}>scan a meal</Animated.Text>
        <Pressable
          style={styles.optionCircle}
          onPress={() => {
            close();
            onScanMeal();
          }}
        >
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
            <Path
              d="M4 8a2 2 0 012-2h1.2a1 1 0 00.89-.55L8.7 4.1A1 1 0 019.6 3.5h4.8a1 1 0 01.9.55l.6 1.4A1 1 0 0016.8 6H18a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V8z"
              stroke={colors.clementine}
              strokeWidth={1.8}
              strokeLinejoin="round"
            />
            <Circle cx={12} cy={13} r={3.4} stroke={colors.clementine} strokeWidth={1.8} />
          </Svg>
        </Pressable>
      </Animated.View>

      <Animated.View
        style={[
          styles.option,
          {
            transform: [{ translateX: rightX }, { translateY: optY }, { scale: optScale }],
            opacity: optOpacity,
          },
        ]}
        pointerEvents={open ? 'auto' : 'none'}
      >
        <Animated.Text style={[styles.label, { opacity: optOpacity }]}>log workout</Animated.Text>
        <Pressable
          style={styles.optionCircle}
          onPress={() => {
            close();
            onLogWorkout();
          }}
        >
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
            <Rect x={2} y={9} width={4} height={6} rx={1.5} fill={colors.plum} />
            <Rect x={18} y={9} width={4} height={6} rx={1.5} fill={colors.plum} />
            <Rect x={6} y={10.5} width={12} height={3} rx={1.5} fill={colors.plum} />
          </Svg>
        </Pressable>
      </Animated.View>

      <Pressable style={styles.main} onPress={toggle}>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path d="M12 5v14M5 12h14" stroke="white" strokeWidth={2.4} strokeLinecap="round" />
          </Svg>
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  zone: { alignItems: 'center', height: 64, marginTop: 'auto' },
  main: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.clementine,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.clementine,
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    zIndex: 10,
  },
  option: { position: 'absolute', bottom: 0, alignItems: 'center' },
  optionCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.cream,
    borderWidth: 2,
    borderColor: colors.peach,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    position: 'absolute',
    bottom: 60,
    fontSize: 11.5,
    fontWeight: '800',
    color: colors.clementine,
    width: 100,
    textAlign: 'center',
  },
});
