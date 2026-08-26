import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AppTabsWeb() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tabs</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#111111',
    fontSize: 14,
  },
});
