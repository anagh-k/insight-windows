import React from 'react';
import {View, Text, Button} from 'react-native-windows';
import GoogleSignIn from './oAuth/GoogleSignIn';

export default function Login() {
  return (
    <View>
      <Text>Welcome to google login</Text>
      <GoogleSignIn></GoogleSignIn>
    </View>
  );
}
