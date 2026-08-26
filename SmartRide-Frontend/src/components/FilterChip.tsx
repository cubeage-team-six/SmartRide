import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {colors} from '../theme';

type Props = {
  label: string;
  active: boolean;
  onPress: () => void;
};

function FilterChip({label, active, onPress}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, active ? styles.chipActive : styles.chipInactive]}>
      <Text style={[styles.label, active ? styles.labelActive : styles.labelInactive]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 999,
    marginRight: 12,
  },
  chipActive: {
    backgroundColor: colors.brand.dark,
    elevation: 2,
    shadowColor: colors.brand.dark,
    shadowOpacity: 0.12,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 1},
  },
  chipInactive: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray.line,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 1},
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  labelActive: {
    color: colors.white,
  },
  labelInactive: {
    color: colors.brand.text,
  },
});

export default FilterChip;