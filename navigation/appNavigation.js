
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import WeekPage from '../screens/WeekPage';
import WelcomeScreen from '../screens/WelcomeScreen';
import useAuth from '../hooks/useAuth';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const {user} = useAuth ();
  if(user){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='WelcomeScreen'>
        <Stack.Screen name="WelcomeScreen" options={{headerShown: false}} component={WelcomeScreen} />
          <Stack.Screen name="HomeScreen" options={{headerShown: false}} component={HomeScreen} />
          <Stack.Screen name="WeekPage" options={{headerShown: false}} component={WeekPage} />
          <Stack.Screen name="SignUpScreen" options={{headerShown: false}} component={SignUpScreen} />
          <Stack.Screen name="LoginScreen" options={{headerShown: false}} component={LoginScreen} />
      
        </Stack.Navigator>
      </NavigationContainer>
    )

  }else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'>
         
          <Stack.Screen name="WelcomeScreen" options={{headerShown: false}} component={WelcomeScreen} />
          <Stack.Screen name="LoginScreen" options={{headerShown: false}} component={LoginScreen} />
          <Stack.Screen name="SignUpScreen" options={{headerShown: false}} component={SignUpScreen} />
          

        </Stack.Navigator>
      </NavigationContainer>
    )

  }
  
}

