import { View, Text, Image, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native';
import {auth} from '../config/firebase';

export default function WelcomeScreen() {
    const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1" style={{backgroundColor: themeColors.bg}}>
        <View className="flex-1 flex justify-around my-4">
        <Text style={{color: '#1C799B', fontSize: '34', fontWeight: 'bold', textAlign:'center'}}>
                HAFTALIK 
                PLANINIZI KOLAYCA HAZIRLAYIN
            </Text>
            <View className="flex-row justify-center">
                <Image source={require("../assets/images/welcome.png")}
                    style={{width: 350, height: 450}} />
            </View>
            <View className="space-y-4">
                <TouchableOpacity
                    onPress={()=> navigation.navigate('SignUp')}
                    className="py-3 bg-blue-500 mx-7 rounded-xl">
                        <Text 
                            className="text-xl font-bold text-center text-gray-700"
                        >
                            KAYIT OL
                        </Text>
                </TouchableOpacity>
                <View className="flex-row justify-center">
                    <Text className="text-blue-400 font-semibold text-xl">Zaten Üye Misin?</Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                        <Text className="font-semibold text-pink-500 text-xl"> Giriş Yap</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}
