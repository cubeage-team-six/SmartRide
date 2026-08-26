import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export function WebBadge() {
  return (
    <View style={styles.container}>
      <Text style={styles.versionText}>SmartRide v1.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#888888',
  },
});
