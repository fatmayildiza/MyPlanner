import React from 'react';
import { Text, TextInput, StyleSheet, SafeAreaView } from 'react-native';

const DayCard = ({ dayName, dayIndex, onInputChange, inputValue }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.dayName}>{dayName}</Text>
      <TextInput
        style={styles.input}
        placeholder="Neler yapacağım?"
        value={inputValue}
        onChangeText={(text) => onInputChange(dayIndex, text)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    marginTop:122,
  },
  dayName: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: 'bold', 
  },
  input: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
  },
});

export default DayCard;
