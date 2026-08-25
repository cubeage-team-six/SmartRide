import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {colors} from '../theme';

type Props = {
  color?: string;
  size?: number;
};

function ArrowRight({color = colors.brand.text, size = 16}: Props) {
  return (
    <Text
      style={[
        styles.arrow,
        {color, fontSize: size, lineHeight: size * 1.15},
      ]}>
      →
    </Text>
  );
}

const styles = StyleSheet.create({
  arrow: {
    fontWeight: '700',
  },
});

export default ArrowRight;