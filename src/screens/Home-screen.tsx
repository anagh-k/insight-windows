import {View} from 'react-native';
import React from 'react';
import CalenderEvents from '../components/auth/cellender-events';
import {NativeBaseProvider} from 'native-base';

export default function HomeScreen() {
  return (
    <NativeBaseProvider>
      <CalenderEvents />
    </NativeBaseProvider>
  );
}
