import {View} from 'react-native';
import React from 'react';
import CalenderEvents from '../components/auth/cellender-events';
import {NativeBaseProvider} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authStore, {signIn} from '../store/AuthEnticationStore';

export default function HomeScreen() {
  return (
    <NativeBaseProvider>
      <CalenderEvents />
    </NativeBaseProvider>
  );
}
