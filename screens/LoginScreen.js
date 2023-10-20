import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {ArrowLeftIcon} from 'react-native-heroicons/solid'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword, getAuth } from  'firebase/auth';
import {auth} from '../config/firebase';

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState ('');
  


  const auth = getAuth();
  
  const handleSubmit = async () => {
      if(email && password) {
          try {
              await signInWithEmailAndPassword(auth,email,password);
          }catch(err){
              console.log('got error:', err.message);
          }
      }
  }

  return (
    <View className="flex-1 bg-white" style={{backgroundColor: themeColors.bg}}>
      <SafeAreaView  className="flex ">
        <View className="flex-row justify-start">
          <TouchableOpacity onPress={()=> navigation.goBack()} 
          className="bg-yellow-200 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View  className="flex-row justify-center">
          <Image source={require('../assets/images/login.png')} 
          style={{width: 200, height: 200}} />
        </View>
        
        
      </SafeAreaView>
      <View 
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}} 
        className="flex-1 bg-white px-8 pt-8">
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Email </Text>
            <TextInput 
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="email"
              value={email}
              onChangeText={value=> setEmail(value)}
            />
            <Text className="text-gray-700 ml-4">Şifre</Text>
            <TextInput 
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              secureTextEntry
              placeholder="şifre"
              value={password}
              onChangeText={value=> setPassword(value)}
            />
            <TouchableOpacity className="flex items-end">
              <Text className="text-gray-700 mb-5">Şifrenizi mi Unuttunuz?</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={handleSubmit}
              className="py-3 bg-yellow-400 rounded-xl">
                <Text 
                    className="text-xl font-bold text-center text-gray-700"
                >
                        Giriş Yap
                </Text>
             </TouchableOpacity>
            
          </View>
          
          <View className="flex-row justify-center space-x-12">
         
          
          </View>
          <View className="flex-row justify-center mt-7">
              <Text className="text-gray-500 font-semibold text-xl">
                  Bir Hesabınız Yok mu?
              </Text>
              <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
                  <Text className="text-xl font-semibold text-yellow-500"> Kayıt Olun</Text>
              </TouchableOpacity>
          </View>
          
      </View>
    </View>
    
  )
}