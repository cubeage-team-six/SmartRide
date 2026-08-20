import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FilterScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Filter Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default FilterScreen;
