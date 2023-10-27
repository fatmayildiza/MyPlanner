
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Alert,SafeAreaView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';
import { signOut } from  'firebase/auth';
import {auth} from '../config/firebase';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [weeks, setWeeks] = useState([
    {
      id: 1,
      name: "BU HAFTA NELER YAPACAĞIM?                                  TÜM HAFTANIZI SAAT SAAT PLANLAYIN",
    },
    { id: 2, name: "" },
  ]);
  const [newWeekName, setNewWeekName] = useState("");

  const navigateToWeek = (weekId) => {
    if (weekId === 2 || weekId === 1) {
      return;
    }
    navigation.navigate("WeekPage", { weekId });
  };

  const addNewWeek = () => {
    const newWeek = {
      id: weeks[weeks.length - 1].id + 1,
      name: newWeekName,
      days: [],
    };
    setWeeks([...weeks, newWeek]);
    setNewWeekName("");
  };
  const handleLogout = async () => {
    await signOut(auth);
  };
  const deleteWeek = (weekId) => {
    Alert.alert(
      "Haftayı Sil",
      "Silmek istediğinize emin misiniz?",
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
  };
  return (
    <SafeAreaView style={styles.container}>
     
      <ScrollView>
        <TextInput
          style={styles.input}
          placeholder="Yeni Hafta İsmi"
          value={newWeekName}
          onChangeText={(text) => setNewWeekName(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addNewWeek}>
          <Text style={styles.addButtonText}>Hafta Ekle</Text>
        </TouchableOpacity>
        <Calendar />
        {weeks.map((week) => (
          <View key={week.id} style={styles.weekCard}>
            <TouchableOpacity onPress={() => navigateToWeek(week.id)}>
              <Text style={styles.weekName}>{week.name}</Text>
            </TouchableOpacity>
            {week.id !== 1 && week.id !== 2 && (
              <TouchableOpacity onPress={() => deleteWeek(week.id)}>
                <Feather name="trash" size={24} color="red" />
              </TouchableOpacity>
            )}
          </View>
        ))}
        <View style={{ position: 'absolute', bottom: -200, right: 10 }}>
  <TouchableOpacity
    onPress={handleLogout}
    className="p-1 bg-red-400 rounded-lg"
  >
    <Text className="text-white text-lg "> Çıkış </Text>
  </TouchableOpacity>
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


