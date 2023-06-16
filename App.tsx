import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform } from 'react-native';
import Values from './src/components/Values';
import RingProgress from './src/components/RingProgress';
import { useHealthData } from './src/hooks/useHealthData'

const STEPS_GOAL = 10_000;

export default function App() {
  const { steps, distance, flightsClimbed } = useHealthData(new Date());

  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <RingProgress 
        progress={
          steps / STEPS_GOAL
        }
        strokeWidth={50}
        radius={150}
      />
      <View style={styles.valueMain}>
        <Values label={'Steps'} value={steps.toString()} />
        <Values label={'Distance'} value={`${(distance / 1000).toFixed(2)} km`} />
        <Values label={'Flights Climbed'} value={flightsClimbed.toString()} />
      </View>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    padding: 12
  },
  valueMain: {
    flexDirection: 'row', 
    gap: 25, 
    flexWrap: 'wrap',
    marginTop: 100
  }
});
