import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <View style={[styles.bar, { width: `${percentage}%` }]} />
      </View>
      <Text style={styles.text}>
        {current} of {total}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  barContainer: {
    height: 8,
    backgroundColor: Colors.tertiary,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 5,
  },
  bar: {
    height: '100%',
    backgroundColor: Colors.secondary,
    borderRadius: 4,
  },
  text: {
    fontSize: 12,
    color: Colors.text,
    textAlign: 'right',
  },
});