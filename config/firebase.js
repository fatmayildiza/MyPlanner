import { initializeApp } from "firebase/app";
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyAtRwL7-XwQGyMAfZoc2d6Op2mdr_EtbpY",
    authDomain: "plan-54aa4.firebaseapp.com",
    projectId: "plan-54aa4",
    storageBucket: "plan-54aa4.appspot.com",
    messagingSenderId: "407391478944",
    appId: "1:407391478944:web:3a3fe0ce94d58c6ffd15c5"
  };

  const app = initializeApp(firebaseConfig);
  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });

  export {app, auth};

