import type { ReactNode } from 'react';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

type HintRowProps = {
  title?: string;
  hint?: ReactNode;
};

export function HintRow({ title = 'Tip', hint = '' }: HintRowProps) {
  return (
    <View style={styles.stepRow}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.codeSnippet}>
        <Text style={styles.hint}>{hint}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stepRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  title: {
    fontSize: 14,
    color: '#111111',
  },
  codeSnippet: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#F3F4F6',
  },
  hint: {
    fontSize: 13,
    color: '#6B7280',
  },
});
