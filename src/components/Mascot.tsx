import React from 'react';
import Svg, { Ellipse, Path, Circle } from 'react-native-svg';
import { colors } from '../theme';

export type MascotExpression = 'content' | 'encouraging' | 'celebrating' | 'empty';

interface MascotProps {
  size?: number;
  expression?: MascotExpression;
}

/**
 * The clem mascot. One component, one file -- every screen that needs her
 * (check-in card, workout confirmation, pet mode, empty states) imports
 * this instead of re-drawing the SVG inline.
 */
export function Mascot({ size = 60, expression = 'content' }: MascotProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Ellipse cx={60} cy={68} rx={42} ry={38} fill={colors.clementine} />
      <Path d="M60 30 Q66 14 82 18 Q70 24 66 32 Z" fill={colors.leaf} />
      {expression === 'content' && (
        <>
          <Circle cx={46} cy={64} r={4.5} fill={colors.espresso} />
          <Circle cx={76} cy={64} r={4.5} fill={colors.espresso} />
          <Path d="M48 80 Q60 90 74 80" stroke={colors.espresso} strokeWidth={3.5} fill="none" strokeLinecap="round" />
        </>
      )}
      {expression === 'encouraging' && (
        <>
          <Path d="M42 62 Q46 58 50 62" stroke={colors.espresso} strokeWidth={3.5} fill="none" strokeLinecap="round" />
          <Path d="M72 62 Q76 58 80 62" stroke={colors.espresso} strokeWidth={3.5} fill="none" strokeLinecap="round" />
          <Ellipse cx={61} cy={82} rx={10} ry={7} fill={colors.espresso} />
        </>
      )}
      {expression === 'celebrating' && (
        <>
          <Path d="M40 60 Q46 54 52 60" stroke={colors.espresso} strokeWidth={3.5} fill="none" strokeLinecap="round" />
          <Path d="M70 60 Q76 54 82 60" stroke={colors.espresso} strokeWidth={3.5} fill="none" strokeLinecap="round" />
          <Circle cx={60} cy={82} r={5} fill={colors.espresso} />
        </>
      )}
      {expression === 'empty' && (
        <Ellipse cx={60} cy={70} rx={40} ry={36} fill={colors.clementinePale} opacity={0.6} />
      )}
    </Svg>
  );
}
