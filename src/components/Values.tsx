import { StyleSheet, Text, View } from 'react-native';

type TValue = {
  value: string,
  label: string
}

const Values = ({ label, value }: TValue) => (
  <View>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
    label: {
      color: '#fff',
      fontSize: 20
    }
    ,
    value: {
      fontSize: 35,
      fontWeight: '500',
      color: '#AFB3BE'
    }
  });

export default Values;