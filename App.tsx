import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Values from './src/components/Values';
import RingProgress from './src/components/RingProgress';

export default function App() {

  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <RingProgress 
        progress={0.5}
        strokeWidth={40}
        radius={150}
      />
      <View style={styles.valueMain}>
        <Values label={'Steps'} value={'1219'} />
        <Values label={'Distance'} value={'7.75 km'} />
        <Values label={'Flights Climbed'} value={'0.76 km'} />
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
