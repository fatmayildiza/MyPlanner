import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, SafeAreaView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';


const WeekPage = ({ route }) => {
  const { weekId } = route.params;
  const navigation = useNavigation();

  const dayNames = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

  const [days, setDays] = useState([
    { id: 1, dayName: 'Pazartesi', texts: Array(7).fill('') },
    { id: 2, dayName: 'Salı', texts: Array(7).fill('') },
    { id: 3, dayName: 'Çarşamba', texts: Array(7).fill('') },
    { id: 4, dayName: 'Perşembe', texts: Array(7).fill('') },
    { id: 5, dayName: 'Cuma', texts: Array(7).fill('') },
    { id: 6, dayName: 'Cumartesi', texts: Array(7).fill('') },
    { id: 7, dayName: 'Pazar', texts: Array(7).fill('') },
  ]);
  


  useEffect(() => {
    const loadData = async () => {
      try {
        const savedDays = await AsyncStorage.getItem(`week_${weekId}`);
        if (savedDays) {
          setDays(JSON.parse(savedDays));
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, [weekId]);

  const handleInputChange = (dayId, textIndex, text) => {
    const updatedDays = [...days];
    updatedDays[dayId - 1].texts[textIndex] = text;
    setDays(updatedDays);
  };

  const handleClearInput = (dayId, textIndex) => {
    const updatedDays = [...days];
    updatedDays[dayId - 1].texts[textIndex] = '';
    setDays(updatedDays);
  };

  const handleSave = async () => {
    if (weekId) {
      try {
        await AsyncStorage.setItem(`week_${weekId}`, JSON.stringify(days));
        alert('Başarıyla kaydedildi');
      } catch (error) {
        console.error('Kaydedilemedi:(', error);
      }
    } else {
      alert('Week ID is undefined');
    }
  };

  const renderTextInput = ({ item, index }) => (
 
    <View style={styles.textInputContainer}>
    
      <TextInput
        style={styles.input}
        placeholder={`Neler yapacağım? ${index + 1}.`}
        value={item}
        multiline={true}
        numberOfLines={4} 
        onChangeText={(text) => handleInputChange(route.params.weekId, index, text)}
      />
      <TouchableOpacity onPress={() => handleClearInput(route.params.weekId, index)}>
        <Feather name="trash-2" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView contentContainerStyle={styles.container}>
    <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <Feather name="chevron-left" size={24} color="#4D85A4" />
      </TouchableOpacity>
      <FlatList
        data={days}
        horizontal
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item }) => (
          <View style={styles.dayContainer}>
            <Text style={styles.dayName}>{item.dayName}</Text>
            {item.texts.map((text, i) => (
              <View key={i} style={styles.textInputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={`Neler yaptım ${i + 1}.`}
                  value={text}
                  multiline={true}  
                  numberOfLines={2} 
                  onChangeText={(text) => handleInputChange(item.id, i, text)}
                />
                <TouchableOpacity onPress={() => handleClearInput(item.id, i)}>
                  <Feather name="trash-2" size={24} color="#4D85A4" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <View>
        <Text style={{color:'#F6AD9A'}}> Haftanın diğer günlerini görmek için ekranı sağa kaydırın =></Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop:222,
  },
  dayContainer: {
    marginBottom: 16,
    marginRight: 16, 
    marginTop:62,
  },
  dayName: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#F6AD9A',
  },
  input: {
    padding: 8,
    borderWidth: 3,
    borderColor: '#4D85A4',
    borderRadius: 8,
    fontSize: 16,
    maxWidth: 180,

    color:  '#F6AD9A',
  },
  textInputContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  
  },
  button: {
    backgroundColor: '#F6AD9A',
    padding: 10,
    borderRadius: 8,
    marginBottom: 36,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  goBackButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
    marginTop:21,
  },
});

export default WeekPage;
