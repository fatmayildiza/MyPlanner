import React, { useState,useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Alert,SafeAreaView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';
import { signOut } from  'firebase/auth';
import {auth} from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function HomeScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const loadWeeks = async () => {
      try {
        const savedWeeks = await AsyncStorage.getItem('weeks');
        if (savedWeeks) {
          const parsedWeeks = JSON.parse(savedWeeks);
          setWeeks(parsedWeeks);
          setNewWeekName(""); 
        }
      } catch (error) {
        console.error('Error loading weeks:', error);
      }
    };
    loadWeeks();
  }, []);
  
  
  const saveWeeks = async (updatedWeeks) => {
    try {
      await AsyncStorage.setItem('weeks', JSON.stringify(updatedWeeks));
      setWeeks(updatedWeeks);
    } catch (error) {
      console.error('Error saving weeks:', error);
    }
  };

  const [weeks, setWeeks] = useState([  ]);
  const [newWeekName, setNewWeekName] = useState("");

  const navigateToWeek = (weekId) => {

    navigation.navigate("WeekPage", { weekId });
  };

  const addNewWeek = () => {
    const newWeek = {
      id: weeks.length > 0 ? weeks[weeks.length - 1].id + 1 : 1,
      name: newWeekName,
      days: [],
    };
    setWeeks([...weeks, newWeek]);
    saveWeeks([...weeks, newWeek]); 
    setNewWeekName("");
  };
  
  
  
  const deleteWeek = (weekId) => {
    Alert.alert(
      "Delete the week",
      "Are you sure?",
      [
        {
          text: "Vazgeç",
          style: "cancel",
        },
        { text: "Evet", onPress: () => confirmDelete(weekId) },
      ],
      { cancelable: false }
    );
  };
  
  const confirmDelete = (weekId) => {
    const updatedWeeks = weeks.filter((week) => week.id !== weekId);
    setWeeks(updatedWeeks);
    saveWeeks(updatedWeeks); // Silme işlemi gerçekleştikten sonra AsyncStorage'e kaydet
  };
  
  
  return (
    <SafeAreaView style={styles.container}>
     
      <ScrollView>
        <TextInput
          style={styles.input}
          placeholder="Add new Week"
          value={newWeekName}
          onChangeText={(text) => setNewWeekName(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addNewWeek}>
          <Text style={styles.addButtonText}>ADD NEW WEEK</Text>
        </TouchableOpacity>
        <Calendar />
        {weeks.map((week) => (
          <View key={week.id} style={styles.weekCard}>
            <TouchableOpacity onPress={() => navigateToWeek(week.id)}>
              <Text style={styles.weekName}>{week.name}</Text>
            </TouchableOpacity>
          
            
              <TouchableOpacity onPress={() => deleteWeek(week.id)}>
                <Feather name="trash" size={24} color="red" />
              </TouchableOpacity>
              
          
          </View>
        ))}
        <View style={{ position: 'absolute', bottom: -200, right: 10 }}>

</View>

      
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    background: 'red',
    marginTop:72,
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 2,
    borderColor: '#F6AD9A',
    borderRadius: 8,
    marginBottom: 6,
    padding: 8,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#F6AD9A',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  weekCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6,
    marginTop: 9,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  weekName: {
    fontSize: 18,
    color: '#2F80AE',
  },
});
